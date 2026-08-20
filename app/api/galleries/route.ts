import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { getGalleries, upsertGallery, uploadCoverImage, type Gallery } from "@/lib/gallery-store"
import { fetchAlbumPreview, downloadImage } from "@/lib/album-link"

function extFor(contentType: string) {
  if (contentType.includes("png")) return "png"
  if (contentType.includes("webp")) return "webp"
  return "jpg"
}

export async function GET() {
  return NextResponse.json(await getGalleries())
}

// Body: { title, description?, albumUrl }
// Fetches the album link's Open Graph cover image (if any), uploads it to
// Blob Storage, and saves a gallery record that links out to the original
// album — no photos are downloaded beyond that single cover thumbnail.
export async function POST(req: NextRequest) {
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
      // Cover fetch is a nice-to-have, not a hard requirement.
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
