/* ---------------- Shared reference data & helpers (indicative, see disclaimer) ---------------- */

export const RESISTIVITY: Record<"cu" | "al", number> = { cu: 22.5, al: 36 } // ohm.mm^2/km
export const BREAKERS = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630]

export const TRANSFORMER_KVA = [25, 50, 75, 100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150]
export const DG_KVA = [20, 30, 40, 62.5, 82.5, 100, 125, 160, 200, 250, 320, 380, 400, 500, 625, 750, 1000, 1250, 1500, 2000, 2500]

export const MOTOR_START_MULTIPLIER: Record<string, number> = {
  dol: 6,
  "star-delta": 2.5,
  soft: 3.5,
  vfd: 1.2,
}

export const SC_K_FACTOR: Record<"cu" | "al", Record<"pvc" | "xlpe", number>> = {
  cu: { pvc: 115, xlpe: 143 },
  al: { pvc: 76, xlpe: 94 },
}

export function roundUpToStandard(value: number, table: number[]) {
  return table.find((v) => v >= value) ?? null
}

export function fmt(n: number, d = 2) {
  return Number.isFinite(n) ? n.toFixed(d) : "-"
}
