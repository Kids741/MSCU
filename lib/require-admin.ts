import "server-only"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "./admin-session"

// Call at the top of any API route that performs an admin-only action.
// Usage:
//   if (!(await isAdminAuthenticated())) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }
export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(ADMIN_SESSION_COOKIE)?.value
  if (!token) return false
  return verifyAdminSessionToken(token)
}
