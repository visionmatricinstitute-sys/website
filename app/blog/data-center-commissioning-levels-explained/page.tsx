import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-commissioning-levels-explained"
const title = "Data Center Commissioning Levels (L1 to L5) Explained"
const description = "The commonly used five levels of data center commissioning, from factory testing to integrated systems testing, what each proves, who is involved, and why the last level matters most."

const heroImageSrc = "/data-center-protection-relay.jpg"
const heroImageAlt = "Engineers testing electrical equipment during commissioning"

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
    "question": "What are the levels of data center commissioning?",
    "answer": "A common scheme uses five levels: L1 factory witness testing of equipment, L2 delivery and inspection on site, L3 installation checks and pre-functional testing, L4 functional performance testing of each system, and L5 integrated systems testing. Names and exact scope vary between organisations and projects."
  },
  {
    "question": "What is integrated systems testing?",
    "answer": "IST tests the facility's systems working together under simulated failures, such as a utility outage with generators starting and UPS carrying the load, using load banks to represent the IT load."
  },
  {
    "question": "Who performs commissioning?",
    "answer": "A commissioning agent or authority, working with the contractor, equipment suppliers and the owner's representatives. Roles vary by project."
  },
  {
    "question": "Why is L5 the most valuable?",
    "answer": "Individual systems can pass their own tests and still fail together; integrated testing finds control, sequencing and interface faults that component tests cannot."
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
          category={"Construction"}
          title={title}
          description={"Commissioning is how a data center proves it works before real load depends on it. The work is usually organised in levels, each testing something the last could not."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the commissioning levels article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="levels">The five levels</h2>
            <p>The scheme below is a widely used convention. Check the project's commissioning plan for its own definitions.</p>
            <table>
              <thead><tr><th>Level</th><th>Focus</th></tr></thead>
              <tbody>
                <tr><td>L1</td><td>Factory witness testing: equipment is tested at the manufacturer before shipping</td></tr>
                <tr><td>L2</td><td>Delivery and inspection: equipment received and checked on site for damage and compliance</td></tr>
                <tr><td>L3</td><td>Installation and pre-functional checks: correct installation, wiring, labelling, start-up</td></tr>
                <tr><td>L4</td><td>Functional performance testing: each system operates as specified</td></tr>
                <tr><td>L5</td><td>Integrated systems testing: all systems tested together under failure scenarios</td></tr>
              </tbody>
            </table>

            <h2 id="ist">Why integrated testing matters</h2>
            <p>
              Level 5 typically uses load banks and simulated events: a utility failure, generator start and transfer, UPS
              response, cooling restart, and the loss of individual components, to confirm the facility behaves the way the
              design says it will. It is where sequencing and control faults are found. See{" "}
              <Link href="/blog/fat-sat-ist-testing-data-center-explained">FAT, SAT and IST explained</Link>.
            </p>

            <h2 id="eng">What it means for the design engineer</h2>
            <ul>
              <li>The design must be testable: isolation points, test access and load-bank connection points need to be drawn in.</li>
              <li>Test criteria come from the design intent, so unclear intent leads to disputes at L4 and L5.</li>
              <li>Documentation (single-line diagrams, settings, sequences) is an input to the test scripts.</li>
            </ul>
            <p>
              Related: <Link href="/blog/data-center-tier-classification-explained">tier classification</Link>, which is concerned
              with the redundancy that L5 tests, and <Link href="/data-center-design">the design guide</Link>.
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
