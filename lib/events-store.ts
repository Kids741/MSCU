import "server-only"
import { kv } from "@vercel/kv"
import { readCollection, writeCollection } from "./local-json-store"

const USE_LOCAL_KV = !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN

const COLLECTION = "events"
const INDEX_KEY = "events:index"
const RECORD_PREFIX = "event:"

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const GRACE_PERIOD_DAYS = 7

export type EventItem = {
  id: string
  title: string
  location: string
  color: string
  displayDate: string
  eventDate: string | null
  createdAt: string
}

function isExpired(event: EventItem): boolean {
  if (!event.eventDate) return false
  const eventTime = new Date(`${event.eventDate}T00:00:00`).getTime()
  if (Number.isNaN(eventTime)) return false
  return Date.now() > eventTime + GRACE_PERIOD_DAYS * ONE_DAY_MS
}

export async function getEvents(): Promise<EventItem[]> {
  let all: EventItem[]

  if (USE_LOCAL_KV) {
    all = readCollection<EventItem>(COLLECTION)
  } else {
    const ids = await kv.zrange<string[]>(INDEX_KEY, 0, -1)
    if (!ids || ids.length === 0) return []
    const raw = await kv.mget<Array<EventItem | null>>(...ids.map((id) => `${RECORD_PREFIX}${id}`))
    all = raw.filter((e): e is EventItem => e !== null)
  }

  const active: EventItem[] = []
  let prunedAny = false

  for (const event of all) {
    if (isExpired(event)) {
      prunedAny = true
      if (!USE_LOCAL_KV) {
        await kv.del(`${RECORD_PREFIX}${event.id}`)
        await kv.zrem(INDEX_KEY, event.id)
      }
    } else {
      active.push(event)
    }
  }

  if (USE_LOCAL_KV && prunedAny) writeCollection(COLLECTION, active)
  return active
}

export async function upsertEvent(event: EventItem): Promise<EventItem> {
  if (USE_LOCAL_KV) {
    const all = readCollection<EventItem>(COLLECTION)
    const idx = all.findIndex((e) => e.id === event.id)
    if (idx >= 0) all[idx] = event
    else all.unshift(event)
    writeCollection(COLLECTION, all)
    return event
  }
  await kv.set(`${RECORD_PREFIX}${event.id}`, event)
  await kv.zadd(INDEX_KEY, { score: new Date(event.createdAt).getTime(), member: event.id })
  return event
}

export async function deleteEvent(id: string) {
  if (USE_LOCAL_KV) {
    writeCollection(COLLECTION, readCollection<EventItem>(COLLECTION).filter((e) => e.id !== id))
    return
  }
  await kv.del(`${RECORD_PREFIX}${id}`)
  await kv.zrem(INDEX_KEY, id)
}
