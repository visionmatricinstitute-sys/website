import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "lightning-protection-data-center-basics"
const title = "Lightning Protection for Data Centers: Basics"
const description = "How lightning protection for a data center is designed: risk assessment, external protection, bonding and surge protective devices, with the common mistakes."

const heroImageSrc = "/data-center-earthing-bonding.jpg"
const heroImageAlt = "Lightning protection and earthing arrangements for a data center building"

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
    "question": "What does lightning protection consist of?",
    "answer": "An external system (air terminals and down conductors to an earth termination), equipotential bonding, and surge protective devices on power and signal lines."
  },
  {
    "question": "Which standard covers it?",
    "answer": "The IEC 62305 series covers protection against lightning, including risk assessment. National standards may also apply."
  },
  {
    "question": "Do surge protective devices replace external protection?",
    "answer": "No. They address different paths. External protection handles a strike to the structure; SPDs protect equipment from surges entering through cables."
  },
  {
    "question": "Why bond the lightning earth to the main earth?",
    "answer": "So the structure and equipment rise together in potential during a strike, which limits dangerous voltage differences between them."
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
          description={"A direct strike is rare, but its effects, and those of nearby strikes, reach IT equipment through the power, data and earth paths. Lightning protection is a system with several layers."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Lightning Protection for Data Centers: Basics' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="risk">Start with a risk assessment</h2>
            <p>
              The IEC 62305 approach assesses risk from the structure's size, location, use and lightning frequency, and decides
              the protection level needed. The assessment, not habit, decides how much protection is justified.
            </p>

            <h2 id="layers">The layers</h2>
            <ol>
              <li><strong>External protection:</strong> air terminals, down conductors and an earth termination system.</li>
              <li><strong>Equipotential bonding:</strong> metallic services and the structure bonded together at the entry point.</li>
              <li><strong>Surge protective devices:</strong> coordinated stages on incoming power and on data and signal lines.</li>
              <li><strong>Shielding and routing:</strong> cable routes and shielding that limit induced voltage.</li>
            </ol>

            <h2 id="spd">Surge protection coordination</h2>
            <p>
              SPDs are installed in stages, from the main incoming board towards sensitive equipment, so each stage limits the
              surge the next one sees. Their ratings and the let-through voltage must suit the system voltage and the earthing
              arrangement.
            </p>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Treating SPDs as a substitute for external protection (or the reverse).</li>
              <li>A separate lightning earth that is not bonded to the main earth.</li>
              <li>Long SPD leads that raise the let-through voltage.</li>
              <li>No maintenance or testing regime.</li>
            </ul>
            <p>See also <Link href="/blog/data-center-earthing-design-tn-s-bonding">earthing design</Link>.</p>
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
