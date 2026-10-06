import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "liquid-cooling-direct-to-chip-vs-immersion"
const title = "Liquid Cooling Explained: Direct-to-Chip vs Immersion"
const description = "Why liquid cooling is used, how direct-to-chip and immersion cooling work, how they differ, and what each means for data center power and mechanical design."

const heroImageSrc = "/data-center-hot-cold-aisle.jpg"
const heroImageAlt = "Liquid cooling piping in a data center"

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
    "question": "What is liquid cooling in a data center?",
    "answer": "Using a liquid, such as water-based coolant or a dielectric fluid, to remove heat directly from IT equipment instead of relying on air alone."
  },
  {
    "question": "What is direct-to-chip cooling?",
    "answer": "Cold plates are mounted on the hottest components, such as processors and accelerators, and coolant flows through them to carry heat away. Other components are usually still air-cooled."
  },
  {
    "question": "What is immersion cooling?",
    "answer": "Servers are submerged in a dielectric (non-conductive) fluid that absorbs heat, either staying liquid (single-phase) or boiling and condensing (two-phase)."
  },
  {
    "question": "Does liquid cooling remove the need for air cooling?",
    "answer": "Not always. Direct-to-chip designs typically still need air cooling for the remaining heat, so facilities often combine both."
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
          description={"Air has limits. When rack power density rises, such as in some AI deployments, liquid takes over part or all of the heat removal. Here are the two main approaches and what they change for the designer."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the liquid cooling article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="why">Why liquid</h2>
            <p>
              Liquids carry far more heat per unit volume than air, so they can remove heat from dense equipment with less
              airflow. As rack power density increases, air cooling becomes harder to deliver efficiently, which is why liquid
              is common in high-density AI deployments.
            </p>

            <h2 id="types">The two main approaches</h2>
            <table>
              <thead><tr><th></th><th>Direct-to-chip</th><th>Immersion</th></tr></thead>
              <tbody>
                <tr><td>How</td><td>Coolant flows through cold plates on the chips</td><td>Servers sit in dielectric fluid</td></tr>
                <tr><td>What stays air-cooled</td><td>Other components, typically</td><td>Little or nothing</td></tr>
                <tr><td>Equipment</td><td>Servers with liquid connections; coolant distribution units</td><td>Tanks and fluid-compatible hardware</td></tr>
                <tr><td>Retrofit</td><td>Easier to introduce into existing halls</td><td>A bigger change to layout and operations</td></tr>
              </tbody>
            </table>
            <p>These are general characteristics; products and designs differ.</p>

            <h2 id="eng">What it changes for the designer</h2>
            <ul>
              <li><strong>Mechanical:</strong> coolant distribution, leak detection, and heat rejection at higher water temperatures.</li>
              <li><strong>Electrical:</strong> higher rack power means larger feeders, busway and PDUs per rack, and cooling pumps and CDUs need a resilient supply that matches the power redundancy.</li>
              <li><strong>Structural and layout:</strong> floor loading, piping routes and maintenance access.</li>
            </ul>
            <p>
              Related: <Link href="/blog/data-center-cooling-systems-explained">cooling systems explained</Link> and the{" "}
              <Link href="/data-center-design">data center design guide</Link>.
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
