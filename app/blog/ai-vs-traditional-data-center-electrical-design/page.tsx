import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "ai-vs-traditional-data-center-electrical-design"
const title = "AI vs Traditional Data Center Electrical Design"
const description = "How electrical design differs for AI data centers: load size and profile, density, redundancy choices, power quality, and what stays the same."

const heroImageSrc = "/data-center-single-line-diagram.jpg"
const heroImageAlt = "Single-line diagram of a large data center power system"

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
    "question": "Is the electrical architecture different for AI?",
    "answer": "The same building blocks apply: utility, transformers, switchgear, UPS, generators and distribution. The differences are scale, density and load behaviour."
  },
  {
    "question": "Is redundancy the same?",
    "answer": "Redundancy is a business and risk decision. Some AI training workloads tolerate interruptions better than others, so the target can differ from a colocation facility, but it must be stated and designed to."
  },
  {
    "question": "What is different about the load?",
    "answer": "It can be large, dense and change quickly with the workload, which affects UPS, generator and utility interactions."
  },
  {
    "question": "What stays the same?",
    "answer": "Fault levels, protection coordination, earthing, commissioning and the need for stated assumptions all stay."
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
          category={"AI Data Centers"}
          title={title}
          description={"The single-line diagram of an AI facility looks familiar. What changes is the size of every number on it and the way the load behaves."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'AI vs Traditional Data Center Electrical Design' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="compare">Side by side</h2>
            <table>
              <thead><tr><th>Topic</th><th>What changes in AI</th></tr></thead>
              <tbody>
                <tr><td>Load size</td><td>Larger campus and per-hall loads, so larger utility and MV systems</td></tr>
                <tr><td>Density</td><td>More power per rack, so larger busway, PDUs and feeders</td></tr>
                <tr><td>Load profile</td><td>Faster and larger swings from synchronised workloads</td></tr>
                <tr><td>Cooling</td><td>More liquid cooling, so pumps and CDUs join the critical load</td></tr>
                <tr><td>Redundancy</td><td>Chosen per workload tolerance; must be explicit</td></tr>
              </tbody>
            </table>

            <h2 id="same">What stays the same</h2>
            <ul>
              <li>Load calculation discipline. See <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link>.</li>
              <li>Short-circuit, protection and arc-flash studies. See <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link>.</li>
              <li>Earthing, commissioning and handover. See <Link href="/blog/data-center-commissioning-levels-explained">commissioning levels</Link>.</li>
            </ul>

            <h2 id="watch">Points to watch</h2>
            <ul>
              <li>Check generator and UPS behaviour under rapid load swings with the manufacturers.</li>
              <li>Size cooling plant power and its redundancy as critical load.</li>
              <li>Keep assumptions about rack power explicit and tied to vendor data.</li>
            </ul>
            <p>See also <Link href="/blog/ai-data-centers-explained">AI data centers explained</Link> and the <Link href="/data-center-design">data center design guide</Link>.</p>
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
