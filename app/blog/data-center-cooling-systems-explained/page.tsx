import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-cooling-systems-explained"
const title = "Data Center Cooling Systems Explained"
const description = "How data center cooling works: heat removal paths, air-cooled and water-cooled approaches, CRAH and CRAC units, chillers, containment and liquid cooling, and how cooling choices tie back to electrical load."

const heroImageSrc = "/data-center-hot-cold-aisle.jpg"
const heroImageAlt = "Hot aisle and cold aisle arrangement in a data center"

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
    "question": "How are data centers cooled?",
    "answer": "Heat from the IT equipment is picked up by air (or liquid), moved to cooling units, transferred to a chilled-water or refrigerant circuit, and finally rejected outdoors through chillers, cooling towers, dry coolers or direct air exchange, depending on the design and climate."
  },
  {
    "question": "Why does cooling matter to electrical design?",
    "answer": "Cooling plant is a large electrical load, so it sets part of the utility and generator demand, and its efficiency drives PUE. Cooling redundancy must also match the electrical redundancy target."
  },
  {
    "question": "What is the difference between CRAH and CRAC?",
    "answer": "A CRAC (computer room air conditioner) has its own refrigerant compressor; a CRAH (computer room air handler) uses chilled water from a central plant. See the dedicated comparison."
  },
  {
    "question": "Is liquid cooling replacing air cooling?",
    "answer": "Liquid cooling is used where rack power density is too high for air to handle efficiently, such as some AI deployments. Many facilities use a mix of liquid and air cooling."
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
          description={"Almost every watt the IT equipment draws becomes heat that must be removed. Here is how that heat leaves the building, the main system types, and why the cooling design and the electrical design cannot be done separately."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the data center cooling article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="path">The heat path</h2>
            <ol>
              <li>IT equipment turns electrical power into heat.</li>
              <li>Air (or liquid) carries that heat away from the equipment.</li>
              <li>Cooling units (CRAH, CRAC, in-row or rear-door units) transfer the heat to a refrigerant or chilled-water circuit.</li>
              <li>The plant (chillers, cooling towers, dry coolers, or outside air in some designs) rejects the heat outdoors.</li>
            </ol>

            <h2 id="systems">Main system types</h2>
            <ul>
              <li><strong>Refrigerant-based units (CRAC):</strong> each unit has its own compressor. Simple to deploy, scale in units.</li>
              <li><strong>Chilled-water systems (CRAH plus chillers):</strong> central plant, scales well at larger capacities. See <Link href="/blog/crah-vs-crac-data-center-cooling-units">CRAH vs CRAC</Link> and <Link href="/blog/chilled-water-vs-air-cooled-data-center-cooling">chilled-water vs air-cooled</Link>.</li>
              <li><strong>Free cooling and economisers:</strong> use cool outdoor air or water for part of the year to reduce compressor use. Viability depends on climate.</li>
              <li><strong>Liquid cooling:</strong> coolant removes heat directly at the chip or by immersion. See <Link href="/blog/liquid-cooling-direct-to-chip-vs-immersion">liquid cooling explained</Link>.</li>
            </ul>

            <h2 id="air">Managing the air</h2>
            <p>
              Airflow management decides how much of the cooling capacity is actually used. Separating hot and cold air stops
              recirculation and bypass; see <Link href="/blog/hot-aisle-cold-aisle-containment-explained">hot aisle / cold aisle containment</Link>.
            </p>

            <h2 id="electrical">The electrical connection</h2>
            <ul>
              <li>Cooling plant is a large share of the facility load, so it affects the transformer, switchgear and generator sizing. See <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link>.</li>
              <li>Cooling efficiency sets PUE; see <Link href="/blog/pue-power-usage-effectiveness-explained">PUE explained</Link>.</li>
              <li>Cooling must ride through power transitions, so its redundancy and restart behaviour matter as much as the IT supply.</li>
            </ul>
            <p>
              Part of the <Link href="/data-center-design">data center design guide</Link>.
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
