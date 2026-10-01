import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ToolPageShell } from "@/components/toolkit/tool-page-shell"
import { ShortCircuitCalculator } from "@/components/toolkit/short-circuit-calculator"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { getToolkitTool } from "@/lib/toolkit-tools"

const tool = getToolkitTool("short-circuit-calculator")!

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: `/engineers-toolkit/${tool.slug}` },
  openGraph: {
    type: "website",
    url: `/engineers-toolkit/${tool.slug}`,
    title: tool.title,
    description: tool.description,
    images: [{ url: "/engineers-toolkit-hero.jpg", width: 1200, height: 630, alt: tool.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: tool.title,
    description: tool.description,
    images: ["/engineers-toolkit-hero.jpg"],
  },
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Engineer's Toolkit", path: "/engineers-toolkit" },
  { name: tool.title, path: `/engineers-toolkit/${tool.slug}` },
])

export default function ShortCircuitCalculatorPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <ToolPageShell slug={tool.slug} title={tool.title} description={tool.description}>
          <ShortCircuitCalculator />
        </ToolPageShell>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
