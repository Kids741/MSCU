import "server-only"
import { kv } from "@vercel/kv"

const INDEX_KEY = "events:index" // sorted set — score: createdAt (ms), member: event id
const RECORD_PREFIX = "event:"

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const GRACE_PERIOD_DAYS = 7

export type EventItem = {
  id: string
  title: string
  location: string
  color: string
  displayDate: string // freeform text shown on the card
  eventDate: string | null // ISO date "YYYY-MM-DD"; null for recurring events that never expire
  createdAt: string
}

function isExpired(event: EventItem): boolean {
  if (!event.eventDate) return false
  const eventTime = new Date(`${event.eventDate}T00:00:00`).getTime()
  if (Number.isNaN(eventTime)) return false
  return Date.now() > eventTime + GRACE_PERIOD_DAYS * ONE_DAY_MS
}

// Reads events and prunes any more than 7 days past their date.
export async function getEvents(): Promise<EventItem[]> {
  const ids = await kv.zrange<string[]>(INDEX_KEY, 0, -1)
  if (!ids || ids.length === 0) return []

  const raw = await kv.mget<Array<EventItem | null>>(...ids.map((id) => `${RECORD_PREFIX}${id}`))
  const all = raw.filter((e): e is EventItem => e !== null)

  const active: EventItem[] = []
  for (const event of all) {
    if (isExpired(event)) {
      await kv.del(`${RECORD_PREFIX}${event.id}`)
      await kv.zrem(INDEX_KEY, event.id)
    } else {
      active.push(event)
    }
  }
  return active
}

export async function upsertEvent(event: EventItem): Promise<EventItem> {
  await kv.set(`${RECORD_PREFIX}${event.id}`, event)
  await kv.zadd(INDEX_KEY, { score: new Date(event.createdAt).getTime(), member: event.id })
  return event
}

export async function deleteEvent(id: string) {
  await kv.del(`${RECORD_PREFIX}${id}`)
  await kv.zrem(INDEX_KEY, id)
}
