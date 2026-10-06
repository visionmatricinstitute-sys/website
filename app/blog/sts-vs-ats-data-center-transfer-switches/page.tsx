import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "sts-vs-ats-data-center-transfer-switches"
const title = "STS vs ATS: Transfer Switches in a Data Center"
const description = "What a static transfer switch (STS) and an automatic transfer switch (ATS) each do, how they differ in speed and role, where each sits in a data center power chain, and how to choose between them."

const heroImageSrc = "/data-center-redundancy-explained.jpg"
const heroImageAlt = "Transfer switch equipment in a data center electrical room"

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
    "question": "What is the difference between STS and ATS?",
    "answer": "An STS (static transfer switch) uses solid-state devices to switch a load between two sources very quickly, typically within a fraction of a cycle to a few milliseconds depending on the product. An ATS (automatic transfer switch) uses electromechanical contactors or breakers and takes longer, typically a few cycles to seconds depending on the design and transition type."
  },
  {
    "question": "Where is an STS used in a data center?",
    "answer": "Typically downstream of two independent UPS systems, so a single-corded load can be supplied from either source and survive the loss of one. The exact arrangement depends on the project's redundancy design."
  },
  {
    "question": "Where is an ATS used?",
    "answer": "Typically between the utility supply and the generator, so the site moves to generator power when the utility fails and back when it returns."
  },
  {
    "question": "Why not use an ATS in place of an STS?",
    "answer": "An ATS is usually too slow to keep IT equipment running through a source failure without a UPS in between. Check the transfer time of the actual product against the load's ride-through capability."
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
          description={"Both switch a load between two power sources, and they are not interchangeable. One is a fast solid-state device that protects the IT load; the other is an electromechanical device that moves the site between utility and generator."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the STS vs ATS article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="roles">Two devices, two jobs</h2>
            <table>
              <thead><tr><th></th><th>STS (static transfer switch)</th><th>ATS (automatic transfer switch)</th></tr></thead>
              <tbody>
                <tr><td>Technology</td><td>Solid-state (thyristor)</td><td>Electromechanical</td></tr>
                <tr><td>Typical role</td><td>Switch a load between two UPS-backed sources</td><td>Switch the site between utility and generator</td></tr>
                <tr><td>Transfer time</td><td>Very short (manufacturer-specific)</td><td>Longer (manufacturer- and transition-specific)</td></tr>
                <tr><td>Protects</td><td>IT load from a source failure</td><td>Site supply continuity over longer outages</td></tr>
              </tbody>
            </table>
            <p>
              Transfer times vary widely between products and transition types, so use the datasheet figures, not the
              generalities in this table.
            </p>

            <h2 id="sts">Static transfer switch</h2>
            <p>
              An STS sits between two independent sources and the load. If the preferred source fails or goes out of tolerance,
              it moves the load to the alternate source fast enough that equipment with a power supply ride-through typically
              keeps running. Its value is making a single-corded load behave as if it had redundant power.
            </p>
            <p>
              Design checks include source synchronisation (the sources must be in phase to transfer without a surge),
              overload and fault behaviour, bypass for maintenance, and the STS itself being a possible single point of failure.
            </p>

            <h2 id="ats">Automatic transfer switch</h2>
            <p>
              An ATS monitors the utility, starts the generator on failure, and transfers the load once the generator is ready.
              Transition may be open (break before make), closed (make before break) or delayed, with different effects on
              the load and the sources. The UPS and its battery cover the gap during the transfer.
            </p>

            <h2 id="choose">Choosing between them</h2>
            <ul>
              <li>Between utility and generator: ATS.</li>
              <li>Between two UPS-backed paths for a single-corded load: STS.</li>
              <li>Dual-corded IT equipment fed from two independent paths often needs neither at the rack, because the equipment itself selects the source.</li>
            </ul>

            <h2 id="related">Related</h2>
            <p>
              Where these sit in the power chain:{" "}
              <Link href="/blog/mv-lv-power-distribution-architecture-explained">MV/LV distribution architecture</Link>,{" "}
              <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link>, and{" "}
              <Link href="/blog/pdu-power-distribution-unit-explained">PDUs</Link>.
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
