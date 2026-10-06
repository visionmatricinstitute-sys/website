import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "overcurrent-relay-settings-idmt-worked-example"
const title = "Overcurrent Relay Settings: IDMT Curve Worked Example"
const description = "How to set an overcurrent relay: pickup current, time multiplier and the IEC standard inverse curve, with a worked example of operating time at a fault and how grading margins work."

const heroImageSrc = "/data-center-protection-relay.jpg"
const heroImageAlt = "Overcurrent relay settings on a protection relay display"

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
    "question": "What are the main overcurrent relay settings?",
    "answer": "The pickup (plug setting) current, the time multiplier setting (TMS) that scales the curve, the curve type, and often an instantaneous element for high fault currents."
  },
  {
    "question": "What is the IEC standard inverse curve?",
    "answer": "An inverse definite minimum time curve where operating time t = TMS × 0.14 ÷ ((I ÷ Is)^0.02 − 1), with I the fault current and Is the pickup current."
  },
  {
    "question": "How is pickup chosen?",
    "answer": "Above the maximum load (and allowable overload) with margin so the relay does not operate on normal load, but low enough to see the minimum fault current on the circuit."
  },
  {
    "question": "How are upstream and downstream relays graded?",
    "answer": "The upstream relay is set to operate slower than the downstream relay by a grading margin that covers breaker opening time and relay tolerances, so only the nearest relay trips."
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
          description={"An overcurrent relay has two main settings: the current at which it starts, and how fast it trips above that. The inverse-time curve links them. Here is the calculation with an example."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Overcurrent Relay Settings: IDMT Curve Worked Example' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="formula">The curve</h2>
            <p>For the IEC standard inverse curve: t = TMS × 0.14 ÷ ((I ÷ Is)<sup>0.02</sup> − 1).</p>
            <ul>
              <li>t: operating time in seconds</li>
              <li>I: fault current in primary amperes</li>
              <li>Is: pickup current in the same units</li>
              <li>TMS: time multiplier setting</li>
            </ul>

            <h2 id="example">Worked example</h2>
            <p>
              Illustrative example, not a project. A feeder carries 300 A maximum. Set pickup at 1.2 × 300 = 360 A. Use TMS = 0.1. A fault of
              4,000 A occurs.
            </p>
            <ol>
              <li>Plug setting multiple = 4,000 ÷ 360 = 11.1</li>
              <li>11.1<sup>0.02</sup> = 1.0493, so the denominator is 0.0493</li>
              <li>Curve time at TMS 1 = 0.14 ÷ 0.0493 = 2.84 s</li>
              <li>Operating time = 0.1 × 2.84 = <strong>0.28 s</strong></li>
            </ol>
            <p>
              At 6,000 A the same relay operates in about 0.24 s; at 2,000 A, about 0.40 s. The relay is faster for bigger faults,
              which is what inverse-time means.
            </p>

            <h2 id="grading">Grading with the upstream relay</h2>
            <p>
              The incomer's relay must be slower than the feeder's at every fault level on the feeder, by a grading margin that
              allows for breaker opening time, relay tolerances and overshoot. If the feeder relay clears the fault in 0.28 s and
              you adopt an assumed margin of 0.3 s, the upstream relay should not operate before about 0.58 s at that fault current.
              Plot both curves to check, and take the actual margin from the relay manufacturer and the project specification. See{" "}
              <Link href="/blog/protection-coordination-basics-data-center">protection coordination</Link>.
            </p>

            <h2 id="more">Other settings and checks</h2>
            <ul>
              <li><strong>Instantaneous element:</strong> trips at once above a high fault current, often set above the largest through-fault current so downstream relays still grade.</li>
              <li><strong>Transformer inrush and motor starting:</strong> pickup and delay must ride through these.</li>
              <li><strong>Thermal withstand:</strong> the clearing time must be short enough to protect cables. See <Link href="/blog/earth-conductor-sizing-adiabatic-equation-example">the adiabatic equation</Link>.</li>
              <li><strong>Arc flash:</strong> longer clearing times raise incident energy. See <Link href="/blog/arc-flash-basics-data-center-engineers">arc flash basics</Link>.</li>
            </ul>
            <p>Select the CT first: <Link href="/blog/current-transformer-ratio-burden-selection-example">CT ratio and burden</Link>. Software for the curves: <Link href="/blog/etap-for-data-center-design-where-it-fits">ETAP</Link>.</p>
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
