import type { Ref } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, Images } from "lucide-react"
import type { BlogCardPost } from "@/lib/blog-posts"

export default function BlogPostCard({
  post,
  featured = false,
  linkRef,
}: {
  post: BlogCardPost
  featured?: boolean
  linkRef?: Ref<HTMLAnchorElement>
}) {
  return (
    <article
      className={`group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        featured ? "md:col-span-3" : ""
      }`}
    >
      <Link href={post.href} ref={linkRef}>
        {/* Thumbnail */}
        <div className={`relative w-full bg-slate-100 ${featured ? "aspect-[21/9]" : "aspect-video"}`}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes={featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <Images className="w-10 h-10" />
            </div>
          )}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
        </div>

        <div className="p-6 md:p-8">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Title */}
          <h2
            className={`font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors ${
              featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            }`}
          >
            <span dangerouslySetInnerHTML={{ __html: post.titleHtml }} />
          </h2>

          {/* Excerpt */}
          <div
            className="text-slate-600 leading-relaxed line-clamp-3 mb-5 prose prose-slate prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
          />

          {/* Read more */}
          <span className="inline-flex items-center gap-2 text-blue-600 group-hover:text-blue-700 font-semibold text-sm">
            Read more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  )
}
