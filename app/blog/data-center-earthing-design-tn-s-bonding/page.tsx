import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "data-center-earthing-design-tn-s-bonding"
const title = "Data Center Earthing Design: Systems, Bonding and Testing"
const description = "The main earthing system types, why bonding matters as much as earthing in a data center, how earth electrodes are tested, and the mistakes to avoid."

const heroImageSrc = "/data-center-earthing-bonding.jpg"
const heroImageAlt = "Earthing and bonding conductors in a data center"

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
    "question": "What earthing systems are used in data centers?",
    "answer": "The common types are TN-S, TN-C-S and TT, and sometimes IT for specific loads. Which one applies depends on the utility supply arrangement and the project requirements."
  },
  {
    "question": "What is the difference between earthing and bonding?",
    "answer": "Earthing connects the system to the general mass of earth. Bonding connects metallic parts together so they stay at the same potential, which reduces shock risk and equipment stress."
  },
  {
    "question": "How is earth resistance measured?",
    "answer": "Commonly by the fall-of-potential method using test electrodes, or by clamp-type testers where the arrangement allows. The target value comes from the project specification and applicable codes."
  },
  {
    "question": "Which standards apply in India?",
    "answer": "IS 3043 is the Indian code of practice for earthing. International projects commonly refer to the IEC 60364 series. Confirm which govern the project."
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
          description={"Earthing keeps people safe and lets protection operate; bonding keeps equipment at the same potential. A data center needs both, and the design goes beyond a single electrode."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Earthing Design: Systems, Bonding and Testing' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="systems">Earthing system types</h2>
            <table>
              <thead><tr><th>System</th><th>Idea</th></tr></thead>
              <tbody>
                <tr><td>TN-S</td><td>Separate neutral and protective earth conductors throughout</td></tr>
                <tr><td>TN-C-S</td><td>Combined neutral-earth in the supply, separated within the installation</td></tr>
                <tr><td>TT</td><td>Installation earthed independently of the supply earth</td></tr>
                <tr><td>IT</td><td>Isolated or high-impedance source with monitored first fault</td></tr>
              </tbody>
            </table>
            <p>The choice follows the utility supply and the protection design; the project specification decides.</p>

            <h2 id="bonding">Bonding network</h2>
            <p>
              A data center needs more than safety earthing. A bonding network ties together racks, cable trays, raised-floor
              or structural steel and equipment frames so they share a common reference. It limits touch voltages, helps fault
              current return and reduces noise problems. Lightning protection earthing is bonded to the main earthing system,
              not left separate. See <Link href="/blog/earthing-and-bonding-basics-for-data-centers">earthing and bonding basics</Link>.
            </p>

            <h2 id="electrodes">Electrodes and testing</h2>
            <ul>
              <li>Electrodes may be rods, plates, strips or a foundation (ring) earth, with test pits for access.</li>
              <li>Soil resistivity at the site decides how many electrodes are needed to meet the target.</li>
              <li>Measure the earth resistance on installation and again at intervals, because it changes with soil moisture. See the <Link href="/engineers-toolkit/grounding-resistance-calculator">earthing resistance calculator</Link>.</li>
            </ul>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Designing electrodes without a soil resistivity measurement.</li>
              <li>Isolating the lightning earth from the main earth.</li>
              <li>No bonding of cable trays and structural steel.</li>
              <li>Skipping periodic testing.</li>
            </ul>
            <p>Related: <Link href="/blog/lightning-protection-data-center-basics">lightning protection basics</Link>.</p>
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
