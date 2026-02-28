import type { MetadataRoute } from "next"

const SITE_URL = "https://medicalschoolcu.org"

type WPPost = {
  slug: string
  modified: string
}

async function getBlogSlugs(): Promise<WPPost[]> {
  try {
    const res = await fetch(
      "https://public-api.wordpress.com/wp/v2/sites/msculiterature.wordpress.com/posts?_fields=slug,modified&per_page=100",
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogSlugs()

  const blogEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: new Date(post.modified),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/leadership`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...blogEntries,
  ]
}
