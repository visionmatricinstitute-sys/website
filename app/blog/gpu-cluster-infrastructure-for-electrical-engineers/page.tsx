import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "gpu-cluster-infrastructure-for-electrical-engineers"
const title = "GPU Cluster Infrastructure for Electrical Engineers"
const description = "What a GPU cluster is, how it is built from servers, racks and networks, and what each layer means for the electrical and cooling design."

const heroImageSrc = "/hero-data-center.jpg"
const heroImageAlt = "Rows of racks housing GPU servers"

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
    "question": "What is a GPU cluster?",
    "answer": "A set of servers with GPUs connected by high-speed networks so that a single AI job can use all the accelerators together."
  },
  {
    "question": "Why does the network matter to the facility?",
    "answer": "Tight network latency and bandwidth requirements push for dense packing of racks, which concentrates power and heat in a small area."
  },
  {
    "question": "What does the electrical engineer need to know?",
    "answer": "The power per server and per rack, the number of racks, the redundancy of the feeds, and how workload behaviour changes the load profile."
  },
  {
    "question": "Are all AI workloads the same electrically?",
    "answer": "No. Training is typically heavy and sustained; inference can be spread across more, smaller deployments. Ask for the workload's power profile."
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
          description={"A GPU cluster is a group of accelerator-equipped servers working as one machine. Its physical layout, power draw and heat output are what the facility has to support."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'GPU Cluster Infrastructure for Electrical Engineers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="layers">The layers</h2>
            <ol>
              <li><strong>Accelerator:</strong> the GPU or similar chip, the main power consumer.</li>
              <li><strong>Server:</strong> several accelerators with CPUs, memory and power supplies.</li>
              <li><strong>Rack:</strong> servers plus power distribution and, increasingly, liquid cooling connections.</li>
              <li><strong>Cluster network:</strong> switches and cabling that bind racks into one system.</li>
              <li><strong>Facility:</strong> power, cooling and space that support all of the above.</li>
            </ol>

            <h2 id="eng">What each layer means for design</h2>
            <ul>
              <li>Power per server and rack comes from the vendor's specification; use it with a stated utilisation assumption.</li>
              <li>Network limits on cable length affect how racks can be placed, so layout is shaped by the network as well as by power and cooling.</li>
              <li>Large synchronised jobs can ramp load up and down quickly, which matters to UPS, generator and utility planning.</li>
            </ul>
            <p>
              See <Link href="/blog/high-density-racks-power-distribution-implications">high-density rack power distribution</Link>,{" "}
              <Link href="/blog/liquid-cooling-direct-to-chip-vs-immersion">liquid cooling</Link> and the overview in{" "}
              <Link href="/blog/ai-data-centers-explained">AI data centers explained</Link>.
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
