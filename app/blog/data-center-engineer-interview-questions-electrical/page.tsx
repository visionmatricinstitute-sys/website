import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-engineer-interview-questions-electrical"
const title = "Data Center Electrical Engineer Interview Questions and Answers"
const description = "Common technical interview questions for data center electrical roles with concise, correct answers: redundancy, UPS, generators, earthing, protection and calculations."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "Interview preparation for a data center electrical engineering role"

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
    "question": "What are the most common data center interview topics?",
    "answer": "Redundancy and tiers, UPS and generators, power distribution, protection, earthing, cable sizing, short-circuit basics and commissioning."
  },
  {
    "question": "How should I answer calculation questions?",
    "answer": "State your assumptions, show the steps and the units, and check the result against a sanity limit. Interviewers value the method as much as the answer."
  },
  {
    "question": "Should I memorise standards?",
    "answer": "Know what each major standard is for and when it applies. You are rarely expected to quote clause numbers from memory."
  },
  {
    "question": "How do I prepare?",
    "answer": "Work through a complete design example end to end, so you can explain every step and assumption."
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
          category={"Career Guide"}
          title={title}
          description={"Interviews for data center electrical roles test whether you understand why things are designed the way they are. Here are common questions with short answers you can build on."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Electrical Engineer Interview Questions and Answers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="redundancy">Redundancy and tiers</h2>
            <ul>
              <li><strong>What is the difference between N+1 and 2N?</strong> N+1 adds one spare module to a single system; 2N duplicates the whole system with independent paths. See <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link>.</li>
              <li><strong>What does concurrently maintainable mean?</strong> Any component or path can be taken out for planned maintenance without affecting the IT load. See <Link href="/blog/data-center-tier-classification-explained">tier classification</Link>.</li>
            </ul>

            <h2 id="power">Power chain</h2>
            <ul>
              <li><strong>Why a UPS and a generator?</strong> The UPS carries the load instantly and for a short time; the generator supplies longer outages. See <Link href="/blog/ups-vs-diesel-generator-data-center-backup-power">UPS vs generator</Link>.</li>
              <li><strong>STS or ATS?</strong> An STS switches a load between two UPS-backed sources quickly; an ATS moves the site between utility and generator. See <Link href="/blog/sts-vs-ats-data-center-transfer-switches">STS vs ATS</Link>.</li>
              <li><strong>How do you size a UPS?</strong> Critical load plus losses, charging and margin, converted to kVA, divided over the modules, then checked for the failure case. See <Link href="/blog/ups-sizing-data-center-worked-example">UPS sizing example</Link>.</li>
            </ul>

            <h2 id="protection">Protection and earthing</h2>
            <ul>
              <li><strong>What is protection coordination?</strong> Setting devices so only the one nearest a fault trips. See <Link href="/blog/protection-coordination-basics-data-center">protection coordination</Link>.</li>
              <li><strong>What is the difference between earthing and bonding?</strong> Earthing connects to the general mass of earth; bonding connects metalwork together so it stays at one potential. See <Link href="/blog/data-center-earthing-design-tn-s-bonding">earthing design</Link>.</li>
              <li><strong>How do you estimate short-circuit current at a transformer?</strong> Full-load current divided by the per-unit impedance, for an infinite-source estimate. See <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link>.</li>
            </ul>

            <h2 id="cables">Cables and cooling</h2>
            <ul>
              <li><strong>What decides a cable size?</strong> Current rating after derating, voltage drop and short-circuit withstand. See <Link href="/blog/voltage-drop-calculation-formula-examples">voltage drop</Link>.</li>
              <li><strong>CRAH or CRAC?</strong> CRAH uses chilled water; CRAC has its own compressor. See <Link href="/blog/crah-vs-crac-data-center-cooling-units">CRAH vs CRAC</Link>.</li>
              <li><strong>What is PUE?</strong> Total facility power divided by IT power. See <Link href="/blog/pue-power-usage-effectiveness-explained">PUE explained</Link>.</li>
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
