import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "voltage-drop-calculation-formula-examples"
const title = "Voltage Drop Calculation: Formula and Worked Examples"
const description =
  "The voltage drop formula for single-phase and three-phase LV cables, a worked example with every assumption stated, how to fix a cable that fails the limit, and a free calculator."

const heroImageSrc = "/data-center-cable-sizing.jpg"
const heroImageAlt = "Cable trays carrying power cables in a data center"

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
    question: "What is the voltage drop formula for a three-phase cable?",
    answer:
      "ΔV = √3 × I × L × (R·cos φ + X·sin φ), where I is the load current in amperes, L is the one-way cable length in km, R and X are the cable's resistance and reactance in ohms per km, and φ is the load power-factor angle. Divide by the line voltage and multiply by 100 for the percentage.",
  },
  {
    question: "What is the acceptable voltage drop?",
    answer:
      "It depends on the applicable code, the project specification and the load. Many specifications set a total limit from the source to the furthest load and split it between feeders and final circuits, but the number must come from your project's governing documents, not from a rule of thumb.",
  },
  {
    question: "How do I reduce voltage drop?",
    answer:
      "Increase the conductor size, run cables in parallel, shorten the route, use a higher system voltage, or improve the power factor. Increasing size is the usual first step; the others change the design more.",
  },
  {
    question: "Is voltage drop the only thing that decides cable size?",
    answer:
      "No. Cable size is also limited by current-carrying capacity under installation conditions and by short-circuit withstand. Voltage drop often decides the size on long runs, while ampacity decides it on short, heavily loaded ones.",
  },
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

export default function VoltageDropPost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ArticleShell
          category="Electrical Design"
          title={title}
          description="Current flowing through a cable's resistance and reactance drops some voltage before it reaches the load. Here is the formula, a full worked example, and what to do when a cable fails the check."
          faqs={faqs}
          whatsappMessage="Hi, I read the voltage drop article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="formula">The formula</h2>
            <p>For an LV cable of length L (km, one way) carrying current I (A):</p>
            <ul>
              <li>
                <strong>Three phase:</strong> ΔV = √3 × I × L × (R·cos φ + X·sin φ)
              </li>
              <li>
                <strong>Single phase:</strong> ΔV = 2 × I × L × (R·cos φ + X·sin φ)
              </li>
              <li>
                <strong>Percentage:</strong> ΔV% = ΔV ÷ V × 100, using the line voltage for three phase
              </li>
            </ul>
            <p>
              R and X are the cable's resistance and reactance in Ω/km. cos φ is the load power factor and sin φ =
              √(1 − cos²φ). The X term is why a low power factor makes drop worse on large cables: at big conductor
              sizes the reactance, not the resistance, starts to dominate.
            </p>

            <h2 id="resistance">Where R comes from</h2>
            <p>
              Conductor resistance is resistivity divided by cross-section: R = ρ ÷ A. The calculator on this site
              uses an operating-temperature resistivity of 22.5 Ω·mm²/km for copper and 36 Ω·mm²/km for aluminium.
              Operating temperature matters because resistance rises with heat; a cable at full load is hotter than the
              20 °C value in a catalogue. For a final design, use the manufacturer's published R and X for the actual
              cable and installation.
            </p>

            <h2 id="example">Worked example</h2>
            <p>
              <strong>Assumptions</strong> (illustrative, not a project): 415 V three-phase feeder, 150 A load, 80 m
              one-way, 70 mm² copper, cos φ = 0.85, reactance 0.08 Ω/km (an indicative figure for LV multicore cable),
              one cable.
            </p>
            <ol>
              <li>R = 22.5 ÷ 70 = 0.3214 Ω/km</li>
              <li>sin φ = √(1 − 0.85²) = 0.5268</li>
              <li>R·cos φ + X·sin φ = 0.3214 × 0.85 + 0.08 × 0.5268 = 0.2732 + 0.0421 = 0.3154 Ω/km</li>
              <li>L = 0.08 km</li>
              <li>ΔV = 1.732 × 150 × 0.08 × 0.3154 = <strong>6.55 V</strong></li>
              <li>ΔV% = 6.55 ÷ 415 × 100 = <strong>1.58%</strong></li>
            </ol>
            <p>
              Whether 1.58% is acceptable depends on the limit set for the feeder in your specification and on what
              the upstream cables already use up. You can check it against any limit in the{" "}
              <Link href="/engineers-toolkit/voltage-drop-calculator">voltage drop calculator</Link>.
            </p>

            <h2 id="fix">If the cable fails the limit</h2>
            <ul>
              <li>Step up the conductor size (the usual first fix).</li>
              <li>Run two cables in parallel, which halves the current per cable.</li>
              <li>Shorten the route or move the source closer to the load.</li>
              <li>Raise the system voltage if the equipment allows.</li>
              <li>Improve the power factor, which lowers the current for the same real power.</li>
            </ul>

            <h2 id="not-alone">Voltage drop is one of three checks</h2>
            <p>
              A cable that passes voltage drop can still be too small for its current once derating for ambient
              temperature, grouping and installation method is applied, or too small to survive a fault until the
              breaker clears. Always check all three, as covered in{" "}
              <Link href="/blog/cable-sizing-basics-for-data-center-electrical-design">cable sizing basics</Link>; the{" "}
              <Link href="/engineers-toolkit/conductor-sizing-calculator">conductor sizing calculator</Link> runs
              ampacity, voltage drop and short-circuit withstand together. This article is part of the{" "}
              <Link href="/data-center-design">data center design guide</Link>.
            </p>
          </div>
        </ArticleShell>
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-body">
              Practice this on a full project in the{" "}
              <Link href="/programs/electrical-design-data-center" className="text-foreground font-semibold underline underline-offset-4 hover:no-underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program.
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
