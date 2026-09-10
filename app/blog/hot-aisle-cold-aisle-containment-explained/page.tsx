import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"

const title = "Hot Aisle / Cold Aisle Containment Explained"
const description =
  "Every data center layout diagram shows alternating hot and cold aisles, but the reason isn't decoration — it's the cheapest, most effective way to stop a facility from cooling its own exhaust air. Here's how it actually works."

const heroImageSrc = "/data-center-hot-cold-aisle.jpg"
const heroImageAlt = "Close-up of server cooling fans and liquid cooling lines in a data center, showing the heat exhaust hot aisle/cold aisle containment manages"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/hot-aisle-cold-aisle-containment-explained" },
  openGraph: {
    type: "article",
    url: "/blog/hot-aisle-cold-aisle-containment-explained",
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    question: "Which is more common: hot aisle containment or cold aisle containment?",
    answer:
      "Cold aisle containment is more common in retrofits, since it's usually cheaper to enclose the cold aisle with doors and a roof than to duct the entire hot aisle back to the cooling units. Hot aisle containment is generally considered more effective (it isolates 100% of the heat load rather than relying on room volume to dilute it) and is more common in purpose-built new facilities where ducting can be designed in from the start.",
  },
  {
    question: "Does containment reduce PUE?",
    answer:
      "Yes, directly. Containment raises the return air temperature to the cooling units (since it's now pure exhaust air instead of exhaust diluted with room air), which lets CRAC/CRAH units run more efficiently and often permits a higher cold aisle supply temperature under ASHRAE guidelines — both reduce the mechanical cooling energy in the PUE calculation.",
  },
  {
    question: "What happens if hot and cold air mix without containment?",
    answer:
      "Recirculation and bypass. Recirculation is hot exhaust air finding its way back into equipment intakes, causing localized hot spots and shortening hardware lifespan or triggering thermal shutdowns. Bypass is cold supply air that never reaches equipment intakes at all, wasted before it does any cooling work. Both waste cooling capacity and are the specific problems containment is designed to eliminate.",
  },
  {
    question: "Do blanking panels actually matter if I already have aisle containment?",
    answer:
      "Yes — containment and blanking panels solve different leak points. Containment stops air from mixing at the aisle level; blanking panels stop it from mixing through empty rack-unit gaps within a single cabinet. Skip blanking panels and a contained cold aisle still leaks cold air straight through the empty slots in a rack, undermining the containment.",
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
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/hot-aisle-cold-aisle-containment-explained",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: "/blog/hot-aisle-cold-aisle-containment-explained" },
])

export default function HotColdAislePost() {
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
          description="Walk into any real data center and the rack layout looks the same everywhere: rows facing each other, then rows facing away. That pattern is doing real engineering work."
          faqs={faqs}
          whatsappMessage="Hi, I read the Hot Aisle / Cold Aisle Containment article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
        >
          <div>
            <h2 id="the-problem">The problem: servers exhale what they inhale</h2>
            <p>
              Every server pulls in cool air at the front and exhausts hot air out the back — typically 15-20°C
              hotter than intake. Put racks in random orientations in an open room, and that hot exhaust mixes
              freely with the cool supply air before it gets back to the cooling units. The room ends up
              simultaneously too hot near the equipment and wasting enormous cooling capacity conditioning air that
              was never actually hot to begin with.
            </p>

            <h2 id="the-layout">The layout: face-to-face, back-to-back</h2>
            <p>
              Hot aisle/cold aisle layout arranges rack rows so that equipment fronts face each other across a
              "cold aisle" (fed by the raised floor or overhead cold air supply), and equipment backs face each
              other across a "hot aisle" (where exhaust collects before returning to the cooling units). No rack
              front ever faces another rack's back — that single rule is what keeps hot exhaust and cold supply
              from being adjacent in the first place.
            </p>

            <h2 id="containment">Containment: sealing the aisle, not just arranging it</h2>
            <p>
              Layout alone reduces mixing; physical containment (doors, roof panels, and plastic curtains sealing
              an aisle end-to-end) stops it almost entirely. <strong>Cold aisle containment</strong> encloses the
              cold aisle so supply air can only reach equipment intakes, not escape into the room.{" "}
              <strong>Hot aisle containment</strong> does the reverse — it encloses the hot aisle and ducts the
              exhaust directly back to the cooling units, leaving the rest of the room at a comfortable, uniform
              temperature. Both approaches solve the same problem from opposite sides of the rack.
            </p>

            <h2 id="recirculation-bypass">Two failure modes containment eliminates</h2>
            <p>
              <strong>Recirculation</strong> is hot exhaust finding its way back into an intake — over the top of a
              rack, around an unsealed cable cutout, through a gap at the end of a row. It causes real hardware to
              run hotter than the room's average temperature would suggest, sometimes enough to trigger thermal
              throttling or shutdown. <strong>Bypass</strong> is the opposite failure: cold supply air escaping
              through gaps before it ever reaches an intake, cooling nothing and wasting the energy spent
              conditioning it. Both are containment leaks, and both directly inflate a facility's PUE.
            </p>

            <h2 id="blanking-panels">The detail that's easy to skip: blanking panels</h2>
            <p>
              A rack with empty, unused rack-unit slots is a hole in the containment even inside a properly
              contained aisle — cold air pulls straight through the empty space to the hot aisle side without
              passing through any equipment. Blanking panels (simple metal or plastic plates covering unused slots)
              close that gap. It's a cheap component that's easy to treat as optional and is one of the most common
              real-world containment failures found during commissioning walk-downs.
            </p>

            <h2 id="design-implications">Why this belongs in the electrical design, not just mechanical</h2>
            <p>
              Rack orientation and aisle containment aren't purely an HVAC decision — they constrain busway and
              cable tray routing (which typically run above the hot aisle to avoid blocking cold air delivery),
              PDU placement, and even how much spare electrical capacity a row can practically support before
              airflow, not power, becomes the limiting factor. A design engineer who treats hot/cold aisle
              orientation as "someone else's problem" ends up redesigning layouts after the mechanical team flags a
              conflict late in the project.
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
              program, which covers hot/cold aisle data hall layout as part of the Electrical Layout Design module.
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
