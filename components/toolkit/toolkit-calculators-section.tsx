"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UpsSelectionCalculator } from "./ups-selection-calculator"
import { ConductorSizingSection } from "./conductor-sizing-section"
import {
  AlertTriangle,
  CheckCircle2,
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
} from "lucide-react"

/* ---------------- Reference data (indicative, see disclaimer) ---------------- */
const RESISTIVITY: Record<"cu" | "al", number> = { cu: 22.5, al: 36 } // ohm.mm^2/km
const BREAKERS = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630]

/* Standard equipment ratings and constants used by the sizing calculators below */
const TRANSFORMER_KVA = [25, 50, 75, 100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150]
const DG_KVA = [20, 30, 40, 62.5, 82.5, 100, 125, 160, 200, 250, 320, 380, 400, 500, 625, 750, 1000, 1250, 1500, 2000, 2500]

const MOTOR_START_MULTIPLIER: Record<string, number> = {
  dol: 6,
  "star-delta": 2.5,
  soft: 3.5,
  vfd: 1.2,
}

const SC_K_FACTOR: Record<"cu" | "al", Record<"pvc" | "xlpe", number>> = {
  cu: { pvc: 115, xlpe: 143 },
  al: { pvc: 76, xlpe: 94 },
}

function roundUpToStandard(value: number, table: number[]) {
  return table.find((v) => v >= value) ?? null
}

function fmt(n: number, d = 2) {
  return Number.isFinite(n) ? n.toFixed(d) : "-"
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

function TransformerSizingCalculator() {
  const [kw, setKw] = useState(500)
  const [pf, setPf] = useState(0.9)
  const [spare, setSpare] = useState(20)
  const [primaryV, setPrimaryV] = useState(11000)
  const [secondaryV, setSecondaryV] = useState(415)

  const result = useMemo(() => {
    const connectedKva = kw / pf
    const designKva = connectedKva * (1 + spare / 100)
    const selected = roundUpToStandard(designKva, TRANSFORMER_KVA)
    const base = selected ?? TRANSFORMER_KVA[TRANSFORMER_KVA.length - 1]
    const primaryFlc = (base * 1000) / (1.732 * primaryV)
    const secondaryFlc = (base * 1000) / (1.732 * secondaryV)
    return { connectedKva, designKva, selected, base, primaryFlc, secondaryFlc, outOfRange: selected === null }
  }, [kw, pf, spare, primaryV, secondaryV])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Connected Load (kW)</Label>
              <Input type="number" value={kw} onChange={(e) => setKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Load Power Factor</Label>
              <Input type="number" step="0.01" value={pf} onChange={(e) => setPf(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Spare Capacity / Growth (%)</Label>
              <Input type="number" value={spare} onChange={(e) => setSpare(Number(e.target.value))} />
            </div>
            <div />
            <div className="space-y-1.5">
              <Label>Primary Voltage (V)</Label>
              <Input type="number" value={primaryV} onChange={(e) => setPrimaryV(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Secondary Voltage (V)</Label>
              <Input type="number" value={secondaryV} onChange={(e) => setSecondaryV(Number(e.target.value))} />
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Design Load</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.designKva)} kVA</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Recommended Transformer</div>
              <div className="text-xl font-bold text-foreground mt-1">
                {result.outOfRange ? "> " : ""}
                {result.base} kVA
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Primary FLC</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.primaryFlc)} A</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Secondary FLC</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.secondaryFlc)} A</div>
            </div>
          </div>

          <div className="text-sm space-y-2 font-serif">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Connected load (kVA, before spare capacity)</span>
              <span className="font-medium">{fmt(result.connectedKva)} kVA</span>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Nearest standard rating per IEC 60076. Confirm impedance (%Z), vector group and cooling class
              (ONAN/ONAF) with the manufacturer before ordering.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


function GeneratorSizingCalculator() {
  const [kw, setKw] = useState(800)
  const [pf, setPf] = useState(0.8)
  const [diversity, setDiversity] = useState(0.8)
  const [largestMotorKw, setLargestMotorKw] = useState(75)
  const [startMethod, setStartMethod] = useState<"dol" | "star-delta" | "soft" | "vfd">("star-delta")

  const result = useMemo(() => {
    const runningKva = (kw * diversity) / pf
    const motorRunningKva = largestMotorKw / pf
    const motorStartingKva = motorRunningKva * MOTOR_START_MULTIPLIER[startMethod]
    const startingRequirementKva = runningKva - motorRunningKva + motorStartingKva
    const requiredKva = Math.max(runningKva, startingRequirementKva)
    const selected = roundUpToStandard(requiredKva, DG_KVA)
    const base = selected ?? DG_KVA[DG_KVA.length - 1]
    return { runningKva, motorStartingKva, startingRequirementKva, requiredKva, selected, base, outOfRange: selected === null }
  }, [kw, pf, diversity, largestMotorKw, startMethod])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Total Connected Load (kW)</Label>
              <Input type="number" value={kw} onChange={(e) => setKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Load Power Factor</Label>
              <Input type="number" step="0.01" value={pf} onChange={(e) => setPf(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Load Diversity Factor</Label>
              <Input type="number" step="0.05" value={diversity} onChange={(e) => setDiversity(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Largest Motor (kW)</Label>
              <Input type="number" value={largestMotorKw} onChange={(e) => setLargestMotorKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Motor Starting Method</Label>
              <Select value={startMethod} onValueChange={(v) => setStartMethod(v as typeof startMethod)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dol">Direct-On-Line (~6×)</SelectItem>
                  <SelectItem value="star-delta">Star-Delta (~2.5×)</SelectItem>
                  <SelectItem value="soft">Soft Starter (~3.5×)</SelectItem>
                  <SelectItem value="vfd">VFD (~1.2×)</SelectItem>
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Running Load</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.runningKva)} kVA</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Starting Requirement</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.startingRequirementKva)} kVA</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Recommended Generator Set</div>
              <div className="text-xl font-bold text-foreground mt-1">
                {result.outOfRange ? "> " : ""}
                {result.base} kVA
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Per ISO 8528. Sized on the larger of steady-state running load and the voltage-dip-limited starting
              requirement of the largest motor. Verify against the alternator's transient reactance and site
              altitude/temperature derating with the manufacturer.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BreakerSizingCalculator() {
  const [system, setSystem] = useState<"1" | "3">("3")
  const [kw, setKw] = useState(75)
  const [voltage, setVoltage] = useState(415)
  const [pf, setPf] = useState(0.85)
  const [loadType, setLoadType] = useState<"general" | "motor">("motor")
  const [startMethod, setStartMethod] = useState<"dol" | "star-delta" | "soft" | "vfd">("dol")

  const result = useMemo(() => {
    const Ib = system === "1" ? (kw * 1000) / (voltage * pf) : (kw * 1000) / (1.732 * voltage * pf)
    const In = BREAKERS.find((b) => b >= Ib) ?? null
    const startingMultiplier = loadType === "motor" ? MOTOR_START_MULTIPLIER[startMethod] : 1
    const startingCurrent = Ib * startingMultiplier
    const instantaneousMin = startingCurrent * 1.2
    const instantaneousMax = startingCurrent * 1.6
    return { Ib, In, startingCurrent, instantaneousMin, instantaneousMax }
  }, [system, kw, voltage, pf, loadType, startMethod])

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
              <Input type="number" step="0.01" value={pf} onChange={(e) => setPf(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Load Type</Label>
              <Select value={loadType} onValueChange={(v) => setLoadType(v as "general" | "motor")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Distribution</SelectItem>
                  <SelectItem value="motor">Motor Feeder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {loadType === "motor" && (
              <div className="space-y-1.5">
                <Label>Starting Method</Label>
                <Select value={startMethod} onValueChange={(v) => setStartMethod(v as typeof startMethod)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dol">Direct-On-Line (~6×)</SelectItem>
                    <SelectItem value="star-delta">Star-Delta (~2.5×)</SelectItem>
                    <SelectItem value="soft">Soft Starter (~3.5×)</SelectItem>
                    <SelectItem value="vfd">VFD (~1.2×)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Full Load Current</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.Ib)} A</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Recommended Breaker (In)</div>
              <div className="text-xl font-bold text-foreground mt-1">{result.In ? `${result.In} A` : "> 630 A"}</div>
            </div>
            {loadType === "motor" && (
              <>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-xs font-semibold uppercase text-muted-foreground">Starting Current</div>
                  <div className="text-xl font-bold text-foreground mt-1">{fmt(result.startingCurrent)} A</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-xs font-semibold uppercase text-muted-foreground">Instantaneous Trip Range</div>
                  <div className="text-xl font-bold text-foreground mt-1">
                    {fmt(result.instantaneousMin, 0)}–{fmt(result.instantaneousMax, 0)} A
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              The breaker's breaking capacity (Icu) must also exceed the prospective short-circuit current at its
              location — use the Short-Circuit Calculator tab to check that separately.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ShortCircuitCalculator() {
  const [kva, setKva] = useState(1000)
  const [impedance, setImpedance] = useState(6)
  const [voltage, setVoltage] = useState(415)
  const [includeCable, setIncludeCable] = useState(false)
  const [length, setLength] = useState(30)
  const [size, setSize] = useState(120)
  const [material, setMaterial] = useState<"cu" | "al">("cu")
  const [insulation, setInsulation] = useState<"pvc" | "xlpe">("xlpe")
  const [faultTime, setFaultTime] = useState(0.2)

  const result = useMemo(() => {
    const transformerFlc = (kva * 1000) / (1.732 * voltage)
    const iscTransformer = transformerFlc / (impedance / 100)

    const zTransformer = ((impedance / 100) * (voltage * voltage)) / (kva * 1000)
    const rCable = (RESISTIVITY[material] / 1000 / size) * length
    const xCable = (0.08 / 1000) * length
    const zCable = Math.sqrt(rCable * rCable + xCable * xCable)
    const zTotal = includeCable ? zTransformer + zCable : zTransformer
    const iscAtPoint = voltage / (1.732 * zTotal)

    const k = SC_K_FACTOR[material][insulation]
    const minCsa = (iscAtPoint * Math.sqrt(faultTime)) / k

    return { transformerFlc, iscTransformer, iscAtPoint, minCsa, csaOk: minCsa <= size }
  }, [kva, impedance, voltage, includeCable, length, size, material, insulation, faultTime])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Transformer Rating (kVA)</Label>
              <Input type="number" value={kva} onChange={(e) => setKva(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Transformer Impedance (%Z)</Label>
              <Input type="number" step="0.1" value={impedance} onChange={(e) => setImpedance(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Secondary Voltage (V)</Label>
              <Input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Fault Clearance Time (s)</Label>
              <Input type="number" step="0.01" value={faultTime} onChange={(e) => setFaultTime(Number(e.target.value))} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <input type="checkbox" checked={includeCable} onChange={(e) => setIncludeCable(e.target.checked)} className="h-4 w-4" />
            Calculate fault level at the end of a downstream cable
          </label>

          {includeCable && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Cable Length (m)</Label>
                <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <Label>Cable Size (mm²)</Label>
                <Input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />
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
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Transformer FLC</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.transformerFlc)} A</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Isc at Transformer Terminals</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.iscTransformer / 1000)} kA</div>
            </div>
            {includeCable && (
              <div className="bg-muted/50 rounded-lg p-4 col-span-2">
                <div className="text-xs font-semibold uppercase text-muted-foreground">Isc at End of Cable</div>
                <div className="text-xl font-bold text-foreground mt-1">{fmt(result.iscAtPoint / 1000)} kA</div>
              </div>
            )}
          </div>

          <div className="text-sm space-y-2 font-serif">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Min. cable CSA for this fault level &amp; clearance time</span>
              <span className="font-medium">{fmt(result.minCsa, 1)} mm²</span>
            </div>
          </div>

          {includeCable && (
            <div
              className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
                result.csaOk ? "bg-green-500/10 text-green-700" : "bg-destructive/10 text-destructive"
              }`}
            >
              {result.csaOk ? <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" /> : <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />}
              <span>
                {result.csaOk
                  ? `The ${size} mm² cable meets the short-circuit withstand requirement.`
                  : `The ${size} mm² cable is below the required minimum — increase the cable size.`}
              </span>
            </div>
          )}

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Simplified per IEC 60909 (transformer-limited, radial LV network). Ignores upstream network and motor
              contribution — treat as a conservative preliminary estimate, not a substitute for a full study.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PowerFactorCorrectionCalculator() {
  const [kw, setKw] = useState(100)
  const [voltage, setVoltage] = useState(415)
  const [system, setSystem] = useState<"1" | "3">("3")
  const [pfExisting, setPfExisting] = useState(0.8)
  const [pfTarget, setPfTarget] = useState(0.95)

  const result = useMemo(() => {
    const phi1 = Math.acos(pfExisting)
    const phi2 = Math.acos(pfTarget)
    const qKvar = kw * (Math.tan(phi1) - Math.tan(phi2))
    const capacitorCurrent =
      system === "1" ? (qKvar * 1000) / voltage : (qKvar * 1000) / (1.732 * voltage)
    const sBefore = kw / pfExisting
    const sAfter = kw / pfTarget
    return { qKvar, capacitorCurrent, sBefore, sAfter, sReduction: sBefore - sAfter }
  }, [kw, voltage, system, pfExisting, pfTarget])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Real Power (kW)</Label>
              <Input type="number" value={kw} onChange={(e) => setKw(Number(e.target.value))} />
            </div>
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
              <Label>Voltage (V)</Label>
              <Input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
            </div>
            <div />
            <div className="space-y-1.5">
              <Label>Existing Power Factor</Label>
              <Input type="number" step="0.01" min={0.1} max={1} value={pfExisting} onChange={(e) => setPfExisting(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Target Power Factor</Label>
              <Input type="number" step="0.01" min={0.1} max={1} value={pfTarget} onChange={(e) => setPfTarget(Number(e.target.value))} />
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
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Required Capacitor Bank</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.qKvar)} kVAR</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Capacitor Current</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.capacitorCurrent)} A</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Apparent Power Reduction</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.sReduction)} kVA</div>
            </div>
          </div>

          <div className="text-sm space-y-2 font-serif">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Apparent power before correction</span>
              <span className="font-medium">{fmt(result.sBefore)} kVA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Apparent power after correction</span>
              <span className="font-medium">{fmt(result.sAfter)} kVA</span>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Per IEEE 141. Verify the capacitor bank's rated voltage and confirm no harmonic resonance risk with the
              site's load profile (IEC 61000-3-6) before installation.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LightingCalculator() {
  const [length, setLength] = useState(6)
  const [width, setWidth] = useState(4)
  const [illuminance, setIlluminance] = useState(400)
  const [lumensPerLuminaire, setLumensPerLuminaire] = useState(3300)
  const [utilizationFactor, setUtilizationFactor] = useState(0.6)
  const [maintenanceFactor, setMaintenanceFactor] = useState(0.8)

  const result = useMemo(() => {
    const area = length * width
    const totalLumensNeeded = illuminance * area
    const effectiveLumens = lumensPerLuminaire * utilizationFactor * maintenanceFactor
    const luminaireCount = effectiveLumens > 0 ? Math.ceil(totalLumensNeeded / effectiveLumens) : 0
    return { area, totalLumensNeeded, luminaireCount }
  }, [length, width, illuminance, lumensPerLuminaire, utilizationFactor, maintenanceFactor])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Room Length (m)</Label>
              <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Room Width (m)</Label>
              <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Target Illuminance (lux)</Label>
              <Input type="number" value={illuminance} onChange={(e) => setIlluminance(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Lumens per Luminaire</Label>
              <Input type="number" value={lumensPerLuminaire} onChange={(e) => setLumensPerLuminaire(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Utilization Factor</Label>
              <Input type="number" step="0.05" min={0.1} max={1} value={utilizationFactor} onChange={(e) => setUtilizationFactor(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Maintenance Factor</Label>
              <Input type="number" step="0.05" min={0.1} max={1} value={maintenanceFactor} onChange={(e) => setMaintenanceFactor(Number(e.target.value))} />
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Room Area</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.area)} m²</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Total Lumens Needed</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.totalLumensNeeded, 0)} lm</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Luminaires Required</div>
              <div className="text-xl font-bold text-foreground mt-1">{result.luminaireCount}</div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Lumen method per EN 12464-1 / IESNA RP-20. Utilization factor depends on room reflectances and
              luminaire distribution — confirm with the manufacturer's photometric data for a final layout.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GroundingResistanceCalculator() {
  const [electrodeType, setElectrodeType] = useState<"rod" | "strip" | "ring">("rod")
  const [resistivity, setResistivity] = useState(100)
  const [length, setLength] = useState(3)
  const [diameterMm, setDiameterMm] = useState(16)
  const [widthMm, setWidthMm] = useState(25)
  const [depth, setDepth] = useState(0.6)
  const [radius, setRadius] = useState(2)

  const result = useMemo(() => {
    const d = diameterMm / 1000
    const w = widthMm / 1000
    let resistance = Number.NaN
    if (electrodeType === "rod") {
      resistance = (resistivity / (2 * Math.PI * length)) * Math.log((4 * length) / d)
    } else if (electrodeType === "strip") {
      resistance = (resistivity / (Math.PI * length)) * Math.log((2 * length * length) / (w * depth))
    } else {
      resistance = (resistivity / (2 * Math.PI * Math.PI * radius)) * Math.log((8 * radius) / d)
    }
    return { resistance }
  }, [electrodeType, resistivity, length, diameterMm, widthMm, depth, radius])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <Label>Electrode Type</Label>
              <Select value={electrodeType} onValueChange={(v) => setElectrodeType(v as typeof electrodeType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rod">Vertical Rod</SelectItem>
                  <SelectItem value="strip">Horizontal Strip / Plate</SelectItem>
                  <SelectItem value="ring">Ring Electrode</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Soil Resistivity (Ω·m)</Label>
              <Input type="number" value={resistivity} onChange={(e) => setResistivity(Number(e.target.value))} />
            </div>

            {electrodeType === "rod" && (
              <>
                <div className="space-y-1.5">
                  <Label>Rod Length (m)</Label>
                  <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Rod Diameter (mm)</Label>
                  <Input type="number" value={diameterMm} onChange={(e) => setDiameterMm(Number(e.target.value))} />
                </div>
              </>
            )}

            {electrodeType === "strip" && (
              <>
                <div className="space-y-1.5">
                  <Label>Strip Length (m)</Label>
                  <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Strip Width (mm)</Label>
                  <Input type="number" value={widthMm} onChange={(e) => setWidthMm(Number(e.target.value))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Burial Depth (m)</Label>
                  <Input type="number" step="0.1" value={depth} onChange={(e) => setDepth(Number(e.target.value))} />
                </div>
              </>
            )}

            {electrodeType === "ring" && (
              <>
                <div className="space-y-1.5">
                  <Label>Ring Radius (m)</Label>
                  <Input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Conductor Diameter (mm)</Label>
                  <Input type="number" value={diameterMm} onChange={(e) => setDiameterMm(Number(e.target.value))} />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">Earth Electrode Resistance</div>
            <div className="text-xl font-bold text-foreground mt-1">{fmt(result.resistance)} Ω</div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Simplified single-electrode formulas per IEEE 80 / IEC 60364-5-54. Multiple rods, deeper burial, or a
              full grid (mesh) reduce resistance further — verify touch and step voltages against IEC 60479 / IEEE 80
              limits for the final design.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BatteryRuntimeCalculator() {
  const [loadKw, setLoadKw] = useState(20)
  const [systemVoltageDc, setSystemVoltageDc] = useState(240)
  const [batteryAh, setBatteryAh] = useState(100)
  const [dod, setDod] = useState(80)
  const [efficiency, setEfficiency] = useState(90)
  const [desiredRuntimeMin, setDesiredRuntimeMin] = useState(15)

  const result = useMemo(() => {
    const usableWh = batteryAh * systemVoltageDc * (dod / 100) * (efficiency / 100)
    const loadW = loadKw * 1000
    const runtimeHours = loadW > 0 ? usableWh / loadW : Number.NaN
    const runtimeMinutes = runtimeHours * 60
    const requiredAh =
      systemVoltageDc > 0 && dod > 0 && efficiency > 0
        ? (loadW * (desiredRuntimeMin / 60)) / (systemVoltageDc * (dod / 100) * (efficiency / 100))
        : Number.NaN
    return { usableWh, runtimeHours, runtimeMinutes, requiredAh }
  }, [loadKw, systemVoltageDc, batteryAh, dod, efficiency, desiredRuntimeMin])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Load (kW)</Label>
              <Input type="number" value={loadKw} onChange={(e) => setLoadKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Battery Bank Voltage (V DC)</Label>
              <Input type="number" value={systemVoltageDc} onChange={(e) => setSystemVoltageDc(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Battery Bank Capacity (Ah)</Label>
              <Input type="number" value={batteryAh} onChange={(e) => setBatteryAh(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Allowed Depth of Discharge (%)</Label>
              <Input type="number" value={dod} onChange={(e) => setDod(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Inverter/UPS Efficiency (%)</Label>
              <Input type="number" value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Desired Backup Time (min)</Label>
              <Input type="number" value={desiredRuntimeMin} onChange={(e) => setDesiredRuntimeMin(Number(e.target.value))} />
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
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Runtime at This Battery Bank</div>
              <div className="text-xl font-bold text-foreground mt-1">
                {fmt(result.runtimeMinutes, 0)} min ({fmt(result.runtimeHours, 2)} h)
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Battery Capacity Needed for {desiredRuntimeMin} min Backup
              </div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.requiredAh, 1)} Ah</div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Simple energy-balance estimate (Ah × V × DoD × efficiency ÷ load). Ignores the Peukert effect (capacity
              drops at higher discharge rates) and battery aging/temperature derating — for a final design, size
              against the manufacturer's discharge-rate table at the site's design temperature.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DataCenterEfficiencyCalculator() {
  const [totalFacilityKwh, setTotalFacilityKwh] = useState(1500)
  const [itEquipmentKwh, setItEquipmentKwh] = useState(1000)
  const [waterLiters, setWaterLiters] = useState(5000)
  const [cef, setCef] = useState(0.7)

  const result = useMemo(() => {
    const pue = itEquipmentKwh > 0 ? totalFacilityKwh / itEquipmentKwh : Number.NaN
    const dcie = Number.isFinite(pue) && pue > 0 ? (1 / pue) * 100 : Number.NaN
    const wue = itEquipmentKwh > 0 ? waterLiters / itEquipmentKwh : Number.NaN
    const cue = cef * pue
    return { pue, dcie, wue, cue }
  }, [totalFacilityKwh, itEquipmentKwh, waterLiters, cef])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Total Facility Energy (kWh)</Label>
              <Input type="number" value={totalFacilityKwh} onChange={(e) => setTotalFacilityKwh(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>IT Equipment Energy (kWh)</Label>
              <Input type="number" value={itEquipmentKwh} onChange={(e) => setItEquipmentKwh(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Water Used (litres)</Label>
              <Input type="number" value={waterLiters} onChange={(e) => setWaterLiters(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Grid Carbon Factor (kgCO₂/kWh)</Label>
              <Input type="number" step="0.01" value={cef} onChange={(e) => setCef(Number(e.target.value))} />
            </div>
          </div>
          <div className="text-xs text-muted-foreground font-serif">
            Use the same measurement period (e.g. one month) for all three energy/water figures. The carbon factor is
            not looked up automatically — enter the site's actual grid emission factor.
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">PUE</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.pue)}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">DCiE</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.dcie, 1)}%</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">WUE</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.wue)} L/kWh</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">CUE</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.cue)} kgCO₂/kWh</div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Definitions per The Green Grid: PUE = Total Facility Energy ÷ IT Equipment Energy, DCiE = 1/PUE, WUE =
              Water Used ÷ IT Energy, CUE = Carbon Emission Factor × PUE. A PUE nearer 1.0 is more efficient; typical
              facilities range roughly 1.2–2.0 depending on cooling design and climate.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CoolingLoadCalculator() {
  const [itLoadKw, setItLoadKw] = useState(100)
  const [otherGainsPct, setOtherGainsPct] = useState(10)
  const [redundancyPct, setRedundancyPct] = useState(25)

  const result = useMemo(() => {
    const totalHeatKw = itLoadKw * (1 + otherGainsPct / 100)
    const coolingTr = totalHeatKw / 3.517
    const installedTr = coolingTr * (1 + redundancyPct / 100)
    return { totalHeatKw, coolingTr, installedTr }
  }, [itLoadKw, otherGainsPct, redundancyPct])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>IT Load (kW)</Label>
              <Input type="number" value={itLoadKw} onChange={(e) => setItLoadKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Other Heat Gains (%)</Label>
              <Input type="number" value={otherGainsPct} onChange={(e) => setOtherGainsPct(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Cooling Redundancy Margin (%)</Label>
              <Input type="number" value={redundancyPct} onChange={(e) => setRedundancyPct(Number(e.target.value))} />
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Total Heat Load</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.totalHeatKw)} kW</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Cooling Capacity Needed</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.coolingTr)} TR</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Installed Capacity incl. Redundancy
              </div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.installedTr)} TR</div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              IT heat load (1 TR = 3.517 kW) dominates a data hall's cooling load; "Other Heat Gains" is a lumped
              placeholder for lighting, people and envelope/solar gains, which need a proper room-by-room heat-load
              study for a real design — treat this as a preliminary IT-load-driven estimate only, not a substitute
              for one.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MotorStartingDipCalculator() {
  const [motorKw, setMotorKw] = useState(75)
  const [efficiency, setEfficiency] = useState(92)
  const [pfRated, setPfRated] = useState(0.87)
  const [startMethod, setStartMethod] = useState<"dol" | "star-delta" | "soft" | "vfd">("dol")
  const [sourceScMva, setSourceScMva] = useState(15)

  const result = useMemo(() => {
    const flcKva = efficiency > 0 && pfRated > 0 ? motorKw / ((efficiency / 100) * pfRated) : Number.NaN
    const startingKva = flcKva * MOTOR_START_MULTIPLIER[startMethod]
    const sourceScKva = sourceScMva * 1000
    const dipPct = (startingKva / (startingKva + sourceScKva)) * 100
    return { flcKva, startingKva, dipPct }
  }, [motorKw, efficiency, pfRated, startMethod, sourceScMva])

  const severity = result.dipPct <= 10 ? "ok" : result.dipPct <= 15 ? "marginal" : "high"

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Motor Rating (kW)</Label>
              <Input type="number" value={motorKw} onChange={(e) => setMotorKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Motor Efficiency (%)</Label>
              <Input type="number" value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Rated Power Factor</Label>
              <Input type="number" step="0.01" value={pfRated} onChange={(e) => setPfRated(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Source Fault Level (MVA)</Label>
              <Input type="number" value={sourceScMva} onChange={(e) => setSourceScMva(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Starting Method</Label>
              <Select value={startMethod} onValueChange={(v) => setStartMethod(v as typeof startMethod)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dol">Direct-On-Line (~6×)</SelectItem>
                  <SelectItem value="star-delta">Star-Delta (~2.5×)</SelectItem>
                  <SelectItem value="soft">Soft Starter (~3.5×)</SelectItem>
                  <SelectItem value="vfd">VFD (~1.2×)</SelectItem>
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Starting kVA</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.startingKva)} kVA</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Estimated Voltage Dip</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.dipPct)}%</div>
            </div>
          </div>

          <div
            className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
              severity === "ok"
                ? "bg-green-500/10 text-green-700"
                : severity === "marginal"
                  ? "bg-amber-500/10 text-amber-700"
                  : "bg-destructive/10 text-destructive"
            }`}
          >
            {severity === "ok" ? (
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            )}
            <span>
              {severity === "ok"
                ? "Within the commonly-cited 10% general-purpose limit."
                : severity === "marginal"
                  ? "Above 10% — acceptable for general loads under some codes, but check sensitive/lighting circuits and contactor drop-out."
                  : "Above 15% — likely to cause visible lighting flicker, contactor drop-out or control-circuit malfunction; consider a softer starting method or a stronger source."}
            </span>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              %Dip ≈ Starting kVA ÷ (Starting kVA + Source Fault Level), a simplified point-of-common-coupling
              estimate that ignores motor and cable impedance between the source and the motor. Acceptable dip limits
              vary by standard/utility (commonly 10–15% general purpose, much tighter for UPS-fed or sensitive loads)
              — confirm against the applicable code and the actual source impedance.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ToolkitCalculatorsSection() {
  return (
    <section id="toolkit-calculators" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Electrical Tools</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Engineering Calculators</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Preliminary sizing tools for practicing the same calculations covered in our technical courses.
          </p>
        </div>

        <Tabs defaultValue="sizing" className="items-center">
          <TabsList className="sticky top-16 md:top-[106px] z-40 flex-wrap h-auto gap-2 bg-background/95 backdrop-blur-md p-2 rounded-2xl border border-border shadow-sm">
            {[
              { value: "sizing", label: "Conductor Sizing", icon: Cable },
              { value: "transformer", label: "Transformer", icon: Boxes },
              { value: "ups", label: "UPS Selection", icon: BatteryCharging },
              { value: "generator", label: "Generator (DG)", icon: Fuel },
              { value: "breaker", label: "Breaker", icon: Power },
              { value: "short-circuit", label: "Short-Circuit", icon: Zap },
              { value: "pf-correction", label: "Power Factor", icon: Gauge },
              { value: "lighting", label: "Lighting", icon: Lightbulb },
              { value: "grounding", label: "Grounding", icon: ArrowDownToLine },
              { value: "battery-runtime", label: "Battery Runtime", icon: Battery },
              { value: "dc-efficiency", label: "PUE / WUE / CUE", icon: Server },
              { value: "cooling-load", label: "Cooling Load", icon: Snowflake },
              { value: "motor-dip", label: "Motor Starting Dip", icon: TrendingDown },
              { value: "formulas", label: "Quick Formulas", icon: Calculator },
            ].map(({ value, label, icon: TabIcon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="gap-1.5 px-4 py-2 rounded-xl border border-transparent text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:border-accent data-[state=active]:shadow-md data-[state=active]:shadow-accent/30"
              >
                <TabIcon className="h-4 w-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="sizing" className="w-full mt-8">
            <ConductorSizingSection />
          </TabsContent>
          <TabsContent value="transformer" className="w-full mt-8">
            <TransformerSizingCalculator />
          </TabsContent>
          <TabsContent value="ups" className="w-full mt-8">
            <UpsSelectionCalculator />
          </TabsContent>
          <TabsContent value="generator" className="w-full mt-8">
            <GeneratorSizingCalculator />
          </TabsContent>
          <TabsContent value="breaker" className="w-full mt-8">
            <BreakerSizingCalculator />
          </TabsContent>
          <TabsContent value="short-circuit" className="w-full mt-8">
            <ShortCircuitCalculator />
          </TabsContent>
          <TabsContent value="pf-correction" className="w-full mt-8">
            <PowerFactorCorrectionCalculator />
          </TabsContent>
          <TabsContent value="lighting" className="w-full mt-8">
            <LightingCalculator />
          </TabsContent>
          <TabsContent value="grounding" className="w-full mt-8">
            <GroundingResistanceCalculator />
          </TabsContent>
          <TabsContent value="battery-runtime" className="w-full mt-8">
            <BatteryRuntimeCalculator />
          </TabsContent>
          <TabsContent value="dc-efficiency" className="w-full mt-8">
            <DataCenterEfficiencyCalculator />
          </TabsContent>
          <TabsContent value="cooling-load" className="w-full mt-8">
            <CoolingLoadCalculator />
          </TabsContent>
          <TabsContent value="motor-dip" className="w-full mt-8">
            <MotorStartingDipCalculator />
          </TabsContent>
          <TabsContent value="formulas" className="w-full mt-8">
            <QuickFormulasCalculator />
          </TabsContent>
        </Tabs>

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
