import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const SITE_URL = "https://medicalschoolcu.org"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MSCU - Medical School Christian Union | University of Nairobi",
    template: "%s | MSCU",
  },
  description:
    "Medical School Christian Union (MSCU) — a vibrant fellowship of Christian medical students at the University of Nairobi committed to faith, service, and excellence in healthcare.",
  keywords: [
    "MSCU",
    "Medical School Christian Union",
    "University of Nairobi",
    "Christian medical students",
    "medical student fellowship",
    "faith and medicine",
    "Christian union Kenya",
    "medical school Kenya",
    "MSCU Nairobi",
  ],
  authors: [{ name: "MSCU", url: SITE_URL }],
  creator: "Medical School Christian Union",
  publisher: "Medical School Christian Union",
  icons: {
    icon: "/mscu.png",
    apple: "/mscu.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MSCU - Medical School Christian Union",
    title: "MSCU - Medical School Christian Union | University of Nairobi",
    description:
      "A vibrant fellowship of Christian medical students at the University of Nairobi committed to faith, service, and excellence in healthcare.",
    images: [
      {
        url: "/mscu.png",
        width: 512,
        height: 512,
        alt: "MSCU Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mscuon",
    creator: "@mscuon",
    title: "MSCU - Medical School Christian Union",
    description:
      "A vibrant fellowship of Christian medical students at the University of Nairobi committed to faith, service, and excellence.",
    images: ["/mscu.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "XsKTA_5xi2tkLMeBqRJEvgyOEQBcHzsWbEYuunz393c",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
