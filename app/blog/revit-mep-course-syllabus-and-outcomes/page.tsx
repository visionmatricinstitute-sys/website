import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "revit-mep-course-syllabus-and-outcomes"
const title = "Revit MEP Course for Data Centers: Syllabus and Outcomes"
const description = "What to look for in a Revit electrical course, and the syllabus of the VMI BIM and Revit training: twelve modules from BIM fundamentals to a final data center project."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "BIM and Revit training classroom"

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
    "question": "What should a Revit electrical course cover?",
    "answer": "BIM concepts, Revit fundamentals and project setup, electrical tools and families, containment modelling, documentation, coordination and a final project using real conditions."
  },
  {
    "question": "How is the VMI BIM program structured?",
    "answer": "In twelve modules across four stages: foundation, electrical Revit, modelling, documentation and coordination, and BIM data with a final project."
  },
  {
    "question": "Does the course include a project?",
    "answer": "Yes. The final module is a data center project using Dynamo and the data and quality checks taught earlier."
  },
  {
    "question": "Where can I see the details?",
    "answer": "On the BIM and Revit training page, which lists the curriculum and the program's duration and fee."
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
          description={"A good Revit course teaches a workflow, not a list of buttons. Here is what to look for, and the module structure of VMI's own BIM and Revit program."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Revit MEP Course for Data Centers: Syllabus and Outcomes' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="look">What to look for in any course</h2>
            <ul>
              <li>A workflow from project setup to issued drawings, not isolated tool tutorials.</li>
              <li>Electrical-specific content: families, circuits, containment and schedules.</li>
              <li>Coordination: federated models and clash detection.</li>
              <li>A project that produces deliverables you can show.</li>
            </ul>

            <h2 id="vmi">The VMI BIM and Revit curriculum</h2>
            <table>
              <thead><tr><th>Stage</th><th>Modules</th></tr></thead>
              <tbody>
                <tr><td>1. Foundation</td><td>BIM and data center fundamentals; Revit fundamentals; Revit project setup</td></tr>
                <tr><td>2. Electrical Revit</td><td>Electrical Revit basics; electrical families; data center electrical modelling</td></tr>
                <tr><td>3. Modelling, documentation and coordination</td><td>Cable tray, conduit and power modelling; lighting and small power; electrical documentation; BIM coordination and Navisworks</td></tr>
                <tr><td>4. BIM data and capstone</td><td>BIM data, BOQ and quality control; Dynamo and the final data center project</td></tr>
              </tbody>
            </table>
            <p>
              The full lesson list, duration and fee are on the{" "}
              <Link href="/programs/bim-revit-training">BIM and Revit training page</Link>. Background reading:{" "}
              <Link href="/blog/revit-electrical-basics-for-engineers">Revit electrical basics</Link>,{" "}
              <Link href="/blog/navisworks-clash-detection-workflow">Navisworks clash detection</Link> and{" "}
              <Link href="/blog/dynamo-for-electrical-engineers-revit">Dynamo for electrical engineers</Link>.
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
