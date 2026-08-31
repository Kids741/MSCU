import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { getGalleries, upsertGallery, uploadCoverImage, type Gallery } from "@/lib/gallery-store"
import { fetchAlbumPreview, downloadImage } from "@/lib/album-link"
import { isAdminAuthenticated } from "@/lib/require-admin"

function extFor(contentType: string) {
  if (contentType.includes("png")) return "png"
  if (contentType.includes("webp")) return "webp"
  return "jpg"
}

// Public — anyone can view the gallery list.
export async function GET() {
  return NextResponse.json(await getGalleries())
}

// Admin-only — creates a new gallery.
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, description, albumUrl } = await req.json()

    if (!title || !albumUrl) {
      return NextResponse.json({ error: "title and albumUrl are required" }, { status: 400 })
    }

    let parsedUrl: URL
    try {
      parsedUrl = new URL(albumUrl)
    } catch {
      return NextResponse.json({ error: "That doesn't look like a valid URL" }, { status: 400 })
    }
    const allowedHosts = ["photos.app.goo.gl", "photos.google.com", "goo.gl"]
    if (!allowedHosts.some((h) => parsedUrl.hostname.endsWith(h))) {
      return NextResponse.json(
        { error: "Please use a Google Photos shared album link (photos.app.goo.gl or photos.google.com/share/...)" },
        { status: 400 }
      )
    }

    const galleryId = nanoid(10)
    let coverImage: string | null = null

    try {
      const preview = await fetchAlbumPreview(albumUrl)
      if (preview.imageUrl) {
        const { bytes, contentType } = await downloadImage(preview.imageUrl)
        coverImage = await uploadCoverImage(galleryId, bytes, contentType, extFor(contentType))
      }
    } catch (err) {
      console.warn("Could not fetch album cover:", err)
    }

    const gallery: Gallery = {
      id: galleryId,
      title,
      description: description ?? "",
      albumUrl,
      coverImage,
      createdAt: new Date().toISOString(),
    }

    await upsertGallery(gallery)
    return NextResponse.json(gallery, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
