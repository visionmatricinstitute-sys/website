import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "load-flow-study-explained-data-center"
const title = "Load Flow Study Explained for Data Center Electrical Design"
const description = "What a load flow (power flow) study calculates, the inputs it needs, the scenarios to run in a data center, and how to read the results."

const heroImageSrc = "/data-center-single-line-diagram.jpg"
const heroImageAlt = "Single-line diagram used as the model for a load flow study"

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
    "question": "What is a load flow study?",
    "answer": "A steady-state calculation of voltages, currents, power flows and losses throughout the system for a given set of sources and loads."
  },
  {
    "question": "What inputs does it need?",
    "answer": "The network model from the single-line diagram, source data, transformer and cable parameters, and the loads with their power factors."
  },
  {
    "question": "What scenarios should be studied?",
    "answer": "At least normal operation, maintenance cases with a path out of service, and the generator-supplied case, each at the loading that stresses the system most."
  },
  {
    "question": "Does a load flow study check fault levels?",
    "answer": "No. Fault levels come from a short-circuit study. Load flow is for normal-current conditions."
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
          description={"A load flow study answers a simple question: with the system loaded as designed, are voltages and equipment loadings within limits? Here is what goes in, what comes out and which cases to run."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Load Flow Study Explained for Data Center Electrical Design' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="outputs">What it calculates</h2>
            <ul>
              <li>Voltage at each bus, so you can check it stays within the allowed range.</li>
              <li>Current and loading on each cable, transformer and breaker.</li>
              <li>Active and reactive power flow and system losses.</li>
              <li>Power factor at key points, which helps with correction decisions. See <Link href="/blog/power-factor-correction-capacitor-bank-sizing">power factor correction</Link>.</li>
            </ul>

            <h2 id="scenarios">Scenarios to run</h2>
            <table>
              <thead><tr><th>Scenario</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td>Normal, maximum load</td><td>Check the design as intended</td></tr>
                <tr><td>One transformer or path out of service</td><td>Check redundancy: remaining equipment must carry the load within limits</td></tr>
                <tr><td>On generator</td><td>Check voltage and loading with the generator as the only source</td></tr>
                <tr><td>Minimum load</td><td>Check for high voltage or leading power factor problems</td></tr>
              </tbody>
            </table>

            <h2 id="results">Reading the results</h2>
            <p>
              Look for overloaded equipment, voltages outside the limit, unexpected losses and any path whose loading after a
              failure exceeds its rating. Where a bus voltage is low, options include transformer tap changes, larger
              conductors or reactive power support. Cross-check cable results with <Link href="/blog/voltage-drop-calculation-formula-examples">voltage drop</Link> calculations.
            </p>
            <p>The study depends on the single-line diagram being right; see <Link href="/blog/single-line-diagrams-explained">single-line diagrams explained</Link>.</p>
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
