import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-architecture-spaces-layers-and-layout"
const title = "Data Center Architecture: Spaces, Layers and Layout"
const description = "How a data center is organised physically: the white space, power and cooling rooms, support spaces, and how the architectural layout follows the power and cooling paths."

const heroImageSrc = "/data-center-redundancy-explained.jpg"
const heroImageAlt = "Plan of a data center showing halls and support rooms"

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
    "question": "What are the main spaces in a data center?",
    "answer": "The white space (data halls), electrical rooms, battery rooms, generator and fuel areas, mechanical plant spaces, telecommunications entrance rooms, and support areas such as offices and loading."
  },
  {
    "question": "What is white space?",
    "answer": "The area where IT equipment racks are installed. The surrounding technical spaces are sometimes called grey space."
  },
  {
    "question": "How does the layout follow redundancy?",
    "answer": "Redundant paths are usually physically separated, so a fire or fault in one room does not take out both. This shapes where rooms and routes sit."
  },
  {
    "question": "Why does layout matter so much?",
    "answer": "It is hard to change once built. Cable and pipe routes, access, floor loading and expansion all depend on it."
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
          category={"Technical"}
          title={title}
          description={"Data center architecture is the physical organisation of the building. It follows the power and cooling paths, and mistakes in layout are hard to fix later."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Architecture: Spaces, Layers and Layout' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="spaces">The main spaces</h2>
            <table>
              <thead><tr><th>Space</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>White space</td><td>Data halls with racks</td></tr>
                <tr><td>Electrical rooms</td><td>Transformers, switchgear, UPS and distribution</td></tr>
                <tr><td>Battery rooms</td><td>UPS batteries, with their own ventilation and safety rules</td></tr>
                <tr><td>Generator area and fuel</td><td>Backup generation and fuel storage</td></tr>
                <tr><td>Mechanical plant</td><td>Chillers, pumps, air handling and heat rejection</td></tr>
                <tr><td>Telecom entrance and meet-me rooms</td><td>Connectivity into the facility</td></tr>
                <tr><td>Support</td><td>Security, offices, loading, storage</td></tr>
              </tbody>
            </table>

            <h2 id="paths">The layout follows the paths</h2>
            <ul>
              <li><strong>Power:</strong> utility to MV and LV rooms, through UPS to the halls, with redundant paths separated. See <Link href="/blog/mv-lv-power-distribution-architecture-explained">MV/LV distribution</Link>.</li>
              <li><strong>Cooling:</strong> plant spaces connect to halls by pipe or duct routes. See <Link href="/blog/data-center-cooling-systems-explained">cooling systems</Link>.</li>
              <li><strong>Expansion:</strong> halls and rooms are planned in phases, with space and routes reserved for later phases.</li>
            </ul>

            <h2 id="check">What to check</h2>
            <ol>
              <li>Physical separation of redundant paths.</li>
              <li>Access for equipment delivery and replacement.</li>
              <li>Floor loading for heavy items such as batteries and transformers.</li>
              <li>Fire compartments and cable penetration routes. See <Link href="/blog/nfpa-75-and-76-fire-protection-it-spaces">NFPA 75 and 76</Link>.</li>
            </ol>
            <p>Basics: <Link href="/blog/what-is-a-data-center-components-and-how-it-works">what is a data center</Link>.</p>
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
