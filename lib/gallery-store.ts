import "server-only"
import fs from "fs"
import path from "path"
import { kv } from "@vercel/kv"
import { put, del } from "@vercel/blob"
import { readCollection, writeCollection } from "./local-json-store"

// Auto-detects whether Vercel KV/Blob are connected. Falls back to local
// disk when they're not — lets you run `pnpm dev` and test everything
// with zero Vercel dashboard setup, and switches to real cloud storage
// automatically the moment KV/Blob env vars are present (locally via
// `vercel env pull`, or in production once connected).
const USE_LOCAL_KV = !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN
const HAS_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN

const COLLECTION = "galleries"
const INDEX_KEY = "galleries:index"
const RECORD_PREFIX = "gallery:"

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const MAX_AGE_DAYS = 365

export type Gallery = {
  id: string
  title: string
  description: string
  albumUrl: string
  coverImage: string | null // full Blob URL in production, or a local "/gallery-images/..." path in dev
  createdAt: string
}

function isExpired(gallery: Gallery): boolean {
  const createdTime = new Date(gallery.createdAt).getTime()
  if (Number.isNaN(createdTime)) return false
  return Date.now() > createdTime + MAX_AGE_DAYS * ONE_DAY_MS
}

// Older versions of this store saved coverImage as a bare relative path
// like "abc123/cover.jpg" (no leading slash), which next/image can't
// resolve. Normalize any such legacy values on read so old test data
// doesn't crash the page.
function normalizeCoverImage(coverImage: string | null | undefined): string | null {
  if (!coverImage) return null
  if (coverImage.startsWith("/") || coverImage.startsWith("http")) return coverImage
  return `/gallery-images/${coverImage}`
}

async function deleteCoverImage(coverImage: string | null) {
  if (!coverImage) return
  if (coverImage.startsWith("/")) {
    const filePath = path.join(process.cwd(), "public", coverImage)
    fs.rmSync(path.dirname(filePath), { recursive: true, force: true })
  } else if (HAS_BLOB) {
    await del(coverImage).catch(() => {})
  }
}

export async function getGalleries(): Promise<Gallery[]> {
  let all: Gallery[]

  if (USE_LOCAL_KV) {
    all = readCollection<Gallery>(COLLECTION)
  } else {
    const ids = await kv.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true })
    if (!ids || ids.length === 0) return []
    const raw = await kv.mget<Array<Gallery | null>>(...ids.map((id) => `${RECORD_PREFIX}${id}`))
    all = raw.filter((g): g is Gallery => g !== null)
  }

  all = all.map((g) => ({ ...g, coverImage: normalizeCoverImage(g.coverImage) }))

  const active: Gallery[] = []
  let prunedAny = false

  for (const gallery of all) {
    if (isExpired(gallery)) {
      prunedAny = true
      await deleteCoverImage(gallery.coverImage)
      if (!USE_LOCAL_KV) {
        await kv.del(`${RECORD_PREFIX}${gallery.id}`)
        await kv.zrem(INDEX_KEY, gallery.id)
      }
    } else {
      active.push(gallery)
    }
  }

  if (USE_LOCAL_KV && prunedAny) writeCollection(COLLECTION, active)

  active.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return active
}

export async function getGallery(id: string): Promise<Gallery | null> {
  if (USE_LOCAL_KV) {
    const gallery = readCollection<Gallery>(COLLECTION).find((g) => g.id === id) ?? null
    if (!gallery) return null
    const normalized = { ...gallery, coverImage: normalizeCoverImage(gallery.coverImage) }
    return isExpired(normalized) ? null : normalized
  }
  const gallery = await kv.get<Gallery>(`${RECORD_PREFIX}${id}`)
  if (!gallery) return null
  const normalized = { ...gallery, coverImage: normalizeCoverImage(gallery.coverImage) }
  return isExpired(normalized) ? null : normalized
}

export async function upsertGallery(gallery: Gallery): Promise<Gallery> {
  if (USE_LOCAL_KV) {
    const all = readCollection<Gallery>(COLLECTION)
    const idx = all.findIndex((g) => g.id === gallery.id)
    if (idx >= 0) all[idx] = gallery
    else all.unshift(gallery)
    writeCollection(COLLECTION, all)
    return gallery
  }
  await kv.set(`${RECORD_PREFIX}${gallery.id}`, gallery)
  await kv.zadd(INDEX_KEY, { score: new Date(gallery.createdAt).getTime(), member: gallery.id })
  return gallery
}

export async function deleteGalleryRecord(id: string) {
  const existing = await getGallery(id)

  if (USE_LOCAL_KV) {
    writeCollection(COLLECTION, readCollection<Gallery>(COLLECTION).filter((g) => g.id !== id))
  } else {
    await kv.del(`${RECORD_PREFIX}${id}`)
    await kv.zrem(INDEX_KEY, id)
  }

  if (existing) await deleteCoverImage(existing.coverImage)
}

export async function uploadCoverImage(
  galleryId: string,
  bytes: Buffer,
  contentType: string,
  ext: string
): Promise<string> {
  if (!HAS_BLOB) {
    const dir = path.join(process.cwd(), "public", "gallery-images", galleryId)
    fs.mkdirSync(dir, { recursive: true })
    const filename = `cover.${ext}`
    fs.writeFileSync(path.join(dir, filename), bytes)
    return `/gallery-images/${galleryId}/${filename}`
  }

  const blob = await put(`gallery-images/${galleryId}/cover.${ext}`, bytes, {
    access: "public",
    contentType,
  })
  return blob.url
}
