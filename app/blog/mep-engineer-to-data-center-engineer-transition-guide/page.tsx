import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "mep-engineer-to-data-center-engineer-transition-guide"
const title = "MEP Engineer to Data Center Engineer: A Transition Guide"
const description = "How an MEP engineer from buildings can move into data centers: what carries over, what is new, and a practical plan to fill the gap."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "MEP engineer reviewing data center drawings"

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
    "question": "Can an MEP engineer move into data centers?",
    "answer": "Yes. Many data center engineers started in building services. Core skills carry over; the gap is in redundancy design, critical power and the standards."
  },
  {
    "question": "What is different about data centers?",
    "answer": "Continuous operation, redundant paths, larger and denser loads, UPS and generator systems, and a strict testing regime."
  },
  {
    "question": "What should I learn first?",
    "answer": "Tiers and redundancy, then the critical power chain, then the calculations and studies particular to data centers."
  },
  {
    "question": "How do I show I am ready?",
    "answer": "A complete example design with stated assumptions, and knowledge of the standards and commissioning practice."
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
          category={"Career Guide"}
          title={title}
          description={"Building MEP experience is a strong base for data centers. The differences are scale, redundancy and the consequences of failure."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'MEP Engineer to Data Center Engineer: A Transition Guide' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="carries">What carries over</h2>
            <ul>
              <li>Load calculation, cable sizing and distribution design.</li>
              <li>Drawings and coordination with other disciplines.</li>
              <li>Site experience and codes.</li>
            </ul>

            <h2 id="new">What is new</h2>
            <table>
              <thead><tr><th>Topic</th><th>Where to start</th></tr></thead>
              <tbody>
                <tr><td>Redundancy and tiers</td><td><Link href="/blog/redundancy-n-n1-2n-explained">Redundancy explained</Link></td></tr>
                <tr><td>Critical power: UPS, batteries, generators</td><td><Link href="/blog/ups-sizing-data-center-worked-example">UPS sizing</Link>, <Link href="/blog/generator-sizing-data-center-worked-example">generator sizing</Link></td></tr>
                <tr><td>Cooling for IT loads</td><td><Link href="/blog/data-center-cooling-systems-explained">Cooling systems</Link></td></tr>
                <tr><td>Commissioning to a failure-testing standard</td><td><Link href="/blog/data-center-commissioning-levels-explained">Commissioning levels</Link></td></tr>
              </tbody>
            </table>

            <h2 id="plan">A practical plan</h2>
            <ol>
              <li>Learn the facility and the power chain.</li>
              <li>Practise the data center calculations with stated assumptions.</li>
              <li>Complete one end-to-end design, such as the capstone in the <Link href="/programs/electrical-design-data-center">Electrical Design – Data Center Specialist program</Link>.</li>
              <li>Apply for roles that value your existing strengths.</li>
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
