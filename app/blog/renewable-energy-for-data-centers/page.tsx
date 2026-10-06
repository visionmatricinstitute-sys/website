import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "renewable-energy-for-data-centers"
const title = "Renewable Energy for Data Centers"
const description = "How data centers source renewable energy: on-site generation, power purchase agreements, certificates and storage, and the engineering questions each raises."

const heroImageSrc = "/data-center-ups-vs-generator.jpg"
const heroImageAlt = "Solar and grid power supplying a data center"

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
    "question": "How do data centers use renewable energy?",
    "answer": "Through on-site generation such as rooftop or adjacent solar, long-term power purchase agreements with off-site projects, renewable energy certificates, and grid supply with a cleaner mix."
  },
  {
    "question": "Can a data center run entirely on solar or wind?",
    "answer": "Rarely, because generation varies and data centers need continuous power. Grid connection, storage and backup remain necessary."
  },
  {
    "question": "What is a PPA?",
    "answer": "A power purchase agreement is a contract to buy electricity, often from a specific renewable project, over a long period."
  },
  {
    "question": "Is buying certificates the same as using renewable power?",
    "answer": "Not exactly. Certificates represent generation elsewhere; matching in time and location is a separate question, so be clear about what a claim covers."
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
          category={"Sustainability"}
          title={title}
          description={"A data center runs continuously and renewable generation does not. The engineering is in matching the two and being clear about what is actually claimed."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Renewable Energy for Data Centers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="routes">Routes to renewable supply</h2>
            <table>
              <thead><tr><th>Route</th><th>Note</th></tr></thead>
              <tbody>
                <tr><td>On-site generation</td><td>Limited by roof and land area compared with the load</td></tr>
                <tr><td>Power purchase agreement</td><td>Funds new generation off site; delivery goes through the grid</td></tr>
                <tr><td>Certificates</td><td>Represent generation; check what time and place they cover</td></tr>
                <tr><td>Grid supply</td><td>Carbon intensity depends on the grid mix</td></tr>
              </tbody>
            </table>

            <h2 id="eng">Engineering questions</h2>
            <ul>
              <li>Grid connection capacity and its protection requirements for on-site generation.</li>
              <li>Storage to smooth variability or provide short-term support. See <Link href="/blog/battery-energy-storage-in-data-centers">battery energy storage</Link>.</li>
              <li>Interaction with the generator and UPS during outages.</li>
            </ul>

            <h2 id="claims">Be precise about claims</h2>
            <p>State whether a claim is annual matching, hourly matching, location-based or market-based, and over what boundary.</p>
            <p>See <Link href="/blog/green-data-centers-efficiency-levers">green data center levers</Link>.</p>
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
