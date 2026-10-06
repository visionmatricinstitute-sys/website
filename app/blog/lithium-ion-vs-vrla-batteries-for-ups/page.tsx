import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "lithium-ion-vs-vrla-batteries-for-ups"
const title = "Lithium-ion vs VRLA Batteries for UPS"
const description = "How lithium-ion and valve-regulated lead-acid (VRLA) batteries compare for UPS use: footprint, life, cost, maintenance, temperature and safety considerations."

const heroImageSrc = "/data-center-ups-topologies.jpg"
const heroImageAlt = "Battery cabinets for a UPS system"

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
    "question": "What is VRLA?",
    "answer": "Valve-regulated lead-acid, a sealed lead-acid battery type long used in UPS systems."
  },
  {
    "question": "What are the main advantages of lithium-ion?",
    "answer": "Typically smaller footprint and weight, longer service life and more cycles, at a higher initial price. Verify with the specific product."
  },
  {
    "question": "What are the advantages of VRLA?",
    "answer": "Mature technology, lower initial cost and wide familiarity, with a shorter life and more replacements."
  },
  {
    "question": "Which is safer?",
    "answer": "Both have hazards. Lithium-ion needs a battery management system and fire safety design for thermal runaway; lead-acid has gas and acid considerations. Follow the manufacturer and applicable codes."
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
          category={"Electrical Design"}
          title={title}
          description={"Both chemistries are used in data center UPS systems. The right choice depends on footprint, life, cost and how you manage safety."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Lithium-ion vs VRLA Batteries for UPS' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="compare">Side by side</h2>
            <table>
              <thead><tr><th></th><th>VRLA</th><th>Lithium-ion</th></tr></thead>
              <tbody>
                <tr><td>Footprint and weight</td><td>Larger and heavier for the same energy</td><td>Smaller and lighter</td></tr>
                <tr><td>Service life</td><td>Shorter; more replacements</td><td>Longer, as specified by the manufacturer</td></tr>
                <tr><td>Initial cost</td><td>Lower</td><td>Higher</td></tr>
                <tr><td>Maintenance</td><td>Periodic inspection and testing</td><td>Monitoring through the battery management system</td></tr>
                <tr><td>Safety design</td><td>Ventilation, gas and acid handling</td><td>Thermal runaway protection, fire safety design</td></tr>
              </tbody>
            </table>
            <p>These are general tendencies; compare actual products and use the manufacturer's data.</p>

            <h2 id="decide">How to decide</h2>
            <ol>
              <li>Compare total cost of ownership over the facility's life, including replacement and space.</li>
              <li>Check temperature, floor loading and room size constraints.</li>
              <li>Confirm UPS compatibility and warranty terms.</li>
              <li>Review fire safety and local code requirements.</li>
            </ol>
            <p>Sizing is a separate step: <Link href="/blog/ups-battery-sizing-autonomy-time-worked-example">UPS battery sizing</Link>.</p>
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
