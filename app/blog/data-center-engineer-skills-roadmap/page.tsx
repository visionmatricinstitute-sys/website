import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-engineer-skills-roadmap"
const title = "Data Center Engineer Skills Roadmap"
const description = "The skills a data center electrical engineer builds, in order: fundamentals, power chain, calculations, drawings, studies, software and communication."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "Skills of a data center engineer mapped on a whiteboard"

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
    "question": "What skills does a data center engineer need?",
    "answer": "Understanding of data center systems, electrical fundamentals, power distribution and protection, calculations, drawings, studies, software tools and the ability to document and communicate assumptions."
  },
  {
    "question": "Which software should I learn?",
    "answer": "Commonly ETAP or similar for studies, AutoCAD for drawings, and Revit for coordinated projects, depending on the employer."
  },
  {
    "question": "Are soft skills important?",
    "answer": "Yes. Stating assumptions, writing clear calculations and coordinating with other disciplines are everyday parts of the job."
  },
  {
    "question": "In what order should I learn?",
    "answer": "Facility basics, then the power chain, then calculations, then drawings and software, then a full project that ties it together."
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
          category={"Career Guide"}
          title={title}
          description={"Employers look for engineers who can do specific things. Here is a skills list in a sensible learning order, with links to guides for each."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Engineer Skills Roadmap' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="skills">Skills in learning order</h2>
            <ol>
              <li><strong>The facility:</strong> systems, tiers and redundancy. See <Link href="/blog/what-is-a-data-center-components-and-how-it-works">what is a data center</Link>.</li>
              <li><strong>The power chain:</strong> utility to rack. See <Link href="/blog/mv-lv-power-distribution-architecture-explained">MV/LV distribution</Link>.</li>
              <li><strong>Calculations:</strong> load, UPS, generator, cable, short circuit. See <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link>.</li>
              <li><strong>Studies:</strong> short circuit, load flow, protection coordination, arc flash. See <Link href="/blog/load-flow-study-explained-data-center">load flow study</Link>.</li>
              <li><strong>Drawings and models:</strong> single-line diagrams, layouts, BIM. See <Link href="/blog/single-line-diagrams-explained">single-line diagrams</Link>.</li>
              <li><strong>Standards:</strong> the ones your projects cite. See <Link href="/blog/tia-942-explained-rated-1-to-rated-4">TIA-942</Link>.</li>
              <li><strong>Testing and handover:</strong> commissioning and documentation. See <Link href="/blog/data-center-commissioning-levels-explained">commissioning levels</Link>.</li>
            </ol>

            <h2 id="tools">Software</h2>
            <ul>
              <li>Study software (such as ETAP) for fault, load flow and coordination.</li>
              <li>AutoCAD for drawings, Revit and Navisworks for coordinated projects.</li>
              <li>Spreadsheets for transparent, reviewable calculations.</li>
            </ul>

            <h2 id="habits">Habits employers notice</h2>
            <ul>
              <li>Stating assumptions on every calculation.</li>
              <li>Cross-checking schedules, drawings and calculations against each other.</li>
              <li>Writing short, clear technical notes.</li>
            </ul>
            <p>Use the free <Link href="/resources/data-center-engineering-career-roadmap">career roadmap</Link> to track progress.</p>
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
