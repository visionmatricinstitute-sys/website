import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "busduct-vs-cable-data-center-power-distribution"
const title = "Busduct vs Cable for Data Center Power Distribution"
const description = "How busduct (busway) and cables compare for data center distribution: capacity, flexibility, installation, fault performance and cost drivers, and when each is usually chosen."

const heroImageSrc = "/data-center-mv-lv-distribution.jpg"
const heroImageAlt = "Busduct run above a data center aisle"

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
    "question": "What is the difference between busduct and cable?",
    "answer": "A busduct (busway) carries current on enclosed solid conductors in a prefabricated housing, while a cable uses insulated conductors laid in tray, conduit or ground. Busduct is built in sections with joints and tap-off points; cables are cut to length and terminated."
  },
  {
    "question": "When is busduct used in data centers?",
    "answer": "Commonly for high-current runs between transformers and switchboards, and for overhead busway feeding rows of racks through plug-in tap-off units that make it easy to add or move circuits."
  },
  {
    "question": "When are cables a better choice?",
    "answer": "Cables are usually favoured for lower-current feeders, irregular routes and where circuits are fixed and few, because they are flexible in routing and cost-effective at small ratings."
  },
  {
    "question": "Is busduct more expensive?",
    "answer": "Cost depends on rating, length and the number of tap-off points. Compare the installed cost of the whole run, including supports, terminations, labour and future changes, rather than the price per metre."
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
          description={"Both carry power from the board to the load. They differ in how they handle high current, change and heat, and the right answer depends on the run, not on a general preference."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the busduct vs cable article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="compare">Side by side</h2>
            <table>
              <thead><tr><th>Aspect</th><th>Busduct</th><th>Cable</th></tr></thead>
              <tbody>
                <tr><td>High current</td><td>Compact solution at high ratings</td><td>Needs many parallel runs, so more tray space</td></tr>
                <tr><td>Changes after installation</td><td>Plug-in tap-offs make additions easier</td><td>New circuits need new cable runs</td></tr>
                <tr><td>Routing</td><td>Prefabricated sections; fittings for bends</td><td>Flexible routing</td></tr>
                <tr><td>Installation</td><td>Fast once the layout is fixed; needs accurate site dimensions</td><td>Pulling and terminating is labour-intensive for large sizes</td></tr>
                <tr><td>Impedance</td><td>Lower than equivalent cable (check the product data)</td><td>Depends on size and layout</td></tr>
                <tr><td>Fire and enclosure</td><td>Enclosed; check fire barrier and IP ratings</td><td>Depends on the cable type and tray</td></tr>
                <tr><td>Cost</td><td>Often higher at low ratings; competitive at high ratings and with many tap-offs</td><td>Usually lower for short, low-current runs</td></tr>
              </tbody>
            </table>
            <p>
              The qualitative comparisons are general; verify each against the products and the project's conditions.
            </p>

            <h2 id="data-center">Where each is usually used</h2>
            <ul>
              <li><strong>Transformer to LV switchboard:</strong> busduct is common at high currents; parallel single-core cables are the alternative.</li>
              <li><strong>Overhead to racks:</strong> busway with plug-in units gives flexibility to add or move rack circuits.</li>
              <li><strong>Switchboard to small distribution boards:</strong> cables.</li>
            </ul>

            <h2 id="decide">How to decide</h2>
            <ol>
              <li>Compare current rating and the number of parallel cables that would be needed.</li>
              <li>Count the expected changes over the facility's life.</li>
              <li>Check space: tray width versus busduct cross-section.</li>
              <li>Check fault withstand and short-circuit rating. See <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link>.</li>
              <li>Compare installed cost for the whole run, not price per metre.</li>
            </ol>
            <p>
              Busduct and cable sizing are both covered by the{" "}
              <Link href="/engineers-toolkit/conductor-sizing-calculator">conductor sizing calculator</Link>; see also{" "}
              <Link href="/blog/mv-lv-power-distribution-architecture-explained">MV/LV distribution architecture</Link>.
            </p>
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
