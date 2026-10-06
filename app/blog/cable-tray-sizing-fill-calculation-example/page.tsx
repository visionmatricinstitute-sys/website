import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "cable-tray-sizing-fill-calculation-example"
const title = "Cable Tray Sizing: Fill Calculation Example"
const description = "How to estimate the cable tray width for a bundle of power cables from cable diameters, fill ratio and usable depth, with a worked example and the other checks (weight, spacing, derating) that also govern tray selection."

const heroImageSrc = "/data-center-cable-sizing.jpg"
const heroImageAlt = "Cable trays carrying power cables above a data center aisle"

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
    "question": "How do you calculate cable tray size?",
    "answer": "Sum the cross-sectional areas of all cables the tray will carry, divide by the permitted fill ratio to get the required usable area, then divide by the usable tray depth to get the width, and round up to a standard tray width."
  },
  {
    "question": "What fill ratio should I use?",
    "answer": "It depends on the standard, the cable type and whether the tray carries power or control cables. Many designs set a limit that leaves room for installation and future cables; use the value in the project specification or applicable code rather than a general rule."
  },
  {
    "question": "Is fill the only check for a cable tray?",
    "answer": "No. Also check the weight per metre against the tray's load rating and support spacing, the minimum spacing between power cables for heat dissipation, and ampacity derating for grouping."
  },
  {
    "question": "Should I leave spare space?",
    "answer": "Usually yes. Spare capacity for future cables is a common design requirement; state the percentage you used."
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
          description={"Tray width is a space question first and a loading question second. Here is the fill calculation with a worked example, and the checks that decide whether the answer is actually usable."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the cable tray sizing article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="method">The method</h2>
            <ol>
              <li>List each cable and its overall outer diameter from the datasheet.</li>
              <li>Cross-section area of a round cable = π ÷ 4 × D².</li>
              <li>Total area = sum of all cable areas.</li>
              <li>Usable tray area = total area ÷ fill ratio.</li>
              <li>Required width = usable area ÷ usable depth; round up to a standard width.</li>
            </ol>

            <h2 id="example">Worked example</h2>
            <p>
              Assumptions (illustrative): 20 power cables of 35 mm outer diameter in a single tray, usable depth 100 mm, fill
              ratio 40% (an assumed design limit; use the project specification).
            </p>
            <ol>
              <li>Area per cable = π ÷ 4 × 35² = 962 mm²</li>
              <li>Total area = 20 × 962 = 19,242 mm²</li>
              <li>Usable area = 19,242 ÷ 0.40 = 48,106 mm²</li>
              <li>Width = 48,106 ÷ 100 = 481 mm, so choose the next standard width, <strong>500 mm</strong></li>
            </ol>

            <h2 id="other-checks">The other checks</h2>
            <ul>
              <li><strong>Weight:</strong> total cable weight per metre plus the tray's own weight must be within the tray's rated load at the chosen support spacing.</li>
              <li><strong>Spacing:</strong> large power cables are often laid in a single layer with gaps between them so heat can dissipate, which can make the real width larger than the area calculation.</li>
              <li><strong>Derating:</strong> grouping cables lowers their current-carrying capacity; check the ampacity of the cables as installed. See <Link href="/blog/cable-sizing-basics-for-data-center-electrical-design">cable sizing basics</Link>.</li>
              <li><strong>Segregation:</strong> power and data cables are normally separated.</li>
              <li><strong>Fire and earthing:</strong> tray bonding and fire-stopping where it crosses compartments.</li>
            </ul>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Using conductor area instead of overall cable diameter.</li>
              <li>Ignoring spacing for single-core cable trefoil or flat formations.</li>
              <li>Checking fill but not weight and support spacing.</li>
              <li>Leaving no spare capacity.</li>
            </ul>
            <p>
              Related: <Link href="/blog/voltage-drop-calculation-formula-examples">voltage drop</Link> and the{" "}
              <Link href="/engineers-toolkit/conductor-sizing-calculator">conductor sizing calculator</Link>.
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
