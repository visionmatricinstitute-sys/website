import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/motion/fade-in"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { DC_CAREER_FAQS, CAREER_PROGRESSION } from "@/lib/guide-data"

const title = "How to Become a Data Center Electrical Design Engineer in India (2026 Guide)"
const description =
  "A complete guide to the data center electrical design career path in India: what the role involves, the tools and standards you need, real salary ranges, certifications, and how to get started."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog/how-to-become-a-data-center-electrical-design-engineer-in-india",
  },
  openGraph: {
    type: "article",
    url: "/blog/how-to-become-a-data-center-electrical-design-engineer-in-india",
    title,
    description,
    images: [
      {
        url: "/electrical-design-data-center.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/electrical-design-data-center.jpg"],
  },
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: "https://www.visionmatrixinstitute.com/electrical-design-data-center.jpg",
  author: { "@type": "Organization", name: "Vision Matrix Institute" },
  publisher: { "@type": "Organization", name: "Vision Matrix Institute" },
  mainEntityOfPage: "https://www.visionmatrixinstitute.com/blog/how-to-become-a-data-center-electrical-design-engineer-in-india",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DC_CAREER_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

const TOC = [
  { id: "what-is-the-role", label: "What Does the Role Involve?" },
  { id: "why-this-career", label: "Why This Career Path" },
  { id: "skills-requirements", label: "Skills & Requirements" },
  { id: "tools-software", label: "Tools & Software" },
  { id: "certifications", label: "Certifications That Matter" },
  { id: "salary", label: "Salary Expectations" },
  { id: "who-hires", label: "Who Hires for This Role" },
  { id: "career-path", label: "Career Progression" },
  { id: "getting-started", label: "How to Get Started" },
  { id: "faq", label: "Frequently Asked Questions" },
]

export default function DataCenterCareerGuidePage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent/25 blur-[110px]" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <Badge className="bg-accent/10 text-accent mb-6 hover:bg-accent/10">Career Guide</Badge>
            <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">
              How to Become a Data Center Electrical Design Engineer in India (2026 Guide)
            </h1>
            <p className="text-lg text-white/70 font-serif leading-relaxed">
              A complete, practical guide to one of electrical engineering's fastest-growing specializations —
              what the role involves, the tools and standards you need, real salary data, and how to get started.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Table of contents */}
            <FadeIn>
              <Card className="mb-12 bg-muted/40">
                <CardContent className="p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
                    On This Page
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {TOC.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="text-sm text-accent hover:underline font-serif"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <article className="space-y-12 text-foreground font-serif leading-relaxed [&_h2]:font-sans [&_h2]:font-black [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:mb-4 [&_h3]:font-sans [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:text-lg [&_h3]:mb-2 [&_h3]:mt-6 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:space-y-2 [&_li]:list-disc [&_li]:ml-5">
              <FadeIn>
                <h2 id="what-is-the-role">What Does a Data Center Electrical Design Engineer Do?</h2>
                <p>
                  A data center electrical design engineer is responsible for the complete electrical power path
                  of a mission-critical facility — from the utility interface at the site boundary, through
                  medium-voltage transformers and switchgear, UPS systems and battery banks, standby generators,
                  low-voltage distribution, and all the way down to the busway and rack-level power distribution
                  units that feed IT equipment.
                </p>
                <p>
                  Unlike general building electrical design, every decision in a data center is anchored to a
                  reliability target. Facilities are designed to Uptime Institute Tier I-IV classifications or
                  TIA-942 Rated 1-4 levels, and the engineer's job is to translate a reliability requirement
                  (concurrent maintainability, fault tolerance, N+1 or 2N redundancy) into a distribution
                  architecture, then prove — through short-circuit studies, arc-flash analysis, protection
                  coordination, and voltage drop calculations — that the design actually delivers it.
                </p>
                <p>
                  The day-to-day work spans single-line diagram production, load calculations, equipment sizing
                  (transformers, UPS, generators, switchgear), system studies in tools like ETAP, BIM coordination
                  in Revit MEP, vendor technical bid evaluation, and support through factory acceptance testing,
                  site commissioning, and integrated systems testing before a facility goes live.
                </p>
              </FadeIn>

              <FadeIn>
                <h2 id="why-this-career">Why This Career Path</h2>
                <p>
                  Electrical infrastructure typically represents 40-50% of a data center's capital cost and
                  virtually all of its criticality — a single design flaw can render a facility unable to meet
                  its SLA or cause catastrophic downtime for tenants. That combination of capital weight and
                  consequence is why owners pay a premium for engineers who can demonstrably get it right.
                </p>
                <p>
                  The demand signal is strong and public. India alone is projected to add over 1,000 MW of data
                  center capacity by 2027, global hyperscale build-out has crossed 40 GW of cumulative IT load,
                  and the AI compute boom is pushing rack densities from a legacy 5-20 kW toward 100+ kW —
                  forcing a full redesign of electrical topologies industry-wide. Major EPC firms, consultancies,
                  and hyperscale operators have publicly reported hiring shortfalls specifically for
                  data-center-experienced electrical engineers, which is what pushes compensation for this
                  specialization meaningfully above general MEP roles.
                </p>
              </FadeIn>

              <FadeIn>
                <h2 id="skills-requirements">Skills &amp; Requirements</h2>
                <p>The baseline entry requirements for this specialization are:</p>
                <ul>
                  <li>
                    A Bachelor's degree (BE/BTech) in Electrical Engineering, Electrical &amp; Electronics
                    Engineering, or Electronics &amp; Instrumentation — or a Diploma in Electrical Engineering
                    with at least three years of relevant industry experience.
                  </li>
                  <li>Comfort with three-phase AC power theory and elementary electrical calculations.</li>
                  <li>Familiarity with reading and marking up electrical drawings, including single-line diagrams.</li>
                  <li>A basic understanding of transformers, switchgear, cables, and protection devices.</li>
                  <li>Working knowledge of at least one drafting tool such as AutoCAD is strongly preferred.</li>
                </ul>
                <p>
                  Beyond the technical baseline, the specialization rewards engineers who can hold both the
                  calculation and the construction detail in mind at once — this is not a purely theoretical
                  discipline; every study needs to end in a buildable, defensible deliverable.
                </p>
              </FadeIn>

              <FadeIn>
                <h2 id="tools-software">Tools &amp; Software</h2>
                <p>
                  Modern data center electrical design is not delivered on paper. The tools that shape daily
                  practice fall into four categories:
                </p>
                <h3>Design &amp; Drawing</h3>
                <p>AutoCAD Electrical, Revit MEP, Navisworks, Bluebeam Revu, and BIM 360 for coordination workflows.</p>
                <h3>Analysis &amp; Studies</h3>
                <p>
                  ETAP and SKM PowerTools for load flow, short-circuit, arc-flash, and protection coordination
                  studies; DIgSILENT PowerFactory for MV transient and dynamic simulation on larger projects.
                </p>
                <h3>Lighting</h3>
                <p>Dialux evo for illuminance calculations and lighting layout verification.</p>
                <h3>Programme &amp; Documentation</h3>
                <p>Primavera P6 or MS Project for scheduling, and advanced Excel for the calculation sheets that underpin every study.</p>
              </FadeIn>

              <FadeIn>
                <h2 id="certifications">Certifications That Matter</h2>
                <p>
                  A structured curriculum anchored in current standards is the foundation, but several
                  certifications are widely recognised as markers of specialization in this field:
                </p>
                <ul>
                  <li><strong>Uptime Institute Accredited Tier Designer (ATD)</strong> and Accredited Tier Specialist (ATS) — the most widely recognised data-center-specific design credentials globally.</li>
                  <li><strong>CDCP, CDCS, CDCE</strong> (from EPI/CNet) — data center professional certifications spanning foundational to expert levels.</li>
                  <li><strong>Chartered Engineer</strong> status through a national institution of engineers (e.g. IE(I) in India) or equivalent.</li>
                  <li><strong>Professional Engineer (PE)</strong> licensure through bodies like NCEES, where applicable to the jurisdiction.</li>
                </ul>
                <p>
                  Every calculation, drawing, and specification in a serious design program should be traceable
                  to a specific clause of IEC, IEEE, NFPA, TIA, IS, or Uptime Institute standards — that
                  standards discipline is what these certifications ultimately validate.
                </p>
              </FadeIn>

              <FadeIn>
                <h2 id="salary">Salary Expectations</h2>
                <p>
                  Indicative 2024-2025 compensation ranges for engineers with data center electrical design
                  competence:
                </p>
                <div className="overflow-x-auto my-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left font-semibold text-muted-foreground py-2">Region</th>
                        <th className="text-left font-semibold text-muted-foreground py-2">Mid-Level (3–7 yrs)</th>
                        <th className="text-left font-semibold text-muted-foreground py-2">Senior / Lead (8–15 yrs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border"><td className="py-2.5 font-medium">India (Metros)</td><td className="py-2.5 text-muted-foreground">₹ 12 – 25 LPA</td><td className="py-2.5 text-muted-foreground">₹ 28 – 60 LPA</td></tr>
                      <tr className="border-b border-border"><td className="py-2.5 font-medium">UAE / KSA / Qatar</td><td className="py-2.5 text-muted-foreground">AED 240K – 420K</td><td className="py-2.5 text-muted-foreground">AED 480K – 900K</td></tr>
                      <tr className="border-b border-border"><td className="py-2.5 font-medium">Singapore / SE Asia</td><td className="py-2.5 text-muted-foreground">SGD 90K – 150K</td><td className="py-2.5 text-muted-foreground">SGD 180K – 320K</td></tr>
                      <tr><td className="py-2.5 font-medium">UK / EU</td><td className="py-2.5 text-muted-foreground">£ 55K – 90K</td><td className="py-2.5 text-muted-foreground">£ 100K – 160K</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Ranges are indicative only — actual compensation depends on employer, project scale, and
                  certifications held.
                </p>
              </FadeIn>

              <FadeIn>
                <h2 id="who-hires">Who Hires for This Role</h2>
                <p>
                  The hiring landscape for this specialization spans four categories of employer: large EPC and
                  engineering contractors delivering turnkey data center projects, specialist MEP design
                  consultancies serving hyperscale and colocation clients, the in-house engineering teams of
                  hyperscale operators and colocation providers themselves, and equipment vendors and system
                  integrators (UPS, switchgear, and generator manufacturers) who employ application engineers
                  with the same skill set.
                </p>
                <p>
                  In India, job postings for this specialization concentrate around the country's major data
                  center clusters — Mumbai, Chennai, Hyderabad, Pune, and the NCR region — tracking where
                  hyperscale and colocation capacity is actually being built.
                </p>
              </FadeIn>

              <FadeIn>
                <h2 id="career-path">Career Progression</h2>
                <p>
                  This specialization supports a career arc spanning two to three decades, typically progressing
                  through the following stages:
                </p>
                <div className="space-y-3 my-4">
                  {CAREER_PROGRESSION.map((step) => (
                    <div key={step.role} className="flex gap-4 items-start border-b border-border pb-3 last:border-0">
                      <Badge variant="secondary" className="shrink-0 whitespace-nowrap mt-0.5">
                        {step.years} yrs
                      </Badge>
                      <div>
                        <div className="font-semibold font-sans text-foreground text-sm">{step.role}</div>
                        <div className="text-sm text-muted-foreground font-serif">{step.focus}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn>
                <h2 id="getting-started">How to Get Started</h2>
                <p>
                  The fastest, most defensible path into this specialization is a structured, practitioner-led
                  program that combines standards-anchored theory with hands-on tool training and a real
                  capstone deliverable — not a series of disconnected tutorials. Look for a curriculum that
                  covers the full scope end-to-end: tier classification and reliability frameworks, power
                  distribution architectures, MV systems and transformers, UPS and generator sizing, protection
                  engineering, short-circuit and arc-flash studies, earthing and lightning protection, load
                  calculations and cable sizing, LV switchgear design, BIM coordination, and commissioning —
                  finishing with a portfolio-ready capstone project you can defend in an interview.
                </p>
              </FadeIn>
            </article>

            <FadeIn className="mt-12">
              <Card className="bg-navy text-navy-foreground border-none overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
                <CardContent className="relative p-8 text-center">
                  <h2 className="text-2xl font-black font-sans text-white mb-3">
                    Ready to Start Your Data Center Electrical Design Career?
                  </h2>
                  <p className="text-navy-foreground/75 font-serif mb-6 max-w-xl mx-auto">
                    Our Electrical Design Engineer – Data Center Specialist program covers everything in this
                    guide, taught by practitioners and anchored in current IEC, IEEE, and Uptime Institute
                    standards.
                  </p>
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/programs/electrical-design-data-center">
                      Explore the Program
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>

            {/* FAQ */}
            <section id="faq" className="mt-16">
              <FadeIn className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-black font-sans text-foreground">
                  Frequently Asked Questions
                </h2>
              </FadeIn>
              <div className="space-y-4">
                {DC_CAREER_FAQS.map((faq, index) => (
                  <FadeIn key={faq.question} delay={(index % 4) * 0.05}>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold font-sans text-foreground mb-1.5">{faq.question}</h3>
                            <p className="text-sm text-muted-foreground font-serif leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </section>

            {/* Related resources */}
            <FadeIn className="mt-16 pt-8 border-t border-border">
              <h2 className="text-lg font-bold font-sans text-foreground mb-4">Related Resources</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/programs/electrical-design-data-center" className="text-sm text-accent hover:underline font-serif">
                  Electrical Design – Data Center Specialist Program →
                </Link>
                <Link href="/engineers-toolkit" className="text-sm text-accent hover:underline font-serif">
                  Free Engineering Calculators & Toolkit →
                </Link>
                <Link href="/#courses" className="text-sm text-accent hover:underline font-serif">
                  All Courses →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
