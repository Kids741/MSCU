"use client"

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

  return (
    <section
      id="mission-vision"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-100">
                <Target size={26} weight="fill" className="text-blue-600" />
              </div>

              <h3 className="text-2xl font-bold" style={{ color: "#1E88E5" }}>
                Our Mission
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed">
              To proclaim Jesus Christ as Lord and Saviour, grow together in the
              knowledge of Him through studying of scripture and nurturing our
              faith and to make Him known to the campus community and beyond.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-100">
                <Eye size={26} weight="fill" className="text-blue-600" />
              </div>

              <h3 className="text-2xl font-bold" style={{ color: "#1E88E5" }}>
                Our Vision
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Raising Christian health workers who impact the society with
              Godly values.
            </p>
          </div>
        </div>

        {/* Scripture Divider */}
        <div className="mt-16 mb-12 text-center max-w-3xl mx-auto">
          <p className="text-lg italic text-gray-700 leading-relaxed">
            “Let your light shine before others, that they may see your good
            deeds and glorify your Father in heaven.”
          </p>

          <p className="mt-3 font-semibold text-blue-600">
            Matthew 5:16
          </p>
        </div>

        {/* Core Values */}
        <div className="pt-10 border-t" style={{ borderColor: "#E0E0E0" }}>
          <h3
            className="text-2xl md:text-3xl font-bold mb-12 text-center"
            style={{ color: "#1E88E5" }}
          >
            Our Core Values
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {values.map((item, i) => (
              <div
                key={i}
                className="text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 group-hover:bg-blue-200 transition duration-300">
                    <item.Icon
                      size={28}
                      weight="fill"
                      className="text-blue-600"
                    />
                  </div>
                </div>

                <p className="font-semibold text-gray-800 text-sm">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
