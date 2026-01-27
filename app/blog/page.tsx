import Header from "@/components/header"
import Footer from "@/components/footer"

const blogPosts = [
  {
    title: "The Future of Healthcare Technology",
    date: "December 28, 2025",
    excerpt: "Exploring how AI and digital innovation are transforming patient care and medical education.",
    category: "Technology",
  },
  {
    title: "Student Life at MSCU",
    date: "December 20, 2025",
    excerpt: "A behind-the-scenes look at the vibrant community and activities that define the MSCU experience.",
    category: "Community",
  },
  {
    title: "Interview: Dr. Sarah's Journey",
    date: "December 15, 2025",
    excerpt: "An inspiring conversation with one of our faculty members about their path in medicine and faith.",
    category: "Features",
  },
  {
    title: "Research Highlights",
    date: "December 8, 2025",
    excerpt: "Showcasing the groundbreaking research being conducted by our students and faculty members.",
    category: "Research",
  },
  {
    title: "Wellness Tips for Medical Students",
    date: "December 1, 2025",
    excerpt: "Practical advice for maintaining physical and mental health during your medical journey.",
    category: "Wellness",
  },
  {
    title: "Alumni Spotlight",
    date: "November 24, 2025",
    excerpt: "Celebrating the achievements of MSCU alumni making a difference in healthcare and their communities.",
    category: "Alumni",
  },
]

export default function BlogPage() {
  return (
    <main>
      <Header />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E3F2FD" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center" style={{ color: "#1E88E5" }}>
            Blog
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Stories, insights, and updates from the MSCU community about medicine, faith, and making a difference.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <article
              key={i}
              className="p-8 rounded-lg shadow-sm hover:shadow-md transition border-l-4 bg-white cursor-pointer"
              style={{ borderColor: "#1E88E5" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: "#FB8C00" }}
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
                style={{ backgroundColor: "#1E88E5" }}
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
