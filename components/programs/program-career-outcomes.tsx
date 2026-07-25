"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Briefcase } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { TARGET_ROLES, INDUSTRIES_HIRING, CAREER_GROWTH_PATH, LEARNING_OUTCOMES } from "@/lib/program-data"

export function ProgramCareerOutcomes() {
  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Career Landscape</Badge>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Where this specialization leads</h2>
            <p className="text-sm text-muted-foreground font-serif">
              India's data center capacity is widely projected to grow substantially by 2030 (industry estimates),
              expanding demand for specialists in this field.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <FadeIn>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold font-sans text-foreground mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-accent" /> Roles You Can Target
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {TARGET_ROLES.map((role) => (
                      <Badge key={role} variant="secondary" className="text-sm py-1.5 px-3">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold font-sans text-foreground mb-1">Career Growth Path</h3>
                  <p className="text-xs text-muted-foreground mb-4">Typical progression for this specialization</p>
                  <div className="space-y-2">
                    {CAREER_GROWTH_PATH.map((stage) => (
                      <div key={stage.title} className="flex items-center gap-3 border-b border-border last:border-0 pb-2 last:pb-0">
                        <Badge variant="secondary" className="shrink-0 whitespace-nowrap text-xs">
                          {stage.years}
                        </Badge>
                        <span className="text-sm text-foreground font-serif">{stage.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold font-sans text-foreground mb-1">Who's Hiring in This Space</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Examples of organizations active in data center design, delivery, and operations — shown to
                  illustrate the industry this specialization opens doors to. Not confirmed hiring partners or a
                  placement guarantee.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {INDUSTRIES_HIRING.map((group) => (
                    <div key={group.category}>
                      <div className="text-xs font-bold uppercase tracking-wide text-accent mb-1.5">{group.category}</div>
                      <div className="text-sm text-muted-foreground font-serif">{group.companies.join(", ")}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Learning Outcomes</Badge>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
              What you'll be able to do
            </h2>
            <p className="text-muted-foreground font-serif leading-relaxed">
              Every outcome below maps to a specific module and deliverable in the program — not abstract theory.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {LEARNING_OUTCOMES.map((outcome, index) => (
              <FadeIn key={outcome} delay={(index % 6) * 0.05}>
                <div className="flex items-start gap-2.5 text-sm text-foreground font-serif bg-background rounded-lg border border-border p-4">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  {outcome}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
