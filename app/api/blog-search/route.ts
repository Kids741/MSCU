import { NextRequest, NextResponse } from "next/server"
import { POSTS_ENDPOINT, htmlToText, normalizeSlug } from "@/lib/blog-posts"

// Search across every post on the WordPress blog (titles, excerpts and full
// text — WordPress's own `search` covers all three), not just the 25 posts
// listed on /blog. Returns a short snippet around the first match for each post.
//
// GET /api/blog-search?q=forgiveness

const MAX_RESULTS = 8
const SNIPPET_BEFORE = 60
const SNIPPET_AFTER = 140

type WPSearchPost = {
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
}

// A window of text around the first search term found, trimmed to whole words.
function makeSnippet(text: string, terms: string[], fallback: string) {
  const lower = text.toLowerCase()
  const hit = terms
    .map((t) => lower.indexOf(t))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0]

  if (hit === undefined) {
    return fallback.length > SNIPPET_AFTER ? fallback.slice(0, SNIPPET_AFTER).replace(/\s+\S*$/, "") + "…" : fallback
  }

  let start = Math.max(0, hit - SNIPPET_BEFORE)
  let end = Math.min(text.length, hit + SNIPPET_AFTER)
  if (start > 0) start = text.indexOf(" ", start) + 1 || start
  if (end < text.length) end = text.lastIndexOf(" ", end) > hit ? text.lastIndexOf(" ", end) : end

  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim()

  if (q.length < 2 || q.length > 100) {
    return NextResponse.json({ error: "Search must be between 2 and 100 characters" }, { status: 400 })
  }

  const endpoint = new URL(POSTS_ENDPOINT)
  endpoint.searchParams.set("search", q)
  endpoint.searchParams.set("per_page", String(MAX_RESULTS))
  endpoint.searchParams.set("_fields", "slug,date,title.rendered,excerpt.rendered,content.rendered")

  try {
    const res = await fetch(endpoint.toString(), {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`WordPress search failed with ${res.status}`)

    const posts: WPSearchPost[] = await res.json()
    const total = Number(res.headers.get("x-wp-total")) || posts.length
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean)

    const results = posts.map((post) => ({
      href: `/blog/${normalizeSlug(post.slug)}`,
      title: htmlToText(post.title.rendered),
      date: post.date,
      snippet: makeSnippet(htmlToText(post.content.rendered), terms, htmlToText(post.excerpt.rendered)),
    }))

    return NextResponse.json({ results, total })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Search isn't available right now" }, { status: 502 })
  }
}
