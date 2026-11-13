"use client"

import { useState, type FormEvent } from "react"
import { MessageSquare, Send } from "lucide-react"

const MAX_LENGTH = 2000

export default function AnonymousMessageForm() {
  const [content, setContent] = useState("")
  const [website, setWebsite] = useState("") // honeypot
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!content.trim()) {
      setStatus({ kind: "error", text: "Please write a message before sending." })
      return
    }
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch("/api/compassion-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), website }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "We couldn't send your message. Please try again later.")
      setContent("")
      setStatus({ kind: "success", text: "Thank you. Your message has been sent anonymously to the Compassion team." })
    } catch (err) {
      setStatus({
        kind: "error",
        text: err instanceof Error ? err.message : "We couldn't send your message. Please try again later.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="messages" className="scroll-mt-24 py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <MessageSquare className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1E88E5" }}>
            Share Anonymously
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Send an anonymous message of encouragement, a prayer request, or a need you&rsquo;d like the Compassion team
            to know about. We don&rsquo;t ask for your name, and messages are only seen by the team.
          </p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
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

          <label htmlFor="anonymous-message" className="block font-semibold text-gray-800 mb-2">
            Your message
          </label>
          <textarea
            id="anonymous-message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={MAX_LENGTH}
            rows={6}
            placeholder="Write encouragement, a prayer, or words of compassion..."
            aria-describedby="anonymous-message-count"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p id="anonymous-message-count" className="text-xs text-gray-500 text-right mt-1">
            {content.length}/{MAX_LENGTH}
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="mt-3 inline-flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-lg transition hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            style={{ backgroundColor: "#1E88E5" }}
          >
            <Send className="w-4 h-4" />
            {submitting ? "Sending…" : "Send anonymously"}
          </button>

          <div role="status" aria-live="polite">
            {status && (
              <p className={`text-sm mt-3 ${status.kind === "success" ? "text-green-700" : "text-red-600"}`}>{status.text}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
