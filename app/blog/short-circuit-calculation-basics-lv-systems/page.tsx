import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "short-circuit-calculation-basics-lv-systems"
const title = "Short Circuit Calculation Basics for LV Systems"
const description = "How to estimate the prospective short-circuit current at an LV switchboard from transformer rating and impedance, with a worked example, why motors and cables change the answer, and what the result is used for."

const heroImageSrc = "/data-center-ct-pt-relay.jpg"
const heroImageAlt = "Protection and metering equipment in a data center switchroom"

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
    "question": "How do you calculate short-circuit current at a transformer secondary?",
    "answer": "For a quick estimate with an infinite upstream source, I_sc = I_full-load ÷ Z, where I_full-load = kVA ÷ (√3 × V) and Z is the transformer impedance as a per-unit value (percent impedance ÷ 100)."
  },
  {
    "question": "Why is the result only an estimate?",
    "answer": "It ignores the upstream network impedance, cable impedance, motor contribution and the standard's voltage factors. A real study follows IEC 60909 or the project's chosen method and uses the actual data."
  },
  {
    "question": "What is the short-circuit level used for?",
    "answer": "To check that breakers, busbars and cables can break and withstand the prospective fault current, and as an input to protection coordination and arc-flash analysis."
  },
  {
    "question": "Do motors add to the fault current?",
    "answer": "Yes. Running motors act as generators briefly during a fault and add to the initial fault current, which matters at LV boards with large motor loads such as chillers."
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
          description={"The short-circuit level at a switchboard decides breaker ratings, busbar bracing and cable withstand. Here is the quick estimate from a transformer, a worked example, and the effects that a real study adds on top."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the short circuit basics article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="quick">The quick estimate</h2>
            <p>
              I<sub>fl</sub> = kVA ÷ (√3 × V), and I<sub>sc</sub> ≈ I<sub>fl</sub> ÷ Z, with Z the transformer impedance in per-unit.
              This assumes an infinitely strong upstream source, so it is an upper bound for the transformer's own contribution.
            </p>

            <h2 id="example">Worked example</h2>
            <p>Assumptions (illustrative): 1,600 kVA transformer, 415 V secondary, 6% impedance (check the actual nameplate).</p>
            <ol>
              <li>I<sub>fl</sub> = 1,600 ÷ (1.732 × 0.415) = 2,226 A</li>
              <li>I<sub>sc</sub> ≈ 2,226 ÷ 0.06 = <strong>37.1 kA</strong></li>
            </ol>
            <p>
              So the board must be rated for at least this fault level, with the next standard breaking capacity chosen above
              it. The <Link href="/engineers-toolkit/short-circuit-calculator">short-circuit calculator</Link> runs this
              estimate for your values.
            </p>

            <h2 id="more">What a real study adds</h2>
            <ul>
              <li><strong>Upstream impedance:</strong> a finite source lowers the result.</li>
              <li><strong>Cable impedance:</strong> reduces the fault level downstream of the board.</li>
              <li><strong>Motor contribution:</strong> raises it for the first cycles.</li>
              <li><strong>Standard factors:</strong> IEC 60909 applies voltage factors and separate maximum and minimum cases.</li>
            </ul>
            <p>
              Maximum fault current sizes the equipment ratings; minimum fault current checks that protection operates quickly
              enough at the far end of a circuit.
            </p>

            <h2 id="use">Where the number goes</h2>
            <ul>
              <li>Breaker breaking capacity and busbar short-circuit withstand</li>
              <li>Cable thermal withstand during the fault clearing time</li>
              <li>Protection coordination and arc-flash studies</li>
            </ul>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Using the infinite-source estimate as the final answer.</li>
              <li>Using one impedance value for every transformer without reading the nameplate.</li>
              <li>Forgetting motor contribution.</li>
              <li>Checking only the maximum case.</li>
            </ul>
            <p>
              Related: <Link href="/blog/protection-relay-explained">protection relays</Link> and{" "}
              <Link href="/blog/cable-sizing-basics-for-data-center-electrical-design">cable sizing basics</Link>.
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
