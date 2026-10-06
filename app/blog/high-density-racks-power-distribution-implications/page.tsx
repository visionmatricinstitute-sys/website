import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "high-density-racks-power-distribution-implications"
const title = "High-Density Racks: Power Distribution Implications"
const description = "What changes in power distribution when racks draw far more power: feeder and busway sizing, PDUs, three-phase distribution, cable and heat issues, and redundancy."

const heroImageSrc = "/data-center-pdu-explained.jpg"
const heroImageAlt = "High-density rack power distribution units"

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
    "question": "What is a high-density rack?",
    "answer": "A rack drawing much more power than a conventional one. The threshold is not fixed and keeps moving as equipment changes."
  },
  {
    "question": "How does density change power distribution?",
    "answer": "Higher current per rack needs larger feeders or busway, higher-rated PDUs and breakers, and often three-phase distribution at higher currents."
  },
  {
    "question": "What about redundancy at the rack?",
    "answer": "With dual power paths (A and B), each path must carry the full rack load if the other is lost, so each path is sized for the whole rack."
  },
  {
    "question": "Does it affect cooling?",
    "answer": "Yes. Almost all of the extra power becomes heat that must be removed, which is why high density usually involves liquid cooling."
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
          description={"A rack that draws many times the usual power stresses every part of the chain behind it: the busway, the PDU, the breakers and the cooling that removes the heat."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'High-Density Racks: Power Distribution Implications' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="current">Current scales with power</h2>
            <p>
              For a three-phase feed, I = P ÷ (√3 × V × power factor). A higher-power rack on the same voltage means more current
              per rack, so conductors, busway and PDUs have to be larger.
            </p>
            <p>Example (illustrative): 60 kW at 415 V and 0.95 power factor gives 60,000 ÷ (1.732 × 415 × 0.95) ≈ 88 A on each feed in total, before any redundancy allowance.</p>

            <h2 id="path">What to re-check</h2>
            <ul>
              <li><strong>Busway and feeders:</strong> ratings, short-circuit withstand and heat in the enclosure. See <Link href="/blog/busduct-vs-cable-data-center-power-distribution">busduct vs cable</Link>.</li>
              <li><strong>PDUs and breakers:</strong> rating, branch circuit arrangement and metering. See <Link href="/blog/pdu-power-distribution-unit-explained">PDU explained</Link>.</li>
              <li><strong>Redundancy:</strong> each of the A and B paths carries the full rack load after a failure.</li>
              <li><strong>Cooling:</strong> the thermal load per rack and the heat rejection chain. See <Link href="/blog/data-center-cooling-systems-explained">cooling systems</Link>.</li>
            </ul>

            <h2 id="voltage">Higher voltage helps</h2>
            <p>
              Raising the distribution voltage reduces current for the same power, which is one reason new rack power
              architectures are being explored. See <Link href="/blog/800-vdc-data-center-power-explained">800 VDC explained</Link>.
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
