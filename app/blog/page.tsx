import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BookOpen, Calendar, ArrowRight } from "lucide-react"

function normalizeSlug(raw: string) {
  try {
    return encodeURIComponent(decodeURIComponent(raw))
  } catch {
    return encodeURIComponent(raw)
  }
}

type WPPost = {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
}

async function getPosts(): Promise<WPPost[]> {
  const res = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/msculiterature.wordpress.com/posts?_fields=id,slug,date,title.rendered,excerpt.rendered&per_page=12",
    {
      next: { revalidate: 300 },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }

  return res.json()
}

export default async function BlogIndexPage() {
  const posts = await getPosts()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero banner */}
        <section className="bg-blue-600 text-white py-16 md:py-24">
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
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post, i) => (
                <article
                  key={post.id}
                  className={`group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Accent bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />

                  <div className="p-6 md:p-8 pt-7">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    {/* Title */}
                    <h2
                      className={`font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors ${
                        i === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      <Link href={`/blog/${normalizeSlug(post.slug)}`}>
                        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <div
                      className="text-slate-600 leading-relaxed line-clamp-3 mb-5 prose prose-slate prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    {/* Read more */}
                    <Link
                      href={`/blog/${normalizeSlug(post.slug)}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group/link"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
