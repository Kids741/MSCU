# Compassion Ministry — anonymous messages to Google Sheets

The "Share Anonymously" form on `/compassion` posts to `/api/compassion-messages`,
which forwards each message to a Google Apps Script attached to a Google Sheet.
Each message becomes a new row. No names, emails, IP addresses or other
identifying details are collected.

Until the two environment variables below are set, the form shows a
"messages aren't available right now" notice instead of sending.

## 1. Create the sheet

1. Create a Google Sheet owned by an MSCU account (not a personal one, so it
   survives leadership handovers), e.g. "Compassion — Anonymous Messages".
2. Rename the first tab to `Messages` and add these headers in row 1:
   `Received` | `Message` | `Status` | `Notes`
   (`Status` and `Notes` are for the team to fill in.)
3. Share the sheet only with the Compassion team.

## 2. Add the Apps Script

1. In the sheet: **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with:

```js
function doPost(e) {
  var secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET")
  var data
  try {
    data = JSON.parse(e.postData.contents)
  } catch (err) {
    return json({ ok: false, error: "invalid json" })
  }

  if (!secret || data.secret !== secret) {
    return json({ ok: false, error: "unauthorized" })
  }

  var message = String(data.message || "").trim().slice(0, 2000)
  if (!message) {
    return json({ ok: false, error: "empty message" })
  }

  // Stop text like "=HYPERLINK(...)" from being treated as a formula.
  if (/^[=+\-@]/.test(message)) {
    message = "'" + message
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = spreadsheet.getSheetByName("Messages") || spreadsheet.getSheets()[0]
  sheet.appendRow([new Date(), message, "New", ""])

  return json({ ok: true })
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}
```

3. **Project Settings (gear icon) → Script Properties → Add script property**:
   name `SHARED_SECRET`, value: a long random string (e.g. from a password
   manager). Keep it private — you'll need it again in step 4.
4. **Deploy → New deployment → Select type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, approve the permissions prompt, and copy the
     **Web app URL** (ends in `/exec`).

"Anyone" only means the URL can receive requests; without the shared secret
the script refuses to write anything.

## 3. Configure the website (Vercel)

In the Vercel project: **Settings → Environment Variables**, add for Production
(and Preview if wanted):

| Name | Value |
| --- | --- |
| `COMPASSION_SHEET_WEBHOOK_URL` | The Web app URL from step 2.4 |
| `COMPASSION_SHEET_SECRET` | The same value as `SHARED_SECRET` |

Then redeploy. For local development, add the same two lines to `.env.local`
(already git-ignored).

## Updating the script later

After editing the script, use **Deploy → Manage deployments → Edit → Version:
New version** so the existing URL keeps working. Creating a brand-new
deployment gives a new URL, which would need updating in Vercel.
