import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "dynamo-for-electrical-engineers-revit"
const title = "Dynamo for Electrical Engineers"
const description = "What Dynamo is, the kinds of repetitive Revit tasks it can automate for electrical work, and a sensible way to start."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "Dynamo visual programming graph for Revit"

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
    "question": "What is Dynamo?",
    "answer": "A visual programming environment, used with Revit, where you connect nodes to automate tasks and process model data."
  },
  {
    "question": "What can electrical engineers automate with it?",
    "answer": "Tasks such as updating parameters in bulk, numbering or naming elements by rule, checking data completeness and exporting data to spreadsheets."
  },
  {
    "question": "Do I need to be a programmer?",
    "answer": "No. Basic logic helps, and many tasks can be built with standard nodes. Complex tasks may use scripting."
  },
  {
    "question": "What is a good first project?",
    "answer": "A small data check or a bulk parameter update on a test model, where mistakes are easy to see."
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
          description={"Dynamo is a visual programming tool that works with Revit. For electrical modelling, its value is in automating repetitive, rule-based tasks."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Dynamo for Electrical Engineers' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="uses">Where it helps</h2>
            <ul>
              <li>Writing values into many parameters at once from a spreadsheet.</li>
              <li>Applying naming and numbering rules to elements.</li>
              <li>Checking that required parameters are filled in before issue.</li>
              <li>Exporting schedules or quantities for review.</li>
            </ul>

            <h2 id="start">How to start</h2>
            <ol>
              <li>Pick one repetitive task you already do by hand.</li>
              <li>Write out the rule in plain steps.</li>
              <li>Build and test on a copy of the model.</li>
              <li>Keep the graph documented so others can reuse it.</li>
            </ol>

            <h2 id="care">Care points</h2>
            <ul>
              <li>Always test on a copy before running on the live model.</li>
              <li>Automation spreads mistakes as quickly as it spreads fixes, so check the output.</li>
            </ul>
            <p>See <Link href="/blog/revit-electrical-basics-for-engineers">Revit electrical basics</Link> and <Link href="/programs/bim-revit-training">BIM and Revit training</Link>.</p>
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
