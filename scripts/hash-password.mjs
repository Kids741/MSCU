// Run this once to generate the value for ADMIN_PASSWORD_HASH.
// Usage: node scripts/hash-password.mjs "YourChosenPassword"
//
// The plaintext password is never saved anywhere by this script — only the
// hash it prints is meant to be copied into your environment variables.

import bcrypt from "bcryptjs"

const password = process.argv[2]

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs \"YourChosenPassword\"")
  process.exit(1)
}

const hash = await bcrypt.hash(password, 12)
console.log("\nAdd this to ADMIN_PASSWORD_HASH in your environment variables:\n")
console.log(hash)
console.log("")
