import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { SimpleProgramPage } from "@/components/programs/simple-program-page"

const title = "Computer Skills & Applications Training"
const description =
  "Master essential computer skills including basic operations, MS Office suite, internet tools, and digital literacy for modern workplace requirements. Live online, instructor-led."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/programs/computer-skills-applications",
  },
  openGraph: {
    type: "website",
    url: "/programs/computer-skills-applications",
    title,
    description,
    images: [{ url: "/computer-training-ms-office.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/computer-training-ms-office.png"],
  },
}

const faqs = [
  {
    question: "How long does this course take?",
    answer:
      "The program runs 2–4 months depending on your pace, delivered as live, instructor-led online sessions.",
  },
  {
    question: "Do I need any prior computer experience?",
    answer: "No — this course is designed for complete beginners and goes up to advanced MS Office usage.",
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
  name: "Computer Skills & Applications Training",
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

export default function ComputerSkillsPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <SimpleProgramPage
          title="Computer Skills & Applications"
          tagline="Foundational to Advanced Digital Literacy"
          description={description}
          duration="2–4 months"
          level="Beginner–Advanced"
          format="Live Online"
          audience={[
            "Complete beginners building foundational computer literacy.",
            "Students and professionals who want practical MS Office skills.",
            "Anyone preparing for office or administrative roles that require digital literacy.",
          ]}
          tools={["Basic Computer", "MS Office", "Internet Tools", "Digital Literacy"]}
          outcomes={[
            "Confidently operate a computer and manage files for daily work.",
            "Create documents, spreadsheets, and presentations in MS Office.",
            "Use internet tools and digital communication effectively.",
            "Build a foundation for further technical or design courses.",
          ]}
          faqs={faqs}
          whatsappMessage="Hi, I'm interested in the Computer Skills & Applications course."
        />
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-serif">
              Looking for something else?{" "}
              <Link href="/#courses" className="text-accent font-semibold hover:underline">
                See all courses
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
