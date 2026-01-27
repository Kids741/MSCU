import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16" style={{ backgroundColor: "#1E88E5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-4">About MSCU</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition">
                  Mission & Vision
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition">
                  Leadership
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/ministries" className="text-gray-100 hover:text-white transition">
                  Ministries
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-100 hover:text-white transition">
                  Devotionals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-gray-100 hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition">
                  Prayer Requests
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition">
                  Get Involved
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-75 transition" aria-label="Facebook">
                <Facebook size={24} className="text-white" />
              </a>
              <a href="#" className="hover:opacity-75 transition" aria-label="Twitter">
                <Twitter size={24} className="text-white" />
              </a>
              <a href="#" className="hover:opacity-75 transition" aria-label="Instagram">
                <Instagram size={24} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-100 text-sm">
              &copy; {currentYear} Medical School Christian Union. All rights reserved.
            </p>
            <p className="text-gray-100 text-sm italic">
              "Whatever you do, work at it with all your heart, as working for the Lord." — Colossians 3:23
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
