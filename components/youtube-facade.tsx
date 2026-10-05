"use client"

import { useState } from "react"
import { Play } from "lucide-react"

/**
 * Click-to-load YouTube embed. The real iframe (about 1 MB of third-party JS plus
 * cookies) is only added once the visitor clicks play; until then it is a lightweight
 * thumbnail, which keeps the homepage fast on mobile.
 */
export function YoutubeFacade({ id, title, thumbnailUrl }: { id: string; title: string; thumbnailUrl: string }) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      className="relative block w-full h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbnailUrl} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
          <Play className="h-7 w-7 fill-current" />
        </span>
      </span>
    </button>
  )
}
