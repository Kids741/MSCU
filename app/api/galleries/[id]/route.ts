import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { getGallery, deleteGalleryRecord } from "@/lib/gallery-store"

const IMAGES_DIR = path.join(process.cwd(), "public", "gallery-images")

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const gallery = getGallery(id)
  if (!gallery) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(gallery)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const gallery = getGallery(id)
  if (!gallery) return NextResponse.json({ error: "Not found" }, { status: 404 })
  fs.rmSync(path.join(IMAGES_DIR, gallery.id), { recursive: true, force: true })
  deleteGalleryRecord(gallery.id)
  return new NextResponse(null, { status: 204 })
}
