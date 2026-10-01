# Content Kit — PUE (Power Usage Effectiveness) Explained

Blog post: `/blog/pue-power-usage-effectiveness-explained`

Internal reference for whoever produces video/social content — not published on the website.

## Video script (60–90 seconds, talking-head or slides)

**Hook (0:00–0:10)**
"Every hyperscaler brags about its PUE number. Ask most people what's actually in that calculation, and almost nobody can tell you."

**Body (0:10–1:10)**
"PUE is Total Facility Energy divided by IT Equipment Energy. IT Equipment Energy is what the servers, storage, and networking actually draw. Total Facility Energy is that plus everything else — cooling, lighting, UPS losses, distribution losses. A PUE of 1.5 means for every 1 kW reaching IT equipment, the facility as a whole pulls 1.5 kW.

Cooling is almost always the biggest chunk of that overhead — often 30 to 40 percent in a poorly optimized facility. That's exactly why hot/cold aisle containment, higher supply-air setpoints, and free cooling all move the PUE number directly.

Here's the part that trips people up: PUE says nothing about whether the IT load itself is doing useful work. A facility full of idle, underutilized servers can still post a great PUE while wasting enormous energy computing nothing. And because cooling load swings with the weather, PUE is reported as a trailing 12-month average — not a single day's reading."

**Close / CTA (1:10–1:25)**
"PUE targets get set at concept design and shape real decisions — UPS topology, chiller sizing, containment strategy, even transformer loading. We cover exactly which levers move that number in our Electrical Design, Data Center Specialist program. Link in bio / description."

## LinkedIn post draft

---
Every data center operator quotes their PUE. Most explanations stop at "lower is better" without saying what's actually being measured — or what it isn't.

The formula: PUE = Total Facility Energy ÷ IT Equipment Energy. A PUE of 1.5 means 1.5 kW drawn facility-wide for every 1 kW that actually reaches IT equipment. The extra 0.5 kW is overhead.

Cooling is almost always the biggest lever — 30–40% of total draw in a poorly optimized facility. Which is exactly why hot/cold aisle containment, higher ASHRAE supply-air setpoints, and free cooling all show up directly in the PUE number.

The part most explanations skip: PUE measures overhead relative to IT load — it says nothing about whether that IT load is doing useful work. A facility full of idle, underutilized servers can post an excellent PUE while wasting enormous energy on computing nothing. That's why 1.0 is a number you will never actually see, and why mature operators track it alongside other metrics, not instead of them.

Full breakdown here: [link to /blog/pue-power-usage-effectiveness-explained]

#DataCenterDesign #ElectricalEngineering #PUE #EnergyEfficiency #VisionMatrixInstitute
---
