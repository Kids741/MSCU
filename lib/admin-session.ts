import "server-only"
import { SignJWT, jwtVerify } from "jose"

export const ADMIN_SESSION_COOKIE = "mscu_admin_session"
const SESSION_LIFETIME = "7d"

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error("SESSION_SECRET is not set. Add it to your environment variables.")
  }
  return new TextEncoder().encode(secret)
}

export async function createAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_LIFETIME)
    .sign(getSecretKey())
}

export async function verifyAdminSessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload.role === "admin"
  } catch {
    return false
  }
}
