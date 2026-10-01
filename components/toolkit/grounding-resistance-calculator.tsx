"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fmt } from "./toolkit-constants"

export function GroundingResistanceCalculator() {
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
