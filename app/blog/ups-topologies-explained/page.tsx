import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"

const title = "UPS Topologies Explained: Standby, Line-Interactive, Double-Conversion"
const description =
  "Not every UPS protects a server the same way, and the difference isn't marketing — it's how many milliseconds of interruption actually reach the load. Here's the three real UPS topologies, and the separate question of how many UPS units a design actually needs."

const heroImageSrc = "/data-center-ups-topologies.jpg"
const heroImageAlt = "A black-and-white close-up of a UPS unit's control panel, showing its ON, RUN, FAULT, and RESET indicators"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/ups-topologies-explained" },
  openGraph: {
    type: "article",
    url: "/blog/ups-topologies-explained",
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    question: "What's the actual difference between \"double-conversion\" and just \"online\" UPS?",
    answer:
      "They're the same thing. Double-conversion describes the technology (AC to DC, then back to AC, continuously), and online describes the behavior that technology produces — the load always runs off the UPS's own inverter, never switched onto raw utility power. Both terms show up on spec sheets for the identical topology.",
  },
  {
    question: "Why doesn't every data center just use line-interactive UPS if it's cheaper?",
    answer:
      "Because a line-interactive UPS still has to detect a power event and switch to battery, which takes a small but real amount of time — long enough to matter for equipment sensitive to even a momentary interruption — and it offers no protection against harmonics or frequency variation on the incoming utility feed. Double-conversion's zero-transfer-time, continuously regulated output is specifically what data center-grade IT equipment is designed to expect.",
  },
  {
    question: "Is N+1 UPS redundancy the same idea as the general N+1 redundancy notation?",
    answer:
      "Yes, applied specifically to UPS modules. N+1 UPS means enough UPS modules to carry full load, plus one more, all sharing a common output bus so any single module's failure or maintenance doesn't interrupt supply. The general redundancy notation (N, N+1, 2N, 2(N+1)) applies to UPS systems exactly the way it applies to the rest of the electrical system.",
  },
  {
    question: "What is a \"catcher\" system in UPS design?",
    answer:
      "A catcher, or distributed redundant, UPS topology runs multiple independent UPS systems, each normally carrying its own separate portion of the load, but electrically able to pick up (\"catch\") the load from a failed adjacent system through static transfer switches. It can approach 2N-level resilience with less total installed UPS capacity than fully duplicating every system — at the cost of more complex switching and control logic to coordinate correctly.",
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
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/ups-topologies-explained",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: "/blog/ups-topologies-explained" },
])

export default function UpsTopologiesPost() {
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
          description="\"UPS topology\" actually bundles two separate questions: how one UPS unit converts power internally, and how multiple UPS units are arranged for redundancy. Here's both, kept apart."
          faqs={faqs}
          whatsappMessage="Hi, I read the UPS Topologies article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
        >
          <div>
            <h2 id="two-questions">Two questions get bundled into one term</h2>
            <p>
              "UPS topology" is used for two genuinely different things: the internal conversion technology of a
              single UPS unit — standby, line-interactive, or double-conversion — and how multiple UPS units are
              arranged together for redundancy, such as parallel redundant or distributed redundant. Keeping these
              apart matters, because a design can get either one right independently of the other.
            </p>

            <h2 id="standby">Standby (offline) UPS</h2>
            <p>
              The load runs directly off utility power almost all of the time. The UPS only switches to battery and
              inverter power once it detects an outage, which takes a measurable transfer time — a few milliseconds
              to tens of milliseconds. It's the cheapest topology, common for small or non-critical loads, and
              essentially never the primary UPS technology protecting real IT racks in a purpose-built data center.
            </p>

            <h2 id="line-interactive">Line-interactive UPS</h2>
            <p>
              Adds an autotransformer that corrects minor over- or under-voltage without switching to battery power
              at all, which reduces how often the unit needs to invoke its battery. It still has a transfer time,
              smaller than standby, on the events it can't correct this way. Common in smaller server rooms; rarely
              the primary topology specified for a purpose-built data center's critical IT load.
            </p>

            <h2 id="double-conversion">Double-conversion (online) UPS</h2>
            <p>
              Continuously rectifies incoming AC to DC and then inverts it back to AC — the load is always running
              off the UPS's own inverter, never directly off raw utility power, so there is zero transfer time when
              utility power fails, plus continuous voltage and frequency regulation and harmonic isolation from the
              incoming feed. This is the standard topology for data center IT load, because it's the only one of the
              three that delivers a genuinely uninterrupted transition.
            </p>

            <h2 id="module-arrangements">Then, separately: how the modules are arranged</h2>
            <p>
              Once double-conversion is chosen as the base technology, a design still has to decide how UPS modules
              are arranged: a single module (N, no redundancy); parallel redundant, or N+1, where multiple modules
              share a common output bus and any one module can fail without interrupting supply; isolated redundant,
              where a dedicated backup module stays isolated from the primary system rather than sharing its bus; and
              distributed redundant, or a catcher system, where independent UPS systems each carry their own load but
              can pick up an adjacent system's load through static transfer switches if it fails.
            </p>

            <h2 id="on-the-sld">Why this lives on the single-line diagram</h2>
            <p>
              UPS topology is explicitly part of what a single-line diagram exists to show — an N+1 UPS bus is drawn
              structurally differently from an isolated redundant pair, which is drawn differently again from a
              distributed redundant, catcher arrangement. Reading which topology a design actually uses means reading
              the SLD, the same way reading its overall redundancy level does.
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
              program, which covers UPS topologies directly as part of Module 7's single-line diagram work.
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
