export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Second Year Student",
      text: "MSCU has been a beacon of hope during my medical school journey. The community, the faith, and the support have been transformative.",
    },
    {
      name: "David Chen",
      role: "Fourth Year Student",
      text: "Being part of MSCU taught me that medicine is not just about treating diseases, but about healing the whole person with compassion.",
    },
    {
      name: "Emily Rodriguez",
      role: "Medical Missions Lead",
      text: "The outreach opportunities through MSCU have shown me the real-world impact of combining medicine with Christian service.",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: "#1E88E5" }}>
        Member Reflections
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="p-8 rounded-lg shadow-sm hover:shadow-md transition border-t-4"
            style={{ borderColor: "#43A047", backgroundColor: "#FAFAFA" }}
          >
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, j) => (
                <span key={j} style={{ color: "#FB8C00" }}>
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
            <div>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-sm" style={{ color: "#1E88E5" }}>
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
