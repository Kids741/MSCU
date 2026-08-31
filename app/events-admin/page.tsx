"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CalendarPlus, Trash2 } from "lucide-react"
import AdminLogoutButton from "@/components/admin-logout-button"

type EventItem = {
  id: string
  title: string
  location: string
  color: string
  displayDate: string
  eventDate: string | null
  createdAt: string
}

const COLOR_OPTIONS = [
  { label: "Blue", value: "#1E88E5" },
  { label: "Green", value: "#43A047" },
  { label: "Orange", value: "#FB8C00" },
  { label: "Purple", value: "#8E24AA" },
  { label: "Red", value: "#E53935" },
  { label: "Gold", value: "#FFD700" },
  { label: "Deep Blue", value: "#041f5c" },
  { label: "Pink", value: "#F48FB1" },
]

export default function EventsAdminPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [color, setColor] = useState(COLOR_OPTIONS[0].value)
  const [isRecurring, setIsRecurring] = useState(false)
  const [displayDate, setDisplayDate] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState("")

  async function loadEvents() {
    const res = await fetch("/api/events")
    setEvents(await res.json())
  }

  useEffect(() => {
    loadEvents()
  }, [])

  async function save() {
    if (!title.trim() || !displayDate.trim()) {
      setStatus("Title and the date/time text are both required.")
      return
    }
    if (!isRecurring && !eventDate) {
      setStatus("Pick a date, or mark this as a recurring event.")
      return
    }
    setSaving(true)
    setStatus("")
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          location: location.trim(),
          color,
          displayDate: displayDate.trim(),
          eventDate: isRecurring ? null : eventDate,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      setStatus("Saved!")
      setTitle("")
      setLocation("")
      setDisplayDate("")
      setEventDate("")
      setIsRecurring(false)
      loadEvents()
    } catch (err: any) {
      setStatus(`Error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this event?")) return
    await fetch(`/api/events/${id}`, { method: "DELETE" })
    loadEvents()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-4">
            <CalendarPlus className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-3">Manage events</h1>
          <p className="text-slate-500 text-center mb-10">
            One-time events auto-remove themselves a week after the date. Recurring events (weekly meetings, etc.)
            stay up permanently.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-10">
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Battle of Years"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. KNH Mess Hall"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded border-slate-300"
                />
                This is a recurring event (never auto-removes)
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Date/time shown on the card
              </label>
              <input
                value={displayDate}
                onChange={(e) => setDisplayDate(e.target.value)}
                placeholder={isRecurring ? "e.g. Every Thursday, 7 PM" : "e.g. 27th March 2026"}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                This exact text is what visitors see — write it however you'd like it displayed.
              </p>
            </div>

            {!isRecurring && (
              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                  Actual event date (for auto-removal)
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-400 mt-1.5">
                  Used only to auto-remove this event a week after it happens — not shown to visitors.
                </p>
              </div>
            )}

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Accent color
              </label>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    title={c.label}
                    className={`w-9 h-9 rounded-full border-2 ${
                      color === c.value ? "border-slate-800" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Save event
            </button>
            {status && <p className="text-slate-500 text-sm mt-3">{status}</p>}
          </div>

          <h2 className="text-lg font-bold text-slate-800 mb-4">Current events</h2>
          {events.length === 0 ? (
            <p className="text-slate-500 text-sm">None added yet.</p>
          ) : (
            <div className="space-y-3">
              {events.map((e) => (
                <div key={e.id} className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 p-3">
                  <div className="w-2 self-stretch rounded-full shrink-0" style={{ backgroundColor: e.color }} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 truncate">{e.title}</p>
                    <p className="text-xs text-slate-500">
                      {e.displayDate} {e.location && `· ${e.location}`}
                      {!e.eventDate && " · Recurring"}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(e.id)}
                    aria-label={`Remove ${e.title}`}
                    className="text-slate-400 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <AdminLogoutButton />
      </main>
      <Footer />
    </>
  )
}
