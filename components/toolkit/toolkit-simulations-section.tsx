import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Atom, ExternalLink } from "lucide-react"

const SIMULATIONS = [
  {
    key: "generator",
    icon: Zap,
    title: "Generator Physics Simulator",
    description:
      "A synchronous generator rotor spins inside a fixed stator. Change the pole count and grid frequency to see synchronous speed respond in real time (Ns = 120f / P), watch magnetic flux sweep past each phase winding, and read the resulting Faraday's-Law EMF and three-phase sine waves as they're generated.",
    concepts: ["Synchronous speed (Ns = 120f / P)", "Faraday's Law (E = −N dΦ/dt)", "Three-phase EMF generation"],
    href: "/simulations/generator-physics-simulator.html",
  },
  {
    key: "electron-drift",
    icon: Atom,
    title: "Electron Drift vs. Field Speed",
    description:
      "Close the switch and a lamp meters away lights up almost instantly — because the electric field propagates through the conductor at a large fraction of the speed of light. But the electrons that actually carry the current only drift at a snail's pace. Adjust the current and wire size and compare both speeds directly.",
    concepts: ["Electric field propagation speed", "Electron drift velocity (vd = I / nAq)", "Energy flow (Poynting vector)"],
    href: "/simulations/electron-drift-simulator.html",
  },
]

export function ToolkitSimulationsSection() {
  return (
    <section id="toolkit-simulations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Electrical Simulation</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            Interactive Physics Simulators
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Beyond the calculators — visual, interactive simulations for building intuition around the electrical
            fundamentals behind the numbers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SIMULATIONS.map((sim) => (
            <Card key={sim.key} className="flex flex-col">
              <CardContent className="p-6 flex flex-col flex-1 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                  <sim.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-sans text-foreground">{sim.title}</h3>
                <p className="text-sm text-muted-foreground font-serif leading-relaxed">{sim.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {sim.concepts.map((concept) => (
                    <Badge key={concept} variant="secondary" className="font-normal">
                      {concept}
                    </Badge>
                  ))}
                </div>
                <div className="flex-1" />
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                  <a href={sim.href} target="_blank" rel="noopener noreferrer">
                    Launch Simulator
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 max-w-3xl mx-auto text-center text-sm text-muted-foreground font-serif bg-muted/40 rounded-lg p-4">
          Opens in a new tab. Best viewed on a laptop or desktop screen.
        </div>
      </div>
    </section>
  )
}
