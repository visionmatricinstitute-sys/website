import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "site-engineer-in-data-center-projects"
const title = "Site Engineer in Data Center Projects"
const description = "What a data center site engineer does day to day: installation supervision, inspection, quality control, coordination and handover support."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "A site engineer inspecting electrical installation work in a data center"

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
    "question": "What does a data center site engineer do?",
    "answer": "Supervises and inspects installation, checks work against drawings and specifications, coordinates trades, records progress and quality, and supports testing and handover."
  },
  {
    "question": "What skills help?",
    "answer": "Ability to read drawings, knowledge of installation practice and codes, quality-control habits and clear communication."
  },
  {
    "question": "How is the role different from design?",
    "answer": "Design produces the information; site turns it into the installed system and feeds back what does not fit."
  },
  {
    "question": "Can a site engineer move to design or commissioning?",
    "answer": "Yes. Site experience is valuable for both, and many engineers move between them."
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
          description={"The site engineer is where design meets reality. The job is to make sure what is installed is what was designed, safely and on schedule."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Site Engineer in Data Center Projects' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="daily">Daily work</h2>
            <ul>
              <li>Check installation against approved drawings and specifications.</li>
              <li>Inspect materials and workmanship, and record non-conformances.</li>
              <li>Coordinate trades so work is sequenced and routes are clear.</li>
              <li>Keep progress records and update as-built information. See <Link href="/blog/as-built-bim-data-centers">as-built BIM</Link>.</li>
            </ul>

            <h2 id="skills">Skills</h2>
            <ul>
              <li>Reading drawings and schedules. See <Link href="/blog/single-line-diagrams-explained">single-line diagrams</Link>.</li>
              <li>Knowing containment and cable routing practice. See <Link href="/blog/cable-tray-sizing-fill-calculation-example">cable tray sizing</Link>.</li>
              <li>Quality control and clear records.</li>
            </ul>

            <h2 id="next">Where it leads</h2>
            <ol>
              <li>Commissioning. See <Link href="/blog/commissioning-engineer-data-center-role-and-skills">commissioning engineer role</Link>.</li>
              <li>Design, with the site insight that makes drawings buildable.</li>
              <li>Project management.</li>
            </ol>
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
