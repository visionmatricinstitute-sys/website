import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "autocad-electrical-drawing-for-beginners"
const title = "AutoCAD Electrical Drawing for Beginners"
const description = "The basics of producing electrical drawings in AutoCAD: layers, symbols and blocks, scales and layouts, and good habits for a drawing set."

const heroImageSrc = "/autocad-training.png"
const heroImageAlt = "Electrical drawing being prepared in AutoCAD"

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
    "question": "What do electrical drawings include?",
    "answer": "Single-line diagrams, layouts, schematics, cable routes and details, each with standard symbols and a title block."
  },
  {
    "question": "What are blocks?",
    "answer": "Reusable drawing objects, such as a symbol for a transformer or a luminaire, that keep drawings consistent."
  },
  {
    "question": "Why do layers matter?",
    "answer": "They control what shows and plots, so services stay organised and a drawing can be adapted without redrawing."
  },
  {
    "question": "Where can I learn more?",
    "answer": "The AutoCAD training page lists the program, and the single-line diagram article explains the most important drawing type."
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
          description={"Electrical drawings are a language. AutoCAD is the pen; the skill is in layers, symbols, scales and consistency."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'AutoCAD Electrical Drawing for Beginners' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="basics">Core habits</h2>
            <ul>
              <li><strong>Layers:</strong> one naming convention, with separate layers for power, lighting, containment and annotation.</li>
              <li><strong>Blocks:</strong> standard symbols from a controlled library, with attributes for tags.</li>
              <li><strong>Scale and units:</strong> draw at full size in consistent units; set scale in layouts.</li>
              <li><strong>Layouts and title blocks:</strong> sheets with consistent borders, revision tables and drawing numbers.</li>
            </ul>

            <h2 id="types">The drawings you will make</h2>
            <ol>
              <li>Single-line diagrams. See <Link href="/blog/single-line-diagrams-explained">single-line diagrams explained</Link>.</li>
              <li>Equipment room and containment layouts.</li>
              <li>Schematics and wiring diagrams.</li>
              <li>Details and schedules.</li>
            </ol>

            <h2 id="habits">Habits that save time</h2>
            <ul>
              <li>Start from a template with layers, text styles and sheet setup.</li>
              <li>Cross-check drawings against schedules. See <Link href="/blog/electrical-load-schedule-how-to-build-one">load schedule</Link>.</li>
              <li>Keep revisions controlled and dated.</li>
            </ul>
            <p>See <Link href="/programs/autocad-training">AutoCAD training</Link> and <Link href="/blog/revit-vs-autocad-for-electrical-design">Revit vs AutoCAD</Link>.</p>
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
