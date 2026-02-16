export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1E88E5" }}>
          Who We Are
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          MSCU is a vibrant community of medical students united by faith and a passion for serving others with
          excellence and compassion.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Faith-Centered",
            description: "The Medical School Christian Union is a body of Christian students in The University of Nairobi Medical School bound together by common faith in the only God..",
          },
          {
            title: "Spirit-Led",
            description: "We are joined together with heavenly calling to live holy and righteous lives committed to living according to the Holy Bible, guided by the Holy Spirit and the Holy Bible.",
          },
          {
            title: "Community Focused",
            description: "We are exclusively non-political, interdenominational and non-denominational, and we appreciate our ethnic, cultural, denominational and gender diversity",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-8 rounded-xl shadow-sm hover:shadow-md transition"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <h3 className="text-xl font-bold mb-3" style={{ color: "#1E88E5" }}>
              {item.title}
            </h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
