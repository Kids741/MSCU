import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { getEvents, type EventItem } from "@/lib/events-store"

const PREVIEW_COUNT = 4

function sortForPreview(events: EventItem[]): EventItem[] {
  const recurring = events.filter((e) => !e.eventDate)
  const dated = events
    .filter((e) => e.eventDate)
    .sort((a, b) => new Date(a.eventDate!).getTime() - new Date(b.eventDate!).getTime())
  return [...recurring, ...dated]
}

export default async function UpcomingEvents() {
  const allEvents = await getEvents()
  const events = sortForPreview(allEvents).slice(0, PREVIEW_COUNT)

  return (
    <section id="events" className="scroll-mt-24 py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: "#1E88E5" }}>
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming events right now — check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition border-l-4"
                style={{ borderColor: event.color }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: event.color }}>
                  {event.title}
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: event.color }} />
                    {event.displayDate}
                  </p>
                  {event.location && (
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: event.color }} />
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {allEvents.length > PREVIEW_COUNT && (
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold border-2 transition hover:bg-white"
              style={{ borderColor: "#1E88E5", color: "#1E88E5" }}
            >
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <a
            href="/program-calendar-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg text-white font-semibold transition hover:opacity-90"
            style={{ backgroundColor: "#1E88E5" }}
          >
            View Full Calendar
          </a>
        </div>
      </div>
    </section>
  )
}
