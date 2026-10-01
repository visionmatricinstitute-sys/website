"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { fmt } from "./toolkit-constants"

export function CoolingLoadCalculator() {
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
