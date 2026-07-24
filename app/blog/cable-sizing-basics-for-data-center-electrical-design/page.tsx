import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"

const title = "Cable Sizing Basics for Data Center Electrical Design"
const description =
  "The four factors that actually decide a cable size in data center electrical design — current rating, voltage drop, derating, and short-circuit withstand — explained simply."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/cable-sizing-basics-for-data-center-electrical-design" },
  openGraph: {
    type: "article",
    url: "/blog/cable-sizing-basics-for-data-center-electrical-design",
    title,
    description,
    images: [{ url: "/electrical-design-data-center.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/electrical-design-data-center.jpg"] },
}

const faqs = [
  {
    question: "Is a bigger cable always safer?",
    answer:
      "Not necessarily better value — oversizing wastes copper/aluminum and space in cable trays, and can even cause issues like poor termination fit. The goal is the smallest cable that passes all four checks, not the biggest one you can afford.",
  },
  {
    question: "Which check usually governs in data centers?",
    answer:
      "For short runs at high current (like busbar taps to PDUs), short-circuit withstand or voltage drop often governs before thermal current rating does — the opposite of what many engineers expect from general building wiring.",
  },
  {
    question: "Do I need a different approach for DC cabling (batteries, some UPS topologies)?",
    answer:
      "The same four checks apply, but voltage drop tolerances are usually tighter and there's no skin-effect/harmonic derating to worry about — DC cable sizing is arguably simpler once you're comfortable with AC sizing.",
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
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/cable-sizing-basics-for-data-center-electrical-design",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

export default function CableSizingBasicsPost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <ArticleShell
          category="Technical Basics"
          title={title}
          description="A cable that 'works' and a cable that's correctly sized are not the same thing. Here are the four checks every data center electrical designer runs before picking a size."
          faqs={faqs}
          whatsappMessage="Hi, I read the cable sizing article and want to know more about the Electrical Design course."
        >
          <div>
            <h2 id="why-it-matters">Why cable sizing isn't just "pick a big enough wire"</h2>
            <p>
              New designers often assume cable sizing is a single lookup: find the load current, match it to a
              table, done. In practice, a cable has to pass four independent checks, and any one of them can force
              you to a larger size than the others suggest. Getting this wrong either wastes money (oversizing) or
              creates a real safety and reliability risk (undersizing) — both matter a lot in a facility where an
              electrical fault can mean a service outage.
            </p>

            <h2 id="current-rating">1. Current-carrying capacity (ampacity)</h2>
            <p>
              This is the check most people learn first: the cable's continuous current rating, adjusted for its
              installation method (in free air, in a duct, in a tray with other cables), must exceed the load
              current the circuit will actually carry. Manufacturers publish base ampacity tables for standard
              conditions — the real design work is in the correction factors that follow.
            </p>

            <h2 id="derating">2. Derating for real installation conditions</h2>
            <p>
              A cable's rated ampacity assumes a specific ambient temperature and a specific installation method.
              Data centers rarely match that assumption exactly, so designers apply derating factors for:
            </p>
            <ul>
              <li>Ambient or enclosure temperature above the standard reference (hot aisles, rooftop runs).</li>
              <li>Grouping — multiple current-carrying cables bundled together in the same tray or conduit.</li>
              <li>Depth of burial or thermal resistivity of surrounding soil, for underground runs.</li>
            </ul>
            <p>
              Skip this step and a cable that looks fine on paper can run hotter than its insulation is rated for
              once it's actually installed in a loaded cable tray.
            </p>

            <h2 id="voltage-drop">3. Voltage drop over the cable run</h2>
            <p>
              Even a cable with plenty of ampacity margin can fail this check on a long run. Voltage drop is a
              function of cable length, conductor resistance, and load current — the longer the run, the more
              margin you typically need on conductor size to keep the voltage at the load within acceptable
              limits. This is frequently the governing factor for long runs to remote PDUs or outdoor equipment,
              even when the load current itself is modest.
            </p>

            <h2 id="short-circuit">4. Short-circuit withstand</h2>
            <p>
              A cable also has to survive the fault current that would flow through it for the time it takes the
              upstream protective device to clear the fault — without the conductor overheating or the insulation
              being damaged. This check depends on the available fault current at that point in the system and the
              protective device's clearing time, which is why short-circuit studies and cable sizing are done
              together, not in isolation.
            </p>

            <h2 id="the-takeaway">The takeaway</h2>
            <p>
              A correctly sized cable is the smallest one that clears all four checks simultaneously — not just
              the one with the biggest ampacity margin. In a live design, you'll usually find one check quietly
              governs the whole calculation, and knowing which one it will be before you start saves a lot of
              rework.
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
              program, where cable sizing is one full module.
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
