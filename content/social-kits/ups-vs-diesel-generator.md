# Content Kit — UPS vs Diesel Generator

Blog post: `/blog/ups-vs-diesel-generator-data-center-backup-power`

Internal reference for whoever produces video/social content — not published on the website.

## Video script (60–90 seconds, talking-head or slides)

**Hook (0:00–0:10)**
"UPS or generator — which one actually keeps a data center running during a power cut? Trick question. It's neither one alone."

**Body (0:10–1:10)**
"When utility power fails, a generator needs about 10 to 15 seconds to start, reach full speed, and stabilize before it can safely take the load. That's not a flaw — it's just physics. So what covers those 10-15 seconds?

That's the UPS's entire job. In a double-conversion UPS, the battery is already sitting on the DC bus, continuously topped up — so when utility fails, there's no switching delay at all on the output side. Zero gap.

Then the generator comes online and takes over — and it can keep running for as long as there's fuel, which is what the UPS battery can't do economically.

So: UPS bridges the first 10-15 seconds. Generator carries everything after that. Neither one replaces the other."

**Close / CTA (1:10–1:25)**
"We go deep on UPS and generator sizing — including how starting a UPS's rectifier load affects generator sizing — in our Electrical Design, Data Center Specialist program."

## LinkedIn post draft

---
"Do you need a UPS or a generator?" is the wrong question. You need both, doing two completely different jobs.

A generator takes ~10–15 seconds to start, reach speed, and stabilize. That's not a design flaw — it's physics.

A UPS exists specifically to cover that gap. In a double-conversion topology, the battery is already live on the DC bus, so there's zero transfer delay when utility fails.

Generator then takes over and can run for as long as fuel lasts — something a battery can't do economically.

UPS = the first 15 seconds.
Generator = everything after.

Full breakdown here: [link to /blog/ups-vs-diesel-generator-data-center-backup-power]

#DataCenterDesign #BackupPower #ElectricalEngineering #VisionMatrixInstitute
---
