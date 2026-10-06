import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "iec-60364-data-center-electrical-installations"
const title = "IEC 60364 for Data Center Electrical Installations"
const description = "What the IEC 60364 series covers for low-voltage installations, how it applies to data center design, and how it relates to national codes such as those used in India."

const heroImageSrc = "/data-center-mv-lv-distribution.jpg"
const heroImageAlt = "Low voltage electrical installation in a data center"

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
    "question": "What is IEC 60364?",
    "answer": "A series of international standards for electrical installations of buildings, covering protection for safety, selection and erection of equipment, verification and special installations."
  },
  {
    "question": "Does it apply to data centers?",
    "answer": "Yes, for the low-voltage electrical installation, alongside data center specific requirements and the project specification."
  },
  {
    "question": "How does it relate to national codes?",
    "answer": "Many national wiring codes are based on or aligned with IEC 60364, but the national code governs where it differs. Confirm which applies."
  },
  {
    "question": "Does it cover cable current ratings?",
    "answer": "The series includes parts on the selection and erection of wiring systems, including current-carrying capacity. Use the part and edition cited in the project requirements."
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
          description={"IEC 60364 is the international reference for low-voltage electrical installations. Many national codes are based on it, so its structure is worth knowing even when a local code governs."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'IEC 60364 for Data Center Electrical Installations' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="structure">What the series covers</h2>
            <table>
              <thead><tr><th>Area</th><th>Topic</th></tr></thead>
              <tbody>
                <tr><td>Fundamental principles</td><td>Scope, definitions and general safety principles</td></tr>
                <tr><td>Protection for safety</td><td>Shock, thermal effects, overcurrent and overvoltage</td></tr>
                <tr><td>Selection and erection</td><td>Wiring systems, current ratings, switchgear and earthing</td></tr>
                <tr><td>Verification</td><td>Inspection and testing before and during service</td></tr>
                <tr><td>Special installations</td><td>Requirements for particular locations and uses</td></tr>
              </tbody>
            </table>

            <h2 id="use">Where it enters a data center design</h2>
            <ul>
              <li>Cable sizing, derating and voltage drop. See <Link href="/blog/cable-sizing-basics-for-data-center-electrical-design">cable sizing basics</Link>.</li>
              <li>Earthing system types and protective measures. See <Link href="/blog/data-center-earthing-design-tn-s-bonding">earthing design</Link>.</li>
              <li>Protection against overcurrent and surge.</li>
              <li>Inspection and testing before handover. See the <Link href="/resources/data-center-commissioning-handover-checklist">commissioning checklist</Link>.</li>
            </ul>

            <h2 id="local">Local codes come first</h2>
            <p>
              Where a national code or regulation applies, such as those used in India (see the earthing code in{" "}
              <Link href="/blog/is-3043-earthing-code-summary">IS 3043 summary</Link>), it governs. Use IEC 60364 as the common
              framework and the local code for the requirements that differ.
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
