import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "commissioning-engineer-data-center-role-and-skills"
const title = "Data Center Commissioning Engineer: Role and Skills"
const description = "What a data center commissioning engineer does, the skills the role needs, a typical week on a project, and how to move into it from design or site work."

const heroImageSrc = "/data-center-electrical-engineer-career.jpg"
const heroImageAlt = "A commissioning engineer testing data center electrical equipment"

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
    "question": "What does a commissioning engineer do?",
    "answer": "Plans and carries out tests on equipment and systems, records the results, tracks defects to closure and supports handover to operations."
  },
  {
    "question": "What skills are needed?",
    "answer": "Strong electrical and controls understanding, test procedure discipline, clear documentation, fault-finding and coordination with contractors and suppliers."
  },
  {
    "question": "How is it different from site engineering?",
    "answer": "Site engineers focus on installation and quality; commissioning engineers focus on testing and proving performance."
  },
  {
    "question": "How can I move into commissioning?",
    "answer": "Gain site or design experience, learn the testing sequence and levels, and look for commissioning assistant roles."
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
          description={"Commissioning engineers prove that the facility works before real load depends on it. It is a hands-on role that rewards careful, systematic people."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Data Center Commissioning Engineer: Role and Skills' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="role">The role</h2>
            <ul>
              <li>Prepare and review test scripts against the design intent.</li>
              <li>Witness factory tests and carry out site and integrated tests. See <Link href="/blog/fat-sat-ist-testing-data-center-explained">FAT, SAT and IST</Link>.</li>
              <li>Record results, raise defects and track them to closure.</li>
              <li>Support handover with records and training.</li>
            </ul>

            <h2 id="skills">Skills</h2>
            <table>
              <thead><tr><th>Skill</th><th>Why it matters</th></tr></thead>
              <tbody>
                <tr><td>Electrical and controls knowledge</td><td>To understand what each test should prove</td></tr>
                <tr><td>Procedure discipline</td><td>Tests must be repeatable and recorded</td></tr>
                <tr><td>Fault-finding</td><td>Failures during testing must be diagnosed quickly</td></tr>
                <tr><td>Communication</td><td>Many parties must act on the results</td></tr>
              </tbody>
            </table>

            <h2 id="path">Moving in</h2>
            <ol>
              <li>Learn the commissioning levels. See <Link href="/blog/data-center-commissioning-levels-explained">commissioning levels explained</Link>.</li>
              <li>Use the <Link href="/resources/data-center-commissioning-handover-checklist">commissioning and handover checklist</Link> to practise.</li>
              <li>Look for assistant or trainee roles on live projects.</li>
            </ol>
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
