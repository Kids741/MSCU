import { NextRequest, NextResponse } from "next/server"

// Anonymous messages from /compassion are appended to a Google Sheet through a
// Google Apps Script web app (see docs/compassion-google-sheet.md for setup).
// The script URL and shared secret stay server-side so nobody can write to the
// sheet directly. Nothing identifying the sender is collected or forwarded.
//
// Body: { content, website? }
// `website` is a honeypot field — real visitors never see or fill it, so any
// submission with it filled in is silently discarded (fake success returned).

const MAX_LENGTH = 2000

function isConfigured(value: string | undefined): value is string {
  return !!value && value !== "[SENSITIVE]"
}

export async function POST(req: NextRequest) {
  let content: unknown
  let website: unknown
  try {
    ;({ content, website } = await req.json())
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "Please write a message before sending." }, { status: 400 })
  }
  if (content.trim().length > MAX_LENGTH) {
    return NextResponse.json({ error: "Your message is too long." }, { status: 400 })
  }

  if (website) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const webhookUrl = process.env.COMPASSION_SHEET_WEBHOOK_URL
  const secret = process.env.COMPASSION_SHEET_SECRET
  if (!isConfigured(webhookUrl) || !isConfigured(secret)) {
    console.error("COMPASSION_SHEET_WEBHOOK_URL or COMPASSION_SHEET_SECRET is not set")
    return NextResponse.json(
      { error: "Anonymous messages aren't available right now. Please reach out to a committee member instead." },
      { status: 503 }
    )
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, message: content.trim() }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.ok) {
      // Don't log the message itself — only that the sheet rejected it.
      console.error("Compassion sheet webhook failed", res.status, data?.error)
      throw new Error("webhook failed")
    }
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "We couldn't send your message. Please try again later." }, { status: 502 })
  }
}
