"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TRANSFORMER_KVA, roundUpToStandard, fmt } from "./toolkit-constants"

export function TransformerSizingCalculator() {
  const [kw, setKw] = useState(500)
  const [pf, setPf] = useState(0.9)
  const [spare, setSpare] = useState(20)
  const [primaryV, setPrimaryV] = useState(11000)
  const [secondaryV, setSecondaryV] = useState(415)

  const result = useMemo(() => {
    const connectedKva = kw / pf
    const designKva = connectedKva * (1 + spare / 100)
    const selected = roundUpToStandard(designKva, TRANSFORMER_KVA)
    const base = selected ?? TRANSFORMER_KVA[TRANSFORMER_KVA.length - 1]
    const primaryFlc = (base * 1000) / (1.732 * primaryV)
    const secondaryFlc = (base * 1000) / (1.732 * secondaryV)
    return { connectedKva, designKva, selected, base, primaryFlc, secondaryFlc, outOfRange: selected === null }
  }, [kw, pf, spare, primaryV, secondaryV])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Design Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Connected Load (kW)</Label>
              <Input type="number" value={kw} onChange={(e) => setKw(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Load Power Factor</Label>
              <Input type="number" step="0.01" value={pf} onChange={(e) => setPf(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Spare Capacity / Growth (%)</Label>
              <Input type="number" value={spare} onChange={(e) => setSpare(Number(e.target.value))} />
            </div>
            <div />
            <div className="space-y-1.5">
              <Label>Primary Voltage (V)</Label>
              <Input type="number" value={primaryV} onChange={(e) => setPrimaryV(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Secondary Voltage (V)</Label>
              <Input type="number" value={secondaryV} onChange={(e) => setSecondaryV(Number(e.target.value))} />
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
              <div className="text-xs font-semibold uppercase text-muted-foreground">Design Load</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.designKva)} kVA</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Recommended Transformer</div>
              <div className="text-xl font-bold text-foreground mt-1">
                {result.outOfRange ? "> " : ""}
                {result.base} kVA
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Primary FLC</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.primaryFlc)} A</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Secondary FLC</div>
              <div className="text-xl font-bold text-foreground mt-1">{fmt(result.secondaryFlc)} A</div>
            </div>
          </div>

          <div className="text-sm space-y-2 font-serif">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Connected load (kVA, before spare capacity)</span>
              <span className="font-medium">{fmt(result.connectedKva)} kVA</span>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg p-3 text-sm bg-muted/40 text-muted-foreground">
            <span>
              Nearest standard rating per IEC 60076. Confirm impedance (%Z), vector group and cooling class
              (ONAN/ONAF) with the manufacturer before ordering.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
