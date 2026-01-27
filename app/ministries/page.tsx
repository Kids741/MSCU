import Header from "@/components/header"
import Footer from "@/components/footer"

const ministries = [
  {
    title: "Bible Study & Fellowship",
    icon: "📖",
    description:
      "Join us for weekly Bible studies where we explore Scripture and discuss how our faith applies to medicine and healthcare ethics.",
  },
  {
    title: "Outreach & Evangelism",
    icon: "🤝",
    description:
      "Share the Gospel with your peers and engage in meaningful conversations about faith, purpose, and calling in the medical field.",
  },
  {
    title: "Medical Missions",
    icon: "🩺",
    description:
      "Participate in community health initiatives and global medical missions that combine healing with Christian witness.",
  },
  {
    title: "Discipleship & Mentorship",
    icon: "🌱",
    description:
      "Grow in your faith through one-on-one mentorship and small group discipleship programs designed for medical students.",
  },
  {
    title: "Prayer & Worship",
    icon: "🙏",
    description:
      "Connect with God through corporate worship, prayer meetings, and contemplative spirituality practices.",
  },
  {
    title: "Professional Development",
    icon: "⭐",
    description:
      "Develop your skills as a Christian leader and physician through workshops and training on ethics, leadership, and servant ministry.",
  },
]

export default function MinistriesPage() {
  return (
    <main>
      <Header />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E3F2FD" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center" style={{ color: "#1E88E5" }}>
            Our Ministries
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Explore the various ways you can grow your faith, serve others, and develop as a Christian physician.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, i) => (
            <div
              key={i}
              className="p-8 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer bg-white border border-gray-100"
            >
              <div className="text-5xl mb-4">{ministry.icon}</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#1E88E5" }}>
                {ministry.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{ministry.description}</p>
              <button
                className="mt-6 text-white font-semibold py-2 px-4 rounded-lg transition hover:opacity-90"
                style={{ backgroundColor: "#43A047" }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
