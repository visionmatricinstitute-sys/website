import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"

const path = "/data-center-design"
const title = "Data Center Design: A Complete Guide for Engineers"
const description =
  "What data center design involves, step by step: tier level, power and cooling architecture, redundancy, electrical design, layout and standards — with links to detailed guides on each topic."

const heroImageSrc = "/hero-data-center.jpg"
const heroImageAlt = "Rows of server racks in a data center hall"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    url: path,
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    question: "What is data center design?",
    answer:
      "Data center design is the engineering of a facility that houses IT equipment: deciding how much power and cooling it needs, how reliable it must be (the tier or redundancy target), and then designing the electrical, mechanical, layout and security systems to meet that target.",
  },
  {
    question: "What are the main parts of a data center design?",
    answer:
      "The main parts are the reliability target (tier level), the electrical system (utility feed, MV/LV distribution, UPS, generators, PDUs), the cooling system, the white-space layout (racks, aisles, containment), fire protection and security, and the standards the design must comply with.",
  },
  {
    question: "Who designs a data center?",
    answer:
      "Several disciplines work together: electrical engineers, mechanical (HVAC) engineers, civil and structural engineers, fire and security specialists, and BIM or CAD teams. Electrical design is the largest share of the work on most projects, because power is the core constraint.",
  },
  {
    question: "Where can I learn data center design in India?",
    answer:
      "Vision Matrix Institute runs a live online Electrical Design – Data Center Specialist program covering the standards, calculations, drawings and software used on real projects. See the program page for the curriculum and next batch.",
  },
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
  mainEntityOfPage: `https://www.visionmatrixinstitute.com${path}`,
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Data Center Design", path },
])

export default function DataCenterDesignPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ArticleShell
          category="Guide"
          title={title}
          description="A data center is a building whose whole purpose is to keep IT equipment powered and cooled without interruption. Designing one is the work of deciding how reliable it must be, then engineering power, cooling and layout to that target."
          faqs={faqs}
          whatsappMessage="Hi, I read the Data Center Design guide and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
        >
          <div>
            <h2 id="what-is-a-data-center">What is a data center?</h2>
            <p>
              A data center is a facility that houses servers, storage and network equipment, together with the
              power, cooling, fire protection and security systems that keep them running. Sizes range from a small
              server room to campuses drawing tens or hundreds of megawatts. What they share is the job: the IT load
              must stay powered and within its temperature limits, around the clock.
            </p>

            <h2 id="design-process">The data center design process</h2>
            <p>Design is sequential: each decision constrains the next, so the order matters.</p>
            <ol>
              <li>
                <strong>Set the requirement.</strong> IT load in kW or MW, growth plan, location, and the reliability
                target. This is the input every later step depends on.
              </li>
              <li>
                <strong>Choose the reliability target.</strong> The Tier I–IV classification and the redundancy scheme
                (N, N+1, 2N) decide how many power and cooling paths the design needs. See{" "}
                <Link href="/blog/data-center-tier-classification-explained">Data Center Tier Classification Explained</Link>{" "}
                and <Link href="/blog/redundancy-n-n1-2n-explained">N, N+1, 2N, 2(N+1) Explained</Link>.
              </li>
              <li>
                <strong>Design the electrical system.</strong> Utility connection, medium- and low-voltage distribution,
                UPS, generators, PDUs, earthing and protection, sized from the load calculation. Detail below.
              </li>
              <li>
                <strong>Design the cooling system.</strong> Heat removed must equal heat produced, so the IT load sets the
                cooling capacity. Layout choices such as aisle containment change how efficiently air is used.
              </li>
              <li>
                <strong>Lay out the white space.</strong> Racks, aisles, containment, cable routes and clearances.
              </li>
              <li>
                <strong>Document and check against standards.</strong> Single-line diagrams, load schedules, cable
                schedules and layouts, reviewed against the relevant standards.
              </li>
            </ol>

            <h2 id="electrical-design">Electrical design</h2>
            <p>
              Power is the core constraint of a data center, so electrical design is the largest part of the work. The
              chain runs from the utility feed through MV/LV distribution to UPS and PDUs, with generators as backup.
              Each stage is explained in a dedicated guide:
            </p>
            <ul>
              <li>
                <Link href="/blog/mv-lv-power-distribution-architecture-explained">MV/LV power distribution architecture</Link>
              </li>
              <li>
                <Link href="/blog/ups-topologies-explained">UPS topologies</Link> and{" "}
                <Link href="/blog/ups-vs-diesel-generator-data-center-backup-power">UPS vs diesel generator for backup power</Link>
              </li>
              <li>
                <Link href="/blog/pdu-power-distribution-unit-explained">PDU (power distribution unit)</Link>
              </li>
              <li>
                <Link href="/blog/cable-sizing-basics-for-data-center-electrical-design">Cable sizing basics</Link>
              </li>
              <li>
                <Link href="/blog/earthing-and-bonding-basics-for-data-centers">Earthing and bonding</Link>
              </li>
              <li>
                <Link href="/blog/protection-relay-explained">Protection relays</Link>,{" "}
                <Link href="/blog/current-transformer-explained">current transformers</Link> and{" "}
                <Link href="/blog/potential-transformer-explained">potential transformers</Link>
              </li>
              <li>
                <Link href="/blog/single-line-diagrams-explained">Single-line diagrams</Link>
              </li>
            </ul>

            <h2 id="cooling-and-efficiency">Cooling and efficiency</h2>
            <p>
              Almost every watt the IT equipment draws becomes heat the cooling system must remove. How well a facility
              uses its power is measured by PUE; how it manages airflow is largely a layout decision. See{" "}
              <Link href="/blog/pue-power-usage-effectiveness-explained">PUE explained</Link> and{" "}
              <Link href="/blog/hot-aisle-cold-aisle-containment-explained">hot aisle / cold aisle containment</Link>.
            </p>

            <h2 id="standards">Standards that apply</h2>
            <p>
              Data center designs are checked against published standards, including the Uptime Institute Tier
              Standard, TIA-942, IEC and IEEE electrical standards, NFPA fire codes and ASHRAE thermal guidelines. The
              specific edition and local codes that apply depend on the project and country, so confirm them for each
              design.
            </p>

            <h2 id="learn-it">Learn data center design</h2>
            <p>
              If you want to do this work professionally, the{" "}
              <Link href="/programs/electrical-design-data-center">Electrical Design – Data Center Specialist</Link>{" "}
              program teaches the process above on a full project: standards, load calculations, cable sizing,
              single-line diagrams, layout and the software used in industry, taught live online. You can also read the
              career guide,{" "}
              <Link href="/blog/how-to-become-a-data-center-electrical-design-engineer-in-india">
                how to become a data center electrical design engineer in India
              </Link>
              .
            </p>
            <h2 id="free-resources">Free resources</h2>
            <ul>
              <li>
                <Link href="/resources/data-center-design-basics-checklist">Data Center Design Basics Checklist</Link>
              </li>
              <li>
                <Link href="/resources/data-center-commissioning-handover-checklist">Commissioning and Handover Checklist</Link>
              </li>
              <li>
                <Link href="/resources/data-center-engineering-career-roadmap">Data Center Engineering Career Roadmap</Link>
              </li>
              <li>
                <Link href="/engineers-toolkit">Engineer&apos;s Toolkit: free calculators</Link>
              </li>
            </ul>
          </div>
        </ArticleShell>
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
