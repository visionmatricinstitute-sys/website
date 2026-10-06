import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "fat-sat-ist-testing-data-center-explained"
const title = "FAT, SAT and IST in Data Center Projects Explained"
const description = "What factory acceptance testing (FAT), site acceptance testing (SAT) and integrated systems testing (IST) each prove, in what order they happen, and who signs them off."

const heroImageSrc = "/data-center-protection-relay.jpg"
const heroImageAlt = "Test equipment connected to switchgear during acceptance testing"

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
    "question": "What is FAT in a data center project?",
    "answer": "Factory acceptance testing is performed at the manufacturer's facility, usually witnessed by the client or their representative, to confirm the equipment meets the specification before it ships."
  },
  {
    "question": "What is SAT?",
    "answer": "Site acceptance testing is performed on site after installation to confirm the equipment works as installed and connected, including checks that could not be done at the factory."
  },
  {
    "question": "What is IST?",
    "answer": "Integrated systems testing verifies that all interdependent systems work together, including their response to simulated failures."
  },
  {
    "question": "Is the order fixed?",
    "answer": "Normally FAT comes first, then SAT, then integrated testing, but project plans define the exact sequence and overlap."
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
          description={"Three acronyms, three questions: does the equipment work, does it work as installed, and do the systems work together. Here is how they fit in sequence."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the FAT SAT IST article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="compare">The three tests</h2>
            <table>
              <thead><tr><th></th><th>FAT</th><th>SAT</th><th>IST</th></tr></thead>
              <tbody>
                <tr><td>Where</td><td>Factory</td><td>Site</td><td>Site</td></tr>
                <tr><td>Question</td><td>Does the equipment meet the specification?</td><td>Does it work as installed and connected?</td><td>Do the systems work together, including during failures?</td></tr>
                <tr><td>Typical scope</td><td>One equipment item or assembly, such as switchgear or a UPS</td><td>The installed equipment and its connections</td><td>Whole-facility scenarios</td></tr>
                <tr><td>Sign-off</td><td>Client or representative witnesses</td><td>Contractor, supplier and client or commissioning agent</td><td>Commissioning agent and client</td></tr>
              </tbody>
            </table>

            <h2 id="why">Why all three</h2>
            <p>
              Each finds faults the others cannot. FAT catches manufacturing and configuration problems before delivery, SAT
              catches installation and interface problems, and IST catches system-level behaviour such as sequencing and
              control logic. Skipping one pushes the fault to a later, more expensive stage.
            </p>

            <h2 id="relation">Relation to the commissioning levels</h2>
            <p>
              FAT corresponds roughly to the first commissioning level, SAT to the installation and functional levels, and IST
              to the last. See <Link href="/blog/data-center-commissioning-levels-explained">commissioning levels explained</Link>.
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
