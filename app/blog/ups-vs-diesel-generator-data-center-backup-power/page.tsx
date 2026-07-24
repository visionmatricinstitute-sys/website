import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"

const title = "UPS vs Diesel Generator: Which One Handles a Power Outage?"
const description =
  "They're not competing solutions — a UPS and a diesel generator solve two different problems in a data center power outage. Here's what each one actually does, and why you almost always need both."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/ups-vs-diesel-generator-data-center-backup-power" },
  openGraph: {
    type: "article",
    url: "/blog/ups-vs-diesel-generator-data-center-backup-power",
    title,
    description,
    images: [{ url: "/electrical-design-data-center.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/electrical-design-data-center.jpg"] },
}

const faqs = [
  {
    question: "Can a UPS run the whole facility until a generator problem is fixed?",
    answer:
      "Only for a short window — most UPS battery autonomy is sized for minutes, not hours. It exists to bridge the gap until the generator takes over, not to replace it.",
  },
  {
    question: "Why do generators need time to start supplying power?",
    answer:
      "A generator has to detect the outage, crank the engine, reach rated speed and voltage, and stabilize before it's safe to connect to the load — typically 10–15 seconds even on a well-maintained system. That gap is exactly what UPS batteries exist to cover.",
  },
  {
    question: "What does 'N+1' mean for generators or UPS modules?",
    answer:
      "It means one more unit than the minimum needed to carry the load, so a single module can fail or go down for maintenance without an outage. It's a redundancy concept, not a specific product.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: "https://www.visionmatrixinstitute.com/electrical-design-data-center.jpg",
  author: { "@type": "Organization", name: "Vision Matrix Institute" },
  publisher: { "@type": "Organization", name: "Vision Matrix Institute" },
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/ups-vs-diesel-generator-data-center-backup-power",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

export default function UpsVsDgPost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <ArticleShell
          category="Technical Basics"
          title={title}
          description="Ask a room of engineering students which one 'is' the backup power system, and half will say UPS, half will say generator. The honest answer is: neither, alone."
          faqs={faqs}
          whatsappMessage="Hi, I read the UPS vs DG article and want to know more about the Electrical Design course."
        >
          <div>
            <h2 id="the-gap">The gap between "power goes out" and "generator is running"</h2>
            <p>
              When utility power fails, nothing happens instantly. Sensors have to detect the loss, transfer
              switches have to act, and if a generator is involved, the engine has to start, spin up, and
              stabilize before it can safely take the load. That whole sequence takes somewhere between a few
              seconds and around 15 seconds on a well-maintained system — an eternity for equipment that can't
              tolerate even a momentary interruption.
            </p>

            <h2 id="ups-role">What a UPS actually does</h2>
            <p>
              An Uninterruptible Power Supply exists to cover exactly that gap. In a double-conversion topology —
              the standard for critical facilities — the UPS is continuously converting incoming AC to DC and
              back to clean AC, with a battery (or increasingly, a flywheel) sitting on the DC bus. If utility
              power disappears, there's no transfer or switching delay on the output side at all — the battery was
              already supplying the DC bus the whole time. This is why UPS output is described as providing
              near-zero transfer time.
            </p>
            <p>
              The tradeoff: UPS battery autonomy is expensive per additional minute, so it's typically sized for
              just long enough to bridge to generator power — not to run the facility through an extended outage
              on its own.
            </p>

            <h2 id="generator-role">What a diesel generator actually does</h2>
            <p>
              A generator is the opposite trade-off: it takes time to come online, but once running, it can
              supply the full facility load for as long as fuel holds out — hours, or with bulk fuel and
              resupply contracts, potentially days. Data centers typically size generator fuel storage against a
              minimum runtime target (a common reference point is 24–96 hours depending on the facility's tier and
              local fuel resupply reliability), then plan resupply logistics on top of that base.
            </p>

            <h2 id="why-both">Why you almost always need both, not one or the other</h2>
            <p>
              A generator alone leaves you with a hard outage for however long it takes to start and stabilize —
              unacceptable for equipment that needs continuous power. A UPS alone leaves you protected only until
              the batteries drain, with no path to sustained operation through a longer outage. Together, the UPS
              covers the transfer gap and the generator covers everything after that:
            </p>
            <ul>
              <li>0 seconds: utility fails, UPS batteries are already carrying the DC bus.</li>
              <li>~10–15 seconds: generator reaches rated speed/voltage and is ready to accept load.</li>
              <li>Generator now: supplies the facility, UPS batteries recharge and stand by for the next transfer.</li>
            </ul>

            <h2 id="sizing-considerations">A few sizing considerations that matter in practice</h2>
            <p>
              Generator sizing has to account for more than steady-state load — starting a large UPS's rectifier
              or motor loads can draw significantly more current momentarily than their running load, and
              generators are sized (and sometimes paralleled) to handle that step load without the engine
              stalling or voltage collapsing. This is one of several reasons generator and UPS sizing are done
              together as part of the same design exercise, not independently.
            </p>
          </div>
        </ArticleShell>
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-serif">
              Read more:{" "}
              <Link href="/blog" className="text-accent font-semibold hover:underline">
                All articles
              </Link>{" "}
              or explore the{" "}
              <Link href="/programs/electrical-design-data-center" className="text-accent font-semibold hover:underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program, which covers UPS and generator sizing as full modules.
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
