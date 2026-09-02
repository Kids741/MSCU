import { NextRequest, NextResponse } from "next/server"
import { getComments, addComment } from "@/lib/comments-store"

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 })
  return NextResponse.json(await getComments(slug))
}

// Body: { slug, name, text, website? }
// `website` is a honeypot field — real visitors never see or fill it, so
// any submission with it filled in is silently discarded (fake success
// returned so bots don't learn to work around it).
//
// Comments post immediately (no approval step). The response includes
// `editToken`, which the browser stores locally so this visitor — and only
// this visitor — can edit or delete this specific comment later.
export async function POST(req: NextRequest) {
  try {
    const { slug, name, text, website } = await req.json()

    if (!slug || !name?.trim() || !text?.trim()) {
      return NextResponse.json({ error: "Name and comment are both required" }, { status: 400 })
    }
    if (text.trim().length > 2000) {
      return NextResponse.json({ error: "Comment is too long" }, { status: 400 })
    }

    if (website) {
      // Honeypot tripped — pretend success without saving anything.
      return NextResponse.json({ message: "Comment posted." }, { status: 201 })
    }

    const comment = await addComment({ slug, name: name.trim().slice(0, 80), text: text.trim() })

    return NextResponse.json(
      {
        id: comment.id,
        slug: comment.slug,
        name: comment.name,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        editToken: comment.editToken, // returned once, here only — the client is responsible for saving it
      },
      { status: 201 }
    )
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
