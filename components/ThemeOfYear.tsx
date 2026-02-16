import { BookOpen } from "lucide-react"

export default function ThemeOfYear() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        className="rounded-2xl p-8 md:p-12 shadow-lg border border-green-100"
        style={{ backgroundColor: "#E8F5E9" }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <BookOpen className="w-12 h-12" style={{ color: "#43A047" }} />
        </div>

        {/* Title */}
        <h3
          className="text-2xl md:text-3xl font-bold text-center mb-4"
          style={{ color: "#1E88E5" }}
        >
          Theme of the Year
        </h3>

        {/* Theme Statement (Most Important) */}
        <p className="text-lg md:text-xl font-semibold text-center text-gray-800 mb-8">
          Reconciled to God, Ambassadors for Christ
        </p>

        {/* Scripture */}
        <blockquote className="text-center max-w-3xl mx-auto">
          <p className="text-lg italic text-gray-700 leading-relaxed mb-4">
            "...All this is from God, who reconciled us to himself through Christ
            and gave us the ministry of reconciliation... We are therefore
            Christ’s ambassadors, as though God were making his appeal through
            us..."
          </p>

          <footer
            className="text-base font-semibold"
            style={{ color: "#1E88E5" }}
          >
            2 Corinthians 5:17–21 (NIV)
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
