import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "protection-coordination-basics-data-center"
const title = "Protection Coordination Basics for Data Center Engineers"
const description = "What protection coordination (discrimination) is, how time-current curves are used, why selectivity matters in a data center, and the common mistakes."

const heroImageSrc = "/data-center-protection-relay.jpg"
const heroImageAlt = "Protection relays and breaker panels"

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
    "question": "What is protection coordination?",
    "answer": "Setting protective devices so that the device nearest the fault operates first and upstream devices remain closed, which limits the outage to the smallest possible part of the system."
  },
  {
    "question": "What is a time-current curve?",
    "answer": "A graph showing how long a protective device takes to operate at different fault currents. Curves of upstream and downstream devices are compared to check they do not overlap."
  },
  {
    "question": "What is discrimination or selectivity?",
    "answer": "The ability of the protection to isolate only the faulted circuit. It can be full (up to the maximum fault level) or partial."
  },
  {
    "question": "What data is needed for a coordination study?",
    "answer": "Fault levels, transformer and cable data, protective device characteristics and settings, and the load and motor starting data."
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
          description={"When a fault happens, only the device closest to it should trip. Protection coordination makes sure that is the case, and it matters more in a data center where an unnecessary trip drops a load."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Protection Coordination Basics for Data Center Engineers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="goal">The goal</h2>
            <p>
              A fault should clear quickly and cause the smallest possible outage. In a redundant data center that also means a
              fault on one path must not trip the other. See <Link href="/blog/protection-relay-explained">protection relays</Link>.
            </p>

            <h2 id="method">The method</h2>
            <ol>
              <li>Get the fault levels at each board from the short-circuit study.</li>
              <li>Plot the time-current curves of each device from the load up to the source on the same graph.</li>
              <li>Set pickup and time settings so downstream curves sit below and to the left of upstream ones, with a margin set by the device characteristics.</li>
              <li>Check that device settings still protect the cable and equipment (thermal withstand) and do not trip on motor starting or transformer inrush.</li>
              <li>Record the settings and issue them for commissioning.</li>
            </ol>

            <h2 id="tools">Common tools</h2>
            <ul>
              <li>Adjustable settings on breakers (long-time, short-time, instantaneous, ground fault).</li>
              <li>Zone selective interlocking where time grading alone leaves long clearing times.</li>
              <li>Software such as ETAP to plot and check curves.</li>
            </ul>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Coordinating with default settings instead of verified ones.</li>
              <li>Ignoring the fault level range (maximum and minimum).</li>
              <li>Setting for selectivity without checking cable protection and arc-flash energy. See <Link href="/blog/arc-flash-basics-data-center-engineers">arc flash basics</Link>.</li>
            </ul>
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
