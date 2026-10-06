import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "earth-conductor-sizing-adiabatic-equation-example"
const title = "Earth Cable Size Calculation: The Adiabatic Equation Explained"
const description = "How to size an earthing (protective) conductor with the adiabatic equation S = I√t / k, with a worked example, where k comes from, and what the calculation does not cover."

const heroImageSrc = "/data-center-cable-sizing.jpg"
const heroImageAlt = "Earth conductors and earthing bars in a data center"

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
    "question": "How do you calculate earth cable size?",
    "answer": "Use S = I × √t ÷ k, where I is the earth fault current in amperes, t the protection clearing time in seconds, and k a factor for the conductor material, insulation and temperature limits. Round up to the next standard size."
  },
  {
    "question": "Where does k come from?",
    "answer": "From the applicable standard, which gives values for combinations of conductor material, insulation and initial and final temperatures. Use the value for your conductor, not a generic figure."
  },
  {
    "question": "Does a larger fault current or longer clearing time need a bigger conductor?",
    "answer": "Yes. Required area rises with the fault current and with the square root of the clearing time, so slow protection forces bigger earthing conductors."
  },
  {
    "question": "Is thermal withstand the only check?",
    "answer": "No. Earthing also needs a low-impedance path so protection operates, safe touch and step voltages, mechanical strength and corrosion resistance. Those checks are separate."
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
          description={"The earth conductor has to survive the fault current for as long as the protection takes to clear it. The adiabatic equation gives the minimum area, and the answer depends heavily on clearing time."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'Earth Cable Size Calculation: The Adiabatic Equation Explained' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="formula">The equation</h2>
            <p>S = I × √t ÷ k</p>
            <ul>
              <li>S: minimum cross-section area in mm²</li>
              <li>I: earth fault current in amperes</li>
              <li>t: time for the protection to clear the fault in seconds</li>
              <li>k: factor for the conductor material and temperature limits, taken from the standard</li>
            </ul>

            <h2 id="example">Worked example</h2>
            <p>
              Illustrative example, not a project. Earth fault current 10 kA, protection clearing time 0.5 s, copper conductor
              with k assumed as 143 (take the real value for your insulation and temperatures from the standard).
            </p>
            <ol>
              <li>√t = √0.5 = 0.707</li>
              <li>S = 10,000 × 0.707 ÷ 143 = <strong>49.5 mm²</strong></li>
              <li>Next standard size: <strong>50 mm²</strong></li>
            </ol>
            <p>
              If the clearing time were 1 s instead, S = 10,000 × 1 ÷ 143 = 70 mm². This is why protection settings and earthing
              conductor sizes must be designed together. See <Link href="/blog/protection-coordination-basics-data-center">protection coordination</Link>.
            </p>

            <h2 id="more">Other checks</h2>
            <ul>
              <li><strong>Impedance:</strong> the earth fault loop must be low enough for the protection to operate.</li>
              <li><strong>Touch and step voltage:</strong> depends on the earth electrode system and soil. See <Link href="/blog/data-center-earthing-design-tn-s-bonding">earthing design</Link>.</li>
              <li><strong>Mechanical and corrosion:</strong> minimum sizes and materials for the environment.</li>
            </ul>

            <h2 id="tool">Calculate it</h2>
            <p>
              The <Link href="/engineers-toolkit/conductor-sizing-calculator">earth conductor sizing calculator</Link> includes this check. For the
              national code context, see the <Link href="/blog/is-3043-earthing-code-summary">IS 3043 summary</Link> and{" "}
              <Link href="/blog/iec-60364-data-center-electrical-installations">IEC 60364</Link>.
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
