// Writes ADMIN_USERNAME, ADMIN_PASSWORD_HASH, and SESSION_SECRET (if not
// already set) directly into .env.local — no manual copy-pasting, which
// is how long values like bcrypt hashes tend to get corrupted.
//
// Usage: node scripts/setup-admin.mjs "yourUsername" "yourPassword"

import bcrypt from "bcryptjs"
import crypto from "crypto"
import fs from "fs"
import path from "path"

const [, , username, password] = process.argv

if (!username || !password) {
  console.error('Usage: node scripts/setup-admin.mjs "yourUsername" "yourPassword"')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 12)
// Next.js expands $VARIABLE references inside .env files — and bcrypt
// hashes are full of literal $ characters by design ($2a$12$...). Escaping
// each one as \$ tells Next.js's loader "this is a literal dollar sign,
// not a variable reference," so the hash survives intact.
const escapedHash = hash.replace(/\$/g, "\\$")
const sessionSecret = crypto.randomBytes(32).toString("base64")

const envPath = path.join(process.cwd(), ".env.local")
let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : ""

function upsertLine(text, key, value) {
  const lineRegex = new RegExp(`^${key}=.*$`, "m")
  const line = `${key}=${value}`
  if (lineRegex.test(text)) {
    return text.replace(lineRegex, line)
  }
  const trimmed = text.trim()
  return trimmed.length > 0 ? `${trimmed}\n${line}\n` : `${line}\n`
}

content = upsertLine(content, "ADMIN_USERNAME", username)
content = upsertLine(content, "ADMIN_PASSWORD_HASH", escapedHash)

if (!/^SESSION_SECRET=.+$/m.test(content)) {
  content = upsertLine(content, "SESSION_SECRET", sessionSecret)
  console.log("Generated a new SESSION_SECRET (none was set before).")
} else {
  console.log("SESSION_SECRET already set — left untouched.")
}

fs.writeFileSync(envPath, content, "utf-8")

console.log("\n.env.local updated directly.")
console.log(`  ADMIN_USERNAME=${username}`)
console.log(`  ADMIN_PASSWORD_HASH=${hash.slice(0, 10)}... (${hash.length} chars, saved escaped for .env)`)
console.log("\nRestart your dev server, then log in with your actual password (not the hash).\n")
