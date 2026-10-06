import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "ups-selection-criteria-what-to-specify"
const title = "UPS Selection Criteria: What to Specify"
const description = "A checklist of what to specify when selecting a UPS for a data center: capacity and power factor, topology, efficiency, redundancy, batteries, harmonics, bypass, monitoring and service."

const heroImageSrc = "/data-center-ups-topologies.jpg"
const heroImageAlt = "UPS cabinets being selected for a data center"

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
    "question": "What are the key UPS selection criteria?",
    "answer": "Capacity (kW and kVA) and output power factor, topology, efficiency at the expected load, redundancy arrangement, battery type and autonomy, input harmonics and power factor, bypass arrangement, scalability, monitoring and service support."
  },
  {
    "question": "Should I size by kW or kVA?",
    "answer": "Both. Size from the load in kW, check kVA, and confirm the UPS's rated kW at the load power factor from the datasheet."
  },
  {
    "question": "Why does efficiency at part load matter?",
    "answer": "UPS systems often run well below their rating in redundant configurations, so efficiency at the expected load, not at full load, decides running cost."
  },
  {
    "question": "What about service?",
    "answer": "Maintenance support, spare parts availability and response times matter over the life of the system and should be part of the selection."
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
          description={"Selecting a UPS is more than choosing a kVA rating. These are the items a complete specification covers, with links to how each is decided."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'UPS Selection Criteria: What to Specify' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="list">The specification checklist</h2>
            <table>
              <thead><tr><th>Criterion</th><th>What to settle</th></tr></thead>
              <tbody>
                <tr><td>Capacity</td><td>Load, losses, growth, kW and kVA, output power factor. See <Link href="/blog/ups-sizing-data-center-worked-example">UPS sizing example</Link></td></tr>
                <tr><td>Topology</td><td>Standby, line-interactive or double-conversion. See <Link href="/blog/ups-topologies-explained">UPS topologies</Link></td></tr>
                <tr><td>Redundancy</td><td>N+1, 2N or block redundant, matching the tier target. See <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link></td></tr>
                <tr><td>Efficiency</td><td>At the expected loading, including any eco-mode and its trade-offs</td></tr>
                <tr><td>Batteries</td><td>Chemistry, autonomy and footprint. See <Link href="/blog/ups-battery-sizing-autonomy-time-worked-example">battery sizing</Link> and <Link href="/blog/lithium-ion-vs-vrla-batteries-for-ups">lithium-ion vs VRLA</Link></td></tr>
                <tr><td>Input characteristics</td><td>Harmonic distortion and input power factor. See <Link href="/blog/harmonics-in-data-centers-sources-and-mitigation">harmonics</Link></td></tr>
                <tr><td>Bypass</td><td>Static and maintenance bypass arrangement</td></tr>
                <tr><td>Generator compatibility</td><td>Behaviour on generator supply. See <Link href="/blog/generator-sizing-data-center-worked-example">generator sizing</Link></td></tr>
                <tr><td>Scalability</td><td>Modular growth without shutting down the load</td></tr>
                <tr><td>Monitoring</td><td>Protocols and integration with the facility monitoring system. See <Link href="/blog/what-is-dcim-and-do-you-need-it">DCIM</Link></td></tr>
                <tr><td>Service</td><td>Support, spares and response times</td></tr>
                <tr><td>Standards</td><td>The applicable UPS performance standard (IEC 62040 series) and test evidence</td></tr>
              </tbody>
            </table>

            <h2 id="process">How to use it</h2>
            <ol>
              <li>Size the capacity and redundancy first, since they decide the module count.</li>
              <li>Write the specification so that vendors quote the same basis: load, power factor, efficiency points and autonomy.</li>
              <li>Compare total cost of ownership over the system's life, not only the price.</li>
              <li>Check factory test and witness requirements. See <Link href="/blog/fat-sat-ist-testing-data-center-explained">FAT, SAT and IST</Link>.</li>
            </ol>
            <p>Run your numbers in the <Link href="/engineers-toolkit/ups-selection-calculator">UPS sizing calculator</Link>.</p>
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
