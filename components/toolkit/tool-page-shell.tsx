import type { ReactNode } from "react"
import Link from "next/link"
import { Calculator, ChevronRight } from "lucide-react"
import { getRelatedToolkitTools } from "@/lib/toolkit-tools"

export interface ToolPageShellProps {
  slug: string
  title: string
  description: string
  children: ReactNode
}

export function ToolPageShell({ slug, title, description, children }: ToolPageShellProps) {
  const relatedTools = getRelatedToolkitTools(slug)

  return (
    <>
      <section className="relative bg-gradient-to-br from-background to-muted py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 font-body">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/engineers-toolkit" className="hover:text-accent transition-colors">
              Engineer's Toolkit
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{title}</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Calculator className="h-4 w-4" />
            Data Center Electrical Calculator
          </div>
          <h1 className="text-3xl lg:text-5xl font-black font-sans text-foreground leading-tight mb-4 text-balance">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground font-serif leading-relaxed max-w-3xl">{description}</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">{children}</div>
      </section>

      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-black font-sans text-foreground mb-6">Explore more calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/engineers-toolkit/${tool.slug}`}
                className="block rounded-lg border border-border bg-background p-4 hover:border-accent hover:shadow-md transition-all"
              >
                <div className="font-semibold text-foreground text-sm mb-1">{tool.shortLabel}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">{tool.description}</div>
              </Link>
            ))}
          </div>
          <Link
            href="/engineers-toolkit"
            className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-foreground underline underline-offset-4 hover:no-underline"
          >
            View all tools in the Engineer's Toolkit
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
