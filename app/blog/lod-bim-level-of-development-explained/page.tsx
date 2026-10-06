import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "lod-bim-level-of-development-explained"
const title = "LOD in BIM: LOD 100 to 500 Explained"
const description = "What Level of Development means in BIM, how LOD 100 to 500 are usually described, how it differs from level of information, and how to use it in a project."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "BIM model elements shown at increasing levels of development"

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
    "question": "What does LOD stand for in BIM?",
    "answer": "Level of Development. It describes how developed a model element is, and how far it can be relied on for dimensions, location and detail."
  },
  {
    "question": "What are LOD 100 to 500?",
    "answer": "A common scale from conceptual (100) through approximate geometry (200), precise geometry for coordination (300), fabrication detail (350 and 400) to as-built (500). Definitions vary by guide, so use the project's."
  },
  {
    "question": "What is the difference between LOD and LOI?",
    "answer": "LOD concerns geometric development; level of information concerns the data attached. ISO 19650 uses the term level of information need."
  },
  {
    "question": "Who decides the LOD?",
    "answer": "The project's BIM execution plan states the LOD for each element at each stage."
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
          category={"BIM / Revit"}
          title={title}
          description={"LOD tells you how much a model element can be relied on. Without it, one person's coordinated model is another person's rough sketch."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'LOD in BIM: LOD 100 to 500 Explained' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="scale">The scale</h2>
            <table>
              <thead><tr><th>LOD</th><th>Typical meaning</th></tr></thead>
              <tbody>
                <tr><td>100</td><td>Conceptual: symbol or placeholder</td></tr>
                <tr><td>200</td><td>Approximate size, shape, location</td></tr>
                <tr><td>300</td><td>Accurate geometry suitable for design coordination</td></tr>
                <tr><td>350</td><td>Includes interfaces with other elements</td></tr>
                <tr><td>400</td><td>Fabrication and assembly detail</td></tr>
                <tr><td>500</td><td>As-built, verified in the field</td></tr>
              </tbody>
            </table>
            <p>The numbers are widely used, but exact definitions vary between guides. Use the definition the project's BIM execution plan cites.</p>

            <h2 id="loi">Development and information</h2>
            <p>
              Geometry is only half of it. The data attached to an element (rating, manufacturer, tag, circuit) is its level of
              information. Projects usually specify both.
            </p>

            <h2 id="use">Using it</h2>
            <ul>
              <li>Set the LOD per element and stage in the BIM execution plan.</li>
              <li>Build families to that level, not beyond it, because extra detail slows the model. See <Link href="/blog/revit-electrical-families-creating-and-managing">electrical families</Link>.</li>
              <li>Treat an element below the needed LOD as unreliable for coordination.</li>
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
