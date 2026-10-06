import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "revit-electrical-basics-for-engineers"
const title = "Revit Electrical Basics for Engineers"
const description = "The basic elements of electrical modelling in Revit: equipment, circuits, panels, schedules, containment and views, and how they fit into a project workflow."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "Electrical elements modelled in Autodesk Revit"

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
    "question": "What can Revit do for electrical design?",
    "answer": "Model electrical equipment and containment, define circuits and panels, generate panel schedules and drawings, and share the model for coordination."
  },
  {
    "question": "Do I need to know Revit architecture first?",
    "answer": "You need the basics of the interface, levels, grids and views, which are the same across disciplines, plus the electrical tools."
  },
  {
    "question": "What is a family?",
    "answer": "A family is a parametric object in Revit, such as a switchboard or luminaire. Quality families make the model reliable."
  },
  {
    "question": "Does Revit replace calculation tools?",
    "answer": "No. Load flow, short circuit and cable sizing are done in calculation tools or spreadsheets. Revit holds the model and data and can use results as parameters."
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
          description={"Revit's electrical tools let you model equipment and containment and keep circuit data attached to the elements. This is the shape of the workflow, not a button-by-button guide."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Revit Electrical Basics for Engineers' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="elements">The building blocks</h2>
            <ul>
              <li><strong>Levels, grids and views:</strong> the framework every discipline shares.</li>
              <li><strong>Electrical equipment:</strong> switchboards, transformers, UPS, PDUs and distribution boards placed as families.</li>
              <li><strong>Containment:</strong> cable tray, conduit and fittings. See <Link href="/blog/cable-tray-modeling-in-revit">cable tray modeling</Link>.</li>
              <li><strong>Circuits and panels:</strong> circuits connect loads to panels so schedules can be generated.</li>
              <li><strong>Schedules and sheets:</strong> tables and drawings produced from the model.</li>
            </ul>

            <h2 id="workflow">A basic workflow</h2>
            <ol>
              <li>Link the architectural and structural models and set up levels and views.</li>
              <li>Place electrical equipment from your families.</li>
              <li>Model containment routes and check clearances.</li>
              <li>Create circuits and panel schedules where the project needs them.</li>
              <li>Run coordination checks and issue sheets.</li>
            </ol>

            <h2 id="data">Data matters as much as geometry</h2>
            <p>
              Ratings, tags, circuit numbers and load values live in parameters. Consistent parameters let you schedule and
              check the model. See <Link href="/blog/revit-electrical-families-creating-and-managing">electrical families</Link>.
            </p>
            <p>Part of the <Link href="/blog/data-center-bim-why-it-matters">data center BIM overview</Link>; the training is described in the <Link href="/programs/bim-revit-training">BIM and Revit program</Link>.</p>
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
