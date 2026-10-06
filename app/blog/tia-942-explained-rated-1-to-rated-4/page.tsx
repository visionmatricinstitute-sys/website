import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "tia-942-explained-rated-1-to-rated-4"
const title = "TIA-942 Explained: Rated-1 to Rated-4"
const description = "What the TIA-942 data center standard covers, how its four Rated levels work, how it relates to the Uptime tiers, and how engineers use it."

const heroImageSrc = "/data-center-tier-classification.jpg"
const heroImageAlt = "Data center infrastructure covered by the TIA-942 standard"

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
    "question": "What is TIA-942?",
    "answer": "A standard from the Telecommunications Industry Association that specifies minimum requirements for data center infrastructure, covering site, architecture, electrical, mechanical, telecommunications cabling and fire and security."
  },
  {
    "question": "What are Rated-1 to Rated-4?",
    "answer": "Four levels of infrastructure rating, from basic (Rated-1) to fault tolerant (Rated-4), with increasing redundancy and protection requirements."
  },
  {
    "question": "Is TIA-942 the same as the Uptime Tier standard?",
    "answer": "No. They are separate frameworks with their own criteria and certification processes. Levels map loosely but not identically, so say which one a design claims."
  },
  {
    "question": "Is the standard updated?",
    "answer": "Yes, it is revised periodically. Use the edition named in the project requirements and confirm requirements against the published standard."
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
          category={"Standards"}
          title={title}
          description={"TIA-942 is a standard for data center infrastructure that spans telecommunications, electrical, mechanical, architectural and security. Its four Rated levels are often confused with the Uptime tiers."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'TIA-942 Explained: Rated-1 to Rated-4' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="scope">What it covers</h2>
            <ul>
              <li>Site selection and architectural requirements.</li>
              <li>Electrical and mechanical systems and their redundancy.</li>
              <li>Telecommunications cabling infrastructure.</li>
              <li>Fire protection and physical security.</li>
            </ul>

            <h2 id="ratings">The four Rated levels</h2>
            <table>
              <thead><tr><th>Level</th><th>General idea</th></tr></thead>
              <tbody>
                <tr><td>Rated-1</td><td>Basic: single path, no redundancy</td></tr>
                <tr><td>Rated-2</td><td>Redundant components, still a single path</td></tr>
                <tr><td>Rated-3</td><td>Concurrently maintainable: planned work without shutting down the load</td></tr>
                <tr><td>Rated-4</td><td>Fault tolerant: continues through a single failure</td></tr>
              </tbody>
            </table>
            <p>This is a summary of the idea; the standard's own requirements define each level.</p>

            <h2 id="uptime">Relation to the Uptime tiers</h2>
            <p>
              The two frameworks are similar in spirit but not the same. A design that claims a level should state which
              framework and which criteria it meets. See <Link href="/blog/data-center-tier-classification-explained">tier classification explained</Link>
              and <Link href="/blog/uptime-institute-tier-certification-what-it-covers">Uptime tier certification</Link>.
            </p>

            <h2 id="use">How engineers use it</h2>
            <ul>
              <li>As a checklist of infrastructure requirements for the target level.</li>
              <li>In RFP compliance matrices, where a mismatch with the standard is an easy finding.</li>
              <li>For cabling and pathway design alongside the electrical and mechanical design.</li>
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
