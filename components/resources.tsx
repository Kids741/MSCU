"use client"

import { BookOpen, FileText, LinkIcon, Download } from "lucide-react"

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: "Medical Ethics Guidelines",
      description: "Comprehensive guide on ethical practices in healthcare aligned with Christian values",
      icon: BookOpen,
      type: "Guide",
      link: "#",
    },
    {
      id: 2,
      title: "Devotional Materials",
      description: "Weekly devotionals and Bible studies for medical students and professionals",
      icon: FileText,
      type: "Document",
      link: "#",
    },
    {
      id: 3,
      title: "Career Resources",
      description: "Job board, mentorship programs, and professional development opportunities",
      icon: LinkIcon,
      type: "Resource",
      link: "#",
    },
    {
      id: 4,
      title: "Research Library",
      description: "Access to medical journals and research publications for members",
      icon: BookOpen,
      type: "Library",
      link: "#",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-600">Resources</h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Explore our comprehensive collection of resources designed to support your spiritual and professional growth
          in healthcare.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <div
                key={resource.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-800">{resource.title}</h3>
                      <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{resource.description}</p>
                    <a
                      href={resource.link}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Access Resource
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
