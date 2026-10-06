import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "power-factor-correction-capacitor-bank-sizing"
const title = "Power Factor Correction: Sizing the Capacitor Bank"
const description = "How to size a power factor correction capacitor bank in kvar, with a worked example, what changes in a data center with UPS and drives, and the harmonic resonance risk to check before installing."

const heroImageSrc = "/data-center-mv-lv-distribution.jpg"
const heroImageAlt = "Low voltage switchboard with a capacitor bank"

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
    "question": "How do you calculate the kvar needed for power factor correction?",
    "answer": "Required kvar = P × (tan φ1 − tan φ2), where P is the real power in kW, φ1 is the angle at the existing power factor and φ2 is the angle at the target power factor."
  },
  {
    "question": "Why correct power factor?",
    "answer": "A lower power factor means more current for the same real power, which loads cables and transformers and can attract utility penalties. Raising the power factor reduces the current and the apparent power."
  },
  {
    "question": "Do data centers need power factor correction?",
    "answer": "Often less than other sites. Modern UPS input stages and drives can present a high power factor, so the main candidates are legacy or motor loads. Always check the actual measured power factor before adding capacitors."
  },
  {
    "question": "Can capacitors cause problems?",
    "answer": "Yes. Capacitors can resonate with the system inductance at a harmonic frequency, which is a real risk where UPS rectifiers and drives produce harmonics. Detuned reactors or an harmonic study are commonly used to manage this."
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
          description={"Power factor correction is a one-line formula, and a long list of cautions. Here is the calculation, a worked example, and the data center specific checks that decide whether a capacitor bank is a good idea at all."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the power factor correction article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="formula">The formula</h2>
            <p>Required capacitor kvar = P × (tan φ1 − tan φ2), where φ = arccos(power factor).</p>

            <h2 id="example">Worked example</h2>
            <p>Assumptions (illustrative): 500 kW real load, existing power factor 0.80, target 0.95, 415 V three phase.</p>
            <ol>
              <li>tan φ1 (at 0.80) = 0.750; tan φ2 (at 0.95) = 0.329</li>
              <li>Required kvar = 500 × (0.750 − 0.329) = <strong>211 kvar</strong></li>
              <li>Apparent power before = 500 ÷ 0.80 = 625 kVA; after = 500 ÷ 0.95 = 526 kVA</li>
              <li>Line current before = 625,000 ÷ (√3 × 415) = 870 A; after = 526,000 ÷ (√3 × 415) = 732 A</li>
            </ol>
            <p>
              The correction frees about 99 kVA of transformer and cable capacity and cuts the current by roughly 138 A. Real
              banks come in discrete steps, so you would select the nearest step arrangement. The{" "}
              <Link href="/engineers-toolkit/power-factor-correction-calculator">power factor correction calculator</Link> does
              this arithmetic for your inputs.
            </p>

            <h2 id="data-center">What is different in a data center</h2>
            <ul>
              <li>Much of the load is behind a UPS or a variable-speed drive, whose input power factor is a manufacturer specification, not a given.</li>
              <li>Harmonic currents from rectifiers and drives make capacitor resonance a real design risk.</li>
              <li>Correction is usually applied at the LV bus for the mechanical plant, not on the UPS-fed IT side.</li>
            </ul>

            <h2 id="harmonics">Check harmonics first</h2>
            <p>
              Before installing a plain capacitor bank, measure or estimate the harmonic spectrum and calculate the parallel
              resonance between the capacitor and the source inductance. If resonance falls near a significant harmonic, use a
              detuned (reactor-protected) bank or an active solution instead.
            </p>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Correcting to unity, which can overcorrect at light load and raise the voltage.</li>
              <li>Sizing from an assumed power factor instead of a measurement.</li>
              <li>Ignoring harmonics.</li>
              <li>Using the nameplate voltage of the capacitor without checking the actual system voltage and harmonic stress.</li>
            </ul>
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
