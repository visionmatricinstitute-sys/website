import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "revit-electrical-families-creating-and-managing"
const title = "Revit Electrical Families: Creating and Managing"
const description = "What Revit families are, how electrical equipment families are structured, what makes a good one, and how to manage a library."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "Electrical equipment families in a Revit library"

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
    "question": "What is a Revit family?",
    "answer": "A parametric object definition, such as a switchboard or luminaire, that can be placed repeatedly with its own type and instance parameters."
  },
  {
    "question": "What should an electrical family include?",
    "answer": "Accurate dimensions and clearance zones, correct category and connectors, and parameters for the data the project needs, such as rating, tag and manufacturer."
  },
  {
    "question": "Should I build or download families?",
    "answer": "Manufacturer families save time, but check quality, size, file weight and parameters before adopting them."
  },
  {
    "question": "How do I keep a library under control?",
    "answer": "Use a naming convention, a template, a review step before families enter the project, and version control."
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
          description={"A model is only as good as its families. A good electrical family is the right size, carries the right data and behaves predictably when placed."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Revit Electrical Families: Creating and Managing' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="structure">What a family contains</h2>
            <ul>
              <li><strong>Geometry:</strong> simple and accurate; heavy detail slows the model.</li>
              <li><strong>Category and connectors:</strong> so the family behaves as electrical equipment and can connect to circuits.</li>
              <li><strong>Parameters:</strong> rating, voltage, manufacturer, mark, and any data the schedules need.</li>
              <li><strong>Clearance zones:</strong> access space in front of switchboards, for example, so clashes catch them.</li>
            </ul>

            <h2 id="quality">What makes a family good</h2>
            <ol>
              <li>Real-world dimensions, checked against the datasheet.</li>
              <li>Light geometry and a controlled file size.</li>
              <li>Consistent parameter names across the library.</li>
              <li>Level of development matched to the stage. See <Link href="/blog/lod-bim-level-of-development-explained">LOD explained</Link>.</li>
            </ol>

            <h2 id="library">Managing a library</h2>
            <ul>
              <li>One agreed template and naming convention.</li>
              <li>A review step before a family enters a project.</li>
              <li>A single owner for updates, with a record of changes.</li>
            </ul>
            <p>See <Link href="/blog/revit-electrical-basics-for-engineers">Revit electrical basics</Link>.</p>
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
