import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "fresher-electrical-engineer-first-year-in-data-centers"
const title = "Fresher Electrical Engineer: Starting in Data Centers"
const description = "A practical guide for new electrical engineering graduates: what to learn first, what roles to look for, and how to build evidence of skill before the first job."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "A new graduate engineer learning on a data center project"

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
    "question": "Can a fresher get into data centers?",
    "answer": "Yes. Some employers hire graduates for site, design or commissioning support roles. A solid foundation and a worked project help."
  },
  {
    "question": "What should I learn first?",
    "answer": "Electrical fundamentals applied to data centers: the power chain, redundancy and basic calculations."
  },
  {
    "question": "Which roles suit a fresher?",
    "answer": "Junior design, site or commissioning support, drafting and BIM roles. Read postings for the entry requirements."
  },
  {
    "question": "How do I stand out without experience?",
    "answer": "Complete a full example design, state your assumptions, and learn one or two tools employers ask for."
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
          description={"Data centers hire people who can show skill, not just a degree. Here is what a fresher can do to stand out."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Fresher Electrical Engineer: Starting in Data Centers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="learn">What to learn first</h2>
            <ol>
              <li>How a data center works. See <Link href="/blog/what-is-a-data-center-components-and-how-it-works">what is a data center</Link>.</li>
              <li>Redundancy and tiers. See <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link>.</li>
              <li>The power chain from utility to rack.</li>
              <li>Basic calculations: load, cable, UPS.</li>
            </ol>

            <h2 id="evidence">Build evidence</h2>
            <ul>
              <li>One complete example design with a load schedule, single-line diagram and calculations.</li>
              <li>Proficiency in one drawing tool and, if possible, Revit.</li>
              <li>A short write-up of your assumptions and results.</li>
            </ul>

            <h2 id="roles">Roles to look for</h2>
            <ul>
              <li>Junior electrical design engineer or design assistant.</li>
              <li>Site or QA/QC engineer trainee.</li>
              <li>Commissioning assistant.</li>
              <li>BIM or CAD technician.</li>
            </ul>
            <p>Use the <Link href="/resources/data-center-engineering-career-roadmap">career roadmap</Link> and see the <Link href="/blog/data-center-engineer-skills-roadmap">skills roadmap</Link>.</p>
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
