import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "chilled-water-vs-air-cooled-data-center-cooling"
const title = "Chilled Water vs Air-Cooled Cooling for Data Centers"
const description = "How water-cooled (chilled water with cooling towers) and air-cooled chiller systems compare for data centers: efficiency, water use, climate, maintenance and electrical load."

const heroImageSrc = "/data-center-hot-cold-aisle.jpg"
const heroImageAlt = "Chiller plant serving a data center"

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
    "question": "What is the difference between air-cooled and water-cooled chillers?",
    "answer": "Air-cooled chillers reject heat directly to outdoor air using fans. Water-cooled chillers reject heat to a water loop that goes to a cooling tower, which evaporates some water to reject the heat."
  },
  {
    "question": "Which is more energy efficient?",
    "answer": "Water-cooled systems are generally more efficient at the chiller, particularly in hot climates, but need pumps, towers and water treatment. Compare the whole system, not the chiller alone."
  },
  {
    "question": "Which uses less water?",
    "answer": "Air-cooled chillers use little or no water on site. Water-cooled systems consume water through evaporation, which shows up in WUE."
  },
  {
    "question": "Can a facility use both?",
    "answer": "Yes. Some designs combine them or add free cooling so the plant mode changes with outdoor conditions."
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
          category={"Cooling"}
          title={title}
          description={"Both reject heat to the outdoors. One uses evaporated water to do it more efficiently; the other uses ambient air and uses no water on site. Climate, water cost and scale decide."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the chilled-water vs air-cooled article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="compare">Side by side</h2>
            <table>
              <thead><tr><th></th><th>Air-cooled</th><th>Water-cooled</th></tr></thead>
              <tbody>
                <tr><td>Heat rejection</td><td>Fans move outdoor air over the condenser</td><td>Condenser water loop to cooling towers</td></tr>
                <tr><td>Water use on site</td><td>Little to none</td><td>Evaporation, blowdown and treatment</td></tr>
                <tr><td>Efficiency</td><td>Falls as ambient temperature rises</td><td>Generally better, especially in hot climates</td></tr>
                <tr><td>Plant complexity</td><td>Simpler</td><td>Pumps, towers, water treatment</td></tr>
                <tr><td>Footprint</td><td>Large outdoor area for condensers</td><td>Towers plus plant room</td></tr>
              </tbody>
            </table>
            <p>The comparisons are general; use manufacturer data and climate data for a real decision.</p>

            <h2 id="decide">What decides it</h2>
            <ul>
              <li><strong>Climate:</strong> ambient temperature and humidity set achievable efficiency and free-cooling hours.</li>
              <li><strong>Water:</strong> availability, cost and local rules. See <Link href="/blog/wue-water-usage-effectiveness-explained">WUE explained</Link>.</li>
              <li><strong>Scale:</strong> larger capacity favours efficiency gains.</li>
              <li><strong>Operations:</strong> water treatment and tower maintenance need skills and procedures.</li>
              <li><strong>Electrical load:</strong> affects PUE and the demand the electrical system must serve.</li>
            </ul>
            <p>
              See also <Link href="/blog/data-center-cooling-systems-explained">cooling systems explained</Link> and the{" "}
              <Link href="/engineers-toolkit/cooling-load-calculator">cooling load calculator</Link>.
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
