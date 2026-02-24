"use client"

import { useState } from "react"

const CHAR_LIMIT = 200

export default function Testimonials() {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const testimonials = [
    {
      name: "Cyrus Mwema",
      role: "6th Year Mbchb Student",
      text: "MSCU has been a home away from home that has greatly enriched my campus experience. I have grown spiritually, socially, and emotionally through the wonderful fellowship, mentorship, opportunities to be part of teams and leadership, and being a part of the vibrant community.  I have made many wonderful friends from the fellowship who have celebrated with me in my happiest days and been there even through the tough portions of the journey. We've worshipped together, dissected the word in BS, played many games, had fun in many competitions, bonded in so many of our associates beautiful homes, attended weddings, just so many memories. Better, I have learnt to be an active part of the Church and how to be the church rather than merely going to church. I will be a more dutiful, loving and competent doctor because of MSCU.",
    },
    {
      name: "Lilian Wambui",
      role: "3rd Year Dental Student",
      text: "MSCU has been a safe haven, a true home.I’ve encountered God through worship, through the sharing of the Word, and most beautifully, through the people Here, faith is not just believed—it’s lived",
    },
    {
      name: "Neoline Chepkirui",
      role: "1st year Nursing Student",
      text: "The outreach opportunities through MSCU have shown me the real-world impact of combining medicine with Christian service.",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: "#1E88E5" }}>
        Testimonials
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="p-8 rounded-lg shadow-sm hover:shadow-md transition border-t-4"
            style={{ borderColor: "#43A047", backgroundColor: "#FAFAFA" }}
          >
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, j) => (
                <span key={j} style={{ color: "#FB8C00" }}>
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic leading-relaxed">
              &ldquo;{expandedCards[i] || testimonial.text.length <= CHAR_LIMIT
                ? testimonial.text
                : `${testimonial.text.slice(0, CHAR_LIMIT)}...`}&rdquo;
            </p>
            {testimonial.text.length > CHAR_LIMIT && (
              <button
                onClick={() => toggleExpand(i)}
                className="text-sm font-semibold mb-4 hover:underline"
                style={{ color: "#1E88E5" }}
              >
                {expandedCards[i] ? "Show less" : "Read more"}
              </button>
            )}
            <div>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-sm" style={{ color: "#1E88E5" }}>
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
