import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"

const title = "MV/LV Power Distribution Architecture, Explained"
const description =
  "Why data center power comes in at medium voltage and gets stepped down in stages, and how radial, ring, and 2N distribution architectures trade off cost against resilience."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/mv-lv-power-distribution-architecture-explained" },
  openGraph: {
    type: "article",
    url: "/blog/mv-lv-power-distribution-architecture-explained",
    title,
    description,
    images: [{ url: "/electrical-design-data-center.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/electrical-design-data-center.jpg"] },
}

const faqs = [
  {
    question: "What counts as MV and what counts as LV?",
    answer:
      "Exact thresholds vary by standard and region, but MV generally refers to distribution in the low-kV to tens-of-kV range, while LV refers to the utilization voltages equipment actually runs on (commonly around 400/230V three-phase in most of the world). A data center steps MV down to LV in one or more transformer stages before it reaches IT equipment.",
  },
  {
    question: "Why not just bring LV power in directly and skip MV altogether?",
    answer:
      "At the current a large facility draws, LV distribution over any real distance means very high current and very thick, lossy conductors. Stepping up to MV for bulk transport and down to LV near the point of use is dramatically more efficient — the same reason utility grids use even higher transmission voltages over long distances.",
  },
  {
    question: "Is 2N always the right choice?",
    answer:
      "No — it's the most resilient and most expensive option. Many facilities deliberately choose N+1 or a block-redundant design because 2N's cost and space overhead isn't justified for their actual availability requirement. The right architecture depends on the facility's tier target, not a single 'best' answer.",
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
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/mv-lv-power-distribution-architecture-explained",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

export default function MvLvDistributionPost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <ArticleShell
          category="Technical Basics"
          title={title}
          description="Every data center steps utility power down in stages before it reaches a server. How those stages are arranged is one of the biggest cost-vs-resilience decisions in the whole design."
          faqs={faqs}
          whatsappMessage="Hi, I read the MV/LV distribution article and want to know more about the Electrical Design course."
        >
          <div>
            <h2 id="why-stages">Why power arrives at medium voltage, not low voltage</h2>
            <p>
              A large facility can draw several megawatts. Delivering that much power at low voltage would mean
              enormous current — and current, not voltage, is what determines conductor size and resistive
              losses. By bringing power in at medium voltage (MV) and stepping it down to low voltage (LV) close
              to where it's actually used, the utility-to-facility link carries far less current for the same
              power, which means smaller conductors, lower losses, and a more practical physical design.
            </p>

            <h2 id="the-chain">The typical chain: utility → MV switchgear → transformer → LV switchgear → load</h2>
            <p>
              A simplified path looks like this: utility MV supply arrives at the facility's MV switchgear, which
              distributes it to one or more transformers. Each transformer steps MV down to LV, feeding LV
              switchgear that distributes to PDUs, and eventually to the IT load. Every stage in that chain —
              MV switchgear, transformer, LV switchgear — is a place where a single failure could take down
              everything downstream of it, which is exactly why distribution architecture is a resilience
              decision, not just a wiring diagram.
            </p>

            <h2 id="radial">Radial distribution: simplest, least resilient</h2>
            <p>
              In a radial architecture, each load has exactly one path back to the source. It's the cheapest and
              simplest to design, build, and understand — but any single failure anywhere upstream takes down
              everything downstream of it. This is usually only acceptable for non-critical loads or facilities
              with a low availability requirement.
            </p>

            <h2 id="ring-block">Ring/loop and block redundancy: shared backup paths</h2>
            <p>
              A ring (or loop) architecture connects switchgear in a loop rather than a dead-end branch, so a
              fault can be isolated and power rerouted around it. Block-redundant designs go a step further,
              grouping capacity into blocks where one block can absorb the load of another if it fails —
              improving resilience over pure radial without the full cost of duplicating every single path.
            </p>

            <h2 id="distributed-2n">Distributed redundancy and 2N: two complete, independent paths</h2>
            <p>
              At the most resilient (and most expensive) end, a 2N architecture gives every critical load two
              entirely independent power paths — separate transformers, separate switchgear, separate everything
              — so that even a full path failure, including planned maintenance, never interrupts the load. N+1
              sits between block redundancy and full 2N: one extra unit of capacity beyond what's needed, shared
              across the system rather than fully duplicated per load.
            </p>

            <h2 id="choosing">Choosing an architecture is a tradeoff, not a technical fact</h2>
            <p>
              None of these architectures is objectively "correct." The right choice depends on the facility's
              required availability (often expressed against Uptime Institute or similar tier frameworks),
              budget, footprint, and how the owner weighs upfront cost against downtime risk. Reading a single-line
              diagram and correctly identifying which of these patterns it represents — and why — is one of the
              first real skills a data center electrical designer develops.
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
              program, which covers distribution architecture as a full module.
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
