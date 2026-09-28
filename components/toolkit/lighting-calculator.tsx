"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { fmt } from "./toolkit-constants"

export function LightingCalculator() {
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
