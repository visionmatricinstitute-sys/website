import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "revit-vs-autocad-for-electrical-design"
const title = "Revit vs AutoCAD for Electrical Design"
const description = "How Revit and AutoCAD differ for electrical design work: model versus drawing, coordination, documentation and effort, and when each is the better fit."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "Electrical design in Revit and AutoCAD side by side"

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
    "question": "What is the main difference?",
    "answer": "AutoCAD is drawing-based: each drawing is separate geometry. Revit is model-based: views and schedules are generated from a single model, so a change updates them together."
  },
  {
    "question": "Which is better for data centers?",
    "answer": "Revit suits coordination-heavy projects with many disciplines. AutoCAD remains common for schematic drawings and smaller jobs. Many projects use both."
  },
  {
    "question": "Do I need to learn both?",
    "answer": "Most electrical designers benefit from knowing both, since AutoCAD is still widely used and Revit is increasingly required on coordinated projects."
  },
  {
    "question": "Is Revit harder to learn?",
    "answer": "It has a steeper start because of the model approach, but it saves effort on coordination and documentation later."
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
          description={"Both are used on electrical projects, but they work differently. AutoCAD produces drawings; Revit produces a model that the drawings come from."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Revit vs AutoCAD for Electrical Design' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="compare">Side by side</h2>
            <table>
              <thead><tr><th></th><th>AutoCAD</th><th>Revit</th></tr></thead>
              <tbody>
                <tr><td>Approach</td><td>Drawing-based</td><td>Model-based</td></tr>
                <tr><td>Coordination</td><td>Overlay 2D drawings</td><td>Federated 3D models and clash detection</td></tr>
                <tr><td>Schedules and quantities</td><td>Compiled separately</td><td>Generated from the model</td></tr>
                <tr><td>Changes</td><td>Update each drawing</td><td>Update the model once, views follow</td></tr>
                <tr><td>Best suited to</td><td>Schematics, details, smaller jobs</td><td>Coordinated multidiscipline projects</td></tr>
              </tbody>
            </table>

            <h2 id="choose">Choosing</h2>
            <ul>
              <li>Single-line diagrams and schematics are commonly drawn in 2D CAD even on Revit projects.</li>
              <li>Containment, equipment layouts and coordination benefit from a model.</li>
              <li>The client's BIM requirements may decide it. Check the contract.</li>
            </ul>
            <p>See <Link href="/programs/autocad-training">AutoCAD training</Link>, <Link href="/programs/bim-revit-training">BIM and Revit training</Link> and <Link href="/blog/revit-electrical-basics-for-engineers">Revit electrical basics</Link>.</p>
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
