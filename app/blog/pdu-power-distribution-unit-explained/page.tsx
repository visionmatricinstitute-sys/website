import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const title = "PDU (Power Distribution Unit) Explained"
const description =
  "Somewhere between the UPS output and a server's power cord, one piece of equipment does the actual job of splitting bulk power into the dozens of individually protected circuits a data hall needs. Here's what a PDU really does — and the two very different things people mean by that name."

const heroImageSrc = "/data-center-pdu-explained.jpg"
const heroImageAlt =
  "An open industrial electrical distribution cabinet with organized circuit breakers, terminal blocks, and power distribution modules — the same equipment class a data center floor-mounted PDU is built from"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/pdu-power-distribution-unit-explained" },
  openGraph: {
    type: "article",
    url: "/blog/pdu-power-distribution-unit-explained",
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    question: "Is a \"PDU\" the same as a rack power strip?",
    answer:
      "Not exactly, though the term gets used for both. A rack PDU (RPDU) is functionally an intelligent, often metered power strip mounted vertically in a rack. A floor-mounted PDU is a much larger piece of equipment — a full cabinet with an input breaker, sometimes an isolation transformer, and a panelboard of branch breakers — that sits between the UPS output and an entire row or zone of racks, each fed by its own whip. Both are correctly called a PDU; context usually makes clear which one is meant.",
  },
  {
    question: "Why do some PDUs have an isolation transformer and others don't?",
    answer:
      "An isolation transformer steps voltage down to what the IT equipment needs and electrically isolates the downstream distribution from the upstream system, which helps contain harmonics that non-linear IT loads generate. Facilities running IT equipment close to the UPS output voltage, or using UPS units that already condition output well, can skip the transformer and use a transformer-less PDU that's essentially a switchboard.",
  },
  {
    question: "What does dual-corded actually protect against?",
    answer:
      "A server with two power supplies, each cabled to a different PDU fed from a different, independent UPS and distribution path, keeps running if either entire path — PDU, upstream UPS, even the upstream utility feed — fails or goes down for maintenance. It's the rack-level expression of the same N+1/2N logic covered in the redundancy notation article; a dual-corded server plugged into two PDUs that both trace back to the same single UPS gets none of that protection despite looking redundant.",
  },
  {
    question: "Where does PDU sizing actually get decided?",
    answer:
      "At the load calculation stage, not as an afterthought. Branch breaker sizes, the number of circuits per PDU, and how many racks each PDU zone serves all come from the real IT load list plus growth margin — oversizing wastes capacity and cost, undersizing means a PDU can't support the racks it's meant to serve without nuisance tripping. It's exactly the kind of number a design engineer is expected to defend in a design review.",
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
  datePublished: "2026-08-26",
  dateModified: "2026-08-26",
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/pdu-power-distribution-unit-explained",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const { prev, next } = getAdjacentPosts("pdu-power-distribution-unit-explained")

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: "/blog/pdu-power-distribution-unit-explained" },
])

export default function PduPost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ArticleShell
          category="Technical Basics"
          title={title}
          description="PDU gets used loosely for two genuinely different pieces of equipment. Here's what each one actually does, and why the difference matters the moment redundancy enters the picture."
          faqs={faqs}
          whatsappMessage="Hi, I read the PDU (Power Distribution Unit) article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="two-things-one-name">Two things share one name</h2>
            <p>
              "PDU" gets used for two genuinely different pieces of equipment. The floor-mounted power distribution
              unit is a large cabinet — an input breaker, often an isolation transformer, and a panelboard with many
              output breakers — that sits between UPS output and an entire row or zone of racks. The rack PDU (often
              called an RPDU) is what most people picture day to day: an intelligent, vertically-mounted power strip
              inside a single rack. Both names are correct; which one is meant is almost always clear from context.
            </p>

            <h2 id="why-it-exists">Why power isn't wired straight from the UPS to the racks</h2>
            <p>
              A floor-mounted PDU exists as its own piece of equipment rather than just cabling UPS output directly
              to racks for three reasons: circuit-level protection, so a single branch fault trips one breaker
              instead of threatening the whole UPS output; metering, so power draw is visible per circuit for
              capacity planning, billing, and troubleshooting; and serviceability, so a branch breaker can be worked
              on without de-energizing anything upstream of it.
            </p>

            <h2 id="isolation-transformer">The isolation transformer question</h2>
            <p>
              Many floor-mounted PDUs include a K-rated isolation transformer that steps voltage down to what IT
              equipment expects and electrically isolates the distribution downstream from the system upstream —
              which also helps contain the harmonic currents that non-linear IT power supplies generate back onto
              the source. Where the UPS output voltage already matches IT equipment needs, or the UPS itself already
              conditions output well, a transformer-less PDU (really just a distribution switchboard) is a
              legitimate, simpler alternative.
            </p>

            <h2 id="dual-corded">Dual-corded: where PDU choice meets redundancy</h2>
            <p>
              A dual-corded server has two power supplies, each cabled to a physically different PDU, each traced
              back to a genuinely independent UPS and distribution path. That's what actually delivers the N+1 or 2N
              protection described in the redundancy notation article, applied down to the rack. A dual-corded
              server plugged into two PDUs that both ultimately share one upstream UPS looks redundant at the rack
              but isn't — the single point of failure just moved one level up.
            </p>

            <h2 id="rack-pdu">The rack PDU itself</h2>
            <p>
              A modern rack PDU ranges from basic (outlets only, no visibility) to metered (shows total load) to
              switched (individual outlets can be remotely powered on or off) to fully monitored (per-outlet current
              and, on some units, environmental sensors). Which tier a design specifies is a real cost-versus-
              operations trade-off: switched and monitored PDUs cost more per unit but let operations teams remotely
              power-cycle a hung server or catch an overloaded circuit before it trips, without a technician walking
              the data hall floor.
            </p>

            <h2 id="where-its-decided">Where PDU sizing and placement actually get decided</h2>
            <p>
              Branch breaker sizes and circuit counts come from the real IT load list plus growth margin during load
              calculations — not a rule of thumb applied after the fact. Physical placement of floor-mounted PDUs
              within the data hall is a layout decision, driven by cable length limits back to the racks they serve,
              aisle clearance, and maintenance access around the unit. Both are real, defensible engineering
              decisions a design engineer has to justify, not settings left at their defaults.
            </p>
          </div>
        </ArticleShell>
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-body">
              Read more:{" "}
              <Link href="/blog" className="text-accent font-semibold hover:underline">
                All articles
              </Link>{" "}
              or explore the{" "}
              <Link href="/programs/electrical-design-data-center" className="text-accent font-semibold hover:underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program, which covers load calculations and cable sizing in Module 6, and data hall electrical
              layout — where PDUs are positioned and sized — in Module 8.
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
