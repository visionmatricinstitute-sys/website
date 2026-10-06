import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "neutral-conductor-sizing-harmonics-data-centers"
const title = "Neutral Conductor Sizing with Harmonics in Data Centers"
const description = "Why the neutral can carry more current than the phases in a three-phase four-wire system with non-linear loads, a worked example, and how to size and protect the neutral."

const heroImageSrc = "/data-center-cable-sizing.jpg"
const heroImageAlt = "Neutral busbar in an LV distribution board"

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
    "question": "Why can the neutral carry more current than the phases?",
    "answer": "Triplen harmonics (3rd, 9th, 15th) are in phase across all three phases, so they add in the neutral instead of cancelling."
  },
  {
    "question": "How do I size the neutral?",
    "answer": "Estimate the neutral current from the harmonic content of the loads and size the neutral conductor, and any derating of the phase conductors, accordingly. IEC 60364-5-52 gives guidance, with different treatment depending on the third-harmonic content."
  },
  {
    "question": "Should the neutral be larger than the phases?",
    "answer": "Where harmonic content is high, the neutral may need to be the same size as the phases or larger, and the phase conductors may need derating. Take the requirement from the code and a harmonic estimate."
  },
  {
    "question": "How do I reduce neutral harmonic current?",
    "answer": "By choosing equipment with low harmonic distortion, using filters or isolating transformers, and measuring the actual harmonic currents after commissioning."
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
          category={"Electrical Design"}
          title={title}
          description={"In a balanced linear system the neutral carries nothing. With server power supplies, it can carry more than any phase. Sizing it like a phase conductor is a known mistake."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Neutral Conductor Sizing with Harmonics in Data Centers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="why">Why it happens</h2>
            <p>
              In a three-phase four-wire system, the fundamental currents of balanced phases cancel in the neutral. Triplen
              harmonics are in phase across the three phases, so they add together there. Switch-mode server power supplies
              produce strong third-harmonic currents.
            </p>

            <h2 id="example">Worked example</h2>
            <p>
              Illustrative example. Each phase carries a 100 A fundamental plus a third-harmonic current equal to 50% of it (50 A),
              and the phases are balanced.
            </p>
            <ol>
              <li>Phase RMS current = √(100² + 50²) = <strong>112 A</strong></li>
              <li>Neutral current = 3 × 50 A = <strong>150 A</strong>, since the third harmonic adds arithmetically in the neutral</li>
            </ol>
            <p>
              The neutral carries 150 A, about 34% more than each phase. A neutral sized for the phase current would be
              overloaded. Real harmonic content varies, so measure or take it from the equipment data.
            </p>

            <h2 id="design">What to do</h2>
            <ul>
              <li>Estimate the triplen harmonic content of the loads and the resulting neutral current.</li>
              <li>Size the neutral for that current, and apply any phase conductor derating the code requires.</li>
              <li>Provide neutral protection or monitoring where appropriate.</li>
              <li>Consider transformer derating or a harmonic-rated transformer. See <Link href="/blog/harmonics-in-data-centers-sources-and-mitigation">harmonics in data centers</Link>.</li>
            </ul>
            <p>Related: <Link href="/blog/cable-sizing-basics-for-data-center-electrical-design">cable sizing basics</Link> and the <Link href="/engineers-toolkit/conductor-sizing-calculator">conductor sizing calculator</Link>.</p>
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
