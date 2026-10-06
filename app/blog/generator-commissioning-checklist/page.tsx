import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "generator-commissioning-checklist"
const title = "Generator Commissioning Checklist"
const description = "A checklist for commissioning a standby diesel generator set: pre-start checks, fuel and cooling, start and transfer time, load bank and step-load tests, paralleling and ATS integration."

const heroImageSrc = "/data-center-ups-vs-generator.jpg"
const heroImageAlt = "Standby generator set during commissioning"

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
    "question": "What does generator commissioning include?",
    "answer": "Pre-start installation checks, fuel, cooling and exhaust systems, start-up, protection and control tests, load bank testing at stepped loads, step-load response, paralleling and transfer tests, and endurance running."
  },
  {
    "question": "What is a step-load test?",
    "answer": "Applying load in steps to check voltage and frequency stay within limits as the generator picks up load, as it will when a transfer happens."
  },
  {
    "question": "What is tested at the ATS?",
    "answer": "Transfer on utility failure, return on restoration, timers, interlocks and the interaction with the UPS and other systems."
  },
  {
    "question": "How long should it run?",
    "answer": "Duration is set by the specification and manufacturer, to prove thermal stability and fuel and cooling performance."
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
          description={"A standby generator only matters when the utility fails, so commissioning has to prove it starts, takes load and keeps running, in the same sequence a real outage would follow."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Generator Commissioning Checklist' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="pre">1. Pre-start checks</h2>
            <ul>
              <li>Installation, mountings, exhaust, ventilation and cooling as drawn.</li>
              <li>Fuel system filled, clean and leak-free; day tank and transfer pumps operate.</li>
              <li>Batteries, charger, lubrication and coolant levels checked.</li>
              <li>Control panel settings and protection loaded. Electrical connections tested. See <Link href="/blog/switchgear-testing-and-commissioning-checklist">switchgear testing</Link>.</li>
            </ul>

            <h2 id="run">2. Start-up and running</h2>
            <ul>
              <li>Start on command and on simulated utility failure; record start-to-ready time.</li>
              <li>Check speed, voltage, frequency and temperatures, and alarms and trips.</li>
              <li>Emergency stop and protection operations proven.</li>
            </ul>

            <h2 id="load">3. Load testing</h2>
            <table>
              <thead><tr><th>Test</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>Load bank in stages</td><td>Capacity, cooling and fuel performance across the load range</td></tr>
                <tr><td>Step-load acceptance</td><td>Voltage and frequency response when load is applied suddenly</td></tr>
                <tr><td>Endurance run</td><td>Stability over the specified duration</td></tr>
                <tr><td>Paralleling (if applicable)</td><td>Synchronising and load sharing between sets</td></tr>
              </tbody>
            </table>

            <h2 id="integration">4. Integration</h2>
            <ul>
              <li>ATS transfer and return, timers and interlocks. See <Link href="/blog/sts-vs-ats-data-center-transfer-switches">STS vs ATS</Link>.</li>
              <li>UPS on generator supply. See <Link href="/blog/ups-commissioning-and-load-bank-testing">UPS commissioning</Link>.</li>
              <li>Monitoring and alarms at the facility control system.</li>
              <li>Fuel runtime against the design target. See <Link href="/blog/generator-sizing-data-center-worked-example">generator sizing</Link>.</li>
            </ul>
            <p>This is a general checklist. The manufacturer's procedures, the project specification and the commissioning plan decide the actual tests, values and acceptance criteria.</p>
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
