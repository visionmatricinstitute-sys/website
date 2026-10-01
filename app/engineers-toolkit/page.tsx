import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ToolkitHero } from "@/components/toolkit/toolkit-hero"
import { ToolkitCalculatorsSection } from "@/components/toolkit/toolkit-calculators-section"
import { ToolkitSimulationsSection } from "@/components/toolkit/toolkit-simulations-section"
import { ToolkitStandardsSection } from "@/components/toolkit/toolkit-standards-section"
import { ToolkitLibrarySection } from "@/components/toolkit/toolkit-library-section"
import { ToolkitLinksSection } from "@/components/toolkit/toolkit-links-section"

const title = "Data Center Calculation Tools & DC Calculator Suite | Engineer's Toolkit"
const description =
  "Free data center electrical calculation tools — cable/conductor sizing, transformer, UPS, generator, breaker, short-circuit, power factor, lighting, grounding, battery runtime, PUE/WUE/CUE, cooling load and motor starting dip — each calculator on its own page, plus a standards reference library."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/engineers-toolkit",
  },
  openGraph: {
    type: "website",
    url: "/engineers-toolkit",
    title,
    description,
    images: [
      {
        url: "/electrical-design-data-center.jpg",
        width: 1200,
        height: 630,
        alt: "Engineer's Toolkit - electrical engineering calculators and reference library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/electrical-design-data-center.jpg"],
  },
}

export default function EngineersToolkitPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ToolkitHero />
        <ToolkitCalculatorsSection />
        <ToolkitSimulationsSection />
        <ToolkitStandardsSection />
        <ToolkitLibrarySection />
        <ToolkitLinksSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
