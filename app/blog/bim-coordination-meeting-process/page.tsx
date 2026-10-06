import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "bim-coordination-meeting-process"
const title = "BIM Coordination Meeting Process"
const description = "How BIM coordination meetings are run: preparation, agenda, clash review, assigning actions and following up, with tips to keep them productive."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "A BIM coordination meeting reviewing a federated model"

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
    "question": "What is a BIM coordination meeting?",
    "answer": "A regular meeting where the disciplines review the federated model and clash results and agree on actions to resolve conflicts."
  },
  {
    "question": "How often should it happen?",
    "answer": "As the project needs; many projects hold them weekly or fortnightly during design and construction coordination."
  },
  {
    "question": "Who attends?",
    "answer": "A representative of each discipline with authority to change their model, the BIM coordinator, and the project manager where needed."
  },
  {
    "question": "How is progress tracked?",
    "answer": "By an issues log with owners and dates, and by clash counts over time."
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
          description={"A coordination meeting is where the disciplines agree who moves what. A clear process turns it from an argument into a decision."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'BIM Coordination Meeting Process' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="before">Before the meeting</h2>
            <ol>
              <li>Each discipline updates and publishes its model to the agreed deadline.</li>
              <li>The coordinator federates the models and runs the clash tests.</li>
              <li>Results are grouped and the priority issues circulated in advance.</li>
            </ol>

            <h2 id="during">In the meeting</h2>
            <ol>
              <li>Review the priority clashes in the agreed order.</li>
              <li>Decide who changes what, using the agreed priority rules.</li>
              <li>Record each action with an owner and a date.</li>
            </ol>

            <h2 id="after">After</h2>
            <ul>
              <li>Issue the minutes and updated issues log.</li>
              <li>Re-run the tests after the next model update and track the trend.</li>
            </ul>
            <p>The tool side is in <Link href="/blog/navisworks-clash-detection-workflow">Navisworks clash detection workflow</Link>; the bigger picture is in <Link href="/blog/data-center-bim-why-it-matters">data center BIM</Link>.</p>
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
