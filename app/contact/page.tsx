"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import Script from "next/script"

import {
  EnvelopeSimple,
  MapPin,
  Handshake,
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
} from "phosphor-react"

export default function ContactPage() {
  return (
    <main>
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      <Header />

      {/* Hero */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#1E88E5" }}
          >
            Get in Touch
          </h1>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions? Want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <iframe
              data-tally-src="https://tally.so/embed/jaya4Y?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="639"
              frameBorder="0"
              title="Contact Form"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-10">

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
                <EnvelopeSimple size={20} weight="fill" className="text-blue-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold" style={{ color: "#1E88E5" }}>
                  Email
                </h3>
                <p className="text-gray-700">contact@mscu.org</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
                <MapPin size={20} weight="fill" className="text-blue-600" />
              </div>

              <div className="w-full">
                <h3 className="text-xl font-bold mb-1" style={{ color: "#1E88E5" }}>
                  Location
                </h3>

                <p className="text-gray-700">Medical School KNH</p>
                <p className="text-gray-700">Hospital Road, Upper Hill</p>

                <div className="mt-4 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31910.059539796963!2d36.783084853141794!3d-1.32130594329065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1skmtc%20knh%20map!5e0!3m2!1sen!2ske!4v1769511457054!5m2!1sen!2ske"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
                <Handshake size={20} weight="fill" className="text-blue-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#1E88E5" }}>
                  Connect With Us
                </h3>

                <div className="flex gap-5">
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition">
                    <FacebookLogo size={22} weight="fill" />
                  </a>

                  <a href="#" className="text-gray-600 hover:text-blue-600 transition">
                    <TwitterLogo size={22} weight="fill" />
                  </a>

                  <a href="#" className="text-gray-600 hover:text-blue-600 transition">
                    <InstagramLogo size={22} weight="fill" />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: "#E8F5E9" }}
            >
              <h4 className="font-bold mb-2" style={{ color: "#43A047" }}>
                Newsletter
              </h4>

              <p className="text-sm text-gray-700 mb-4">
                Subscribe to receive weekly devotionals and updates about MSCU events.
              </p>

              <Input
                type="email"
                placeholder="your@email.com"
                className="w-full"
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

