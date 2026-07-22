"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Info,
  Save,
  FolderOpen,
  Trash2,
  FileText,
  FileSpreadsheet,
  Sun,
  Moon,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react"

/* ---------------- Reference data (indicative, see disclaimer) ---------------- */

const STANDARD_LIBRARIES: Record<string, { label: string; values: number[] }> = {
  standard: {
    label: "Standard Series (10-2000 kVA)",
    values: [10, 20, 30, 40, 60, 80, 100, 120, 160, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000],
  },
  modular25: {
    label: "Modular Frame (25 kVA power modules, up to 800 kVA)",
    values: Array.from({ length: 32 }, (_, i) => (i + 1) * 25),
  },
}

const REDUNDANCY_OPTIONS: { value: string; label: string; description: string }[] = [
  {
    value: "single",
    label: "Single",
    description: "One UPS module. No redundancy — a fault or maintenance event removes protection entirely.",
  },
  {
    value: "n",
    label: "N",
    description: "Modules sized to exactly meet the load, with no spare module.",
  },
  {
    value: "n+1",
    label: "N+1",
    description: "One additional module beyond the working requirement (N) to ride through a single module failure.",
  },
  {
    value: "distributed",
    label: "Distributed Redundant",
    description: "Load and redundancy spread across independent distribution paths (N+1 across separate paths).",
  },
  {
    value: "2n",
    label: "2N",
    description: "Two fully independent, parallel UPS systems, each rated to carry the entire load.",
  },
  {
    value: "2n+1",
    label: "2(N+1)",
    description:
      "Two fully independent N+1 systems — tolerates a full system loss plus a module failure in the survivor.",
  },
]

type Inputs = {
  projectName: string
  loadName: string
  criticalLoad: number
  upsEfficiency: number
  distributionLoss: number
  batteryCharging: number
  outputPf: number
  numUnits: number
  redundancy: string
  library: string
  futureMargin: number
}

const DEFAULT_INPUTS: Inputs = {
  projectName: "",
  loadName: "",
  criticalLoad: 500,
  upsEfficiency: 95,
  distributionLoss: 2,
  batteryCharging: 10,
  outputPf: 0.9,
  numUnits: 2,
  redundancy: "n+1",
  library: "standard",
  futureMargin: 20,
}

type SavedCalc = { id: string; savedAt: string; inputs: Inputs }
const STORAGE_KEY = "vmi-ups-selection-calculator"

function fmt(n: number | null | undefined, d = 2) {
  return typeof n === "number" && Number.isFinite(n) ? n.toFixed(d) : "-"
}

function roundUpToStandard(value: number, table: number[]) {
  return table.find((v) => v >= value) ?? null
}

function gaugeColor(pct: number | null) {
  if (pct === null) return "#dc2626"
  if (pct < 70) return "#16a34a"
  if (pct < 80) return "#ca8a04"
  if (pct < 90) return "#ea580c"
  return "#dc2626"
}

function gaugeStatusLabel(pct: number | null) {
  if (pct === null) return "No Protection"
  if (pct < 70) return "Normal"
  if (pct < 80) return "Watch"
  if (pct < 90) return "High"
  return pct > 100 ? "Overload" : "Critical"
}

/* ---------------- Small building blocks ---------------- */

function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center text-muted-foreground hover:text-accent focus-visible:outline-none"
          aria-label="More information"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  )
}

function FieldLabel({ children, tip }: { children: ReactNode; tip: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Label>{children}</Label>
      <InfoTip text={tip} />
    </div>
  )
}

function StatTile({
  label,
  value,
  tip,
  tone = "default",
}: {
  label: string
  value: ReactNode
  tip?: string
  tone?: "default" | "good" | "bad"
}) {
  return (
    <div
      className={`rounded-lg p-4 ${
        tone === "good" ? "bg-green-500/10" : tone === "bad" ? "bg-red-500/10" : "bg-muted/50"
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground">
        {label}
        {tip ? <InfoTip text={tip} /> : null}
      </div>
      <div className="text-xl font-bold text-foreground mt-1 break-words">{value}</div>
    </div>
  )
}

function RadialGauge({ value, title, formula }: { value: number | null; title: string; formula: string }) {
  const radius = 54
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius
  const pctForRing = value === null ? 100 : Math.min(Math.max(value, 0), 100)
  const dash = (pctForRing / 100) * circumference
  const color = gaugeColor(value)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center gap-2 cursor-help">
          <svg viewBox="0 0 140 140" className="w-32 h-32 sm:w-36 sm:h-36">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--color-border)" strokeWidth={strokeWidth} />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference - dash}`}
              transform="rotate(-90 70 70)"
              style={{ transition: "stroke-dasharray 0.4s ease" }}
            />
            <text x="70" y="65" textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--color-foreground)">
              {value === null ? "—" : `${fmt(value, 0)}%`}
            </text>
            <text x="70" y="85" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">
              {gaugeStatusLabel(value)}
            </text>
          </svg>
          <div className="text-sm font-semibold text-foreground text-center">{title}</div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">{formula}</TooltipContent>
    </Tooltip>
  )
}

/* ---------------- Main component ---------------- */

export function UpsSelectionCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS)
  const [saves, setSaves] = useState<SavedCalc[]>([])
  const [selectedSaveId, setSelectedSaveId] = useState("")
  const [darkPanel, setDarkPanel] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSaves(JSON.parse(raw))
    } catch {
      // ignore corrupt local storage
    }
  }, [])

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const result = useMemo(() => {
    const criticalLoad = Math.max(inputs.criticalLoad, 0)
    const efficiency = Math.min(Math.max(inputs.upsEfficiency, 50), 99)
    const distLossPct = Math.max(inputs.distributionLoss, 0)
    const battery = Math.max(inputs.batteryCharging, 0)
    const pf = Math.min(Math.max(inputs.outputPf, 0.5), 1)
    const futureMargin = Math.max(inputs.futureMargin, 0)
    const N = Math.max(Math.round(inputs.numUnits), 1)
    const library = STANDARD_LIBRARIES[inputs.library]?.values ?? STANDARD_LIBRARIES.standard.values

    const upsLoss = criticalLoad * (100 / efficiency - 1)
    const distLoss = criticalLoad * (distLossPct / 100)
    const subtotal = criticalLoad + upsLoss + distLoss + battery
    const futureMarginKw = subtotal * (futureMargin / 100)
    const totalRequiredKw = subtotal + futureMarginKw
    const requiredKva = totalRequiredKw / pf

    const effectiveN = inputs.redundancy === "single" ? 1 : N
    const perModuleRequired = requiredKva / effectiveN
    const selectedRating = roundUpToStandard(perModuleRequired, library)
    const outOfRange = selectedRating === null
    const rating = selectedRating ?? library[library.length - 1]

    let modulesPerSystem = effectiveN
    let numSystems = 1
    let modulesAfterFailure = effectiveN - 1
    let totalModules = effectiveN

    switch (inputs.redundancy) {
      case "single":
        modulesPerSystem = 1
        numSystems = 1
        totalModules = 1
        modulesAfterFailure = 0
        break
      case "n":
        modulesPerSystem = N
        numSystems = 1
        totalModules = N
        modulesAfterFailure = N - 1
        break
      case "n+1":
      case "distributed":
        modulesPerSystem = N + 1
        numSystems = 1
        totalModules = N + 1
        modulesAfterFailure = N
        break
      case "2n":
        modulesPerSystem = N
        numSystems = 2
        totalModules = N * 2
        modulesAfterFailure = N
        break
      case "2n+1":
        modulesPerSystem = N + 1
        numSystems = 2
        totalModules = (N + 1) * 2
        modulesAfterFailure = N + 1
        break
    }

    const installedCapacityKva = rating * totalModules
    const loadSharePerSystem = requiredKva / numSystems

    const normalLoadingPct = modulesPerSystem > 0 ? (loadSharePerSystem / (rating * modulesPerSystem)) * 100 : null
    const failureLoadingPct = modulesAfterFailure > 0 ? (requiredKva / (rating * modulesAfterFailure)) * 100 : null
    const maintenanceLoadingPct = inputs.redundancy === "single" ? null : failureLoadingPct

    const spareCapacityPct = normalLoadingPct === null ? null : 100 - normalLoadingPct
    const spareCapacityKva = installedCapacityKva - requiredKva

    const redundancyCompliant =
      inputs.redundancy !== "single" && failureLoadingPct !== null && failureLoadingPct <= 100
    const passFail = redundancyCompliant && normalLoadingPct !== null && normalLoadingPct <= 100 && !outOfRange

    return {
      criticalLoad,
      upsLoss,
      distLoss,
      battery,
      subtotal,
      futureMarginKw,
      totalRequiredKw,
      requiredKva,
      effectiveN,
      perModuleRequired,
      rating,
      outOfRange,
      modulesPerSystem,
      numSystems,
      totalModules,
      modulesAfterFailure,
      installedCapacityKva,
      spareCapacityKva,
      normalLoadingPct,
      failureLoadingPct,
      maintenanceLoadingPct,
      spareCapacityPct,
      redundancyCompliant,
      passFail,
    }
  }, [inputs])

  const complianceLabel =
    inputs.redundancy === "single"
      ? "Non-Compliant — No Redundancy"
      : result.redundancyCompliant
        ? "Compliant"
        : "Non-Compliant — Failure Loading Exceeds 100%"

  const configSummary =
    result.numSystems > 1
      ? `${result.rating} kVA × ${result.modulesPerSystem} × ${result.numSystems} systems`
      : `${result.rating} kVA × ${result.totalModules}`

  const warnings = useMemo(() => {
    const list: { level: "warn" | "danger"; message: string }[] = []
    const scenarios: { label: string; pct: number | null }[] = [
      { label: "Normal operation", pct: result.normalLoadingPct },
      { label: "Single module/system failure", pct: result.failureLoadingPct },
      { label: "Maintenance bypass", pct: result.maintenanceLoadingPct },
    ]
    scenarios.forEach(({ label, pct }) => {
      if (pct === null) {
        list.push({ level: "danger", message: `${label}: total loss of UPS protection under this configuration.` })
        return
      }
      if (pct > 100) {
        list.push({
          level: "danger",
          message: `${label}: loading at ${fmt(pct, 0)}% — exceeds 100% of installed capacity. Overload risk.`,
        })
      } else if (pct >= 90) {
        list.push({ level: "danger", message: `${label}: loading at ${fmt(pct, 0)}% — critical, above 90%.` })
      } else if (pct >= 80) {
        list.push({ level: "warn", message: `${label}: loading at ${fmt(pct, 0)}% — above 80%, limited headroom.` })
      }
    })
    if (result.outOfRange) {
      list.push({
        level: "danger",
        message: "Per-module requirement exceeds the largest rating in the selected library — pick a larger frame or increase the unit count.",
      })
    }
    return list
  }, [result])

  function persist(next: SavedCalc[]) {
    setSaves(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore storage quota errors
    }
  }

  function handleSave() {
    const projectName = inputs.projectName.trim() || "Untitled Project"
    const loadName = inputs.loadName.trim() || "Untitled Load"
    const id = `${projectName}__${loadName}`
    const entry: SavedCalc = {
      id,
      savedAt: new Date().toISOString(),
      inputs: { ...inputs, projectName, loadName },
    }
    const next = [entry, ...saves.filter((s) => s.id !== id)]
    persist(next)
    setSelectedSaveId(id)
    toast.success(`Saved "${projectName} — ${loadName}" to this browser.`)
  }

  function handleLoadSaved(id: string) {
    const found = saves.find((s) => s.id === id)
    if (!found) return
    setInputs(found.inputs)
    setSelectedSaveId(id)
    toast.success("Calculation loaded.")
  }

  function handleDeleteSaved(id: string) {
    const next = saves.filter((s) => s.id !== id)
    persist(next)
    if (selectedSaveId === id) setSelectedSaveId("")
    toast.success("Saved calculation removed.")
  }

  async function handleExportPdf() {
    const { jsPDF } = await import("jspdf")
    const { default: autoTable } = await import("jspdf-autotable")
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text("UPS Selection Calculation Summary", 14, 18)
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Project: ${inputs.projectName || "-"}    Load: ${inputs.loadName || "-"}`, 14, 25)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30)

    autoTable(doc, {
      startY: 36,
      head: [["Input Parameter", "Value"]],
      body: [
        ["Critical Load", `${fmt(inputs.criticalLoad)} kW`],
        ["UPS Efficiency", `${fmt(inputs.upsEfficiency)} %`],
        ["Distribution Loss", `${fmt(inputs.distributionLoss)} %`],
        ["Battery Charging Power", `${fmt(inputs.batteryCharging)} kW`],
        ["Output Power Factor", `${fmt(inputs.outputPf)}`],
        ["Number of UPS Units (N)", `${inputs.numUnits}`],
        ["Redundancy Philosophy", REDUNDANCY_OPTIONS.find((r) => r.value === inputs.redundancy)?.label ?? ""],
        ["Standard Rating Library", STANDARD_LIBRARIES[inputs.library]?.label ?? ""],
        ["Future Load Margin", `${fmt(inputs.futureMargin)} %`],
      ],
      theme: "grid",
      headStyles: { fillColor: [0, 87, 217] },
    })

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [["Result", "Value"]],
      body: [
        ["UPS Internal Losses", `${fmt(result.upsLoss)} kW`],
        ["Distribution Losses", `${fmt(result.distLoss)} kW`],
        ["Battery Charging Load", `${fmt(result.battery)} kW`],
        ["Future Expansion Margin", `${fmt(result.futureMarginKw)} kW`],
        ["Total Required UPS Output", `${fmt(result.totalRequiredKw)} kW`],
        ["Required UPS Capacity", `${fmt(result.requiredKva)} kVA`],
        ["Selected Standard UPS Rating", configSummary],
        ["Normal Loading", result.normalLoadingPct === null ? "N/A" : `${fmt(result.normalLoadingPct, 1)} %`],
        [
          "Failure-Mode Loading",
          result.failureLoadingPct === null ? "Total loss of protection" : `${fmt(result.failureLoadingPct, 1)} %`,
        ],
        [
          "Maintenance Bypass Loading",
          result.maintenanceLoadingPct === null
            ? "On static bypass — unconditioned"
            : `${fmt(result.maintenanceLoadingPct, 1)} %`,
        ],
        ["Available Spare Capacity", result.spareCapacityPct === null ? "-" : `${fmt(result.spareCapacityPct, 1)} %`],
        ["Redundancy Compliance", complianceLabel],
        ["Pass / Fail", result.passFail ? "PASS" : "FAIL"],
      ],
      theme: "grid",
      headStyles: { fillColor: [0, 87, 217] },
    })

    doc.setFontSize(8)
    doc.setTextColor(120)
    doc.text(
      "Indicative preliminary sizing per IEC 62040, IEC 60364 and TIA-942 redundancy concepts. Verify against manufacturer datasheets and project-specific single-line diagrams before final design.",
      14,
      (doc as any).lastAutoTable.finalY + 10,
      { maxWidth: 180 },
    )

    doc.save(`${(inputs.projectName || "ups-selection").replace(/\s+/g, "-")}.pdf`)
    toast.success("PDF exported.")
  }

  async function handleExportExcel() {
    const XLSX = await import("xlsx")

    const inputRows = [
      ["Parameter", "Value"],
      ["Project Name", inputs.projectName],
      ["Load Name", inputs.loadName],
      ["Critical Load (kW)", inputs.criticalLoad],
      ["UPS Efficiency (%)", inputs.upsEfficiency],
      ["Distribution Loss (%)", inputs.distributionLoss],
      ["Battery Charging Power (kW)", inputs.batteryCharging],
      ["Output Power Factor", inputs.outputPf],
      ["Number of UPS Units (N)", inputs.numUnits],
      ["Redundancy Philosophy", REDUNDANCY_OPTIONS.find((r) => r.value === inputs.redundancy)?.label ?? ""],
      ["Standard Rating Library", STANDARD_LIBRARIES[inputs.library]?.label ?? ""],
      ["Future Load Margin (%)", inputs.futureMargin],
    ]

    const resultRows = [
      ["Result", "Value"],
      ["UPS Internal Losses (kW)", result.upsLoss],
      ["Distribution Losses (kW)", result.distLoss],
      ["Battery Charging Load (kW)", result.battery],
      ["Future Expansion Margin (kW)", result.futureMarginKw],
      ["Total Required UPS Output (kW)", result.totalRequiredKw],
      ["Required UPS Capacity (kVA)", result.requiredKva],
      ["Selected Standard UPS Rating (kVA)", result.rating],
      ["Total Installed Modules", result.totalModules],
      ["Installed Capacity (kVA)", result.installedCapacityKva],
      ["Normal Loading (%)", result.normalLoadingPct],
      ["Failure-Mode Loading (%)", result.failureLoadingPct],
      ["Maintenance Bypass Loading (%)", result.maintenanceLoadingPct],
      ["Available Spare Capacity (%)", result.spareCapacityPct],
      ["Redundancy Compliance", complianceLabel],
      ["Pass / Fail", result.passFail ? "PASS" : "FAIL"],
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(inputRows), "Inputs")
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(resultRows), "Results")
    XLSX.writeFile(wb, `${(inputs.projectName || "ups-selection").replace(/\s+/g, "-")}.xlsx`)
    toast.success("Excel file exported.")
  }

  return (
    <div className={darkPanel ? "dark" : ""}>
      <div className="grid gap-6">
        {/* Toolbar */}
        <Card>
          <CardContent className="flex flex-wrap items-end gap-4 pt-6">
            <div className="space-y-1.5 flex-1 min-w-[180px]">
              <FieldLabel tip="Free-text identifier for the project or facility this calculation belongs to. Used only for labeling saved calculations and exported reports.">
                Project Name
              </FieldLabel>
              <Input
                value={inputs.projectName}
                onChange={(e) => update("projectName", e.target.value)}
                placeholder="e.g. Riverside Data Center — Phase 2"
              />
            </div>
            <div className="space-y-1.5 flex-1 min-w-[180px]">
              <FieldLabel tip="Identifies which load or distribution board this UPS is sized for (e.g. IT load, mechanical load, a specific PDU).">
                Load Name
              </FieldLabel>
              <Input
                value={inputs.loadName}
                onChange={(e) => update("loadName", e.target.value)}
                placeholder="e.g. Critical IT Load — White Space 1"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleSave} className="gap-1.5 bg-transparent">
                <Save className="h-4 w-4" /> Save
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleExportPdf} className="gap-1.5 bg-transparent">
                <FileText className="h-4 w-4" /> Export PDF
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleExportExcel}
                className="gap-1.5 bg-transparent"
              >
                <FileSpreadsheet className="h-4 w-4" /> Export Excel
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDarkPanel((d) => !d)}
                className="gap-1.5 bg-transparent"
              >
                {darkPanel ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {darkPanel ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </CardContent>
          {saves.length > 0 && (
            <CardContent className="pt-0 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <FolderOpen className="h-4 w-4" /> Saved calculations:
              </div>
              <Select value={selectedSaveId} onValueChange={handleLoadSaved}>
                <SelectTrigger className="w-full sm:w-72">
                  <SelectValue placeholder="Load a saved calculation..." />
                </SelectTrigger>
                <SelectContent>
                  {saves.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.inputs.projectName} — {s.inputs.loadName} ({new Date(s.savedAt).toLocaleDateString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedSaveId && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteSaved(selectedSaveId)}
                  className="gap-1.5 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              )}
            </CardContent>
          )}
        </Card>

        {/* Inputs + Results */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-sans">Design Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <FieldLabel tip="The IT/critical load the UPS system must protect, downstream of any local distribution.">
                    Critical Load (kW)
                  </FieldLabel>
                  <Input
                    type="number"
                    value={inputs.criticalLoad}
                    onChange={(e) => update("criticalLoad", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel tip="Manufacturer's rated UPS efficiency at the expected loading point (double-conversion online UPS typically 93-97%). Internal loss = Load × (100/Efficiency − 1).">
                    UPS Efficiency (%)
                  </FieldLabel>
                  <Input
                    type="number"
                    value={inputs.upsEfficiency}
                    onChange={(e) => update("upsEfficiency", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel tip="Losses in downstream busway, PDUs, cabling and static transfer switches between the UPS output and the load, expressed as a percentage of the critical load.">
                    Distribution Loss (%)
                  </FieldLabel>
                  <Input
                    type="number"
                    value={inputs.distributionLoss}
                    onChange={(e) => update("distributionLoss", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel tip="Continuous power drawn to charge/float the battery string, added as a fixed additional load on the UPS output.">
                    Battery Charging Power (kW)
                  </FieldLabel>
                  <Input
                    type="number"
                    value={inputs.batteryCharging}
                    onChange={(e) => update("batteryCharging", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel tip="Output power factor the UPS is rated for (commonly 0.9 or unity for modern online UPS). Required kVA = Required kW ÷ Power Factor.">
                    UPS Output Power Factor
                  </FieldLabel>
                  <Input
                    type="number"
                    step="0.01"
                    value={inputs.outputPf}
                    onChange={(e) => update("outputPf", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel tip="Percentage growth to reserve for future load additions before the UPS system needs to be expanded.">
                    Future Load Margin (%)
                  </FieldLabel>
                  <Input
                    type="number"
                    value={inputs.futureMargin}
                    onChange={(e) => update("futureMargin", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel tip="The working module count (N) used to share the required load — the redundancy philosophy adds spare modules/systems on top of this.">
                    Number of UPS Units (N)
                  </FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    value={inputs.numUnits}
                    disabled={inputs.redundancy === "single"}
                    onChange={(e) => update("numUnits", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel tip="The catalogue of standard UPS module ratings the tool rounds up to when selecting a UPS size.">
                    Standard UPS Rating Library
                  </FieldLabel>
                  <Select value={inputs.library} onValueChange={(v) => update("library", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STANDARD_LIBRARIES).map(([key, lib]) => (
                        <SelectItem key={key} value={key}>
                          {lib.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 col-span-2">
                  <FieldLabel tip="Defines how spare UPS capacity is provisioned — from no redundancy (Single) through fully independent, doubly-redundant systems (2(N+1)).">
                    Redundancy Philosophy
                  </FieldLabel>
                  <Select value={inputs.redundancy} onValueChange={(v) => update("redundancy", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REDUNDANCY_OPTIONS.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-xs text-muted-foreground">
                    {REDUNDANCY_OPTIONS.find((r) => r.value === inputs.redundancy)?.description}
                  </span>
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
                <StatTile label="Critical Load" value={`${fmt(result.criticalLoad)} kW`} />
                <StatTile
                  label="UPS Losses"
                  value={`${fmt(result.upsLoss)} kW`}
                  tip="Critical Load × (100 / Efficiency − 1)"
                />
                <StatTile
                  label="Distribution Losses"
                  value={`${fmt(result.distLoss)} kW`}
                  tip="Critical Load × (Distribution Loss % ÷ 100)"
                />
                <StatTile label="Battery Charging Load" value={`${fmt(result.battery)} kW`} />
                <StatTile
                  label="Future Expansion Margin"
                  value={`${fmt(result.futureMarginKw)} kW`}
                  tip="Subtotal Load × (Future Margin % ÷ 100)"
                />
                <StatTile
                  label="Total Required UPS Output"
                  value={`${fmt(result.totalRequiredKw)} kW`}
                  tip="Critical Load + UPS Losses + Distribution Losses + Battery Charging + Future Margin"
                />
                <StatTile
                  label="Required UPS Capacity"
                  value={`${fmt(result.requiredKva)} kVA`}
                  tip="Total Required Output ÷ Output Power Factor"
                />
                <StatTile
                  label="Selected Standard UPS Rating"
                  value={`${result.outOfRange ? "> " : ""}${configSummary}`}
                  tip="Next available rating in the selected library ≥ the per-module requirement."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatTile
                  label="Normal Loading"
                  value={result.normalLoadingPct === null ? "N/A" : `${fmt(result.normalLoadingPct, 1)}%`}
                  tone={result.normalLoadingPct !== null && result.normalLoadingPct >= 90 ? "bad" : "default"}
                />
                <StatTile
                  label="Failure Loading"
                  value={result.failureLoadingPct === null ? "Total Loss" : `${fmt(result.failureLoadingPct, 1)}%`}
                  tone={result.failureLoadingPct === null || result.failureLoadingPct >= 90 ? "bad" : "default"}
                />
                <StatTile
                  label="Available Spare Capacity"
                  value={result.spareCapacityPct === null ? "-" : `${fmt(result.spareCapacityPct, 1)}%`}
                />
                <StatTile
                  label="Redundancy Compliance"
                  value={complianceLabel}
                  tone={result.redundancyCompliant ? "good" : "bad"}
                />
              </div>

              <div
                className={`flex items-center justify-center gap-2 rounded-lg p-4 text-lg font-bold ${
                  result.passFail ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                }`}
              >
                {result.passFail ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                {result.passFail ? "PASS" : "FAIL"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gauges */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">UPS Loading Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-8 justify-items-center">
              <RadialGauge
                value={result.normalLoadingPct}
                title="Normal Operation"
                formula="Loading with all installed modules/systems online, sharing the required load."
              />
              <RadialGauge
                value={result.failureLoadingPct}
                title="Single Failure"
                formula="Worst-case loading if one module (or one full system in 2N/2(N+1)) is lost."
              />
              <RadialGauge
                value={result.maintenanceLoadingPct}
                title="Maintenance Bypass"
                formula="Loading with one module/system deliberately taken offline for planned maintenance."
              />
            </div>

            {warnings.length > 0 && (
              <div className="mt-8 space-y-2">
                {warnings.map((w, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
                      w.level === "danger" ? "bg-red-500/10 text-red-700" : "bg-orange-500/10 text-orange-700"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{w.message}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Formulas */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-lg">Calculation Formulas &amp; Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>UPS Internal Losses (kW) = Critical Load × (100 ÷ Efficiency − 1)</li>
              <li>Distribution Losses (kW) = Critical Load × (Distribution Loss % ÷ 100)</li>
              <li>Battery Charging Load (kW) = user input, added directly to the UPS output</li>
              <li>Subtotal Load (kW) = Critical Load + UPS Losses + Distribution Losses + Battery Charging Load</li>
              <li>Future Expansion Margin (kW) = Subtotal Load × (Future Load Margin % ÷ 100)</li>
              <li>Total Required UPS Output (kW) = Subtotal Load + Future Expansion Margin</li>
              <li>Required UPS Capacity (kVA) = Total Required UPS Output ÷ Output Power Factor</li>
              <li>Per-Module Required Rating (kVA) = Required UPS Capacity ÷ Working Units (N), or ÷ 1 for Single</li>
              <li>Selected Standard UPS Rating = next available rating in the chosen library ≥ the per-module requirement</li>
              <li>
                Normal Loading (%) = (Required Capacity ÷ Number of Independent Systems) ÷ (Selected Rating × Modules
                Online per System) × 100
              </li>
              <li>
                Failure-Mode Loading (%) = Required Capacity ÷ (Selected Rating × Modules Remaining After Worst-Case
                Loss) × 100
              </li>
              <li>
                Maintenance Bypass Loading (%) = same divisor logic as Failure-Mode, representing one module/system
                deliberately removed from service
              </li>
              <li>Available Spare Capacity (%) = 100% − Normal Loading (%)</li>
            </ol>

            <div className="mt-6 space-y-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 leading-relaxed">
              <p>
                <strong>Redundancy assumptions:</strong> Distributed Redundant is modeled arithmetically the same as
                N+1 (same module count and loading), differing only in that capacity is spread across independent
                distribution paths rather than a single parallel bus — verify path independence separately against
                the project's single-line diagram. 2N and 2(N+1) assume an even 50/50 load split across two fully
                independent, equally rated systems, which is common but not universal; confirm against the
                project-specific design intent.
              </p>
              <p>
                Figures are preliminary, simplified sizing estimates aligned in principle with IEC 62040 (UPS
                systems), IEC 60364 (electrical installations of buildings) and TIA-942 redundancy/tier concepts.
                They do not replace manufacturer datasheets, discharge-curve battery sizing, harmonics/inrush studies
                or a stamped electrical design.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
