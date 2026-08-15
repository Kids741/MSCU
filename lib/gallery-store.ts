import "server-only"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), ".data")
const GALLERIES_FILE = path.join(DATA_DIR, "galleries.json")

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

export function getGalleries(): Gallery[] {
  return readJson<Gallery[]>(GALLERIES_FILE, [])
}

export function getGallery(id: string): Gallery | null {
  return getGalleries().find((g) => g.id === id) ?? null
}

export function upsertGallery(gallery: Gallery): Gallery {
  const galleries = getGalleries()
  const idx = galleries.findIndex((g) => g.id === gallery.id)
  if (idx >= 0) galleries[idx] = gallery
  else galleries.unshift(gallery)
  writeJson(GALLERIES_FILE, galleries)
  return gallery
}

export function deleteGalleryRecord(id: string) {
  writeJson(
    GALLERIES_FILE,
    getGalleries().filter((g) => g.id !== id)
  )
}
