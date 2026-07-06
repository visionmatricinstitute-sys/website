import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BookMarked, BadgeCheck } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

const PILLARS = [
  {
    number: "01",
    title: "Practitioner-Led",
    icon: Award,
    description:
      "Content is authored and taught by engineers with 25+ years in Tier III and Tier IV design. Every hour reflects live-project reality, not textbook theory.",
  },
  {
    number: "02",
    title: "Standards-Anchored",
    icon: BookMarked,
    description:
      "Every calculation, every drawing, every specification is tied to a specific clause of IEC, IEEE, NFPA, TIA, IS, or Uptime standards. Defend every decision.",
  },
  {
    number: "03",
    title: "Portfolio-Ready",
    icon: BadgeCheck,
    description:
      "You leave with a curated portfolio of your own deliverables — the Capstone package, module reports, calculation studies, and design narratives.",
  },
]

export function ProgramHighlights() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn className="max-w-3xl mb-16">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">01 · Why This Program</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            The world is being rebuilt around data.
          </h2>
          <p className="text-lg text-muted-foreground font-serif leading-relaxed">
            Every AI model, every payment, every message runs through a data center. Behind each of them is an
            electrical engineer who designed the power path — and got it right the first time. This program is
            built for engineers who are ready to stop learning fragments and start owning the full electrical
            scope of a hyperscale, colocation, or enterprise data center.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, index) => (
            <FadeIn key={pillar.number} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                      <pillar.icon className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-sm font-bold text-muted-foreground">{pillar.number}</span>
                  </div>
                  <h3 className="text-lg font-bold font-sans text-foreground">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground font-serif leading-relaxed">{pillar.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
