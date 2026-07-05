import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { STANDARDS } from "@/lib/toolkit-data"

export function ToolkitStandardsSection() {
  return (
    <section id="toolkit-standards" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Standards Reference</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            Electrical &amp; Data Center Standards
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            The standards our calculators and coursework are aligned with, organized by topic — a quick reference
            for what to cite and where to look things up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {STANDARDS.map((category) => (
            <Card key={category.key}>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold font-sans text-foreground">{category.title}</h3>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item.code} className="flex items-start gap-3 border-b border-border last:border-0 pb-3 last:pb-0">
                      <Badge variant="secondary" className="mt-0.5 shrink-0 whitespace-nowrap">
                        {item.code}
                      </Badge>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground font-serif">{item.scope}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
