import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "types-of-data-centers-enterprise-colocation-hyperscale-edge"
const title = "Types of Data Centers: Enterprise, Colocation, Hyperscale and Edge"
const description = "The main types of data centers, who owns and uses each, how their design priorities differ, and what that means for the electrical and mechanical engineer."

const heroImageSrc = "/hero-data-center.jpg"
const heroImageAlt = "Rows of server racks in a data center hall"

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
    "question": "What are the main types of data centers?",
    "answer": "Enterprise, colocation, hyperscale and edge are the common categories. Cloud and managed-service data centers are often hyperscale or colocation facilities operated for a provider."
  },
  {
    "question": "What is a colocation data center?",
    "answer": "A facility where a provider rents space, power and cooling to multiple customers who bring their own IT equipment."
  },
  {
    "question": "What is an edge data center?",
    "answer": "A smaller facility placed close to users or devices to reduce latency, usually with a lower power capacity than a central site."
  },
  {
    "question": "Which type needs the most electrical design work?",
    "answer": "All of them need electrical design; the work differs in scale and in what is standardised. Hyperscale designs repeat a standard design at large scale, while enterprise and colocation sites often involve more bespoke design."
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
          category={"Technical Basics"}
          title={title}
          description={"Data centers are grouped by who owns them and who uses them, and that decides how they are designed. Here are the four common types and what each means for the engineer."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the types of data centers article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="types">The four common types</h2>
            <ul>
              <li><strong>Enterprise:</strong> built, owned and operated by one organisation for its own IT. Design follows that organisation's requirements and risk tolerance.</li>
              <li><strong>Colocation:</strong> a provider rents space, power and cooling to many customers. Reliability targets, often expressed by tier level, are a selling point, so design aims at a published standard.</li>
              <li><strong>Hyperscale:</strong> very large facilities run by cloud and internet companies. Designs are standardised and repeated, with attention to efficiency and speed of construction.</li>
              <li><strong>Edge:</strong> smaller sites close to users or devices, designed for low latency and often unmanned.</li>
            </ul>

            <h2 id="differences">Why the type matters for design</h2>
            <table>
              <thead><tr><th>Type</th><th>Typical design priority</th></tr></thead>
              <tbody>
                <tr><td>Enterprise</td><td>Fit to the owner's requirements and risk profile</td></tr>
                <tr><td>Colocation</td><td>Published reliability level, flexibility for different customers</td></tr>
                <tr><td>Hyperscale</td><td>Repeatable design, efficiency, scale</td></tr>
                <tr><td>Edge</td><td>Compactness, remote operation, low latency</td></tr>
              </tbody>
            </table>

            <h2 id="engineer">What it means for the engineer</h2>
            <p>
              The electrical design process is the same in outline: set the load and reliability target, then engineer the
              power system to meet it. What changes is how much is standardised and who owns the requirement. See the{" "}
              <Link href="/data-center-design">data center design guide</Link>, the{" "}
              <Link href="/blog/data-center-tier-classification-explained">tier classification explainer</Link> and the basics in{" "}
              <Link href="/blog/what-is-a-data-center-components-and-how-it-works">what is a data center</Link>. For how the first two compare for a customer, see{" "}
              <Link href="/blog/hyperscale-vs-colocation-data-centers">hyperscale vs colocation</Link>.
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
