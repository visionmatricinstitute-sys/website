import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "current-transformer-ratio-burden-selection-example"
const title = "Current Transformer (CT) Selection: Ratio, Burden and Class"
const description = "How to select a current transformer: ratio, 1 A or 5 A secondary, accuracy class, burden and lead resistance, with a worked burden example and common mistakes."

const heroImageSrc = "/data-center-ct-pt-relay.jpg"
const heroImageAlt = "Current transformers mounted on switchgear busbars"

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
    "question": "How do you select a CT ratio?",
    "answer": "Choose a primary rating at or above the maximum load current, so the secondary current at full load is within the meter or relay's range, and check the CT will not saturate at the maximum fault current the protection must see."
  },
  {
    "question": "Should I use a 1 A or 5 A secondary?",
    "answer": "1 A secondaries create much lower burden in long secondary cables because the loss is I squared times R. 5 A is common for short runs, such as inside a panel. Match the relay or meter input."
  },
  {
    "question": "What do metering and protection classes mean?",
    "answer": "Metering classes (such as 0.2 or 0.5) describe accuracy at normal load currents. Protection classes (such as 5P20) describe accuracy up to a multiple of rated current, which keeps the CT accurate during a fault."
  },
  {
    "question": "What is burden?",
    "answer": "The load connected to the CT secondary, in VA or ohms: the relay or meter plus the connecting leads. The CT's rated burden must be at least the actual burden, or it can saturate."
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
          description={"A CT is selected on four things: its ratio, the secondary current, the accuracy class and the burden it has to drive. Here is how each is chosen, with a burden calculation that shows why 1 A secondaries suit long cable runs."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Current Transformer (CT) Selection: Ratio, Burden and Class' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="basics">What you choose</h2>
            <table>
              <thead><tr><th>Choice</th><th>Rule of thumb</th></tr></thead>
              <tbody>
                <tr><td>Ratio</td><td>Primary at or above the maximum load current; check saturation at fault level</td></tr>
                <tr><td>Secondary</td><td>1 A for long runs, 5 A for short; match the relay input</td></tr>
                <tr><td>Class</td><td>Metering class for billing and monitoring; protection class (for example 5P20) for relays</td></tr>
                <tr><td>Rated burden</td><td>At least the real burden of relay, meter and leads</td></tr>
              </tbody>
            </table>
            <p>For what a CT does in the first place, see <Link href="/blog/current-transformer-explained">current transformer explained</Link>.</p>

            <h2 id="ratio">Ratio example</h2>
            <p>
              A feeder carries up to 300 A. A 400/1 A CT gives 0.75 A on the secondary at full load, which is comfortably within the
              relay input range. Check the protection class against the largest fault the relay must see, so the CT does not
              saturate before the relay operates.
            </p>

            <h2 id="burden">Burden example</h2>
            <p>
              Illustrative example. A 2.5 mm² copper lead has a resistance of about 7.41 Ω/km. The CT is 50 m from the relay, so the
              loop (out and back) is 100 m, giving 0.741 Ω.
            </p>
            <table>
              <thead><tr><th></th><th>1 A secondary</th><th>5 A secondary</th></tr></thead>
              <tbody>
                <tr><td>Lead burden = I² × R</td><td>1² × 0.741 = 0.74 VA</td><td>5² × 0.741 = 18.5 VA</td></tr>
              </tbody>
            </table>
            <p>
              The lead burden alone is 25 times higher for a 5 A secondary. Add the relay's own burden (from its datasheet) to
              get the total, and compare it with the CT's rated burden. A 5 A CT on this run would need a much larger burden rating
              or thicker leads, which is why 1 A is the usual choice for long runs.
            </p>

            <h2 id="check">Checks</h2>
            <ol>
              <li>Total burden is within the CT's rated burden.</li>
              <li>The CT does not saturate at the maximum fault current, using the accuracy limit factor or knee-point voltage from its data.</li>
              <li>Metering and protection cores are separate where both are needed.</li>
              <li>Secondary circuits are never left open while the primary is energised: that can produce dangerous voltages.</li>
            </ol>
            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Choosing the ratio only from load current and ignoring fault current.</li>
              <li>Forgetting lead resistance in the burden.</li>
              <li>Using a metering-class CT for protection.</li>
            </ul>
            <p>Related: <Link href="/blog/protection-relay-explained">protection relays</Link>, <Link href="/blog/overcurrent-relay-settings-idmt-worked-example">overcurrent relay settings</Link> and <Link href="/blog/potential-transformer-explained">potential transformers</Link>.</p>
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
