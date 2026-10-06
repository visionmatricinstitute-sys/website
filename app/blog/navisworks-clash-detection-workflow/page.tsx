import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "navisworks-clash-detection-workflow"
const title = "Navisworks Clash Detection Workflow"
const description = "How clash detection works in Navisworks: federating models, setting clash tests, reviewing and grouping results, assigning fixes and tracking resolution."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "Clash detection results in Navisworks"

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
    "question": "What is a clash?",
    "answer": "Two elements that occupy the same space (a hard clash) or violate a required clearance (a clearance or soft clash)."
  },
  {
    "question": "What does Navisworks do?",
    "answer": "It combines models from different disciplines into one federated model and runs clash tests between selected sets of elements."
  },
  {
    "question": "Who fixes a clash?",
    "answer": "The coordination meeting assigns each clash to the discipline responsible for the change, based on agreed priorities."
  },
  {
    "question": "Why are there so many clashes at first?",
    "answer": "Because early models are uncoordinated and tolerances are loose. Good test setup, grouping and agreed rules reduce noise."
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
          category={"BIM / Revit"}
          title={title}
          description={"Clash detection finds the places where building elements occupy the same space. The skill is in setting up the tests so the results are useful and in closing them out."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Navisworks Clash Detection Workflow' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="steps">The workflow</h2>
            <ol>
              <li><strong>Federate:</strong> combine the discipline models in a shared coordinate system.</li>
              <li><strong>Define tests:</strong> choose which sets clash against which (for example electrical containment against ducts and pipes), with tolerances.</li>
              <li><strong>Run and review:</strong> inspect results, remove false positives and group related clashes.</li>
              <li><strong>Assign:</strong> give each issue an owner and a due date at the coordination meeting.</li>
              <li><strong>Resolve and re-run:</strong> update models and repeat until the agreed clash count is closed.</li>
              <li><strong>Report:</strong> keep a record for the project team.</li>
            </ol>

            <h2 id="types">Hard and clearance clashes</h2>
            <table>
              <thead><tr><th>Type</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td>Hard clash</td><td>A cable tray passing through a duct</td></tr>
                <tr><td>Clearance clash</td><td>A switchboard without the required front access space</td></tr>
              </tbody>
            </table>

            <h2 id="practice">Practical tips</h2>
            <ul>
              <li>Agree coordination zones and priorities before modelling, so fixes follow rules, not arguments.</li>
              <li>Model clearance zones in the families so clearance clashes are caught.</li>
              <li>Close clashes in priority order, with the largest systems fixed first.</li>
            </ul>
            <p>Related: <Link href="/blog/cable-tray-modeling-in-revit">cable tray modeling</Link> and <Link href="/blog/bim-coordination-meeting-process">BIM coordination process</Link>.</p>
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
