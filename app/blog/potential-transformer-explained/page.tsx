import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const title = "Potential Transformers (PT/VT) Explained"
const description =
  "A meter or relay can't safely see 11kV directly. A potential transformer scales bus voltage down to a small, standardized signal — and its one safety rule is the exact opposite of a current transformer's. Here's how PTs actually work."

const heroImageSrc = "/data-center-potential-transformer.jpg"
const heroImageAlt =
  "Wound potential transformer with porcelain bushings and a fused secondary terminal block in a data center medium-voltage metering compartment"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/potential-transformer-explained" },
  openGraph: {
    type: "article",
    url: "/blog/potential-transformer-explained",
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    question: "Why must a PT secondary never be short-circuited?",
    answer:
      "A PT behaves like a voltage source on its secondary — the opposite of a CT, which behaves like a current source. Short that secondary and very high current flows through the winding, which is why PT secondaries are routinely protected with fuses or miniature circuit breakers. This is the mirror-image safety rule to a CT's: never open a live CT secondary, never short a live PT secondary.",
  },
  {
    question: "What's the difference between a wound PT and a CVT?",
    answer:
      "A wound (electromagnetic) PT is a conventional transformer with a primary and secondary winding, used widely at distribution voltages. A capacitor voltage transformer (CVT) uses a capacitive divider instead, which becomes more economical than a wound transformer at transmission-class voltages where a wound PT's turns ratio would be enormous. Functionally, both deliver the same thing: a small, standardized secondary voltage for metering and protection.",
  },
  {
    question: "What is ferroresonance, and why does it matter for PTs?",
    answer:
      "Ferroresonance is a nonlinear resonance that can occur between a wound PT's magnetizing inductance and stray or switching capacitance in the network, producing abnormal, sometimes damaging overvoltages or overcurrents. It's a real, PT-specific phenomenon engineers account for when selecting PT type and connection, particularly in ungrounded or resonant-grounded systems.",
  },
  {
    question: "Why is a PT's secondary voltage almost always 110V or 100V?",
    answer:
      "It's an industry-standard secondary voltage (110V is common in many regions, 100V in others) chosen so that protection relays, meters, and synchronizing equipment can all be designed around one predictable input regardless of the primary voltage — 11kV, 33kV, or higher — the PT is stepping down from. The primary voltage varies by installation; the secondary standard is what lets the same relay model work across many different primary voltage classes.",
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
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/potential-transformer-explained",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const { prev, next } = getAdjacentPosts("potential-transformer-explained")

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: "/blog/potential-transformer-explained" },
])

export default function PotentialTransformerPost() {
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
          description="A bus can sit at 11kV or 33kV. No relay or meter touches that directly. A potential transformer is the sensor that scales it down safely — and it comes with a safety rule that's the exact opposite of a current transformer's."
          faqs={faqs}
          whatsappMessage="Hi, I read the Potential Transformer article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="what-a-pt-does">What a potential transformer actually does</h2>
            <p>
              A PT — also called a voltage transformer, or VT — steps a high primary voltage down to a small,
              standardized secondary voltage, commonly 110V or 100V line-to-line, at a fixed ratio marked on the
              PT nameplate. That secondary voltage is what actually feeds voltmeters, energy meters, protection
              relays, and synchronizing equipment, regardless of whether the real primary is 11kV, 33kV, or
              higher. Like a CT, a PT also provides electrical isolation between the high-voltage primary and the
              low-voltage secondary circuit — a safety requirement, not just a design convenience.
            </p>

            <h2 id="wound-vs-cvt">Wound PTs vs capacitor voltage transformers (CVTs)</h2>
            <p>
              At distribution voltages, most PTs are conventional wound (electromagnetic) transformers — a
              primary winding and a secondary winding around a common core, exactly like a power transformer but
              built for accuracy rather than power transfer. At transmission-class voltages, capacitor voltage
              transformers (CVTs) are often used instead: a capacitive divider steps the voltage down to an
              intermediate level before a small transformer finishes the job, which is more economical to build
              than a wound PT with an enormous turns ratio at that voltage class. Functionally, both deliver the
              same standardized low-voltage secondary signal.
            </p>

            <h2 id="accuracy-classes">Accuracy classes: metering vs protection, again</h2>
            <p>
              PTs follow the same metering-versus-protection split as CTs. Metering PTs are specified for high
              accuracy (commonly class 0.2 or 0.5) at normal system voltage, because that number drives billing.
              Protection PTs are specified with classes suited to reproducing voltage accurately even during
              system disturbances (commonly class 3P or 6P), because relays that watch for undervoltage,
              overvoltage, or directional faults need a trustworthy signal specifically when the system is
              stressed.
            </p>

            <h2 id="never-short">The rule every engineer learns early: never short a live PT secondary</h2>
            <p>
              This is the mirror image of the CT safety rule. A PT behaves like a voltage source on its
              secondary — short that secondary while the primary is energized, and very high current flows
              through the winding, which can damage the transformer or blow protective fuses in an instant. For
              exactly this reason, PT secondaries are almost always protected by dedicated fuses or miniature
              circuit breakers, and disconnecting a PT-fed device from a live circuit never involves shorting the
              secondary the way a CT does.
            </p>
            <p>
              There's a subtler failure mode worth knowing too: ferroresonance, a nonlinear resonance that can
              develop between a wound PT's magnetizing inductance and stray or switching capacitance elsewhere in
              the network, producing abnormal overvoltages. It's a real, PT-specific phenomenon that influences
              PT selection and connection, particularly on ungrounded or resonant-grounded systems.
            </p>

            <h2 id="where-pts-live">Where PTs actually show up in a data center design</h2>
            <p>
              PTs appear anywhere bus voltage needs to be measured or protected: utility incomer metering,
              MV switchgear bus voltage indication, protection relay inputs for under/overvoltage and directional
              schemes, and generator synchronizing circuits, where matching voltage, frequency, and phase before
              closing a breaker depends on an accurate PT signal from both sides. Reading an SLD and knowing
              which PTs feed metering versus which feed protection — and what their ratio and class are — is a
              companion skill to the same exercise with CTs.
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
