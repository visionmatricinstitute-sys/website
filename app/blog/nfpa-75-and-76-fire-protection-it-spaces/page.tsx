import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "nfpa-75-and-76-fire-protection-it-spaces"
const title = "NFPA 75 and NFPA 76: Fire Protection for IT and Telecom Spaces"
const description = "What NFPA 75 and NFPA 76 cover for the protection of IT equipment and telecommunications facilities, and how fire detection and suppression are usually arranged in a data hall."

const heroImageSrc = "/data-center-hot-cold-aisle.jpg"
const heroImageAlt = "Fire detection and suppression in a data hall"

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
    "question": "What is NFPA 75?",
    "answer": "An NFPA standard for the fire protection of information technology equipment and the spaces that house it."
  },
  {
    "question": "What is NFPA 76?",
    "answer": "An NFPA standard for the fire protection of telecommunications facilities."
  },
  {
    "question": "What suppression is used in data halls?",
    "answer": "Clean agent or inert gas systems, water mist, pre-action sprinklers or a combination, chosen with the owner's risk assessment and the local authority's requirements."
  },
  {
    "question": "Are these the only codes?",
    "answer": "No. Local building and fire codes and authority requirements apply, and take precedence where they differ. Use the editions the project names."
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
          category={"Standards"}
          title={title}
          description={"Fire protection in a data center aims to detect fire early and limit damage to the equipment as well as the building. NFPA 75 and NFPA 76 are the usual references."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'NFPA 75 and NFPA 76: Fire Protection for IT and Telecom Spaces' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="scope">What they cover</h2>
            <p>
              NFPA 75 addresses fire protection of IT equipment and the rooms that hold it. NFPA 76 does the same for
              telecommunications facilities. They set requirements on construction, detection, suppression, power shutdown
              and operations.
            </p>

            <h2 id="systems">Typical systems</h2>
            <ul>
              <li><strong>Detection:</strong> early-warning smoke detection, often aspirating detection for very early alarm, plus conventional detectors.</li>
              <li><strong>Suppression:</strong> clean agent or inert gas, water mist or pre-action sprinklers, depending on the risk assessment.</li>
              <li><strong>Power shutdown:</strong> emergency power-off arrangements and their interaction with the UPS.</li>
              <li><strong>Compartmentation:</strong> fire-rated construction and penetration sealing.</li>
            </ul>

            <h2 id="eng">What it means for the electrical engineer</h2>
            <ul>
              <li>Emergency power-off, shunt trips and detector interfaces need to be on the single-line and control drawings.</li>
              <li>Fire alarm and suppression panels need a secure, monitored supply.</li>
              <li>Cable routes and trays must respect fire compartments. See <Link href="/blog/cable-tray-sizing-fill-calculation-example">cable tray sizing</Link>.</li>
              <li>Testing the interaction of fire systems and power is part of integrated testing. See <Link href="/blog/fat-sat-ist-testing-data-center-explained">FAT, SAT and IST</Link>.</li>
            </ul>
            <p>Local codes and the authority having jurisdiction decide the final requirements.</p>
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
