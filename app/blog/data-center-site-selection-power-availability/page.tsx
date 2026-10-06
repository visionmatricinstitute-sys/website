import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-site-selection-power-availability"
const title = "Data Center Site Selection: Power Availability and Other Factors"
const description = "The factors that decide where a data center is built: power availability and quality, connectivity, water, climate, hazards, land and permits, and how to compare sites."

const heroImageSrc = "/hero-data-center.jpg"
const heroImageAlt = "Aerial view of a data center site and nearby substation"

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
    "question": "What matters most when choosing a data center site?",
    "answer": "Power availability and reliability, connectivity, water and climate, natural hazard risk, land and permitting, and proximity to users and skilled people."
  },
  {
    "question": "Why is power first?",
    "answer": "Large facilities need tens or hundreds of megawatts and the utility connection can take years, so confirmed capacity and timeline shape the whole project."
  },
  {
    "question": "What should I ask the utility?",
    "answer": "Available capacity and timeline, the number and independence of supply feeds, voltage level, fault level and the connection cost."
  },
  {
    "question": "How do I compare sites?",
    "answer": "Score each on the same criteria with weights agreed by the owner, and treat power and permitting as gating items."
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
          category={"Technical"}
          title={title}
          description={"Power usually decides first. A site without enough reliable electricity at the right time is not a data center site, however good everything else is."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Site Selection: Power Availability and Other Factors' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="factors">Factors</h2>
            <table>
              <thead><tr><th>Factor</th><th>What to find out</th></tr></thead>
              <tbody>
                <tr><td>Power</td><td>Capacity, timeline, number of independent feeds, voltage, reliability</td></tr>
                <tr><td>Connectivity</td><td>Diverse fibre routes and carrier presence</td></tr>
                <tr><td>Water and climate</td><td>Cooling options, water availability, free-cooling potential</td></tr>
                <tr><td>Hazards</td><td>Flood, seismic, extreme weather and other site risks</td></tr>
                <tr><td>Land and permits</td><td>Zoning, environmental approvals, expansion room</td></tr>
                <tr><td>Location</td><td>Latency to users and availability of skilled staff</td></tr>
              </tbody>
            </table>

            <h2 id="power">Power questions</h2>
            <ol>
              <li>How much capacity can be delivered, and when?</li>
              <li>How many independent feeds, and do they share upstream equipment? This links to the redundancy target. See <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link>.</li>
              <li>At what voltage, and what is the fault level at the connection point? See <Link href="/blog/mv-switchgear-data-center-ratings-and-selection">MV switchgear</Link>.</li>
              <li>What does connection cost, and who builds the substation?</li>
            </ol>

            <h2 id="compare">Comparing sites</h2>
            <p>
              Score sites on the same criteria and treat power and permits as pass or fail items before weighing the rest.
              Overview: <Link href="/data-center-design">data center design guide</Link>.
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
