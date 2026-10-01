"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BREAKERS, MOTOR_START_MULTIPLIER, fmt } from "./toolkit-constants"

export function BreakerSizingCalculator() {
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
              location — use the Short-Circuit Calculator to check that separately.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
