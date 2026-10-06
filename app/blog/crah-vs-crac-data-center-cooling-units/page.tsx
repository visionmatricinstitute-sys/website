import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "crah-vs-crac-data-center-cooling-units"
const title = "CRAH vs CRAC: Data Center Cooling Units Compared"
const description = "What CRAH and CRAC units are, how they differ in how they remove heat, where each fits, and the electrical and operational trade-offs."

const heroImageSrc = "/data-center-hot-cold-aisle.jpg"
const heroImageAlt = "Cooling units in a data center white space"

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
    "question": "What does CRAC stand for?",
    "answer": "Computer room air conditioner. It contains its own refrigeration circuit with a compressor, evaporator and, in direct-expansion units, a condenser connection."
  },
  {
    "question": "What does CRAH stand for?",
    "answer": "Computer room air handler. It has a fan and a chilled-water coil and relies on a central chiller plant for cooling."
  },
  {
    "question": "Which is more efficient?",
    "answer": "It depends on the whole system. CRAH units avoid per-unit compressors but need a chiller plant and pumps, so compare the efficiency of the complete heat-removal chain for the climate and scale."
  },
  {
    "question": "Which is better for a small data center?",
    "answer": "Small sites often use refrigerant-based units for simplicity; larger sites often favour chilled-water systems. Scale, climate and operations skills drive the choice."
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
          category={"Cooling"}
          title={title}
          description={"Both sit in the data hall and push cold air at the IT equipment. The difference is where the cooling comes from: a compressor inside the unit, or a chilled-water plant outside it."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the CRAH vs CRAC article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="diff">The difference</h2>
            <table>
              <thead><tr><th></th><th>CRAC</th><th>CRAH</th></tr></thead>
              <tbody>
                <tr><td>Cooling source</td><td>Own compressor and refrigerant circuit</td><td>Chilled water from a central plant</td></tr>
                <tr><td>Main electrical load in the unit</td><td>Compressor and fan</td><td>Fan only (plant and pumps are elsewhere)</td></tr>
                <tr><td>Infrastructure</td><td>Refrigerant piping, heat rejection per unit or group</td><td>Chilled-water piping, pumps, chillers</td></tr>
                <tr><td>Scaling</td><td>In unit steps</td><td>Centralised, scales well at larger capacity</td></tr>
                <tr><td>Typical fit</td><td>Small to medium rooms</td><td>Medium to large facilities</td></tr>
              </tbody>
            </table>
            <p>These are general tendencies, not rules; check each project's constraints.</p>

            <h2 id="electrical">Electrical implications</h2>
            <ul>
              <li>CRAC units put compressor motor starting current on the board; CRAH units concentrate the electrical load in the chiller plant and pumps.</li>
              <li>Both need fans and controls on a supply that rides through transfer events, and a defined restart sequence.</li>
            </ul>
            <p>
              Overview: <Link href="/blog/data-center-cooling-systems-explained">data center cooling systems explained</Link> and{" "}
              <Link href="/blog/chilled-water-vs-air-cooled-data-center-cooling">chilled-water vs air-cooled</Link>.
            </p>
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
