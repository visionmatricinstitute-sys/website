import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/motion/fade-in"
import { ArrowRight } from "lucide-react"

const title = "Blog"
const description =
  "Technical articles on data center electrical design, cable sizing, backup power, distribution architecture, and earthing — from Vision Matrix Institute."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
}

const posts = [
  {
    slug: "how-to-become-a-data-center-electrical-design-engineer-in-india",
    category: "Career Guide",
    title: "How to Become a Data Center Electrical Design Engineer in India (2026 Guide)",
    description:
      "A complete guide to the data center electrical design career path in India: what the role involves, the tools and standards you need, real salary ranges, certifications, and how to get started.",
  },
  {
    slug: "cable-sizing-basics-for-data-center-electrical-design",
    category: "Technical Basics",
    title: "Cable Sizing Basics for Data Center Electrical Design",
    description:
      "The four factors that actually decide a cable size in data center electrical design — current rating, voltage drop, derating, and short-circuit withstand — explained simply.",
  },
  {
    slug: "ups-vs-diesel-generator-data-center-backup-power",
    category: "Technical Basics",
    title: "UPS vs Diesel Generator: Which One Handles a Power Outage?",
    description:
      "They're not competing solutions — a UPS and a diesel generator solve two different problems in a data center power outage. Here's what each one actually does, and why you almost always need both.",
  },
  {
    slug: "mv-lv-power-distribution-architecture-explained",
    category: "Technical Basics",
    title: "MV/LV Power Distribution Architecture, Explained",
    description:
      "Why data center power comes in at medium voltage and gets stepped down in stages, and how radial, ring, and 2N distribution architectures trade off cost against resilience.",
  },
  {
    slug: "earthing-and-bonding-basics-for-data-centers",
    category: "Technical Basics",
    title: "Earthing & Bonding Basics for Data Centers",
    description:
      "Earthing and bonding are two different jobs that get lumped together — one is about safety, the other is about keeping sensitive equipment from seeing electrical noise. Here's the difference and why data centers care more than most buildings.",
  },
]

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent/25 blur-[110px]" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">Blog</h1>
            <p className="text-lg text-white/70 font-serif leading-relaxed">
              Technical explainers and career guidance on data center electrical design — written by the same
              team that teaches our courses.
            </p>
            <p className="mt-4">
              <Link
                href="/resources/data-center-design-basics-checklist"
                className="text-accent font-semibold hover:underline"
              >
                Free download: Data Center Design Basics Checklist →
              </Link>
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            {posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.05}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 space-y-3">
                      <Badge className="bg-accent/10 text-accent hover:bg-accent/10">{post.category}</Badge>
                      <h2 className="text-xl font-bold font-sans text-foreground">{post.title}</h2>
                      <p className="text-sm text-muted-foreground font-serif leading-relaxed">{post.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent font-semibold">
                        Read article <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
