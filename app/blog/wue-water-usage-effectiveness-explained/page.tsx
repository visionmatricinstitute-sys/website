import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "wue-water-usage-effectiveness-explained"
const title = "WUE (Water Usage Effectiveness) Explained with a Calculation"
const description = "What WUE measures, the formula in litres per kilowatt-hour, a worked calculation with stated assumptions, and how it relates to PUE and cooling design."

const heroImageSrc = "/data-center-pue-explained.jpg"
const heroImageAlt = "Cooling towers at a data center"

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
    "question": "What is WUE in a data center?",
    "answer": "Water usage effectiveness is the annual site water consumption divided by the annual IT equipment energy, expressed in litres per kilowatt-hour (L/kWh)."
  },
  {
    "question": "What is a good WUE?",
    "answer": "There is no single target; it depends on climate, cooling technology and water source. Lower is better, and a design with no on-site water use for cooling can have a very low value, though it may use more electricity."
  },
  {
    "question": "How does WUE relate to PUE?",
    "answer": "They often trade off. Evaporative and water-cooled designs can reduce energy use (better PUE) at the cost of water use (higher WUE), while air-cooled designs can do the reverse."
  },
  {
    "question": "Does WUE include water used at the power plant?",
    "answer": "The basic site WUE counts only water used on site. Some variants also count water used in generating the electricity; check which one a figure refers to."
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
          category={"Sustainability"}
          title={title}
          description={"PUE tells you how much power the facility wastes; WUE tells you how much water it uses. Here is the formula, a worked example, and what moves the number."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the WUE article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="formula">The formula</h2>
            <p>WUE = annual site water usage (litres) ÷ annual IT equipment energy (kWh).</p>

            <h2 id="example">Worked example</h2>
            <p>Assumptions (illustrative): 1.2 MW average IT load running all year, and 20,000 m³ of site water use per year.</p>
            <ol>
              <li>IT energy = 1,200 kW × 8,760 h = 10,512,000 kWh</li>
              <li>Water = 20,000 m³ × 1,000 L/m³ = 20,000,000 L</li>
              <li>WUE = 20,000,000 ÷ 10,512,000 = <strong>1.90 L/kWh</strong></li>
            </ol>
            <p>The <Link href="/engineers-toolkit/data-center-efficiency-calculator">efficiency calculator</Link> covers PUE, WUE and CUE.</p>

            <h2 id="drivers">What moves WUE</h2>
            <ul>
              <li>Heat rejection method: cooling towers consume water by evaporation; air-cooled plant uses little.</li>
              <li>Climate and humidity, which set how much evaporative cooling is available.</li>
              <li>Water treatment and blowdown practice.</li>
              <li>IT load: the same water use over a lower IT energy gives a higher WUE.</li>
            </ul>

            <h2 id="tradeoff">The PUE trade-off</h2>
            <p>
              A design can improve PUE by using evaporative cooling and worsen WUE in the process. Judge them together and
              against local water availability. See <Link href="/blog/pue-power-usage-effectiveness-explained">PUE explained</Link> and{" "}
              <Link href="/blog/chilled-water-vs-air-cooled-data-center-cooling">chilled-water vs air-cooled</Link>.
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
