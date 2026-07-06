export interface ProgramModule {
  number: string
  title: string
  hours: string
  focus: string
}

export const PROGRAM_MODULES: ProgramModule[] = [
  { number: "01", title: "Tier Classification & Reliability", hours: "16h", focus: "Uptime, TIA-942, SPOF, N/N+1/2N" },
  { number: "02", title: "Electrical Fundamentals", hours: "20h", focus: "AC theory, per-unit, harmonics, earthing basics" },
  { number: "03", title: "Power Distribution Architectures", hours: "24h", focus: "Radial, ring bus, block, distributed redundancy" },
  { number: "04", title: "MV Systems & Substations", hours: "24h", focus: "Transformers, MV switchgear, substation design" },
  { number: "05", title: "UPS Systems & Battery Sizing", hours: "24h", focus: "Static UPS, battery sizing (IEEE 485), STS" },
  { number: "06", title: "Standby Generation & Fuel Systems", hours: "20h", focus: "Generator sizing, paralleling, day tanks, bulk fuel" },
  { number: "07", title: "Protection Engineering", hours: "22h", focus: "Relay setting, coordination, ETAP/DIgSILENT" },
  { number: "08", title: "Short Circuit, Arc Flash & Power Quality", hours: "22h", focus: "IEC 60909, IEEE 1584, IEEE 519 harmonic studies" },
  { number: "09", title: "Earthing, Bonding & LPS", hours: "18h", focus: "IEEE 80, IEC 62305, TN-S/TN-C-S, SPD selection" },
  { number: "10", title: "Load Calculations & Cable Sizing", hours: "20h", focus: "Load lists, cable sizing, voltage drop, derating" },
  { number: "11", title: "LV Switchgear, PDU & Busway Design", hours: "20h", focus: "IEC 61439 Forms, PDU/RPDU, busway systems" },
  { number: "12", title: "Electrical Rooms & Cable Management", hours: "18h", focus: "Room layouts, containment, trays, coordination" },
  { number: "13", title: "Documentation, Vendor Engineering", hours: "18h", focus: "Specs, BOQ, TBE, vendor drawings, procurement" },
  { number: "14", title: "BIM, Testing & Commissioning", hours: "22h", focus: "Revit MEP, Navisworks, FAT/SAT, L1–L5" },
]

export interface ToolCategory {
  title: string
  tools: string[]
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  { title: "Design & Drawing", tools: ["AutoCAD Electrical", "Revit MEP", "Navisworks", "Bluebeam", "BIM 360"] },
  { title: "Analysis & Studies", tools: ["ETAP", "SKM PowerTools", "DIgSILENT PowerFactory", "EasyPower", "CDEGS"] },
  { title: "Lighting", tools: ["Dialux evo", "Relux"] },
  { title: "Programme & Docs", tools: ["Primavera P6", "MS Project", "Excel (advanced)", "SEL AcSELerator"] },
]

export const DELIVERABLES: string[] = [
  "Design Basis Reliability Statement",
  "Single-Line Diagram (concept → detail)",
  "Load Schedule (electrical & mechanical)",
  "IEC 60909 Short-Circuit Study",
  "IEEE 1584 Arc-Flash Study",
  "Protection Coordination Report",
  "UPS & Battery Sizing Calculation",
  "Generator Sizing Report",
  "Cable Sizing Schedule",
  "Voltage Drop Calculation",
  "Earthing Calculation (IEEE 80)",
  "LPS Risk Assessment (IEC 62305)",
  "MV & LV Switchgear GA",
  "Panel Schedules",
  "Lighting Layout & Dialux Report",
  "Cable Tray & Containment Layout",
  "Room GA & Equipment Layout",
  "BOQ / MTO (BIM-linked)",
  "Technical Specifications (equipment)",
  "Technical Bid Evaluation",
  "Vendor Comment Sheets",
  "FAT & SAT Protocols",
  "L1–L5 Commissioning Plan",
  "As-Built Documentation & O&M Manuals",
]

export interface CompensationRow {
  region: string
  mid: string
  senior: string
}

export const COMPENSATION: CompensationRow[] = [
  { region: "India (Metros)", mid: "₹ 12 – 25 LPA", senior: "₹ 28 – 60 LPA" },
  { region: "UAE / KSA / Qatar", mid: "AED 240K – 420K", senior: "AED 480K – 900K" },
  { region: "Singapore / SE Asia", mid: "SGD 90K – 150K", senior: "SGD 180K – 320K" },
  { region: "UK / EU", mid: "£ 55K – 90K", senior: "£ 100K – 160K" },
  { region: "North America", mid: "USD 100K – 165K", senior: "USD 180K – 280K" },
]

export interface CertificationPrep {
  body: string
  credential: string
}

export const CERTIFICATION_PREP: CertificationPrep[] = [
  { body: "Uptime Institute", credential: "Accredited Tier Designer (ATD), ATS" },
  { body: "EPI / CNet", credential: "CDCP, CDCS, CDCE" },
  { body: "IE(I) / equivalent", credential: "Chartered Engineer status" },
  { body: "NCEES", credential: "Professional Engineer (PE), where eligible" },
]

export interface Cohort {
  years: string
  title: string
  description: string
}

export const COHORTS: Cohort[] = [
  {
    years: "0–2 YEARS",
    title: "Fresh Engineers",
    description:
      "Diploma and B.E./B.Tech graduates who want a fast, decisive entry into mission-critical electrical design without waiting years for on-the-job exposure.",
  },
  {
    years: "2–8 YEARS",
    title: "Practising Designers",
    description:
      "Working electrical engineers in MEP, EPC, or industrial consulting who want to pivot into the higher-paying mission-critical segment with a portfolio to prove it.",
  },
  {
    years: "8–20 YEARS",
    title: "Consulting Professionals",
    description:
      "Senior engineers who need a rigorous refresher on current standards, tools, and hyperscale practices — and a credential their clients recognise.",
  },
  {
    years: "ANY",
    title: "Facility Operators",
    description:
      "Data center owners, colocation operators, and facility teams building in-house design and review capability to reduce dependence on external consultants.",
  },
]

export const PREREQUISITES: string[] = [
  "Diploma or degree in Electrical, Electronics, or Instrumentation engineering.",
  "Comfort with basic AC circuit theory, single-line diagrams, and Excel.",
  "A laptop capable of running AutoCAD, Revit MEP, and ETAP (software licences guided during onboarding).",
  "Willingness to produce every deliverable — this is a practice-first program.",
]

export interface InvestmentTier {
  name: string
  subtitle: string
  price: string
  features: string[]
  featured?: boolean
}

export const INVESTMENT_TIERS: InvestmentTier[] = [
  {
    name: "Foundation",
    subtitle: "Self-paced access",
    price: "Enquire",
    features: [
      "Full 14-module content library",
      "On-demand video lectures",
      "40+ downloadable calculators & templates",
      "Capstone project brief",
      "Digital completion certificate",
      "6 months of platform access",
    ],
  },
  {
    name: "Professional",
    subtitle: "Live cohort · flagship tier",
    price: "Enquire",
    featured: true,
    features: [
      "Everything in Foundation",
      "Live cohort with weekly sessions",
      "Assignment review with feedback",
      "Capstone review with industry panel",
      "1-on-1 mentoring (4 sessions)",
      "12 months of platform access",
      "Alumni network membership",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "Corporate & team training",
    price: "Custom",
    features: [
      "Everything in Professional",
      "Cohort of 5–25 trainees",
      "Custom capstone (client project)",
      "On-site or online delivery",
      "White-labelled certificates",
      "24 months of platform access",
      "Dedicated program manager",
    ],
  },
]

export const ENROLL_STEPS = [
  { number: "01", title: "Reach out", description: "Send us your CV or profile via WhatsApp or email. We respond within one business day." },
  { number: "02", title: "Discovery call", description: "A 30-minute call to match you with the right cohort and tier for your goals." },
  { number: "03", title: "Enrol & begin", description: "Complete enrolment, receive onboarding kit, and begin the program in the next cohort." },
]
