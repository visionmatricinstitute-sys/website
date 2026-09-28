import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { TOOLKIT_TOOLS } from "@/lib/toolkit-tools"
import {
  Cable,
  Boxes,
  BatteryCharging,
  Battery,
  Fuel,
  Power,
  Zap,
  Calculator,
  Gauge,
  Lightbulb,
  ArrowDownToLine,
  Server,
  Snowflake,
  TrendingDown,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

const TOOL_ICONS: Record<string, LucideIcon> = {
  "conductor-sizing-calculator": Cable,
  "transformer-sizing-calculator": Boxes,
  "ups-selection-calculator": BatteryCharging,
  "generator-sizing-calculator": Fuel,
  "breaker-sizing-calculator": Power,
  "short-circuit-calculator": Zap,
  "power-factor-correction-calculator": Gauge,
  "lighting-calculator": Lightbulb,
  "grounding-resistance-calculator": ArrowDownToLine,
  "battery-runtime-calculator": Battery,
  "data-center-efficiency-calculator": Server,
  "cooling-load-calculator": Snowflake,
  "motor-starting-voltage-dip-calculator": TrendingDown,
  "quick-electrical-formulas-calculator": Calculator,
}

export function ToolkitCalculatorsSection() {
  return (
    <section id="toolkit-calculators" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Data Center Calculation Tools</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            Data Center Electrical Calculators
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Preliminary sizing tools for practicing the same calculations covered in our technical courses — each
            calculator has its own page with worked formulas, so you can bookmark, share or search for the exact
            one you need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLKIT_TOOLS.map((tool) => {
            const ToolIcon = TOOL_ICONS[tool.slug] ?? Calculator
            return (
              <Link
                key={tool.slug}
                href={`/engineers-toolkit/${tool.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-background p-6 hover:border-accent hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                  <ToolIcon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-bold font-sans text-foreground mb-2">{tool.shortLabel}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed flex-1">{tool.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-accent font-semibold mt-4">
                  Open calculator
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 max-w-3xl mx-auto text-center text-sm text-muted-foreground font-serif bg-muted/40 rounded-lg p-4">
          Values shown are indicative, simplified reference figures for preliminary/learning purposes and are
          aligned in principle with the IEC 60364, IEC 60076, IEC 62040, ISO 8528, IEC 60909, IEEE 80, IEEE 141,
          EN 12464-1, TIA-942 and The Green Grid (PUE/WUE/CUE) references. Always verify against a manufacturer's
          datasheet and the applicable standard before using these figures on a real project.
        </div>
      </div>
    </section>
  )
}
