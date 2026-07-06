import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { TOOL_CATEGORIES, DELIVERABLES, COMPENSATION, CERTIFICATION_PREP } from "@/lib/program-data"

export function ProgramToolsOutcomes() {
  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">03 · Tools &amp; Deliverables</Badge>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
              Every tool an electrical designer touches.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {TOOL_CATEGORIES.map((cat, index) => (
              <FadeIn key={cat.title} delay={index * 0.08}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-accent mb-4">{cat.title}</h3>
                    <ul className="space-y-2">
                      {cat.tools.map((tool) => (
                        <li key={tool} className="text-sm text-foreground font-serif flex items-center gap-2">
                          <span className="text-accent">▸</span>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mb-8">
            <h3 className="text-2xl font-bold font-sans text-foreground">
              40+ portfolio-grade deliverables you will produce.
            </h3>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {DELIVERABLES.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground font-serif">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">04 · Your Outcomes</Badge>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
              A career that scales with the digital economy.
            </h2>
            <p className="text-muted-foreground font-serif leading-relaxed">
              Certified alumni move into the fastest-growing segment of electrical engineering — a credential that
              opens doors generalist electrical engineers do not reach.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold font-sans text-foreground mb-1">Indicative Compensation Ranges</h3>
                  <p className="text-xs text-muted-foreground mb-4">2024–2025, by region</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left font-semibold text-muted-foreground py-2">Region</th>
                          <th className="text-left font-semibold text-muted-foreground py-2">Mid-Level (3–7 yrs)</th>
                          <th className="text-left font-semibold text-muted-foreground py-2">Senior / Lead (8–15 yrs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COMPENSATION.map((row) => (
                          <tr key={row.region} className="border-b border-border last:border-0">
                            <td className="py-2.5 font-medium text-foreground">{row.region}</td>
                            <td className="py-2.5 text-muted-foreground">{row.mid}</td>
                            <td className="py-2.5 text-muted-foreground">{row.senior}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 font-serif italic">
                    Indicative ranges only — actual compensation depends on employer, project scale, and certifications held.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold font-sans text-foreground mb-4">Certifications this program prepares you for</h3>
                  <div className="space-y-3">
                    {CERTIFICATION_PREP.map((cert) => (
                      <div key={cert.body} className="flex items-start gap-3 border-b border-border last:border-0 pb-3 last:pb-0">
                        <Badge variant="secondary" className="mt-0.5 shrink-0 whitespace-nowrap">
                          {cert.body}
                        </Badge>
                        <span className="text-sm text-foreground font-serif">{cert.credential}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
