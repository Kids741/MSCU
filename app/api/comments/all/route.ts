import { NextResponse } from "next/server"
import { getAllComments } from "@/lib/comments-store"
import { isAdminAuthenticated } from "@/lib/require-admin"

// Admin-only — this lists every commenter's name across every post, which
// is more than any single public view shows.
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json(await getAllComments())
}
