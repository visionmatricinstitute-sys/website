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

const title = "Data Center Commissioning and Handover Checklist"
const path = "/resources/data-center-commissioning-handover-checklist"
const description = "A free checklist for the electrical side of data center commissioning and handover: documents, FAT, installation checks, functional tests, integrated systems testing and close-out. Print or save as PDF."
const heroImage = "/electrical-design-data-center.jpg"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", url: path, title, description, images: [{ url: heroImage, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [heroImage] },
}

const sections: { heading: string; note?: string; items: { text: string; href?: string }[] }[] = [
  {
    "heading": "1. Before testing starts",
    "items": [
      {
        "text": "Commissioning plan agreed: levels, responsibilities, test scripts and acceptance criteria."
      },
      {
        "text": "Latest single-line diagrams, protection settings and sequences of operation issued to the commissioning team."
      },
      {
        "text": "Test access and load-bank connection points exist and are labelled."
      },
      {
        "text": "Safety procedures, permits and lock-out arrangements agreed."
      }
    ]
  },
  {
    "heading": "2. Factory and delivery checks",
    "items": [
      {
        "text": "FAT witnessed for switchgear, UPS, generators and transformers, with records filed."
      },
      {
        "text": "Equipment inspected on delivery against the order and for transit damage."
      },
      {
        "text": "Open FAT and delivery punch items logged with owners and dates."
      }
    ]
  },
  {
    "heading": "3. Installation checks",
    "items": [
      {
        "text": "Equipment installed and labelled as drawn; torque, phase rotation and earthing checked."
      },
      {
        "text": "Insulation resistance and continuity tests recorded for cables and busbars."
      },
      {
        "text": "Protection settings loaded and verified against the coordination study."
      },
      {
        "text": "Cable and panel schedules reconciled with what is installed."
      }
    ]
  },
  {
    "heading": "4. Functional tests",
    "items": [
      {
        "text": "Each breaker, ATS and STS operated and the transfer behaviour recorded."
      },
      {
        "text": "UPS tested for transfer to battery, return to mains and bypass operation."
      },
      {
        "text": "Generators tested on load, including start time and step load response."
      },
      {
        "text": "Alarms and monitoring points verified at the control system."
      }
    ]
  },
  {
    "heading": "5. Integrated systems testing",
    "items": [
      {
        "text": "Utility failure with generator start and transfer, under load-bank load."
      },
      {
        "text": "Loss of a single component or path, to confirm the redundancy works as designed."
      },
      {
        "text": "Cooling restart and sequencing checked through the power transition."
      },
      {
        "text": "Results compared against the design intent and failures re-tested after correction."
      }
    ]
  },
  {
    "heading": "6. Handover and close-out",
    "items": [
      {
        "text": "As-built drawings, test records and settings handed over."
      },
      {
        "text": "Operations and maintenance manuals and emergency procedures issued."
      },
      {
        "text": "Training for the operations team completed and recorded."
      },
      {
        "text": "Outstanding items listed with owners and a closure date."
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
            <p className="text-lg text-white/70 font-serif leading-relaxed mb-8">A working checklist for the electrical side of commissioning, from the plan to handover. Adapt it to your project's own commissioning plan and specification.</p>
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
                            ☐ 
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
            <p className="text-xs text-muted-foreground font-serif">A general checklist, not a substitute for the project specification or the commissioning authority's procedures. See <Link href="/blog/data-center-commissioning-levels-explained" className="underline underline-offset-4">commissioning levels explained</Link> and <Link href="/blog/fat-sat-ist-testing-data-center-explained" className="underline underline-offset-4">FAT, SAT and IST</Link>.</p>
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
              <a href={"https://wa.me/919930259997?text=Hi%2C%20I%20downloaded%20the%20Commissioning%20Checklist%20and%20want%20to%20know%20more."} target="_blank" rel="noopener noreferrer">
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
