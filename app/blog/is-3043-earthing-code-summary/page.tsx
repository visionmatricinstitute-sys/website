import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "is-3043-earthing-code-summary"
const title = "IS 3043 Earthing Code Summary for Engineers"
const description = "A plain summary of what the Indian earthing code of practice IS 3043 covers, how it relates to IEC practice, and how to use it in a data center design."

const heroImageSrc = "/data-center-earthing-bonding.jpg"
const heroImageAlt = "Earthing system components covered by the Indian earthing code"

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
    "question": "What is IS 3043?",
    "answer": "The Bureau of Indian Standards code of practice for earthing, covering principles, earthing systems, electrodes, conductors and testing."
  },
  {
    "question": "Does it replace IEC practice?",
    "answer": "For Indian projects the Indian code and regulations are normally the starting point, with IEC references used where the project requires them. Confirm which governs."
  },
  {
    "question": "What does it say about earth resistance targets?",
    "answer": "Targets depend on the installation type and the project specification. Take the value from the code and the specification, not from a general rule."
  },
  {
    "question": "Do other Indian regulations matter?",
    "answer": "Yes. Electrical safety regulations from the relevant authority also apply. Check the current regulations for the project."
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
          description={"IS 3043 is the Indian code of practice for earthing. It sets out the principles of earthing design, electrodes, conductors and testing that Indian projects refer to."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'IS 3043 Earthing Code Summary for Engineers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="covers">What it covers</h2>
            <ul>
              <li>The purpose and principles of earthing for safety and protection.</li>
              <li>Earthing systems and how the supply arrangement affects the choice.</li>
              <li>Earth electrodes, their types and installation.</li>
              <li>Earthing conductors and bonding.</li>
              <li>Testing and maintenance of earthing installations.</li>
            </ul>

            <h2 id="use">Using it in a data center</h2>
            <ol>
              <li>Measure the soil resistivity before designing electrodes.</li>
              <li>Choose the system type to suit the utility supply and protection design.</li>
              <li>Design a bonding network for racks, trays and structure. See <Link href="/blog/data-center-earthing-design-tn-s-bonding">earthing design</Link>.</li>
              <li>Bond the lightning protection earth to the main earth. See <Link href="/blog/lightning-protection-data-center-basics">lightning protection</Link>.</li>
              <li>Test on installation and at intervals, and record the results.</li>
            </ol>
            <p>
              Calculations for rod or plate resistance can be checked with the{" "}
              <Link href="/engineers-toolkit/grounding-resistance-calculator">earthing resistance calculator</Link>; compare with the
              international framework in <Link href="/blog/iec-60364-data-center-electrical-installations">IEC 60364</Link>.
            </p>
            <p>This is a summary, not a replacement for the code itself. Use the current edition.</p>
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
