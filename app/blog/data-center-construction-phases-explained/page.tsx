import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-construction-phases-explained"
const title = "Data Center Construction Phases Explained"
const description = "The usual phases of a data center project from concept to handover: planning, design, procurement, construction, installation, commissioning and operations, with the electrical deliverables in each."

const heroImageSrc = "/hero-data-center.jpg"
const heroImageAlt = "Data center under construction"

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
    "question": "What are the phases of a data center project?",
    "answer": "Commonly: concept and feasibility, design, procurement, construction and installation, commissioning, handover and operation. Phased fit-out of halls often continues after the first handover."
  },
  {
    "question": "Where does electrical design fit?",
    "answer": "Mostly in concept and design, but it continues through procurement (equipment specifications and bid evaluation), construction (site queries) and commissioning (test design and review)."
  },
  {
    "question": "Why are long-lead items important?",
    "answer": "Items such as transformers, switchgear, UPS and generators can take many months to deliver, so their selection and ordering strongly affect the project schedule."
  },
  {
    "question": "What is phased delivery?",
    "answer": "Building the shell and core infrastructure first, then fitting out halls in stages as customers or capacity needs arrive."
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
          category={"Construction"}
          title={title}
          description={"A data center project is a sequence of phases, each handing something specific to the next. Knowing the order shows where electrical engineers contribute and where delays usually start."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Construction Phases Explained' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="phases">The phases</h2>
            <table>
              <thead><tr><th>Phase</th><th>Electrical engineer's work</th></tr></thead>
              <tbody>
                <tr><td>1. Concept and feasibility</td><td>Load estimate, tier target, utility availability. See <Link href="/blog/data-center-site-selection-power-availability">site selection</Link></td></tr>
                <tr><td>2. Design</td><td>Basis of design, single-line diagram, calculations, studies, layouts. See <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link></td></tr>
                <tr><td>3. Procurement</td><td>Specifications, bid evaluation, long-lead orders, factory tests</td></tr>
                <tr><td>4. Construction and installation</td><td>Site queries, inspection, as-built records. See <Link href="/blog/site-engineer-in-data-center-projects">site engineer role</Link></td></tr>
                <tr><td>5. Commissioning</td><td>Test plans and witnessing. See <Link href="/blog/data-center-commissioning-levels-explained">commissioning levels</Link></td></tr>
                <tr><td>6. Handover and operation</td><td>As-built, training, close-out. See <Link href="/blog/as-built-bim-data-centers">as-built BIM</Link></td></tr>
              </tbody>
            </table>

            <h2 id="schedule">Where schedule risk concentrates</h2>
            <ul>
              <li>Utility connection timelines.</li>
              <li>Long-lead equipment delivery.</li>
              <li>Late design changes that ripple through drawings and orders.</li>
              <li>Commissioning compressed at the end of the project.</li>
            </ul>

            <h2 id="phased">Phased fit-out</h2>
            <p>
              Core infrastructure is often sized for the final capacity while halls and some equipment are added in stages. The
              design must define how later phases connect without shutting the live ones down.
            </p>
            <p>Part of the <Link href="/data-center-design">data center design guide</Link>.</p>
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
