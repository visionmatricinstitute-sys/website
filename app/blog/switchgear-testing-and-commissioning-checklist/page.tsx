import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "switchgear-testing-and-commissioning-checklist"
const title = "Switchgear Testing and Commissioning Checklist"
const description = "A practical checklist for testing and commissioning MV and LV switchgear: visual and mechanical checks, insulation and contact resistance, protection tests, interlocks and energisation."

const heroImageSrc = "/data-center-protection-relay.jpg"
const heroImageAlt = "Engineer testing switchgear during commissioning"

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
    "question": "What tests are done on switchgear before energising?",
    "answer": "Visual and mechanical inspection, insulation resistance, contact resistance, protection relay tests, interlock and operation checks, and for MV equipment typically a voltage withstand test, all per the manufacturer and specification."
  },
  {
    "question": "What is primary injection testing?",
    "answer": "Passing a real current through the primary circuit to verify the CT ratio, polarity and the operation of the relay and breaker as a complete chain."
  },
  {
    "question": "Why test interlocks?",
    "answer": "Interlocks prevent unsafe or out-of-sequence operation, such as closing two sources in parallel. They must be proven by operating them, not assumed from the design."
  },
  {
    "question": "Who signs off?",
    "answer": "The commissioning engineer or authority with the contractor and client representatives, as defined in the commissioning plan."
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
          description={"Switchgear is energised only after a sequence of checks, from how it is built to how its protection behaves. This checklist follows the usual order."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Switchgear Testing and Commissioning Checklist' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="before">1. Before testing</h2>
            <ul>
              <li>Approved drawings, protection settings and test procedures issued.</li>
              <li>Factory test records reviewed. See <Link href="/blog/fat-sat-ist-testing-data-center-explained">FAT, SAT and IST</Link>.</li>
              <li>Safety procedures, permits and isolation arrangements agreed.</li>
            </ul>

            <h2 id="visual">2. Visual and mechanical</h2>
            <ul>
              <li>Nameplate and ratings match the design; no transit damage.</li>
              <li>Busbar joints, torque marks, earthing connections and labelling checked.</li>
              <li>Breaker racking, shutters and mechanisms operate smoothly.</li>
            </ul>

            <h2 id="electrical">3. Electrical tests</h2>
            <table>
              <thead><tr><th>Test</th><th>What it shows</th></tr></thead>
              <tbody>
                <tr><td>Insulation resistance</td><td>Insulation condition between phases and to earth</td></tr>
                <tr><td>Contact resistance</td><td>Quality of joints and breaker contacts</td></tr>
                <tr><td>Voltage withstand (MV)</td><td>Insulation can withstand the required voltage; method per manufacturer</td></tr>
                <tr><td>CT and VT checks</td><td>Ratio, polarity and burden. See <Link href="/blog/current-transformer-ratio-burden-selection-example">CT selection</Link></td></tr>
                <tr><td>Relay tests</td><td>Settings loaded and operation proven. See <Link href="/blog/overcurrent-relay-settings-idmt-worked-example">relay settings</Link></td></tr>
                <tr><td>Primary injection</td><td>The whole protection chain operates from real current</td></tr>
              </tbody>
            </table>

            <h2 id="function">4. Functional checks</h2>
            <ul>
              <li>Breaker open, close and trip operation, including remote and local.</li>
              <li>Interlocks and transfer schemes operated in every sequence.</li>
              <li>Alarms, indications and communications reach the monitoring system.</li>
            </ul>

            <h2 id="energise">5. Energisation</h2>
            <ul>
              <li>Final permit and a checked sequence.</li>
              <li>Phase rotation and voltage verified at first energisation.</li>
              <li>Load checks and thermal scan under load when available.</li>
            </ul>
            <p>This is a general checklist. The manufacturer's procedures, the project specification and the commissioning plan decide the actual tests, values and acceptance criteria.</p>
            <p>See also <Link href="/blog/mv-switchgear-data-center-ratings-and-selection">MV switchgear</Link>, <Link href="/blog/lv-switchgear-and-mcc-basics-data-center">LV switchgear</Link> and the <Link href="/resources/data-center-commissioning-handover-checklist">commissioning and handover checklist</Link>.</p>
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
