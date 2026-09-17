import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const title = "Current Transformers (CT) Explained"
const description =
  "A protection relay can't sense 2000A of fault current directly, and it shouldn't. A current transformer scales that down to a safe, standardized signal — and one wiring mistake with it can be genuinely dangerous. Here's how CTs actually work."

const heroImageSrc = "/data-center-ct-pt-relay.jpg"
const heroImageAlt =
  "Current transformers clamped around color-coded copper busbar feeders in a data center switchgear panel"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/current-transformer-explained" },
  openGraph: {
    type: "article",
    url: "/blog/current-transformer-explained",
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    question: "What happens if a CT secondary is left open-circuited while the circuit is energized?",
    answer:
      "It's genuinely dangerous. A CT is designed to always have a low-impedance load — a relay, a meter, or a shorting link — on its secondary. Open-circuit that secondary while primary current is flowing, and the core loses the counter-mmf that normally keeps it in its linear region, drives into heavy saturation, and induces very high, potentially lethal voltage spikes across the open terminals. If a meter or relay ever needs to be disconnected from a live CT, the secondary is shorted first, never left open.",
  },
  {
    question: "What's the difference between a metering CT and a protection CT?",
    answer:
      "Metering CTs are built for high accuracy (commonly class 0.2 or 0.5) at normal load current, because that accuracy directly drives billing. Protection CTs are built to stay reasonably linear and resist saturation even at many times rated current (commonly class 5P or 10P), because a relay needs an honest signal specifically during the fault condition it's supposed to detect. It's common for a single primary conductor to have separate CT cores dedicated to each duty.",
  },
  {
    question: "What does 'burden' mean for a CT?",
    answer:
      "Burden is the total impedance the CT secondary has to drive — the connected wiring plus every relay and meter on that circuit. Exceed the CT's rated burden and its accuracy degrades, which matters most for protection CTs during a fault, when the secondary current is highest and accuracy is most needed.",
  },
  {
    question: "Why do CTs come with a fixed ratio like 2000/5 instead of a variable one?",
    answer:
      "The ratio is set by the physical design of the CT (primarily the number of secondary turns) and is fixed at manufacture, which is exactly what makes it a reliable, repeatable sensor — a relay or meter is calibrated against a known, unchanging ratio. Different ratios exist as different CT models sized to the expected primary current, not as an adjustable setting on one unit.",
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
  datePublished: "2026-09-17",
  dateModified: "2026-09-17",
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/current-transformer-explained",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const { prev, next } = getAdjacentPosts("current-transformer-explained")

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: "/blog/current-transformer-explained" },
])

export default function CurrentTransformerPost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ArticleShell
          category="Electrical Equipment"
          title={title}
          description="A feeder can carry 2000A. No relay or meter is built to touch that directly. A current transformer is the sensor that makes protection and metering possible in the first place — and it has one safety rule every engineer learns early."
          faqs={faqs}
          whatsappMessage="Hi, I read the Current Transformer article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="what-a-ct-does">What a current transformer actually does</h2>
            <p>
              A CT clamps around (or is built into) a primary conductor and steps a large current — say, 2000A
              flowing through a feeder — down to a small, standardized secondary current, commonly 5A or 1A, at a
              fixed ratio marked on the CT nameplate (for example, "2000/5"). That secondary current is what
              actually feeds ammeters, energy meters, and protection relays, regardless of how large the real
              primary current is. Without that scaling, no standard relay or meter could survive being connected
              to the primary circuit at all.
            </p>
            <p>
              Just as important as the current scaling is the electrical isolation a CT provides: the secondary
              circuit is galvanically separated from the primary, which is a safety requirement for anyone working
              on the low-voltage protection and metering wiring, not just a side benefit of the transformer
              action.
            </p>

            <h2 id="metering-vs-protection">Metering CTs vs protection CTs</h2>
            <p>
              Not every CT is specified the same way, because metering and protection duty want different
              things from the same basic device. Metering CTs are built for high accuracy — commonly class 0.2 or
              0.5 — specifically at normal load current, because that number feeds directly into billing.
              Protection CTs are built to stay linear and resist saturation even at many times rated current
              (commonly class 5P or 10P), because a relay needs an honest signal precisely during the
              overcurrent condition it exists to catch. It's routine for a single primary conductor to have
              separate CT cores — one for metering, one for protection — for exactly this reason.
            </p>

            <h2 id="burden">Burden: the load a CT has to drive</h2>
            <p>
              A CT's "burden" is the total impedance its secondary has to drive: the wiring resistance plus every
              relay and meter connected to that circuit. Every CT has a rated burden it's designed to supply
              accurately. Exceed it — too much wire length, too many devices, undersized cable — and accuracy
              degrades, which is worst for protection CTs during a real fault, exactly when accuracy matters
              most.
            </p>

            <h2 id="open-secondary-danger">The rule every engineer learns early: never open a live CT secondary</h2>
            <p>
              A CT secondary is designed to always see a low-impedance load. If that secondary is opened while
              primary current is still flowing — disconnecting a meter without shorting the CT first, for
              instance — the core loses the counter-mmf that keeps it operating in its normal, linear region and
              drives into heavy saturation. The result is a very high, potentially lethal voltage spike across the
              open terminals. The standard practice, whenever a CT-connected device needs to be removed from a
              live circuit, is to short the CT secondary first using a dedicated shorting link or terminal block —
              never leave it open.
            </p>

            <h2 id="where-cts-live">Where CTs actually show up in a data center design</h2>
            <p>
              CTs appear at every level of the electrical distribution where something needs to be measured or
              protected: utility incomer metering, MV and LV feeder protection, transformer differential schemes
              (which need matched CT sets on both sides of the transformer), generator protection, and even
              busway and PDU-level monitoring in some designs. Reading a single-line diagram and correctly
              identifying which CTs feed metering versus which feed protection — and what ratio and class each
              one carries — is one of the first practical skills a new data center electrical designer builds.
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
              program, which covers protection and metering as a full module.
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
