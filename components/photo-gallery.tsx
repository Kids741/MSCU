import Image from "next/image"
import Link from "next/link"
import { Camera, ExternalLink, ArrowRight, Images } from "lucide-react"
import { getGalleries } from "@/lib/gallery-store"

// How many recent galleries to preview on the homepage.
const PREVIEW_COUNT = 4

export default async function PhotoGallery() {
  const allGalleries = getGalleries()
  const galleries = allGalleries.slice(0, PREVIEW_COUNT)

  // Nothing added yet — skip the section rather than showing an empty box.
  if (galleries.length === 0) return null

  return (
    <section id="photo-gallery" className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-600">Photo Gallery</h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Glimpses of our community, events, and the meaningful work we do together.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
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

        {allGalleries.length > PREVIEW_COUNT && (
          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 text-blue-600 transition hover:bg-blue-50"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
