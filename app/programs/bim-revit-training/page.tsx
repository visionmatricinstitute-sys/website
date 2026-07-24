import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { SimpleProgramPage } from "@/components/programs/simple-program-page"

const title = "BIM Training with Revit MEP"
const description =
  "Advanced BIM training with Revit MEP focusing on building information modeling for construction and engineering projects. Live online, instructor-led."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/programs/bim-revit-training",
  },
  openGraph: {
    type: "website",
    url: "/programs/bim-revit-training",
    title,
    description,
    images: [{ url: "/bim-training.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/bim-training.jpg"],
  },
}

const faqs = [
  {
    question: "How long does the BIM/Revit MEP course take?",
    answer:
      "The program runs 4–8 months depending on your pace, delivered as live, instructor-led online sessions.",
  },
  {
    question: "Do I need AutoCAD experience first?",
    answer:
      "This is an advanced-level course. Familiarity with 2D drafting or MEP design concepts is helpful, though not strictly required before enrolling — ask us on WhatsApp if you're unsure.",
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes — you receive a Vision Matrix Institute certificate of completion once you finish the course.",
  },
  {
    question: "Is placement support included?",
    answer:
      "We provide resume guidance, interview preparation, and placement assistance to help job-ready graduates connect with employers.",
  },
]

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "BIM Training with Revit MEP",
  description,
  provider: {
    "@type": "EducationalOrganization",
    name: "Vision Matrix Institute",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}

export default function BimRevitTrainingPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <SimpleProgramPage
          title="BIM Training"
          tagline="Building Information Modeling with Revit MEP"
          description={description}
          duration="4–8 months"
          level="Advanced"
          format="Live Online"
          audience={[
            "Practising MEP, electrical, or mechanical engineers who want BIM coordination skills.",
            "AutoCAD users transitioning to 3D BIM workflows.",
            "Design professionals working on construction projects that require BIM deliverables.",
          ]}
          tools={["Revit MEP", "3D Modeling", "Project Coordination", "BIM Standards"]}
          outcomes={[
            "Model MEP systems in Revit for construction-ready coordination.",
            "Resolve clashes across disciplines in a shared BIM model.",
            "Apply BIM standards and workflows used on real projects.",
            "Produce coordinated drawing sets and schedules from a BIM model.",
          ]}
          faqs={faqs}
          whatsappMessage="Hi, I'm interested in the BIM Training (Revit MEP) course."
        />
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-serif">
              Looking for something else?{" "}
              <Link href="/#courses" className="text-accent font-semibold hover:underline">
                See all courses
              </Link>{" "}
              or explore our{" "}
              <Link href="/programs/electrical-design-data-center" className="text-accent font-semibold hover:underline">
                Electrical Design – Data Center Specialist
              </Link>{" "}
              program.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
