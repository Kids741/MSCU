"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import { compassionCommittee } from "@/lib/compassion-committee"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function whatsappLink(phone: string, name: string) {
  const firstName = name.split(" ")[0]
  const message = `Hello ${firstName}, I am reaching out to the MSCU Compassion Ministry for assistance. Could you please help me?`
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export default function AssistanceSection() {
  return (
    <section id="assistance" className="scroll-mt-24 py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E3F2FD" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#1E88E5" }}>
          Seek Assistance
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Don&rsquo;t face your challenges alone. Our Compassion &amp; Care committee is here to provide support,
          guidance, and assistance when you need it most. Reach out by call or WhatsApp.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {compassionCommittee.map((member, i) => (
            <motion.div
              key={member.phone}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
            >
              {/* IMAGE */}
              <div className="relative h-96 sm:h-80 overflow-hidden bg-gray-100">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    style={{ objectPosition: member.objectPosition ?? "50% 15%" }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-6xl font-bold" style={{ color: "#1E88E5" }}>
                      {initials(member.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold mb-1" style={{ color: "#1E88E5" }}>
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{member.role}</p>

                <div className="flex justify-center gap-3">
                  <a
                    href={`tel:+${member.phone}`}
                    aria-label={`Call ${member.name}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    style={{ color: "#1E88E5" }}
                  >
                    <Phone size={16} />
                    Call
                  </a>
                  <a
                    href={whatsappLink(member.phone, member.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${member.name} (opens in a new tab)`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-50 hover:bg-green-100 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                    style={{ color: "#43A047" }}
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
