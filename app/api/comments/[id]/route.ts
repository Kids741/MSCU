import { NextRequest, NextResponse } from "next/server"
import { updateComment, deleteComment } from "@/lib/comments-store"
import { isAdminAuthenticated } from "@/lib/require-admin"

// Body: { text, editToken } — self-service edit, only the original author.
// No admin bypass here on purpose: editing someone else's comment on their
// behalf isn't a capability admins need.
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
// With a matching editToken => self-service delete by the comment's author, no login needed.
// Without one => admin/moderator force-delete — this NOW requires a valid
// admin session. Previously this path had no protection at all, meaning
// anyone could delete any comment by simply omitting the token — that's
// fixed here.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let editToken: string | undefined
  try {
    const body = await req.json()
    editToken = body?.editToken
  } catch {
    // No body sent at all — treat as an admin force-delete attempt below.
  }

  if (!editToken) {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  const deleted = await deleteComment(id, editToken)
  if (!deleted) {
    return NextResponse.json({ error: "Not found, or you don't own this comment" }, { status: 403 })
  }
  return new NextResponse(null, { status: 204 })
}
