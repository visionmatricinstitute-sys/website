// The real BIM/Revit Electrical Modeling curriculum, as given by the Founder (2026-10-01).
// Lessons have no video yet — `videoUrl` stays undefined until production records one and
// it gets pasted in here. Never fabricate a link or a "coming soon" date beyond that.

export interface CurriculumLesson {
  number: string
  title: string
  videoUrl?: string
}

export interface CurriculumModule {
  number: string
  title: string
  hours: string
  lessons: CurriculumLesson[]
}

export interface CurriculumStage {
  stage: string
  title: string
  subtitle: string
  hours: string
  modules: CurriculumModule[]
}

export const BIM_CURRICULUM: CurriculumStage[] = [
  {
    stage: "Stage 1",
    title: "Foundation",
    subtitle: "Modules 1–3 · BIM, data centers and Revit fundamentals",
    hours: "11h",
    modules: [
      {
        number: "M01",
        title: "BIM & Data Center Fundamentals",
        hours: "3h",
        lessons: [
          { number: "1.1", title: "What BIM is, and how it differs from CAD" },
          { number: "1.2", title: "BIM dimensions — 3D to 7D, and where electrical modelling sits" },
          { number: "1.3", title: "Data center electrical architecture — utility to rack, in one picture" },
          { number: "1.4", title: "BIM roles and responsibilities on a project team" },
          { number: "1.5", title: "LOD and LOI — what a model must contain at each stage" },
          { number: "1.6", title: "The project workflow a modeller works inside" },
        ],
      },
      {
        number: "M02",
        title: "Revit Fundamentals",
        hours: "4h",
        lessons: [
          { number: "2.1", title: "The Revit interface, ribbon and project browser" },
          { number: "2.2", title: "Navigation, selection and basic editing tools" },
          { number: "2.3", title: "Levels and grids" },
          { number: "2.4", title: "Views, view properties and view range" },
          { number: "2.5", title: "Visibility, graphic overrides and object styles" },
          { number: "2.6", title: "Basic modelling tools and element behaviour" },
        ],
      },
      {
        number: "M03",
        title: "Revit Project Setup",
        hours: "4h",
        lessons: [
          { number: "3.1", title: "Project templates and project units" },
          { number: "3.2", title: "Linking Revit models and managing links" },
          { number: "3.3", title: "CAD links and imports — when and how" },
          { number: "3.4", title: "Project Base Point, Survey Point and shared coordinates" },
          { number: "3.5", title: "Worksets and worksharing — central and local models" },
          { number: "3.6", title: "Naming conventions, browser organisation and model housekeeping" },
        ],
      },
    ],
  },
  {
    stage: "Stage 2",
    title: "Electrical Revit",
    subtitle: "Modules 4–6 · Electrical systems, families and data center equipment",
    hours: "13h",
    modules: [
      {
        number: "M04",
        title: "Electrical Revit Basics",
        hours: "4h",
        lessons: [
          { number: "4.1", title: "Electrical settings — voltages, distribution systems and wiring" },
          { number: "4.2", title: "Placing electrical equipment and panels" },
          { number: "4.3", title: "Electrical connectors and how Revit builds a circuit" },
          { number: "4.4", title: "Creating circuits, panel assignment and the distribution hierarchy" },
          { number: "4.5", title: "Load classifications, demand factors and panel schedules" },
          { number: "4.6", title: "What Revit calculates, what it only displays, and what it never calculates" },
        ],
      },
      {
        number: "M05",
        title: "Electrical Families",
        hours: "4h",
        lessons: [
          { number: "5.1", title: "Family types — system, loadable, in-place and annotation" },
          { number: "5.2", title: "The family editor, reference planes and constraints" },
          { number: "5.3", title: "Parameters — type, instance, shared and project" },
          { number: "5.4", title: "Adding electrical connectors and load data to a family" },
          { number: "5.5", title: "Building lighting, device and equipment families" },
          { number: "5.6", title: "Family QA/QC — naming, categories, file size and common faults" },
        ],
      },
      {
        number: "M06",
        title: "Data Center Electrical Modeling",
        hours: "5h",
        lessons: [
          { number: "6.1", title: "Electrical room layouts and equipment clearances" },
          { number: "6.2", title: "MV switchgear and transformer modelling" },
          { number: "6.3", title: "LV switchboards and distribution boards" },
          { number: "6.4", title: "UPS systems and battery rooms" },
          { number: "6.5", title: "PDU, RPP and rack-level power" },
          { number: "6.6", title: "ATS, STS and generator sets" },
          { number: "6.7", title: "A/B power distribution through the data hall" },
        ],
      },
    ],
  },
  {
    stage: "Stage 3",
    title: "Modeling, Documentation & Coordination",
    subtitle: "Modules 7–10 · Containment, lighting, drawings and clash detection",
    hours: "15h",
    modules: [
      {
        number: "M07",
        title: "Cable Tray, Conduit & Power Modeling",
        hours: "4h",
        lessons: [
          { number: "7.1", title: "Cable tray types, sizes and fittings" },
          { number: "7.2", title: "Tray routing, multi-tier arrangements and elevations" },
          { number: "7.3", title: "Segregation — power, ELV, control and fire-rated routes" },
          { number: "7.4", title: "Conduit routing, bends and equipment connections" },
          { number: "7.5", title: "Busway, tap-off boxes and power whips" },
          { number: "7.6", title: "Modelling the earthing network — earth pits, earth bars and bonding conductors" },
          { number: "7.7", title: "Signal reference grid and equipment earthing in the data hall" },
        ],
      },
      {
        number: "M08",
        title: "Lighting & Small Power",
        hours: "3h",
        lessons: [
          { number: "8.1", title: "Lighting fixture families, placement and mounting heights" },
          { number: "8.2", title: "Lighting layouts for data halls, electrical rooms and corridors" },
          { number: "8.3", title: "Emergency and exit lighting" },
          { number: "8.4", title: "Lighting circuits, switching and control zones" },
          { number: "8.5", title: "Small power — sockets, isolators and maintenance outlets" },
        ],
      },
      {
        number: "M09",
        title: "Electrical Documentation",
        hours: "4h",
        lessons: [
          { number: "9.1", title: "View templates and filters for electrical drawings" },
          { number: "9.2", title: "Equipment, tray, conduit and lighting layout drawings" },
          { number: "9.3", title: "Earthing and small power layouts" },
          { number: "9.4", title: "Tags, legends, keynotes and general notes" },
          { number: "9.5", title: "Sections, enlarged plans and typical details" },
          { number: "9.6", title: "Title blocks, sheets and drawing numbering" },
          { number: "9.7", title: "Revisions, revision clouds and drawing issue" },
        ],
      },
      {
        number: "M10",
        title: "BIM Coordination & Navisworks",
        hours: "4h",
        lessons: [
          { number: "10.1", title: "Federated models and linked model management" },
          { number: "10.2", title: "Coordinating with architecture, structure and mechanical" },
          { number: "10.3", title: "Equipment, maintenance and installation clearances" },
          { number: "10.4", title: "Clash types — hard, soft and clearance" },
          { number: "10.5", title: "Navisworks export, search sets and selection sets" },
          { number: "10.6", title: "Clash Detective, clash grouping and coordination reports" },
        ],
      },
    ],
  },
  {
    stage: "Stage 4",
    title: "BIM Data & Capstone",
    subtitle: "Modules 11–12 · Data, quality control, simple automation and the final project",
    hours: "9h",
    modules: [
      {
        number: "M11",
        title: "BIM Data, BOQ & Quality Control",
        hours: "4h",
        lessons: [
          { number: "11.1", title: "Building schedules — equipment, tray, conduit and devices" },
          { number: "11.2", title: "Calculated values, filters, sorting and grouping" },
          { number: "11.3", title: "Quantity extraction and how it supports a BOQ" },
          { number: "11.4", title: "Shared parameters and data consistency across the model" },
          { number: "11.5", title: "Model checks, warnings and the QA/QC checklist" },
          { number: "11.6", title: "IFC export and the information a project handover needs" },
        ],
      },
      {
        number: "M12",
        title: "Dynamo & Final Data Center Project",
        hours: "5h",
        lessons: [
          { number: "12.1", title: "What Dynamo is, and when it is worth using" },
          { number: "12.2", title: "The Dynamo interface — nodes, wires and lists, explained simply" },
          { number: "12.3", title: "Script one — filling parameters in bulk" },
          { number: "12.4", title: "Script two — exporting equipment data to Excel" },
          { number: "12.5", title: "Capstone part one — project setup, electrical rooms and equipment" },
          { number: "12.6", title: "Capstone part two — containment, lighting, small power and earthing" },
          { number: "12.7", title: "Capstone part three — coordination, schedules and the drawing set" },
        ],
      },
    ],
  },
]

export const BIM_CURRICULUM_TOTAL_HOURS = BIM_CURRICULUM.reduce(
  (sum, stage) => sum + (parseInt(stage.hours, 10) || 0),
  0,
)

export const BIM_CURRICULUM_TOTAL_MODULES = BIM_CURRICULUM.reduce((sum, stage) => sum + stage.modules.length, 0)

export const BIM_CURRICULUM_TOTAL_LESSONS = BIM_CURRICULUM.reduce(
  (sum, stage) => sum + stage.modules.reduce((s, m) => s + m.lessons.length, 0),
  0,
)

// Scope note the Founder asked to carry on the website verbatim.
export const BIM_CURRICULUM_SCOPE_NOTE =
  "This is a Revit modelling programme. It teaches you to model, document and coordinate a data center electrical design — not to produce the design itself. Load calculations, cable sizing, protection coordination and single-line design belong to the Electrical Design for Data Centers programme."
