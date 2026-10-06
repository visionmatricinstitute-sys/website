import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "ai-data-centers-explained"
const title = "AI Data Centers Explained"
const description = "What makes an AI data center different from a traditional one: GPU clusters, rack density, networking, cooling and power, and what it means for engineers."

const heroImageSrc = "/hero-data-center.jpg"
const heroImageAlt = "AI data center hall with high-density racks"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `/blog/${slug}` },
  openGraph: {
    type: "article",
    url: `/blog/${slug}`,
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    "question": "What is an AI data center?",
    "answer": "A data center designed to run AI training or inference workloads, typically on clusters of GPUs or other accelerators connected by high-bandwidth networks."
  },
  {
    "question": "How is it different from a traditional data center?",
    "answer": "Mainly higher power density per rack, a stronger move to liquid cooling, larger and denser power distribution, and network topologies built for accelerator clusters."
  },
  {
    "question": "Do AI data centers need different electrical design?",
    "answer": "The principles are the same, but loads are larger and denser, power transients from synchronised workloads need attention, and distribution and cooling are sized differently."
  },
  {
    "question": "Is AI demand changing data center design now?",
    "answer": "Yes. Rack density, cooling approach and power architecture are all evolving, so design guidance and product ratings should be checked against current sources."
  }
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: `https://www.visionmatrixinstitute.com${heroImageSrc}`,
  author: { "@type": "Organization", name: "Vision Matrix Institute" },
  publisher: {
    "@type": "Organization",
    name: "Vision Matrix Institute",
    logo: { "@type": "ImageObject", url: "https://www.visionmatrixinstitute.com/icon.png" },
  },
  datePublished: "2026-10-06",
  dateModified: "2026-10-06",
  mainEntityOfPage: `https://www.visionmatrixinstitute.com/blog/${slug}`,
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const { prev, next } = getAdjacentPosts(slug)

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: `/blog/${slug}` },
])

export default function Post() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ArticleShell
          category={"AI Data Centers"}
          title={title}
          description={"AI data centers run the same building blocks as any data center, pushed much harder. The difference shows up in rack power, cooling and the size of the electrical system."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'AI Data Centers Explained' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="what">What changes</h2>
            <table>
              <thead><tr><th>Area</th><th>Traditional</th><th>AI-focused</th></tr></thead>
              <tbody>
                <tr><td>Rack power</td><td>Commonly single-digit to low tens of kW</td><td>Many times higher, with some designs above 100 kW per rack</td></tr>
                <tr><td>Cooling</td><td>Mostly air</td><td>Liquid cooling increasingly used, often with air for the remainder</td></tr>
                <tr><td>Power distribution</td><td>Standard busway and PDUs</td><td>Larger feeders and busway, higher-rated PDUs</td></tr>
                <tr><td>Network</td><td>General-purpose</td><td>High-bandwidth fabrics for accelerator clusters</td></tr>
              </tbody>
            </table>
            <p>Figures vary widely by design and are changing quickly; verify against current vendor and project data.</p>

            <h2 id="design">Design implications</h2>
            <ul>
              <li><strong>Power:</strong> the total facility load is larger and denser, so the utility connection, transformers and generators grow with it. See <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link>.</li>
              <li><strong>Cooling:</strong> see <Link href="/blog/liquid-cooling-direct-to-chip-vs-immersion">liquid cooling explained</Link>.</li>
              <li><strong>Power quality:</strong> synchronised workloads can create large, fast load swings that the UPS and generator must handle.</li>
              <li><strong>Layout:</strong> floor loading, piping and cable routes change.</li>
            </ul>
            <p>Read next: <Link href="/blog/high-density-racks-power-distribution-implications">high-density rack power distribution</Link> and <Link href="/blog/ai-vs-traditional-data-center-electrical-design">AI vs traditional electrical design</Link>.</p>
          </div>
        </ArticleShell>
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-body">
              Learn to do this on a full project in the{" "}
              <Link href="/programs/electrical-design-data-center" className="text-foreground font-semibold underline underline-offset-4 hover:no-underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program, or read the{" "}
              <Link href="/data-center-design" className="text-foreground font-semibold underline underline-offset-4 hover:no-underline">
                data center design guide
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
