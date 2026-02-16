import { Calendar, MapPin } from "lucide-react"

export default function UpcomingEvents() {
  const events = [
    {
      title: "Bible Study Fellowship",
      date: "Every Thursday, 7 PM",
      location: "Student residence",
      color: "#1E88E5",
    },
    {
      title: "Battle of Years",
      date: "27th March 2026",
      location: "KNH Mess Hall",
      color: "#43A047",
    },
    {
      title: "Union Prayer Day ",
      date: "Every Monday 5.00-6.00pm",
      location: "Prayer room",
      color: "#FB8C00",
    },
    {
      title: "Elders Night",
      date: "May",
      location: "Nairobi Baptist Church",
      color: "#1E88E5",
    },
  ]

  return (
    <section id="events" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: "#1E88E5" }}>
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition border-l-4"
              style={{ borderColor: event.color }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: event.color }}>
                {event.title}
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: event.color }} />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: event.color }} />
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
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
