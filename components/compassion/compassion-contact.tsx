import Link from "next/link"
import { Mail, MapPin, MessageCircle } from "lucide-react"

export default function CompassionContact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#1E88E5" }}>
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Have questions about our compassion initiatives or want to get involved? We&rsquo;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="mailto:contact@mscu.org"
            className="group p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Mail size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
            <p className="text-gray-600 text-sm">contact@mscu.org</p>
          </a>

          <a
            href="https://maps.google.com/?q=-1.2978120,36.8046173"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <MapPin size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
            <p className="text-gray-600 text-sm">UoN Medical School Christian Union</p>
          </a>

          <Link
            href="/contact"
            className="group p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Contact Page</h3>
            <p className="text-gray-600 text-sm">Send us a message</p>
          </Link>
        </div>
      </div>
    </section>
  )
}
