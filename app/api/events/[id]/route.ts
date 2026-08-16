import { NextRequest, NextResponse } from "next/server"
import { deleteEvent } from "@/lib/events-store"

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  deleteEvent(id)
  return new NextResponse(null, { status: 204 })
}
