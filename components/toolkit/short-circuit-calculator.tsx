"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { RESISTIVITY, SC_K_FACTOR, fmt } from "./toolkit-constants"

export function ShortCircuitCalculator() {
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
