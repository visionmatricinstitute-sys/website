/**
 * Shared reference data and calculation helpers for the Conductor Sizing module
 * (HT Conductor Sizing, LV Conductor Sizing, Busduct Sizing, Earthing Conductor Sizing).
 *
 * Figures are indicative/preliminary engineering reference values aligned in principle with
 * IEC 60364, IEC 60287, IEC 60949, IEC 60364-5-54, IEC 61439, IEC 60909, IS 3043, IS 1255,
 * IS 7098, IEEE 80 and BS 7430. They are not a substitute for manufacturer datasheets or a
 * full IEC 60287 thermal-circuit / IEEE 80 grounding-grid study.
 */

export function fmt(n: number | null | undefined, d = 2): string {
  return typeof n === "number" && Number.isFinite(n) ? n.toFixed(d) : "-"
}

export function roundUpToStandard(value: number, table: number[]): number | null {
  return table.find((v) => v >= value) ?? null
}

/** Linearly interpolates a correction-factor lookup table keyed by a continuous variable (e.g. temperature). */
export function interpolateTable(table: Record<number, number>, x: number): number {
  const keys = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b)
  if (keys.length === 0) return 1
  if (x <= keys[0]) return table[keys[0]]
  if (x >= keys[keys.length - 1]) return table[keys[keys.length - 1]]
  for (let i = 0; i < keys.length - 1; i++) {
    const k0 = keys[i]
    const k1 = keys[i + 1]
    if (x >= k0 && x <= k1) {
      const t = (x - k0) / (k1 - k0)
      return table[k0] + t * (table[k1] - table[k0])
    }
  }
  return 1
}

/* =========================================================================
 * LV / general insulated-cable reference data (IEC 60364-5-52 aligned)
 * ========================================================================= */

export const CABLE_SIZES_MM2 = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630]

export const CABLE_AMPACITY: Record<"pvc" | "xlpe", number[]> = {
  pvc: [17.5, 24, 32, 41, 57, 76, 96, 119, 144, 184, 223, 259, 299, 341, 403, 464, 530, 590, 678],
  xlpe: [23, 31, 42, 54, 75, 100, 127, 158, 192, 246, 298, 346, 399, 456, 538, 621, 700, 780, 895],
}

export const AMBIENT_FACTOR_LV: Record<"pvc" | "xlpe", Record<number, number>> = {
  pvc: { 10: 1.22, 15: 1.17, 20: 1.12, 25: 1.06, 30: 1.0, 35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.5 },
  xlpe: { 10: 1.15, 15: 1.12, 20: 1.08, 25: 1.04, 30: 1.0, 35: 0.96, 40: 0.91, 45: 0.87, 50: 0.82, 55: 0.76, 60: 0.71 },
}

export const MATERIAL_FACTOR: Record<"cu" | "al", number> = { cu: 1.0, al: 0.78 }
export const RESISTIVITY: Record<"cu" | "al", number> = { cu: 22.5, al: 36 } // ohm.mm²/km, operating temperature
export const REACTANCE_PER_KM_LV = 0.08 // ohm/km, indicative for LV multicore/single-core cable

export function groupingFactor(n: number) {
  if (n <= 1) return 1.0
  if (n === 2) return 0.8
  if (n === 3) return 0.7
  if (n === 4) return 0.65
  if (n === 5) return 0.6
  if (n <= 6) return 0.57
  if (n <= 9) return 0.54
  if (n <= 12) return 0.5
  if (n <= 15) return 0.45
  if (n <= 19) return 0.41
  return 0.38
}

export const SC_K_INSULATED: Record<"cu" | "al", Record<"pvc" | "xlpe", number>> = {
  cu: { pvc: 115, xlpe: 143 },
  al: { pvc: 76, xlpe: 94 },
}

export const BREAKERS = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630]

export const INSTALL_METHOD_FACTOR_LV: Record<string, number> = {
  tray: 1.0,
  ladder: 1.0,
  conduit: 0.9,
  buried: 1.1,
  underground: 1.1,
}

export const FORMATION_FACTOR_LV: Record<"trefoil" | "flat", number> = { trefoil: 1.0, flat: 1.05 }

/* =========================================================================
 * HT / MV cable reference data (IEC 60287 aligned, indicative)
 * ========================================================================= */

export const HT_VOLTAGES_KV = [3.3, 6.6, 11, 22, 33]

export const HT_SIZES_MM2 = [35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630]

// Indicative base ampacity (A) for XLPE, single-core, buried reference: ground 25°C, soil 1.2 K.m/W, depth 750mm
export const HT_BASE_AMPACITY_XLPE = [130, 155, 190, 230, 260, 295, 335, 385, 430, 490, 555, 630]
// Indicative base ampacity (A) for XLPE, single-core, in free air, ambient 35°C reference
export const HT_BASE_AMPACITY_XLPE_AIR = [150, 180, 220, 265, 300, 340, 385, 440, 495, 565, 640, 725]

export const HT_GROUND_TEMP_FACTOR: Record<number, number> = {
  15: 1.11,
  20: 1.07,
  25: 1.0,
  30: 0.93,
  35: 0.85,
  40: 0.76,
  45: 0.66,
}

export const HT_AMBIENT_TEMP_FACTOR: Record<number, number> = {
  25: 1.08,
  30: 1.04,
  35: 1.0,
  40: 0.96,
  45: 0.91,
  50: 0.87,
}

export const HT_SOIL_RESISTIVITY_FACTOR: Record<number, number> = {
  0.8: 1.14,
  1.0: 1.07,
  1.2: 1.0,
  1.5: 0.93,
  2.0: 0.84,
  2.5: 0.77,
  3.0: 0.71,
}

export const HT_DEPTH_FACTOR: Record<number, number> = {
  500: 1.02,
  750: 1.0,
  1000: 0.98,
  1250: 0.96,
  1500: 0.94,
  2000: 0.91,
}

export const HT_GROUPING_FACTOR: Record<number, number> = {
  1: 1.0,
  2: 0.87,
  3: 0.8,
  4: 0.75,
  5: 0.71,
  6: 0.68,
}

export const HT_THERMAL_BACKFILL_BONUS = 1.1

export const HT_INSULATION_MAX_TEMP: Record<"pvc" | "xlpe", number> = { pvc: 70, xlpe: 90 }

/* =========================================================================
 * Busduct reference data (IEC 61439 aligned, indicative)
 * ========================================================================= */

export const BUSDUCT_RATINGS = [200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000, 5000, 6300]

export const BUSDUCT_AMBIENT_FACTOR: Record<number, number> = {
  25: 1.13,
  30: 1.09,
  35: 1.05,
  40: 1.0,
  45: 0.95,
  50: 0.9,
  55: 0.85,
}

export const BUSBAR_CURRENT_DENSITY: Record<"cu" | "al", number> = { cu: 1.6, al: 1.0 } // A/mm^2, indicative design density
export const BARE_CONDUCTOR_K: Record<"cu" | "al", number> = { cu: 226, al: 148 }
export const BUSDUCT_REACTANCE_PER_KM = 0.15 // ohm/km, indicative
export const BUSDUCT_RATED_TEMP_RISE_K = 55 // K, typical Class per IEC 61439-1 at rated current

/* =========================================================================
 * Earthing conductor reference data (IS 3043 / IEC 60364-5-54 / IEC 60949 aligned)
 * ========================================================================= */

export type EarthMaterial = "cu" | "al" | "gi"
export type InsulationType = "bare" | "pvc" | "xlpe" | "hffr" | "lszh"
export type ConductorShape = "round" | "strip" | "tape" | "busbar"

export const BETA: Record<EarthMaterial, number> = { cu: 234.5, al: 228, gi: 202 }

// Resistivity at ~20°C, ohm.mm²/m (steel/GI varies significantly by grade — representative value)
export const RESISTIVITY_EARTH: Record<EarthMaterial, number> = { cu: 0.0175, al: 0.0282, gi: 0.15 }

// Reference K-factor table (IEC 60364-5-54 / IEC 60949 / IS 3043 style), with the standard
// initial/final temperature pair each reference value corresponds to.
export const K_REFERENCE: Record<EarthMaterial, Record<"bare" | "pvc" | "xlpe", { k: number; ti: number; tf: number }>> = {
  cu: {
    bare: { k: 226, ti: 30, tf: 250 },
    pvc: { k: 143, ti: 70, tf: 160 },
    xlpe: { k: 176, ti: 90, tf: 250 },
  },
  al: {
    bare: { k: 148, ti: 30, tf: 250 },
    pvc: { k: 94, ti: 70, tf: 160 },
    xlpe: { k: 116, ti: 90, tf: 250 },
  },
  gi: {
    bare: { k: 80, ti: 30, tf: 395 },
    pvc: { k: 58, ti: 70, tf: 160 },
    xlpe: { k: 70, ti: 90, tf: 250 },
  },
}

export function defaultInitialTemp(insulation: InsulationType): number {
  if (insulation === "bare") return 30
  if (insulation === "pvc") return 70
  if (insulation === "xlpe" || insulation === "hffr") return 90
  return 70 // lszh
}

export function defaultFinalTemp(material: EarthMaterial, insulation: InsulationType): number {
  if (insulation === "bare") return material === "gi" ? 395 : 250
  if (insulation === "pvc") return 160
  if (insulation === "xlpe" || insulation === "hffr") return 250
  return 200 // lszh — verify against the specific compound's data sheet
}

/**
 * Computes the adiabatic K-factor (IEC 60364-5-54 / IEC 60949 formula) for an arbitrary
 * initial/final temperature pair, calibrated against the published reference K-value for the
 * same material and insulation family (Bare/PVC/XLPE). HFFR and LSZH are approximated using
 * the XLPE calibration point for the same material (both are cross-linked/thermoset compounds
 * with broadly similar thermal characteristics) — verify against the specific compound's data
 * sheet for critical designs.
 */
export function computeKFactor(material: EarthMaterial, insulation: InsulationType, ti: number, tf: number): number {
  const beta = BETA[material]
  const refKey = insulation === "hffr" || insulation === "lszh" ? "xlpe" : insulation
  const ref = K_REFERENCE[material][refKey]
  const refLn = Math.log(1 + (ref.tf - ref.ti) / (beta + ref.ti))
  const calibration = ref.k / Math.sqrt(refLn)
  const ln = 1 + (tf - ti) / (beta + ti)
  return ln > 0 ? calibration * Math.sqrt(Math.log(ln)) : 0
}

export const ROUND_DIAMETERS_MM = [6, 8, 10, 12, 16, 20, 25]
// [width mm, thickness mm]
export const STRIP_SIZES_MM: [number, number][] = [
  [20, 3],
  [25, 3],
  [25, 6],
  [40, 6],
  [50, 3],
  [50, 6],
  [65, 6],
  [75, 6],
  [80, 6],
  [100, 6],
  [100, 10],
]
export const BUSBAR_SIZES_MM: [number, number][] = [
  [25, 6],
  [32, 6],
  [40, 6],
  [50, 6],
  [50, 10],
  [63, 10],
  [75, 10],
  [100, 10],
  [100, 12],
]

export function roundArea(diameterMm: number) {
  return (Math.PI / 4) * diameterMm * diameterMm
}
export function stripArea(size: [number, number]) {
  return size[0] * size[1]
}

// IS 3043 practical mechanical-strength minimum cross-sections (indicative — GI/steel carries a
// corrosion allowance and is therefore held to a larger minimum than copper/aluminium).
export const MECH_MIN_AREA_MM2: Record<EarthMaterial, Record<ConductorShape, number>> = {
  cu: { round: 28.3, strip: 75, tape: 75, busbar: 150 },
  al: { round: 28.3, strip: 75, tape: 75, busbar: 150 },
  gi: { round: 50.3, strip: 100, tape: 100, busbar: 150 },
}
