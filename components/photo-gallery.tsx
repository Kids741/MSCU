import Image from "next/image"
import Link from "next/link"
import { Camera, ExternalLink, ArrowRight, Images } from "lucide-react"
import { getGalleries } from "@/lib/gallery-store"

// How many recent galleries to preview on the homepage.
const PREVIEW_COUNT = 3

export default async function PhotoGallery() {
  const galleries = getGalleries().slice(0, PREVIEW_COUNT)

  // Nothing added yet — skip the section rather than showing an empty box.
  if (galleries.length === 0) return null

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Photo Gallery</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Moments from our community</h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm shrink-0"
          >
            View full gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {galleries.map((g) => (
            <a
              key={g.id}
              href={g.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                {g.coverImage ? (
                  <Image
                    src={`/gallery-images/${g.coverImage}`}
                    alt={`${g.title} — album cover`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Images className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1.5 line-clamp-1">
                  {g.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                  View album <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
