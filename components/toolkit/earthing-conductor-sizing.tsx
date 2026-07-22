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
  type EarthMaterial,
  type InsulationType,
  type ConductorShape,
  BETA,
  RESISTIVITY_EARTH,
  defaultInitialTemp,
  defaultFinalTemp,
  computeKFactor,
  ROUND_DIAMETERS_MM,
  STRIP_SIZES_MM,
  BUSBAR_SIZES_MM,
  roundArea,
  stripArea,
  MECH_MIN_AREA_MM2,
} from "./conductor-standards"

type Inputs = {
  projectName: string
  tag: string
  earthFaultCurrentKa: number
  faultDurationS: number
  protectiveClearingTimeS: number
  material: EarthMaterial
  insulation: InsulationType
  shape: ConductorShape
  installation: "buried" | "tray" | "inside" | "outdoor" | "concrete"
  initialTemp: number
  finalTemp: number
  routeLength: number
  frequency: number
  soilResistivity: number | ""
  electrodeResistance: number | ""
}

const DEFAULT_INPUTS: Inputs = {
  projectName: "",
  tag: "",
  earthFaultCurrentKa: 25,
  faultDurationS: 1,
  protectiveClearingTimeS: 1,
  material: "cu",
  insulation: "bare",
  shape: "strip",
  installation: "buried",
  initialTemp: defaultInitialTemp("bare"),
  finalTemp: defaultFinalTemp("cu", "bare"),
  routeLength: 50,
  frequency: 50,
  soilResistivity: "",
  electrodeResistance: "",
}

function shapeCandidates(shape: ConductorShape): { label: string; area: number }[] {
  if (shape === "round") return ROUND_DIAMETERS_MM.map((d) => ({ label: `${d} mm dia`, area: roundArea(d) }))
  if (shape === "busbar") return BUSBAR_SIZES_MM.map((s) => ({ label: `${s[0]}×${s[1]} mm`, area: stripArea(s) }))
  return STRIP_SIZES_MM.map((s) => ({ label: `${s[0]}×${s[1]} mm`, area: stripArea(s) }))
}

export function EarthingConductorSizing() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS)

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => {
      const next = { ...prev, [key]: value }
      // Keep initial/final temperature sensible defaults in sync when material/insulation change,
      // but don't clobber a value the user has already hand-edited away from any known default.
      if (key === "insulation" || key === "material") {
        const insulation = key === "insulation" ? (value as InsulationType) : prev.insulation
        const material = key === "material" ? (value as EarthMaterial) : prev.material
        next.initialTemp = defaultInitialTemp(insulation)
        next.finalTemp = defaultFinalTemp(material, insulation)
      }
      return next
    })
  }

  const result = useMemo(() => {
    const I = inputs.earthFaultCurrentKa * 1000
    const t = Math.max(inputs.protectiveClearingTimeS, 0.01)
    const beta = BETA[inputs.material]
    const k = computeKFactor(inputs.material, inputs.insulation, inputs.initialTemp, inputs.finalTemp)
    const sMinThermal = k > 0 ? (I * Math.sqrt(t)) / k : Number.POSITIVE_INFINITY

    const mechMin = MECH_MIN_AREA_MM2[inputs.material][inputs.shape]
    const requiredArea = Math.max(sMinThermal, mechMin)
    const mechanicalDriven = mechMin > sMinThermal

    const candidates = shapeCandidates(inputs.shape)
    const chosen = candidates.find((c) => c.area >= requiredArea) ?? null
    const outOfRange = chosen === null
    const selected = chosen ?? candidates[candidates.length - 1]
    const selectedArea = selected.area

    const thermalPass = selectedArea >= sMinThermal
    const mechanicalPass = selectedArea >= mechMin

    const rho = RESISTIVITY_EARTH[inputs.material]
    const resistance = (rho * inputs.routeLength) / selectedArea
    const reactance = 0.0002 * inputs.routeLength * (inputs.frequency / 50)
    const impedance = Math.sqrt(resistance * resistance + reactance * reactance)

    const achievedDeltaT = (inputs.finalTemp - inputs.initialTemp) * Math.pow(sMinThermal / selectedArea, 2)
    const achievedFinalTemp = inputs.initialTemp + achievedDeltaT

    const hasGridData = inputs.soilResistivity !== "" && inputs.electrodeResistance !== ""
    const epr = inputs.electrodeResistance !== "" ? I * Number(inputs.electrodeResistance) : null
    const touchVoltageLimit = hasGridData
      ? (1000 + 1.5 * Number(inputs.soilResistivity)) * (0.116 / Math.sqrt(t))
      : null
    const touchVoltageOk = touchVoltageLimit !== null && epr !== null ? epr <= touchVoltageLimit : null

    const clearingTimeMismatch = Math.abs(inputs.faultDurationS - inputs.protectiveClearingTimeS) > 0.05

    const overallPass = thermalPass && mechanicalPass && !outOfRange

    return {
      I,
      t,
      beta,
      k,
      sMinThermal,
      mechMin,
      requiredArea,
      mechanicalDriven,
      outOfRange,
      selectedLabel: selected.label,
      selectedArea,
      thermalPass,
      mechanicalPass,
      resistance,
      reactance,
      impedance,
      achievedFinalTemp,
      epr,
      touchVoltageLimit,
      touchVoltageOk,
      hasGridData,
      clearingTimeMismatch,
      overallPass,
    }
  }, [inputs])

  const warnings = useMemo(() => {
    const list: { level: "warn" | "danger"; message: string }[] = []
    if (result.outOfRange)
      list.push({ level: "danger", message: "Required cross-section exceeds the largest standard size for this shape — choose a different shape or split into parallel conductors." })
    if (!result.thermalPass) list.push({ level: "danger", message: "Selected conductor fails the adiabatic thermal withstand check for this fault." })
    if (result.mechanicalDriven)
      list.push({ level: "warn", message: "Size is governed by the IS 3043 mechanical-strength minimum, not the fault-current calculation." })
    if (result.clearingTimeMismatch)
      list.push({ level: "warn", message: "Fault Duration and Protective Device Clearing Time differ — the clearing time is used as the adiabatic 't'; confirm which value reflects actual protection performance." })
    if (result.hasGridData && result.touchVoltageOk === false)
      list.push({ level: "danger", message: "Estimated earth potential rise may exceed the simplified IEEE 80 touch-voltage limit — a full grounding-grid study is recommended (informational only)." })
    if (!result.hasGridData)
      list.push({ level: "warn", message: "Touch voltage / earth potential rise not evaluated — provide Soil Resistivity and Earth Electrode Resistance for an advisory check." })
    return list
  }, [result])

  async function handleExportPdf() {
    await exportPdfReport({
      title: "Earthing Conductor Sizing Report",
      subtitle: `Project: ${inputs.projectName || "-"}    Tag: ${inputs.tag || "-"}`,
      filename: `${(inputs.tag || "earthing-conductor-sizing").replace(/\s+/g, "-")}.pdf`,
      sections: [
        {
          heading: "Design Inputs",
          rows: [
            ["Earth Fault Current", `${fmt(inputs.earthFaultCurrentKa)} kA`],
            ["Fault Duration", `${fmt(inputs.faultDurationS)} s`],
            ["Protective Device Clearing Time", `${fmt(inputs.protectiveClearingTimeS)} s`],
            ["Conductor Material", inputs.material.toUpperCase()],
            ["Conductor Type (Insulation)", inputs.insulation.toUpperCase()],
            ["Conductor Shape", inputs.shape],
            ["Installation", inputs.installation],
            ["Initial Temperature", `${fmt(inputs.initialTemp, 0)} °C`],
            ["Final Temperature", `${fmt(inputs.finalTemp, 0)} °C`],
            ["Route Length", `${fmt(inputs.routeLength)} m`],
            ["Frequency", `${inputs.frequency} Hz`],
            ["Soil Resistivity", inputs.soilResistivity === "" ? "Not provided" : `${inputs.soilResistivity} Ω·m`],
            ["Earth Electrode Resistance", inputs.electrodeResistance === "" ? "Not provided" : `${inputs.electrodeResistance} Ω`],
          ],
        },
        {
          heading: "Applied Standards",
          rows: [
            ["Earthing Code of Practice", "IS 3043 (latest edition)"],
            ["Low-Voltage Electrical Installations", "IEC 60364"],
            ["Adiabatic Short-Circuit Sizing", "IEC 60949 / IEC 60364-5-54"],
            ["Grounding in AC Substations", "IEEE 80"],
            ["Earthing", "BS 7430"],
          ],
        },
        {
          heading: "Material Constants Used",
          rows: [
            ["β (temperature coefficient constant)", `${fmt(result.beta, 1)} °C`],
            ["Resistivity (ρ, 20°C)", `${RESISTIVITY_EARTH[inputs.material]} Ω·mm²/m`],
            ["Computed K-Factor", fmt(result.k, 1)],
          ],
        },
        {
          heading: "Intermediate & Final Results",
          rows: [
            ["Minimum Cross-Section (Thermal)", `${fmt(result.sMinThermal, 1)} mm²`],
            ["Minimum Cross-Section (Mechanical, IS 3043)", `${fmt(result.mechMin, 1)} mm²`],
            ["Governing Requirement", `${fmt(result.requiredArea, 1)} mm² (${result.mechanicalDriven ? "mechanical" : "thermal"})`],
            ["Selected Standard Size", `${result.outOfRange ? "> " : ""}${result.selectedLabel} (${fmt(result.selectedArea, 1)} mm²)`],
            ["Thermal Check", result.thermalPass ? "PASS" : "FAIL"],
            ["Mechanical Check", result.mechanicalPass ? "PASS" : "FAIL"],
            ["Resistance (R = ρL/A)", `${fmt(result.resistance, 4)} Ω`],
            ["Reactance (indicative)", `${fmt(result.reactance, 4)} Ω`],
            ["Impedance (Z)", `${fmt(result.impedance, 4)} Ω`],
            ["Conductor Temperature During Fault", `${fmt(result.achievedFinalTemp, 0)} °C`],
            ["Earth Potential Rise (EPR)", result.epr === null ? "Insufficient data" : `${fmt(result.epr, 0)} V`],
            ["Touch Voltage Advisory", result.touchVoltageOk === null ? "Not evaluated" : result.touchVoltageOk ? "Within simplified limit" : "May exceed simplified limit"],
            ["Overall Compliance", result.overallPass ? "PASS" : "FAIL"],
          ],
        },
      ],
      notes:
        "Indicative preliminary sizing tool aligned in principle with IS 3043, IEC 60364, IEC 60949, IEEE 80 and BS 7430. Touch/step voltage and earth potential rise figures are simplified advisory estimates only (uniform-soil IEEE 80 approximation) — a full grounding-grid design requires soil resistivity survey data, grid/electrode geometry and a dedicated IEEE 80 grid study. Verify all results against the project's protection studies and site conditions before final design.",
    })
    toast.success("PDF exported.")
  }

  async function handleExportExcel() {
    await exportExcelReport(`${(inputs.tag || "earthing-conductor-sizing").replace(/\s+/g, "-")}.xlsx`, [
      {
        name: "Inputs",
        rows: [
          ["Parameter", "Value"],
          ["Project Name", inputs.projectName],
          ["Tag", inputs.tag],
          ["Earth Fault Current (kA)", inputs.earthFaultCurrentKa],
          ["Fault Duration (s)", inputs.faultDurationS],
          ["Protective Device Clearing Time (s)", inputs.protectiveClearingTimeS],
          ["Conductor Material", inputs.material],
          ["Conductor Type (Insulation)", inputs.insulation],
          ["Conductor Shape", inputs.shape],
          ["Installation", inputs.installation],
          ["Initial Temperature (°C)", inputs.initialTemp],
          ["Final Temperature (°C)", inputs.finalTemp],
          ["Route Length (m)", inputs.routeLength],
          ["Frequency (Hz)", inputs.frequency],
          ["Soil Resistivity (Ω·m)", inputs.soilResistivity],
          ["Earth Electrode Resistance (Ω)", inputs.electrodeResistance],
        ],
      },
      {
        name: "Results",
        rows: [
          ["Result", "Value"],
          ["K-Factor", result.k],
          ["Minimum Cross-Section Thermal (mm²)", result.sMinThermal],
          ["Minimum Cross-Section Mechanical (mm²)", result.mechMin],
          ["Selected Size", result.selectedLabel],
          ["Selected Area (mm²)", result.selectedArea],
          ["Thermal Check", result.thermalPass ? "PASS" : "FAIL"],
          ["Mechanical Check", result.mechanicalPass ? "PASS" : "FAIL"],
          ["Resistance (Ω)", result.resistance],
          ["Reactance (Ω)", result.reactance],
          ["Impedance (Ω)", result.impedance],
          ["Conductor Temperature During Fault (°C)", result.achievedFinalTemp],
          ["Earth Potential Rise (V)", result.epr ?? ""],
          ["Touch Voltage Advisory", result.touchVoltageOk === null ? "Not evaluated" : result.touchVoltageOk ? "OK" : "Exceeds limit"],
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
            <Input value={inputs.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="e.g. Substation Earth Grid" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-[180px]">
            <FieldLabel tip="The earthing conductor/circuit reference tag.">Tag</FieldLabel>
            <Input value={inputs.tag} onChange={(e) => update("tag", e.target.value)} placeholder="e.g. EARTH-MAIN-01" />
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
                <FieldLabel tip="Prospective single-line-to-ground fault current at this earthing conductor.">Earth Fault Current (kA)</FieldLabel>
                <Input type="number" value={inputs.earthFaultCurrentKa} onChange={(e) => update("earthFaultCurrentKa", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Total assumed fault duration, for reference/cross-check against the protective device clearing time.">Fault Duration (s)</FieldLabel>
                <Input type="number" step="0.1" value={inputs.faultDurationS} onChange={(e) => update("faultDurationS", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Copper offers the best conductivity; aluminium is lighter; GI/steel is common for buried strips due to corrosion resistance and cost.">Conductor Material</FieldLabel>
                <Select value={inputs.material} onValueChange={(v) => update("material", v as EarthMaterial)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cu">Copper</SelectItem>
                    <SelectItem value="al">Aluminium</SelectItem>
                    <SelectItem value="gi">GI (Galvanised Steel)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Insulation determines the safe short-circuit final temperature and updates the Initial/Final Temperature defaults below.">Conductor Type</FieldLabel>
                <Select value={inputs.insulation} onValueChange={(v) => update("insulation", v as InsulationType)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bare">Bare</SelectItem>
                    <SelectItem value="pvc">PVC Insulated</SelectItem>
                    <SelectItem value="xlpe">XLPE Insulated</SelectItem>
                    <SelectItem value="hffr">HFFR</SelectItem>
                    <SelectItem value="lszh">LSZH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Physical form of the earthing conductor — determines which standard size table is used.">Earthing Conductor Shape</FieldLabel>
                <Select value={inputs.shape} onValueChange={(v) => update("shape", v as ConductorShape)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round">Round</SelectItem>
                    <SelectItem value="strip">Strip</SelectItem>
                    <SelectItem value="tape">Tape</SelectItem>
                    <SelectItem value="busbar">Busbar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Installation context — informational, relevant to corrosion allowance and touch-voltage exposure.">Installation</FieldLabel>
                <Select value={inputs.installation} onValueChange={(v) => update("installation", v as Inputs["installation"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buried">Buried</SelectItem>
                    <SelectItem value="tray">Cable Tray</SelectItem>
                    <SelectItem value="inside">Inside Building</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="concrete">Concrete Encased</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Auto-populated from the conductor type (ambient for bare, normal operating temperature for insulated types) — editable.">Initial Temperature (°C)</FieldLabel>
                <Input type="number" value={inputs.initialTemp} onChange={(e) => update("initialTemp", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Auto-populated short-circuit temperature limit for the selected material/insulation (e.g. Bare Cu 250°C, PVC 160°C, XLPE 250°C, GI 395°C) — editable.">Final Temperature (°C)</FieldLabel>
                <Input type="number" value={inputs.finalTemp} onChange={(e) => update("finalTemp", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Time for the protective device to clear the earth fault — used as 't' in the adiabatic equation.">Protective Device Clearing Time (s)</FieldLabel>
                <Input type="number" step="0.1" value={inputs.protectiveClearingTimeS} onChange={(e) => update("protectiveClearingTimeS", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Physical route length of this earthing conductor, used for resistance/impedance.">Route Length (m)</FieldLabel>
                <Input type="number" value={inputs.routeLength} onChange={(e) => update("routeLength", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="System frequency, used for the indicative reactance/impedance calculation.">Frequency (Hz)</FieldLabel>
                <Select value={String(inputs.frequency)} onValueChange={(v) => update("frequency", Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50 Hz</SelectItem>
                    <SelectItem value="60">60 Hz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Optional. Provide together with Earth Electrode Resistance for an advisory earth-potential-rise / touch-voltage check.">Soil Resistivity (Ω·m) — optional</FieldLabel>
                <Input
                  type="number"
                  value={inputs.soilResistivity}
                  onChange={(e) => update("soilResistivity", e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 100"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Optional. Resistance of the earth electrode/grid to true earth — needed to estimate Earth Potential Rise.">Earth Electrode Resistance (Ω) — optional</FieldLabel>
                <Input
                  type="number"
                  value={inputs.electrodeResistance}
                  onChange={(e) => update("electrodeResistance", e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 1"
                />
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
              <StatTile label="K-Factor" value={fmt(result.k, 1)} tip="Adiabatic material constant, computed for the selected initial/final temperatures" />
              <StatTile label="Minimum Cross-Section" value={`${fmt(result.sMinThermal, 1)} mm²`} tip="S = (I × √t) ÷ K" />
              <StatTile
                label="Final Recommended Size"
                value={`${result.outOfRange ? "> " : ""}${result.selectedLabel}`}
                tip="Larger of the thermal (adiabatic) and IS 3043 mechanical-strength minimum"
              />
              <StatTile label="Selected Area" value={`${fmt(result.selectedArea, 1)} mm²`} />
              <StatTile label="Thermal Check" value={result.thermalPass ? "PASS" : "FAIL"} tone={result.thermalPass ? "good" : "bad"} />
              <StatTile label="Mechanical Check" value={result.mechanicalPass ? "PASS" : "FAIL"} tone={result.mechanicalPass ? "good" : "bad"} />
              <StatTile label="Resistance" value={`${fmt(result.resistance, 4)} Ω`} tip="R = ρ × L ÷ A" />
              <StatTile label="Impedance" value={`${fmt(result.impedance, 4)} Ω`} tip="Z = √(R² + X²)" />
              <StatTile label="Conductor Temp. During Fault" value={`${fmt(result.achievedFinalTemp, 0)} °C`} />
              <StatTile
                label="Earth Potential Rise"
                value={result.epr === null ? "Insufficient data" : `${fmt(result.epr, 0)} V`}
                tip="EPR = Fault Current × Earth Electrode Resistance (optional advisory)"
              />
            </div>
            <PassFailBanner pass={result.overallPass} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Touch Voltage Advisory (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.hasGridData ? (
            <div className="grid grid-cols-2 gap-4">
              <StatTile label="Simplified Touch Voltage Limit" value={`${fmt(result.touchVoltageLimit, 0)} V`} tip="IEEE 80 simplified 50kg-person limit, uniform soil, no surface layer" />
              <StatTile
                label="Advisory"
                value={result.touchVoltageOk ? "Within simplified limit" : "May exceed simplified limit"}
                tone={result.touchVoltageOk ? "good" : "bad"}
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Provide Soil Resistivity and Earth Electrode Resistance above for an informational touch-voltage check.
              This is advisory only — a definitive assessment requires a full IEEE 80 grounding-grid study with grid
              geometry and electrode layout.
            </p>
          )}
          <WarningList warnings={warnings} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg">Calculation Formulas &amp; Methodology</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Adiabatic Equation: S (mm²) = (I × √t) ÷ K, where I = earth fault current (A), t = protective device clearing time (s)</li>
            <li>
              K-Factor computed from IEC 60364-5-54 / IEC 60949: K = K<sub>ref</sub> × √[ln(1 + (θf−θi)/(β+θi))] ÷
              √[ln(1 + (θf,ref−θi,ref)/(β+θi,ref))], calibrated against the standard material/insulation reference
              K-value
            </li>
            <li>Mechanical Strength Minimum: IS 3043 practical minimum cross-section by material and shape, applied even if larger than the thermal minimum</li>
            <li>Resistance: R = ρ × L ÷ A</li>
            <li>Impedance: Z = √(R² + X²)</li>
            <li>Conductor Temperature During Fault ≈ Initial Temp + (Final Temp − Initial Temp) × (Minimum Section ÷ Selected Section)²</li>
            <li>Earth Potential Rise (optional) = Fault Current × Earth Electrode Resistance</li>
            <li>Touch Voltage Limit (optional, simplified IEEE 80) = (1000 + 1.5 × Soil Resistivity) × 0.116 ÷ √t</li>
          </ol>
          <div className="mt-6 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 leading-relaxed">
            Indicative preliminary sizing tool aligned in principle with IS 3043 (Earthing Code of Practice), IEC
            60364, IEC 60949, IEEE 80 and BS 7430. K-factor reference values for Bare/PVC/XLPE conductors are drawn
            from the standard IEC 60364-5-54 / IS 3043 table; HFFR and LSZH are approximated from the XLPE
            calibration point for the same material and should be verified against the specific compound's data
            sheet. Touch/step voltage and earth potential rise figures are simplified, uniform-soil advisories only —
            not a substitute for a full IEEE 80 grounding-grid study.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
