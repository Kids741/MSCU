import { Award, Users, ShieldCheck, Heart, BookOpen, BookHeart, Smile, Target, Eye } from "lucide-react"

export default function MissionVision() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8" style={{ color: "#1E88E5" }} />
              <h3 className="text-2xl font-bold" style={{ color: "#1E88E5" }}>
                Our Mission
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              To proclaim Jesus Christ as Lord and Saviour, grow together in the knowledge of
               Him through studying of scripture and nurturing our faith and to make Him known to
                the campus community and beyond.
            </p>
          </div>

          {/* Vision */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8" style={{ color: "#1E88E5" }} />
              <h3 className="text-2xl font-bold" style={{ color: "#1E88E5" }}>
                Our Vision
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Raising Chrisitan health workers who impact the society with Godly values.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 pt-12 border-t" style={{ borderColor: "#E0E0E0" }}>
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: "#1E88E5" }}>
            Our Core Values
          </h3>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { value: "Excellence", Icon: Award },
              { value: "Teamwork", Icon: Users },
              { value: "Integrity", Icon: ShieldCheck },
              { value: "Accountability", Icon: Heart },
              { value: "Sound Doctrine", Icon: BookOpen },
              { value: "Obedience to God's word ", Icon: BookHeart },
              { value: "Love for God and one another ", Icon: Smile },

            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">
                  <item.Icon className="w-10 h-10" style={{ color: "#1E88E5" }} />
                </div>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
