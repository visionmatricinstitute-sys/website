import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "ups-commissioning-and-load-bank-testing"
const title = "UPS Commissioning and Load Bank Testing"
const description = "What UPS commissioning covers: installation checks, load bank steps, transfer to battery and bypass, battery discharge, parallel load sharing and alarms, with notes on doing it safely."

const heroImageSrc = "/data-center-ups-topologies.jpg"
const heroImageAlt = "UPS under test with a load bank"

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
    "question": "What is a load bank?",
    "answer": "Equipment that draws a controlled electrical load, usually resistive, so a UPS, generator or other source can be tested at known load levels without real IT equipment."
  },
  {
    "question": "What tests are done on a UPS?",
    "answer": "Installation checks, input and output verification, load steps, transfer to battery and back, bypass transfers, battery discharge or runtime tests, parallel load sharing and alarm checks."
  },
  {
    "question": "Why test on a load bank?",
    "answer": "It allows the full load range and failure scenarios to be tested before live IT equipment depends on the system."
  },
  {
    "question": "What are the main safety points?",
    "answer": "Battery and DC hazards, correct isolation, adequate cooling for load banks, and following the manufacturer's procedures and the site permit system."
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
          category={"Construction"}
          title={title}
          description={"A UPS is proven by loading it, transferring it and discharging its batteries, in conditions that resemble real events. A load bank provides the load before the IT equipment arrives."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'UPS Commissioning and Load Bank Testing' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="prep">1. Preparation</h2>
            <ul>
              <li>Installation checks complete: wiring, earthing, torque, labelling and battery installation.</li>
              <li>Manufacturer start-up performed and settings recorded.</li>
              <li>Load bank, cabling and cooling arranged for the test load. Real power output depends on the UPS's rated power factor; see <Link href="/blog/ups-sizing-data-center-worked-example">UPS sizing</Link>.</li>
            </ul>

            <h2 id="tests">2. Typical tests</h2>
            <table>
              <thead><tr><th>Test</th><th>What it proves</th></tr></thead>
              <tbody>
                <tr><td>Load steps (for example in stages up to full load)</td><td>Output stability, efficiency and temperature at each level</td></tr>
                <tr><td>Transfer to battery and back</td><td>No interruption on input failure and recovery</td></tr>
                <tr><td>Static bypass transfer</td><td>Correct transfer to and from bypass</td></tr>
                <tr><td>Maintenance bypass</td><td>Safe isolation of the UPS for service</td></tr>
                <tr><td>Parallel load sharing</td><td>Modules share load and respond to a module failure</td></tr>
                <tr><td>Battery discharge or runtime test</td><td>Autonomy against the design. See <Link href="/blog/ups-battery-sizing-autonomy-time-worked-example">battery sizing</Link></td></tr>
                <tr><td>Alarms and monitoring</td><td>Events reach the facility monitoring system</td></tr>
              </tbody>
            </table>

            <h2 id="gen">3. With the generator</h2>
            <p>
              Test the UPS on generator supply, since a UPS rectifier can behave differently on a generator. See{" "}
              <Link href="/blog/generator-commissioning-checklist">generator commissioning</Link> and the integrated tests in{" "}
              <Link href="/blog/data-center-commissioning-levels-explained">commissioning levels</Link>.
            </p>
            <p>This is a general checklist. The manufacturer's procedures, the project specification and the commissioning plan decide the actual tests, values and acceptance criteria.</p>
            <p>Related: <Link href="/blog/ups-selection-criteria-what-to-specify">UPS selection criteria</Link>.</p>
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
