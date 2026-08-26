import "server-only"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), ".data")

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

export function readCollection<T>(name: string): T[] {
  ensureDir()
  const file = path.join(DATA_DIR, `${name}.json`)
  if (!fs.existsSync(file)) return []
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"))
  } catch {
    return []
  }
}

export function writeCollection<T>(name: string, data: T[]) {
  ensureDir()
  fs.writeFileSync(path.join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2))
}
