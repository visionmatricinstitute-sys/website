import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { SimpleProgramPage } from "@/components/programs/simple-program-page"

const title = "AutoCAD Training – 2D Drafting & 3D Modeling"
const description =
  "Professional AutoCAD training covering 2D drafting and 3D modeling for engineering, architecture, and design applications. Live online, instructor-led."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/programs/autocad-training",
  },
  openGraph: {
    type: "website",
    url: "/programs/autocad-training",
    title,
    description,
    images: [{ url: "/autocad-training.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/autocad-training.png"],
  },
}

const faqs = [
  {
    question: "How long does the AutoCAD course take?",
    answer:
      "The program runs 3–6 months depending on your pace, delivered as live, instructor-led online sessions.",
  },
  {
    question: "Do I need prior CAD experience?",
    answer:
      "A diploma or engineering background with basic technical drawing familiarity is helpful. The course covers 2D drafting through advanced 3D modeling.",
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
  name: "AutoCAD Training – 2D Drafting & 3D Modeling",
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

export default function AutoCadTrainingPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <SimpleProgramPage
          title="AutoCAD Training"
          tagline="2D Drafting & 3D Modeling"
          description={description}
          duration="3–6 months"
          level="Intermediate–Advanced"
          format="Live Online"
          audience={[
            "Diploma or engineering students building professional drafting skills.",
            "Drafters and designers moving from 2D drawings to 3D modeling.",
            "Working professionals who need AutoCAD proficiency for their job.",
          ]}
          tools={["AutoCAD 2D", "AutoCAD 3D", "Technical Drawing", "Design Principles"]}
          outcomes={[
            "Create precise 2D technical drawings for engineering and architecture projects.",
            "Build and edit 3D models in AutoCAD.",
            "Apply drafting standards and conventions used in industry.",
            "Produce print-ready technical drawing sets.",
          ]}
          faqs={faqs}
          whatsappMessage="Hi, I'm interested in the AutoCAD Training course."
        />
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-serif">
              Looking for something else?{" "}
              <Link href="/#courses" className="text-accent font-semibold hover:underline">
                See all courses
              </Link>{" "}
              or read our{" "}
              <Link
                href="/blog/how-to-become-a-data-center-electrical-design-engineer-in-india"
                className="text-accent font-semibold hover:underline"
              >
                career guide
              </Link>
              .
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
