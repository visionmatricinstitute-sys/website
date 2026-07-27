import type { VideoEntry } from "@/lib/video-data"

export function videoObjectJsonLd(video: VideoEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    publisher: {
      "@type": "Organization",
      name: "Vision Matrix Institute",
      logo: { "@type": "ImageObject", url: "https://www.visionmatrixinstitute.com/icon.png" },
    },
  }
}
