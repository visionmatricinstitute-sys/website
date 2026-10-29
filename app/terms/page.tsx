import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { TERMS_LAST_UPDATED, TERMS_SECTIONS } from "@/lib/legal/terms"

const title = "Terms and Conditions"
const description =
  "The terms for using the Vision Matrix Institute website and enrolling in its online courses: fees, refunds, access, certificates and your rights."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: "/terms",
    title,
    description,
    images: [{ url: "/og/hero-data-center.jpg", width: 1200, height: 630, alt: "Vision Matrix Institute" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/hero-data-center.jpg"] },
}

export default function TermsPage() {
  return (
    <LegalPage
      title={title}
      intro="Please read these terms before you book a demo, create an account or pay for a course."
      lastUpdated={TERMS_LAST_UPDATED}
      sections={TERMS_SECTIONS}
    />
  )
}
