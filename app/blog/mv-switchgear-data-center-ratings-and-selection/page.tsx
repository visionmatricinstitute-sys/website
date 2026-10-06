import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "mv-switchgear-data-center-ratings-and-selection"
const title = "MV Switchgear in Data Centers: Ratings and Selection"
const description = "What medium-voltage switchgear does in a data center, the ratings that define it, air-insulated vs gas-insulated construction, and the selection checks that matter."

const heroImageSrc = "/data-center-mv-lv-distribution.jpg"
const heroImageAlt = "Medium voltage switchgear in a data center switchroom"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `/blog/${slug}` },
  openGraph: {
    type: "article",
    url: `/blog/${slug}`,
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    "question": "What is MV switchgear?",
    "answer": "Switchgear rated for medium voltages, commonly from a few kV up to tens of kV, used to connect, protect and isolate the incoming supply and the transformers it feeds."
  },
  {
    "question": "What ratings define MV switchgear?",
    "answer": "Rated voltage, rated normal current, rated short-circuit breaking current, rated short-time withstand current and duration, and insulation level. The internal-arc classification and the type of insulation also matter."
  },
  {
    "question": "What is the difference between air-insulated and gas-insulated switchgear?",
    "answer": "Air-insulated switchgear (AIS) uses air as the insulation and is larger. Gas-insulated switchgear (GIS) uses an insulating gas in a sealed enclosure and is more compact. The choice depends on space, environment, cost, maintenance and the gas used."
  },
  {
    "question": "Which standard applies?",
    "answer": "Metal-enclosed switchgear is covered by the IEC 62271 series, with national or utility requirements added. Confirm the edition and local requirements for the project."
  }
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
  datePublished: "2026-10-06",
  dateModified: "2026-10-06",
  mainEntityOfPage: `https://www.visionmatrixinstitute.com/blog/${slug}`,
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const { prev, next } = getAdjacentPosts(slug)

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: `/blog/${slug}` },
])

export default function Post() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ArticleShell
          category={"Electrical Design"}
          title={title}
          description={"Medium-voltage switchgear is where the utility supply enters the building and where faults are first isolated. Here are its ratings, its main constructions and the checks to make when selecting it."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'MV Switchgear in Data Centers: Ratings and Selection' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="role">What it does</h2>
            <p>
              MV switchgear receives the utility supply, protects the incoming feeder and the transformers, and lets sections of
              the system be isolated for maintenance. In a redundant design the MV scheme (single bus, ring, double bus or two
              independent sources) is chosen with the redundancy target. See{" "}
              <Link href="/blog/mv-lv-power-distribution-architecture-explained">MV/LV distribution architecture</Link>.
            </p>

            <h2 id="ratings">The ratings that define it</h2>
            <table>
              <thead><tr><th>Rating</th><th>What it must cover</th></tr></thead>
              <tbody>
                <tr><td>Rated voltage and insulation level</td><td>System voltage with the required impulse and power-frequency withstand</td></tr>
                <tr><td>Rated normal current</td><td>Continuous load on the busbars and each feeder, including future growth</td></tr>
                <tr><td>Short-circuit breaking current</td><td>Maximum fault current at that point, from the short-circuit study</td></tr>
                <tr><td>Short-time withstand current</td><td>Fault current for a stated duration (for example one or three seconds) without damage</td></tr>
                <tr><td>Internal arc classification</td><td>Protection of people in front of the panel during an internal fault</td></tr>
              </tbody>
            </table>

            <h2 id="types">Air-insulated vs gas-insulated</h2>
            <ul>
              <li><strong>AIS:</strong> larger footprint, accessible components, widely used.</li>
              <li><strong>GIS:</strong> compact, sealed against dust and humidity, with gas handling and end-of-life considerations.</li>
            </ul>
            <p>The vacuum circuit breaker is the common interrupting technology in MV panels, but check the product you are specifying.</p>

            <h2 id="select">Selection checks</h2>
            <ol>
              <li>Take the fault level from a study, not from the transformer alone. See <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link>.</li>
              <li>Confirm protection relays, CTs and VTs for each feeder. See <Link href="/blog/protection-relay-explained">protection relays</Link>.</li>
              <li>Check interlocking and the transfer scheme between sources.</li>
              <li>Check space, ventilation, cable entry and access for maintenance and racking.</li>
              <li>Confirm site conditions: ambient temperature, altitude, humidity and dust.</li>
            </ol>
            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Selecting the short-time withstand for the wrong duration.</li>
              <li>Ignoring arc-fault containment and the room design that goes with it.</li>
              <li>Forgetting future feeders and spare ways.</li>
            </ul>
          </div>
        </ArticleShell>
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-body">
              Learn to do this on a full project in the{" "}
              <Link href="/programs/electrical-design-data-center" className="text-foreground font-semibold underline underline-offset-4 hover:no-underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program, or read the{" "}
              <Link href="/data-center-design" className="text-foreground font-semibold underline underline-offset-4 hover:no-underline">
                data center design guide
              </Link>
              .
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
