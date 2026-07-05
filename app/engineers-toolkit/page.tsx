import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ToolkitHero } from "@/components/toolkit/toolkit-hero"
import { ToolkitCalculatorsSection } from "@/components/toolkit/toolkit-calculators-section"
import { ToolkitStandardsSection } from "@/components/toolkit/toolkit-standards-section"
import { ToolkitLibrarySection } from "@/components/toolkit/toolkit-library-section"
import { ToolkitLinksSection } from "@/components/toolkit/toolkit-links-section"

export const metadata: Metadata = {
  title: "Engineer's Toolkit | Vision Matrix Institute",
  description:
    "Sizing calculators, reference documents, drawing templates and curated links for Vision Matrix Institute students.",
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
