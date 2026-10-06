import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-electrical-design-course-what-to-look-for"
const title = "Data Center Electrical Design Course: What to Look For"
const description = "How to judge a data center electrical design course: curriculum, calculations, drawings and software, a project, instructors, delivery and what you can show afterwards."

const heroImageSrc = "/electrical-design-data-center.jpg"
const heroImageAlt = "Learners in a data center electrical design course"

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
    "question": "What should a data center electrical design course teach?",
    "answer": "The facility and redundancy concepts, the power chain, sizing calculations, studies, drawings and software, standards, and testing and handover, ideally applied to a complete project."
  },
  {
    "question": "How do I tell a good course from a weak one?",
    "answer": "Look for stated outcomes, worked calculations, a real project with deliverables, practising instructors and clear information about schedule, fee and support."
  },
  {
    "question": "Does the course need to include software?",
    "answer": "Employers commonly expect tools such as ETAP, AutoCAD and Revit, so yes, or a clear path to learn them."
  },
  {
    "question": "Which course does VMI offer?",
    "answer": "The Electrical Design – Data Center Specialist program, delivered live online with a capstone project, plus separate BIM and Revit and AutoCAD programs. See the program page for the curriculum and fee."
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
          description={"Courses differ a lot. The useful ones teach you to do the work, and leave you with something you can show an employer."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Electrical Design Course: What to Look For' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="checklist">A checklist</h2>
            <table>
              <thead><tr><th>Look for</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td>Clear, specific outcomes</td><td>Tells you what you will be able to do</td></tr>
                <tr><td>Worked calculations with stated assumptions</td><td>Shows the method, not just the answer. See <Link href="/blog/ups-sizing-data-center-worked-example">a UPS sizing example</Link></td></tr>
                <tr><td>Drawings and software</td><td>Skills employers ask for. See <Link href="/blog/etap-for-data-center-design-where-it-fits">ETAP</Link> and <Link href="/blog/revit-vs-autocad-for-electrical-design">Revit vs AutoCAD</Link></td></tr>
                <tr><td>A complete project</td><td>Evidence you can show</td></tr>
                <tr><td>Practising instructors</td><td>Real project judgement</td></tr>
                <tr><td>Honest information</td><td>Fee, schedule, support and what the course does not do</td></tr>
              </tbody>
            </table>

            <h2 id="ask">Questions to ask any provider</h2>
            <ol>
              <li>What will I produce by the end?</li>
              <li>Can I see the full curriculum and sample material?</li>
              <li>Who teaches, and what have they worked on?</li>
              <li>How is progress checked and what support is there?</li>
            </ol>

            <h2 id="vmi">VMI's program</h2>
            <p>
              The <Link href="/programs/electrical-design-data-center">Electrical Design – Data Center Specialist program</Link>{" "}
              is delivered live online and ends with a capstone design of a 10 MW Tier III data center. Compare it against the
              checklist above, and see the free <Link href="/resources/data-center-engineering-career-roadmap">career roadmap</Link>
              to judge your starting point.
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
