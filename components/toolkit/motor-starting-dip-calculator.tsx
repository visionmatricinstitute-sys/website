"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { MOTOR_START_MULTIPLIER, fmt } from "./toolkit-constants"

export function MotorStartingDipCalculator() {
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
