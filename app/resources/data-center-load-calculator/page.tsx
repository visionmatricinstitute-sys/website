import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { LeadMagnetForm } from "@/components/lead-magnet-form"
import { CheckCircle2 } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"

const title = "Free Data Center Load Calculator (Excel)"
const description =
  "A free planning-stage Excel tool to estimate connected load, demand load, and rough UPS/DG/battery sizing for a data center or data hall — built by Vision Matrix Institute."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resources/data-center-load-calculator" },
  openGraph: {
    type: "website",
    url: "/resources/data-center-load-calculator",
    title,
    description,
    images: [{ url: "/electrical-design-data-center.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/electrical-design-data-center.jpg"] },
}

const whatsInside = [
  "Step 1 — a load worksheet: list your equipment (IT racks, cooling, lighting, UPS/distribution losses, life safety, auxiliary) with quantity, unit rating, and diversity factor",
  "Step 2 — facility-level summary with a PUE (Power Usage Effectiveness) check",
  "Step 3 — UPS sizing estimate, with a safety/growth margin",
  "Step 4 — standby DG (generator) sizing estimate, with motor-starting margin",
  "Step 5 — simplified battery backup (Ah) sizing estimate",
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: "https://www.visionmatrixinstitute.com/electrical-design-data-center.jpg",
  author: { "@type": "Organization", name: "Vision Matrix Institute" },
  publisher: {
    "@type": "Organization",
    name: "Vision Matrix Institute",
    logo: { "@type": "ImageObject", url: "https://www.visionmatrixinstitute.com/icon.png" },
  },
  datePublished: "2026-08-17",
  dateModified: "2026-08-17",
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/resources/data-center-load-calculator",
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: title, path: "/resources/data-center-load-calculator" },
])

export default function LoadCalculatorPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <section className="relative bg-navy py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">{title}</h1>
            <p className="text-lg text-white/70 font-serif leading-relaxed">
              A working Excel tool to estimate connected load, demand load, and rough UPS/DG/battery sizing for a
              data center or data hall — built by Vision Matrix Institute as a learning resource and a preview of
              the calculation logic taught in the Data Center Electrical Design Specialist course.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl grid lg:grid-cols-2 gap-10 items-start">
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-sans text-foreground">What's inside</h2>
                <div className="space-y-3">
                  {whatsInside.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground font-serif">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground font-serif italic">
                  This is a planning-stage estimation tool for learning purposes, using simplified industry
                  rule-of-thumb methods — not a substitute for a detailed engineering study against the applicable
                  IS/IEC/NFPA standards. All outputs should be verified by a qualified electrical engineer before
                  any procurement or design decision.
                </p>
                <p className="text-muted-foreground font-serif">
                  This tool covers Steps 1–5 of a real data center electrical design. Our{" "}
                  <Link href="/programs/electrical-design-data-center" className="text-accent font-semibold hover:underline">
                    Electrical Design – Data Center Specialist
                  </Link>{" "}
                  program covers this end-to-end — SLD preparation, transformer &amp; UPS design, DG systems, cable
                  &amp; busduct sizing, earthing &amp; lightning protection, short-circuit studies in ETAP, and
                  Revit MEP/BIM coordination — taught live by practicing engineers.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <LeadMagnetForm downloadUrl="/downloads/VMI-Load-Calculator.xlsx" />
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
