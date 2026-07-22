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
  CABLE_SIZES_MM2,
  CABLE_AMPACITY,
  AMBIENT_FACTOR_LV,
  MATERIAL_FACTOR,
  RESISTIVITY,
  REACTANCE_PER_KM_LV,
  groupingFactor,
  SC_K_INSULATED,
  BREAKERS,
  INSTALL_METHOD_FACTOR_LV,
  FORMATION_FACTOR_LV,
} from "./conductor-standards"

type Inputs = {
  projectName: string
  cableTag: string
  systemVoltage: 230 | 415 | 690
  connectedLoadKw: number
  diversityFactor: number
  powerFactor: number
  cableLength: number
  installMethod: "tray" | "ladder" | "conduit" | "buried" | "underground"
  cableType: "unarmoured" | "armoured"
  material: "cu" | "al"
  insulation: "pvc" | "xlpe"
  coreConfig: "single" | "multi"
  formation: "trefoil" | "flat"
  ambientTemp: number
  grouping: number
  voltageDropLimit: number
  faultLevel: number
  faultDuration: number
}

const DEFAULT_INPUTS: Inputs = {
  projectName: "",
  cableTag: "",
  systemVoltage: 415,
  connectedLoadKw: 100,
  diversityFactor: 0.8,
  powerFactor: 0.9,
  cableLength: 50,
  installMethod: "tray",
  cableType: "unarmoured",
  material: "cu",
  insulation: "xlpe",
  coreConfig: "multi",
  formation: "trefoil",
  ambientTemp: 30,
  grouping: 1,
  voltageDropLimit: 5,
  faultLevel: 20,
  faultDuration: 0.5,
}

export function LvConductorSizing() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS)

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const result = useMemo(() => {
    const isSinglePhase = inputs.systemVoltage === 230
    const pf = Math.min(Math.max(inputs.powerFactor, 0.5), 1)
    const demandLoadKw = inputs.connectedLoadKw * Math.min(Math.max(inputs.diversityFactor, 0.1), 1)

    const designCurrent = isSinglePhase
      ? (demandLoadKw * 1000) / (inputs.systemVoltage * pf)
      : (demandLoadKw * 1000) / (Math.sqrt(3) * inputs.systemVoltage * pf)

    const baseTable = CABLE_AMPACITY[inputs.insulation]
    const ambientFactor = interpolateTable(AMBIENT_FACTOR_LV[inputs.insulation], inputs.ambientTemp)
    const groupFactor = groupingFactor(Math.max(Math.round(inputs.grouping), 1))
    const materialFactor = MATERIAL_FACTOR[inputs.material]
    const installFactor = INSTALL_METHOD_FACTOR_LV[inputs.installMethod] ?? 1
    const formationFactor = inputs.coreConfig === "single" ? FORMATION_FACTOR_LV[inputs.formation] : 1.0
    const combined = ambientFactor * groupFactor * materialFactor * installFactor * formationFactor

    let selectedSize: number | null = null
    let selectedIz = 0
    for (let i = 0; i < CABLE_SIZES_MM2.length; i++) {
      const iz = baseTable[i] * combined
      if (iz >= designCurrent) {
        selectedSize = CABLE_SIZES_MM2[i]
        selectedIz = iz
        break
      }
    }
    const outOfRange = selectedSize === null
    const size = selectedSize ?? CABLE_SIZES_MM2[CABLE_SIZES_MM2.length - 1]
    const iz = outOfRange ? baseTable[baseTable.length - 1] * combined : selectedIz

    const R = RESISTIVITY[inputs.material] / 1000 / size
    const X = REACTANCE_PER_KM_LV / 1000
    const phi = Math.acos(pf)
    const vd = isSinglePhase
      ? 2 * designCurrent * inputs.cableLength * (R * pf + X * Math.sin(phi))
      : Math.sqrt(3) * designCurrent * inputs.cableLength * (R * pf + X * Math.sin(phi))
    const vdPct = (vd / inputs.systemVoltage) * 100
    const vdOk = vdPct <= inputs.voltageDropLimit

    const breakerRating = BREAKERS.find((b) => b >= designCurrent) ?? null
    const protectiveDeviceOk = breakerRating !== null && breakerRating <= iz

    const k = SC_K_INSULATED[inputs.material][inputs.insulation]
    const faultCurrentA = inputs.faultLevel * 1000
    const sMin = (faultCurrentA * Math.sqrt(inputs.faultDuration)) / k
    const scOk = size >= sMin

    const utilizationPct = (designCurrent / iz) * 100
    const overallPass = !outOfRange && vdOk && scOk && protectiveDeviceOk && utilizationPct <= 100

    return {
      demandLoadKw,
      designCurrent,
      size,
      iz,
      outOfRange,
      vd,
      vdPct,
      vdOk,
      breakerRating,
      protectiveDeviceOk,
      k,
      sMin,
      scOk,
      utilizationPct,
      overallPass,
    }
  }, [inputs])

  const warnings = useMemo(() => {
    const list: { level: "warn" | "danger"; message: string }[] = []
    if (result.outOfRange) list.push({ level: "danger", message: "Design current exceeds the largest standard cable size in this table — consider parallel runs or a busduct." })
    if (result.utilizationPct > 100) list.push({ level: "danger", message: `Cable utilization at ${fmt(result.utilizationPct, 0)}% — overloaded.` })
    else if (result.utilizationPct >= 90) list.push({ level: "warn", message: `Cable utilization at ${fmt(result.utilizationPct, 0)}% — limited headroom.` })
    if (!result.vdOk) list.push({ level: "danger", message: `Voltage drop ${fmt(result.vdPct, 2)}% exceeds the ${fmt(inputs.voltageDropLimit, 1)}% limit.` })
    if (!result.scOk) list.push({ level: "danger", message: "Selected conductor cross-section is below the adiabatic short-circuit withstand requirement." })
    if (!result.protectiveDeviceOk)
      list.push({ level: "danger", message: "No standard breaker rating satisfies Ib ≤ In ≤ Iz for this cable — resize the cable or split the load." })
    return list
  }, [result, inputs.voltageDropLimit])

  async function handleExportPdf() {
    await exportPdfReport({
      title: "LV Conductor Sizing Report",
      subtitle: `Project: ${inputs.projectName || "-"}    Cable Tag: ${inputs.cableTag || "-"}    ${inputs.systemVoltage} V`,
      filename: `${(inputs.cableTag || "lv-conductor-sizing").replace(/\s+/g, "-")}.pdf`,
      sections: [
        {
          heading: "Design Inputs",
          rows: [
            ["System Voltage", `${inputs.systemVoltage} V`],
            ["Connected Load", `${fmt(inputs.connectedLoadKw)} kW`],
            ["Diversity Factor", `${fmt(inputs.diversityFactor)}`],
            ["Power Factor", `${fmt(inputs.powerFactor)}`],
            ["Cable Length", `${fmt(inputs.cableLength)} m`],
            ["Installation Method", inputs.installMethod],
            ["Cable Type", inputs.cableType],
            ["Material", inputs.material.toUpperCase()],
            ["Insulation", inputs.insulation.toUpperCase()],
            ["Core Configuration", inputs.coreConfig],
            ["Ambient Temperature", `${inputs.ambientTemp} °C`],
            ["Grouping", `${inputs.grouping}`],
            ["Voltage Drop Limit", `${inputs.voltageDropLimit} %`],
            ["Fault Level / Duration", `${inputs.faultLevel} kA / ${inputs.faultDuration} s`],
          ],
        },
        {
          heading: "Results",
          rows: [
            ["Demand Load", `${fmt(result.demandLoadKw)} kW`],
            ["Design Current", `${fmt(result.designCurrent)} A`],
            ["Current Carrying Capacity (Iz)", `${fmt(result.iz)} A`],
            ["Final Recommended Cable Size", `${result.size} mm²`],
            ["Utilization", `${fmt(result.utilizationPct, 1)} %`],
            ["Voltage Drop", `${fmt(result.vdPct, 2)} %`],
            ["Recommended Breaker Rating", result.breakerRating ? `${result.breakerRating} A` : "> 630 A"],
            ["Short-Circuit Min. Cross-Section", `${fmt(result.sMin, 1)} mm²`],
            ["Overall Compliance", result.overallPass ? "PASS" : "FAIL"],
          ],
        },
      ],
      notes:
        "Indicative preliminary sizing aligned in principle with IEC 60364-5-52/5-54, IS 732 and IS 1255. Verify against manufacturer cable data sheets before final design.",
    })
    toast.success("PDF exported.")
  }

  async function handleExportExcel() {
    await exportExcelReport(`${(inputs.cableTag || "lv-conductor-sizing").replace(/\s+/g, "-")}.xlsx`, [
      {
        name: "Inputs",
        rows: [
          ["Parameter", "Value"],
          ["Project Name", inputs.projectName],
          ["Cable Tag", inputs.cableTag],
          ["System Voltage (V)", inputs.systemVoltage],
          ["Connected Load (kW)", inputs.connectedLoadKw],
          ["Diversity Factor", inputs.diversityFactor],
          ["Power Factor", inputs.powerFactor],
          ["Cable Length (m)", inputs.cableLength],
          ["Installation Method", inputs.installMethod],
          ["Cable Type", inputs.cableType],
          ["Material", inputs.material],
          ["Insulation", inputs.insulation],
          ["Core Configuration", inputs.coreConfig],
          ["Ambient Temperature (°C)", inputs.ambientTemp],
          ["Grouping", inputs.grouping],
          ["Voltage Drop Limit (%)", inputs.voltageDropLimit],
          ["Fault Level (kA)", inputs.faultLevel],
          ["Fault Duration (s)", inputs.faultDuration],
        ],
      },
      {
        name: "Results",
        rows: [
          ["Result", "Value"],
          ["Demand Load (kW)", result.demandLoadKw],
          ["Design Current (A)", result.designCurrent],
          ["Current Carrying Capacity Iz (A)", result.iz],
          ["Final Recommended Cable Size (mm²)", result.size],
          ["Utilization (%)", result.utilizationPct],
          ["Voltage Drop (%)", result.vdPct],
          ["Recommended Breaker Rating (A)", result.breakerRating ?? ""],
          ["Short-Circuit Min Cross-Section (mm²)", result.sMin],
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
            <Input value={inputs.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="e.g. Warehouse Distribution Upgrade" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-[180px]">
            <FieldLabel tip="The cable/circuit reference tag from the schedule.">Cable Tag</FieldLabel>
            <Input value={inputs.cableTag} onChange={(e) => update("cableTag", e.target.value)} placeholder="e.g. LV-DB3-01" />
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
                <FieldLabel tip="230V is single-phase; 415V and 690V are three-phase.">System Voltage</FieldLabel>
                <Select value={String(inputs.systemVoltage)} onValueChange={(v) => update("systemVoltage", Number(v) as 230 | 415 | 690)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="230">230 V</SelectItem>
                    <SelectItem value="415">415 V</SelectItem>
                    <SelectItem value="690">690 V</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Sum of the rated capacities of all connected equipment on this circuit.">Connected Load (kW)</FieldLabel>
                <Input type="number" value={inputs.connectedLoadKw} onChange={(e) => update("connectedLoadKw", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Ratio of expected simultaneous demand to connected load. Demand Load = Connected Load × Diversity Factor.">Diversity Factor</FieldLabel>
                <Input type="number" step="0.05" value={inputs.diversityFactor} onChange={(e) => update("diversityFactor", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Load power factor, used to convert kW to design current.">Power Factor</FieldLabel>
                <Input type="number" step="0.01" value={inputs.powerFactor} onChange={(e) => update("powerFactor", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="One-way cable length from the distribution board to the load.">Cable Length (m)</FieldLabel>
                <Input type="number" value={inputs.cableLength} onChange={(e) => update("cableLength", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Selects the installation-method derating applied on top of the base ampacity table.">Installation Method</FieldLabel>
                <Select value={inputs.installMethod} onValueChange={(v) => update("installMethod", v as Inputs["installMethod"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tray">Cable Tray</SelectItem>
                    <SelectItem value="ladder">Cable Ladder</SelectItem>
                    <SelectItem value="conduit">Conduit</SelectItem>
                    <SelectItem value="buried">Direct Buried</SelectItem>
                    <SelectItem value="underground">Underground Duct</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Armoured cable adds mechanical/fault protection but does not change core ampacity in this tool.">Cable Type</FieldLabel>
                <Select value={inputs.cableType} onValueChange={(v) => update("cableType", v as Inputs["cableType"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unarmoured">Unarmoured</SelectItem>
                    <SelectItem value="armoured">Armoured (SWA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Copper has higher conductivity and needs less cross-section; aluminium is lighter and cheaper per ampere.">Material</FieldLabel>
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
                <FieldLabel tip="XLPE (90°C) supports higher ampacity than PVC (70°C) for the same size.">Insulation</FieldLabel>
                <Select value={inputs.insulation} onValueChange={(v) => update("insulation", v as Inputs["insulation"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pvc">PVC (70°C)</SelectItem>
                    <SelectItem value="xlpe">XLPE (90°C)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Single-core cables run one conductor per phase; multi-core combines all phases in one cable.">Core Configuration</FieldLabel>
                <Select value={inputs.coreConfig} onValueChange={(v) => update("coreConfig", v as Inputs["coreConfig"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Core</SelectItem>
                    <SelectItem value="multi">Multi Core</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {inputs.coreConfig === "single" && (
                <div className="space-y-1.5">
                  <FieldLabel tip="Trefoil (bundled) touching formation is the reference case; flat/spaced formation reduces mutual heating and gives a modest rating uplift.">
                    Formation
                  </FieldLabel>
                  <Select value={inputs.formation} onValueChange={(v) => update("formation", v as Inputs["formation"])}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trefoil">Trefoil</SelectItem>
                      <SelectItem value="flat">Flat Formation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-1.5">
                <FieldLabel tip="Air temperature at the installation location.">Ambient Temperature (°C)</FieldLabel>
                <Input type="number" value={inputs.ambientTemp} onChange={(e) => update("ambientTemp", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Number of loaded circuits grouped together, sharing mutual heating.">Grouping (No. of Circuits)</FieldLabel>
                <Input type="number" min={1} value={inputs.grouping} onChange={(e) => update("grouping", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Maximum acceptable voltage drop, as a percentage of system voltage.">Voltage Drop Limit (%)</FieldLabel>
                <Input type="number" value={inputs.voltageDropLimit} onChange={(e) => update("voltageDropLimit", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Prospective fault level at the origin of this circuit, used for the adiabatic short-circuit check.">Fault Level (kA)</FieldLabel>
                <Input type="number" value={inputs.faultLevel} onChange={(e) => update("faultLevel", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel tip="Time for the protective device to clear the fault.">Fault Duration (s)</FieldLabel>
                <Input type="number" step="0.1" value={inputs.faultDuration} onChange={(e) => update("faultDuration", Number(e.target.value))} />
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
              <StatTile label="Demand Load" value={`${fmt(result.demandLoadKw)} kW`} tip="Connected Load × Diversity Factor" />
              <StatTile label="Design Current" value={`${fmt(result.designCurrent)} A`} />
              <StatTile
                label="Final Recommended Cable Size"
                value={`${result.outOfRange ? "> " : ""}${result.size} mm²`}
                tip="Smallest standard size whose derated ampacity (Iz) ≥ design current"
              />
              <StatTile label="Current Carrying Capacity" value={`${fmt(result.iz)} A`} />
              <StatTile
                label="Utilization"
                value={`${fmt(result.utilizationPct, 1)}%`}
                tone={result.utilizationPct >= 90 ? "bad" : result.utilizationPct >= 80 ? "warn" : "default"}
              />
              <StatTile label="Voltage Drop" value={`${fmt(result.vdPct, 2)}%`} tone={result.vdOk ? "good" : "bad"} />
              <StatTile label="Recommended Breaker" value={result.breakerRating ? `${result.breakerRating} A` : "> 630 A"} />
              <StatTile
                label="Protective Device Compatibility"
                value={result.protectiveDeviceOk ? "Ib ≤ In ≤ Iz OK" : "Non-Compliant"}
                tone={result.protectiveDeviceOk ? "good" : "bad"}
              />
              <StatTile
                label="Short Circuit Check"
                value={`${fmt(result.sMin, 1)} mm² req.`}
                tone={result.scOk ? "good" : "bad"}
                tip="S = (Fault Current × √Fault Duration) ÷ K"
              />
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
            <li>Demand Load (kW) = Connected Load × Diversity Factor</li>
            <li>Design Current (A) = (Demand Load × 1000) ÷ (V × PF) for 1φ, or ÷ (√3 × V × PF) for 3φ</li>
            <li>Current Carrying Capacity Iz (A) = Base Ampacity × Ambient Factor × Grouping Factor × Material Factor × Installation Factor × Formation Factor</li>
            <li>Final Recommended Cable Size = smallest standard size where Iz ≥ Design Current</li>
            <li>Voltage Drop (%) = [k × I × L × (R·cosφ + X·sinφ)] ÷ V × 100 (k = 2 for 1φ, √3 for 3φ)</li>
            <li>Short-Circuit Minimum Cross-Section (mm²) = (Fault Current × √Fault Duration) ÷ K (IEC 60364-5-54)</li>
            <li>Protective Device Compatibility: Ib (design current) ≤ In (breaker rating) ≤ Iz (cable capacity)</li>
          </ol>
          <div className="mt-6 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 leading-relaxed">
            Indicative preliminary sizing tool aligned in principle with IEC 60364-5-52/5-54 and IS 732/IS 1255.
            Verify against manufacturer cable data sheets and the applicable local wiring regulation before final
            design.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
