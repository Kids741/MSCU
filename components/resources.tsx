"use client"

import { BookOpen, FileText, LinkIcon, Download } from "lucide-react"

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: "MSCU Constitution",
      description: "The official constitution of the Medical School Christian Union",
      icon: BookOpen,
      type: "Document",
      link: "/Resources/MSCU%20Constitution.pdf",
    },
    {
      id: 2,
      title: "Leadership Manual",
      description: "A comprehensive guide for MSCU leaders on how to effectively run their ministries, fellowship and organize events",
      icon: FileText,
      type: "Document",
      link: "/Resources/Leaders%20Manual.pdf",
    },
    {
      id: 3,
      title: "Devotional Guides & Study Materials",
      description: "Devotional guides and study materials to support spiritual growth and understanding of God's word",
      icon: LinkIcon,
      type: "Online Resource",
      link: "https://play.google.com/store/apps/details?id=com.focuskenya.students",
    },
    {
      id: 4,
      title: "Bible Study Resources",
      description: "Bible study guides and resources to deepen your understanding of Scripture",
      icon: BookOpen,
      type: "Library",
      link: "https://www.biblegateway.com/",
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
