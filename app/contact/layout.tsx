import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with MSCU — Medical School Christian Union at the University of Nairobi. Reach out for questions, partnerships, or to join our fellowship.",
  alternates: { canonical: "https://medicalschoolcu.org/contact" },
  openGraph: {
    title: "Contact MSCU",
    description:
      "Get in touch with MSCU — Medical School Christian Union at the University of Nairobi.",
    url: "https://medicalschoolcu.org/contact",
    type: "website",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
