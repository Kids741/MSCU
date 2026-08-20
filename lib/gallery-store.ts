import "server-only"
import { kv } from "@vercel/kv"
import { put, del } from "@vercel/blob"

const INDEX_KEY = "galleries:index" // sorted set — score: createdAt (ms), member: gallery id
const RECORD_PREFIX = "gallery:"

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const MAX_AGE_DAYS = 365

export type Gallery = {
  id: string
  title: string
  description: string
  albumUrl: string // public Google Photos shared-album link
  coverImage: string | null // full public Vercel Blob URL, or null if none was fetched
  createdAt: string
}

function isExpired(gallery: Gallery): boolean {
  const createdTime = new Date(gallery.createdAt).getTime()
  if (Number.isNaN(createdTime)) return false
  return Date.now() > createdTime + MAX_AGE_DAYS * ONE_DAY_MS
}

// Reads galleries (newest first) and prunes any added more than a year ago,
// deleting both the KV record and its cover image from Blob storage.
export async function getGalleries(): Promise<Gallery[]> {
  const ids = await kv.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true })
  if (!ids || ids.length === 0) return []

  const raw = await kv.mget<Array<Gallery | null>>(...ids.map((id) => `${RECORD_PREFIX}${id}`))
  const all = raw.filter((g): g is Gallery => g !== null)

  const active: Gallery[] = []
  for (const gallery of all) {
    if (isExpired(gallery)) {
      await kv.del(`${RECORD_PREFIX}${gallery.id}`)
      await kv.zrem(INDEX_KEY, gallery.id)
      if (gallery.coverImage) await del(gallery.coverImage).catch(() => {})
    } else {
      active.push(gallery)
    }
  }
  return active
}

export async function getGallery(id: string): Promise<Gallery | null> {
  const gallery = await kv.get<Gallery>(`${RECORD_PREFIX}${id}`)
  if (!gallery) return null
  return isExpired(gallery) ? null : gallery
}

export async function upsertGallery(gallery: Gallery): Promise<Gallery> {
  await kv.set(`${RECORD_PREFIX}${gallery.id}`, gallery)
  await kv.zadd(INDEX_KEY, { score: new Date(gallery.createdAt).getTime(), member: gallery.id })
  return gallery
}

export async function deleteGalleryRecord(id: string) {
  const existing = await getGallery(id)
  await kv.del(`${RECORD_PREFIX}${id}`)
  await kv.zrem(INDEX_KEY, id)
  if (existing?.coverImage) await del(existing.coverImage).catch(() => {})
}

// Uploads a cover image's bytes to Vercel Blob and returns its public URL.
export async function uploadCoverImage(
  galleryId: string,
  bytes: Buffer,
  contentType: string,
  ext: string
): Promise<string> {
  const blob = await put(`gallery-images/${galleryId}/cover.${ext}`, bytes, {
    access: "public",
    contentType,
  })
  return blob.url
}
