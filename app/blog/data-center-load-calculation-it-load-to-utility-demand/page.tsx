import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-load-calculation-it-load-to-utility-demand"
const title = "Data Center Load Calculation: From IT Load to Utility Demand"
const description = "How to move from IT load to total facility load and utility demand: PUE-based estimate, load categories, demand and diversity, and transformer sizing, with a worked example and stated assumptions."

const heroImageSrc = "/data-center-mv-lv-distribution.jpg"
const heroImageAlt = "Medium voltage switchgear and transformers feeding a data center"

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
    "question": "How do you calculate the electrical load of a data center?",
    "answer": "Start from the planned IT load in kW. Add the electrical load of cooling, UPS and distribution losses, lighting and other building services. A quick estimate multiplies IT load by the design PUE; a detailed one builds a load schedule line by line with demand factors."
  },
  {
    "question": "What is the difference between connected, demand and design load?",
    "answer": "Connected load is the sum of equipment ratings. Demand load is what is expected to run at once, after applying demand or diversity factors. Design load is the demand load plus the allowances (growth, margin) the design commits to."
  },
  {
    "question": "How does PUE relate to total load?",
    "answer": "PUE is total facility power divided by IT power, so total facility power equals IT power times PUE. A design PUE is an assumption you choose and later verify against the cooling and electrical design."
  },
  {
    "question": "Is IT load the same as rack nameplate?",
    "answer": "No. Nameplate is a maximum. Actual IT draw is lower, and the design should state whether the figure is nameplate, expected average or peak, and how the rack power density was derived."
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
          description={"Every data center electrical design starts with a load number, and most early mistakes are in that number. Here is how IT load becomes facility load and then utility demand, using a worked example with stated assumptions."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the data center load calculation article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="assumptions">The example and its assumptions</h2>
            <p>
              Illustrative example, not a project. IT load: 1,200 kW. Design PUE: 1.4 (an assumption to be confirmed by the
              cooling and electrical design). Power factor at the transformer: 0.95. Transformer sizes follow the standard IEC
              60076 series (…, 1,600, 2,000, 2,500 kVA …).
            </p>

            <h2 id="categories">Load categories</h2>
            <ul>
              <li><strong>Critical IT load:</strong> servers, storage and network equipment, fed via UPS.</li>
              <li><strong>Mechanical load:</strong> chillers, pumps, CRAH/CRAC units, fans, cooling towers.</li>
              <li><strong>UPS and distribution losses:</strong> UPS inefficiency, transformer and cable losses.</li>
              <li><strong>Building services:</strong> lighting, small power, lifts, BMS, fire and security.</li>
            </ul>

            <h2 id="quick-estimate">Quick estimate with PUE</h2>
            <p>Total facility power = IT load × PUE = 1,200 × 1.4 = <strong>1,680 kW</strong>.</p>
            <p>
              This is a concept-stage number. It hides the split between categories, so it cannot tell you the generator load
              (which excludes non-essential loads) or the transformer loading per bus. Replace it with a load schedule as the
              design matures.
            </p>

            <h2 id="transformer">From kW to transformer kVA</h2>
            <p>Apparent power = 1,680 ÷ 0.95 = <strong>1,768 kVA</strong>.</p>
            <p>
              For two transformers in an N+1 arrangement, each must carry the full demand when the other is out. A 2,000 kVA
              unit covers 1,768 kVA, so each runs at 1,768 ÷ 2,000 = 88% after a failure, and about 44% when the two share the
              load. Growth allowance is a separate decision: if the facility will grow, size for the final load or leave space
              for a later transformer. See the{" "}
              <Link href="/engineers-toolkit/transformer-sizing-calculator">transformer sizing calculator</Link>.
            </p>

            <h2 id="schedule">Moving to a load schedule</h2>
            <p>
              A load schedule lists each load with its rating, power factor, load factor and demand factor, then sums them per
              distribution board and per source. Apply demand factors only where the load behaviour justifies them: continuous
              IT and cooling loads in a data center have high demand factors, close to 1.0 for the base load.
            </p>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Using rack nameplate as the IT load without saying so.</li>
              <li>Using a PUE that the cooling design cannot achieve.</li>
              <li>Forgetting that the generator and the utility see different load sets.</li>
              <li>Mixing kW and kVA between load schedule and transformer sizing.</li>
              <li>Leaving growth, margin and redundancy unstated so they get counted twice or not at all.</li>
            </ul>

            <h2 id="related">Related</h2>
            <p>
              <Link href="/blog/pue-power-usage-effectiveness-explained">PUE explained</Link>,{" "}
              <Link href="/blog/mv-lv-power-distribution-architecture-explained">MV/LV distribution architecture</Link> and{" "}
              <Link href="/blog/generator-sizing-data-center-worked-example">generator sizing worked example</Link>.
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
