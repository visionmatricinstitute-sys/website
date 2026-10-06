import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "etap-for-data-center-design-where-it-fits"
const title = "ETAP for Data Center Design: Where It Fits"
const description = "What ETAP is used for in data center electrical design: short-circuit, load flow, protection coordination and arc-flash studies, and how studies connect to the single-line diagram."

const heroImageSrc = "/data-center-single-line-diagram.jpg"
const heroImageAlt = "Electrical power system model in study software"

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
    "question": "What is ETAP used for?",
    "answer": "Modelling electrical power systems and running studies such as load flow, short circuit, protection coordination, arc flash, motor starting and harmonics."
  },
  {
    "question": "Do I need ETAP to design a data center?",
    "answer": "You can do early sizing with hand calculations, but final studies on larger systems are normally done in software such as ETAP. Employers often ask for it."
  },
  {
    "question": "What does ETAP need as input?",
    "answer": "A single-line model with sources, transformers, cables, switchgear, loads and protective device data, all with correct ratings."
  },
  {
    "question": "Does ETAP replace engineering judgement?",
    "answer": "No. It calculates what you model, so the quality of the data and the choice of scenarios decide the value of the result."
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
          description={"ETAP is a power system analysis tool. In a data center project it takes the single-line diagram and turns it into the studies that prove the design: fault levels, loading, coordination and arc flash."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'ETAP for Data Center Design: Where It Fits' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="studies">Studies it runs</h2>
            <table>
              <thead><tr><th>Study</th><th>Question it answers</th></tr></thead>
              <tbody>
                <tr><td>Load flow</td><td>Are voltages and loadings within limits? See <Link href="/blog/load-flow-study-explained-data-center">load flow study</Link></td></tr>
                <tr><td>Short circuit</td><td>What fault current must equipment withstand? See <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link></td></tr>
                <tr><td>Protection coordination</td><td>Does only the nearest device trip? See <Link href="/blog/protection-coordination-basics-data-center">protection coordination</Link></td></tr>
                <tr><td>Arc flash</td><td>What incident energy at each board? See <Link href="/blog/arc-flash-basics-data-center-engineers">arc flash basics</Link></td></tr>
                <tr><td>Motor starting and harmonics</td><td>Do large starts or non-linear loads cause problems? See <Link href="/blog/harmonics-in-data-centers-sources-and-mitigation">harmonics</Link></td></tr>
              </tbody>
            </table>

            <h2 id="workflow">Where it fits in the workflow</h2>
            <ol>
              <li>Size the main equipment by calculation. See <Link href="/blog/data-center-load-calculation-it-load-to-utility-demand">load calculation</Link>.</li>
              <li>Draw the single-line diagram. See <Link href="/blog/single-line-diagrams-explained">single-line diagrams</Link>.</li>
              <li>Build the model with verified data and run the studies for normal, maintenance and generator cases.</li>
              <li>Adjust the design and settings, and issue the results and settings for commissioning.</li>
            </ol>

            <h2 id="care">Care points</h2>
            <ul>
              <li>Check every input against datasheets; a wrong impedance gives a confident wrong answer.</li>
              <li>Run all operating scenarios, including the failure and generator cases.</li>
              <li>Keep the model and the single-line diagram in step.</li>
            </ul>
            <p>The VMI <Link href="/programs/electrical-design-data-center">Electrical Design – Data Center Specialist program</Link> includes a module on site engineering and ETAP.</p>
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
