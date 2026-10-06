"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fmt, RESISTIVITY } from "./toolkit-constants"
import { REACTANCE_PER_KM_LV } from "./conductor-standards"

const SIZES_MM2 = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630]

export function VoltageDropCalculator() {
  const [system, setSystem] = useState<"1" | "3">("3")
  const [voltage, setVoltage] = useState(415)
  const [current, setCurrent] = useState(150)
  const [lengthM, setLengthM] = useState(80)
  const [material, setMaterial] = useState<"cu" | "al">("cu")
  const [size, setSize] = useState(70)
  const [parallel, setParallel] = useState(1)
  const [pf, setPf] = useState(0.85)
  const [limitPct, setLimitPct] = useState(3)

  const result = useMemo(() => {
    const I = Math.max(current, 0)
    const L = Math.max(lengthM, 0) / 1000 // km
    const n = Math.max(Math.round(parallel), 1)
    const cosPhi = Math.min(Math.max(pf, 0.1), 1)
    const sinPhi = Math.sqrt(1 - cosPhi * cosPhi)
    const R = RESISTIVITY[material] / size // ohm/km per conductor
    const X = REACTANCE_PER_KM_LV
    const k = system === "3" ? Math.sqrt(3) : 2
    const dv = (k * (I / n) * L * (R * cosPhi + X * sinPhi))
    const pct = voltage > 0 ? (dv / voltage) * 100 : 0
    return { R, X, dv, pct, ok: pct <= limitPct }
  }, [system, voltage, current, lengthM, material, size, parallel, pf, limitPct])

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
                  <SelectItem value="3">Three Phase</SelectItem>
                  <SelectItem value="1">Single Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Line voltage (V)</Label>
              <Input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Load current (A)</Label>
              <Input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Cable length (m, one way)</Label>
              <Input type="number" value={lengthM} onChange={(e) => setLengthM(Number(e.target.value))} />
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
              <Label>Conductor size (mm²)</Label>
              <Select value={String(size)} onValueChange={(v) => setSize(Number(v))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SIZES_MM2.map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Cables in parallel</Label>
              <Input type="number" min={1} value={parallel} onChange={(e) => setParallel(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Power factor (cos φ)</Label>
              <Input type="number" step="0.01" min={0.1} max={1} value={pf} onChange={(e) => setPf(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Allowed drop (%)</Label>
              <Input type="number" step="0.5" value={limitPct} onChange={(e) => setLimitPct(Number(e.target.value))} />
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Voltage drop</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.dv)} V</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Voltage drop %</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.pct)} %</div>
            </div>
          </div>
          <div
            className={`rounded-lg p-3 text-sm font-medium ${
              result.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}
            role="status"
          >
            {result.ok
              ? `Within the ${fmt(limitPct, 1)}% limit.`
              : `Exceeds the ${fmt(limitPct, 1)}% limit — increase conductor size, add parallel cables or shorten the run.`}
          </div>
          <div className="text-sm space-y-2 font-serif">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Resistance R (Ω/km per conductor)</span>
              <span className="font-medium">{fmt(result.R, 4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reactance X (Ω/km, indicative)</span>
              <span className="font-medium">{fmt(result.X, 3)}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground font-serif space-y-1">
            <p>
              ΔV = k × I × L × (R·cos φ + X·sin φ), with k = √3 for three phase and 2 for single phase, L in km and
              I per cable. R uses the toolkit's operating-temperature resistivity (Cu 22.5, Al 36 Ω·mm²/km).
            </p>
            <p>
              Indicative only. Use the manufacturer's R and X for the actual cable, and check ampacity and short-circuit
              withstand as well (see the Cable &amp; Conductor Sizing Calculator). Voltage-drop limits depend on the
              applicable code and project specification.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
