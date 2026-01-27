import Header from "@/components/header"
import Footer from "@/components/footer"

const devotionals = [
  {
    title: "The Healer Within",
    date: "December 31, 2025",
    excerpt: "Reflecting on Jesus as the ultimate healer and what it means for us as Christian physicians.",
    category: "Faith",
  },
  {
    title: "Compassion in Clinical Practice",
    date: "December 24, 2025",
    excerpt: "How to maintain compassion and human connection in an increasingly technological healthcare environment.",
    category: "Medicine",
  },
  {
    title: "Called to Serve",
    date: "December 17, 2025",
    excerpt: "Exploring our calling to serve others with excellence and how that shapes our identity as physicians.",
    category: "Calling",
  },
  {
    title: "Burnout and Grace",
    date: "December 10, 2025",
    excerpt: "Finding God's grace in moments of exhaustion and burnout during medical school and practice.",
    category: "Wellness",
  },
  {
    title: "Integrity in Healthcare",
    date: "December 3, 2025",
    excerpt: "Standing firm in your values while navigating ethical challenges in modern medicine.",
    category: "Ethics",
  },
  {
    title: "Praying for Patients",
    date: "November 26, 2025",
    excerpt: "The power of intercessory prayer and how it deepens our commitment to patient care.",
    category: "Faith",
  },
]

export default function BlogPage() {
  return (
    <main>
      <Header />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E8F5E9" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center" style={{ color: "#43A047" }}>
            Devotionals & Reflections
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Weekly devotionals exploring faith, medicine, and our calling to serve with excellence and compassion.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {devotionals.map((post, i) => (
            <article
              key={i}
              className="p-8 rounded-lg shadow-sm hover:shadow-md transition border-l-4 bg-white cursor-pointer"
              style={{ borderColor: "#1E88E5" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: "#43A047" }}
                >
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E88E5" }}>
                {post.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">{post.excerpt}</p>
              <button
                className="text-white font-semibold py-2 px-4 rounded-lg transition hover:opacity-90"
                style={{ backgroundColor: "#FB8C00" }}
              >
                Read More
              </button>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
