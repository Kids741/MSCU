"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import BlogPostCard from "@/components/blog-post-card"
import type { BlogCardPost } from "@/lib/blog-posts"

export default function BlogLoadMore({ initialIds, total }: { initialIds: number[]; total: number }) {
  const [posts, setPosts] = useState<BlogCardPost[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [announcement, setAnnouncement] = useState("")

  // After a batch loads, move keyboard focus to its first post.
  const [focusId, setFocusId] = useState<number | null>(null)
  const firstNewLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (focusId !== null) firstNewLink.current?.focus()
  }, [focusId])

  const shown = initialIds.length + posts.length
  const hasMore = shown < total

  async function loadMore() {
    setStatus("loading")
    try {
      const res = await fetch(`/api/blog-posts?offset=${shown}`)
      if (!res.ok) throw new Error("load failed")
      const data: { posts: BlogCardPost[] } = await res.json()

      // Skip anything already on the page (a new post shifts every offset by one).
      const seen = new Set([...initialIds, ...posts.map((p) => p.id)])
      const fresh = data.posts.filter((p) => !seen.has(p.id))

      setPosts([...posts, ...fresh])
      if (fresh.length) setFocusId(fresh[0].id)
      setAnnouncement(fresh.length ? `Loaded ${fresh.length} more posts` : "No more posts")
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      {posts.length > 0 && (
        <div className="grid gap-8 md:grid-cols-3 mt-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} linkRef={post.id === focusId ? firstNewLink : undefined} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-slate-500 mb-4">
          Showing {Math.min(shown, total)} of {total} posts
        </p>

        {hasMore && (
          <button
            type="button"
            onClick={loadMore}
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            {status === "loading" ? "Loading…" : "Load more posts"}
          </button>
        )}

        {status === "error" && (
          <p className="text-sm text-red-600 mt-3">Couldn&rsquo;t load more posts. Please try again.</p>
        )}

        <p role="status" aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    </>
  )
}
