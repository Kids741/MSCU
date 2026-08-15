import type { Metadata } from "next"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Camera, Calendar, ExternalLink, Images } from "lucide-react"
import { getGalleries } from "@/lib/gallery-store"

export const metadata: Metadata = {
  title: "Gallery - Photos",
  description:
    "Photos from the MSCU community of faith-driven medical students at the University of Nairobi.",
  alternates: { canonical: "https://medicalschoolcu.org/gallery" },
  openGraph: {
    title: "MSCU Gallery - Photos",
    description: "Photos from our community of faith-driven medical students.",
    url: "https://medicalschoolcu.org/gallery",
    type: "website",
  },
}

// Galleries are added through /gallery-admin, so always read the latest list.
export const dynamic = "force-dynamic"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long" })
}

export default async function GalleryIndexPage() {
  const galleries = getGalleries()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="bg-blue-600 text-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              <Camera className="w-12 h-12 opacity-80" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">MSCU Gallery</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Photos from our community of faith-driven medical students.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {!galleries.length ? (
            <div className="text-center py-20">
              <Images className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">No galleries yet</h2>
              <p className="text-slate-500">Check back soon for new photos.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
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
                        sizes="(min-width: 640px) 50vw, 100vw"
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
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={g.createdAt}>{formatDate(g.createdAt)}</time>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {g.title}
                    </h2>

                    {g.description ? (
                      <p className="text-slate-600 leading-relaxed line-clamp-2 mb-5">{g.description}</p>
                    ) : (
                      <div className="mb-5" />
                    )}

                    <span className="inline-flex items-center gap-2 text-blue-600 group-hover:text-blue-700 font-semibold text-sm">
                      View album
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
