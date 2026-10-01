"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DG_KVA, MOTOR_START_MULTIPLIER, roundUpToStandard, fmt } from "./toolkit-constants"

export function GeneratorSizingCalculator() {
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
