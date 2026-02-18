"use client"

import { motion } from "framer-motion"
import { Heart, Flame, Users } from "lucide-react"

export default function About() {
  const items = [
    {
      title: "Faith-Centered",
      icon: Heart,
      description:
        "The Medical School Christian Union is a community of Christian students at the University of Nairobi Medical School, united by a shared faith in the one true God and a commitment to Christ-centered living.",
    },
    {
      title: "Spirit-Led",
      icon: Flame,
      description:
        "We are called to live holy and righteous lives, guided by the Holy Spirit and grounded in the truth of Scripture, striving daily to reflect Christ in our words and actions.",
    },
    {
      title: "Community Focused",
      icon: Users,
      description:
        "We are a non-political, interdenominational fellowship that celebrates diversity across cultures, backgrounds, and denominations while fostering unity in Christ.",
    },
  ]

  return (
    <section
      id="about"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
          Who We Are
        </h2>

        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          MSCU is a vibrant community of medical students united by faith and a
          passion for serving others with excellence, compassion, and integrity.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => {
          const Icon = item.icon

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white
              shadow-sm hover:shadow-xl transition-all duration-300
              border border-gray-100 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-5 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:scale-110 transition">
                <Icon size={24} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}