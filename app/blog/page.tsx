import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/motion/fade-in"
import { ArrowRight } from "lucide-react"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { blogPosts as posts } from "@/lib/blog-posts"

const title = "Blog"
const description =
  "Technical articles on data center electrical design, tier classification, redundancy, PUE, hot/cold aisle containment, single-line diagrams, PDUs, UPS topologies, cable sizing, backup power, distribution architecture, and earthing — from Vision Matrix Institute."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title,
    description,
    images: [{ url: "/electrical-design-data-center.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/electrical-design-data-center.jpg"] },
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
])

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent-tint/20 blur-[110px]" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-serif font-medium text-white leading-tight mb-4">Blog</h1>
            <p className="text-lg text-white/70 font-body leading-relaxed">
              Technical explainers and career guidance on data center electrical design — written by the same
              team that teaches our courses.
            </p>
            <p className="mt-4">
              <Link
                href="/resources/data-center-design-basics-checklist"
                className="text-accent-tint font-semibold hover:underline"
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
                  <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="order-2 sm:order-1 flex-1 p-6 space-y-3">
                          <Badge className="bg-accent/10 text-accent hover:bg-accent/10">{post.category}</Badge>
                          <h2 className="text-xl font-bold font-sans text-foreground">{post.title}</h2>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">{post.description}</p>
                          <span className="inline-flex items-center gap-1.5 text-sm text-accent font-semibold">
                            Read article <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                        <div className="order-1 sm:order-2 relative w-full sm:w-48 md:w-56 aspect-[16/9] sm:aspect-square shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 224px"
                          />
                        </div>
                      </div>
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
