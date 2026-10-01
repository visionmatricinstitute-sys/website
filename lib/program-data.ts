export interface ProgramModule {
  number: string
  title: string
  hours: string
  focus: string
}

// The 12 modules of the course, as held in the course record (public.course_modules), read 2026-09-26.
// Keep in step with that table.
export const PROGRAM_MODULES: ProgramModule[] = [
  { number: "01", title: "Introduction to Data Centers", hours: "8h", focus: "Data center types, market overview, PUE/WUE/CUE, career path" },
  { number: "02", title: "Electrical Engineering Fundamentals", hours: "16h", focus: "Ohm's/Kirchhoff's Laws, 3-phase power, load schedules, voltage drop" },
  { number: "03", title: "Electrical Equipment – Part 1", hours: "20h", focus: "MV switchgear, transformers, diesel generators, synchronization" },
  { number: "04", title: "Data Center Design Standards", hours: "12h", focus: "Uptime Tiers, TIA-942-C, IEC/IS standards, ASHRAE classes" },
  { number: "05", title: "The Electrical Design Process", hours: "14h", focus: "Design lifecycle, Basis of Design, BOQ, vendor evaluation" },
  { number: "06", title: "Load Calculations", hours: "20h", focus: "UPS/transformer/DG sizing, cable sizing, fault levels, PFC" },
  { number: "07", title: "Single-Line Diagrams", hours: "16h", focus: "SLD symbols, redundancy topologies (N+1/2N), UPS topologies" },
  { number: "08", title: "Electrical Layout Design", hours: "18h", focus: "Substation/UPS/DG room layouts, data hall design, grounding grids" },
  { number: "09", title: "BIM and Software", hours: "20h", focus: "Revit MEP, Navisworks, ETAP, DIALux, Bluebeam" },
  { number: "10", title: "Vendor Engineering", hours: "14h", focus: "Vendor landscape, technical bid evaluation, FAT/SAT" },
  { number: "11", title: "Site Engineering", hours: "18h", focus: "Installation supervision, testing, commissioning, punch list" },
  { number: "12", title: "Real Data Center Project – Capstone", hours: "30h", focus: "20 MW Tier III colocation project, end to end" },
]

// Total hours across the modules above ("8h", "16h", ...). 206 for the current 12 modules.
export const PROGRAM_TOTAL_HOURS = PROGRAM_MODULES.reduce((sum, m) => sum + (parseInt(m.hours, 10) || 0), 0)

// Displayed course fee. There is one course and one fee (no tiers). Keep in step with
// courses.price_amount in the database (which is what checkout charges). Fees may be revised.
export const COURSE_FEE = "₹40,000"

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

export const WHO_SHOULD_JOIN: string[] = [
  "Fresh graduates in Electrical or Electronics Engineering seeking a career-launching credential.",
  "Diploma engineers moving from operator or supervisor roles into design engineering.",
  "Working professionals transitioning from conventional MEP into data-center specialisation.",
  "MEP engineers expanding into a higher-value, faster-growing sub-domain.",
  "Electrical design engineers developing expertise in mission-critical facilities.",
  "BIM engineers adding electrical-specific competence to their software skills.",
  "Consultants seeking a competitive credential to differentiate in DC-focused RFPs.",
  "EPC professionals adding design-office fluency to site execution experience.",
  "Career-changers seeking a decisive entry point into India's fast-growing data center industry.",
]

export const TARGET_ROLES: string[] = [
  "Electrical Design Engineer",
  "BIM Engineer — Electrical",
  "Electrical BIM Coordinator",
  "Data Center Electrical Consultant",
  "Project Engineer at DC Operators",
  "Commissioning Engineer",
  "Data Center Facility Engineer",
  "Design Manager / Lead",
]

export interface IndustryGroup {
  category: string
  companies: string[]
}

export const INDUSTRIES_HIRING: IndustryGroup[] = [
  { category: "Design Consultancies", companies: ["AECOM", "Arup", "WSP"] },
  { category: "EPC Contractors", companies: ["Sterling & Wilson", "L&T", "Shapoorji"] },
  { category: "Colocation Operators", companies: ["Yotta", "STT GDC", "AdaniConneX", "CtrlS", "Sify", "Nxtra"] },
  { category: "Hyperscalers", companies: ["Microsoft", "Google", "Meta", "AWS", "Oracle"] },
  { category: "Equipment Vendors", companies: ["Vertiv", "Schneider", "Cummins", "ABB"] },
]

export interface CareerStage {
  years: string
  title: string
}

export const CAREER_GROWTH_PATH: CareerStage[] = [
  { years: "0–2 yrs", title: "Design Engineer" },
  { years: "2–5 yrs", title: "Senior Engineer" },
  { years: "5–10 yrs", title: "Lead Engineer" },
  { years: "10–15 yrs", title: "Principal / Manager" },
  { years: "15+ yrs", title: "Practice Head" },
]

export const LEARNING_OUTCOMES: string[] = [
  "Interpret client briefs and convert them into signed Design Basis documents.",
  "Perform site studies including utility interface, soil resistivity, and statutory analysis.",
  "Build load estimates from rack level to facility level with correct diversity allowances.",
  "Size transformers, DG sets, UPS systems, and battery banks for any DC scale.",
  "Calculate cable sizes, breaker ratings, and fault levels using ETAP and hand verification.",
  "Draft single-line diagrams in every redundancy topology with correct IEC 60617 symbols.",
  "Design physical layouts with clearances, ventilation, and fire compartmentation.",
  "Compile complete tender packages — drawings, calculations, BOQ, and specifications.",
  "Prepare weighted Technical Bid Evaluations and witness Factory Acceptance Tests.",
  "Supervise site installation, commissioning, and integrated systems testing.",
  "Present portfolio-quality capstone projects at interviews with confidence.",
  "Answer data center electrical technical interview questions — from load flow to arc flash.",
  "Use AI copilots productively across the entire design workflow.",
  "Operate confidently in vendor negotiations, FAT floors, and client reviews.",
]

export const ENROLL_STEPS = [
  { number: "01", title: "Reach out", description: "Send us your CV or profile via WhatsApp or email. We respond within one business day." },
  { number: "02", title: "Discovery call", description: "A 30-minute call to check the course is the right fit for your goals." },
  { number: "03", title: "Enrol & begin", description: "Complete enrolment, receive onboarding kit, and begin the program in the next cohort." },
]
