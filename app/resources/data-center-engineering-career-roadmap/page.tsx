import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MessageCircle } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { PrintButton } from "@/components/resources/print-button"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"

const title = "Data Center Engineering Career Roadmap"
const path = "/resources/data-center-engineering-career-roadmap"
const description = "A free stage-by-stage roadmap for electrical engineers moving into data center design: fundamentals, power chain, calculations, drawings, standards and protection, and a capstone project."
const heroImage = "/data-center-electrical-engineer-career.jpg"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", url: path, title, description, images: [{ url: heroImage, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [heroImage] },
}

const sections: { heading: string; note?: string; items: { text: string; href?: string }[] }[] = [
  {
    "heading": "Stage 1: Understand the facility",
    "note": "You are done when you can explain how a data center works and why it is built around redundancy.",
    "items": [
      {
        "text": "What a data center is, its main systems and the types",
        "href": "/blog/what-is-a-data-center-components-and-how-it-works"
      },
      {
        "text": "Tier classification",
        "href": "/blog/data-center-tier-classification-explained"
      },
      {
        "text": "Redundancy: N, N+1, 2N",
        "href": "/blog/redundancy-n-n1-2n-explained"
      }
    ]
  },
  {
    "heading": "Stage 2: The power chain",
    "note": "You are done when you can trace power from the utility to a rack and name every device on the way.",
    "items": [
      {
        "text": "MV/LV distribution architecture",
        "href": "/blog/mv-lv-power-distribution-architecture-explained"
      },
      {
        "text": "UPS topologies",
        "href": "/blog/ups-topologies-explained"
      },
      {
        "text": "UPS vs diesel generator",
        "href": "/blog/ups-vs-diesel-generator-data-center-backup-power"
      },
      {
        "text": "STS and ATS",
        "href": "/blog/sts-vs-ats-data-center-transfer-switches"
      },
      {
        "text": "PDUs",
        "href": "/blog/pdu-power-distribution-unit-explained"
      }
    ]
  },
  {
    "heading": "Stage 3: Calculations",
    "note": "You are done when you can size a UPS, generator, transformer, cable and capacitor bank and state your assumptions.",
    "items": [
      {
        "text": "Load calculation",
        "href": "/blog/data-center-load-calculation-it-load-to-utility-demand"
      },
      {
        "text": "UPS sizing",
        "href": "/blog/ups-sizing-data-center-worked-example"
      },
      {
        "text": "UPS battery sizing",
        "href": "/blog/ups-battery-sizing-autonomy-time-worked-example"
      },
      {
        "text": "Generator sizing",
        "href": "/blog/generator-sizing-data-center-worked-example"
      },
      {
        "text": "Voltage drop",
        "href": "/blog/voltage-drop-calculation-formula-examples"
      },
      {
        "text": "Short circuit basics",
        "href": "/blog/short-circuit-calculation-basics-lv-systems"
      },
      {
        "text": "Power factor correction",
        "href": "/blog/power-factor-correction-capacitor-bank-sizing"
      }
    ]
  },
  {
    "heading": "Stage 4: Drawings and documents",
    "note": "You are done when you can read and produce a single-line diagram, load schedule and cable schedule.",
    "items": [
      {
        "text": "Single-line diagrams",
        "href": "/blog/single-line-diagrams-explained"
      },
      {
        "text": "Cable tray sizing",
        "href": "/blog/cable-tray-sizing-fill-calculation-example"
      },
      {
        "text": "Busduct vs cable",
        "href": "/blog/busduct-vs-cable-data-center-power-distribution"
      },
      {
        "text": "Earthing and bonding",
        "href": "/blog/earthing-and-bonding-basics-for-data-centers"
      }
    ]
  },
  {
    "heading": "Stage 5: Protection, cooling and testing",
    "note": "You are done when you know how protection is coordinated and how a design is proven before handover.",
    "items": [
      {
        "text": "Protection relays",
        "href": "/blog/protection-relay-explained"
      },
      {
        "text": "Cooling systems",
        "href": "/blog/data-center-cooling-systems-explained"
      },
      {
        "text": "PUE and WUE",
        "href": "/blog/pue-power-usage-effectiveness-explained"
      },
      {
        "text": "Commissioning levels",
        "href": "/blog/data-center-commissioning-levels-explained"
      }
    ]
  },
  {
    "heading": "Stage 6: Software and a project",
    "note": "You are done when you have used industry tools on one complete design and can show the deliverables.",
    "items": [
      {
        "text": "Electrical Design – Data Center Specialist program (capstone: 10 MW Tier III data center)",
        "href": "/programs/electrical-design-data-center"
      },
      {
        "text": "BIM and Revit training",
        "href": "/programs/bim-revit-training"
      }
    ]
  }
]

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Resources", path },
  { name: title, path },
])

export default function ResourcePage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <section className="relative bg-navy py-20 lg:py-24 overflow-hidden print:hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">{title}</h1>
            <p className="text-lg text-white/70 font-serif leading-relaxed mb-8">A step-by-step path for electrical engineers who want to work on data center design. Each stage links to free guides; the final stage is a full project.</p>
            <PrintButton />
          </div>
        </section>

        <section className="py-16 bg-background print:py-4">
          <div className="container mx-auto px-4 max-w-3xl space-y-8">
            {sections.map((section, index) => (
              <FadeIn key={section.heading} delay={index * 0.05}>
                <Card className="print:shadow-none print:border-none">
                  <CardContent className="p-6 space-y-3">
                    <h2 className="text-xl font-bold font-sans text-foreground">{section.heading}</h2>
                    {section.note && <p className="text-sm text-muted-foreground font-serif">{section.note}</p>}
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <div key={item.text} className="flex items-start gap-2 text-sm text-muted-foreground font-serif">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5 print:hidden" />
                          <span>
                            
                            {item.href ? (
                              <Link href={item.href} className="text-foreground underline underline-offset-4 hover:no-underline">
                                {item.text}
                              </Link>
                            ) : (
                              item.text
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
            <p className="text-xs text-muted-foreground font-serif">This roadmap is a learning path, not a guarantee of employment. Salaries and job openings vary by country, employer and experience, so check current listings for your market.</p>
          </div>
        </section>

        <section className="py-12 bg-muted/30 print:hidden">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <p className="text-muted-foreground font-serif mb-4">
              Learn the full process in the{" "}
              <Link href="/programs/electrical-design-data-center" className="text-foreground font-semibold underline underline-offset-4 hover:no-underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <a href={"https://wa.me/919930259997?text=Hi%2C%20I%20read%20the%20Data%20Center%20Engineering%20Career%20Roadmap%20and%20want%20to%20know%20more."} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask us on WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
