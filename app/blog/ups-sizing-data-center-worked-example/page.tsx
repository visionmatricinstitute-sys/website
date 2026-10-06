import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ArticleShell } from "@/components/blog/article-shell"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getAdjacentPosts } from "@/lib/blog-posts"

const slug = "ups-sizing-data-center-worked-example"
const title = "UPS Sizing for a Data Center: A Worked Example"
const description =
  "Step-by-step UPS sizing for a 1,200 kW critical load: losses, battery charging, growth margin, power factor, and how N, N+1 and 2N module choices change normal and post-failure loading. All assumptions are stated."

const heroImageSrc = "/data-center-ups-topologies.jpg"
const heroImageAlt = "UPS modules in a data center electrical room"

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
    question: "How do I size a UPS for a data center?",
    answer:
      "Start from the critical IT load in kW, add UPS and distribution losses, any battery charging load and a growth margin, convert to kVA using the UPS output power factor, then divide across the working modules, round up to a standard rating and add the redundant module(s) your tier or redundancy target needs. Finally check the loading after one module fails.",
  },
  {
    question: "Is UPS capacity sized in kW or kVA?",
    answer:
      "Both matter. The load is usually known in kW, but a UPS has a kVA rating and a rated output power factor. Modern UPS units are often rated at 0.9 or unity power factor, so the kW capacity is the kVA rating times that power factor. Always check the manufacturer's datasheet for the kW rating.",
  },
  {
    question: "What loading should a UPS run at?",
    answer:
      "There is no single correct number. Efficiency is usually best at moderate to high loading, while redundancy requires headroom so the remaining modules can carry the load after a failure. Many designs set a limit on post-failure loading as a policy; it should come from the project specification and the manufacturer's data, not from a rule of thumb.",
  },
  {
    question: "Does N+1 mean the UPS is fully redundant?",
    answer:
      "No. N+1 gives one spare module for a single system, so it tolerates one module failure but still has a common output path. 2N duplicates the whole system, including the distribution path. See the redundancy explainer for the difference.",
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

export default function UpsSizingPost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ArticleShell
          category="Electrical Design"
          title={title}
          description="UPS sizing is arithmetic plus a few judgement calls. Here is the arithmetic, with every assumption written down, so you can see which numbers are physics and which are design choices."
          faqs={faqs}
          whatsappMessage="Hi, I read the UPS sizing article and want to know more about the Electrical Design course."
          heroImage={{ src: heroImageSrc, alt: heroImageAlt }}
          prevPost={prev}
          nextPost={next}
        >
          <div>
            <h2 id="assumptions">The example and its assumptions</h2>
            <p>
              This is an illustrative example, not a project. The numbers are chosen to show the method; replace every
              one of them with your project's data and the manufacturer's datasheet values.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Input</th>
                  <th>Assumed value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Critical (IT) load</td><td>1,200 kW</td></tr>
                <tr><td>UPS efficiency at operating load</td><td>96%</td></tr>
                <tr><td>Downstream distribution losses</td><td>2% of critical load</td></tr>
                <tr><td>Battery charging load</td><td>60 kW</td></tr>
                <tr><td>Growth margin</td><td>10%</td></tr>
                <tr><td>UPS output power factor</td><td>0.9</td></tr>
                <tr><td>Standard ratings available</td><td>…, 400, 500, 600, 800, 1,000, 1,200 kVA, …</td></tr>
              </tbody>
            </table>

            <h2 id="step-1">Step 1: Total required power</h2>
            <ul>
              <li>UPS losses = 1,200 × (100/96 − 1) = 50 kW</li>
              <li>Distribution losses = 1,200 × 2% = 24 kW</li>
              <li>Subtotal = 1,200 + 50 + 24 + 60 = 1,334 kW</li>
              <li>Growth margin = 1,334 × 10% = 133.4 kW</li>
              <li>Total required = 1,334 + 133.4 = <strong>1,467.4 kW</strong></li>
            </ul>
            <p>
              Whether to add the growth margin here, or to plan expansion as a separate phase, is a design decision.
              Oversizing day one reduces efficiency and raises cost; undersizing forces a rebuild.
            </p>

            <h2 id="step-2">Step 2: Convert to kVA</h2>
            <p>
              Required capacity = 1,467.4 kW ÷ 0.9 = <strong>1,630 kVA</strong>. This is the capacity the UPS system must
              deliver when no module has failed <em>and</em> when one has, depending on the redundancy you choose next.
            </p>

            <h2 id="step-3">Step 3: Choose the module arrangement</h2>
            <p>
              With N working modules sharing the load, each module must carry 1,630 ÷ N kVA, rounded up to a standard
              rating. Then redundancy adds spare capacity on top. For an N+1 system:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Working modules (N)</th>
                  <th>kVA per module needed</th>
                  <th>Standard rating</th>
                  <th>Modules installed (N+1)</th>
                  <th>Loading, all modules healthy</th>
                  <th>Loading after one module fails</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2</td><td>815</td><td>1,000 kVA</td><td>3</td><td>54%</td><td>82%</td></tr>
                <tr><td>3</td><td>543</td><td>600 kVA</td><td>4</td><td>68%</td><td>91%</td></tr>
                <tr><td>4</td><td>408</td><td>500 kVA</td><td>5</td><td>65%</td><td>82%</td></tr>
              </tbody>
            </table>
            <p>
              Loading figures are required kVA ÷ installed kVA of the modules still running. Note how the choices differ.
              N = 3 leaves the surviving modules at about 91% after a failure: workable, but with little headroom. N = 2 and
              N = 4 both land near 82% after a failure, but N = 4 needs five smaller modules and N = 2 needs three large
              ones, which changes cost, footprint and the effect of a single fault on a bigger block of load.
            </p>

            <h2 id="step-4">Step 4: Check the failure case</h2>
            <p>
              The point of redundancy is the post-failure case. Loading after one failure must stay within the UPS's
              continuous rating, and in practice within whatever limit the project specification sets. A design that
              passes with all modules healthy but overloads after one failure is not redundant.
            </p>

            <h2 id="n-vs-2n">What changes with 2N</h2>
            <p>
              With 2N, each of two independent systems is sized to carry the full load. For this example that is two
              systems of at least 1,630 kVA each, for example 3 × 600 kVA (1,800 kVA) per side instead of one shared N+1 bank.
              Each side normally carries about half the load (815 kVA, 45% of 1,800 kVA), and a complete system or
              distribution path can be lost without interrupting the load. The cost is about double the installed
              capacity. See the{" "}
              <Link href="/blog/redundancy-n-n1-2n-explained">redundancy explainer</Link> for how N+1, 2N and 2(N+1)
              relate to the Tier levels.
            </p>

            <h2 id="battery">Battery autonomy is a separate calculation</h2>
            <p>
              The UPS kVA rating sets how much load it can carry. How long it can carry it on battery is a separate
              sizing step, driven by the autonomy time you need before the generator picks up and by the battery's
              discharge characteristics. Use the{" "}
              <Link href="/engineers-toolkit/battery-runtime-calculator">battery runtime calculator</Link> for that.
            </p>

            <h2 id="mistakes">Common mistakes</h2>
            <ul>
              <li>Sizing in kW and ordering in kVA (or the reverse) without checking the output power factor.</li>
              <li>Forgetting battery charging load and UPS losses in the total.</li>
              <li>Checking loading only with all modules healthy.</li>
              <li>Treating N+1 and 2N as interchangeable.</li>
              <li>Picking module count from catalogue convenience instead of from the failure case and footprint.</li>
            </ul>

            <h2 id="tool">Run your own numbers</h2>
            <p>
              The{" "}
              <Link href="/engineers-toolkit/ups-selection-calculator">UPS sizing &amp; selection calculator</Link>{" "}
              uses these same steps and lets you change every assumption. Choosing the topology (standby, line-interactive
              or double-conversion) is a separate decision covered in{" "}
              <Link href="/blog/ups-topologies-explained">UPS topologies explained</Link>; for backup beyond the battery
              see <Link href="/blog/ups-vs-diesel-generator-data-center-backup-power">UPS vs diesel generator</Link>. This
              article is part of the{" "}
              <Link href="/data-center-design">data center design guide</Link>.
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
              program.
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
