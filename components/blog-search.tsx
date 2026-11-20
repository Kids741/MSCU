"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import Link from "next/link"
import { Search, X, Loader2, Calendar } from "lucide-react"

type SearchResult = {
  href: string
  title: string
  date: string
  snippet: string
}

type SearchResponse =
  | { q: string; results: SearchResult[]; total: number; error?: undefined }
  | { q: string; error: true }

const MIN_LENGTH = 2
const DEBOUNCE_MS = 250

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// Wraps every occurrence of the search terms in <mark>.
function highlight(text: string, query: string): ReactNode {
  const terms = query.split(/\s+/).filter(Boolean).map(escapeRegExp)
  if (!terms.length) return text
  const pattern = new RegExp(`(${terms.join("|")})`, "gi")
  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-yellow-100 text-slate-900 rounded-sm">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export default function BlogSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [data, setData] = useState<SearchResponse | null>(null)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const q = query.trim()
  const current = data && data.q === q ? data : null
  const loading = q.length >= MIN_LENGTH && !current
  const resultCount = current && !current.error ? current.results.length : 0

  // Debounced search; results are stored with the query they belong to, so a
  // stale response never shows against newer text.
  useEffect(() => {
    if (q.length < MIN_LENGTH) return
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/blog-search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        if (!res.ok) throw new Error("search failed")
        const body = await res.json()
        setData({ q, results: body.results, total: body.total })
      } catch {
        if (!controller.signal.aborted) setData({ q, error: true })
      }
    }, DEBOUNCE_MS)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [q])

  // Lock page scroll and move focus to the search box while the panel is open.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    // Keep the last search but select it, so typing starts a fresh one.
    inputRef.current?.select()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  function close() {
    setOpen(false)
    triggerRef.current?.focus()
  }

  function visibleResults() {
    return resultRefs.current.slice(0, resultCount).filter((el): el is HTMLAnchorElement => !!el)
  }

  function focusResult(index: number) {
    const links = visibleResults()
    if (!links.length) return
    if (index < 0) inputRef.current?.focus()
    else links[Math.min(index, links.length - 1)].focus()
  }

  function onDialogKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault()
      close()
      return
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const links = visibleResults()
      if (!links.length) return
      const active = links.indexOf(document.activeElement as HTMLAnchorElement)
      e.preventDefault()
      focusResult(e.key === "ArrowDown" ? active + 1 : active - 1)
      return
    }
    // Keep Tab focus inside the panel.
    if (e.key === "Tab" && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("input, button, a[href]")
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search articles"
        aria-haspopup="dialog"
        className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Search className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-slate-900/50 px-4 pt-4 sm:pt-20" onClick={close}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search articles"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onDialogKeyDown}
            className="max-w-2xl mx-auto bg-white text-left text-slate-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 border-b border-slate-200">
              <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                aria-describedby="blog-search-status"
                maxLength={100}
                className="flex-1 min-w-0 py-4 text-base text-slate-800 placeholder:text-slate-400 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {loading && <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" aria-hidden="true" />}
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="p-2 -mr-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto">
              <p id="blog-search-status" role="status" aria-live="polite" className="sr-only">
                {loading
                  ? "Searching"
                  : current?.error
                    ? "Search isn't available right now"
                    : current
                      ? `${current.results.length} of ${current.total} articles shown`
                      : ""}
              </p>

              {q.length < MIN_LENGTH ? (
                <p className="px-5 py-6 text-sm text-slate-500">
                  Search every article by title or any words inside it.
                </p>
              ) : loading ? (
                <p className="px-5 py-6 text-sm text-slate-500">Searching…</p>
              ) : current?.error ? (
                <p className="px-5 py-6 text-sm text-red-600">Search isn&rsquo;t available right now. Please try again shortly.</p>
              ) : current && current.results.length === 0 ? (
                <p className="px-5 py-6 text-sm text-slate-500">
                  No articles found for &ldquo;{q}&rdquo;.
                </p>
              ) : current ? (
                <>
                  <ul className="divide-y divide-slate-100">
                    {current.results.map((result, i) => (
                      <li key={result.href}>
                        <Link
                          ref={(el) => {
                            resultRefs.current[i] = el
                          }}
                          href={result.href}
                          onClick={() => setOpen(false)}
                          className="block px-5 py-4 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors"
                        >
                          <span className="block font-semibold text-slate-800">{highlight(result.title, q)}</span>
                          <span className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                            {new Date(result.date).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="block text-sm text-slate-600 leading-relaxed mt-2">
                            {highlight(result.snippet, q)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {current.total > current.results.length && (
                    <p className="px-5 py-3 text-xs text-slate-500 border-t border-slate-100">
                      Showing the {current.results.length} best matches of {current.total}. Add more words to narrow it down.
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
