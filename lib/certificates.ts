// Helpers for verified certificates. The database side (approval, unique ID,
// public verification, consent) is in supabase/migrations/016_verified_certificates.sql
// and 017_certificate_name_consent.sql.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.visionmatrixinstitute.com"

// Numeric ID of the Vision Matrix Institute LinkedIn company page
// (https://www.linkedin.com/company/138274177), so LinkedIn shows the VMI logo.
export const LINKEDIN_ORGANIZATION_ID = "138274177"

// Shown on the printable certificate (confirmed by the Founder, 2026-09-27).
export const SIGNATORY_NAME = "Bushra Shaikh"
export const SIGNATORY_TITLE = "Founder"

export function verifyUrl(certificateNumber: string): string {
  return `${SITE_URL}/verify/${encodeURIComponent(certificateNumber)}`
}

// LinkedIn's documented "Add to Profile" link for certifications.
// All values must be URL-encoded (encodeURIComponent, so spaces become %20).
export function linkedInAddToProfileUrl(cert: {
  certificate_number: string
  course_title: string
  approved_at: string
}): string {
  const issued = new Date(cert.approved_at)
  const parts: [string, string][] = [
    ["startTask", "CERTIFICATION_NAME"],
    ["name", cert.course_title],
    ["organizationId", LINKEDIN_ORGANIZATION_ID],
    ["issueYear", String(issued.getUTCFullYear())],
    ["issueMonth", String(issued.getUTCMonth() + 1)],
    ["certUrl", verifyUrl(cert.certificate_number)],
    ["certId", cert.certificate_number],
  ]
  const query = parts.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&")
  return `https://www.linkedin.com/profile/add?${query}`
}

export const NAME_CONSENT_TEXT =
  "I agree that Vision Matrix Institute may show my full name, the course name, the course hours and the issue date on the public page where this certificate is verified, so that anyone who has my Certificate ID can confirm it is genuine. I can turn this off at any time. If I do not agree, the page will still confirm the certificate is valid but will not show my name."
