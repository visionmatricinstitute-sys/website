export interface BlogPostSummary {
  slug: string
  category: string
  title: string
  description: string
  image: string
}

export const blogPosts: BlogPostSummary[] = [
  {
    slug: "single-line-diagrams-explained",
    category: "Technical Basics",
    title: "Single-Line Diagrams Explained (SLD)",
    description:
      "A single-line diagram is the one drawing every electrical engineer, contractor, and inspector on a data center project actually works from — and it deliberately leaves almost everything out. Here's what it keeps, what the symbols mean, and how to actually read one.",
    image: "/data-center-single-line-diagram.jpg",
  },
  {
    slug: "pdu-power-distribution-unit-explained",
    category: "Technical Basics",
    title: "PDU (Power Distribution Unit) Explained",
    description:
      "Somewhere between the UPS output and a server's power cord, one piece of equipment does the actual job of splitting bulk power into the dozens of individually protected circuits a data hall needs. Here's what a PDU really does — and the two very different things people mean by that name.",
    image: "/data-center-pdu-explained.jpg",
  },
  {
    slug: "ups-topologies-explained",
    category: "Technical Basics",
    title: "UPS Topologies Explained: Standby, Line-Interactive, Double-Conversion",
    description:
      "Not every UPS protects a server the same way, and the difference isn't marketing — it's how many milliseconds of interruption actually reach the load. Here's the three real UPS topologies, and the separate question of how many UPS units a design actually needs.",
    image: "/data-center-ups-topologies.jpg",
  },
  {
    slug: "redundancy-n-n1-2n-explained",
    category: "Technical Basics",
    title: "Data Center Redundancy Explained: N, N+1, 2N, 2(N+1)",
    description:
      "N+1 and 2N both get called \"redundant\" — they are not remotely the same thing, and mixing them up in a design review or an interview is a fast way to lose credibility. Here's what each notation actually means.",
    image: "/data-center-redundancy-explained.jpg",
  },
  {
    slug: "pue-power-usage-effectiveness-explained",
    category: "Technical Basics",
    title: "PUE (Power Usage Effectiveness) Explained",
    description:
      "PUE is the single number every data center operator quotes — and the single number most people can recite without being able to say what it actually penalizes. Here's the real formula, what drives it, and why 1.0 is a number you'll never see.",
    image: "/data-center-pue-explained.jpg",
  },
  {
    slug: "hot-aisle-cold-aisle-containment-explained",
    category: "Technical Basics",
    title: "Hot Aisle / Cold Aisle Containment Explained",
    description:
      "Every data center layout diagram shows alternating hot and cold aisles, but the reason isn't decoration — it's the cheapest, most effective way to stop a facility from cooling its own exhaust air. Here's how it actually works.",
    image: "/data-center-hot-cold-aisle.jpg",
  },
  {
    slug: "data-center-tier-classification-explained",
    category: "Technical Basics",
    title: "Data Center Tier Classification Explained (Tier I–IV)",
    description:
      "Tier I–IV isn't a marketing label — it's a specific engineering answer to one question: what happens when a component fails? Here's what actually separates each tier, the real numbers behind them, and the two systems people mix up.",
    image: "/data-center-tier-classification.jpg",
  },
  {
    slug: "how-to-become-a-data-center-electrical-design-engineer-in-india",
    category: "Career Guide",
    title: "How to Become a Data Center Electrical Design Engineer in India (2026 Guide)",
    description:
      "A complete guide to the data center electrical design career path in India: what the role involves, the tools and standards you need, real salary ranges, certifications, and how to get started.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "cable-sizing-basics-for-data-center-electrical-design",
    category: "Technical Basics",
    title: "Cable Sizing Basics for Data Center Electrical Design",
    description:
      "The four factors that actually decide a cable size in data center electrical design — current rating, voltage drop, derating, and short-circuit withstand — explained simply.",
    image: "/data-center-cable-sizing.jpg",
  },
  {
    slug: "ups-vs-diesel-generator-data-center-backup-power",
    category: "Technical Basics",
    title: "UPS vs Diesel Generator: Which One Handles a Power Outage?",
    description:
      "They're not competing solutions — a UPS and a diesel generator solve two different problems in a data center power outage. Here's what each one actually does, and why you almost always need both.",
    image: "/data-center-ups-vs-generator.jpg",
  },
  {
    slug: "mv-lv-power-distribution-architecture-explained",
    category: "Technical Basics",
    title: "MV/LV Power Distribution Architecture, Explained",
    description:
      "Why data center power comes in at medium voltage and gets stepped down in stages, and how radial, ring, and 2N distribution architectures trade off cost against resilience.",
    image: "/data-center-mv-lv-distribution.jpg",
  },
  {
    slug: "earthing-and-bonding-basics-for-data-centers",
    category: "Technical Basics",
    title: "Earthing & Bonding Basics for Data Centers",
    description:
      "Earthing and bonding are two different jobs that get lumped together — one is about safety, the other is about keeping sensitive equipment from seeing electrical noise. Here's the difference and why data centers care more than most buildings.",
    image: "/data-center-earthing-bonding.jpg",
  },
]

export interface AdjacentPost {
  slug: string
  title: string
}

export function getAdjacentPosts(slug: string): { prev: AdjacentPost | null; next: AdjacentPost | null } {
  const index = blogPosts.findIndex((post) => post.slug === slug)
  if (index === -1) return { prev: null, next: null }
  const prev = index > 0 ? blogPosts[index - 1] : null
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : null
  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  }
}
