import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "green-data-centers-efficiency-levers"
const title = "Green Data Centers: Efficiency Levers"
const description = "The main ways a data center can reduce its energy, water and carbon impact: efficient cooling, power chain, load management, heat reuse and cleaner supply, with the standard metrics."

const heroImageSrc = "/data-center-pue-explained.jpg"
const heroImageAlt = "Energy-efficient data center cooling and power"

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
    "question": "What makes a data center green?",
    "answer": "Low energy use per unit of IT work, low water use where water is scarce, a cleaner electricity supply, and attention to the carbon in construction and equipment."
  },
  {
    "question": "What metrics are used?",
    "answer": "PUE for energy efficiency, WUE for water and CUE for carbon, defined by The Green Grid and in the ISO/IEC 30134 series."
  },
  {
    "question": "Is a low PUE enough?",
    "answer": "No. PUE measures facility overhead, not how efficiently the IT equipment is used, or the carbon intensity of the supply."
  },
  {
    "question": "What is the biggest lever?",
    "answer": "It depends on the site, but cooling design, load management and the electricity source are commonly large factors."
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
          category={"Sustainability"}
          title={title}
          description={"A green data center is not a single feature. It is a set of levers across power, cooling, water and supply, each measured with agreed metrics."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Green Data Centers: Efficiency Levers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="levers">The levers</h2>
            <table>
              <thead><tr><th>Lever</th><th>What it changes</th></tr></thead>
              <tbody>
                <tr><td>Efficient cooling and airflow</td><td>Reduces cooling energy and PUE. See <Link href="/blog/data-center-cooling-systems-explained">cooling systems</Link></td></tr>
                <tr><td>Efficient power chain</td><td>Lower UPS, transformer and distribution losses. See <Link href="/blog/ups-topologies-explained">UPS topologies</Link></td></tr>
                <tr><td>Load management</td><td>Higher utilisation of IT equipment, less idle power</td></tr>
                <tr><td>Water strategy</td><td>Lower WUE in water-scarce regions. See <Link href="/blog/wue-water-usage-effectiveness-explained">WUE explained</Link></td></tr>
                <tr><td>Heat reuse</td><td>Uses waste heat for nearby buildings where feasible</td></tr>
                <tr><td>Cleaner supply</td><td>Reduces carbon per kWh. See <Link href="/blog/renewable-energy-for-data-centers">renewable energy</Link></td></tr>
              </tbody>
            </table>

            <h2 id="metrics">Measure it</h2>
            <p>
              Use PUE, WUE and CUE together, with a clear measurement boundary and period, since each can be improved at the
              expense of another. The <Link href="/engineers-toolkit/data-center-efficiency-calculator">efficiency calculator</Link> covers all three.
            </p>
            <p>Context: <Link href="/blog/pue-power-usage-effectiveness-explained">PUE explained</Link>.</p>
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
