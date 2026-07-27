import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { ProgramHero } from "@/components/programs/program-hero"
import { ProgramHighlights } from "@/components/programs/program-highlights"
import { ProgramModules } from "@/components/programs/program-modules"
import { ProgramToolsOutcomes } from "@/components/programs/program-tools-outcomes"
import { ProgramCareerOutcomes } from "@/components/programs/program-career-outcomes"
import { ProgramVideoPreviews } from "@/components/programs/program-video-previews"
import { ProgramEnroll } from "@/components/programs/program-enroll"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { videoObjectJsonLd } from "@/lib/video-schema"
import { PROGRAM_PREVIEW_VIDEOS } from "@/lib/video-data"

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

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Courses", path: "/#courses" },
  { name: "Electrical Design – Data Center Specialist", path: "/programs/electrical-design-data-center" },
])

const videoJsonLds = PROGRAM_PREVIEW_VIDEOS.map(videoObjectJsonLd)

export default function ElectricalDesignDataCenterPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      {videoJsonLds.map((v, i) => (
        <script
          key={PROGRAM_PREVIEW_VIDEOS[i].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(v) }}
        />
      ))}
      <Header />
      <main>
        <ProgramHero />
        <ProgramHighlights />
        <ProgramModules />
        <ProgramVideoPreviews />
        <ProgramToolsOutcomes />
        <ProgramCareerOutcomes />
        <ProgramEnroll />
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
