"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "#E0E0E0" }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/mscu.png" alt="MSCU Logo" width={50} height={50} className="h-12 w-auto" />
          <span className="text-2xl font-bold" style={{ color: "#1E88E5" }}>
            MSCU
          </span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/#about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/leadership" className="text-gray-700 hover:text-blue-600 transition">
            Leadership
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">
            Blog
          </Link>
          <Link href="#resources" className="text-gray-700 hover:text-blue-600 transition">
            Resources
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 rounded-lg text-white transition"
            style={{ backgroundColor: "#FB8C00" }}
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b flex flex-col gap-4 p-4 md:hidden">
            <Link href="/#about" className="text-gray-700">
              About
            </Link>
            <Link href="/leadership" className="text-gray-700">
              Leadership
            </Link>
            <Link href="/devotionals" className="text-gray-700">
              Devotionals
            </Link>
            <Link href="/blog" className="text-gray-700">
              Blog
            </Link>
            <Link href="#resources" className="text-gray-700">
              Resources
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 rounded-lg text-white text-center"
              style={{ backgroundColor: "#FB8C00" }}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
