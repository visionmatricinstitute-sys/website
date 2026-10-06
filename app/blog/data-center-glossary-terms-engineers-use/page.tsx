import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-glossary-terms-engineers-use"
const title = "Data Center Glossary: Terms Engineers Use"
const description = "A plain-language glossary of data center and electrical design terms, from availability and ATS to white space and WUE, with links to detailed guides."

const heroImageSrc = "/hero-data-center.jpg"
const heroImageAlt = "Data center terminology reference"

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
    "question": "What is the difference between kW and kVA?",
    "answer": "kW is real power and kVA is apparent power; they are related by the power factor, so kW equals kVA times power factor."
  },
  {
    "question": "What does N+1 mean?",
    "answer": "N is the capacity needed for the load; N+1 adds one spare unit so a single failure can be tolerated."
  },
  {
    "question": "What is white space?",
    "answer": "The area of a data center where the IT racks are installed."
  },
  {
    "question": "Where can I read more?",
    "answer": "The data center design guide links to detailed articles on each topic."
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
          category={"Technical"}
          title={title}
          description={"Data center work has its own vocabulary. This glossary gives short, plain definitions of the terms you will meet most often."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Glossary: Terms Engineers Use' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="terms">Terms</h2>
            <table>
              <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td>Availability</td><td>The proportion of time a system is operational.</td></tr>
                <tr><td>Autonomy time</td><td>How long a UPS battery can carry the load.</td></tr>
                <tr><td>ATS</td><td>Automatic transfer switch; moves a load between sources, such as utility and generator.</td></tr>
                <tr><td>Busway / busduct</td><td>Enclosed conductors used to distribute power.</td></tr>
                <tr><td>CRAC</td><td>Computer room air conditioner with its own compressor.</td></tr>
                <tr><td>CRAH</td><td>Computer room air handler using chilled water.</td></tr>
                <tr><td>Concurrent maintainability</td><td>Any component or path can be taken out for planned maintenance without affecting the IT load.</td></tr>
                <tr><td>Containment</td><td>Physical separation of hot and cold air streams in a data hall.</td></tr>
                <tr><td>CUE</td><td>Carbon usage effectiveness; carbon emissions per unit of IT energy.</td></tr>
                <tr><td>DCIM</td><td>Data center infrastructure management software.</td></tr>
                <tr><td>Demand factor</td><td>The proportion of connected load expected to operate at once.</td></tr>
                <tr><td>Dual-corded</td><td>IT equipment with two power supplies fed from separate paths.</td></tr>
                <tr><td>Earthing</td><td>Connecting a system to the general mass of earth.</td></tr>
                <tr><td>Edge data center</td><td>A smaller facility placed close to users or devices.</td></tr>
                <tr><td>EPMS</td><td>Electrical power monitoring system.</td></tr>
                <tr><td>FAT</td><td>Factory acceptance test.</td></tr>
                <tr><td>Fault tolerance</td><td>Continuing to operate through a single failure.</td></tr>
                <tr><td>Generator set</td><td>An engine and alternator providing backup power.</td></tr>
                <tr><td>Hot aisle / cold aisle</td><td>Rack arrangement separating exhaust and supply air.</td></tr>
                <tr><td>Hyperscale</td><td>Very large facilities run by cloud and internet companies.</td></tr>
                <tr><td>IST</td><td>Integrated systems testing of all systems together.</td></tr>
                <tr><td>kVA</td><td>Kilovolt-ampere; unit of apparent power.</td></tr>
                <tr><td>kW</td><td>Kilowatt; unit of real power.</td></tr>
                <tr><td>Load bank</td><td>Equipment that provides an artificial electrical load for testing.</td></tr>
                <tr><td>LOD</td><td>Level of development of a BIM element.</td></tr>
                <tr><td>LV</td><td>Low voltage, commonly up to 1,000 V AC.</td></tr>
                <tr><td>MCC</td><td>Motor control centre.</td></tr>
                <tr><td>MV</td><td>Medium voltage, commonly from about 1 kV to tens of kV.</td></tr>
                <tr><td>N</td><td>The capacity needed to serve the load with no redundancy.</td></tr>
                <tr><td>N+1</td><td>N plus one spare unit.</td></tr>
                <tr><td>2N</td><td>Two independent systems each able to carry the full load.</td></tr>
                <tr><td>PDU</td><td>Power distribution unit.</td></tr>
                <tr><td>PUE</td><td>Power usage effectiveness; total facility power divided by IT power.</td></tr>
                <tr><td>RPP</td><td>Remote power panel; distributes power to racks.</td></tr>
                <tr><td>Rack</td><td>A frame that holds IT equipment.</td></tr>
                <tr><td>SAT</td><td>Site acceptance test.</td></tr>
                <tr><td>SLD</td><td>Single-line diagram.</td></tr>
                <tr><td>STS</td><td>Static transfer switch.</td></tr>
                <tr><td>Short-circuit current</td><td>The current that flows in a fault.</td></tr>
                <tr><td>Tier</td><td>Uptime Institute infrastructure classification, I to IV.</td></tr>
                <tr><td>TIA-942</td><td>Telecommunications Industry Association data center infrastructure standard.</td></tr>
                <tr><td>UPS</td><td>Uninterruptible power supply.</td></tr>
                <tr><td>VRLA</td><td>Valve-regulated lead-acid battery.</td></tr>
                <tr><td>White space</td><td>The area where IT racks are installed.</td></tr>
                <tr><td>WUE</td><td>Water usage effectiveness; litres of water per kWh of IT energy.</td></tr>
                <tr><td>Power factor</td><td>The ratio of real power to apparent power.</td></tr>
                <tr><td>Derating</td><td>Reducing a rating to allow for conditions such as temperature or grouping.</td></tr>
                <tr><td>Voltage drop</td><td>The reduction in voltage along a conductor under load.</td></tr>
                <tr><td>Harmonics</td><td>Currents or voltages at multiples of the supply frequency.</td></tr>
                <tr><td>Arc flash</td><td>An explosive release of energy from an electrical fault in air.</td></tr>
                <tr><td>Selectivity</td><td>The ability of protection to isolate only the faulted part.</td></tr>
                <tr><td>Bonding</td><td>Connecting metal parts so they stay at the same potential.</td></tr>
                <tr><td>Commissioning</td><td>Testing and proving that systems work as designed.</td></tr>
                <tr><td>As-built</td><td>The record of what was actually installed.</td></tr>
                <tr><td>Free cooling</td><td>Using cool outdoor air or water to reduce mechanical cooling.</td></tr>
                <tr><td>Economiser</td><td>Equipment that enables free cooling.</td></tr>
                <tr><td>Liquid cooling</td><td>Removing heat with a liquid rather than air alone.</td></tr>
                <tr><td>BESS</td><td>Battery energy storage system.</td></tr>
                <tr><td>PPA</td><td>Power purchase agreement.</td></tr>
                <tr><td>Colocation</td><td>A facility renting space, power and cooling to customers.</td></tr>
              </tbody>
            </table>
            <p>
              For explanations, start with the <Link href="/data-center-design">data center design guide</Link>,{" "}
              <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link> and{" "}
              <Link href="/blog/what-is-a-data-center-components-and-how-it-works">what is a data center</Link>.
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
