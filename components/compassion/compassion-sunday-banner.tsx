"use client"

import { useSyncExternalStore } from "react"
import { CalendarHeart } from "lucide-react"

// The banner hides itself once Compassion Sunday has passed (end of the day,
// Nairobi time). Update or remove this when the next date is announced.
const HIDE_AFTER = new Date("2026-11-30T00:00:00+03:00").getTime()

const subscribe = () => () => {}

export default function CompassionSundayBanner() {
  // Read on the client so a statically built page doesn't freeze the date;
  // the server render always shows the banner.
  const hasPassed = useSyncExternalStore(
    subscribe,
    () => Date.now() >= HIDE_AFTER,
    () => false
  )

  if (hasPassed) return null

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <div
        className="rounded-2xl border border-orange-200 p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left shadow-sm"
        style={{ backgroundColor: "#FFF3E0" }}
      >
        <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-white" style={{ color: "#FB8C00" }}>
          <CalendarHeart size={28} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#FB8C00" }}>
            Upcoming
          </p>
          <h2 className="text-2xl font-bold text-gray-800">Compassion Sunday &mdash; Sunday, 29th November</h2>
          <p className="text-gray-700 mt-1">Mark the date and join us as we show Christ&rsquo;s love in action.</p>
        </div>
        <a
          href="#support"
          className="shrink-0 inline-block text-white font-semibold py-2.5 px-6 rounded-lg transition hover:opacity-90"
          style={{ backgroundColor: "#FB8C00" }}
        >
          Support the ministry
        </a>
      </div>
    </section>
  )
}
