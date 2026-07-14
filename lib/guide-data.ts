export interface FaqItem {
  question: string
  answer: string
}

export const DC_CAREER_FAQS: FaqItem[] = [
  {
    question: "What is a Data Center Electrical Design Engineer?",
    answer:
      "A Data Center Electrical Design Engineer designs the power infrastructure of mission-critical facilities — from the utility interface through transformers, UPS systems, generators, switchgear, and protection systems, all the way to the IT racks. The role combines classical power engineering with reliability engineering, since data centers are designed to industry tier standards (Uptime Institute Tier I-IV, TIA-942) that demand redundancy and near-zero downtime.",
  },
  {
    question: "Is electrical engineering required to enter this field?",
    answer:
      "Yes. A diploma or bachelor's degree in Electrical, Electronics, or Instrumentation Engineering is the standard entry requirement. Diploma holders with a few years of relevant site or design experience can also enter the specialization, but a foundation in AC circuit theory, single-line diagrams, and basic power systems is expected.",
  },
  {
    question: "What software do data center electrical design engineers use?",
    answer:
      "The core toolkit includes AutoCAD Electrical for schematic and single-line drawing production, Revit MEP for 3D BIM modelling, ETAP or SKM PowerTools for load flow, short-circuit, arc-flash, and protection coordination studies, Dialux evo for lighting design, and Navisworks for BIM clash detection. Advanced Excel skills for calculation sheets are equally important in daily practice.",
  },
  {
    question: "What is the salary range for this specialization in India?",
    answer:
      "Indicative 2024-2025 ranges are approximately ₹12-25 LPA for mid-level engineers (3-7 years) and ₹28-60 LPA for senior/lead engineers (8-15 years) in Indian metros. Certified data-center-specialized engineers typically command a meaningful premium over general MEP engineers, since the specialization is in short supply relative to demand.",
  },
  {
    question: "What certifications are valuable for a data center electrical design career?",
    answer:
      "The most recognised credentials are the Uptime Institute Accredited Tier Designer (ATD) and Accredited Tier Specialist (ATS), the CDCP/CDCS/CDCE family from EPI/CNet, Chartered Engineer status through a national institution of engineers, and Professional Engineer (PE) licensure in jurisdictions where it applies. These sit on top of a strong foundation in IEC, IEEE, and TIA-942 standards.",
  },
  {
    question: "What is the difference between Tier III and Tier IV data centers?",
    answer:
      "Tier III facilities are concurrently maintainable — any single distribution path can be taken down for maintenance without disrupting IT operations. Tier IV facilities add fault tolerance — the infrastructure continues operating even through an unplanned failure of any single component, typically achieved through 2N or 2(N+1) redundancy across independent distribution paths. Tier IV designs are significantly more complex and capital-intensive.",
  },
  {
    question: "How long does it take to become job-ready in this specialization?",
    answer:
      "Structured, practitioner-led programs covering the full scope — from tier classification through load calculations, protection studies, UPS/generator sizing, BIM coordination, and commissioning — typically run 200-250 hours over 4-6 months, often supplemented by a capstone project that produces a portfolio-ready design package for a realistic facility.",
  },
  {
    question: "Which companies hire data center electrical design engineers in India?",
    answer:
      "The hiring landscape spans EPC contractors, MEP consultancies, hyperscale operators, and colocation providers. Organisations active in the Indian data center market include large EPC and engineering firms, global colocation and hyperscale operators expanding their India footprint, and specialist MEP design consultancies serving them. Job postings for this specialization are concentrated in Mumbai, Chennai, Hyderabad, Pune, and the NCR region, tracking the country's major data center clusters.",
  },
  {
    question: "What is IEC 60909 and why does it matter for this role?",
    answer:
      "IEC 60909 is the international standard defining the method for calculating short-circuit currents in three-phase AC systems. Every switchgear, breaker, and cable in a data center's electrical distribution must be rated to withstand the fault current calculated per this standard — it is one of the core calculations a design engineer performs and defends on every project.",
  },
  {
    question: "Do I need to know AutoCAD Electrical and Revit MEP, or just one?",
    answer:
      "Both, ideally. AutoCAD Electrical remains the standard for 2D schematic and single-line diagram production across the industry, while Revit MEP is increasingly required for BIM coordination on larger projects, particularly hyperscale builds. Most serious data center design roles expect familiarity with both, plus at least one power systems analysis tool like ETAP.",
  },
  {
    question: "What is the typical career progression in this field?",
    answer:
      "A common path runs from Graduate Engineer (0-1 years, learning under mentorship) to Electrical Design Engineer (1-3 years, producing SLDs and calculations) to Senior Design Engineer (3-6 years, owning full packages) to Lead Electrical Engineer (6-10 years) to Principal Engineer or Engineering Manager (10-18 years), with independent consulting or a Technical Director role as a long-term destination for those who specialise deeply.",
  },
  {
    question: "Is prior data center experience required to start learning this specialization?",
    answer:
      "No. Structured programs are designed for four cohorts: fresh graduates entering directly into the specialization, practising MEP or industrial electrical engineers pivoting into mission-critical work, senior consultants seeking a rigorous standards refresher, and facility operators building in-house design capability. Each starts from a different baseline and the curriculum is sequenced accordingly.",
  },
]

export const CAREER_PROGRESSION = [
  { years: "0–1", role: "Graduate Engineer", focus: "Learning drawings, standards, and calculations under senior mentorship." },
  { years: "1–3", role: "Electrical Design Engineer", focus: "Producing SLDs, cable calculations, layout drawings under senior review." },
  { years: "3–6", role: "Senior Design Engineer", focus: "Owning package deliverables (MV, LV, UPS, protection) end-to-end." },
  { years: "6–10", role: "Lead Electrical Engineer", focus: "Leading electrical design for a project; coordinating with other disciplines." },
  { years: "10–15", role: "Principal Engineer", focus: "Reviewing design across multiple projects; setting engineering standards." },
  { years: "15–25", role: "Data Center Design Consultant", focus: "Independent consulting to owners on tier, topology, and technology strategy." },
]
