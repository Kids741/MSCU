import "server-only"
import { kv } from "@vercel/kv"
import { readCollection, writeCollection } from "./local-json-store"

const USE_LOCAL_KV = !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN

const COLLECTION = "likes"
const PREFIX = "likes:"

type LikeRecord = { slug: string; count: number }

export async function getLikeCount(slug: string): Promise<number> {
  if (USE_LOCAL_KV) {
    return readCollection<LikeRecord>(COLLECTION).find((r) => r.slug === slug)?.count ?? 0
  }
  const count = await kv.get<number>(`${PREFIX}${slug}`)
  return count ?? 0
}

export async function incrementLike(slug: string): Promise<number> {
  if (USE_LOCAL_KV) {
    const all = readCollection<LikeRecord>(COLLECTION)
    const idx = all.findIndex((r) => r.slug === slug)
    if (idx >= 0) all[idx].count += 1
    else all.push({ slug, count: 1 })
    writeCollection(COLLECTION, all)
    return all.find((r) => r.slug === slug)!.count
  }
  return kv.incr(`${PREFIX}${slug}`)
}
