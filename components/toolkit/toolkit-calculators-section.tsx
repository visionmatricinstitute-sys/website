"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

/* ---------------- Reference data (indicative, see disclaimer) ---------------- */
const SIZES = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630]

const AMPACITY: Record<"pvc" | "xlpe", number[]> = {
  pvc: [17.5, 24, 32, 41, 57, 76, 96, 119, 144, 184, 223, 259, 299, 341, 403, 464, 530, 590, 678],
  xlpe: [23, 31, 42, 54, 75, 100, 127, 158, 192, 246, 298, 346, 399, 456, 538, 621, 700, 780, 895],
}

const AMBIENT_FACTOR: Record<"pvc" | "xlpe", Record<number, number>> = {
  pvc: { 10: 1.22, 15: 1.17, 20: 1.12, 25: 1.06, 30: 1.0, 35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.5 },
  xlpe: { 10: 1.15, 15: 1.12, 20: 1.08, 25: 1.04, 30: 1.0, 35: 0.96, 40: 0.91, 45: 0.87, 50: 0.82, 55: 0.76, 60: 0.71 },
}

const MATERIAL_FACTOR: Record<"cu" | "al", number> = { cu: 1.0, al: 0.78 }
const RESISTIVITY: Record<"cu" | "al", number> = { cu: 22.5, al: 36 } // ohm.mm^2/km
const BREAKERS = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630]

function groupingFactor(n: number) {
  if (n <= 1) return 1.0
  if (n === 2) return 0.8
  if (n === 3) return 0.7
  if (n === 4) return 0.65
  if (n === 5) return 0.6
  if (n <= 6) return 0.57
  if (n <= 9) return 0.54
  if (n <= 12) return 0.5
  if (n <= 15) return 0.45
  if (n <= 19) return 0.41
  return 0.38
}

function fmt(n: number, d = 2) {
  return Number.isFinite(n) ? n.toFixed(d) : "-"
}

function CableSizingCalculator() {
  const [system, setSystem] = useState<"1" | "3">("3")
  const [kw, setKw] = useState(100)
  const [voltage, setVoltage] = useState(415)
  const [pf, setPf] = useState(0.9)
  const [length, setLength] = useState(50)
  const [material, setMaterial] = useState<"cu" | "al">("cu")
  const [insulation, setInsulation] = useState<"pvc" | "xlpe">("xlpe")
  const [ambient, setAmbient] = useState(30)
  const [grouping, setGrouping] = useState(1)
  const [vdLimit, setVdLimit] = useState(5)

  const result = useMemo(() => {
    const Ib = system === "1" ? (kw * 1000) / (voltage * pf) : (kw * 1000) / (1.732 * voltage * pf)
    const In = BREAKERS.find((b) => b >= Ib)
    const Ca = AMBIENT_FACTOR[insulation][ambient] ?? 1
    const Cg = groupingFactor(grouping)
    const Mf = MATERIAL_FACTOR[material]
    const baseTable = AMPACITY[insulation]
    const target = In ?? Ib * 1.25

    let idx = -1
    for (let i = 0; i < baseTable.length; i++) {
      if (baseTable[i] * Ca * Cg * Mf >= target) {
        idx = i
        break
      }
    }
    const size = idx >= 0 ? SIZES[idx] : SIZES[SIZES.length - 1]
    const baseAmp = baseTable[idx >= 0 ? idx : SIZES.length - 1]
    const Iz = baseAmp * Ca * Cg * Mf
    const outOfRange = idx === -1

    const R = RESISTIVITY[material] / 1000 / size
    const Vd = system === "1" ? 2 * Ib * R * length : 1.732 * Ib * R * length
    const VdPct = (Vd / voltage) * 100

    return {
      Ib,
      breakerText: In ? `${In} A` : "> 630 A",
      size,
      outOfRange,
      baseAmp,
      Ca,
      Cg,
      Mf,
      Iz,
      VdPct,
    }
  }, [system, kw, voltage, pf, length, material, insulation, ambient, grouping])

  const vdOk = result.VdPct <= vdLimit

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>System</Label>
              <Select value={system} onValueChange={(v) => setSystem(v as "1" | "3")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Single Phase</SelectItem>
                  <SelectItem value="3">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Load (kW)</Label>
              <Input type="number" value={kw} onChange={(e) => setKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Voltage (V)</Label>
              <Input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Power Factor</Label>
              <Input
                type="number"
                step="0.01"
                value={pf}
                onChange={(e) => setPf(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Cable Length (m)</Label>
              <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Conductor</Label>
              <Select value={material} onValueChange={(v) => setMaterial(v as "cu" | "al")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cu">Copper</SelectItem>
                  <SelectItem value="al">Aluminium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Insulation</Label>
              <Select value={insulation} onValueChange={(v) => setInsulation(v as "pvc" | "xlpe")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pvc">PVC (70°C)</SelectItem>
                  <SelectItem value="xlpe">XLPE (90°C)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Ambient Temp.</Label>
              <Select value={String(ambient)} onValueChange={(v) => setAmbient(Number(v))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((t) => (
                    <SelectItem key={t} value={String(t)}>
                      {t} °C{t === 30 ? " (ref)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Circuits Grouped</Label>
              <Input type="number" min={1} value={grouping} onChange={(e) => setGrouping(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Max. Voltage Drop</Label>
              <Select value={String(vdLimit)} onValueChange={(v) => setVdLimit(Number(v))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[3, 4, 5, 6].map((v) => (
                    <SelectItem key={v} value={String(v)}>
                      {v}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Design Current</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.Ib)} A</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Breaker Rating</div>
              <div className="text-xl font-bold text-foreground mt-1">{result.breakerText}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Selected Cable</div>
              <div className="text-xl font-bold text-foreground mt-1">
                {result.outOfRange ? "> " : ""}
                {result.size} mm²
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Voltage Drop</div>
              <div className={`text-xl font-bold mt-1 ${vdOk ? "text-green-600" : "text-destructive"}`}>
                {fmt(result.VdPct)} %
              </div>
            </div>
          </div>

          <div className="text-sm space-y-2 font-serif">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Base cable ampacity (30°C, single circuit)</span>
              <span className="font-medium">{fmt(result.baseAmp, 1)} A</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Ambient factor × Grouping factor × Material factor</span>
              <span className="font-medium">
                {fmt(result.Ca)} × {fmt(result.Cg)} × {fmt(result.Mf)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Derated cable ampacity (Iz)</span>
              <span className="font-medium">{fmt(result.Iz, 1)} A</span>
            </div>
          </div>

          <div
            className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
              vdOk ? "bg-green-500/10 text-green-700" : "bg-destructive/10 text-destructive"
            }`}
          >
            {vdOk ? <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" /> : <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />}
            <span>
              {vdOk
                ? `Voltage drop is within the selected ${vdLimit}% limit.`
                : `Voltage drop exceeds the selected ${vdLimit}% limit — increase cable size or shorten the run.`}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function QuickFormulasCalculator() {
  const [voltage, setVoltage] = useState(230)
  const [current, setCurrent] = useState(10)
  const [pf, setPf] = useState(0.9)

  const singlePhasePower = (voltage * current * pf) / 1000
  const threePhasePower = (1.732 * voltage * current * pf) / 1000
  const resistance = current > 0 ? voltage / current : Number.NaN

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Quick Electrical Formulas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Voltage (V)</Label>
            <Input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Current (A)</Label>
            <Input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Power Factor</Label>
            <Input type="number" step="0.01" value={pf} onChange={(e) => setPf(Number(e.target.value))} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">Resistance (Ohm's Law)</div>
            <div className="text-xl font-bold text-foreground mt-1">{fmt(resistance)} Ω</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">Single-Phase Power</div>
            <div className="text-xl font-bold text-foreground mt-1">{fmt(singlePhasePower)} kW</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">Three-Phase Power</div>
            <div className="text-xl font-bold text-foreground mt-1">{fmt(threePhasePower)} kW</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ToolkitCalculatorsSection() {
  return (
    <section id="toolkit-calculators" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Calculators</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Engineering Calculators</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Preliminary sizing tools for practicing the same calculations covered in our technical courses.
          </p>
        </div>

        <Tabs defaultValue="sizing" className="items-center">
          <TabsList>
            <TabsTrigger value="sizing">Cable &amp; Load Sizing</TabsTrigger>
            <TabsTrigger value="formulas">Quick Formulas</TabsTrigger>
          </TabsList>
          <TabsContent value="sizing" className="w-full mt-8">
            <CableSizingCalculator />
          </TabsContent>
          <TabsContent value="formulas" className="w-full mt-8">
            <QuickFormulasCalculator />
          </TabsContent>
        </Tabs>

        <div className="mt-10 max-w-3xl mx-auto text-center text-sm text-muted-foreground font-serif bg-muted/40 rounded-lg p-4">
          Values shown are indicative, simplified reference figures for preliminary/learning purposes and are
          aligned in principle with the IEC 60364 series. Always verify against a manufacturer's datasheet and
          the applicable standard before using these figures on a real project.
        </div>
      </div>
    </section>
  )
}
