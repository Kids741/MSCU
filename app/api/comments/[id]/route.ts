import { NextRequest, NextResponse } from "next/server"
import { updateComment, deleteComment } from "@/lib/comments-store"

// Body: { text, editToken } — self-service edit, only the original author can do this.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const { text, editToken } = await req.json()
    if (!text?.trim()) {
      return NextResponse.json({ error: "Comment can't be empty" }, { status: 400 })
    }
    if (text.trim().length > 2000) {
      return NextResponse.json({ error: "Comment is too long" }, { status: 400 })
    }
    if (!editToken) {
      return NextResponse.json({ error: "Missing edit permission" }, { status: 403 })
    }

    const result = await updateComment(id, text.trim(), editToken)
    if (!result.ok) {
      const status = result.reason === "not_found" ? 404 : 403
      const error = result.reason === "not_found" ? "Comment not found" : "You can only edit your own comment"
      return NextResponse.json({ error }, { status })
    }
    return NextResponse.json(result.comment)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Body (optional): { editToken }
// With a matching editToken => self-service delete by the comment's author.
// Without one => admin/moderator delete (used by /comments-admin).
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let editToken: string | undefined
  try {
    const body = await req.json()
    editToken = body?.editToken
  } catch {
    // No body sent — that's the admin case, fine.
  }

  const deleted = await deleteComment(id, editToken)
  if (!deleted) {
    return NextResponse.json({ error: "Not found, or you don't own this comment" }, { status: 403 })
  }
  return new NextResponse(null, { status: 204 })
}
