"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { fmt } from "./toolkit-constants"

export function BatteryRuntimeCalculator() {
  const [loadKw, setLoadKw] = useState(20)
  const [systemVoltageDc, setSystemVoltageDc] = useState(240)
  const [batteryAh, setBatteryAh] = useState(100)
  const [dod, setDod] = useState(80)
  const [efficiency, setEfficiency] = useState(90)
  const [desiredRuntimeMin, setDesiredRuntimeMin] = useState(15)

  const result = useMemo(() => {
    const usableWh = batteryAh * systemVoltageDc * (dod / 100) * (efficiency / 100)
    const loadW = loadKw * 1000
    const runtimeHours = loadW > 0 ? usableWh / loadW : Number.NaN
    const runtimeMinutes = runtimeHours * 60
    const requiredAh =
      systemVoltageDc > 0 && dod > 0 && efficiency > 0
        ? (loadW * (desiredRuntimeMin / 60)) / (systemVoltageDc * (dod / 100) * (efficiency / 100))
        : Number.NaN
    return { usableWh, runtimeHours, runtimeMinutes, requiredAh }
  }, [loadKw, systemVoltageDc, batteryAh, dod, efficiency, desiredRuntimeMin])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Load (kW)</Label>
              <Input type="number" value={loadKw} onChange={(e) => setLoadKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Battery Bank Voltage (V DC)</Label>
              <Input type="number" value={systemVoltageDc} onChange={(e) => setSystemVoltageDc(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Battery Bank Capacity (Ah)</Label>
              <Input type="number" value={batteryAh} onChange={(e) => setBatteryAh(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Allowed Depth of Discharge (%)</Label>
              <Input type="number" value={dod} onChange={(e) => setDod(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Inverter/UPS Efficiency (%)</Label>
              <Input type="number" value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Desired Backup Time (min)</Label>
              <Input type="number" value={desiredRuntimeMin} onChange={(e) => setDesiredRuntimeMin(Number(e.target.value))} />
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Runtime at This Battery Bank</div>
              <div className="text-xl font-bold text-foreground mt-1">
                {fmt(result.runtimeMinutes, 0)} min ({fmt(result.runtimeHours, 2)} h)
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Battery Capacity Needed for {desiredRuntimeMin} min Backup
              </div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.requiredAh, 1)} Ah</div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Simple energy-balance estimate (Ah × V × DoD × efficiency ÷ load). Ignores the Peukert effect (capacity
              drops at higher discharge rates) and battery aging/temperature derating — for a final design, size
              against the manufacturer's discharge-rate table at the site's design temperature.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
