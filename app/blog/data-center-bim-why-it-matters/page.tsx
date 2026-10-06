import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-bim-why-it-matters"
const title = "Data Center BIM: Why It Matters"
const description = "What BIM adds to data center projects: coordination, clash detection, quantities, documentation and handover data, and where electrical engineers fit in."

const heroImageSrc = "/bim-training.jpg"
const heroImageAlt = "A 3D building information model of a data center"

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
    "question": "What is BIM?",
    "answer": "Building information modelling is a process of creating and managing a coordinated 3D model whose elements carry data, used by all disciplines across design, construction and operation."
  },
  {
    "question": "Why is BIM used on data centers?",
    "answer": "Because systems are dense and interdependent, and mistakes found on site are expensive. A coordinated model helps find clashes, check clearances and extract quantities early."
  },
  {
    "question": "What does an electrical engineer do in BIM?",
    "answer": "Models or reviews electrical equipment, containment and distribution, keeps data such as ratings and circuit information attached to elements, and takes part in coordination."
  },
  {
    "question": "Is BIM the same as CAD?",
    "answer": "No. CAD produces drawings; BIM produces a data-rich model from which drawings and schedules are generated."
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
          description={"A data center packs power, cooling and containment into a tight space. BIM is how the disciplines see each other's work before anything is built."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center BIM: Why It Matters' and want to know more about the BIM and Revit training."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="why">Why data centers suit BIM</h2>
            <ul>
              <li>Dense routes for busway, cable trays, pipes and ducts compete for the same space.</li>
              <li>Repeated rooms and halls benefit from standard families and views.</li>
              <li>Quantities (cable length, tray, equipment counts) can be taken from the model.</li>
              <li>The model can carry data forward to operations.</li>
            </ul>

            <h2 id="workflow">Where BIM fits in the project</h2>
            <ol>
              <li>Concept and design: model equipment rooms, routes and key spaces.</li>
              <li>Coordination: federate the disciplines' models and resolve clashes. See <Link href="/blog/navisworks-clash-detection-workflow">clash detection workflow</Link>.</li>
              <li>Documentation: generate drawings and schedules from the model.</li>
              <li>Construction and as-built: update the model to match what was installed. See <Link href="/blog/as-built-bim-data-centers">as-built BIM</Link>.</li>
            </ol>

            <h2 id="standards">Information management</h2>
            <p>
              ISO 19650 is the international standard family for managing information over a built asset's life, and many
              projects reference it for BIM requirements. Check what the project's BIM execution plan requires.
            </p>
            <p>
              See also <Link href="/blog/revit-electrical-basics-for-engineers">Revit electrical basics</Link> and the{" "}
              <Link href="/programs/bim-revit-training">BIM and Revit training</Link>.
            </p>
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
