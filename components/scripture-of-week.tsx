export default function ScriptureOfWeek() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-xl p-12 shadow-lg" style={{ backgroundColor: "#E8F5E9" }}>
        <div className="flex justify-center mb-6">
          <span className="text-5xl" style={{ color: "#43A047" }}>
            📖
          </span>
        </div>

        <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "#1E88E5" }}>
          Scripture of the Week
        </h3>

        <blockquote className="text-center max-w-2xl mx-auto">
          <p className="text-xl italic text-gray-800 mb-6 leading-relaxed">
            "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you
            know that you will receive an inheritance from the Lord as a reward. It is the Lord Christ you are serving."
          </p>
          <footer className="text-lg font-semibold" style={{ color: "#1E88E5" }}>
            Colossians 3:23
          </footer>
        </blockquote>

        <div className="mt-8 text-center">
          <p className="text-gray-700">
            This week we reflect on dedicating our medical calling to Christ and the importance of serving with
            excellence.
          </p>
        </div>
      </div>
    </section>
  )
}
