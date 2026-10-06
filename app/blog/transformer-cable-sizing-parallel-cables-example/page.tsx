import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "transformer-cable-sizing-parallel-cables-example"
const title = "Transformer Cable Sizing: LV Secondary Cables in Parallel"
const description = "How to size the cables from a distribution transformer to its LV switchboard: full-load current, parallel runs, short-circuit withstand and voltage drop, with a worked example."

const heroImageSrc = "/data-center-cable-sizing.jpg"
const heroImageAlt = "Transformer secondary cables entering an LV switchboard"

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
    "question": "How do you size cables for a transformer?",
    "answer": "Calculate the full-load current, apply an allowance for overload and growth if the design requires it, divide the current across parallel cables using their derated ratings, then check short-circuit withstand and voltage drop."
  },
  {
    "question": "Why use parallel cables?",
    "answer": "Single cables are limited in size, and very large sizes are hard to handle and terminate. Several smaller cables per phase carry the current more practically."
  },
  {
    "question": "What matters when cables run in parallel?",
    "answer": "They should be the same length, size and material, and laid so they share current evenly. Unequal sharing overloads one cable."
  },
  {
    "question": "Is busduct an alternative?",
    "answer": "Yes, at high currents. See the busduct vs cable comparison."
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
          description={"A large transformer's secondary current is too high for a single cable, so the connection is made with parallel runs. Sizing means choosing how many, then checking the fault case."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Transformer Cable Sizing: LV Secondary Cables in Parallel' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="assumptions">The example and its assumptions</h2>
            <p>
              Illustrative example. A 1,600 kVA transformer, 415 V secondary, 6% impedance. Assume the derated current rating of
              one chosen cable is 650 A (take the real value from the manufacturer's tables for your installation) and the fault
              clears in 0.5 s. Copper XLPE with k assumed as 143.
            </p>

            <h2 id="step-1">Step 1: Full-load current</h2>
            <p>I = 1,600 ÷ (1.732 × 0.415) = <strong>2,226 A</strong>.</p>

            <h2 id="step-2">Step 2: Number of parallel cables per phase</h2>
            <p>
              2,226 ÷ 650 = 3.4, so use <strong>4 cables per phase</strong>. Four cables share the current at about 557 A each.
              Choosing the number first and the size second is common, since the size per cable follows from the derating.
            </p>

            <h2 id="step-3">Step 3: Short-circuit withstand</h2>
            <p>
              The infinite-source fault level is about 2,226 ÷ 0.06 = 37.1 kA. With four cables sharing it, each carries about
              9.3 kA, so the minimum area for each is 9,300 × √0.5 ÷ 143 = about <strong>46 mm²</strong>. That is well below the area the
              ampacity requires, so ampacity governs here. See <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link>.
            </p>

            <h2 id="step-4">Step 4: Voltage drop</h2>
            <p>
              The run from transformer to board is short, so the drop is small, but check it with the formula in the{" "}
              <Link href="/blog/voltage-drop-calculation-formula-examples">voltage drop article</Link> using the current per cable.
            </p>

            <h2 id="notes">Practical points</h2>
            <ul>
              <li>Keep parallel cables the same length and route so they share current evenly.</li>
              <li>Allow for the neutral and earth conductors according to the system.</li>
              <li>Check termination space on the transformer and the board for the number of cables.</li>
              <li>At very high currents, compare with busduct. See <Link href="/blog/busduct-vs-cable-data-center-power-distribution">busduct vs cable</Link>.</li>
            </ul>
            <p>The <Link href="/engineers-toolkit/transformer-sizing-calculator">transformer sizing calculator</Link> gives the full-load current, and the <Link href="/engineers-toolkit/conductor-sizing-calculator">cable sizing calculator</Link> runs the checks.</p>
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
