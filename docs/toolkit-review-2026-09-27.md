# Engineer's Toolkit review — 2026-09-27

Requested by the Founder: the LV Conductor Sizing calculator showed a red FAIL banner as soon as the page loaded, with no input changed, and asked for a research pass over every calculator. This document records what was checked, what was changed, why, and what was left alone. No Node is available on the machine that did this review, so nothing was run in a browser or type-checked — every number below was worked by hand from the source and cross-checked against a second calculation. The Vercel preview build is the actual check; please look at the four Conductor Sizing tabs there before merging.

## The reported bug

**Cause:** `LvConductorSizing`'s default inputs (100 kW connected load) size a cable by ampacity alone (25 mm², via `CABLE_AMPACITY`), but the default fault-level/duration pair (20 kA / 0.5 s) requires 98.9 mm² for adiabatic short-circuit withstand (`S = I√t / k`, `k = 143` for Cu/XLPE per IEC 60364-5-54). 25 mm² is far short of 98.9 mm², so the short-circuit check — a real, separate check from ampacity sizing — correctly reports FAIL. This is not a calculation bug: an ampacity-sized cable genuinely can be too small for a given fault level, and that is the point of the check. The bug is that the tool's own **example** demonstrated a failing design on first load, which reads as broken.

**The same problem exists in HT Conductor Sizing.** Its defaults (2,000 kW, 11 kV) size a 35 mm² cable by ampacity, but the default fault rating (25 kA / 1 s — a genuinely common Indian 11 kV switchgear withstand rating, not an unrealistic assumption) requires 174.8 mm². Busduct Sizing and Earthing Conductor Sizing already pass with their existing defaults (worked below), so only these two needed a fix.

**Fix:** change only the example **load**, in each case landing on a cable size that also clears the short-circuit check — not just so it "shows green", but because both new examples are physically real, sensible designs (a 200 kW LV distribution circuit; a 5.6 MW 11 kV feeder). The fault-level/duration fields, all correction factors, and every formula are unchanged, and both fields stay fully editable so a real project's own fault level and clearing time can be entered.

### LV Conductor Sizing — worked numbers (before / after)

| | Before (100 kW) | After (250 kW) |
|---|---|---|
| Demand load (× 0.8 diversity) | 80 kW | 200 kW |
| Design current | 123.66 A | 309.11 A |
| Cable selected (ampacity) | 25 mm² (127 A) | 120 mm² (346 A) |
| Utilization | 97.4% | 89.3% |
| Voltage drop | 2.18% (limit 5%) | 1.31% (limit 5%) |
| Breaker | 125 A (In > Iz — non-compliant) | 315 A (In ≤ Iz — compliant) |
| Short-circuit min. section (20 kA, 0.5 s, k=143) | 98.9 mm² | 98.9 mm² (unchanged — same fault inputs) |
| Result | **FAIL** (25 < 98.9; breaker also non-compliant) | **PASS**, no warnings |

A general trap worth knowing in this calculator, unrelated to the reported bug: a design current that lands just above a standard breaker size can force selection of the *next* breaker up, which can then exceed the cable's Iz (breaking the required `Ib ≤ In ≤ Iz` chain) even though ampacity sizing alone looked fine. This did not affect the 100 kW default, but the new 250 kW example was still deliberately chosen inside a safe band — 309 A, which sits comfortably below the 315 A breaker step, so the recommended 315 A breaker stays within the cable's 346 A capacity.

### HT Conductor Sizing — worked numbers (before / after)

| | Before (2,000 kW) | After (5,600 kW) |
|---|---|---|
| Full load current | 120.25 A | 336.69 A |
| Cable selected (ampacity) | 35 mm² (123.5 A) | 240 mm² (365.75 A) |
| Utilization | 97.4% | 92.1% (one "limited headroom" warning — real, not a defect) |
| Voltage drop | 0.23% (limit 3%) | 0.13% (limit 3%) |
| Short-circuit min. section (25 kA, 1 s, k=143) | 174.8 mm² | 174.8 mm² (unchanged — same fault inputs) |
| Result | **FAIL** (35 < 174.8) | **PASS**, one non-blocking headroom warning |

### Busduct Sizing and Earthing Conductor Sizing — checked, already pass

Worked by hand against their existing (unchanged) defaults:

- **Busduct** (1,000 kW, 415 V, 50 kA/1 s): design current 1,546 A → 2,000 A busduct selected → utilization 79.7%, voltage drop 2.11% (limit 3%), short-circuit requirement 221 mm² against an equivalent 1,250 mm² busbar area → **PASS**.
- **Earthing** (25 kA, 1 s, bare copper strip): thermal requirement 110.6 mm² → 25×6 mm strip (150 mm²) selected → **PASS**. (The K-factor calibration function was also spot-checked: for the copper/bare reference point it reproduces the published K = 226 exactly.)

No changes were made to either file.

### UPS Selection Calculator — checked, passes but with a close margin (left as-is)

Default (500 kW, N=2, N+1, standard library): required 728.4 kVA → 400 kVA × 3 modules selected. Normal-operation loading is 60.7% (fine), but loading after a single module failure is 91.05% — over the calculator's own 90% "critical" warning threshold, while the overall verdict is still correctly PASS (91.05% ≤ 100% is compliant with the N+1 definition). This is a real, known property of small-N N+1 systems (losing 1 of 3 modules removes a third of capacity), not a bug, and it is a useful thing for a student to see. Left unchanged.

## Other calculators — spot-checked against known results, no defects found

These have no PASS/FAIL banner, so a bad default cannot show a false FAIL, but each was checked for arithmetic/formula correctness against a hand calculation or a commonly cited benchmark:

- **Short-Circuit Calculator**: default 1,000 kVA / 6% Z / 415 V transformer gives 23.19 kA at the terminals — matches the commonly cited textbook value for exactly this transformer size and impedance.
- **Power Factor Correction**: default 0.8 → 0.95 gives a multiplier of 0.4212, matching published PF-correction multiplier tables for the same before/after pair exactly.
- **Lighting (lumen method)**: standard formula, default 6×4 m room at 400 lux needs 7 luminaires at 3,300 lm each — correct application of the method.
- **Grounding (rod electrode)**: standard Dwight formula, default 3 m rod / 100 Ω·m soil gives 35.13 Ω — in the expected range for this textbook example.
- **Transformer, Generator, Breaker sizing**: formulas and standard-rating rounding logic checked, no issues found.
- **Quick Formulas — fixed**: the "Resistance (Ohm's Law)" tile computed V ÷ I and labelled it resistance. V ÷ I is the **impedance magnitude** |Z|; it only equals the true resistance at unity power factor (at the default PF of 0.9 the old label was off by about 10%). Now shows both **Impedance (V ÷ I)** and **Resistance (|Z| × PF)** as separate tiles, with a short explanatory note. This is the kind of thing a student would otherwise learn wrong from the tool.

## Not verified in this pass (flagged, not fabricated)

Consistent with this repo's rule against presenting something as checked when it hasn't been: the following were **not** independently verified against a manufacturer catalogue or the full published standard, and the existing disclaimers on each tab already say so:

- The base ampacity tables (`CABLE_AMPACITY`, `HT_BASE_AMPACITY_XLPE`) and every derating-factor table are representative reference figures, not reproduced from a specific manufacturer's cable data sheet.
- The K-factor calibration in `computeKFactor` was checked at one reference point (copper/bare); the other five material/insulation combinations were not individually re-derived.
- The indicative reactance-per-km constants for LV, HT and busduct are single representative values, not size- or geometry-specific.

These are the same limitations the toolkit's own disclaimers already state; this review did not remove or soften any of them.
