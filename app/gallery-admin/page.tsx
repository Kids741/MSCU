"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ImagePlus, Trash2, ExternalLink } from "lucide-react"
import AdminLogoutButton from "@/components/admin-logout-button"

type Gallery = {
  id: string
  title: string
  description: string
  albumUrl: string
  coverImage: string | null
  createdAt: string
}

export default function GalleryAdminPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [albumUrl, setAlbumUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState("")

  async function loadGalleries() {
    const res = await fetch("/api/galleries")
    setGalleries(await res.json())
  }

  useEffect(() => {
    loadGalleries()
  }, [])

  async function save() {
    if (!title.trim() || !albumUrl.trim()) {
      setStatus("Title and album link are both required.")
      return
    }
    setSaving(true)
    setStatus("Fetching the album cover…")
    try {
      const res = await fetch("/api/galleries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), albumUrl: albumUrl.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      setStatus("Saved!")
      setTitle("")
      setDescription("")
      setAlbumUrl("")
      loadGalleries()
    } catch (err: any) {
      setStatus(`Error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this gallery link from the site?")) return
    await fetch(`/api/galleries/${id}`, { method: "DELETE" })
    loadGalleries()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-4">
            <ImagePlus className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-3">Add an album link</h1>
          <p className="text-slate-500 text-center mb-10">
            Paste a public Google Photos shared-album link. We&apos;ll pull its cover photo automatically and show a
            card on the site that links straight out to the album.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-10">
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Retreat 2026"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Google Photos album link
              </label>
              <input
                value={albumUrl}
                onChange={(e) => setAlbumUrl(e.target.value)}
                placeholder="https://photos.app.goo.gl/..."
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                In the Google Photos app: open the album → Share → Create link → copy it here.
              </p>
            </div>

            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Save gallery
            </button>
            {status && <p className="text-slate-500 text-sm mt-3">{status}</p>}
          </div>

          <h2 className="text-lg font-bold text-slate-800 mb-4">Current galleries</h2>
          {galleries.length === 0 ? (
            <p className="text-slate-500 text-sm">None added yet.</p>
          ) : (
            <div className="space-y-3">
              {galleries.map((g) => (
                <div
                  key={g.id}
                  className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 p-3"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    {g.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={g.coverImage} alt={g.title} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 truncate">{g.title}</p>
                    <a
                      href={g.albumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      Open album <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <button
                    onClick={() => remove(g.id)}
                    aria-label={`Remove ${g.title}`}
                    className="text-slate-400 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <AdminLogoutButton />
      <Footer />
    </>
  )
}
