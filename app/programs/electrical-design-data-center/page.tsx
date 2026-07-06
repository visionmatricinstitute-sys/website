import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProgramHero } from "@/components/programs/program-hero"
import { ProgramHighlights } from "@/components/programs/program-highlights"
import { ProgramModules } from "@/components/programs/program-modules"
import { ProgramToolsOutcomes } from "@/components/programs/program-tools-outcomes"
import { ProgramEnroll } from "@/components/programs/program-enroll"

const title = "Electrical Design Engineer – Data Center Specialist Program"
const description =
  "A 240-hour, 14-module Professional Master Program in electrical design for mission-critical data centers — power distribution, UPS, generators, protection studies, BIM coordination and commissioning, anchored in IEC, IEEE, TIA-942 and Uptime Institute standards."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/programs/electrical-design-data-center",
  },
  openGraph: {
    type: "website",
    url: "/programs/electrical-design-data-center",
    title,
    description,
    images: [
      {
        url: "/electrical-design-data-center.jpg",
        width: 1200,
        height: 630,
        alt: "Electrical Design Engineer - Data Center Specialist Program",
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

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Electrical Design Engineer – Data Center Specialist",
  description,
  provider: {
    "@type": "EducationalOrganization",
    name: "Vision Matrix Institute",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Blended",
    courseWorkload: "PT240H",
  },
}

export default function ElectricalDesignDataCenterPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <Header />
      <main>
        <ProgramHero />
        <ProgramHighlights />
        <ProgramModules />
        <ProgramToolsOutcomes />
        <ProgramEnroll />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
