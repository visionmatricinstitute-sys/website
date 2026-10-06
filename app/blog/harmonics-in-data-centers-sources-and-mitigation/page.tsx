import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "harmonics-in-data-centers-sources-and-mitigation"
const title = "Harmonics in Data Centers: Sources and Mitigation"
const description = "Where harmonics come from in a data center, what they do to transformers, neutrals and capacitors, and the common ways to limit them."

const heroImageSrc = "/data-center-ct-pt-relay.jpg"
const heroImageAlt = "Power quality monitoring equipment in a data center"

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
    "question": "What causes harmonics in a data center?",
    "answer": "Non-linear loads: UPS rectifiers, server power supplies and variable-speed drives draw non-sinusoidal current, which creates harmonic currents at multiples of the supply frequency."
  },
  {
    "question": "What problems do harmonics cause?",
    "answer": "Extra heating in transformers, cables and generators, overloaded neutral conductors, nuisance trips, interference, and a resonance risk with capacitors."
  },
  {
    "question": "How are harmonics limited?",
    "answer": "By selecting low-distortion UPS and drive front ends, using filters, sizing equipment for the harmonic load and checking the point of common coupling against the applicable limits, such as IEEE 519."
  },
  {
    "question": "Do harmonics affect generators more than the utility?",
    "answer": "Often yes, because a generator has a higher source impedance than the utility, so the same current gives more voltage distortion."
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
          description={"Almost everything in a data center draws current in pulses, not smooth sine waves. Those harmonic currents heat equipment and disturb the supply, and they are controllable."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Harmonics in Data Centers: Sources and Mitigation' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="sources">Sources</h2>
            <ul>
              <li><strong>UPS input rectifiers:</strong> six-pulse designs produce more harmonics than twelve-pulse or active-front-end designs.</li>
              <li><strong>Server power supplies:</strong> switch-mode supplies draw pulsed current, often with triplen harmonics that add in the neutral.</li>
              <li><strong>Variable-speed drives</strong> on cooling fans and pumps.</li>
            </ul>

            <h2 id="effects">Effects</h2>
            <table>
              <thead><tr><th>Equipment</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td>Transformers</td><td>Additional losses and heating; may need derating or a harmonic-rated unit</td></tr>
                <tr><td>Neutral conductors</td><td>Triplen harmonics add and can overload the neutral</td></tr>
                <tr><td>Generators</td><td>Voltage distortion and heating, since the source impedance is higher</td></tr>
                <tr><td>Capacitor banks</td><td>Resonance risk, which can damage the capacitors</td></tr>
              </tbody>
            </table>

            <h2 id="mitigation">Mitigation</h2>
            <ol>
              <li>Specify equipment with low harmonic distortion and state the limits in the specification.</li>
              <li>Use passive or active filters where needed.</li>
              <li>Size neutrals and transformers for the harmonic content.</li>
              <li>Study the system, including generator operation and any capacitors, before finalising.</li>
            </ol>
            <p>Related: <Link href="/blog/power-factor-correction-capacitor-bank-sizing">power factor correction</Link> and <Link href="/blog/ups-topologies-explained">UPS topologies</Link>.</p>
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
