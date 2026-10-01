"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { fmt } from "./toolkit-constants"

export function QuickFormulasCalculator() {
  const [voltage, setVoltage] = useState(230)
  const [current, setCurrent] = useState(10)
  const [pf, setPf] = useState(0.9)

  const singlePhasePower = (voltage * current * pf) / 1000
  const threePhasePower = (1.732 * voltage * current * pf) / 1000
  // V / I is the impedance magnitude |Z|; it only equals the resistance R when PF = 1.
  // R = |Z| x PF (and reactance X = |Z| x sin(phi)) for any other power factor.
  const impedance = current > 0 ? voltage / current : Number.NaN
  const resistance = impedance * pf

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Quick Electrical Formulas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Voltage (V)</Label>
            <Input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Current (A)</Label>
            <Input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Power Factor</Label>
            <Input type="number" step="0.01" value={pf} onChange={(e) => setPf(Number(e.target.value))} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">Impedance (V ÷ I)</div>
            <div className="text-xl font-bold text-foreground mt-1">{fmt(impedance)} Ω</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">Resistance (|Z| × PF)</div>
            <div className="text-xl font-bold text-foreground mt-1">{fmt(resistance)} Ω</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">Single-Phase Power</div>
            <div className="text-xl font-bold text-foreground mt-1">{fmt(singlePhasePower)} kW</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">Three-Phase Power</div>
            <div className="text-xl font-bold text-foreground mt-1">{fmt(threePhasePower)} kW</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 leading-relaxed">
          V ÷ I gives the impedance magnitude |Z|, which equals the true resistance only at unity
          power factor. At any other power factor, resistance = |Z| × PF.
        </div>
      </CardContent>
    </Card>
  )
}
