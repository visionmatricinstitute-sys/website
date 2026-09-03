# Content Kit — UPS Topologies Explained: Standby, Line-Interactive, Double-Conversion

Blog post: `/blog/ups-topologies-explained`

Internal reference for whoever produces video/social content — not published on the website.

## Video script (60–90 seconds, talking-head or slides)

**Hook (0:00–0:10)**
"Not every UPS protects a server the same way — and the difference isn't a spec-sheet marketing term. It's how many milliseconds of interruption actually reach your load."

**Body (0:10–1:10)**
"There are three real UPS topologies. Standby: the load runs on raw utility power almost all the time, and the UPS only switches over once it detects an outage — a real, measurable transfer time. Line-interactive: adds an autotransformer that corrects minor voltage swings without touching the battery, but still has a transfer time on anything it can't correct. Double-conversion, or online: continuously rectifies incoming AC to DC and back to AC, so the load always runs off the UPS's own inverter. Zero transfer time when utility power fails — that's the standard for real data center IT load.

But 'UPS topology' actually bundles a second, separate question: how multiple UPS modules are arranged for redundancy. Single module, no redundancy. N+1, where modules share a common output bus and any one can fail without an interruption. Isolated redundant, where a backup module stays separate from the primary system. Distributed redundant — a catcher system — where independent UPS systems each carry their own load but can pick up an adjacent one's load if it fails."

**Close / CTA (1:10–1:25)**
"Both of these — conversion technology and module arrangement — get drawn explicitly on the single-line diagram. Reading a real SLD means reading both. We cover this directly in our Electrical Design, Data Center Specialist program. Link in bio / description."

## LinkedIn post draft

---
"UPS topology" gets used for one thing on a spec sheet — but it's actually two separate engineering questions, and mixing them up costs you in an interview.

**Question 1 — how one UPS unit converts power:**
→ Standby: runs on raw utility, switches to battery only on outage detection (real transfer time)
→ Line-interactive: corrects minor voltage swings without switching, still has transfer time on the rest
→ Double-conversion (online): continuously rectifies AC→DC→AC, load always runs off the inverter — zero transfer time. This is the data center standard, for exactly that reason.

**Question 2 — how multiple UPS modules are arranged for redundancy:**
→ N — single module, no redundancy
→ N+1 (parallel redundant) — shared output bus, any one module can fail without interruption
→ Isolated redundant — a dedicated backup stays separate from the primary system
→ Distributed redundant ("catcher") — independent systems each carry their own load, able to pick up a failed neighbor's load via static transfer switches

Both of these get drawn explicitly on the single-line diagram — reading a real SLD means reading both questions, not just one.

Full breakdown here: [link to /blog/ups-topologies-explained]

#ElectricalEngineering #DataCenterDesign #UPS #PowerSystems #VisionMatrixInstitute
---
