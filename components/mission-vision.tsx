"use client"

import { motion } from "framer-motion"
import {
  Target,
  Eye,
  Medal,
  UsersThree,
  ShieldCheck,
  Heart,
  BookOpen,
  BookBookmark,
  Smiley,
} from "phosphor-react"

export default function MissionVision() {
  const values = [
    { value: "Excellence", Icon: Medal },
    { value: "Teamwork", Icon: UsersThree },
    { value: "Integrity", Icon: ShieldCheck },
    { value: "Accountability", Icon: Heart },
    { value: "Sound Doctrine", Icon: BookOpen },
    { value: "Obedience to God's word", Icon: BookBookmark },
    { value: "Love for God and one another", Icon: Smiley },
  ]

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="mission-vision"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Mission */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/80 border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-500 group"
          >
            <div className="flex items-center gap-5 mb-6">

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg group-hover:scale-110 transition">
                <Target size={28} weight="fill" className="text-white" />
              </div>

              <h3 className="text-2xl font-bold text-blue-700">
                Our Mission
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed">
              To proclaim Jesus Christ as Lord and Saviour, grow together in the
              knowledge of Him through studying of scripture and nurturing our
              faith and to make Him known to the campus community and beyond.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/80 border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-500 group"
          >
            <div className="flex items-center gap-5 mb-6">

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg group-hover:scale-110 transition">
                <Eye size={28} weight="fill" className="text-white" />
              </div>

              <h3 className="text-2xl font-bold text-blue-700">
                Our Vision
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Raising Christian health workers who impact the society with
              Godly values.
            </p>
          </motion.div>
        </div>

        {/* Scripture Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 shadow-xl">
            <p className="text-lg md:text-xl italic leading-relaxed">
              “Let your light shine before others, that they may see your good
              deeds and glorify your Father in heaven.”
            </p>

            <p className="mt-4 font-semibold text-blue-100">
              Matthew 5:16
            </p>
          </div>
        </motion.div>

        {/* Core Values */}
        <div className="pt-12 border-t border-gray-200">
          <h3 className="text-3xl font-bold mb-14 text-center text-blue-700">
            Our Core Values
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-18 h-18 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg group-hover:scale-110 group-hover:shadow-blue-400/40 transition duration-300">
                    <item.Icon
                      size={30}
                      weight="fill"
                      className="text-white"
                    />
                  </div>
                </div>

                <p className="font-semibold text-gray-800 text-sm">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
