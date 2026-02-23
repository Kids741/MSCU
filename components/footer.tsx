import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

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
                <Link href="/#about" className="text-gray-100 hover:text-white transition">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/#mission-vision" className="text-gray-100 hover:text-white transition">
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-100 hover:text-white transition">
                  Leadership
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ministries" className="text-gray-100 hover:text-white transition">
                  Ministries
                </Link>
              </li>
              <li>
                <Link href="/devotionals" className="text-gray-100 hover:text-white transition">
                  Devotionals
                </Link>
              </li>
              <li>
                <Link href="/#events" className="text-gray-100 hover:text-white transition">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-100 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-100 hover:text-white transition">
                  Prayer Requests
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-100 hover:text-white transition">
                  Get Involved
                </Link>
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
              <a href="https://x.com/mscuon" className="hover:opacity-75 transition" aria-label="X">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/mscuon?igsh=aHEwNmV0ZWxwYWll" className="hover:opacity-75 transition" aria-label="Instagram">
                <Instagram size={24} className="text-white" />
              </a>
              <a href="https://vm.tiktok.com/ZS9eP4x8eDN7e-EO4J4/" className="hover:opacity-75 transition" aria-label="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.18 8.18 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z" />
                </svg>
              </a>
              <a href="https://youtube.com/@mscuon.?si=yzlvwWx1-6ipwFq3" className="hover:opacity-75 transition" aria-label="YouTube">
                <Youtube size={24} className="text-white" />
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
