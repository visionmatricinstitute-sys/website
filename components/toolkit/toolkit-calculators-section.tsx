"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UpsSelectionCalculator } from "./ups-selection-calculator"
import {
  AlertTriangle,
  CheckCircle2,
  Cable,
  Boxes,
  BatteryCharging,
  Fuel,
  Power,
  Zap,
  Calculator,
  Gauge,
  Lightbulb,
  ArrowDownToLine,
} from "lucide-react"

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
          <TabsList className="flex-wrap h-auto gap-2 bg-muted/60 p-2 rounded-2xl border border-border">
            {[
              { value: "sizing", label: "Cable & Load Sizing", icon: Cable },
              { value: "transformer", label: "Transformer", icon: Boxes },
              { value: "ups", label: "UPS Selection", icon: BatteryCharging },
              { value: "generator", label: "Generator (DG)", icon: Fuel },
              { value: "breaker", label: "Breaker", icon: Power },
              { value: "short-circuit", label: "Short-Circuit", icon: Zap },
              { value: "pf-correction", label: "Power Factor", icon: Gauge },
              { value: "lighting", label: "Lighting", icon: Lightbulb },
              { value: "grounding", label: "Grounding", icon: ArrowDownToLine },
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
            <CableSizingCalculator />
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
          <TabsContent value="formulas" className="w-full mt-8">
            <QuickFormulasCalculator />
          </TabsContent>
        </Tabs>

        <div className="mt-10 max-w-3xl mx-auto text-center text-sm text-muted-foreground font-serif bg-muted/40 rounded-lg p-4">
          Values shown are indicative, simplified reference figures for preliminary/learning purposes and are
          aligned in principle with the IEC 60364, IEC 60076, IEC 62040, ISO 8528, IEC 60909, IEEE 80, IEEE 141,
          EN 12464-1 and TIA-942 standards. Always verify against a manufacturer's datasheet and the applicable
          standard before using these figures on a real project.
        </div>
      </div>
    </section>
  )
}
