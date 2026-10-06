import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "uptime-institute-tier-certification-what-it-covers"
const title = "Uptime Institute Tier Certification: What It Covers"
const description = "What Uptime Institute Tier certification is, the stages it covers, what it does and does not assess, and what it means for design teams."

const heroImageSrc = "/data-center-tier-classification.jpg"
const heroImageAlt = "Data center under Tier certification review"

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
    "question": "What is Uptime Institute Tier certification?",
    "answer": "An independent assessment of a data center against the Tier Standard, performed by the Uptime Institute, with Tier levels I to IV."
  },
  {
    "question": "What stages can be certified?",
    "answer": "Commonly the design documents, the constructed facility, and operational sustainability. Check the Uptime Institute for the current programmes and definitions."
  },
  {
    "question": "Does it certify security, cooling technology or IT?",
    "answer": "The Tier Standard focuses on infrastructure topology, redundancy and maintainability, and the operations that sustain it. It does not independently rate every aspect of a facility."
  },
  {
    "question": "Do all data centers need certification?",
    "answer": "No. Many are designed to a Tier level without certifying. Certification is a commercial and risk decision."
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
          description={"Tier certification is an independent review of a data center against the Uptime Institute's Tier Standard. It reviews topology and operations, not everything about a facility."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Uptime Institute Tier Certification: What It Covers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="what">What it is</h2>
            <p>
              An independent review that checks whether a data center's infrastructure meets the criteria for a Tier level. The
              four levels and what separates them are explained in{" "}
              <Link href="/blog/data-center-tier-classification-explained">tier classification explained</Link>.
            </p>

            <h2 id="stages">Stages</h2>
            <ul>
              <li><strong>Design documents:</strong> the design is reviewed before construction.</li>
              <li><strong>Constructed facility:</strong> the built facility is tested to confirm it behaves as the design claims.</li>
              <li><strong>Operational sustainability:</strong> the operating practices that keep the design performing over time.</li>
            </ul>

            <h2 id="scope">What it does and does not cover</h2>
            <p>
              The Tier Standard assesses redundancy and maintainability of the infrastructure. It is not a general quality or
              security rating, and a design that is Tier-compliant on paper can still be poorly run.
            </p>

            <h2 id="design">What it means for the design team</h2>
            <ul>
              <li>The target Tier must be fixed at concept stage, since it shapes the single-line diagram.</li>
              <li>Evidence matters: drawings, calculations and test plans have to show the redundancy claims.</li>
              <li>The commissioning programme must be able to prove concurrent maintainability or fault tolerance. See <Link href="/blog/data-center-commissioning-levels-explained">commissioning levels</Link>.</li>
            </ul>
            <p>Compare with <Link href="/blog/tia-942-explained-rated-1-to-rated-4">TIA-942</Link>.</p>
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
