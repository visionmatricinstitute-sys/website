import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { PROGRAM_MODULES } from "@/lib/program-data"

export function ProgramModules() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">02 · What You Will Master</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            14 modules. One integrated competence stack.
          </h2>
        </FadeIn>

        <FadeIn>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60 border-b border-border">
                    <th className="text-left font-semibold text-muted-foreground px-4 py-3 w-12">#</th>
                    <th className="text-left font-semibold text-muted-foreground px-4 py-3">Module</th>
                    <th className="text-left font-semibold text-muted-foreground px-4 py-3 w-20">Hours</th>
                    <th className="text-left font-semibold text-muted-foreground px-4 py-3">Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {PROGRAM_MODULES.map((m) => (
                    <tr key={m.number} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-accent font-semibold">{m.number}</td>
                      <td className="px-4 py-3 font-medium text-foreground font-sans">{m.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.hours}</td>
                      <td className="px-4 py-3 text-muted-foreground font-serif">{m.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8">
          <Card className="bg-navy text-navy-foreground border-none">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg shrink-0">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-accent mb-1">Capstone Project</div>
                <p className="font-serif text-navy-foreground/85 leading-relaxed">
                  A 15 MW Tier III data center — full electrical design package, defended before an industry
                  review panel.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
