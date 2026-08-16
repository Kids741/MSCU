import "server-only"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), ".data")
const EVENTS_FILE = path.join(DATA_DIR, "events.json")

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const GRACE_PERIOD_DAYS = 7

export type EventItem = {
  id: string
  title: string
  location: string
  color: string
  displayDate: string // freeform text shown on the card, e.g. "27th March 2026" or "Every Thursday, 7 PM"
  eventDate: string | null // ISO date "YYYY-MM-DD" for one-time events. Leave null for recurring events, which never auto-expire.
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

function isExpired(event: EventItem): boolean {
  if (!event.eventDate) return false // recurring events never expire
  const eventTime = new Date(`${event.eventDate}T00:00:00`).getTime()
  if (Number.isNaN(eventTime)) return false
  const hideAfter = eventTime + GRACE_PERIOD_DAYS * ONE_DAY_MS
  return Date.now() > hideAfter
}

// Reads events and prunes any that are more than 7 days past their date,
// persisting the cleanup so the JSON file doesn't grow forever.
export function getEvents(): EventItem[] {
  const all = readJson<EventItem[]>(EVENTS_FILE, [])
  const active = all.filter((e) => !isExpired(e))
  if (active.length !== all.length) {
    writeJson(EVENTS_FILE, active)
  }
  return active
}

export function upsertEvent(event: EventItem): EventItem {
  const events = readJson<EventItem[]>(EVENTS_FILE, [])
  const idx = events.findIndex((e) => e.id === event.id)
  if (idx >= 0) events[idx] = event
  else events.unshift(event)
  writeJson(EVENTS_FILE, events)
  return event
}

export function deleteEvent(id: string) {
  const events = readJson<EventItem[]>(EVENTS_FILE, [])
  writeJson(
    EVENTS_FILE,
    events.filter((e) => e.id !== id)
  )
}
