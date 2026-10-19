import Link from "next/link"
import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: [string, string]; rows: [string, string][] }

export type LegalSection = { heading: string; blocks: LegalBlock[] }

// Supports **bold** and [text](href) inside legal copy, so the content files stay plain text.
function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        )
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        const className = "text-accent underline underline-offset-2 hover:text-foreground"
        return link[2].startsWith("/") ? (
          <Link key={i} href={link[2]} className={className}>
            {link[1]}
          </Link>
        ) : (
          <a key={i} href={link[2]} className={className}>
            {link[1]}
          </a>
        )
      }
      return part
    })
}

export function LegalPage({
  title,
  intro,
  lastUpdated,
  sections,
}: {
  title: string
  intro: string
  lastUpdated: string
  sections: LegalSection[]
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-navy py-16 lg:py-20 overflow-hidden">
          <div className="relative container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-serif font-medium text-white leading-tight mb-4">{title}</h1>
            <p className="text-lg text-white/70 font-body leading-relaxed">{intro}</p>
            <p className="text-sm text-white/50 font-body mt-4">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl space-y-10">
            {sections.map((section, s) => (
              <div key={section.heading}>
                <h2 className="text-xl lg:text-2xl font-serif font-medium text-foreground mb-4">
                  {s + 1}. {section.heading}
                </h2>
                <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                  {section.blocks.map((block, b) => {
                    if (block.type === "p") return <p key={b}>{inline(block.text)}</p>
                    if (block.type === "ul") {
                      return (
                        <ul key={b} className="list-disc pl-6 space-y-2">
                          {block.items.map((item) => (
                            <li key={item}>{inline(item)}</li>
                          ))}
                        </ul>
                      )
                    }
                    return (
                      <div key={b} className="overflow-x-auto">
                        <table className="w-full text-sm border border-border">
                          <thead className="bg-muted">
                            <tr>
                              {block.head.map((h) => (
                                <th key={h} className="text-left font-semibold text-foreground p-3 border-b border-border">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows.map(([a, c]) => (
                              <tr key={a} className="border-b border-border last:border-0">
                                <td className="p-3 align-top">{inline(a)}</td>
                                <td className="p-3 align-top">{inline(c)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
