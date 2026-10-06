export interface ToolkitTool {
  slug: string
  shortLabel: string
  title: string
  description: string
}

export const TOOLKIT_TOOLS: ToolkitTool[] = [
  {
    slug: "conductor-sizing-calculator",
    shortLabel: "Conductor Sizing",
    title: "Cable & Conductor Sizing Calculator (HT / LV / Busduct / Earthing)",
    description:
      "Four independent IEC/IS-aligned sizing tools in one place — HT cables, LV cables, busducts and earthing conductors — each checking ampacity, voltage drop, and short-circuit withstand rather than giving a rough estimate.",
  },
  {
    slug: "transformer-sizing-calculator",
    shortLabel: "Transformer Sizing",
    title: "Transformer Sizing Calculator",
    description:
      "Size a power transformer to the nearest standard IEC 60076 kVA rating from connected load, power factor and spare capacity, with primary and secondary full-load current.",
  },
  {
    slug: "ups-selection-calculator",
    shortLabel: "UPS Selection",
    title: "UPS Sizing & Selection Calculator for Data Centers",
    description:
      "Size a UPS system across Single, N, N+1, Distributed, 2N and 2(N+1) redundancy philosophies, with losses, battery charging load, and standard kVA rating libraries.",
  },
  {
    slug: "generator-sizing-calculator",
    shortLabel: "Generator (DG) Sizing",
    title: "Diesel Generator (DG) Sizing Calculator",
    description:
      "Size a standby diesel generator set per ISO 8528, sized on the larger of steady-state running load and the voltage-dip-limited starting requirement of the largest motor.",
  },
  {
    slug: "breaker-sizing-calculator",
    shortLabel: "Breaker Sizing",
    title: "Circuit Breaker Sizing Calculator",
    description:
      "Calculate full load current and recommended breaker rating for general distribution and motor feeder circuits, with instantaneous trip range for common starting methods.",
  },
  {
    slug: "short-circuit-calculator",
    shortLabel: "Short-Circuit",
    title: "Short-Circuit Fault Level Calculator",
    description:
      "Estimate prospective short-circuit current (Isc) per IEC 60909 at a transformer's terminals, or downstream at the end of a cable, plus the minimum cable size for the fault withstand.",
  },
  {
    slug: "power-factor-correction-calculator",
    shortLabel: "Power Factor Correction",
    title: "Power Factor Correction Calculator",
    description:
      "Calculate the capacitor bank (kVAR) needed to correct power factor to a target value, per IEEE 141, with the resulting reduction in apparent power (kVA).",
  },
  {
    slug: "lighting-calculator",
    shortLabel: "Lighting Design",
    title: "Lighting Design Calculator (Lumen Method)",
    description:
      "Calculate the number of luminaires needed for a target illuminance using the lumen method per EN 12464-1 / IESNA RP-20.",
  },
  {
    slug: "grounding-resistance-calculator",
    shortLabel: "Grounding Resistance",
    title: "Earthing / Grounding Resistance Calculator",
    description:
      "Calculate earth electrode resistance for a vertical rod, horizontal strip/plate, or ring electrode, per IEEE 80 / IEC 60364-5-54.",
  },
  {
    slug: "battery-runtime-calculator",
    shortLabel: "Battery Runtime",
    title: "UPS Battery Runtime / Autonomy Calculator",
    description:
      "Estimate UPS battery backup runtime from Ah, bank voltage, depth of discharge and inverter efficiency, plus the reverse calculation for a target backup time.",
  },
  {
    slug: "data-center-efficiency-calculator",
    shortLabel: "PUE / WUE / CUE",
    title: "Data Center PUE, WUE & CUE Efficiency Calculator",
    description:
      "Calculate Power Usage Effectiveness, Water Usage Effectiveness, Carbon Usage Effectiveness and DCiE per The Green Grid definitions.",
  },
  {
    slug: "cooling-load-calculator",
    shortLabel: "Cooling Load",
    title: "Data Center Cooling Load Calculator (Tons of Refrigeration)",
    description:
      "Preliminary IT-load-driven cooling capacity sizing in tons of refrigeration, with an other-heat-gains allowance and a redundancy margin.",
  },
  {
    slug: "motor-starting-voltage-dip-calculator",
    shortLabel: "Motor Starting Dip",
    title: "Motor Starting Voltage Dip Calculator",
    description:
      "Estimate the voltage dip at the point of common coupling during motor starting for DOL, star-delta, soft-starter and VFD starting methods.",
  },
  {
    slug: "voltage-drop-calculator",
    shortLabel: "Voltage Drop",
    title: "Voltage Drop Calculator (LV Cable, Single & Three Phase)",
    description:
      "Calculate LV cable voltage drop in volts and percent from current, length, conductor size, material and power factor, and check it against your allowed limit.",
  },
  {
    slug: "quick-electrical-formulas-calculator",
    shortLabel: "Quick Formulas",
    title: "Quick Electrical Formulas Calculator",
    description:
      "Instant Ohm's Law, impedance, resistance, and single-phase/three-phase power calculations from voltage, current and power factor.",
  },
]

export function getToolkitTool(slug: string): ToolkitTool | undefined {
  return TOOLKIT_TOOLS.find((tool) => tool.slug === slug)
}

export function getRelatedToolkitTools(slug: string, count = 4): ToolkitTool[] {
  const others = TOOLKIT_TOOLS.filter((tool) => tool.slug !== slug)
  return others.slice(0, count)
}
