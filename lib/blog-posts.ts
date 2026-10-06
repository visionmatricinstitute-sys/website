export interface BlogPostSummary {
  slug: string
  category: string
  title: string
  description: string
  image: string
}

export const blogPosts: BlogPostSummary[] = [
  {
    slug: "site-engineer-in-data-center-projects",
    category: "Career Guide",
    title: "Site Engineer in Data Center Projects",
    description:
      "What a data center site engineer does day to day: installation supervision, inspection, quality control, coordination and handover support.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "commissioning-engineer-data-center-role-and-skills",
    category: "Career Guide",
    title: "Data Center Commissioning Engineer: Role and Skills",
    description:
      "What a data center commissioning engineer does, the skills the role needs, a typical week on a project, and how to move into it from design or site work.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "fresher-electrical-engineer-first-year-in-data-centers",
    category: "Career Guide",
    title: "Fresher Electrical Engineer: Starting in Data Centers",
    description:
      "A practical guide for new electrical engineering graduates: what to learn first, what roles to look for, and how to build evidence of skill before the first job.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "mep-engineer-to-data-center-engineer-transition-guide",
    category: "Career Guide",
    title: "MEP Engineer to Data Center Engineer: A Transition Guide",
    description:
      "How an MEP engineer from buildings can move into data centers: what carries over, what is new, and a practical plan to fill the gap.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "data-center-certifications-what-is-worth-it",
    category: "Career Guide",
    title: "Data Center Certifications: What Is Worth It",
    description:
      "An overview of the kinds of data center certifications available to engineers, what each type proves, and how to decide which to pursue, without endorsing a single credential.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "data-center-engineer-interview-questions-electrical",
    category: "Career Guide",
    title: "Data Center Electrical Engineer Interview Questions and Answers",
    description:
      "Common technical interview questions for data center electrical roles with concise, correct answers: redundancy, UPS, generators, earthing, protection and calculations.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "data-center-jobs-uae-saudi-arabia-electrical-engineers",
    category: "Career Guide",
    title: "Data Center Jobs in the UAE and Saudi Arabia for Electrical Engineers",
    description:
      "What roles exist on Gulf data center projects, the kinds of employers, what they typically look for, and how to prepare an application, without quoting job counts or pay.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "data-center-engineer-skills-roadmap",
    category: "Career Guide",
    title: "Data Center Engineer Skills Roadmap",
    description:
      "The skills a data center electrical engineer builds, in order: fundamentals, power chain, calculations, drawings, studies, software and communication.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "data-center-electrical-engineer-salary-india",
    category: "Career Guide",
    title: "Data Center Electrical Engineer Salary in India: What Drives It",
    description:
      "What determines a data center electrical engineer's pay in India, the factors that move it, and how to check current ranges honestly rather than trusting a single number.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "autocad-electrical-drawing-for-beginners",
    category: "BIM / Revit",
    title: "AutoCAD Electrical Drawing for Beginners",
    description:
      "The basics of producing electrical drawings in AutoCAD: layers, symbols and blocks, scales and layouts, and good habits for a drawing set.",
    image: "/autocad-training.png",
  },
  {
    slug: "revit-mep-course-syllabus-and-outcomes",
    category: "Courses",
    title: "Revit MEP Course for Data Centers: Syllabus and Outcomes",
    description:
      "What to look for in a Revit electrical course, and the syllabus of the VMI BIM and Revit training: twelve modules from BIM fundamentals to a final data center project.",
    image: "/bim-training.jpg",
  },
  {
    slug: "revit-vs-autocad-for-electrical-design",
    category: "BIM / Revit",
    title: "Revit vs AutoCAD for Electrical Design",
    description:
      "How Revit and AutoCAD differ for electrical design work: model versus drawing, coordination, documentation and effort, and when each is the better fit.",
    image: "/bim-training.jpg",
  },
  {
    slug: "as-built-bim-data-centers",
    category: "BIM / Revit",
    title: "As-Built BIM for Data Centers",
    description:
      "What an as-built BIM model is, why it matters for operations, how to capture changes during construction, and the common gaps.",
    image: "/bim-training.jpg",
  },
  {
    slug: "bim-coordination-meeting-process",
    category: "BIM / Revit",
    title: "BIM Coordination Meeting Process",
    description:
      "How BIM coordination meetings are run: preparation, agenda, clash review, assigning actions and following up, with tips to keep them productive.",
    image: "/bim-training.jpg",
  },
  {
    slug: "lod-bim-level-of-development-explained",
    category: "BIM / Revit",
    title: "LOD in BIM: LOD 100 to 500 Explained",
    description:
      "What Level of Development means in BIM, how LOD 100 to 500 are usually described, how it differs from level of information, and how to use it in a project.",
    image: "/bim-training.jpg",
  },
  {
    slug: "dynamo-for-electrical-engineers-revit",
    category: "BIM / Revit",
    title: "Dynamo for Electrical Engineers",
    description:
      "What Dynamo is, the kinds of repetitive Revit tasks it can automate for electrical work, and a sensible way to start.",
    image: "/bim-training.jpg",
  },
  {
    slug: "navisworks-clash-detection-workflow",
    category: "BIM / Revit",
    title: "Navisworks Clash Detection Workflow",
    description:
      "How clash detection works in Navisworks: federating models, setting clash tests, reviewing and grouping results, assigning fixes and tracking resolution.",
    image: "/bim-training.jpg",
  },
  {
    slug: "revit-electrical-families-creating-and-managing",
    category: "BIM / Revit",
    title: "Revit Electrical Families: Creating and Managing",
    description:
      "What Revit families are, how electrical equipment families are structured, what makes a good one, and how to manage a library.",
    image: "/bim-training.jpg",
  },
  {
    slug: "cable-tray-modeling-in-revit",
    category: "BIM / Revit",
    title: "Cable Tray Modeling in Revit",
    description:
      "How cable trays are modelled in Revit: tray types and fittings, routing and elevations, clearances, and checking fill and weight outside the model.",
    image: "/bim-training.jpg",
  },
  {
    slug: "revit-electrical-basics-for-engineers",
    category: "BIM / Revit",
    title: "Revit Electrical Basics for Engineers",
    description:
      "The basic elements of electrical modelling in Revit: equipment, circuits, panels, schedules, containment and views, and how they fit into a project workflow.",
    image: "/bim-training.jpg",
  },
  {
    slug: "data-center-bim-why-it-matters",
    category: "BIM / Revit",
    title: "Data Center BIM: Why It Matters",
    description:
      "What BIM adds to data center projects: coordination, clash detection, quantities, documentation and handover data, and where electrical engineers fit in.",
    image: "/bim-training.jpg",
  },
  {
    slug: "ai-vs-traditional-data-center-electrical-design",
    category: "AI Data Centers",
    title: "AI vs Traditional Data Center Electrical Design",
    description:
      "How electrical design differs for AI data centers: load size and profile, density, redundancy choices, power quality, and what stays the same.",
    image: "/data-center-single-line-diagram.jpg",
  },
  {
    slug: "800-vdc-data-center-power-explained",
    category: "AI Data Centers",
    title: "800 VDC Data Center Power Explained",
    description:
      "What the proposed move towards 800 V DC power distribution in data centers means, why higher voltage helps, and what is still uncertain.",
    image: "/data-center-ups-vs-generator.jpg",
  },
  {
    slug: "gpu-cluster-infrastructure-for-electrical-engineers",
    category: "AI Data Centers",
    title: "GPU Cluster Infrastructure for Electrical Engineers",
    description:
      "What a GPU cluster is, how it is built from servers, racks and networks, and what each layer means for the electrical and cooling design.",
    image: "/hero-data-center.jpg",
  },
  {
    slug: "high-density-racks-power-distribution-implications",
    category: "AI Data Centers",
    title: "High-Density Racks: Power Distribution Implications",
    description:
      "What changes in power distribution when racks draw far more power: feeder and busway sizing, PDUs, three-phase distribution, cable and heat issues, and redundancy.",
    image: "/data-center-pdu-explained.jpg",
  },
  {
    slug: "ai-data-centers-explained",
    category: "AI Data Centers",
    title: "AI Data Centers Explained",
    description:
      "What makes an AI data center different from a traditional one: GPU clusters, rack density, networking, cooling and power, and what it means for engineers.",
    image: "/hero-data-center.jpg",
  },
  {
    slug: "nfpa-75-and-76-fire-protection-it-spaces",
    category: "Standards",
    title: "NFPA 75 and NFPA 76: Fire Protection for IT and Telecom Spaces",
    description:
      "What NFPA 75 and NFPA 76 cover for the protection of IT equipment and telecommunications facilities, and how fire detection and suppression are usually arranged in a data hall.",
    image: "/data-center-hot-cold-aisle.jpg",
  },
  {
    slug: "ashrae-thermal-guidelines-data-centers-explained",
    category: "Standards",
    title: "ASHRAE Thermal Guidelines for Data Centers Explained",
    description:
      "What the ASHRAE TC 9.9 thermal guidelines define, the equipment classes and the recommended and allowable ranges, and why they matter to cooling design.",
    image: "/data-center-hot-cold-aisle.jpg",
  },
  {
    slug: "is-3043-earthing-code-summary",
    category: "Standards",
    title: "IS 3043 Earthing Code Summary for Engineers",
    description:
      "A plain summary of what the Indian earthing code of practice IS 3043 covers, how it relates to IEC practice, and how to use it in a data center design.",
    image: "/data-center-earthing-bonding.jpg",
  },
  {
    slug: "iec-60364-data-center-electrical-installations",
    category: "Standards",
    title: "IEC 60364 for Data Center Electrical Installations",
    description:
      "What the IEC 60364 series covers for low-voltage installations, how it applies to data center design, and how it relates to national codes such as those used in India.",
    image: "/data-center-mv-lv-distribution.jpg",
  },
  {
    slug: "uptime-institute-tier-certification-what-it-covers",
    category: "Standards",
    title: "Uptime Institute Tier Certification: What It Covers",
    description:
      "What Uptime Institute Tier certification is, the stages it covers, what it does and does not assess, and what it means for design teams.",
    image: "/data-center-tier-classification.jpg",
  },
  {
    slug: "tia-942-explained-rated-1-to-rated-4",
    category: "Standards",
    title: "TIA-942 Explained: Rated-1 to Rated-4",
    description:
      "What the TIA-942 data center standard covers, how its four Rated levels work, how it relates to the Uptime tiers, and how engineers use it.",
    image: "/data-center-tier-classification.jpg",
  },
  {
    slug: "electrical-load-schedule-how-to-build-one",
    category: "Electrical Design",
    title: "Electrical Load Schedule: How to Build One",
    description:
      "What an electrical load schedule contains, how to calculate connected and demand load, how it feeds transformer and generator sizing, and common mistakes.",
    image: "/data-center-single-line-diagram.jpg",
  },
  {
    slug: "data-center-lighting-design-lux-calculation-example",
    category: "Electrical Design",
    title: "Data Center Lighting Design: Lux Level Calculation Example",
    description:
      "How to estimate the number of luminaires for a room with the lumen method, with a worked example using stated assumptions, and the other lighting design checks.",
    image: "/data-center-cable-sizing.jpg",
  },
  {
    slug: "arc-flash-basics-data-center-engineers",
    category: "Electrical Design",
    title: "Arc Flash Basics for Data Center Engineers",
    description:
      "What arc flash is, how incident energy is estimated, how it ties to protection settings, and the main ways to reduce the hazard.",
    image: "/data-center-protection-relay.jpg",
  },
  {
    slug: "harmonics-in-data-centers-sources-and-mitigation",
    category: "Electrical Design",
    title: "Harmonics in Data Centers: Sources and Mitigation",
    description:
      "Where harmonics come from in a data center, what they do to transformers, neutrals and capacitors, and the common ways to limit them.",
    image: "/data-center-ct-pt-relay.jpg",
  },
  {
    slug: "load-flow-study-explained-data-center",
    category: "Electrical Design",
    title: "Load Flow Study Explained for Data Center Electrical Design",
    description:
      "What a load flow (power flow) study calculates, the inputs it needs, the scenarios to run in a data center, and how to read the results.",
    image: "/data-center-single-line-diagram.jpg",
  },
  {
    slug: "protection-coordination-basics-data-center",
    category: "Electrical Design",
    title: "Protection Coordination Basics for Data Center Engineers",
    description:
      "What protection coordination (discrimination) is, how time-current curves are used, why selectivity matters in a data center, and the common mistakes.",
    image: "/data-center-protection-relay.jpg",
  },
  {
    slug: "lightning-protection-data-center-basics",
    category: "Electrical Design",
    title: "Lightning Protection for Data Centers: Basics",
    description:
      "How lightning protection for a data center is designed: risk assessment, external protection, bonding and surge protective devices, with the common mistakes.",
    image: "/data-center-earthing-bonding.jpg",
  },
  {
    slug: "data-center-earthing-design-tn-s-bonding",
    category: "Electrical Design",
    title: "Data Center Earthing Design: Systems, Bonding and Testing",
    description:
      "The main earthing system types, why bonding matters as much as earthing in a data center, how earth electrodes are tested, and the mistakes to avoid.",
    image: "/data-center-earthing-bonding.jpg",
  },
  {
    slug: "lv-switchgear-and-mcc-basics-data-center",
    category: "Electrical Design",
    title: "LV Switchgear and MCC Basics for Data Centers",
    description:
      "What LV switchgear and motor control centres are, how main and distribution boards are arranged, the key ratings and the checks for a data center design.",
    image: "/data-center-mv-lv-distribution.jpg",
  },
  {
    slug: "mv-switchgear-data-center-ratings-and-selection",
    category: "Electrical Design",
    title: "MV Switchgear in Data Centers: Ratings and Selection",
    description:
      "What medium-voltage switchgear does in a data center, the ratings that define it, air-insulated vs gas-insulated construction, and the selection checks that matter.",
    image: "/data-center-mv-lv-distribution.jpg",
  },
  {
    slug: "liquid-cooling-direct-to-chip-vs-immersion",
    category: "AI Data Centers",
    title: "Liquid Cooling Explained: Direct-to-Chip vs Immersion",
    description:
      "Why liquid cooling is used, how direct-to-chip and immersion cooling work, how they differ, and what each means for data center power and mechanical design.",
    image: "/data-center-hot-cold-aisle.jpg",
  },
  {
    slug: "fat-sat-ist-testing-data-center-explained",
    category: "Construction",
    title: "FAT, SAT and IST in Data Center Projects Explained",
    description:
      "What factory acceptance testing (FAT), site acceptance testing (SAT) and integrated systems testing (IST) each prove, in what order they happen, and who signs them off.",
    image: "/data-center-protection-relay.jpg",
  },
  {
    slug: "data-center-commissioning-levels-explained",
    category: "Construction",
    title: "Data Center Commissioning Levels (L1 to L5) Explained",
    description:
      "The commonly used five levels of data center commissioning, from factory testing to integrated systems testing, what each proves, who is involved, and why the last level matters most.",
    image: "/data-center-protection-relay.jpg",
  },
  {
    slug: "wue-water-usage-effectiveness-explained",
    category: "Sustainability",
    title: "WUE (Water Usage Effectiveness) Explained with a Calculation",
    description:
      "What WUE measures, the formula in litres per kilowatt-hour, a worked calculation with stated assumptions, and how it relates to PUE and cooling design.",
    image: "/data-center-pue-explained.jpg",
  },
  {
    slug: "chilled-water-vs-air-cooled-data-center-cooling",
    category: "Cooling",
    title: "Chilled Water vs Air-Cooled Cooling for Data Centers",
    description:
      "How water-cooled (chilled water with cooling towers) and air-cooled chiller systems compare for data centers: efficiency, water use, climate, maintenance and electrical load.",
    image: "/data-center-hot-cold-aisle.jpg",
  },
  {
    slug: "crah-vs-crac-data-center-cooling-units",
    category: "Cooling",
    title: "CRAH vs CRAC: Data Center Cooling Units Compared",
    description:
      "What CRAH and CRAC units are, how they differ in how they remove heat, where each fits, and the electrical and operational trade-offs.",
    image: "/data-center-hot-cold-aisle.jpg",
  },
  {
    slug: "data-center-cooling-systems-explained",
    category: "Cooling",
    title: "Data Center Cooling Systems Explained",
    description:
      "How data center cooling works: heat removal paths, air-cooled and water-cooled approaches, CRAH and CRAC units, chillers, containment and liquid cooling, and how cooling choices tie back to electrical load.",
    image: "/data-center-hot-cold-aisle.jpg",
  },
  {
    slug: "hyperscale-vs-colocation-data-centers",
    category: "Technical Basics",
    title: "Hyperscale vs Colocation Data Centers",
    description:
      "How hyperscale and colocation data centers differ in ownership, customers, design approach and procurement, and what each means for electrical engineers.",
    image: "/hero-data-center.jpg",
  },
  {
    slug: "types-of-data-centers-enterprise-colocation-hyperscale-edge",
    category: "Technical Basics",
    title: "Types of Data Centers: Enterprise, Colocation, Hyperscale and Edge",
    description:
      "The main types of data centers, who owns and uses each, how their design priorities differ, and what that means for the electrical and mechanical engineer.",
    image: "/hero-data-center.jpg",
  },
  {
    slug: "busduct-vs-cable-data-center-power-distribution",
    category: "Electrical Design",
    title: "Busduct vs Cable for Data Center Power Distribution",
    description:
      "How busduct (busway) and cables compare for data center distribution: capacity, flexibility, installation, fault performance and cost drivers, and when each is usually chosen.",
    image: "/data-center-mv-lv-distribution.jpg",
  },
  {
    slug: "cable-tray-sizing-fill-calculation-example",
    category: "Electrical Design",
    title: "Cable Tray Sizing: Fill Calculation Example",
    description:
      "How to estimate the cable tray width for a bundle of power cables from cable diameters, fill ratio and usable depth, with a worked example and the other checks (weight, spacing, derating) that also govern tray selection.",
    image: "/data-center-cable-sizing.jpg",
  },
  {
    slug: "ups-battery-sizing-autonomy-time-worked-example",
    category: "Electrical Design",
    title: "UPS Battery Sizing and Autonomy Time: A First-Pass Worked Example",
    description:
      "How to estimate the battery energy a UPS needs for a given autonomy time: load per module, inverter efficiency, aging and design factors, with a worked example and why final sizing uses the manufacturer's discharge tables.",
    image: "/data-center-ups-topologies.jpg",
  },
  {
    slug: "what-is-a-data-center-components-and-how-it-works",
    category: "Technical Basics",
    title: "What Is a Data Center? Components and How It Works",
    description:
      "A plain explanation of what a data center is, the main systems inside one (IT, power, cooling, fire and security), how they work together, and the common types.",
    image: "/hero-data-center.jpg",
  },
  {
    slug: "sts-vs-ats-data-center-transfer-switches",
    category: "Electrical Design",
    title: "STS vs ATS: Transfer Switches in a Data Center",
    description:
      "What a static transfer switch (STS) and an automatic transfer switch (ATS) each do, how they differ in speed and role, where each sits in a data center power chain, and how to choose between them.",
    image: "/data-center-redundancy-explained.jpg",
  },
  {
    slug: "short-circuit-calculation-basics-lv-systems",
    category: "Electrical Design",
    title: "Short Circuit Calculation Basics for LV Systems",
    description:
      "How to estimate the prospective short-circuit current at an LV switchboard from transformer rating and impedance, with a worked example, why motors and cables change the answer, and what the result is used for.",
    image: "/data-center-ct-pt-relay.jpg",
  },
  {
    slug: "power-factor-correction-capacitor-bank-sizing",
    category: "Electrical Design",
    title: "Power Factor Correction: Sizing the Capacitor Bank",
    description:
      "How to size a power factor correction capacitor bank in kvar, with a worked example, what changes in a data center with UPS and drives, and the harmonic resonance risk to check before installing.",
    image: "/data-center-mv-lv-distribution.jpg",
  },
  {
    slug: "data-center-load-calculation-it-load-to-utility-demand",
    category: "Electrical Design",
    title: "Data Center Load Calculation: From IT Load to Utility Demand",
    description:
      "How to move from IT load to total facility load and utility demand: PUE-based estimate, load categories, demand and diversity, and transformer sizing, with a worked example and stated assumptions.",
    image: "/data-center-mv-lv-distribution.jpg",
  },
  {
    slug: "generator-sizing-data-center-worked-example",
    category: "Electrical Design",
    title: "Generator Sizing for a Data Center: A Worked Example",
    description:
      "Step-by-step diesel generator sizing for a data center: UPS input load, cooling and auxiliary load, margin, kVA rating, and N+1 set count, with every assumption stated and the failure case checked.",
    image: "/data-center-ups-topologies.jpg",
  },
  {
    slug: "ups-sizing-data-center-worked-example",
    category: "Electrical Design",
    title: "UPS Sizing for a Data Center: A Worked Example",
    description:
      "Step-by-step UPS sizing for a 1,200 kW critical load: losses, battery charging, growth margin, power factor, and how N, N+1 and 2N module choices change normal and post-failure loading. All assumptions are stated.",
    image: "/data-center-ups-topologies.jpg",
  },
  {
    slug: "voltage-drop-calculation-formula-examples",
    category: "Electrical Design",
    title: "Voltage Drop Calculation: Formula and Worked Examples",
    description:
      "The voltage drop formula for single-phase and three-phase LV cables, a worked example with every assumption stated, how to fix a cable that fails the limit, and a free calculator.",
    image: "/data-center-cable-sizing.jpg",
  },
  {
    slug: "single-line-diagrams-explained",
    category: "Technical Basics",
    title: "Single-Line Diagrams Explained (SLD)",
    description:
      "A single-line diagram is the one drawing every electrical engineer, contractor, and inspector on a data center project actually works from — and it deliberately leaves almost everything out. Here's what it keeps, what the symbols mean, and how to actually read one.",
    image: "/data-center-single-line-diagram.jpg",
  },
  {
    slug: "pdu-power-distribution-unit-explained",
    category: "Technical Basics",
    title: "PDU (Power Distribution Unit) Explained",
    description:
      "Somewhere between the UPS output and a server's power cord, one piece of equipment does the actual job of splitting bulk power into the dozens of individually protected circuits a data hall needs. Here's what a PDU really does — and the two very different things people mean by that name.",
    image: "/data-center-pdu-explained.jpg",
  },
  {
    slug: "ups-topologies-explained",
    category: "Technical Basics",
    title: "UPS Topologies Explained: Standby, Line-Interactive, Double-Conversion",
    description:
      "Not every UPS protects a server the same way, and the difference isn't marketing — it's how many milliseconds of interruption actually reach the load. Here's the three real UPS topologies, and the separate question of how many UPS units a design actually needs.",
    image: "/data-center-ups-topologies.jpg",
  },
  {
    slug: "redundancy-n-n1-2n-explained",
    category: "Technical Basics",
    title: "Data Center Redundancy Explained: N, N+1, 2N, 2(N+1)",
    description:
      "N+1 and 2N both get called \"redundant\" — they are not remotely the same thing, and mixing them up in a design review or an interview is a fast way to lose credibility. Here's what each notation actually means.",
    image: "/data-center-redundancy-explained.jpg",
  },
  {
    slug: "pue-power-usage-effectiveness-explained",
    category: "Technical Basics",
    title: "PUE (Power Usage Effectiveness) Explained",
    description:
      "PUE is the single number every data center operator quotes — and the single number most people can recite without being able to say what it actually penalizes. Here's the real formula, what drives it, and why 1.0 is a number you'll never see.",
    image: "/data-center-pue-explained.jpg",
  },
  {
    slug: "hot-aisle-cold-aisle-containment-explained",
    category: "Technical Basics",
    title: "Hot Aisle / Cold Aisle Containment Explained",
    description:
      "Every data center layout diagram shows alternating hot and cold aisles, but the reason isn't decoration — it's the cheapest, most effective way to stop a facility from cooling its own exhaust air. Here's how it actually works.",
    image: "/data-center-hot-cold-aisle.jpg",
  },
  {
    slug: "data-center-tier-classification-explained",
    category: "Technical Basics",
    title: "Data Center Tier Classification Explained (Tier I–IV)",
    description:
      "Tier I–IV isn't a marketing label — it's a specific engineering answer to one question: what happens when a component fails? Here's what actually separates each tier, the real numbers behind them, and the two systems people mix up.",
    image: "/data-center-tier-classification.jpg",
  },
  {
    slug: "how-to-become-a-data-center-electrical-design-engineer-in-india",
    category: "Career Guide",
    title: "How to Become a Data Center Electrical Design Engineer in India (2026 Guide)",
    description:
      "A complete guide to the data center electrical design career path in India: what the role involves, the tools and standards you need, real salary ranges, certifications, and how to get started.",
    image: "/data-center-electrical-engineer-career.jpg",
  },
  {
    slug: "cable-sizing-basics-for-data-center-electrical-design",
    category: "Technical Basics",
    title: "Cable Sizing Basics for Data Center Electrical Design",
    description:
      "The four factors that actually decide a cable size in data center electrical design — current rating, voltage drop, derating, and short-circuit withstand — explained simply.",
    image: "/data-center-cable-sizing.jpg",
  },
  {
    slug: "ups-vs-diesel-generator-data-center-backup-power",
    category: "Technical Basics",
    title: "UPS vs Diesel Generator: Which One Handles a Power Outage?",
    description:
      "They're not competing solutions — a UPS and a diesel generator solve two different problems in a data center power outage. Here's what each one actually does, and why you almost always need both.",
    image: "/data-center-ups-vs-generator.jpg",
  },
  {
    slug: "mv-lv-power-distribution-architecture-explained",
    category: "Technical Basics",
    title: "MV/LV Power Distribution Architecture, Explained",
    description:
      "Why data center power comes in at medium voltage and gets stepped down in stages, and how radial, ring, and 2N distribution architectures trade off cost against resilience.",
    image: "/data-center-mv-lv-distribution.jpg",
  },
  {
    slug: "earthing-and-bonding-basics-for-data-centers",
    category: "Technical Basics",
    title: "Earthing & Bonding Basics for Data Centers",
    description:
      "Earthing and bonding are two different jobs that get lumped together — one is about safety, the other is about keeping sensitive equipment from seeing electrical noise. Here's the difference and why data centers care more than most buildings.",
    image: "/data-center-earthing-bonding.jpg",
  },
  {
    slug: "current-transformer-explained",
    category: "Electrical Equipment",
    title: "Current Transformers (CT) Explained",
    description:
      "A protection relay can't sense 2000A of fault current directly, and it shouldn't. A current transformer scales that down to a safe, standardized signal — and one wiring mistake with it can be genuinely dangerous. Here's how CTs actually work.",
    image: "/data-center-ct-pt-relay.jpg",
  },
  {
    slug: "potential-transformer-explained",
    category: "Electrical Equipment",
    title: "Potential Transformers (PT/VT) Explained",
    description:
      "A meter or relay can't safely see 11kV directly. A potential transformer scales bus voltage down to a small, standardized signal — and its one safety rule is the exact opposite of a current transformer's. Here's how PTs actually work.",
    image: "/data-center-potential-transformer.jpg",
  },
  {
    slug: "protection-relay-explained",
    category: "Electrical Equipment",
    title: "Protection Relays Explained",
    description:
      "CTs and PTs are the sensors. The protection relay is the decision-maker — the device that looks at their scaled-down signals, decides whether a fault has actually happened, and trips the breaker. Here's how a relay actually works.",
    image: "/data-center-protection-relay.jpg",
  },
]

export interface AdjacentPost {
  slug: string
  title: string
}

export function getAdjacentPosts(slug: string): { prev: AdjacentPost | null; next: AdjacentPost | null } {
  const index = blogPosts.findIndex((post) => post.slug === slug)
  if (index === -1) return { prev: null, next: null }
  const prev = index > 0 ? blogPosts[index - 1] : null
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : null
  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  }
}
