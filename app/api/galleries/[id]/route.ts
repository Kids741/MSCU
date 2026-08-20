import { NextRequest, NextResponse } from "next/server"
import { getGallery, deleteGalleryRecord } from "@/lib/gallery-store"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const gallery = await getGallery(id)
  if (!gallery) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(gallery)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const gallery = await getGallery(id)
  if (!gallery) return NextResponse.json({ error: "Not found" }, { status: 404 })
  await deleteGalleryRecord(id)
  return new NextResponse(null, { status: 204 })
}
