"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { BookOpen, ChevronLeft, ChevronRight, Info, Pause, Play } from "lucide-react"
import { compassionVerses, type CompassionVerse } from "@/lib/compassion-verses"

const VERSES_SHOWN = 10
const ROTATE_EVERY_MS = 8000

function pickRandom<T>(items: T[], count: number): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count)
}

// Chosen once per page load in the browser. The server renders a placeholder
// (null) so its HTML matches the first client render before the random pick.
let clientSelection: CompassionVerse[] | null = null
const getClientSelection = () => (clientSelection ??= pickRandom(compassionVerses, VERSES_SHOWN))
const subscribe = () => () => {}

export default function VerseCarousel() {
  const verses = useSyncExternalStore(subscribe, getClientSelection, () => null)
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const reduceMotion = useReducedMotion()

  const rotating = !!verses && !userPaused && !interacting && !reduceMotion

  // A fresh timeout per slide, so manual navigation restarts the countdown.
  useEffect(() => {
    if (!rotating || !verses) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % verses.length), ROTATE_EVERY_MS)
    return () => clearTimeout(timer)
  }, [rotating, verses, index])

  function go(delta: number) {
    if (!verses) return
    setIndex((i) => (i + delta + verses.length) % verses.length)
  }

  const current = verses?.[index]

  return (
    <section id="verses" className="scroll-mt-24 py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12" style={{ color: "#43A047" }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1E88E5" }}>
            Verses on Compassion
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let God&rsquo;s Word inspire acts of kindness and compassion in your daily life.
          </p>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Verses on compassion"
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocus={() => setInteracting(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false)
          }}
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-blue-100 min-h-[24rem] flex flex-col justify-center">
            {!current ? (
              <div className="animate-pulse space-y-4" aria-hidden="true">
                <div className="h-5 bg-gray-100 rounded w-full" />
                <div className="h-5 bg-gray-100 rounded w-5/6 mx-auto" />
                <div className="h-5 bg-gray-100 rounded w-2/3 mx-auto" />
                <div className="h-4 bg-gray-100 rounded w-32 mx-auto mt-6" />
              </div>
            ) : (
              <div aria-live={rotating ? "off" : "polite"}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.reference}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${verses!.length}`}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <blockquote className="text-center">
                      <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-4">
                        &ldquo;{current.verse}&rdquo;
                      </p>
                      <footer className="text-base font-semibold" style={{ color: "#1E88E5" }}>
                        {current.reference}
                      </footer>
                    </blockquote>

                    <div className="mt-8 rounded-xl p-5 flex items-start gap-3 text-left" style={{ backgroundColor: "#E8F5E9" }}>
                      <Info className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#43A047" }} />
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Did you know?</h3>
                        <p className="text-gray-700 leading-relaxed">{current.fact}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          {verses && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous verse"
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots get their own row on narrow screens so the controls never overflow */}
              <div className="flex items-center justify-center gap-1 order-first w-full sm:order-none sm:w-auto">
                {verses.map((v, i) => (
                  <button
                    key={v.reference}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show verse ${i + 1}: ${v.reference}`}
                    aria-current={i === index ? "true" : undefined}
                    className="p-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <span
                      className={`block h-2.5 rounded-full transition-all ${i === index ? "w-6" : "w-2.5 bg-gray-300"}`}
                      style={i === index ? { backgroundColor: "#1E88E5" } : undefined}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next verse"
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <ChevronRight size={20} />
              </button>

              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Resume verse rotation" : "Pause verse rotation"}
                  className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {userPaused ? <Play size={20} /> : <Pause size={20} />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
