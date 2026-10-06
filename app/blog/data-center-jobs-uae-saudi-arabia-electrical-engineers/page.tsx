import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-jobs-uae-saudi-arabia-electrical-engineers"
const title = "Data Center Jobs in the UAE and Saudi Arabia for Electrical Engineers"
const description = "What roles exist on Gulf data center projects, the kinds of employers, what they typically look for, and how to prepare an application, without quoting job counts or pay."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "Data center construction site in the Gulf region"

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
    "question": "What kinds of employers hire data center electrical engineers in the Gulf?",
    "answer": "Developers and operators, design consultants, main contractors, MEP subcontractors, equipment suppliers and commissioning specialists."
  },
  {
    "question": "What do Gulf employers usually ask for?",
    "answer": "Relevant project experience, familiarity with the standards cited on the project, software skills, and often evidence of qualifications. Requirements vary, so read each posting."
  },
  {
    "question": "Do I need international experience?",
    "answer": "Not always, but experience on comparable projects helps. A well-documented project portfolio can offset a lack of location history."
  },
  {
    "question": "How do I find openings?",
    "answer": "Employer career pages, professional networks, recruiters specialising in construction and engineering, and project announcements. Check the current market yourself."
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
          description={"The Gulf has an active data center construction market. Here are the roles, the employer types and the preparation that helps, with the numbers left for you to check."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Jobs in the UAE and Saudi Arabia for Electrical Engineers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="roles">Roles on a project</h2>
            <table>
              <thead><tr><th>Role</th><th>Focus</th></tr></thead>
              <tbody>
                <tr><td>Electrical design engineer</td><td>Calculations, studies, drawings and specifications</td></tr>
                <tr><td>BIM/Revit engineer</td><td>Coordinated models and documentation. See <Link href="/blog/data-center-bim-why-it-matters">data center BIM</Link></td></tr>
                <tr><td>Site engineer</td><td>Installation, inspection and quality on site. See <Link href="/blog/site-engineer-in-data-center-projects">site engineer role</Link></td></tr>
                <tr><td>Commissioning engineer</td><td>Testing and handover. See <Link href="/blog/commissioning-engineer-data-center-role-and-skills">commissioning engineer role</Link></td></tr>
                <tr><td>Project engineer or manager</td><td>Coordination, schedule and cost</td></tr>
              </tbody>
            </table>

            <h2 id="prepare">How to prepare</h2>
            <ol>
              <li>Choose the role that matches your strengths and read several postings for it.</li>
              <li>Build a portfolio of calculations and drawings from a full project, with assumptions stated.</li>
              <li>Know the standards the postings cite. See <Link href="/blog/uptime-institute-tier-certification-what-it-covers">Uptime tiers</Link> and <Link href="/blog/tia-942-explained-rated-1-to-rated-4">TIA-942</Link>.</li>
              <li>Check what documents and qualifications employers and authorities require in the country you are targeting.</li>
            </ol>
            <p>This article gives no salary or job-count figures on purpose: they change quickly and differ by employer, so check current listings and surveys for your market.</p>
            <p>Start with the <Link href="/resources/data-center-engineering-career-roadmap">career roadmap</Link>.</p>
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
