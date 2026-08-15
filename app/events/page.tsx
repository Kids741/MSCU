import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Calendar, MapPin, CalendarDays, ArrowLeft } from "lucide-react"
import { getEvents, type EventItem } from "@/lib/events-store"

export const metadata: Metadata = {
  title: "Events - MSCU",
  description: "All upcoming events from the MSCU community at the University of Nairobi.",
  alternates: { canonical: "https://medicalschoolcu.org/events" },
}

export const dynamic = "force-dynamic"

function sortEvents(events: EventItem[]): EventItem[] {
  const recurring = events.filter((e) => !e.eventDate)
  const dated = events
    .filter((e) => e.eventDate)
    .sort((a, b) => new Date(a.eventDate!).getTime() - new Date(b.eventDate!).getTime())
  return [...recurring, ...dated]
}

export default async function EventsPage() {
  const events = sortEvents(getEvents())

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="bg-blue-600 text-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              <CalendarDays className="w-12 h-12 opacity-80" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">All Events</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Everything happening across our community, in one place.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {events.length === 0 ? (
            <div className="text-center py-20">
              <CalendarDays className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">No events yet</h2>
              <p className="text-slate-500">Check back soon.</p>
            </div>
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
        </section>
      </main>
      <Footer />
    </>
  )
}
