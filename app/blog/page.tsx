import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogSearch from "@/components/blog-search"
import BlogPostCard from "@/components/blog-post-card"
import BlogLoadMore from "@/components/blog-load-more"
import { fetchPosts, FIRST_BATCH_SIZE } from "@/lib/blog-posts"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Stories & Devotionals",
  description:
    "Stories, devotionals, and reflections from the MSCU community of faith-driven medical students at the University of Nairobi.",
  alternates: { canonical: "https://medicalschoolcu.org/blog" },
  openGraph: {
    title: "MSCU Blog - Stories & Devotionals",
    description:
      "Stories, devotionals, and reflections from our community of faith-driven medical students.",
    url: "https://medicalschoolcu.org/blog",
    type: "website",
  },
}

export default async function BlogIndexPage() {
  const { posts, total } = await fetchPosts(0, FIRST_BATCH_SIZE)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero banner */}
        <section className="relative bg-blue-600 text-white py-16 md:py-24">
          <div className="absolute inset-x-0 top-0">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex justify-end">
              <BlogSearch />
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-12 h-12 opacity-80" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              MSCU Blog
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Stories, devotionals, and reflections from our community of
              faith-driven medical students.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {!posts.length ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">
                No posts yet
              </h2>
              <p className="text-slate-500">Check back soon for new content.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-3">
                {posts.map((post, i) => (
                  <BlogPostCard key={post.id} post={post} featured={i === 0} />
                ))}
              </div>
              <BlogLoadMore initialIds={posts.map((post) => post.id)} total={total} />
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
