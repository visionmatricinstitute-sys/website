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
