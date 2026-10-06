export interface BlogPostSummary {
  slug: string
  category: string
  title: string
  description: string
  image: string
}

export const blogPosts: BlogPostSummary[] = [
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
