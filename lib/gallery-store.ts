import "server-only"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), ".data")
const GALLERIES_FILE = path.join(DATA_DIR, "galleries.json")

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const MAX_AGE_DAYS = 365

export type Gallery = {
  id: string
  title: string
  description: string
  albumUrl: string // public Google Photos shared-album link
  coverImage: string | null // relative path under public/gallery-images, or null if none could be fetched
  createdAt: string
}

function ensureFile<T>(file: string, fallback: T) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(fallback, null, 2))
}

function readJson<T>(file: string, fallback: T): T {
  ensureFile(file, fallback)
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"))
  } catch {
    return fallback
  }
}

function writeJson<T>(file: string, data: T) {
  ensureFile(file, data)
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

function isExpired(gallery: Gallery): boolean {
  const createdTime = new Date(gallery.createdAt).getTime()
  if (Number.isNaN(createdTime)) return false
  return Date.now() > createdTime + MAX_AGE_DAYS * ONE_DAY_MS
}

// Reads galleries and prunes any added more than a year ago, persisting
// the cleanup so the JSON file (and the cover images on disk) don't grow
// forever. Cover images for pruned galleries are also deleted.
export function getGalleries(): Gallery[] {
  const all = readJson<Gallery[]>(GALLERIES_FILE, [])
  const active = all.filter((g) => !isExpired(g))

  if (active.length !== all.length) {
    const removed = all.filter((g) => isExpired(g))
    for (const gallery of removed) {
      const galleryDir = path.join(process.cwd(), "public", "gallery-images", gallery.id)
      fs.rmSync(galleryDir, { recursive: true, force: true })
    }
    writeJson(GALLERIES_FILE, active)
  }

  return active
}

export function getGallery(id: string): Gallery | null {
  return getGalleries().find((g) => g.id === id) ?? null
}

export function upsertGallery(gallery: Gallery): Gallery {
  const galleries = readJson<Gallery[]>(GALLERIES_FILE, [])
  const idx = galleries.findIndex((g) => g.id === gallery.id)
  if (idx >= 0) galleries[idx] = gallery
  else galleries.unshift(gallery)
  writeJson(GALLERIES_FILE, galleries)
  return gallery
}

export function deleteGalleryRecord(id: string) {
  writeJson(
    GALLERIES_FILE,
    readJson<Gallery[]>(GALLERIES_FILE, []).filter((g) => g.id !== id)
  )
}
