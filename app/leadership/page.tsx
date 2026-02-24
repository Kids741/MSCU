"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Script from "next/script"
import { motion } from "framer-motion"

import {
  BookOpen,
  Handshake,
  Megaphone,
  Leaf,
  Hand,
  Briefcase,
  MaskHappy,
  MusicNotes,
  Desktop,
  BookBookmark,
  UsersThree,
  FlowerLotus,
  Coffee,
  Heart,
  EnvelopeSimple,
  LinkedinLogo,
} from "phosphor-react"

import type { Icon } from "phosphor-react"



/* ---------------- MINISTRIES ---------------- */

const ministries: { title: string; icon: Icon; description: string }[] = [
  {
    title: "Sisters Ministry",
    icon: FlowerLotus,
    description:
      "They head the activities of the Sisters / ladies within the union with a goal to enhance fellowship and oneness among all sister in the medical school.",
  },
  {
    title: "Hospitality",
    icon: Coffee,
    description:
      "They are involved in serving refreshments in the union gatherings and helping with the hospitality needs.",
  },
  {
    title: "Compassion & Care",
    icon: Heart,
    description:
      "The compassion team offers counselling services, identifies needy members, and organizes compassion outreach.",
  },
  {
    title: "Brothers Ministry",
    icon: UsersThree,
    description:
      "They lead fellowship, mentorship, and support transport needs of the union.",
  },
  {
    title: "Literature & Publications",
    icon: BookBookmark,
    description:
      "Responsible for newsletters, magazines, archives, writing ministry, and publications.",
  },
  {
    title: "Inreach & Evangelism",
    icon: Megaphone,
    description:
      "Responsible for aggressive in-reach within the medical school including ward witnessing and orientation.",
  },
  {
    title: "Discipleship",
    icon: Leaf,
    description:
      "Coordinates discipleship programs including ANZA-FYT and VUKA-FYT.",
  },
  {
    title: "Missions & Outreach",
    icon: Handshake,
    description:
      "Coordinates missions, outreach, community health programs, and partnerships.",
  },
  {
    title: "Bible Study & Training",
    icon: BookOpen,
    description:
      "Leads Bible study programs aimed at deepening spiritual life.",
  },
  {
    title: "Praise & Worship",
    icon: MusicNotes,
    description:
      "Coordinates worship nights, music ministry, and worship experiences.",
  },
  {
    title: "Prayer",
    icon: Hand,
    description:
      "Organizes prayer meetings and spiritual growth initiatives.",
  },
  {
    title: "CREAM",
    icon: MaskHappy,
    description:
      "Coordinates ushers, drama, sports, décor, and dance ministries.",
  },
  {
    title: "ASAAP",
    icon: Briefcase,
    description:
      "Handles partnerships, career, academics, professional fellowships, and advocacy.",
  },
  {
    title: "ICT and Sound",
    icon: Desktop,
    description:
      "Responsible for website, media, audio-visual, projection, and technical support.",
  },
]



/* ---------------- LEADERS ---------------- */

const leaders = [
  { role: "Chairperson", name: "Henry Madaga", image: "/Leadership/chairperson.webp" },
  { role: "1st Vice Chairperson", name: "Banncy Nasiro", image: "/Leadership/vp1.webp" },
  { role: "2nd Vice Chairperson", name: "Bravine Endede", image: "/Leadership/vp2.webp" },
  { role: "Secretary", name: "Grace Mbatia", image: "/Leadership/sec.webp" },
  { role: "Vice Secretary", name: "Livya Mugure", image: "/Leadership/vicesec.webp" },
  { role: "Treasurer", name: "Josephat Kimani", image: "/Leadership/treasurer.webp" },
  { role: "In-reach Evangelism and Missions’ Coordinator", name: "Chris Onyango", image: "/Leadership/inreach.webp" },
  { role: "Out-reach Evangelism and Missions’ Coordinator", name: "Ian Ng'ang'a", image: "/Leadership/outreach.webp" },
  { role: "Bible Study and Training Coordinator", name: "Olive Thayu", image: "/Leadership/bs.webp" },
  { role: "Worship Coordinator", name: "Robbin Wanjala", image: "/Leadership/worship.webp" },
  { role: "Prayer Coordinator", name: "Newton Kirmi", image: "/Leadership/prayer.webp" },
  { role: "Creative Ministries Coordinator", name: "Esther Muthoni", image: "/Leadership/creative.webp" },
  { role: "Associates, Advocacy and Partnerships Coordinator (ASAAP)", name: "Dennis Kidake", image: "/Leadership/asaap.webp" },
  { role: "Tech-Team/ICT Coordinator", name: "Howard Kiprono", image: "/Leadership/ict.webp" },
  { role: "Discipleship Coordinator", name: "Terran Mwangangi", image: "/Leadership/discipleship.webp" },
]



/* ---------------- ANIMATION ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}



/* ---------------- PAGE ---------------- */

export default function MinistriesPage() {
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E3F2FD" }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#1E88E5" }}>
            Our Leadership and Ministries
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore the various ways you can grow your faith, serve others, and develop as a Christian physician.
          </p>

          <div className="mt-8">
            <a
              href="#join-form"
              className="inline-block text-white font-semibold py-3 px-8 rounded-lg transition hover:opacity-90"
              style={{ backgroundColor: "#43A047" }}
            >
              Join Our Ministries
            </a>
          </div>
        </div>
      </section>



      {/* LEADERSHIP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#1E88E5" }}>
            Union Leadership
          </h2>

          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Meet the dedicated leaders serving the union with passion and Christ-centered vision.
          </p>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

            {leaders.map((leader, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
              >
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>


                {/* CONTENT */}
                <div className="p-6 text-center">

                  <h3 className="text-lg font-bold mb-1" style={{ color: "#1E88E5" }}>
                    {leader.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {leader.role}
                  </p>


                  <div className="flex justify-center gap-3">

                    <button className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition">
                      <EnvelopeSimple size={18} style={{ color: "#1E88E5" }} />
                    </button>

                    <button className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition">
                      <LinkedinLogo size={18} style={{ color: "#43A047" }} />
                    </button>

                  </div>

                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>



      {/* MINISTRIES */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {ministries.map((ministry, i) => {
            const Icon = ministry.icon

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-8 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer bg-white border border-gray-100"
              >
                <div className="text-5xl mb-4" style={{ color: "#1E88E5" }}>
                  <Icon size={48} />
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: "#1E88E5" }}>
                  {ministry.title}
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {ministry.description}
                </p>
              </motion.div>
            )
          })}

        </div>
      </section>



      {/* JOIN FORM */}
      <section id="join-form" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E3F2FD" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1E88E5" }}>
            Join Our Ministries
          </h2>

          <iframe
            data-tally-src="https://tally.so/embed/81Kkd5?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="312"
            frameBorder="0"
            title="Join Our Ministries"
          />
        </div>
      </section>



      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      <Footer />
    </main>
  )
}