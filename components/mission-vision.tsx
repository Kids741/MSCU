export default function MissionVision() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#1E88E5" }}>
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              To be a fellowship that equips Christian medical students to integrate their faith with their medical
              calling, fostering excellence in medicine and compassionate service to humanity.
            </p>
            <div className="text-4xl" style={{ color: "#43A047" }}>
              🎯
            </div>
          </div>

          {/* Vision */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#1E88E5" }}>
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              To develop Christian physicians who serve with integrity, compassion, and excellence; who are witnesses to
              God's healing power and love in their medical practice.
            </p>
            <div className="text-4xl" style={{ color: "#43A047" }}>
              ✨
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 pt-12 border-t" style={{ borderColor: "#E0E0E0" }}>
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: "#1E88E5" }}>
            Our Core Values
          </h3>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { value: "Faith", emoji: "⛪" },
              { value: "Service", emoji: "🤝" },
              { value: "Integrity", emoji: "✋" },
              { value: "Compassion", emoji: "❤️" },
              { value: "Excellence", emoji: "⭐" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
