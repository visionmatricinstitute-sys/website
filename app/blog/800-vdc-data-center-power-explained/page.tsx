import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "800-vdc-data-center-power-explained"
const title = "800 VDC Data Center Power Explained"
const description = "What the proposed move towards 800 V DC power distribution in data centers means, why higher voltage helps, and what is still uncertain."

const heroImageSrc = "/data-center-ups-vs-generator.jpg"
const heroImageAlt = "Power conversion equipment in a data center"

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
    "question": "What is 800 VDC in a data center?",
    "answer": "A proposed distribution approach that delivers DC power at about 800 volts to the rack or row, instead of the traditional AC chain with several conversion stages."
  },
  {
    "question": "Why higher voltage?",
    "answer": "For the same power, higher voltage means lower current, so conductors can be smaller and I²R losses lower. DC distribution can also reduce the number of conversion stages."
  },
  {
    "question": "Is it available now?",
    "answer": "It has been announced as a direction by industry players, including NVIDIA with partners. Status, products and standards are developing, so check current sources before relying on it."
  },
  {
    "question": "Does it change protection and safety?",
    "answer": "Yes. DC protection, arc behaviour and safe work practices differ from AC, which is part of the open engineering and standards work."
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
          description={"Higher-voltage DC distribution has been proposed as a way to deliver megawatt-scale racks with less copper and fewer conversion stages. It is a direction, not yet a settled standard."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article '800 VDC Data Center Power Explained' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="why">The physics</h2>
            <p>
              Power equals voltage times current. At a fixed power, doubling the voltage halves the current. Lower current
              means smaller conductors and lower resistive losses (proportional to the square of the current).
            </p>
            <p>
              Example (illustrative): delivering 1 MW at 800 V DC needs about 1,250 A (1,000,000 ÷ 800), while 1 MW at 415 V three
              phase and 0.95 power factor needs about 1,465 A. Rack-level DC distribution also removes some AC-DC conversion
              stages.
            </p>

            <h2 id="status">Status and caution</h2>
            <ul>
              <li>The approach has been put forward for future high-power rack designs and has industry backing.</li>
              <li>Product availability, standards, protection practice and safety rules are still maturing.</li>
              <li>Design decisions today should treat it as an option to track, not an assumption.</li>
            </ul>

            <h2 id="eng">What engineers should watch</h2>
            <ul>
              <li>DC protection and fault interruption, which differ from AC practice.</li>
              <li>Safety, labelling and training for DC systems.</li>
              <li>How it fits with batteries and backup power. See <Link href="/blog/ups-topologies-explained">UPS topologies</Link>.</li>
            </ul>
            <p>Context: <Link href="/blog/high-density-racks-power-distribution-implications">high-density rack power distribution</Link> and <Link href="/blog/ai-data-centers-explained">AI data centers explained</Link>.</p>
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
