"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, FileSpreadsheet } from "lucide-react"
import { FieldLabel, StatTile, PassFailBanner, WarningList } from "./conductor-ui"
import { exportPdfReport, exportExcelReport } from "./conductor-export"
import {
  fmt,
  roundUpToStandard,
  interpolateTable,
  BUSDUCT_RATINGS,
  BUSDUCT_AMBIENT_FACTOR,
  BUSBAR_CURRENT_DENSITY,
  BARE_CONDUCTOR_K,
  BUSDUCT_REACTANCE_PER_KM,
  BUSDUCT_RATED_TEMP_RISE_K,
  RESISTIVITY,
} from "./conductor-standards"

type Inputs = {
  projectName: string
  tag: string
  material: "cu" | "al"
  busductForm: "sandwich" | "air-insulated" | "rising-main" | "feeder"
  loadKw: number
  voltage: number
  powerFactor: number
  scLevel: number
  scDuration: number
  ambientTemp: number
  ipRating: string
  indoorOutdoor: "indoor" | "outdoor"
  busductLength: number
  voltageDropLimit: number
  harmonicLoading: number
  futureSpareCapacity: number
}

const DEFAULT_INPUTS: Inputs = {
  projectName: "",
  tag: "",
  material: "cu",
  busductForm: "sandwich",
  loadKw: 1000,
  voltage: 415,
  powerFactor: 0.9,
  scLevel: 50,
  scDuration: 1,
  ambientTemp: 40,
  ipRating: "IP54",
  indoorOutdoor: "indoor",
  busductLength: 40,
  voltageDropLimit: 3,
  harmonicLoading: 10,
  futureSpareCapacity: 20,
}

export function BusductSizing() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS)

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const result = useMemo(() => {
    const pf = Math.min(Math.max(inputs.powerFactor, 0.5), 1)
    const designCurrent = (inputs.loadKw * 1000) / (Math.sqrt(3) * inputs.voltage * pf)
    const requiredCapacity = designCurrent * (1 + Math.max(inputs.futureSpareCapacity, 0) / 100)

    const harmonicFactor = 1 - (Math.max(inputs.harmonicLoading, 0) / 100) * 0.3
    const ambientFactor = interpolateTable(BUSDUCT_AMBIENT_FACTOR, inputs.ambientTemp)
    const indoorOutdoorFactor = inputs.indoorOutdoor === "outdoor" ? 0.95 : 1.0
    const combined = harmonicFactor * ambientFactor * indoorOutdoorFactor

    const effectiveRequirement = requiredCapacity / combined
    const selectedRating = roundUpToStandard(effectiveRequirement, BUSDUCT_RATINGS)
    const outOfRange = selectedRating === null
    const rating = selectedRating ?? BUSDUCT_RATINGS[BUSDUCT_RATINGS.length - 1]
    const installedCapacity = rating * combined

    const utilizationPct = (designCurrent / installedCapacity) * 100
    const tempRise = BUSDUCT_RATED_TEMP_RISE_K * Math.pow(designCurrent / installedCapacity, 2)

    const currentDensity = BUSBAR_CURRENT_DENSITY[inputs.material]
    const equivalentAreaMm2 = rating / currentDensity
    const R = RESISTIVITY[inputs.material] / 1000 / equivalentAreaMm2
    const X = BUSDUCT_REACTANCE_PER_KM / 1000
    const phi = Math.acos(pf)
    const vd = Math.sqrt(3) * designCurrent * inputs.busductLength * (R * pf + X * Math.sin(phi))
    const vdPct = (vd / inputs.voltage) * 100
    const vdOk = vdPct <= inputs.voltageDropLimit

    const k = BARE_CONDUCTOR_K[inputs.material]
    const sMin = (inputs.scLevel * 1000 * Math.sqrt(inputs.scDuration)) / k
    const scOk = equivalentAreaMm2 >= sMin

    const neutralGuidance =
      inputs.harmonicLoading >= 33
        ? "Oversize to ~173% of phase rating (high triplen-harmonic content)"
        : inputs.harmonicLoading >= 10
          ? "Full-rated (100%) neutral recommended"
          : "50% neutral may be adequate — verify against local code"

    const earthBarRating = rating * 0.5

    const overallPass = !outOfRange && vdOk && scOk && utilizationPct <= 100

    return {
      designCurrent,
      requiredCapacity,
      combined,
      rating,
      outOfRange,
      installedCapacity,
      utilizationPct,
      tempRise,
      equivalentAreaMm2,
      vdPct,
      vdOk,
      sMin,
      scOk,
      neutralGuidance,
      earthBarRating,
      overallPass,
    }
  }, [inputs])

  const warnings = useMemo(() => {
    const list: { level: "warn" | "danger"; message: string }[] = []
    if (result.outOfRange) list.push({ level: "danger", message: "Required capacity exceeds the largest standard busduct rating — consider parallel runs or a higher-density design." })
    if (result.utilizationPct > 100) list.push({ level: "danger", message: `Loading at ${fmt(result.utilizationPct, 0)}% — overloaded.` })
    else if (result.utilizationPct >= 90) list.push({ level: "warn", message: `Loading at ${fmt(result.utilizationPct, 0)}% — limited headroom.` })
    if (!result.vdOk) list.push({ level: "danger", message: `Voltage drop ${fmt(result.vdPct, 2)}% exceeds the ${fmt(inputs.voltageDropLimit, 1)}% limit.` })
    if (!result.scOk) list.push({ level: "danger", message: "Selected busbar cross-section is below the adiabatic short-circuit withstand requirement." })
    if (inputs.harmonicLoading >= 33) list.push({ level: "warn", message: "High harmonic loading — confirm neutral and derating with the busduct manufacturer." })
    return list
  }, [result, inputs.voltageDropLimit, inputs.harmonicLoading])

  async function handleExportPdf() {
    await exportPdfReport({
      title: "Busduct Sizing Report",
      subtitle: `Project: ${inputs.projectName || "-"}    Tag: ${inputs.tag || "-"}    ${inputs.voltage} V`,
      filename: `${(inputs.tag || "busduct-sizing").replace(/\s+/g, "-")}.pdf`,
      sections: [
        {
          heading: "Design Inputs",
          rows: [
            ["Material", inputs.material.toUpperCase()],
            ["Busduct Form", inputs.busductForm],
            ["Load", `${fmt(inputs.loadKw)} kW`],
            ["Voltage", `${inputs.voltage} V`],
            ["Power Factor", `${fmt(inputs.powerFactor)}`],
            ["Short Circuit Level / Duration", `${inputs.scLevel} kA / ${inputs.scDuration} s`],
            ["Ambient Temperature", `${inputs.ambientTemp} °C`],
            ["IP Rating", inputs.ipRating],
            ["Indoor / Outdoor", inputs.indoorOutdoor],
            ["Busway Length", `${fmt(inputs.busductLength)} m`],
            ["Voltage Drop Limit", `${inputs.voltageDropLimit} %`],
            ["Harmonic Loading", `${inputs.harmonicLoading} %`],
            ["Future Spare Capacity", `${inputs.futureSpareCapacity} %`],
          ],
        },
        {
          heading: "Results",
          rows: [
            ["Design Current", `${fmt(result.designCurrent)} A`],
            ["Recommended Busduct Rating", `${result.outOfRange ? "> " : ""}${result.rating} A`],
            ["Utilization", `${fmt(result.utilizationPct, 1)} %`],
            ["Temperature Rise", `${fmt(result.tempRise, 1)} K`],
            ["Voltage Drop", `${fmt(result.vdPct, 2)} %`],
            ["Short-Circuit Min. Cross-Section", `${fmt(result.sMin, 0)} mm²`],
            ["Neutral Sizing Guidance", result.neutralGuidance],
            ["Earth Bar Rating (guideline)", `${fmt(result.earthBarRating, 0)} A equivalent`],
            ["Overall Compliance", result.overallPass ? "PASS" : "FAIL"],
          ],
        },
      ],
      notes:
        "Indicative preliminary sizing aligned in principle with IEC 61439 and IEC 60909. Verify against manufacturer busduct data sheets — actual temperature rise, impedance and short-circuit withstand depend on the specific enclosure/joint design.",
    })
    toast.success("PDF exported.")
  }

  async function handleExportExcel() {
    await exportExcelReport(`${(inputs.tag || "busduct-sizing").replace(/\s+/g, "-")}.xlsx`, [
      {
        name: "Inputs",
        rows: [
          ["Parameter", "Value"],
          ["Project Name", inputs.projectName],
          ["Tag", inputs.tag],
          ["Material", inputs.material],
          ["Busduct Form", inputs.busductForm],
          ["Load (kW)", inputs.loadKw],
          ["Voltage (V)", inputs.voltage],
          ["Power Factor", inputs.powerFactor],
          ["Short Circuit Level (kA)", inputs.scLevel],
          ["Short Circuit Duration (s)", inputs.scDuration],
          ["Ambient Temperature (°C)", inputs.ambientTemp],
          ["IP Rating", inputs.ipRating],
          ["Indoor/Outdoor", inputs.indoorOutdoor],
          ["Busway Length (m)", inputs.busductLength],
          ["Voltage Drop Limit (%)", inputs.voltageDropLimit],
          ["Harmonic Loading (%)", inputs.harmonicLoading],
          ["Future Spare Capacity (%)", inputs.futureSpareCapacity],
        ],
      },
      {
        name: "Results",
        rows: [
          ["Result", "Value"],
          ["Design Current (A)", result.designCurrent],
          ["Recommended Busduct Rating (A)", result.rating],
          ["Utilization (%)", result.utilizationPct],
          ["Temperature Rise (K)", result.tempRise],
          ["Voltage Drop (%)", result.vdPct],
          ["Short-Circuit Min Cross-Section (mm²)", result.sMin],
          ["Neutral Sizing Guidance", result.neutralGuidance],
          ["Earth Bar Rating Guideline (A)", result.earthBarRating],
          ["Overall Compliance", result.overallPass ? "PASS" : "FAIL"],
        ],
      },
    ])
    toast.success("Excel file exported.")
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="flex flex-wrap items-end gap-4 pt-6">
          <div className="space-y-1.5 flex-1 min-w-[180px]">
            <FieldLabel tip="Free-text project identifier, used for labeling exported reports.">Project Name</FieldLabel>
            <Input value={inputs.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="e.g. Main LT Panel Riser" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-[180px]">
            <FieldLabel tip="The busduct/feeder reference tag from the single-line diagram.">Tag</FieldLabel>
            <Input value={inputs.tag} onChange={(e) => update("tag", e.target.value)} placeholder="e.g. BD-RM-01" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleExportPdf} className="gap-1.5 bg-transparent">
              <FileText className="h-4 w-4" /> Export PDF
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleExportExcel} className="gap-1.5 bg-transparent">
              <FileSpreadsheet className="h-4 w-4" /> Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Design Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <FieldLabel tip="Copper busbar has a higher design current density than aluminium for the same rating.">Material</FieldLabel>
                <Select value={inputs.material} onValueChange={(v) => update("material", v as Inputs["material"])}>
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
                <FieldLabel tip="Construction type — informational, does not change this tool's sizing calculation.">Busduct Form</FieldLabel>
                <Select value={inputs.busductForm} onValueChange={(v) => update("busductForm", v as Inputs["busductForm"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandwich">Sandwich Busduct</SelectItem>
                    <SelectItem value="air-insulated">Air Insulated Busduct</SelectItem>
                    <SelectItem value="rising-main">Rising Main</SelectItem>
                    <SelectItem value="feeder">Feeder Busway</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Total three-phase active power to be carried.">Load (kW)</FieldLabel>
                <Input type="number" value={inputs.loadKw} onChange={(e) => update("loadKw", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="System line voltage.">Voltage (V)</FieldLabel>
                <Input type="number" value={inputs.voltage} onChange={(e) => update("voltage", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Load power factor, used to convert kW to design current.">Power Factor</FieldLabel>
                <Input type="number" step="0.01" value={inputs.powerFactor} onChange={(e) => update("powerFactor", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Prospective three-phase fault level at the busduct origin.">Short Circuit Level (kA)</FieldLabel>
                <Input type="number" value={inputs.scLevel} onChange={(e) => update("scLevel", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Time for the upstream protective device to clear the fault.">Short Circuit Duration (s)</FieldLabel>
                <Input type="number" step="0.1" value={inputs.scDuration} onChange={(e) => update("scDuration", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Busduct ratings are typically referenced to a 40°C ambient — higher ambient reduces the effective rating.">Ambient Temperature (°C)</FieldLabel>
                <Input type="number" value={inputs.ambientTemp} onChange={(e) => update("ambientTemp", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Enclosure ingress protection rating — informational, confirm environmental suitability with the manufacturer.">IP Rating</FieldLabel>
                <Select value={inputs.ipRating} onValueChange={(v) => update("ipRating", v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IP42">IP42</SelectItem>
                    <SelectItem value="IP54">IP54</SelectItem>
                    <SelectItem value="IP55">IP55</SelectItem>
                    <SelectItem value="IP65">IP65</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Outdoor installation carries a modest derate for solar loading/dust in this tool.">Indoor / Outdoor</FieldLabel>
                <Select value={inputs.indoorOutdoor} onValueChange={(v) => update("indoorOutdoor", v as Inputs["indoorOutdoor"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Total busway route length.">Busway Length (m)</FieldLabel>
                <Input type="number" value={inputs.busductLength} onChange={(e) => update("busductLength", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Maximum acceptable voltage drop, as a percentage of system voltage.">Voltage Drop Limit (%)</FieldLabel>
                <Input type="number" value={inputs.voltageDropLimit} onChange={(e) => update("voltageDropLimit", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Estimated total harmonic current loading — high harmonic content (dominated by triplens) increases neutral current and busbar losses.">Harmonic Loading (%)</FieldLabel>
                <Input type="number" value={inputs.harmonicLoading} onChange={(e) => update("harmonicLoading", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Extra capacity reserved for future load growth before the busduct needs replacement.">Future Spare Capacity (%)</FieldLabel>
                <Input type="number" value={inputs.futureSpareCapacity} onChange={(e) => update("futureSpareCapacity", Number(e.target.value))} />
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
              <StatTile label="Design Current" value={`${fmt(result.designCurrent)} A`} />
              <StatTile
                label="Recommended Busduct Rating"
                value={`${result.outOfRange ? "> " : ""}${result.rating} A`}
                tip="Next standard rating ≥ (required capacity ÷ ambient × harmonic × indoor/outdoor factors)"
              />
              <StatTile
                label="Utilization"
                value={`${fmt(result.utilizationPct, 1)}%`}
                tone={result.utilizationPct >= 90 ? "bad" : result.utilizationPct >= 80 ? "warn" : "default"}
              />
              <StatTile label="Temperature Rise" value={`${fmt(result.tempRise, 1)} K`} tip="Rated rise × (Design Current ÷ Installed Capacity)²" />
              <StatTile label="Voltage Drop" value={`${fmt(result.vdPct, 2)}%`} tone={result.vdOk ? "good" : "bad"} />
              <StatTile
                label="Short-Circuit Withstand"
                value={`${fmt(result.sMin, 0)} mm² req.`}
                tone={result.scOk ? "good" : "bad"}
                tip="S = (SC Level × √SC Duration) ÷ K (bare conductor)"
              />
              <StatTile label="Neutral Size" value={result.neutralGuidance} />
              <StatTile label="Earth Bar Size" value={`${fmt(result.earthBarRating, 0)} A equiv.`} tip="Guideline only — use the Earthing Conductor Sizing tool for a fault-current-based earth conductor size." />
            </div>
            <PassFailBanner pass={result.overallPass} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <WarningList warnings={warnings} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg">Calculation Formulas &amp; Methodology</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Design Current (A) = (Load × 1000) ÷ (√3 × Voltage × Power Factor)</li>
            <li>Required Capacity (A) = Design Current × (1 + Future Spare Capacity % ÷ 100)</li>
            <li>Recommended Rating = next standard rating ≥ Required Capacity ÷ (Ambient × Harmonic × Indoor/Outdoor factors)</li>
            <li>Temperature Rise (K) = Rated Temperature Rise × (Design Current ÷ Installed Capacity)²</li>
            <li>Voltage Drop (%) = [√3 × I × L × (R·cosφ + X·sinφ)] ÷ V × 100, using an equivalent busbar cross-section from current density</li>
            <li>Short-Circuit Withstand: minimum cross-section (mm²) = (SC Level × √SC Duration) ÷ K (bare conductor, IEC 60949)</li>
          </ol>
          <div className="mt-6 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 leading-relaxed">
            Indicative preliminary sizing tool aligned in principle with IEC 61439 (busbar/busduct design) and IEC
            60909 (short-circuit currents). Busbar cross-section is estimated from a representative design current
            density, not a specific manufacturer's busbar profile — confirm actual temperature rise, impedance and
            short-circuit withstand against the manufacturer's type-test certificate.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
