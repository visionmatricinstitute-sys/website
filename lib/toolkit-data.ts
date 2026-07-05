import type { LucideIcon } from "lucide-react"
import { FileText, Ruler, LayoutTemplate, BookMarked, Compass, ClipboardList } from "lucide-react"

export type ResourceCategory = "standards" | "templates"

export interface ResourceItem {
  id: string
  category: ResourceCategory
  title: string
  description: string
  tag: string
  status: "available" | "soon"
  href?: string
  icon: LucideIcon
}

export const RESOURCE_CATEGORIES: { key: ResourceCategory; title: string; blurb: string }[] = [
  {
    key: "standards",
    title: "Standards & Formula Sheets",
    blurb: "Quick-reference formula sheets and standard summaries used across our CAD, BIM and technical courses.",
  },
  {
    key: "templates",
    title: "Templates & Drawings",
    blurb: "Starter templates and drawing files to practice with inside AutoCAD, Revit and related tools.",
  },
]

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: "electrical-formula-sheet",
    category: "standards",
    title: "Electrical Formula Cheat Sheet",
    description: "Ohm's Law, power equations, and cable sizing formulas condensed onto a single reference page.",
    tag: "Formula Sheet",
    status: "available",
    href: "/toolkit/electrical-formula-sheet.html",
    icon: FileText,
  },
  {
    id: "cad-drafting-standards",
    category: "standards",
    title: "CAD Drafting Standards Guide",
    description: "Layer naming, line-weight and title-block conventions taught in our Drafting & Design course.",
    tag: "Guide",
    status: "soon",
    icon: Ruler,
  },
  {
    id: "bim-standards-overview",
    category: "standards",
    title: "BIM Standards Overview",
    description: "A plain-language walkthrough of common BIM execution plan requirements for student projects.",
    tag: "Guide",
    status: "soon",
    icon: BookMarked,
  },
  {
    id: "autocad-title-block",
    category: "templates",
    title: "AutoCAD Title Block Template",
    description: "A ready-to-use A1/A3 title block and border, matching the format used in class exercises.",
    tag: "AutoCAD",
    status: "soon",
    icon: LayoutTemplate,
  },
  {
    id: "revit-starter-template",
    category: "templates",
    title: "Revit MEP Starter Template",
    description: "A pre-configured Revit template with common families, ready for BIM coursework.",
    tag: "Revit",
    status: "soon",
    icon: Compass,
  },
  {
    id: "site-survey-checklist",
    category: "templates",
    title: "Site Survey Checklist",
    description: "A printable checklist for capturing site measurements before starting a drafting assignment.",
    tag: "Checklist",
    status: "soon",
    icon: ClipboardList,
  },
]

export interface StandardItem {
  code: string
  title: string
  scope: string
}

export interface StandardCategory {
  key: string
  title: string
  items: StandardItem[]
}

export const STANDARDS: StandardCategory[] = [
  {
    key: "installation",
    title: "General Electrical Installation",
    items: [
      { code: "IEC 60364", title: "Low-Voltage Electrical Installations", scope: "Design, verification and safety of LV wiring installations" },
      { code: "NFPA 70 (NEC)", title: "National Electrical Code", scope: "US wiring and installation code" },
      { code: "IEC 61439", title: "LV Switchgear and Controlgear Assemblies", scope: "Design and testing of panels, SMDBs and switchboards" },
      { code: "IEC 60947", title: "Low-Voltage Switchgear and Controlgear", scope: "Breakers, contactors and switching devices" },
    ],
  },
  {
    key: "protection",
    title: "Protection, Short-Circuit & Safety",
    items: [
      { code: "IEC 60909", title: "Short-Circuit Currents in Three-Phase AC Systems", scope: "Fault level calculation methodology" },
      { code: "IEEE 242", title: "Protection and Coordination of Industrial Power Systems (Buff Book)", scope: "Protective device coordination" },
      { code: "IEEE 1584", title: "Guide for Arc-Flash Hazard Calculations", scope: "Incident energy and PPE category determination" },
      { code: "NFPA 70E", title: "Electrical Safety in the Workplace", scope: "Safe work practices around energized equipment" },
    ],
  },
  {
    key: "equipment",
    title: "Transformers, Generators & UPS",
    items: [
      { code: "IEC 60076", title: "Power Transformers", scope: "Ratings, testing and impedance" },
      { code: "IEEE C57 series", title: "Transformers", scope: "US transformer standards" },
      { code: "ISO 8528", title: "Reciprocating IC Engine Driven Generating Sets", scope: "Diesel generator ratings and performance" },
      { code: "IEC 60034", title: "Rotating Electrical Machines", scope: "Motors and alternators" },
      { code: "IEC 62040", title: "Uninterruptible Power Systems (UPS)", scope: "UPS performance and testing requirements" },
    ],
  },
  {
    key: "cables",
    title: "Cables & Conductors",
    items: [
      { code: "IEC 60228", title: "Conductors of Insulated Cables", scope: "Conductor construction and sizing" },
      { code: "IEC 60502", title: "Power Cables with Extruded Insulation", scope: "PVC/XLPE cable ratings 1kV–30kV" },
    ],
  },
  {
    key: "earthing",
    title: "Earthing & Lightning Protection",
    items: [
      { code: "IEC 60364-5-54", title: "Earthing Arrangements and Protective Conductors", scope: "Grounding system design" },
      { code: "IEEE 80", title: "Guide for Safety in AC Substation Grounding", scope: "Substation earth grid design" },
      { code: "IEC 62305", title: "Protection Against Lightning", scope: "Lightning risk assessment and protection systems" },
    ],
  },
  {
    key: "datacenter",
    title: "Data Center Specific",
    items: [
      { code: "TIA-942", title: "Telecommunications Infrastructure Standard for Data Centers", scope: "Data center tiering and infrastructure design" },
      { code: "ANSI/BICSI 002", title: "Data Center Design and Implementation Best Practices", scope: "Comprehensive data center design guide" },
      { code: "Uptime Institute Tier Standard", title: "Tier Classification (Tier I–IV)", scope: "Data center topology and reliability classification" },
      { code: "EN 50600", title: "Data Centre Facilities and Infrastructures", scope: "European data center facility standard" },
      { code: "NFPA 75 / 76", title: "Fire Protection for IT Equipment / Telecom Facilities", scope: "Fire protection for critical facilities" },
      { code: "ISO/IEC 30134", title: "Data Centre Key Performance Indicators", scope: "PUE and other efficiency metrics" },
      { code: "ASHRAE TC9.9", title: "Thermal Guidelines for Data Processing Environments", scope: "Environmental design guidelines" },
    ],
  },
]

export interface ExternalLink {
  id: string
  title: string
  description: string
  url: string
}

export const EXTERNAL_LINKS: ExternalLink[] = [
  {
    id: "autocad-docs",
    title: "AutoCAD Documentation",
    description: "Official Autodesk help center for AutoCAD commands, workflows and updates.",
    url: "https://help.autodesk.com/view/ACD/ENU/",
  },
  {
    id: "revit-docs",
    title: "Revit Documentation",
    description: "Official Autodesk help center for Revit and BIM workflows.",
    url: "https://help.autodesk.com/view/RVT/ENU/",
  },
  {
    id: "engineering-toolbox",
    title: "The Engineering ToolBox",
    description: "Widely used reference for engineering formulas, unit conversions and design data.",
    url: "https://www.engineeringtoolbox.com/",
  },
  {
    id: "iec-webstore",
    title: "IEC Webstore",
    description: "Browse official International Electrotechnical Commission standards.",
    url: "https://webstore.iec.ch/",
  },
  {
    id: "nfpa-70",
    title: "NFPA 70 (National Electrical Code)",
    description: "Reference portal for the National Electrical Code, maintained by the NFPA.",
    url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70",
  },
  {
    id: "nptel",
    title: "NPTEL Engineering Courses",
    description: "Free video lectures on core engineering subjects from IITs and IISc.",
    url: "https://nptel.ac.in/",
  },
]
