import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "generator-sizing-data-center-worked-example"
const title = "Generator Sizing for a Data Center: A Worked Example"
const description = "Step-by-step diesel generator sizing for a data center: UPS input load, cooling and auxiliary load, margin, kVA rating, and N+1 set count, with every assumption stated and the failure case checked."

const heroImageSrc = "/data-center-ups-topologies.jpg"
const heroImageAlt = "Standby diesel generator sets serving a data center"

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
    "question": "How do you size a generator for a data center?",
    "answer": "Add the electrical input of every load the generator must carry: the UPS input (including battery charging and UPS losses), cooling plant, lighting and small power, and other essential services. Add a margin, convert kW to kVA using the generator's rated power factor, check the largest motor starting step, then choose the standard rating and the number of sets for the redundancy target."
  },
  {
    "question": "Why is generator capacity larger than the IT load?",
    "answer": "Because the generator also feeds the UPS losses, battery recharge, cooling and building services that keep the IT load running. The IT load is only part of the site demand."
  },
  {
    "question": "Is generator size in kW or kVA?",
    "answer": "Both are quoted. A set is commonly rated in kVA at 0.8 power factor, so kW is kVA times 0.8. Always check which rating basis (standby, prime or continuous, per ISO 8528) the quoted figure uses."
  },
  {
    "question": "Do UPS loads need a bigger generator?",
    "answer": "Often yes. A UPS rectifier is a non-linear load that can cause harmonic voltage distortion and has a ramp-up behaviour on generator supply, so generators serving UPS systems are frequently oversized or paired with UPS walk-in and input filter features. Confirm with the generator and UPS manufacturers."
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
          description={"A data center generator has to carry the whole site, not just the IT load. Here is the arithmetic from UPS input to generator kVA, with every assumption written down and the number of sets checked for a failed set."}
          faqs={faqs}
          whatsappMessage={"Hi, I read the generator sizing article and want to know more about the Electrical Design course."}
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="assumptions">The example and its assumptions</h2>
            <p>
              This is an illustrative example, not a project. It continues the{" "}
              <Link href="/blog/ups-sizing-data-center-worked-example">UPS sizing example</Link> (1,200 kW critical load,
              96% UPS efficiency, 60 kW battery charging). Replace every figure with project data and manufacturer datasheets.
            </p>
            <table>
              <thead><tr><th>Input</th><th>Assumed value</th></tr></thead>
              <tbody>
                <tr><td>UPS input power</td><td>1,200 ÷ 0.96 + 60 = 1,310 kW</td></tr>
                <tr><td>Cooling plant electrical load</td><td>400 kW</td></tr>
                <tr><td>Lighting, small power, BMS, fire and security</td><td>60 kW</td></tr>
                <tr><td>Design margin</td><td>10%</td></tr>
                <tr><td>Generator rated power factor</td><td>0.8</td></tr>
              </tbody>
            </table>

            <h2 id="step-1">Step 1: Total running load</h2>
            <p>Running load = 1,310 + 400 + 60 = <strong>1,770 kW</strong>. With the 10% margin: 1,770 × 1.10 = <strong>1,947 kW</strong>.</p>

            <h2 id="step-2">Step 2: Convert to kVA</h2>
            <p>Required generator capacity = 1,947 ÷ 0.8 = <strong>2,434 kVA</strong>.</p>

            <h2 id="step-3">Step 3: Number and size of sets</h2>
            <p>
              One 2,500 kVA set would cover 2,434 kVA, but it would be a single point of failure. For N+1 with two working sets,
              each must be at least 2,434 ÷ 2 = 1,217 kVA, so choose 1,250 kVA sets and install three.
            </p>
            <table>
              <thead><tr><th>Check</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td>Installed capacity</td><td>3 × 1,250 = 3,750 kVA</td></tr>
                <tr><td>Load per set, all three running</td><td>2,434 ÷ 3,750 = 65%</td></tr>
                <tr><td>Load per set with one set failed</td><td>2,434 ÷ 2,500 = 97%</td></tr>
              </tbody>
            </table>
            <p>
              The post-failure case passes, but with very little headroom. That is a design finding, not a pass: it is a reason
              to revisit the margin, the load estimate, or the set size. A project with strict step-load or ambient derating
              requirements may need larger sets or a fourth set.
            </p>

            <h2 id="starting">Check the starting and step loads</h2>
            <p>
              Running load is not enough. The generator must also accept the largest motor start (typically a chiller or pump,
              often reduced with a soft starter or drive) and load steps as the transfer sequence picks up UPS and mechanical
              loads, within the voltage and frequency dip limits set by the specification. This usually decides the size for
              sites with large motors. See the{" "}
              <Link href="/engineers-toolkit/generator-sizing-calculator">generator sizing calculator</Link>, which sizes on the
              larger of running load and the starting requirement per ISO 8528.
            </p>

            <h2 id="derating">Derating and rating basis</h2>
            <p>
              Output falls with high ambient temperature and altitude, and the same engine has different standby, prime and
              continuous ratings. Size from the manufacturer's rating at the site's conditions, not from the nameplate alone.
            </p>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Sizing from the IT load instead of the whole site load.</li>
              <li>Mixing kW and kVA, or standby and prime ratings.</li>
              <li>Checking only running load and ignoring motor starts and UPS behaviour on generator supply.</li>
              <li>Not checking loading with one set out of service.</li>
              <li>Ignoring ambient and altitude derating.</li>
            </ul>

            <h2 id="related">Related</h2>
            <p>
              How the generator relates to batteries and runtime:{" "}
              <Link href="/blog/ups-vs-diesel-generator-data-center-backup-power">UPS vs diesel generator</Link>. How the system
              fits a redundancy target: <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explained</Link>.
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
