"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fmt } from "./toolkit-constants"

export function PowerFactorCorrectionCalculator() {
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
