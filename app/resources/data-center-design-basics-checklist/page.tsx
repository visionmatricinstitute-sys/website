import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Printer, MessageCircle } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

const title = "Data Center Design Basics Checklist"
const description =
  "A free, practical checklist covering the essentials of data center electrical design — tier classification, distribution, UPS/generator sizing, cable sizing, and earthing. Print or save as PDF."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resources/data-center-design-basics-checklist" },
  openGraph: {
    type: "website",
    url: "/resources/data-center-design-basics-checklist",
    title,
    description,
  },
}

const sections = [
  {
    heading: "1. Tier & Reliability Requirements",
    items: [
      "Confirm the facility's target Uptime Institute tier (or equivalent) before designing anything else — every other decision follows from this.",
      "Identify Single Points of Failure (SPOFs) and confirm they match the target tier's tolerance.",
      "Document required concurrent maintainability and fault tolerance in writing, not just verbally agreed.",
    ],
  },
  {
    heading: "2. Load Calculation",
    items: [
      "Build a load list covering IT load, mechanical (cooling) load, and auxiliary loads separately.",
      "Apply realistic diversity/demand factors — don't just sum nameplate ratings.",
      "Include headroom for future growth, agreed explicitly with the client/owner.",
    ],
  },
  {
    heading: "3. Distribution Architecture",
    items: [
      "Choose radial, ring, block-redundant, or 2N based on the tier target — not by default habit.",
      "Map every load back to its power path(s) and confirm redundancy matches its criticality.",
      "Identify every transformer, switchgear, and busway rating needed along each path.",
    ],
  },
  {
    heading: "4. UPS & Generator Sizing",
    items: [
      "Size UPS for the actual critical load plus agreed growth margin, not just today's load.",
      "Confirm battery/flywheel autonomy is enough to bridge to generator start-up reliably.",
      "Size generators for step-load capability (e.g. UPS rectifier inrush), not just steady-state kW.",
      "Confirm fuel storage meets the facility's minimum runtime target and resupply plan.",
    ],
  },
  {
    heading: "5. Cable Sizing",
    items: [
      "Check current rating (ampacity) for the installation method actually used.",
      "Apply derating for ambient temperature and cable grouping/bundling.",
      "Check voltage drop over the full run length, not just at rated current.",
      "Check short-circuit withstand against the available fault current and clearing time.",
    ],
  },
  {
    heading: "6. Protection & Studies",
    items: [
      "Run a short-circuit study before finalizing protective device ratings.",
      "Run an arc-flash study and confirm PPE/labeling requirements are addressed.",
      "Confirm protection coordination across all levels — no nuisance trips, no missed trips.",
    ],
  },
  {
    heading: "7. Earthing, Bonding & Lightning Protection",
    items: [
      "Confirm the earthing system type (TN-S, TN-C-S, TT, etc.) matches the utility supply arrangement.",
      "Design a bonding network for racks, trays, and structural steel — not just safety earthing.",
      "Bond the lightning protection system's earthing to the main earthing system, not isolated.",
    ],
  },
  {
    heading: "8. Documentation",
    items: [
      "Single-line diagrams reflect the as-designed (and eventually as-built) system, kept current.",
      "Load schedules, cable schedules, and panel schedules are cross-checked against each other.",
      "Commissioning plan (FAT/SAT) is agreed before construction starts, not written afterward.",
    ],
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  publisher: { "@type": "Organization", name: "Vision Matrix Institute" },
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/resources/data-center-design-basics-checklist",
}

export default function ChecklistPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <section className="relative bg-navy py-20 lg:py-24 overflow-hidden print:hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">
              Data Center Design Basics Checklist
            </h1>
            <p className="text-lg text-white/70 font-serif leading-relaxed mb-8">
              A free, practical checklist covering the essentials across tier classification, distribution, UPS/
              generator sizing, cable sizing, protection, and earthing. Use it as a sanity check on your own
              designs, or as a study aid.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              onClick={() => window.print()}
            >
              <Printer className="mr-2 h-5 w-5" />
              Print / Save as PDF
            </Button>
          </div>
        </section>

        <section className="py-16 bg-background print:py-4">
          <div className="container mx-auto px-4 max-w-3xl space-y-8">
            {sections.map((section, index) => (
              <FadeIn key={section.heading} delay={index * 0.05}>
                <Card className="print:shadow-none print:border-none">
                  <CardContent className="p-6 space-y-3">
                    <h2 className="text-xl font-bold font-sans text-foreground">{section.heading}</h2>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground font-serif">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5 print:hidden" />
                          <span>☐ {item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="py-12 bg-muted/30 print:hidden">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <p className="text-muted-foreground font-serif mb-4">
              This checklist covers the essentials — our{" "}
              <Link href="/programs/electrical-design-data-center" className="text-accent font-semibold hover:underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program goes through every one of these in full depth, with real deliverables.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              asChild
            >
              <a
                href="https://wa.me/919930259997?text=Hi%2C%20I%20downloaded%20the%20Data%20Center%20Design%20Basics%20Checklist%20and%20want%20to%20know%20more."
                target="_blank"
                rel="noopener noreferrer"
              >
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
