import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Calendar } from "lucide-react"

function buildSlugVariants(raw: string) {
  const variants = new Set<string>()
  variants.add(raw)

  try {
    variants.add(decodeURIComponent(raw))
  } catch {
    // ignore decode errors
  }

  for (const candidate of Array.from(variants)) {
    try {
      variants.add(encodeURIComponent(candidate))
    } catch {
      // ignore encode errors
    }
  }

  return Array.from(variants)
}

async function getPost(slug: string) {
  const variants = buildSlugVariants(slug)

  for (const variant of variants) {
    const endpoint = new URL(
      "https://public-api.wordpress.com/wp/v2/sites/msculiterature.wordpress.com/posts"
    )
    endpoint.searchParams.set("slug", variant)
    endpoint.searchParams.set("_embed", "1")

    try {
      const res = await fetch(endpoint.toString(), {
        next: { revalidate: 60 },
      })

      if (!res.ok) {
        continue
      }

      const data = await res.json()

      if (Array.isArray(data) && data.length) {
        return data[0]
      }
    } catch {
      // ignore transient fetch issues and try next variant
    }
  }

  return null
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post)
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-700 mb-4">Post not found</h1>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )

  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
  const date = post.date
    ? new Date(post.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero area */}
        <div className="bg-blue-600 text-white py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition mb-6 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {date && (
              <div className="flex items-center gap-2 mt-4 text-blue-200 text-sm">
                <Calendar className="w-4 h-4" />
                <time>{date}</time>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="w-full rounded-2xl mb-10 shadow-lg object-cover max-h-[480px]"
            />
          )}

          <div
            className="prose prose-lg prose-slate max-w-none
              prose-headings:text-slate-800 prose-headings:font-bold
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md
              prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Bottom nav */}
          <div className="mt-14 pt-8 border-t border-slate-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
