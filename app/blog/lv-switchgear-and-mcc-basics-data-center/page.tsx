import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "lv-switchgear-and-mcc-basics-data-center"
const title = "LV Switchgear and MCC Basics for Data Centers"
const description = "What LV switchgear and motor control centres are, how main and distribution boards are arranged, the key ratings and the checks for a data center design."

const heroImageSrc = "/data-center-mv-lv-distribution.jpg"
const heroImageAlt = "Low voltage switchboards in a data center"

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
    "question": "What is LV switchgear?",
    "answer": "Assemblies of circuit breakers, busbars and protection that distribute and protect circuits at low voltage, typically up to 1,000 V AC. Main LV boards receive the transformer output and feed distribution boards and motor control centres."
  },
  {
    "question": "What is an MCC?",
    "answer": "A motor control centre groups starters, drives and protection for motors, such as chiller, pump and fan motors, in one assembly."
  },
  {
    "question": "Which standard covers LV assemblies?",
    "answer": "The IEC 61439 series covers low-voltage switchgear and controlgear assemblies. Check the edition and local requirements."
  },
  {
    "question": "What is a form of separation?",
    "answer": "A classification of how busbars, functional units and terminals are separated inside the assembly to limit the spread of a fault and allow safe work on one section."
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
          description={"After the transformer, power reaches the loads through low-voltage switchgear. Here is what it contains, how it is rated and what to check."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'LV Switchgear and MCC Basics for Data Centers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="structure">Typical arrangement</h2>
            <ul>
              <li><strong>Main LV board (MLVS/PCC):</strong> receives transformer or generator supply, with incoming and bus-tie breakers.</li>
              <li><strong>Distribution boards:</strong> feed UPS inputs, mechanical boards, lighting and small power.</li>
              <li><strong>MCC:</strong> motor feeders for the cooling plant.</li>
            </ul>

            <h2 id="ratings">Key ratings</h2>
            <table>
              <thead><tr><th>Rating</th><th>Check</th></tr></thead>
              <tbody>
                <tr><td>Rated current of busbars and breakers</td><td>Design load plus allowance, at the operating temperature inside the enclosure</td></tr>
                <tr><td>Short-circuit withstand and breaking capacity</td><td>Above the prospective fault level at that board</td></tr>
                <tr><td>Form of separation</td><td>Matches the maintenance and availability requirements</td></tr>
                <tr><td>Breaker type</td><td>Air circuit breaker or moulded-case breaker, by current and function</td></tr>
              </tbody>
            </table>

            <h2 id="design">Design checks</h2>
            <ol>
              <li>Size each breaker from the load and the cable it protects. See the <Link href="/engineers-toolkit/breaker-sizing-calculator">breaker sizing calculator</Link>.</li>
              <li>Verify the fault level and that downstream devices discriminate. See <Link href="/blog/protection-coordination-basics-data-center">protection coordination</Link>.</li>
              <li>Check bus-tie and changeover logic for the redundancy scheme.</li>
              <li>Plan metering and monitoring points.</li>
              <li>Allow clearance for access and arc-flash considerations. See <Link href="/blog/arc-flash-basics-data-center-engineers">arc flash basics</Link>.</li>
            </ol>
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
