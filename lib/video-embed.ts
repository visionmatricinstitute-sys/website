/** Converts a YouTube/Vimeo URL to its embeddable form. Returns null for anything else
 * (the caller should fall back to a plain <video> tag for direct file URLs). */
export function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v")
      if (id) return `https://www.youtube.com/embed/${id}`
      const shortsMatch = u.pathname.match(/\/shorts\/([^/]+)/)
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}`
    }
    return null
  } catch {
    return null
  }
}
