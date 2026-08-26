import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"

const title = "PUE (Power Usage Effectiveness) Explained"
const description =
  "PUE is the single number every data center operator quotes — and the single number most people can recite without being able to say what it actually penalizes. Here's the real formula, what drives it, and why 1.0 is a number you'll never see."

const heroImageSrc = "/data-center-pue-explained.jpg"
const heroImageAlt = "Industrial cooling towers on a data center rooftop, the mechanical cooling load that PUE measures against IT power"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/pue-power-usage-effectiveness-explained" },
  openGraph: {
    type: "article",
    url: "/blog/pue-power-usage-effectiveness-explained",
    title,
    description,
    images: [{ url: heroImageSrc, width: 1200, height: 630, alt: heroImageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroImageSrc] },
}

const faqs = [
  {
    question: "What's considered a good PUE?",
    answer:
      "It depends heavily on climate, scale, and design vintage, but as a rough guide: 2.0+ is old/inefficient, 1.5-1.6 is a reasonable enterprise facility, and the best hyperscale campuses (with free cooling, hot/cold aisle containment, and high supply-air temperatures) report annual averages around 1.1-1.2. There is no universal 'good' number — the right comparison is against similar facilities in a similar climate.",
  },
  {
    question: "Can PUE ever actually reach 1.0?",
    answer:
      "Not in practice for a real, powered, cooled facility — 1.0 would mean zero overhead energy for cooling, lighting, or any support system, which isn't physically achievable at scale. PUE is a ratio to drive continuous improvement against, not a target that gets 'completed.'",
  },
  {
    question: "Does PUE measure how efficient the IT equipment itself is?",
    answer:
      "No — this is the single most common misunderstanding. PUE only measures facility overhead relative to IT load; it says nothing about whether the servers themselves are efficient, well-utilized, or doing useful work. A facility running underutilized, inefficient servers at high load can post an excellent PUE while wasting enormous amounts of energy on computing nothing useful. That's part of why metrics like effective computing capacity get tracked alongside PUE, not instead of it.",
  },
  {
    question: "Why does PUE change with the seasons?",
    answer:
      "Cooling load (the biggest driver of the overhead half of the ratio) varies with outside air temperature — many modern facilities use 'free cooling' (outside air or water-side economization) when ambient conditions allow, cutting mechanical cooling energy dramatically in cooler months. That's why PUE is normally reported as a trailing 12-month average, not a single day's reading, which can swing significantly with weather.",
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
  datePublished: "2026-08-26",
  dateModified: "2026-08-26",
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/pue-power-usage-effectiveness-explained",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: "/blog/pue-power-usage-effectiveness-explained" },
])

export default function PuePost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ArticleShell
          category="Technical Basics"
          title={title}
          description="Every hyperscaler brags about its PUE number. Almost nobody explaining it says what's actually in the denominator, or why a lower number always means less waste — never more computing."
          faqs={faqs}
          whatsappMessage="Hi, I read the PUE article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
        >
          <div>
            <h2 id="the-formula">The formula is deliberately simple</h2>
            <p>
              PUE = Total Facility Energy ÷ IT Equipment Energy. "IT Equipment Energy" is what the servers,
              storage, and networking gear actually consume. "Total Facility Energy" is that same number plus
              everything else the building draws to keep the IT load running: cooling, lighting, UPS losses,
              power distribution losses, and any other support infrastructure. A PUE of 1.5 means for every 1 kW
              delivered to IT equipment, the facility as a whole draws 1.5 kW — the extra 0.5 kW is overhead.
            </p>

            <h2 id="what-drives-it">What actually drives the number</h2>
            <p>
              Cooling is almost always the largest single overhead component, often 30-40% of a poorly optimized
              facility's total draw. That's why hot/cold aisle containment, higher supply-air setpoints (per
              ASHRAE TC 9.9 guidance), and free cooling all show up directly in PUE — they all reduce mechanical
              cooling energy without touching IT load. UPS and power distribution losses are the second-largest
              lever: every conversion stage (AC-DC-AC through a UPS, step-down transformers, PDUs) has real
              efficiency losses that scale with how many stages the power passes through and how well-loaded each
              stage runs.
            </p>

            <h2 id="not-an-it-metric">What PUE does not measure</h2>
            <p>
              PUE only scores the ratio of overhead to IT load — it has nothing to say about whether that IT load
              is doing useful work. A facility full of idle, underutilized servers still counts every watt they
              draw as "IT Equipment Energy," which can make a genuinely wasteful operation look efficient on a PUE
              scorecard. This is exactly why PUE is reported alongside other metrics in mature operations, not
              treated as a complete efficiency picture on its own.
            </p>

            <h2 id="why-seasonal">Why the number moves with the weather</h2>
            <p>
              Facilities using free cooling (drawing on cool outside air or water instead of running mechanical
              chillers) see PUE drop meaningfully in cooler months and rise in peak summer, when compressors have
              to do more of the work. That's why the Green Grid, which standardized the metric, specifies PUE as a
              trailing 12-month average rather than a spot reading — a single winter day's PUE says very little
              about a facility's real annual overhead.
            </p>

            <h2 id="design-implications">Where this shows up in real design work</h2>
            <p>
              PUE isn't calculated after a facility is built — the target PUE is often set at the concept design
              stage and directly shapes real decisions: UPS topology and loading strategy, chiller plant sizing and
              free-cooling economizer inclusion, containment strategy, and even transformer sizing and loading
              targets (transformers run most efficiently loaded to roughly 40-70% of capacity, not near either
              extreme). A design engineer handed a PUE target needs to know which levers actually move that number
              and by how much — not just that "better cooling helps."
            </p>
          </div>
        </ArticleShell>
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-serif">
              Read more:{" "}
              <Link href="/blog" className="text-accent font-semibold hover:underline">
                All articles
              </Link>{" "}
              or explore the{" "}
              <Link href="/programs/electrical-design-data-center" className="text-accent font-semibold hover:underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program, which covers PUE, WUE, and CUE as part of Module 1's foundations.
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
