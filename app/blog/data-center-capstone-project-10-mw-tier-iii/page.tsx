import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-capstone-project-10-mw-tier-iii"
const title = "Capstone Project: Designing a 10 MW Tier III Data Center"
const description = "What a full data center design project involves, from load and tier target to single-line diagram, sizing, layouts and testing, and how the VMI program ends with a 10 MW Tier III capstone."

const heroImageSrc = "/electrical-design-data-center.jpg"
const heroImageAlt = "Capstone project design review for a data center"

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
    "question": "What is the VMI capstone project?",
    "answer": "The last module of the Electrical Design – Data Center Specialist program: a 30-hour, end-to-end design project for a 10 MW Tier III data center."
  },
  {
    "question": "Why a full project?",
    "answer": "Employers want to see decisions and calculations hang together, from the redundancy target to the layout, with assumptions stated."
  },
  {
    "question": "Is the capstone a real facility?",
    "answer": "It is a teaching project designed to use the whole curriculum, not a client facility."
  },
  {
    "question": "Where can I see the whole curriculum?",
    "answer": "On the program page, which lists all twelve modules, hours and fee."
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
          category={"Courses"}
          title={title}
          description={"The best evidence of design skill is a complete design you can walk an interviewer through. Here is the shape of such a project, and where it appears in VMI's program."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Capstone Project: Designing a 10 MW Tier III Data Center' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="shape">The shape of a complete design</h2>
            <ol>
              <li><strong>Requirements:</strong> IT load, growth and the reliability target. See <Link href="/blog/data-center-tier-classification-explained">tier classification</Link>.</li>
              <li><strong>Basis of design:</strong> assumptions, standards and design criteria written down.</li>
              <li><strong>Load calculation:</strong> IT, cooling and auxiliary loads. See <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link>.</li>
              <li><strong>Equipment sizing:</strong> UPS, generators, transformers, cables and power factor correction.</li>
              <li><strong>Single-line diagram:</strong> redundancy topology and distribution paths. See <Link href="/blog/single-line-diagrams-explained">single-line diagrams</Link>.</li>
              <li><strong>Studies:</strong> fault levels and protection.</li>
              <li><strong>Layouts:</strong> electrical rooms, data halls and earthing.</li>
              <li><strong>Procurement and testing:</strong> vendor evaluation and FAT/SAT planning.</li>
            </ol>

            <h2 id="vmi">In the VMI program</h2>
            <p>
              The twelve modules build the pieces in this order: data center fundamentals, electrical fundamentals, equipment, design
              standards, the design process, load calculations and cable sizing, single-line diagrams, layouts, BIM and software, vendor
              engineering, site engineering and ETAP, and finally the capstone: a 10 MW Tier III data center project, end to end (30 hours).
            </p>

            <h2 id="evidence">Why it matters for a career</h2>
            <ul>
              <li>It gives you a portfolio piece with calculations, drawings and stated assumptions.</li>
              <li>It lets you answer interview questions from your own work. See <Link href="/blog/data-center-engineer-interview-questions-electrical">interview questions</Link>.</li>
            </ul>
            <p>
              See the <Link href="/programs/electrical-design-data-center">program page</Link> for the curriculum, schedule and fee, and the free{" "}
              <Link href="/resources/data-center-engineering-career-roadmap">career roadmap</Link>.
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
