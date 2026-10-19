import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { PRIVACY_LAST_UPDATED, PRIVACY_SECTIONS } from "@/lib/legal/privacy"

const title = "Privacy Policy"
const description =
  "How Vision Matrix Institute collects, uses and protects your personal data under India's Digital Personal Data Protection Act, 2023."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", title, description },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title={title}
      intro="What personal data we collect, why we use it, who we share it with, and your rights."
      lastUpdated={PRIVACY_LAST_UPDATED}
      sections={PRIVACY_SECTIONS}
    />
  )
}
