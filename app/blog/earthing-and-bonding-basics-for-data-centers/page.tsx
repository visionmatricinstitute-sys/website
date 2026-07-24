import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"

const title = "Earthing & Bonding Basics for Data Centers"
const description =
  "Earthing and bonding are two different jobs that get lumped together — one is about safety, the other is about keeping sensitive equipment from seeing electrical noise. Here's the difference and why data centers care more than most buildings."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/earthing-and-bonding-basics-for-data-centers" },
  openGraph: {
    type: "article",
    url: "/blog/earthing-and-bonding-basics-for-data-centers",
    title,
    description,
    images: [{ url: "/electrical-design-data-center.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/electrical-design-data-center.jpg"] },
}

const faqs = [
  {
    question: "Aren't earthing and bonding the same thing?",
    answer:
      "They're related but distinct. Earthing connects a system to the general mass of earth (for safety and fault current return). Bonding connects metallic parts to each other so they sit at the same potential, whether or not that shared potential is earth.",
  },
  {
    question: "Why do data centers care about this more than a typical office building?",
    answer:
      "Sensitive electronics are far more susceptible to damage or malfunction from small potential differences and electrical noise than lighting or general power loads are. Poor bonding can introduce ground loops and noise that a typical office building would never notice but that can cause real problems for IT equipment.",
  },
  {
    question: "What's a ground loop and why is it bad?",
    answer:
      "It happens when equipment is grounded at two points that aren't at exactly the same potential, creating an unintended current path through signal or data cabling between them. That stray current can introduce noise or, in worse cases, damage equipment — which is why bonding practice (not just 'is it grounded') matters so much.",
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
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/earthing-and-bonding-basics-for-data-centers",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

export default function EarthingBondingPost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <ArticleShell
          category="Technical Basics"
          title={title}
          description="Ask most electrical students to define earthing and bonding separately, and most will struggle. In a data center, that distinction is exactly what keeps a lightning strike from becoming a server-room disaster."
          faqs={faqs}
          whatsappMessage="Hi, I read the earthing & bonding article and want to know more about the Electrical Design course."
        >
          <div>
            <h2 id="two-jobs">Two different jobs, one shared vocabulary</h2>
            <p>
              Earthing (grounding) connects the electrical system to the general mass of earth. Its main jobs are
              safety — giving fault current a low-impedance path back to source so protective devices trip
              quickly — and providing a stable voltage reference. Bonding connects separate metallic parts
              (equipment enclosures, cable trays, structural steel, racks) to each other so they're all at the
              same electrical potential. A system can be perfectly earthed and still have a serious bonding
              problem, and vice versa — which is why treating "grounded" as a single pass/fail checkbox misses
              most of the real engineering.
            </p>

            <h2 id="why-safety">The safety case for earthing</h2>
            <p>
              If an energized conductor faults to a metal enclosure that isn't properly earthed, that enclosure
              can become live at a dangerous voltage relative to true ground — a serious shock hazard for anyone
              who touches it. A proper earthing system gives that fault current a defined, low-impedance path
              back to the source, so the circuit's protective device sees enough current to trip quickly instead
              of leaving a live fault sitting on an exposed metal surface.
            </p>

            <h2 id="why-bonding">The signal-integrity case for bonding, specific to data centers</h2>
            <p>
              Beyond safety, data centers have a second, quieter reason to care about bonding: sensitive
              electronic equipment is much more affected by small differences in electrical potential and noise
              than most other loads. If two pieces of equipment are grounded at points that aren't at exactly the
              same potential, and they're also connected by signal or data cabling, a stray current can flow
              through that cabling — a ground loop. At best this introduces noise; at worst it can degrade or
              damage equipment. Rigorous bonding practice — connecting racks, trays, and structural steel into a
              common, low-impedance bonding network — is how this risk is designed out rather than discovered
              later as an intermittent fault nobody can explain.
            </p>

            <h2 id="lightning">Lightning protection ties into the same system</h2>
            <p>
              A lightning protection system (LPS) needs its own low-impedance path to earth to safely dissipate a
              strike's enormous but brief current. Critically, an LPS earthing system is normally bonded to the
              building's main earthing system rather than kept as a separate, isolated ground — because two
              "grounds" at different potentials during a strike is itself a hazard. Getting this bonding right is
              a specific, standards-driven exercise, not an afterthought bolted onto the main electrical design.
            </p>

            <h2 id="common-systems">A note on earthing system types</h2>
            <p>
              Different regions and standards define earthing arrangements like TN-S, TN-C-S, and TT, which
              differ in how the neutral and protective earth conductors are combined or kept separate between the
              source and the installation. The choice affects fault-loop impedance calculations and is typically
              set by the utility supply arrangement rather than chosen freely by the facility designer — but
              understanding which one you're working with is a prerequisite for every downstream earthing
              calculation.
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
              program, which covers earthing, bonding, and lightning protection as a full module.
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
