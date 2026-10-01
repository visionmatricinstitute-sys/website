"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Loader2 } from "lucide-react"
import { TurnstileWidget } from "@/components/turnstile-widget"

const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

const ROLE_OPTIONS = [
  "Student / Final-year fresher",
  "Working electrical / design engineer",
  "Targeting a Gulf job",
  "BIM / Revit MEP engineer",
  "Other",
]

const EMPTY_FORM = { name: "", email: "", whatsapp: "", role: "" }

export function LeadMagnetForm({
  magnet = "data-center-load-calculator",
  downloadUrl,
  downloadLabel = "Download the Load Calculator (.xlsx)",
}: {
  magnet?: string
  downloadUrl: string
  downloadLabel?: string
}) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  function updateField<K extends keyof typeof EMPTY_FORM>(field: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!form.name || !form.email) {
      toast.error("Please share your name and email.")
      return
    }
    if (captchaRequired && !captchaToken) {
      toast.error("Please complete the verification check.")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, magnet, captchaToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      setUnlocked(true)
      toast.success("You're in! Your download is ready below.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setCaptchaToken(null)
    } finally {
      setSubmitting(false)
    }
  }

  if (unlocked) {
    return (
      <Card className="border-accent/40">
        <CardContent className="p-6 text-center space-y-4">
          <p className="font-serif text-muted-foreground">
            Thanks, {form.name.split(" ")[0]} — your download is ready.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <a href={downloadUrl} download>
              <Download className="mr-2 h-5 w-5" />
              {downloadLabel}
            </a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lm-name">Name *</Label>
            <Input
              id="lm-name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lm-email">Email *</Label>
            <Input
              id="lm-email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lm-whatsapp">WhatsApp number (optional)</Label>
            <Input
              id="lm-whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={(e) => updateField("whatsapp", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lm-role">Which best describes you? (optional)</Label>
            <Select value={form.role} onValueChange={(v) => updateField("role", v)}>
              <SelectTrigger id="lm-role">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TurnstileWidget onVerify={setCaptchaToken} onExpire={() => setCaptchaToken(null)} />

          <Button
            type="submit"
            disabled={submitting || (captchaRequired && !captchaToken)}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Get the free calculator
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground font-serif text-center">
            No spam — just this download and occasional updates from VMI.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
