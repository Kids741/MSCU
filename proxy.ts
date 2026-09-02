import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session"

export async function proxy(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const isValid = token ? await verifyAdminSessionToken(token) : false

  if (!isValid) {
    const loginUrl = new URL("/admin-login", req.url)
    loginUrl.searchParams.set("next", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Only the admin pages themselves need the redirect-to-login treatment.
// Admin-only API routes (creating/deleting galleries, events, etc.) check
// the session independently via isAdminAuthenticated(), since they need
// to return a 401 JSON response rather than redirect.
export const config = {
  matcher: ["/gallery-admin/:path*", "/events-admin/:path*", "/comments-admin/:path*"],
}
