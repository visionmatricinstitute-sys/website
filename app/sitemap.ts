import type { MetadataRoute } from "next"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/hero-data-center.jpg`, `${siteUrl}/logo.png`],
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
      url: `${siteUrl}/programs/electrical-design-data-center`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${siteUrl}/electrical-design-data-center.jpg`],
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
