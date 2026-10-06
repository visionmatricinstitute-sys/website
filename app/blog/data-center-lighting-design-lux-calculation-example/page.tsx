import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-lighting-design-lux-calculation-example"
const title = "Data Center Lighting Design: Lux Level Calculation Example"
const description = "How to estimate the number of luminaires for a room with the lumen method, with a worked example using stated assumptions, and the other lighting design checks."

const heroImageSrc = "/data-center-cable-sizing.jpg"
const heroImageAlt = "Lighting above a data center aisle"

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
    "question": "What is the lumen method?",
    "answer": "A method to estimate the number of luminaires needed for an average illuminance on the working plane: N = (E × A) ÷ (F × UF × MF)."
  },
  {
    "question": "What do the terms mean?",
    "answer": "E is the required illuminance in lux, A is the room area in square metres, F is the luminous flux of one luminaire in lumens, UF is the utilisation factor and MF is the maintenance factor."
  },
  {
    "question": "What lux level should a data hall have?",
    "answer": "It depends on the standard and the project specification. Use the value the specification gives, and consider task areas separately."
  },
  {
    "question": "Is the number of luminaires the final answer?",
    "answer": "No. Layout must also give even illumination, avoid glare on screens, and suit the rack layout and cable trays."
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
          description={"Lighting is a small load in a data center but a real design task. Here is the lumen method, a worked example and the points that go beyond a simple count."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Lighting Design: Lux Level Calculation Example' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="formula">The lumen method</h2>
            <p>N = (E × A) ÷ (F × UF × MF)</p>

            <h2 id="example">Worked example</h2>
            <p>
              Assumptions (illustrative): data hall area 200 m², required average illuminance 300 lux, luminaire output 4,000
              lumens, utilisation factor 0.6, maintenance factor 0.8.
            </p>
            <ol>
              <li>Numerator = 300 × 200 = 60,000</li>
              <li>Denominator = 4,000 × 0.6 × 0.8 = 1,920</li>
              <li>N = 60,000 ÷ 1,920 = 31.25, so use <strong>32 luminaires</strong></li>
            </ol>
            <p>The <Link href="/engineers-toolkit/lighting-calculator">lighting calculator</Link> runs this for your values.</p>

            <h2 id="beyond">Beyond the count</h2>
            <ul>
              <li><strong>Layout:</strong> spacing for even illumination and aisle alignment, so lighting is not blocked by racks or trays.</li>
              <li><strong>Emergency lighting:</strong> escape routes need a supply that survives power failure.</li>
              <li><strong>Controls:</strong> occupancy sensing to save energy in a mostly unmanned hall.</li>
              <li><strong>Heat load:</strong> lighting adds to the cooling load, a small term in the load calculation.</li>
            </ul>
            <p>Related: <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link>.</p>
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
