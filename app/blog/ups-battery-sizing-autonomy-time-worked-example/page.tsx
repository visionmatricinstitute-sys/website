import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "ups-battery-sizing-autonomy-time-worked-example"
const title = "UPS Battery Sizing and Autonomy Time: A First-Pass Worked Example"
const description = "How to estimate the battery energy a UPS needs for a given autonomy time: load per module, inverter efficiency, aging and design factors, with a worked example and why final sizing uses the manufacturer's discharge tables."

const heroImageSrc = "/data-center-ups-topologies.jpg"
const heroImageAlt = "UPS battery cabinets in a data center battery room"

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
    "question": "How do you size a UPS battery?",
    "answer": "Find the load each UPS module carries, divide by the inverter efficiency to get the power drawn from the battery, multiply by the autonomy time to get energy, then apply aging, temperature and design factors. Final selection uses the battery manufacturer's constant-power discharge tables to the UPS end-of-discharge voltage."
  },
  {
    "question": "How much autonomy does a data center need?",
    "answer": "It depends on the design. The time must cover generator start and transfer with margin, and may be longer where there is no generator. The project specification sets it; there is no universal figure."
  },
  {
    "question": "Why is the battery bigger than the energy calculation?",
    "answer": "Batteries lose capacity with age and at low temperature, and cannot be discharged fully. Aging, temperature and design margin factors are applied so the battery still meets the autonomy at end of life."
  },
  {
    "question": "What battery chemistry is used?",
    "answer": "Valve-regulated lead-acid (VRLA) and lithium-ion are both used in UPS systems, with different life, footprint, cost and maintenance characteristics. The choice affects the discharge data used in sizing."
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
          description={"Autonomy time is how long the UPS can carry the load on battery before the generator takes over. Here is a first-pass energy estimate, with the factors that turn it into a real battery size, and a clear note on where the manufacturer's data takes over."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the UPS battery sizing article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="assumptions">The example and its assumptions</h2>
            <p>
              Illustrative example, not a project. It continues the{" "}
              <Link href="/blog/ups-sizing-data-center-worked-example">UPS sizing example</Link>. Assume one UPS module carries
              480 kW of load, inverter efficiency 96%, required autonomy 10 minutes, aging factor 1.25 and design margin 1.10.
            </p>

            <h2 id="step-1">Step 1: Power from the battery</h2>
            <p>Battery power = 480 ÷ 0.96 = <strong>500 kW</strong>.</p>

            <h2 id="step-2">Step 2: Energy for the autonomy time</h2>
            <p>Energy = 500 kW × (10 ÷ 60) h = <strong>83.3 kWh</strong>.</p>

            <h2 id="step-3">Step 3: Apply the factors</h2>
            <p>
              Battery energy required = 83.3 × 1.25 × 1.10 = <strong>about 115 kWh</strong> per module.
            </p>

            <h2 id="limits">Why this is only a first pass</h2>
            <ul>
              <li>Battery capacity depends on discharge rate. A 10-minute discharge delivers less than the nameplate kWh at the 8-10 hour rate, so manufacturers publish constant-power tables per cell for each time and end voltage.</li>
              <li>The DC bus voltage window of the UPS (end-of-discharge voltage) sets the number of cells and the usable energy.</li>
              <li>Temperature and end-of-life capacity (commonly taken as a percentage of rated capacity) are chemistry-specific.</li>
            </ul>
            <p>
              Treat the estimate as an order of magnitude to compare options, then size with the manufacturer's tool and tables.
              The <Link href="/engineers-toolkit/battery-runtime-calculator">battery runtime calculator</Link> lets you vary
              load, efficiency and autonomy.
            </p>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Using nameplate kWh without accounting for the high discharge rate.</li>
              <li>Forgetting inverter efficiency.</li>
              <li>Sizing for new capacity, not end of life.</li>
              <li>Specifying autonomy without checking generator start and transfer time.</li>
            </ul>
            <p>
              Related: <Link href="/blog/ups-vs-diesel-generator-data-center-backup-power">UPS vs diesel generator</Link> and{" "}
              <Link href="/blog/generator-sizing-data-center-worked-example">generator sizing example</Link>.
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
