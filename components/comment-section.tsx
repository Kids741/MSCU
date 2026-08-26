"use client"

import { useEffect, useState, type FormEvent } from "react"
import { MessageCircle, Send, Pencil, Trash2, X, Check } from "lucide-react"

type Comment = {
  id: string
  name: string
  text: string
  createdAt: string
  updatedAt: string | null
}

function tokenKey(commentId: string) {
  return `mscu-comment-token:${commentId}`
}

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set())

  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [website, setWebsite] = useState("") // honeypot
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [editSubmitting, setEditSubmitting] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
    const data: Comment[] = await res.json()
    setComments(data)

    // A comment is "owned" by this browser if we have a saved edit token for it.
    const owned = new Set<string>()
    for (const c of data) {
      if (localStorage.getItem(tokenKey(c.id))) owned.add(c.id)
    }
    setOwnedIds(owned)
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !text.trim()) {
      setStatus("Please add your name and a comment.")
      return
    }
    setSubmitting(true)
    setStatus("")
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: name.trim(), text: text.trim(), website }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")

      if (data.editToken) {
        localStorage.setItem(tokenKey(data.id), data.editToken)
      }

      setName("")
      setText("")
      setStatus("")
      load()
    } catch (err: any) {
      setStatus(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  function startEdit(comment: Comment) {
    setEditingId(comment.id)
    setEditText(comment.text)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditText("")
  }

  async function saveEdit(id: string) {
    const editToken = localStorage.getItem(tokenKey(id))
    if (!editToken || !editText.trim()) return

    setEditSubmitting(true)
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText.trim(), editToken }),
      })
      if (!res.ok) throw new Error((await res.json()).error || "Could not save changes")
      setEditingId(null)
      setEditText("")
      load()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setEditSubmitting(false)
    }
  }

  async function removeComment(id: string) {
    const editToken = localStorage.getItem(tokenKey(id))
    if (!editToken) return
    if (!confirm("Delete your comment?")) return

    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editToken }),
    })
    localStorage.removeItem(tokenKey(id))
    load()
  }

  return (
    <div className="mt-14 pt-8 border-t border-slate-200">
      <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 mb-6">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {loading ? (
        <p className="text-slate-400 text-sm mb-8">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-slate-500 text-sm mb-8">No comments yet — be the first to share your thoughts.</p>
      ) : (
        <div className="space-y-5 mb-8">
          {comments.map((c) => (
            <div key={c.id} className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1 gap-3">
                <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                <div className="flex items-center gap-3 shrink-0">
                  <p className="text-xs text-slate-400">
                    {new Date(c.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {c.updatedAt && " (edited)"}
                  </p>
                  {ownedIds.has(c.id) && editingId !== c.id && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(c)}
                        aria-label="Edit your comment"
                        className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeComment(c.id)}
                        aria-label="Delete your comment"
                        className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {editingId === c.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => saveEdit(c.id)}
                      disabled={editSubmitting}
                      className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-600 text-sm leading-relaxed">{c.text}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Leave a comment</h3>

        {/* Honeypot field — hidden from real users via CSS, bots that fill every field trip it */}
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
          Post comment
        </button>
        {status && <p className="text-slate-500 text-sm mt-3">{status}</p>}
      </form>
    </div>
  )
}
