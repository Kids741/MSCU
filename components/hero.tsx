"use client"
import Link from "next/link"
import Image from "next/image"
import Carousel from "./carousel"

export default function Hero() {
  const carouselImages = [
    {
      src: "/Hero/image1.png",
      alt: "MSCU fellowship gathering",
    },
    {
      src: "/Hero/image2.png",
      alt: "Christian medical ministry in action",
    },
    {
      src: "/Hero/image3.png",
      alt: "Community healthcare service",
    },
    {
      src: "/Hero/image4.png",
      alt: "Faith-based medical education",
    },
  ]

  return (
    <section className="relative w-full aspect-video min-h-[560px] sm:aspect-auto sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Carousel images={carouselImages} />
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4 sm:py-16 md:py-24 lg:py-32">
        <h1 className="text-2xl sm:text-3xl md:text-8xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
          Serving Christ Through Medicine
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 mb-8 sm:mb-12 max-w-2xl mx-auto text-pretty">
          A fellowship of medical students committed to faith, service, and excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-12 mt-30 sm:mt-12 px-6 sm:px-0">
          <Link href="/contact" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-semibold text-white text-sm sm:text-base transition hover:opacity-90"
              style={{ backgroundColor: "#FB8C00" }}
            >
              Join MSCU
            </button>
          </Link>
          <Link href="/leadership" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-semibold text-white text-sm sm:text-base transition hover:opacity-90"
              style={{ backgroundColor: "#43A047" }}
            >
              Explore Ministries
            </button>
          </Link>
        </div>

        {/* Decorative cross */}
        <div className="text-white opacity-30 text-4xl sm:text-5xl md:text-6xl">✝</div>
      </div>
    </section>
  )
}
