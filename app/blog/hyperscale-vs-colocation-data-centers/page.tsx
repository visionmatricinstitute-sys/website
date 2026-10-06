import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "hyperscale-vs-colocation-data-centers"
const title = "Hyperscale vs Colocation Data Centers"
const description = "How hyperscale and colocation data centers differ in ownership, customers, design approach and procurement, and what each means for electrical engineers."

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
    "question": "What is the difference between hyperscale and colocation?",
    "answer": "A hyperscale data center is built and operated by a large cloud or internet company for its own services. A colocation data center is operated by a provider that rents space, power and cooling to multiple customers."
  },
  {
    "question": "Can a hyperscaler use colocation?",
    "answer": "Yes. Hyperscale companies often lease capacity in colocation facilities, especially in new markets or to add capacity quickly."
  },
  {
    "question": "Which is more standardised?",
    "answer": "Hyperscale designs tend to be more standardised and repeated across sites, because one owner controls both the IT and the facility. Colocation designs must suit different customers' requirements."
  },
  {
    "question": "Which offers more career opportunities for design engineers?",
    "answer": "Both. Hyperscale and colocation developers, their contractors and consultants all hire electrical design engineers; the day-to-day work differs in how much is standard and how much is project-specific."
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
          description={"Both are large, professionally run facilities, but one serves its owner and the other serves its tenants. That difference drives almost every design decision."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the hyperscale vs colocation article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="difference">The core difference</h2>
            <table>
              <thead><tr><th></th><th>Hyperscale</th><th>Colocation</th></tr></thead>
              <tbody>
                <tr><td>Who uses it</td><td>The owner's own cloud or internet services</td><td>Multiple customer tenants</td></tr>
                <tr><td>Who controls IT</td><td>The owner</td><td>Each customer</td></tr>
                <tr><td>Design approach</td><td>Standardised, repeated designs</td><td>Flexible to different tenants, published reliability level</td></tr>
                <tr><td>Reliability</td><td>Often delivered partly in software across sites</td><td>Often delivered through facility redundancy and a stated tier</td></tr>
                <tr><td>Selling point</td><td>Cost and speed at scale</td><td>Reliability, location and connectivity</td></tr>
              </tbody>
            </table>
            <p>
              These are general patterns; individual operators vary.
            </p>

            <h2 id="engineering">What it means for the design</h2>
            <ul>
              <li>Hyperscale owners control the IT, so they can design the facility and IT together and may accept different redundancy approaches.</li>
              <li>Colocation providers must meet customers' stated requirements, so the facility itself carries the reliability, often to a Tier III or equivalent target.</li>
              <li>Both use the same building blocks: utility feed, UPS, generators, cooling and distribution.</li>
            </ul>
            <p>
              See <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link> and{" "}
              <Link href="/blog/data-center-tier-classification-explained">tier classification</Link>, and the overview in{" "}
              <Link href="/blog/types-of-data-centers-enterprise-colocation-hyperscale-edge">types of data centers</Link>.
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
