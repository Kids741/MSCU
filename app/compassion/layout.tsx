import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compassion Ministry",
  description:
    "MSCU Compassion Ministry — acts of kindness, hearts of love. Support our mission via M-Pesa Paybill, seek assistance from the Compassion & Care committee, or share an anonymous message.",
  alternates: { canonical: "https://medicalschoolcu.org/compassion" },
  openGraph: {
    title: "MSCU Compassion Ministry",
    description:
      "Acts of kindness, hearts of love. Support the MSCU Compassion Ministry or reach out for assistance.",
    url: "https://medicalschoolcu.org/compassion",
    type: "website",
  },
}

export default function CompassionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
