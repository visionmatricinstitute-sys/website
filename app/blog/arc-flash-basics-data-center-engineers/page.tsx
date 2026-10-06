import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "arc-flash-basics-data-center-engineers"
const title = "Arc Flash Basics for Data Center Engineers"
const description = "What arc flash is, how incident energy is estimated, how it ties to protection settings, and the main ways to reduce the hazard."

const heroImageSrc = "/data-center-protection-relay.jpg"
const heroImageAlt = "Switchgear with arc flash warning labels"

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
    "question": "What is arc flash?",
    "answer": "A rapid release of energy when current flows through air between conductors, producing intense heat, light and pressure."
  },
  {
    "question": "What is incident energy?",
    "answer": "The thermal energy a worker would be exposed to at a working distance, commonly expressed in calories per square centimetre, estimated by a calculation method such as IEEE 1584."
  },
  {
    "question": "How does protection affect arc flash?",
    "answer": "The longer a fault takes to clear, the higher the incident energy. Faster protection reduces it, which is why coordination and arc-flash studies are linked."
  },
  {
    "question": "What are the main ways to reduce the hazard?",
    "answer": "Faster clearing times, maintenance-mode settings, zone selective interlocking, arc-resistant switchgear, remote operation and racking, and safe work procedures."
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
          description={"An arc flash is an explosive release of energy from an electrical fault in air. In a data center where people work on live-adjacent equipment, the study that estimates it is part of the design."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Arc Flash Basics for Data Center Engineers' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="what">What the study does</h2>
            <p>
              An arc-flash study calculates the incident energy at each piece of equipment from the fault current, the
              clearing time of the protection and the working distance. The results become warning labels and decide the
              protective measures needed to work on or near the equipment.
            </p>

            <h2 id="link">The link to protection settings</h2>
            <p>
              Incident energy rises with the time the protection takes to clear. Settings that give good selectivity can
              lengthen clearing time, so selectivity and arc-flash energy must be balanced. See{" "}
              <Link href="/blog/protection-coordination-basics-data-center">protection coordination</Link> and{" "}
              <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link>.
            </p>

            <h2 id="reduce">Reducing the hazard</h2>
            <ul>
              <li>Maintenance-mode or instantaneous settings that apply during work.</li>
              <li>Zone selective interlocking to clear faults faster without losing selectivity.</li>
              <li>Arc-resistant switchgear and barriers.</li>
              <li>Remote racking and switching so people are not in front of the equipment.</li>
              <li>Labels and procedures aligned with the applicable safety standard, such as NFPA 70E where it applies.</li>
            </ul>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Running the study on outdated single-line diagrams or settings.</li>
              <li>Treating labels as the only control.</li>
              <li>Ignoring the minimum fault case, which can be slower to clear and worse.</li>
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
