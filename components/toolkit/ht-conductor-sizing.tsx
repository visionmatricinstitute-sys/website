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
  interpolateTable,
  HT_VOLTAGES_KV,
  HT_SIZES_MM2,
  HT_BASE_AMPACITY_XLPE,
  HT_BASE_AMPACITY_XLPE_AIR,
  HT_GROUND_TEMP_FACTOR,
  HT_AMBIENT_TEMP_FACTOR,
  HT_SOIL_RESISTIVITY_FACTOR,
  HT_DEPTH_FACTOR,
  HT_GROUPING_FACTOR,
  HT_THERMAL_BACKFILL_BONUS,
  HT_INSULATION_MAX_TEMP,
  RESISTIVITY,
  SC_K_INSULATED,
} from "./conductor-standards"

type Inputs = {
  projectName: string
  cableTag: string
  systemVoltageKv: number
  loadKw: number
  powerFactor: number
  efficiency: number
  parallelRuns: number
  installMethod: "buried" | "duct" | "tray" | "air"
  ambientTemp: number
  groundTemp: number
  soilResistivity: number
  conductorMaterial: "cu" | "al"
  insulationType: "pvc" | "xlpe"
  armourType: "unarmoured" | "swa" | "awa"
  coreConfig: "single" | "3core"
  frequency: number
  faultLevel: number
  faultDuration: number
  voltageDropLimit: number
  routeLength: number
  groupingCount: number
  depthOfBurial: number
  thermalBackfill: boolean
}

const DEFAULT_INPUTS: Inputs = {
  projectName: "",
  cableTag: "",
  systemVoltageKv: 11,
  loadKw: 2000,
  powerFactor: 0.9,
  efficiency: 97,
  parallelRuns: 1,
  installMethod: "buried",
  ambientTemp: 35,
  groundTemp: 25,
  soilResistivity: 1.2,
  conductorMaterial: "cu",
  insulationType: "xlpe",
  armourType: "swa",
  coreConfig: "3core",
  frequency: 50,
  faultLevel: 25,
  faultDuration: 1,
  voltageDropLimit: 3,
  routeLength: 200,
  groupingCount: 1,
  depthOfBurial: 750,
  thermalBackfill: false,
}

export function HtConductorSizing() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS)

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const result = useMemo(() => {
    const V = inputs.systemVoltageKv * 1000
    const pf = Math.min(Math.max(inputs.powerFactor, 0.5), 1)
    const eff = Math.min(Math.max(inputs.efficiency, 50), 100) / 100
    const N = Math.max(Math.round(inputs.parallelRuns), 1)

    const fullLoadCurrent = (inputs.loadKw * 1000) / (Math.sqrt(3) * V * pf * eff)
    const perRunCurrent = fullLoadCurrent / N

    const isBuried = inputs.installMethod === "buried" || inputs.installMethod === "duct"
    const baseTable = isBuried ? HT_BASE_AMPACITY_XLPE : HT_BASE_AMPACITY_XLPE_AIR
    const coreFactor = inputs.coreConfig === "3core" ? 0.95 : 1.0
    const insulationFactor = inputs.insulationType === "pvc" ? 0.85 : 1.0
    const tempFactor = isBuried
      ? interpolateTable(HT_GROUND_TEMP_FACTOR, inputs.groundTemp)
      : interpolateTable(HT_AMBIENT_TEMP_FACTOR, inputs.ambientTemp)
    const soilFactor = isBuried ? interpolateTable(HT_SOIL_RESISTIVITY_FACTOR, inputs.soilResistivity) : 1
    const depthFactor = isBuried ? interpolateTable(HT_DEPTH_FACTOR, inputs.depthOfBurial) : 1
    const groupCount = Math.min(Math.max(Math.round(inputs.groupingCount), 1), 6)
    const groupFactor = HT_GROUPING_FACTOR[groupCount] ?? 0.65
    const backfillFactor = isBuried && inputs.thermalBackfill ? HT_THERMAL_BACKFILL_BONUS : 1

    const combinedFactor = coreFactor * insulationFactor * tempFactor * soilFactor * depthFactor * groupFactor * backfillFactor

    let selectedSize: number | null = null
    let selectedIz = 0
    for (const size of HT_SIZES_MM2) {
      const idx = HT_SIZES_MM2.indexOf(size)
      const iz = baseTable[idx] * combinedFactor
      if (iz >= perRunCurrent) {
        selectedSize = size
        selectedIz = iz
        break
      }
    }
    const outOfRange = selectedSize === null
    const size = selectedSize ?? HT_SIZES_MM2[HT_SIZES_MM2.length - 1]
    const iz = outOfRange ? baseTable[baseTable.length - 1] * combinedFactor : selectedIz

    // recommended parallel runs so per-run current stays within the largest available size's capacity
    const largestIz = baseTable[baseTable.length - 1] * combinedFactor
    const recommendedRuns = Math.max(1, Math.ceil(fullLoadCurrent / largestIz))

    const utilizationPct = (perRunCurrent / iz) * 100

    // Voltage drop (three-phase, mV/A/m style using resistivity + indicative reactance)
    const R = RESISTIVITY[inputs.conductorMaterial] / 1000 / size // ohm/m
    const X = 0.09 / 1000 * (inputs.frequency / 50) // ohm/m, indicative MV cable reactance
    const phi = Math.acos(pf)
    const vd = Math.sqrt(3) * perRunCurrent * inputs.routeLength * (R * pf + X * Math.sin(phi))
    const vdPct = (vd / V) * 100
    const vdOk = vdPct <= inputs.voltageDropLimit

    // Adiabatic short-circuit check (per run — assumes fault current shares equally across parallel runs)
    const k = SC_K_INSULATED[inputs.conductorMaterial][inputs.insulationType]
    const faultCurrentPerRunA = (inputs.faultLevel * 1000) / N
    const sMin = (faultCurrentPerRunA * Math.sqrt(inputs.faultDuration)) / k
    const scOk = size >= sMin

    // Indicative operating temperature under design load
    const maxTemp = HT_INSULATION_MAX_TEMP[inputs.insulationType]
    const refTemp = isBuried ? inputs.groundTemp : inputs.ambientTemp
    const loadRatio = Math.min(perRunCurrent / iz, 1.3)
    const estOperatingTemp = refTemp + (maxTemp - refTemp) * loadRatio * loadRatio

    const thermalOk = utilizationPct <= 100
    const overallPass = thermalOk && vdOk && scOk && !outOfRange

    return {
      fullLoadCurrent,
      perRunCurrent,
      combinedFactor,
      size,
      iz,
      outOfRange,
      recommendedRuns,
      utilizationPct,
      vd,
      vdPct,
      vdOk,
      k,
      sMin,
      scOk,
      estOperatingTemp,
      maxTemp,
      thermalOk,
      overallPass,
      N,
    }
  }, [inputs])

  const warnings = useMemo(() => {
    const list: { level: "warn" | "danger"; message: string }[] = []
    if (result.outOfRange)
      list.push({ level: "danger", message: "Design current exceeds the largest available standard HT size — increase the number of parallel runs." })
    if (result.utilizationPct > 100)
      list.push({ level: "danger", message: `Cable utilization at ${fmt(result.utilizationPct, 0)}% — overloaded. Increase size or add parallel runs.` })
    else if (result.utilizationPct >= 90)
      list.push({ level: "warn", message: `Cable utilization at ${fmt(result.utilizationPct, 0)}% — limited headroom.` })
    if (!result.vdOk)
      list.push({ level: "danger", message: `Voltage drop ${fmt(result.vdPct, 2)}% exceeds the ${fmt(inputs.voltageDropLimit, 1)}% limit — increase size or reduce route length.` })
    if (!result.scOk)
      list.push({ level: "danger", message: "Selected conductor cross-section is below the adiabatic short-circuit withstand requirement." })
    if (result.recommendedRuns > inputs.parallelRuns)
      list.push({ level: "warn", message: `At least ${result.recommendedRuns} parallel run(s) recommended for this load — currently set to ${inputs.parallelRuns}.` })
    return list
  }, [result, inputs.voltageDropLimit, inputs.parallelRuns])

  async function handleExportPdf() {
    await exportPdfReport({
      title: "HT Conductor Sizing Report",
      subtitle: `Project: ${inputs.projectName || "-"}    Cable Tag: ${inputs.cableTag || "-"}    ${inputs.systemVoltageKv} kV`,
      filename: `${(inputs.cableTag || "ht-conductor-sizing").replace(/\s+/g, "-")}.pdf`,
      sections: [
        {
          heading: "Design Inputs",
          rows: [
            ["System Voltage", `${inputs.systemVoltageKv} kV`],
            ["Load", `${fmt(inputs.loadKw)} kW`],
            ["Power Factor", `${fmt(inputs.powerFactor)}`],
            ["Efficiency", `${fmt(inputs.efficiency)} %`],
            ["Number of Parallel Runs", `${inputs.parallelRuns}`],
            ["Installation Method", inputs.installMethod],
            ["Ambient / Ground Temperature", `${inputs.ambientTemp} / ${inputs.groundTemp} °C`],
            ["Soil Thermal Resistivity", `${inputs.soilResistivity} K.m/W`],
            ["Conductor Material", inputs.conductorMaterial.toUpperCase()],
            ["Insulation Type", inputs.insulationType.toUpperCase()],
            ["Armour Type", inputs.armourType.toUpperCase()],
            ["Core Configuration", inputs.coreConfig],
            ["Fault Level / Duration", `${inputs.faultLevel} kA / ${inputs.faultDuration} s`],
            ["Voltage Drop Limit", `${inputs.voltageDropLimit} %`],
            ["Route Length", `${inputs.routeLength} m`],
            ["Depth of Burial", `${inputs.depthOfBurial} mm`],
            ["Thermal Backfill", inputs.thermalBackfill ? "Yes" : "No"],
          ],
        },
        {
          heading: "Results",
          rows: [
            ["Full Load Current", `${fmt(result.fullLoadCurrent)} A`],
            ["Design Current per Run", `${fmt(result.perRunCurrent)} A`],
            ["Recommended Cable Size", `${result.size} mm²`],
            ["Current Carrying Capacity (Iz)", `${fmt(result.iz)} A`],
            ["Utilization", `${fmt(result.utilizationPct, 1)} %`],
            ["Recommended Parallel Runs", `${result.recommendedRuns}`],
            ["Voltage Drop", `${fmt(result.vdPct, 2)} %`],
            ["Short-Circuit Min. Cross-Section", `${fmt(result.sMin, 1)} mm²`],
            ["Estimated Conductor Operating Temperature", `${fmt(result.estOperatingTemp, 0)} °C`],
            ["Overall Compliance", result.overallPass ? "PASS" : "FAIL"],
          ],
        },
      ],
      notes:
        "Indicative preliminary sizing aligned in principle with IEC 60364, IEC 60287, IEC 60949, IS 7098 and IS 1255. Verify against manufacturer cable data sheets and a full IEC 60287 thermal-circuit study before final design.",
    })
    toast.success("PDF exported.")
  }

  async function handleExportExcel() {
    await exportExcelReport(`${(inputs.cableTag || "ht-conductor-sizing").replace(/\s+/g, "-")}.xlsx`, [
      {
        name: "Inputs",
        rows: [
          ["Parameter", "Value"],
          ["Project Name", inputs.projectName],
          ["Cable Tag", inputs.cableTag],
          ["System Voltage (kV)", inputs.systemVoltageKv],
          ["Load (kW)", inputs.loadKw],
          ["Power Factor", inputs.powerFactor],
          ["Efficiency (%)", inputs.efficiency],
          ["Parallel Runs", inputs.parallelRuns],
          ["Installation Method", inputs.installMethod],
          ["Ambient Temperature (°C)", inputs.ambientTemp],
          ["Ground Temperature (°C)", inputs.groundTemp],
          ["Soil Thermal Resistivity (K.m/W)", inputs.soilResistivity],
          ["Conductor Material", inputs.conductorMaterial],
          ["Insulation Type", inputs.insulationType],
          ["Armour Type", inputs.armourType],
          ["Core Configuration", inputs.coreConfig],
          ["Fault Level (kA)", inputs.faultLevel],
          ["Fault Duration (s)", inputs.faultDuration],
          ["Voltage Drop Limit (%)", inputs.voltageDropLimit],
          ["Route Length (m)", inputs.routeLength],
          ["Depth of Burial (mm)", inputs.depthOfBurial],
          ["Thermal Backfill", inputs.thermalBackfill ? "Yes" : "No"],
        ],
      },
      {
        name: "Results",
        rows: [
          ["Result", "Value"],
          ["Full Load Current (A)", result.fullLoadCurrent],
          ["Design Current per Run (A)", result.perRunCurrent],
          ["Recommended Cable Size (mm²)", result.size],
          ["Current Carrying Capacity Iz (A)", result.iz],
          ["Utilization (%)", result.utilizationPct],
          ["Recommended Parallel Runs", result.recommendedRuns],
          ["Voltage Drop (%)", result.vdPct],
          ["Short-Circuit Min Cross-Section (mm²)", result.sMin],
          ["Estimated Operating Temperature (°C)", result.estOperatingTemp],
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
            <Input value={inputs.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="e.g. Substation Feeder Upgrade" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-[180px]">
            <FieldLabel tip="The cable/circuit reference tag from the single-line diagram or cable schedule.">Cable Tag</FieldLabel>
            <Input value={inputs.cableTag} onChange={(e) => update("cableTag", e.target.value)} placeholder="e.g. HT-FDR-01" />
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
                <FieldLabel tip="Nominal system voltage for the HT circuit.">System Voltage</FieldLabel>
                <Select value={String(inputs.systemVoltageKv)} onValueChange={(v) => update("systemVoltageKv", Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HT_VOLTAGES_KV.map((v) => (
                      <SelectItem key={v} value={String(v)}>
                        {v} kV
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Total three-phase active power to be delivered through this circuit.">Load (kW)</FieldLabel>
                <Input type="number" value={inputs.loadKw} onChange={(e) => update("loadKw", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Load power factor, used to convert kW to design current.">Power Factor</FieldLabel>
                <Input type="number" step="0.01" value={inputs.powerFactor} onChange={(e) => update("powerFactor", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Downstream transformer/load efficiency, used to derive the source-side design current.">Efficiency (%)</FieldLabel>
                <Input type="number" value={inputs.efficiency} onChange={(e) => update("efficiency", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Number of cable circuits run in parallel per phase to share the load current.">Number of Parallel Runs</FieldLabel>
                <Input type="number" min={1} value={inputs.parallelRuns} onChange={(e) => update("parallelRuns", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Selects which base ampacity table and correction factors apply.">Installation Method</FieldLabel>
                <Select value={inputs.installMethod} onValueChange={(v) => update("installMethod", v as Inputs["installMethod"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buried">Direct Buried</SelectItem>
                    <SelectItem value="duct">Buried in Duct</SelectItem>
                    <SelectItem value="tray">Cable Tray (Air)</SelectItem>
                    <SelectItem value="air">Free Air</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Air temperature at the installation, used for tray/air-installed circuits.">Ambient Temperature (°C)</FieldLabel>
                <Input type="number" value={inputs.ambientTemp} onChange={(e) => update("ambientTemp", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Native ground temperature at cable depth, used for buried circuits.">Ground Temperature (°C)</FieldLabel>
                <Input type="number" value={inputs.groundTemp} onChange={(e) => update("groundTemp", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Thermal resistivity of the native soil — higher values trap more heat and reduce ampacity.">Soil Thermal Resistivity (K.m/W)</FieldLabel>
                <Input type="number" step="0.1" value={inputs.soilResistivity} onChange={(e) => update("soilResistivity", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Copper has higher conductivity and needs less cross-section; aluminium is lighter and cheaper per ampere.">Conductor Material</FieldLabel>
                <Select value={inputs.conductorMaterial} onValueChange={(v) => update("conductorMaterial", v as Inputs["conductorMaterial"])}>
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
                <FieldLabel tip="XLPE (90°C rated) is standard for modern MV cables; PVC is limited to lower ratings and used mainly on legacy 3.3kV systems.">Insulation Type</FieldLabel>
                <Select value={inputs.insulationType} onValueChange={(v) => update("insulationType", v as Inputs["insulationType"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xlpe">XLPE</SelectItem>
                    <SelectItem value="pvc">PVC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Mechanical/fault-current protection of the cable armour. Does not affect core ampacity in this tool — verify armour fault withstand separately.">Armour Type</FieldLabel>
                <Select value={inputs.armourType} onValueChange={(v) => update("armourType", v as Inputs["armourType"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unarmoured">Unarmoured</SelectItem>
                    <SelectItem value="swa">SWA (Steel Wire Armour)</SelectItem>
                    <SelectItem value="awa">AWA (Aluminium Wire Armour)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="3-core cables see slightly more mutual heating between cores than an equivalent single-core-per-phase arrangement.">Core Configuration</FieldLabel>
                <Select value={inputs.coreConfig} onValueChange={(v) => update("coreConfig", v as Inputs["coreConfig"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Core</SelectItem>
                    <SelectItem value="3core">3-Core</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="System frequency — used to scale the indicative cable reactance.">Frequency (Hz)</FieldLabel>
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
                <FieldLabel tip="Prospective three-phase fault level at the cable's origin, used for the adiabatic short-circuit check.">Fault Level (kA)</FieldLabel>
                <Input type="number" value={inputs.faultLevel} onChange={(e) => update("faultLevel", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Time for the upstream protective device to clear the fault.">Fault Duration (s)</FieldLabel>
                <Input type="number" step="0.1" value={inputs.faultDuration} onChange={(e) => update("faultDuration", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Maximum acceptable voltage drop from source to load, as a percentage of system voltage.">Voltage Drop Limit (%)</FieldLabel>
                <Input type="number" value={inputs.voltageDropLimit} onChange={(e) => update("voltageDropLimit", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="One-way cable route length from source to load.">Route Length (m)</FieldLabel>
                <Input type="number" value={inputs.routeLength} onChange={(e) => update("routeLength", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Number of loaded circuits installed together in the same trench/duct bank/tray, sharing mutual heating.">Grouping (No. of Circuits)</FieldLabel>
                <Input type="number" min={1} value={inputs.groupingCount} onChange={(e) => update("groupingCount", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Burial depth to the top of the cable — deeper burial slightly reduces ampacity due to increased thermal path length.">Depth of Burial (mm)</FieldLabel>
                <Input type="number" value={inputs.depthOfBurial} onChange={(e) => update("depthOfBurial", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Engineered low-thermal-resistivity backfill around the cable improves heat dissipation and increases ampacity.">Thermal Backfill</FieldLabel>
                <Select value={inputs.thermalBackfill ? "yes" : "no"} onValueChange={(v) => update("thermalBackfill", v === "yes")}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Results Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <StatTile label="Full Load Current" value={`${fmt(result.fullLoadCurrent)} A`} tip="P ÷ (√3 × V × PF × Efficiency)" />
              <StatTile label="Design Current / Run" value={`${fmt(result.perRunCurrent)} A`} tip="Full Load Current ÷ Number of Parallel Runs" />
              <StatTile
                label="Recommended Cable Size"
                value={`${result.outOfRange ? "> " : ""}${result.size} mm²`}
                tip="Smallest standard size whose derated ampacity (Iz) ≥ design current per run"
              />
              <StatTile label="Current Carrying Capacity" value={`${fmt(result.iz)} A`} tip="Base ampacity × combined derating factors" />
              <StatTile
                label="Utilization"
                value={`${fmt(result.utilizationPct, 1)}%`}
                tone={result.utilizationPct >= 90 ? "bad" : result.utilizationPct >= 80 ? "warn" : "default"}
              />
              <StatTile label="Recommended Parallel Runs" value={`${result.recommendedRuns}`} />
              <StatTile label="Voltage Drop" value={`${fmt(result.vdPct, 2)}%`} tone={result.vdOk ? "good" : "bad"} />
              <StatTile
                label="Short Circuit Min. Section"
                value={`${fmt(result.sMin, 1)} mm²`}
                tone={result.scOk ? "good" : "bad"}
                tip="S = (Fault Current × √Fault Duration) ÷ K"
              />
              <StatTile label="Max. Conductor Temperature" value={`${result.maxTemp} °C`} />
              <StatTile label="Est. Operating Temperature" value={`${fmt(result.estOperatingTemp, 0)} °C`} />
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
            <li>Full Load Current (A) = (Load × 1000) ÷ (√3 × V × Power Factor × Efficiency)</li>
            <li>Design Current per Run (A) = Full Load Current ÷ Number of Parallel Runs</li>
            <li>
              Current Carrying Capacity Iz (A) = Base Ampacity × Core Factor × Insulation Factor × Ground/Ambient
              Temperature Factor × Soil Resistivity Factor × Depth Factor × Grouping Factor × Thermal Backfill Factor
            </li>
            <li>Recommended Cable Size = smallest standard size where Iz ≥ Design Current per Run</li>
            <li>Voltage Drop (%) = [√3 × I × L × (R·cosφ + X·sinφ)] ÷ V × 100</li>
            <li>Short-Circuit Minimum Cross-Section (mm²) = (Fault Current per Run × √Fault Duration) ÷ K (IEC 60949)</li>
            <li>Estimated Operating Temperature = Reference Temp + (Insulation Max Temp − Reference Temp) × (Utilization)²</li>
          </ol>
          <div className="mt-6 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 leading-relaxed">
            Indicative preliminary sizing tool aligned in principle with IEC 60364, IEC 60287 (current rating of
            cables), IEC 60949 (adiabatic short-circuit sizing), IS 7098 (XLPE cables) and IS 1255 (installation and
            maintenance of power cables). Base ampacity, correction-factor and reactance figures are representative
            reference values, not a substitute for a manufacturer's cable data sheet or a full IEC 60287
            thermal-circuit study accounting for mutual heating, cyclic rating and soil dry-out.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
