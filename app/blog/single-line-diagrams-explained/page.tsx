import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"

const title = "Single-Line Diagrams Explained (SLD)"
const description =
  "A single-line diagram is the one drawing every electrical engineer, contractor, and inspector on a data center project actually works from — and it deliberately leaves almost everything out. Here's what it keeps, what the symbols mean, and how to actually read one."

const heroImageSrc = "/data-center-single-line-diagram.jpg"
const heroImageAlt =
  "A labeled electrical control panel with circuit breakers, terminal blocks, and surge protection devices — the kind of real equipment a single-line diagram represents in simplified symbolic form"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/single-line-diagrams-explained" },
  openGraph: {
    type: "article",
    url: "/blog/single-line-diagrams-explained",
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    question: "Why is it called a \"single-line\" diagram if the real system has three phases?",
    answer:
      "Because the drawing deliberately shows one line representing all three phases (plus neutral and earth, where relevant) instead of drawing every conductor separately — the point is showing how equipment connects and how power flows, not literal wire-for-wire routing. Three-line diagrams exist for cases where phase-by-phase detail actually matters, like protection studies, but for planning, review, and construction coordination, one line per circuit keeps a drawing with hundreds of components actually readable.",
  },
  {
    question: "What's the difference between a single-line diagram and an electrical layout drawing?",
    answer:
      "A single-line diagram is symbolic and topological — it shows what connects to what and in what order (utility, transformer, switchgear, UPS, PDU, rack), with no relationship to physical location. An electrical layout drawing is the opposite: it shows real physical positions of equipment on a floor plan, room by room. Both are essential and neither replaces the other.",
  },
  {
    question: "Do single-line diagrams show redundancy?",
    answer:
      "Yes — this is one of their most important jobs. An N+1 UPS system, a 2N distribution path, or a dual-corded rack all look structurally different on an SLD specifically because the diagram shows how many independent paths exist and where they do or don't share equipment. A reviewer checking whether a design actually achieves its claimed Tier level starts by reading the SLD, not the floor plan.",
  },
  {
    question: "Who actually reads a single-line diagram in a real project?",
    answer:
      "Almost everyone touching the electrical scope: the design engineer who created it, the client's third-party reviewer checking it against the target Tier and code, the contractor's electricians planning cable pulls and terminations, the commissioning team validating as-built conditions against it, and the facility's operations team years later when troubleshooting a fault. It stays the single source of truth for how the power system actually works for the life of the building.",
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
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/single-line-diagrams-explained",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: "/blog/single-line-diagrams-explained" },
])

export default function SingleLineDiagramsPost() {
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
          description="Every other electrical drawing on a data center project is derived from, or checked against, this one. Here's what it actually shows, and why it looks nothing like the real wiring."
          faqs={faqs}
          whatsappMessage="Hi, I read the Single-Line Diagrams article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
        >
          <div>
            <h2 id="what-it-is">What a single-line diagram actually is</h2>
            <p>
              A single-line diagram (SLD) represents an entire three-phase power system using one line per circuit
              instead of drawing every conductor separately. It is symbolic, not physical — it says nothing about
              where equipment sits in a room, only how it electrically connects to everything else, in what order,
              and through what protective devices. That trade-off is deliberate: a real data center's power system
              has hundreds of individual conductors, and a drawing that tried to show every one of them would be
              unreadable for the exact people who need to read it fastest during a design review or a fault.
            </p>

            <h2 id="symbols">The symbol vocabulary</h2>
            <p>
              SLDs use a standardized set of symbols (drawn from conventions like IEEE 315 and IEC 60617) so that any
              qualified engineer, anywhere, can read a drawing they didn't create: a circle with a specific fill
              pattern for a generator, a transformer shown as two linked circles, breakers and switches represented
              by distinct symbols depending on whether they're manually or automatically operated, and rectangles or
              labeled blocks for major equipment like UPS systems and PDUs. Learning to read an SLD is largely
              learning this symbol set, plus the convention of drawing power flow top to bottom.
            </p>

            <h2 id="topology-not-geometry">Reading the topology, not the geometry</h2>
            <p>
              A typical data center SLD reads, top to bottom, roughly as: utility incoming supply, main switchgear,
              step-down transformer, UPS system, PDU or distribution panel, then branch circuits feeding racks. What
              matters when reading one isn't distance on the page — it's which devices sit in series between the
              source and a given load, because that series chain is exactly what determines what happens to that
              load when any single device upstream fails.
            </p>

            <h2 id="redundancy-on-paper">Where redundancy actually shows up</h2>
            <p>
              This is why single-line diagrams and redundancy notation are taught together, not separately. An N+1
              UPS system is drawn as multiple UPS blocks feeding a shared output bus. A 2N architecture is drawn as
              two entirely separate vertical chains from utility to rack, with no shared equipment between them. A
              dual-corded rack is drawn with two separate lines arriving at the same load. None of this is
              decorative — a reviewer checking whether a design actually delivers its claimed Tier level is reading
              exactly this structure, not taking the claim on its word.
            </p>

            <h2 id="living-document">A living document, not a one-time deliverable</h2>
            <p>
              An SLD gets revised at every stage of a real project: a concept-stage version for early budgeting, a
              detailed-design version once equipment is selected, an issued-for-construction version contractors
              build from, and a final as-built version that reflects what was actually installed — which is what
              commissioning and future maintenance get checked against. Treating it as a single drawing finished once
              at the start of a project is one of the more common mistakes in inexperienced electrical design work.
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
              program, which covers SLD symbols, redundancy topologies, and UPS topologies as part of Module 7.
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
