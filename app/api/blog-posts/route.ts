import { NextRequest, NextResponse } from "next/server"
import { fetchPosts, LOAD_MORE_SIZE } from "@/lib/blog-posts"

// The next batch of posts for the "Load more" button on /blog.
// GET /api/blog-posts?offset=25

export async function GET(req: NextRequest) {
  const offset = Number(req.nextUrl.searchParams.get("offset"))

  if (!Number.isInteger(offset) || offset < 1 || offset > 5000) {
    return NextResponse.json({ error: "Invalid offset" }, { status: 400 })
  }

  try {
    return NextResponse.json(await fetchPosts(offset, LOAD_MORE_SIZE))
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Couldn't load more posts" }, { status: 502 })
  }
}
