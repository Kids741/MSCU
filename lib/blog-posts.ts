// Shared WordPress blog helpers for /blog, its "Load more" button and search.

export const POSTS_ENDPOINT = "https://public-api.wordpress.com/wp/v2/sites/msculiterature.wordpress.com/posts"

// The first batch is 1 featured post + 24 cards; later batches are 24 so the
// 3-column grid always fills complete rows.
export const FIRST_BATCH_SIZE = 25
export const LOAD_MORE_SIZE = 24

type WPPost = {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  _embedded?: {
    "wp:featuredmedia"?: [
      {
        source_url: string
        media_details?: { width?: number; height?: number }
        alt_text?: string
      }
    ]
  }
}

export type BlogCardPost = {
  id: number
  href: string
  date: string
  titleHtml: string
  excerptHtml: string
  image: string | null
  imageAlt: string
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
}

// Plain text from WordPress HTML: tags removed, entities decoded, whitespace collapsed.
export function htmlToText(html: string) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim()
}

export function normalizeSlug(raw: string) {
  try {
    return encodeURIComponent(decodeURIComponent(raw))
  } catch {
    return encodeURIComponent(raw)
  }
}

function toBlogCardPost(post: WPPost): BlogCardPost {
  const media = post._embedded?.["wp:featuredmedia"]?.[0]
  return {
    id: post.id,
    href: `/blog/${normalizeSlug(post.slug)}`,
    date: post.date,
    titleHtml: post.title.rendered,
    excerptHtml: post.excerpt.rendered,
    image: media?.source_url ?? null,
    imageAlt: media?.alt_text || htmlToText(post.title.rendered),
  }
}

// Newest first. `total` is the number of posts on the blog, for "Load more".
export async function fetchPosts(offset: number, perPage: number): Promise<{ posts: BlogCardPost[]; total: number }> {
  const endpoint = new URL(POSTS_ENDPOINT)
  endpoint.searchParams.set("_fields", "id,slug,date,title.rendered,excerpt.rendered,_links,_embedded")
  endpoint.searchParams.set("per_page", String(perPage))
  endpoint.searchParams.set("_embed", "1")
  if (offset > 0) endpoint.searchParams.set("offset", String(offset))

  const res = await fetch(endpoint.toString(), {
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }

  const posts: WPPost[] = await res.json()
  const total = Number(res.headers.get("x-wp-total")) || posts.length
  return { posts: posts.map(toBlogCardPost), total }
}
