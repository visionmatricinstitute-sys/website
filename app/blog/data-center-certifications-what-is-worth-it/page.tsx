import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-certifications-what-is-worth-it"
const title = "Data Center Certifications: What Is Worth It"
const description = "An overview of the kinds of data center certifications available to engineers, what each type proves, and how to decide which to pursue, without endorsing a single credential."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "Certificates and credentials for data center professionals"

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
    "question": "Which data center certifications exist?",
    "answer": "Examples include design-focused credentials such as the Uptime Institute's Accredited Tier Designer, professional-level programmes from training bodies such as EPI (CDCP and CDCS), and design credentials from organisations such as BICSI. Check current offerings and requirements."
  },
  {
    "question": "Is a certification more valuable than a project?",
    "answer": "For most employers, demonstrated project work counts heavily. A certification can supplement it, and some roles specify one."
  },
  {
    "question": "How should I choose?",
    "answer": "Match it to the role, check who recognises it in your target market, compare cost and prerequisites, and ask people working in the role."
  },
  {
    "question": "Do I need one to get started?",
    "answer": "Usually not. A strong foundation and a complete project often matter more at the start."
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
          description={"Certifications can help, but only if they match the role you want. Here is how to think about the options."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Certifications: What Is Worth It' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="types">Types of credential</h2>
            <table>
              <thead><tr><th>Type</th><th>What it shows</th></tr></thead>
              <tbody>
                <tr><td>Design and tier credentials</td><td>Knowledge of topology and tier requirements</td></tr>
                <tr><td>Operations and professional programmes</td><td>Broad understanding of data center operation and management</td></tr>
                <tr><td>Infrastructure and cabling credentials</td><td>Design of telecommunications and pathway infrastructure</td></tr>
                <tr><td>Vendor and software certifications</td><td>Skill with a product or tool</td></tr>
                <tr><td>Professional engineering registration</td><td>Recognised professional status in a country</td></tr>
              </tbody>
            </table>
            <p>Names, requirements and recognition change, so confirm them with the issuing body before spending money.</p>

            <h2 id="choose">How to choose</h2>
            <ol>
              <li>Decide the role you want (design, site, commissioning).</li>
              <li>Read postings for that role and note which credentials they ask for.</li>
              <li>Check the prerequisites, cost, renewal and how widely it is recognised.</li>
              <li>Put project evidence first. See the <Link href="/resources/data-center-engineering-career-roadmap">career roadmap</Link>.</li>
            </ol>
            <p>Related: <Link href="/blog/uptime-institute-tier-certification-what-it-covers">Uptime tier certification</Link> (a facility certification, different from a personal credential).</p>
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
