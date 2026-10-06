import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "what-is-a-data-center-components-and-how-it-works"
const title = "What Is a Data Center? Components and How It Works"
const description = "A plain explanation of what a data center is, the main systems inside one (IT, power, cooling, fire and security), how they work together, and the common types."

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
    "question": "What is a data center in simple terms?",
    "answer": "A data center is a facility that houses computers, storage and networking equipment, along with the power, cooling, fire protection and security systems that keep them running."
  },
  {
    "question": "What are the main components of a data center?",
    "answer": "The IT equipment (servers, storage, network), the electrical system (utility feed, distribution, UPS, generators), the cooling system, fire detection and suppression, physical security, and the monitoring and management systems."
  },
  {
    "question": "How does a data center stay online during a power cut?",
    "answer": "A UPS with batteries carries the load instantly when utility power fails, and diesel generators start and take over for longer outages. The design's redundancy decides how many failures it can tolerate."
  },
  {
    "question": "What are the types of data centers?",
    "answer": "Common types are enterprise (owned and operated by one organisation), colocation (space and power rented to many customers), hyperscale (very large facilities run by cloud providers) and edge (smaller sites close to users)."
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
          description={"A data center is a building designed to keep IT equipment running continuously. Here are the systems inside it, how they depend on each other, and where the engineering work sits."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the What is a Data Center article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="definition">What a data center is</h2>
            <p>
              A data center is a facility that houses servers, storage and network equipment together with the infrastructure
              that powers and cools them. Sizes range from a small server room to campuses drawing tens or hundreds of
              megawatts. The common requirement is continuous operation.
            </p>

            <h2 id="components">The main systems</h2>
            <ul>
              <li><strong>IT equipment:</strong> servers, storage, network switches and the racks that hold them.</li>
              <li><strong>Electrical:</strong> utility feed, medium- and low-voltage distribution, UPS, batteries, generators and PDUs. See <Link href="/blog/mv-lv-power-distribution-architecture-explained">MV/LV distribution</Link> and <Link href="/blog/ups-topologies-explained">UPS topologies</Link>.</li>
              <li><strong>Cooling:</strong> removes the heat the IT equipment produces. See <Link href="/blog/hot-aisle-cold-aisle-containment-explained">hot aisle / cold aisle containment</Link>.</li>
              <li><strong>Fire protection and security:</strong> detection, suppression, access control and surveillance.</li>
              <li><strong>Monitoring and management:</strong> building management and infrastructure monitoring systems.</li>
            </ul>

            <h2 id="how">How it works together</h2>
            <p>
              Almost all the electrical power the IT equipment draws becomes heat, so power and cooling scale together. The
              electrical system keeps the load energised through faults and maintenance; the cooling system keeps it within
              temperature limits. A failure in either stops the IT load, which is why the design is organised around
              redundancy. The Uptime Institute's tier system and redundancy notation (N, N+1, 2N) describe how much failure a
              design can tolerate; see <Link href="/blog/data-center-tier-classification-explained">tier classification</Link> and{" "}
              <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link>.
            </p>

            <h2 id="types">Common types</h2>
            <ul>
              <li><strong>Enterprise:</strong> built and used by a single organisation.</li>
              <li><strong>Colocation:</strong> space, power and cooling rented to multiple customers.</li>
              <li><strong>Hyperscale:</strong> very large facilities operated by cloud providers.</li>
              <li><strong>Edge:</strong> smaller sites placed close to users or devices.</li>
            </ul>

            <h2 id="design">Where the engineering work is</h2>
            <p>
              Designing one means setting the load and reliability target, then engineering power, cooling and layout to meet
              it. The full process is in the <Link href="/data-center-design">data center design guide</Link>, and the career
              path is covered in{" "}
              <Link href="/blog/how-to-become-a-data-center-electrical-design-engineer-in-india">
                how to become a data center electrical design engineer in India
              </Link>
              .
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
