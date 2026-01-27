import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <main>
      <Header />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center" style={{ color: "#1E88E5" }}>
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Have questions? Want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-white p-8 rounded-lg shadow-sm">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <Input type="text" placeholder="Your name" className="w-full" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" className="w-full" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <Input type="text" placeholder="How can we help?" className="w-full" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <Textarea placeholder="Your message..." className="w-full" rows={5} />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold transition hover:opacity-90"
              style={{ backgroundColor: "#FB8C00" }}
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#1E88E5" }}>
                📧 Email
              </h3>
              <p className="text-gray-700">contact@mscu.org</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#1E88E5" }}>
                📍 Location
              </h3>
              <p className="text-gray-700">Medical School KNH</p>
              <p className="text-gray-700">Hospital road, Upper Hill</p>
              <div className="mt-4 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31910.059539796963!2d36.783084853141794!3d-1.32130594329065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1skmtc%20knh%20map!5e0!3m2!1sen!2ske!4v1769511457054!5m2!1sen!2ske" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#1E88E5" }}>
                🤝 Connect With Us
              </h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition text-lg">
                  📘 Facebook
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition text-lg">
                  🐦 Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition text-lg">
                  📷 Instagram
                </a>
              </div>
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: "#E8F5E9" }}>
              <h4 className="font-bold mb-2" style={{ color: "#43A047" }}>
                Newsletter
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                Subscribe to receive weekly devotionals and updates about MSCU events.
              </p>
              <Input type="email" placeholder="your@email.com" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
