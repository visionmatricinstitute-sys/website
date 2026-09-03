# Content Kit — PDU (Power Distribution Unit) Explained

Blog post: `/blog/pdu-power-distribution-unit-explained`

Internal reference for whoever produces video/social content — not published on the website.

## Video script (60–90 seconds, talking-head or slides)

**Hook (0:00–0:10)**
"Say 'PDU' to two different engineers and they might picture two completely different pieces of equipment. Both are right — and knowing which one someone means actually matters."

**Body (0:10–1:10)**
"A floor-mounted PDU is a full cabinet: an input breaker, often an isolation transformer, and a panelboard of output breakers, sitting between UPS output and a whole row or zone of racks. A rack PDU — RPDU — is what most people picture: an intelligent power strip mounted vertically in a single rack.

Why does a floor-mounted PDU exist at all instead of just cabling the UPS straight to the racks? Three reasons: circuit-level protection, so one branch fault trips one breaker instead of threatening the whole UPS output. Metering, so you can actually see power draw per circuit. And serviceability, so a breaker can be worked on without shutting down anything upstream.

And here's where PDU choice quietly meets redundancy: a dual-corded server is only actually protected if its two power supplies trace back to two genuinely independent UPS systems. Plug both cords into PDUs that share one upstream UPS, and it looks redundant on the rack — it isn't."

**Close / CTA (1:10–1:25)**
"PDU sizing and placement aren't defaults — they come straight out of the real load calculation and the data hall layout. We cover both directly in our Electrical Design, Data Center Specialist program. Link in bio / description."

## LinkedIn post draft

---
"PDU" gets used for two genuinely different pieces of equipment — and the difference isn't trivia, it matters the moment redundancy enters the picture.

Floor-mounted PDU: a full cabinet — input breaker, often an isolation transformer, a panelboard of output breakers — sitting between UPS output and an entire row of racks.

Rack PDU (RPDU): the intelligent power strip inside a single rack most people actually picture.

Why the floor-mounted unit exists at all instead of cabling straight from the UPS:
→ Circuit-level protection — one fault trips one breaker, not the whole feed
→ Metering — real per-circuit visibility for capacity planning
→ Serviceability — work on one breaker without de-energizing anything upstream

The part that actually catches people out: a dual-corded server is only genuinely redundant if its two cords trace back to two independent UPS systems. Plug both into PDUs sharing one upstream UPS, and the single point of failure just moved one level up — it still looks redundant on the rack.

Full breakdown here: [link to /blog/pdu-power-distribution-unit-explained]

#ElectricalEngineering #DataCenterDesign #PowerDistribution #VisionMatrixInstitute
---
