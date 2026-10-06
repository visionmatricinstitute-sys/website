import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "electrical-load-schedule-how-to-build-one"
const title = "Electrical Load Schedule: How to Build One"
const description = "What an electrical load schedule contains, how to calculate connected and demand load, how it feeds transformer and generator sizing, and common mistakes."

const heroImageSrc = "/data-center-single-line-diagram.jpg"
const heroImageAlt = "Electrical load schedule next to a single-line diagram"

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
    "question": "What is an electrical load schedule?",
    "answer": "A table listing each load with its rating, power factor, load or demand factor and power source, summed per board and per source to give the demand each part of the system must serve."
  },
  {
    "question": "What is the difference between connected and demand load?",
    "answer": "Connected load is the sum of ratings. Demand load applies demand or diversity factors for how much will actually run at once."
  },
  {
    "question": "What columns should it have?",
    "answer": "Load description, location, board, quantity, rating, voltage, power factor, efficiency where relevant, demand factor, source (utility, generator or UPS) and redundancy path."
  },
  {
    "question": "How is it used?",
    "answer": "Totals feed the transformer, switchgear, UPS and generator sizing, and the single-line diagram. It is updated as the design changes."
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
          description={"A load schedule is the table behind every sizing decision. If it is wrong, the transformer, generator and cable sizes are wrong with it."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Electrical Load Schedule: How to Build One' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="columns">Columns</h2>
            <table>
              <thead><tr><th>Column</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>Description, tag and location</td><td>Identify the load</td></tr>
                <tr><td>Rating (kW or kVA), voltage, power factor</td><td>Connected load</td></tr>
                <tr><td>Efficiency</td><td>Converts motor output to input power</td></tr>
                <tr><td>Demand factor</td><td>What proportion runs at once</td></tr>
                <tr><td>Source and path</td><td>Utility, generator or UPS; A or B path</td></tr>
              </tbody>
            </table>

            <h2 id="steps">Steps</h2>
            <ol>
              <li>List every load, by board, from the equipment schedules.</li>
              <li>Convert each to input power (kW and kVA) at its power factor and efficiency.</li>
              <li>Apply demand factors, justified by how the load behaves.</li>
              <li>Sum by board, then by source and redundancy path.</li>
              <li>Add the margin and growth the design commits to, and say so.</li>
              <li>Use the totals to size equipment. See <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link>, <Link href="/blog/generator-sizing-data-center-worked-example">generator sizing</Link> and <Link href="/blog/ups-sizing-data-center-worked-example">UPS sizing</Link>.</li>
            </ol>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Mixing kW and kVA in the totals.</li>
              <li>Using demand factors that do not suit continuous loads such as IT and cooling.</li>
              <li>Not splitting by redundancy path, so the failure case is never checked.</li>
              <li>Letting the schedule drift from the single-line diagram.</li>
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
