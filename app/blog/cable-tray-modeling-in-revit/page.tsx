import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "cable-tray-modeling-in-revit"
const title = "Cable Tray Modeling in Revit"
const description = "How cable trays are modelled in Revit: tray types and fittings, routing and elevations, clearances, and checking fill and weight outside the model."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "Cable trays modelled in Revit above a data hall"

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
    "question": "How do you model cable tray in Revit?",
    "answer": "Place cable tray runs with the cable tray tools, choose the tray type and size, set the elevation or offset, and use fittings for bends, tees and reducers. Exact commands depend on the Revit version."
  },
  {
    "question": "Does Revit check tray fill?",
    "answer": "Fill and weight are normally checked in a calculation, not by the model alone. Use the model for dimensions and clearances and check fill separately."
  },
  {
    "question": "Why model tray so carefully?",
    "answer": "Because tray competes with ducts, pipes and busway for space, and late clashes are costly to fix."
  },
  {
    "question": "What should tray types be named?",
    "answer": "Use a clear naming convention agreed in the BIM execution plan so that schedules and filters work."
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
          description={"Cable tray is one of the biggest clash sources in a data center model. Modelling it well means getting types, elevations and clearances right early."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Cable Tray Modeling in Revit' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="setup">Set up first</h2>
            <ul>
              <li>Define tray types (ladder, perforated, wire mesh) and standard sizes in the template.</li>
              <li>Agree elevations or zones for power, data and other services.</li>
              <li>Set a naming and parameter convention for tags and schedules.</li>
            </ul>

            <h2 id="modelling">Modelling the run</h2>
            <ol>
              <li>Route the main trunks first, leaving room for later branches.</li>
              <li>Set the elevation or offset to the agreed service zone.</li>
              <li>Use fittings at changes of direction and size; keep bend radii suitable for the cables.</li>
              <li>Leave access and maintenance clearance above and beside the tray.</li>
            </ol>

            <h2 id="checks">Checks outside the model</h2>
            <ul>
              <li>Fill and width: see <Link href="/blog/cable-tray-sizing-fill-calculation-example">cable tray sizing</Link>.</li>
              <li>Weight and support spacing against the tray manufacturer's ratings.</li>
              <li>Segregation of power and data, and fire compartments.</li>
            </ul>
            <p>Then run coordination: <Link href="/blog/navisworks-clash-detection-workflow">clash detection workflow</Link>. See also <Link href="/blog/revit-electrical-basics-for-engineers">Revit electrical basics</Link>.</p>
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
