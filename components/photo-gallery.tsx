"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    {
      id: 1,
      src: "/Photogallery/cultural.webp",
      title: "Cultural sunday",
      description: "Celebrating diversity and unity in our medical community",
      link: "https://drive.google.com/drive/folders/1OBwKkFUUj-6AoYfZ68StrHr2GoMJlzpN"
    },
    {
      id: 2,
      src: "/Photogallery/worshipexp.webp",
      title: "Worship Experience",
      description: "Spiritual connection and worship in our medical community",
      link:"https://drive.google.com/drive/folders/1CSsqrQ6czaiu69yu8NSo6iLuK8Ik6XE-"
    },
    {
      id: 3,
      src: "/Photogallery/litsunday.webp",
      title: "Literature Sunday",
      description: "Exploring the intersection of faith, medicine and literature in our community",
      link: "https://photos.app.goo.gl/sUiP48KmB2efXHPx5"
    },

    /* {
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
    */
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
    <section className="py-16 px-4 bg-white" id="photo-gallery">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-600">Photo Gallery</h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Glimpses of our community, events, and the meaningful work we do together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <a
              key={image.id}
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-lg cursor-pointer group block"
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
            </a>
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
