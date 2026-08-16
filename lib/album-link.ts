import "server-only"

// Google Photos shared-album pages (photos.app.goo.gl/... which redirects to
// photos.google.com/share/...) render Open Graph meta tags server-side for
// link-preview purposes. We reuse that same tag to grab a cover image,
// without needing OAuth or the Photos API at all.
export async function fetchAlbumPreview(albumUrl: string): Promise<{
  imageUrl: string | null
  title: string | null
}> {
  const res = await fetch(albumUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; MSCUGalleryBot/1.0)" },
    redirect: "follow",
  })
  if (!res.ok) throw new Error(`Could not open that link (status ${res.status})`)

  const html = await res.text()

  const imageMatch =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)

  const titleMatch =
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i)

  return {
    imageUrl: imageMatch ? imageMatch[1] : null,
    title: titleMatch ? titleMatch[1] : null,
  }
}

export async function downloadImage(url: string): Promise<{ bytes: Buffer; contentType: string }> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Could not download cover image (status ${res.status})`)
  const bytes = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get("content-type") || "image/jpeg"
  return { bytes, contentType }
}
