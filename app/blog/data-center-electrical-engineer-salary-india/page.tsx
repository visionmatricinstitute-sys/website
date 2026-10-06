import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-electrical-engineer-salary-india"
const title = "Data Center Electrical Engineer Salary in India: What Drives It"
const description = "What determines a data center electrical engineer's pay in India, the factors that move it, and how to check current ranges honestly rather than trusting a single number."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "A data center electrical engineer reviewing project drawings"

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
    "question": "How much does a data center electrical engineer earn in India?",
    "answer": "It varies by experience, employer type, city, role (design, site or commissioning) and skills. Check current job listings and salary surveys for a range that reflects today's market, rather than relying on a fixed figure."
  },
  {
    "question": "What factors increase pay?",
    "answer": "Relevant project experience, ability to design and calculate independently, software skills such as ETAP and Revit, familiarity with data center standards, and moving from site to design or leadership roles."
  },
  {
    "question": "Do design roles pay differently from site roles?",
    "answer": "They can, and the mix of allowances, travel and responsibilities differs. Compare the full package, not just the base figure."
  },
  {
    "question": "Where can I find reliable data?",
    "answer": "Current job postings, salary surveys from recruiters and employer reports, and discussions with people in the role. Treat any single figure with caution."
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
          description={"Salary articles tend to quote one number. Pay actually depends on a handful of factors you can influence, and on current market data you should check yourself."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Electrical Engineer Salary in India: What Drives It' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="drivers">What moves pay</h2>
            <table>
              <thead><tr><th>Factor</th><th>Why it matters</th></tr></thead>
              <tbody>
                <tr><td>Experience on real projects</td><td>Delivered designs and sites matter more than years alone</td></tr>
                <tr><td>Role type</td><td>Design, site, commissioning and project management have different pay structures</td></tr>
                <tr><td>Employer type</td><td>Developers, consultants, contractors and operators pay differently</td></tr>
                <tr><td>Location</td><td>City and country affect both pay and cost of living</td></tr>
                <tr><td>Skills</td><td>Calculations, studies, ETAP, Revit and standards knowledge</td></tr>
              </tbody>
            </table>

            <h2 id="check">How to check current ranges</h2>
            <ol>
              <li>Read current job postings for the role and city, and note any ranges they give.</li>
              <li>Check recent recruiter or industry salary surveys, noting their date and sample.</li>
              <li>Speak to engineers in similar roles.</li>
              <li>Compare total package: base, allowances, benefits, travel and growth.</li>
            </ol>

            <h2 id="raise">What you can influence</h2>
            <ul>
              <li>Build calculation and design skills. See the <Link href="/resources/data-center-engineering-career-roadmap">career roadmap</Link>.</li>
              <li>Learn the tools employers ask for. See <Link href="/blog/data-center-engineer-skills-roadmap">skills roadmap</Link>.</li>
              <li>Document a complete project you can show.</li>
            </ul>
            <p>This article gives no salary or job-count figures on purpose: they change quickly and differ by employer, so check current listings and surveys for your market.</p>
            <p>Background: <Link href="/blog/how-to-become-a-data-center-electrical-design-engineer-in-india">how to become a data center electrical design engineer in India</Link>.</p>
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
