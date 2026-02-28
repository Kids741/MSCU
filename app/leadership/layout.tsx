import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leadership & Ministries",
  description:
    "Meet the MSCU leadership team and explore our ministries — Sisters Ministry, Hospitality, Compassion & Care, Discipleship, Missions & Outreach, and more.",
  alternates: { canonical: "https://medicalschoolcu.org/leadership" },
  openGraph: {
    title: "MSCU Leadership & Ministries",
    description:
      "Meet the MSCU leadership team and explore our ministries at the University of Nairobi Medical School.",
    url: "https://medicalschoolcu.org/leadership",
    type: "website",
  },
}

export default function LeadershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
