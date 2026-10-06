import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "hv-cable-sizing-calculation-worked-example"
const title = "HV Cable Sizing Calculation: A Worked Example"
const description = "How to size an HV (11 kV) cable: design current, derating, voltage drop and short-circuit withstand, with a worked example showing why the fault level often decides the conductor size."

const heroImageSrc = "/data-center-cable-sizing.jpg"
const heroImageAlt = "High voltage cable run feeding a data center transformer"

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
    "question": "How do you size an HV cable?",
    "answer": "Find the design current, apply derating factors for installation conditions to get the required tabulated current rating, check voltage drop, and check that the conductor can withstand the prospective short-circuit current for the fault clearing time. The largest size required by these checks governs."
  },
  {
    "question": "Why does short-circuit withstand often decide HV cable size?",
    "answer": "Because HV systems have high fault levels while load currents are modest. A conductor sized for load current may overheat during a fault, so the minimum area from the adiabatic equation can be larger."
  },
  {
    "question": "What is the adiabatic equation?",
    "answer": "S = I × √t ÷ k, where S is the minimum conductor area in mm², I the fault current in amperes, t the fault duration in seconds and k a factor depending on the conductor material and insulation temperature limits."
  },
  {
    "question": "Where do the ampacity and impedance values come from?",
    "answer": "From the cable manufacturer's datasheet and the applicable standard for the installation method. The values in this example are illustrative."
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
          description={"For medium and high voltage cables the load current is often small and the fault current is large, so the short-circuit check frequently decides the size. Here is the full method with a worked example."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the article 'HV Cable Sizing Calculation: A Worked Example' and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="assumptions">The example and its assumptions</h2>
            <p>
              Illustrative example, not a project. A 2,500 kVA transformer is fed at 11 kV, three phase, by a 300 m copper XLPE
              cable. The prospective fault level at the source is 25 kA for 1 second. Total derating factor for the installation
              is assumed to be 0.80, and k for copper XLPE is taken as 143. Take real values from the cable datasheet and the
              governing standard.
            </p>

            <h2 id="step-1">Step 1: Design current</h2>
            <p>I = kVA ÷ (√3 × V) = 2,500 ÷ (1.732 × 11) = <strong>131 A</strong>.</p>

            <h2 id="step-2">Step 2: Required tabulated rating</h2>
            <p>
              Required tabulated current rating = design current ÷ derating factor = 131 ÷ 0.80 = <strong>164 A</strong>. The
              chosen cable's tabulated rating for the installation method must be at least this. Ground temperature, depth of
              burial, soil thermal resistivity and grouping all feed the derating factor.
            </p>

            <h2 id="step-3">Step 3: Short-circuit withstand</h2>
            <p>S = I × √t ÷ k = 25,000 × √1 ÷ 143 = <strong>175 mm²</strong>, so the next standard size is 185 mm².</p>
            <p>
              The load current alone could be carried by a much smaller cable. The fault level makes 185 mm² the minimum, which is
              why the short-circuit check cannot be skipped.
            </p>

            <h2 id="step-4">Step 4: Voltage drop</h2>
            <p>
              With R = 22.5 ÷ 185 = 0.122 Ω/km, an assumed X = 0.10 Ω/km and cos φ = 0.9 (sin φ = 0.436), the drop is
              √3 × 131 × 0.3 × (0.122 × 0.9 + 0.10 × 0.436) = about 10 V, which is about 0.1% of 11 kV. Voltage drop is not an issue
              at this length. See <Link href="/blog/voltage-drop-calculation-formula-examples">voltage drop formula and examples</Link>.
            </p>

            <h2 id="result">Result</h2>
            <table>
              <thead><tr><th>Check</th><th>Requirement</th></tr></thead>
              <tbody>
                <tr><td>Current rating</td><td>At least 164 A tabulated, which a small cable meets</td></tr>
                <tr><td>Short-circuit withstand</td><td>At least 175 mm², so 185 mm² (governs)</td></tr>
                <tr><td>Voltage drop</td><td>About 0.1%, so it passes</td></tr>
              </tbody>
            </table>
            <p>
              Also check the cable screen and its earthing arrangement for the fault current, and the cable's rated voltage and
              insulation level for the system. The <Link href="/engineers-toolkit/conductor-sizing-calculator">HV and LV cable sizing calculator</Link>
              runs these checks for your inputs. Related: <Link href="/blog/short-circuit-calculation-basics-lv-systems">short circuit basics</Link>
              and <Link href="/blog/cable-sizing-basics-for-data-center-electrical-design">cable sizing basics</Link>.
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
