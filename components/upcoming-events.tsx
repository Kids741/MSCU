export default function UpcomingEvents() {
  const events = [
    {
      title: "Bible Study Fellowship",
      date: "Every Wednesday, 7 PM",
      location: "Campus Chapel",
      color: "#1E88E5",
    },
    {
      title: "Medical Missions Outreach",
      date: "Next Saturday",
      location: "Community Health Center",
      color: "#43A047",
    },
    {
      title: "Prayer & Worship Night",
      date: "Friday, December 13",
      location: "Student Center",
      color: "#FB8C00",
    },
    {
      title: "Leadership Retreat",
      date: "December 27-29",
      location: "Mountain Retreat Center",
      color: "#1E88E5",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F5F5" }}>
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
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            className="px-8 py-3 rounded-lg text-white font-semibold transition hover:opacity-90"
            style={{ backgroundColor: "#1E88E5" }}
          >
            View Full Calendar
          </button>
        </div>
      </div>
    </section>
  )
}
