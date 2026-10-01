"use client"

import { useState, useTransition } from "react"
import { setCertificateNameConsent } from "@/app/dashboard/actions"
import { NAME_CONSENT_TEXT } from "@/lib/certificates"

// Lets the student choose whether their name appears on the public
// verification page. Off by default; can be switched off again at any time.
export function CertificateConsentToggle({
  certificateId,
  initialConsent,
}: {
  certificateId: string
  initialConsent: boolean
}) {
  const [consent, setConsent] = useState(initialConsent)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function onChange(next: boolean) {
    setError(null)
    setConsent(next)
    startTransition(async () => {
      try {
        await setCertificateNameConsent(certificateId, next)
      } catch (e: any) {
        setConsent(!next)
        setError(e?.message || "Could not save your choice. Please try again.")
      }
    })
  }

  return (
    <div className="space-y-1">
      <label className="flex items-start gap-2 text-xs text-foreground cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5"
          checked={consent}
          disabled={pending}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>Show my name on the public verification page</span>
      </label>
      <p className="text-[11px] text-muted-foreground font-serif leading-snug">{NAME_CONSENT_TEXT}</p>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
