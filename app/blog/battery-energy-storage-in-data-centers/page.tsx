import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "battery-energy-storage-in-data-centers"
const title = "Battery Energy Storage in Data Centers"
const description = "What battery energy storage systems (BESS) can do in a data center beyond UPS backup, the engineering and safety questions, and where it makes sense."

const heroImageSrc = "/data-center-ups-topologies.jpg"
const heroImageAlt = "Battery energy storage system alongside data center power equipment"

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
    "question": "What is a battery energy storage system?",
    "answer": "A system of batteries with power conversion and controls that stores electrical energy and releases it on demand, at a larger scale and duration than a typical UPS battery."
  },
  {
    "question": "What can BESS do for a data center?",
    "answer": "Possible uses include peak shaving, supporting the grid, smoothing renewable output and extending backup time, depending on the design and the local market."
  },
  {
    "question": "Does BESS replace a generator?",
    "answer": "Not usually. Energy capacity and the cost of long-duration storage mean generators typically remain for extended outages, though designs vary."
  },
  {
    "question": "What are the safety concerns?",
    "answer": "Fire and thermal runaway risk for lithium-ion systems, ventilation, separation from critical spaces and compliance with the relevant codes such as NFPA 855 where it applies."
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
          description={"A UPS battery is sized to bridge seconds or minutes. A larger energy storage system can do more, and raises its own design and safety questions."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Battery Energy Storage in Data Centers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="uses">Possible uses</h2>
            <ul>
              <li><strong>Backup bridging:</strong> carry the load until generators start, as UPS batteries do.</li>
              <li><strong>Peak shaving:</strong> reduce demand charges by discharging at peak times.</li>
              <li><strong>Renewable firming:</strong> store surplus generation for later use.</li>
              <li><strong>Grid services:</strong> where the market and utility allow it.</li>
            </ul>

            <h2 id="design">Design questions</h2>
            <ol>
              <li>Energy (kWh) and power (kW) needed for each use, and the number of cycles.</li>
              <li>Where it connects: behind the UPS (DC), at LV or at MV.</li>
              <li>Protection, fault levels and interaction with generators. See <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link>.</li>
              <li>Fire safety, spacing and ventilation, and compliance with the applicable codes.</li>
              <li>Battery chemistry and life. See <Link href="/blog/lithium-ion-vs-vrla-batteries-for-ups">lithium-ion vs VRLA</Link>.</li>
            </ol>
            <p>See also <Link href="/blog/ups-battery-sizing-autonomy-time-worked-example">UPS battery sizing</Link> for the basic bridge-to-generator case.</p>
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
