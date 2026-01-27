"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    {
      id: 1,
      src: "/medical-students-fellowship.jpg",
      title: "Medical Fellowship",
      description: "Students bonding during our fellowship programs",
    },
    {
      id: 2,
      src: "/christian-medical-ministry.jpg",
      title: "Ministry Work",
      description: "Serving the community through Christian medical outreach",
    },
    {
      id: 3,
      src: "/healthcare-service-community.jpg",
      title: "Community Service",
      description: "Healthcare professionals serving vulnerable populations",
    },
    {
      id: 4,
      src: "/faith-based-medical-education.jpg",
      title: "Medical Education",
      description: "Learning with faith at the center of our practice",
    },
    {
      id: 5,
      src: "/medical-conference.png",
      title: "Medical Conference",
      description: "Annual conference bringing together healthcare professionals",
    },
    {
      id: 6,
      src: "/prayer-fellowship.jpg",
      title: "Prayer Fellowship",
      description: "Spiritual gathering of medical students and professionals",
    },
  ]

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-600">Photo Gallery</h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Glimpses of our community, events, and the meaningful work we do together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                <p className="text-white/80 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[80vh] relative">
            <img
              src={galleryImages[selectedImage].src || "/placeholder.svg"}
              alt={galleryImages[selectedImage].title}
              className="w-full h-full object-contain"
            />
            <div className="text-center text-white mt-4">
              <h3 className="text-2xl font-semibold">{galleryImages[selectedImage].title}</h3>
              <p className="text-white/80">{galleryImages[selectedImage].description}</p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  )
}
