import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "as-built-bim-data-centers"
const title = "As-Built BIM for Data Centers"
const description = "What an as-built BIM model is, why it matters for operations, how to capture changes during construction, and the common gaps."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "As-built BIM model used for data center operations"

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
    "question": "What is as-built BIM?",
    "answer": "A model updated to reflect the installed condition of the facility, including changes made during construction and the data from handover."
  },
  {
    "question": "Why does it matter in a data center?",
    "answer": "Operators need accurate locations, ratings and connections to maintain equipment, plan changes and respond to faults."
  },
  {
    "question": "How do changes get captured?",
    "answer": "Through a controlled process: site changes are logged, verified (for example by survey) and fed back into the model."
  },
  {
    "question": "What is the usual gap?",
    "answer": "The model is not updated after changes made on site, so the handover documentation does not match the building."
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
          description={"The design model is not the building. An as-built model records what was actually installed, which is what operations will rely on for the next decades."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'As-Built BIM for Data Centers' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="why">Why it matters</h2>
            <p>
              Maintenance, expansion and fault response all depend on knowing what is where. An as-built model that matches
              the installed system saves time and reduces risk in operation.
            </p>

            <h2 id="capture">Capturing changes</h2>
            <ol>
              <li>Log every site change with its reason and the affected elements.</li>
              <li>Verify the installed condition, for example with survey or inspection.</li>
              <li>Update the model and its data to match, and record the version.</li>
              <li>Reconcile drawings, schedules and the single-line diagram with the model at handover.</li>
            </ol>

            <h2 id="data">What to hand over</h2>
            <ul>
              <li>The updated model and extracted drawings and schedules.</li>
              <li>Equipment data (ratings, manufacturers, serial numbers where required).</li>
              <li>Test and commissioning records. See the <Link href="/resources/data-center-commissioning-handover-checklist">commissioning and handover checklist</Link>.</li>
            </ul>
            <p>Related: <Link href="/blog/lod-bim-level-of-development-explained">LOD explained</Link>.</p>
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
