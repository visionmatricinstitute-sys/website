import type { MetadataRoute } from "next"
import { INTRO_VIDEO, PROGRAM_PREVIEW_VIDEOS } from "@/lib/video-data"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")

function isoDurationToSeconds(duration: string): number {
  const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/)
  const minutes = match?.[1] ? Number.parseInt(match[1], 10) : 0
  const seconds = match?.[2] ? Number.parseInt(match[2], 10) : 0
  return minutes * 60 + seconds
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/hero-data-center.jpg`, `${siteUrl}/logo.png`],
      videos: [
        {
          title: INTRO_VIDEO.title,
          thumbnail_loc: INTRO_VIDEO.thumbnailUrl,
          description: INTRO_VIDEO.description,
          content_loc: `https://www.youtube.com/watch?v=${INTRO_VIDEO.id}`,
          player_loc: `https://www.youtube.com/embed/${INTRO_VIDEO.id}`,
          duration: isoDurationToSeconds(INTRO_VIDEO.duration),
          publication_date: INTRO_VIDEO.uploadDate,
          family_friendly: "yes",
        },
      ],
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [`${siteUrl}/modern-tech-classroom.png`],
    },
    {
      url: `${siteUrl}/engineers-toolkit`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${siteUrl}/engineers-toolkit-hero.jpg`],
    },
    {
      url: `${siteUrl}/simulations/generator-physics-simulator.html`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/simulations/electron-drift-simulator.html`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/programs/electrical-design-data-center`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${siteUrl}/electrical-design-data-center.jpg`],
      videos: PROGRAM_PREVIEW_VIDEOS.map((video) => ({
        title: video.title,
        thumbnail_loc: video.thumbnailUrl,
        description: video.description,
        content_loc: `https://www.youtube.com/watch?v=${video.id}`,
        player_loc: `https://www.youtube.com/embed/${video.id}`,
        duration: isoDurationToSeconds(video.duration),
        publication_date: video.uploadDate,
        family_friendly: "yes" as const,
      })),
    },
    {
      url: `${siteUrl}/programs/autocad-training`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${siteUrl}/autocad-training.png`],
    },
    {
      url: `${siteUrl}/programs/bim-revit-training`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${siteUrl}/bim-training.jpg`],
    },
    {
      url: `${siteUrl}/programs/computer-skills-applications`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${siteUrl}/computer-training-ms-office.png`],
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog/redundancy-n-n1-2n-explained`,
      lastModified: new Date("2026-08-26"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/data-center-redundancy-explained.jpg`],
    },
    {
      url: `${siteUrl}/blog/pue-power-usage-effectiveness-explained`,
      lastModified: new Date("2026-08-26"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/data-center-pue-explained.jpg`],
    },
    {
      url: `${siteUrl}/blog/hot-aisle-cold-aisle-containment-explained`,
      lastModified: new Date("2026-08-26"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/data-center-hot-cold-aisle.jpg`],
    },
    {
      url: `${siteUrl}/blog/data-center-tier-classification-explained`,
      lastModified: new Date("2026-08-26"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/data-center-tier-classification.jpg`],
    },
    {
      url: `${siteUrl}/blog/how-to-become-a-data-center-electrical-design-engineer-in-india`,
      lastModified: new Date("2026-07-14"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/electrical-design-data-center.jpg`],
    },
    {
      url: `${siteUrl}/blog/cable-sizing-basics-for-data-center-electrical-design`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/electrical-design-data-center.jpg`],
    },
    {
      url: `${siteUrl}/blog/ups-vs-diesel-generator-data-center-backup-power`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/electrical-design-data-center.jpg`],
    },
    {
      url: `${siteUrl}/blog/mv-lv-power-distribution-architecture-explained`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/electrical-design-data-center.jpg`],
    },
    {
      url: `${siteUrl}/blog/earthing-and-bonding-basics-for-data-centers`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${siteUrl}/electrical-design-data-center.jpg`],
    },
    {
      url: `${siteUrl}/resources/data-center-design-basics-checklist`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [`${siteUrl}/electrical-design-data-center.jpg`],
    },
  ]
}
