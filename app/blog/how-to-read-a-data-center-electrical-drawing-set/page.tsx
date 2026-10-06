import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "how-to-read-a-data-center-electrical-drawing-set"
const title = "How to Read a Data Center Electrical Drawing Set"
const description = "A practical order for reading an electrical drawing set: title blocks and legends, the single-line diagram, layouts, schedules and specifications, and how to cross-check them."

const heroImageSrc = "/data-center-single-line-diagram.jpg"
const heroImageAlt = "An electrical drawing set open on a desk"

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
    "question": "What is in an electrical drawing set?",
    "answer": "Typically a drawing list, legend and symbols, single-line diagrams, equipment and containment layouts, schematics, details, schedules and the specification."
  },
  {
    "question": "Where should I start?",
    "answer": "With the drawing list, the legend and the single-line diagram, which show the whole system, then move to layouts and schedules."
  },
  {
    "question": "How do I check that drawings agree?",
    "answer": "Cross-check the single-line diagram, load schedule, cable schedule and layouts against each other for ratings, tags and routes."
  },
  {
    "question": "Why does the revision matter?",
    "answer": "Working from a superseded sheet is a common cause of errors. Check the revision on every sheet."
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
          category={"Technical"}
          title={title}
          description={"A drawing set can run to hundreds of sheets. Reading it in the right order turns it from a pile of paper into a story of how power reaches the load."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'How to Read a Data Center Electrical Drawing Set' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="order">A reading order</h2>
            <ol>
              <li><strong>Drawing list and revisions:</strong> know what exists and which issue is current.</li>
              <li><strong>Legend and notes:</strong> symbols, abbreviations and general notes.</li>
              <li><strong>Single-line diagram:</strong> the whole system from source to load. See <Link href="/blog/single-line-diagrams-explained">single-line diagrams explained</Link>.</li>
              <li><strong>Layouts:</strong> where equipment and containment sit.</li>
              <li><strong>Schematics and details:</strong> how control and protection are wired.</li>
              <li><strong>Schedules:</strong> load, cable and panel schedules. See <Link href="/blog/electrical-load-schedule-how-to-build-one">load schedule</Link>.</li>
              <li><strong>Specification:</strong> performance and testing requirements that the drawings refer to.</li>
            </ol>

            <h2 id="check">Cross-checks that find errors</h2>
            <ul>
              <li>Breaker and cable sizes on the single-line diagram match the schedules.</li>
              <li>Tags on layouts match the diagram and schedules.</li>
              <li>Redundancy paths on the diagram are reflected in the physical routes.</li>
              <li>Fault levels on the diagram match the study.</li>
            </ul>

            <h2 id="habits">Habits</h2>
            <ul>
              <li>Trace one load from the utility to the rack as a test of your understanding.</li>
              <li>Mark queries on the sheet and track them to closure.</li>
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
