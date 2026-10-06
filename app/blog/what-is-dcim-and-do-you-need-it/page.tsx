import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "what-is-dcim-and-do-you-need-it"
const title = "What Is DCIM and Do You Need It?"
const description = "What data center infrastructure management (DCIM) software does, how it relates to building and power monitoring systems, and how to decide whether a facility needs it."

const heroImageSrc = "/hero-data-center.jpg"
const heroImageAlt = "Monitoring dashboard for a data center"

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
    "question": "What is DCIM?",
    "answer": "Data center infrastructure management: software and processes that monitor and manage the physical infrastructure (power, cooling, space and assets) of a data center."
  },
  {
    "question": "How is DCIM different from BMS and EPMS?",
    "answer": "A BMS controls building systems such as cooling, and an EPMS monitors the electrical system. DCIM typically sits above them to combine their data with asset and capacity information."
  },
  {
    "question": "What does DCIM provide?",
    "answer": "Real-time monitoring and alarms, capacity planning, asset and rack records, and reporting such as PUE."
  },
  {
    "question": "Do all data centers need it?",
    "answer": "Not necessarily. Small sites may manage with basic monitoring; larger or colocation sites usually benefit from capacity and asset visibility."
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
          description={"DCIM collects data from power, cooling and IT assets and presents it in one place. Whether you need it depends on scale, complexity and what you want to do with the data."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'What Is DCIM and Do You Need It?' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="does">What it does</h2>
            <ul>
              <li>Monitors power, cooling and environmental data in real time.</li>
              <li>Tracks assets, rack space, power and cooling capacity.</li>
              <li>Supports capacity planning and what-if analysis.</li>
              <li>Reports efficiency metrics such as PUE. See <Link href="/blog/pue-power-usage-effectiveness-explained">PUE explained</Link>.</li>
            </ul>

            <h2 id="compare">DCIM, BMS and EPMS</h2>
            <table>
              <thead><tr><th>System</th><th>Main job</th></tr></thead>
              <tbody>
                <tr><td>BMS</td><td>Monitor and control building and cooling systems</td></tr>
                <tr><td>EPMS</td><td>Monitor the electrical power system</td></tr>
                <tr><td>DCIM</td><td>Combine data with asset and capacity information for planning</td></tr>
              </tbody>
            </table>

            <h2 id="decide">Do you need it?</h2>
            <ol>
              <li>List the decisions you need data for (capacity planning, efficiency reporting, change management).</li>
              <li>Check what your BMS and EPMS already provide.</li>
              <li>Consider scale: many racks, many tenants or frequent changes make DCIM more valuable.</li>
              <li>Plan the metering and integration in the electrical design early.</li>
            </ol>
            <p>See <Link href="/data-center-design">the design guide</Link>.</p>
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
