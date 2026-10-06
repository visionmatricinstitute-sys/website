import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "ashrae-thermal-guidelines-data-centers-explained"
const title = "ASHRAE Thermal Guidelines for Data Centers Explained"
const description = "What the ASHRAE TC 9.9 thermal guidelines define, the equipment classes and the recommended and allowable ranges, and why they matter to cooling design."

const heroImageSrc = "/data-center-hot-cold-aisle.jpg"
const heroImageAlt = "Cold aisle air supply temperature measurement"

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
    "question": "What do the ASHRAE thermal guidelines define?",
    "answer": "Environmental classes for IT equipment, and for each class a recommended range and a wider allowable range for temperature and humidity at the equipment inlet."
  },
  {
    "question": "What is the recommended temperature range?",
    "answer": "In recent editions the recommended dry-bulb range for the common classes is around 18 to 27 degrees Celsius at the IT equipment inlet, with humidity limits defined separately. Always check the current edition."
  },
  {
    "question": "Why do the guidelines matter for design?",
    "answer": "They set the supply air conditions the cooling must hold, which drives chiller and airflow design, free-cooling hours and PUE."
  },
  {
    "question": "Is the allowable range an operating target?",
    "answer": "No. The allowable range is for limited periods or conditions; the recommended range is the normal target. Equipment manufacturers' specifications also apply."
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
          category={"Standards"}
          title={title}
          description={"ASHRAE's thermal guidelines say what air conditions IT equipment should see. They set the target the cooling system is designed to meet, and they have shifted over time towards warmer, more efficient operation."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'ASHRAE Thermal Guidelines for Data Centers Explained' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="what">What they define</h2>
            <p>
              The guidelines, from ASHRAE Technical Committee 9.9, group IT equipment into classes by how much environmental
              variation it tolerates. For each class they give a <strong>recommended</strong> envelope (the normal target) and a
              wider <strong>allowable</strong> envelope.
            </p>

            <h2 id="measured">Where it is measured</h2>
            <p>
              Conditions are measured at the equipment air inlet, not in the room average. This is why airflow management and
              containment matter. See <Link href="/blog/hot-aisle-cold-aisle-containment-explained">hot aisle / cold aisle containment</Link>.
            </p>

            <h2 id="impact">What it means for the design</h2>
            <ul>
              <li>Warmer supply air allows more hours of free cooling and better chiller efficiency, which helps PUE. See <Link href="/blog/pue-power-usage-effectiveness-explained">PUE</Link>.</li>
              <li>Humidity limits affect static discharge and condensation risk, and so how humidification is designed.</li>
              <li>The guidelines are a floor for the IT equipment; the manufacturer's specification may be stricter.</li>
            </ul>
            <p>
              Overview of the cooling chain: <Link href="/blog/data-center-cooling-systems-explained">cooling systems explained</Link>.
              Confirm the current edition and class when you design.
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
