import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ToolkitHero } from "@/components/toolkit/toolkit-hero"
import { ToolkitCalculatorsSection } from "@/components/toolkit/toolkit-calculators-section"
import { ToolkitStandardsSection } from "@/components/toolkit/toolkit-standards-section"
import { ToolkitLibrarySection } from "@/components/toolkit/toolkit-library-section"
import { ToolkitLinksSection } from "@/components/toolkit/toolkit-links-section"

const title = "Engineer's Toolkit | Vision Matrix Institute"
const description =
  "Free electrical engineering calculators (cable sizing, transformer, UPS, generator, breaker, short-circuit, power factor, lighting, grounding), a standards reference library, and curated resources for engineering students."

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
        <ToolkitStandardsSection />
        <ToolkitLibrarySection />
        <ToolkitLinksSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
