"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { fmt } from "./toolkit-constants"

export function DataCenterEfficiencyCalculator() {
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
