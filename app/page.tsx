import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CredibilitySection } from "@/components/credibility-section"
import { IntroVideoSection } from "@/components/intro-video-section"
import { CoursesSection } from "@/components/courses-section"
import { AdmissionSection } from "@/components/admission-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { videoObjectJsonLd } from "@/lib/video-schema"
import { INTRO_VIDEO } from "@/lib/video-data"

const introVideoJsonLd = videoObjectJsonLd(INTRO_VIDEO)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(introVideoJsonLd) }} />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CredibilitySection />
        <IntroVideoSection />
        <CoursesSection />
        <AdmissionSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
