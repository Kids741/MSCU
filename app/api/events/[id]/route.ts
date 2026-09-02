import { NextRequest, NextResponse } from "next/server"
import { deleteEvent } from "@/lib/events-store"
import { isAdminAuthenticated } from "@/lib/require-admin"

// Admin-only.
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  await deleteEvent(id)
  return new NextResponse(null, { status: 204 })
}
