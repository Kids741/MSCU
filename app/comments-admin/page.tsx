"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MessageSquareText, Trash2 } from "lucide-react"

type Comment = {
  id: string
  slug: string
  name: string
  text: string
  createdAt: string
  updatedAt: string | null
}

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const res = await fetch("/api/comments/all")
    setComments(await res.json())
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(id: string) {
    if (!confirm("Delete this comment? This can't be undone.")) return
    // No editToken sent — this is the admin/moderator path, which can
    // remove any comment regardless of who posted it.
    await fetch(`/api/comments/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-4">
            <MessageSquareText className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-3">Comments</h1>
          <p className="text-slate-500 text-center mb-10">
            Comments post immediately without approval — use this to remove anything inappropriate or spammy.
          </p>

          {loading ? (
            <p className="text-slate-500 text-sm text-center">Loading…</p>
          ) : comments.length === 0 ? (
            <p className="text-slate-500 text-sm text-center">No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-400 truncate">
                        on <span className="font-mono">{c.slug}</span> · {new Date(c.createdAt).toLocaleString()}
                        {c.updatedAt && " · edited"}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(c.id)}
                      aria-label="Delete"
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
