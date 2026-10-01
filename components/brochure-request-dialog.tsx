"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, ShieldCheck } from "lucide-react"
import { TurnstileWidget } from "@/components/turnstile-widget"
import { isValidPhone, PHONE_INPUT_PATTERN, PHONE_VALIDATION_MESSAGE } from "@/lib/phone"
import { cn } from "@/lib/utils"

const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

// Large, rounded, generously-padded fields — matching the demo form's pill-style inputs.
const FIELD_CLASS = "h-12 rounded-full px-5 text-base"

function RequiredMark() {
  return <span className="text-destructive">*</span>
}

const PROGRAM_OPTIONS = [
  { value: "electrical-design-data-center", label: "Electrical Design – Data Center Specialist" },
  { value: "computer-skills", label: "Computer Skills & Applications" },
  { value: "cad", label: "AutoCAD" },
  { value: "bim", label: "BIM (Building Information Modeling)" },
]

const STATE_OPTIONS = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Outside India",
]

const EMPTY_FORM = { firstName: "", lastName: "", mobile: "", email: "", state: "", program: "" }

export function BrochureRequestDialog({
  children,
  brochureUrl = "/brochures/electrical-design-data-center-brochure.pdf",
  defaultProgram,
}: {
  children: ReactNode
  brochureUrl?: string
  defaultProgram?: string
}) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ ...EMPTY_FORM, program: defaultProgram || "" })
  const [submitting, setSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  function updateField<K extends keyof typeof EMPTY_FORM>(field: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!form.firstName || !form.lastName || !form.mobile || !form.email) {
      toast.error("Please fill in your name, mobile and email.")
      return
    }
    if (!isValidPhone(form.mobile)) {
      toast.error(PHONE_VALIDATION_MESSAGE)
      return
    }
    if (captchaRequired && !captchaToken) {
      toast.error("Please complete the verification check.")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/brochure-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      toast.success("Thanks! Your download is starting.")

      const link = document.createElement("a")
      link.href = brochureUrl
      link.download = ""
      document.body.appendChild(link)
      link.click()
      link.remove()

      setForm({ ...EMPTY_FORM, program: defaultProgram || "" })
      setCaptchaToken(null)
      setOpen(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setCaptchaToken(null)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fill the form details</DialogTitle>
          <DialogDescription>Get the brochure sent straight to your download — takes 30 seconds.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="brochure-first-name">
                First Name <RequiredMark />
              </Label>
              <Input
                id="brochure-first-name"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className={FIELD_CLASS}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brochure-last-name">
                Last Name <RequiredMark />
              </Label>
              <Input
                id="brochure-last-name"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className={FIELD_CLASS}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brochure-mobile">
              Mobile <RequiredMark />
            </Label>
            <Input
              id="brochure-mobile"
              type="tel"
              placeholder="Mobile"
              value={form.mobile}
              onChange={(e) => updateField("mobile", e.target.value)}
              pattern={PHONE_INPUT_PATTERN}
              title={PHONE_VALIDATION_MESSAGE}
              className={FIELD_CLASS}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brochure-email">
              Email <RequiredMark />
            </Label>
            <Input
              id="brochure-email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={FIELD_CLASS}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brochure-state">State/Province</Label>
            <Select value={form.state} onValueChange={(v) => updateField("state", v)}>
              <SelectTrigger id="brochure-state" className={cn(FIELD_CLASS, "w-full")}>
                <SelectValue placeholder="--None--" />
              </SelectTrigger>
              <SelectContent>
                {STATE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brochure-program">Choose a Program</Label>
            <Select value={form.program} onValueChange={(v) => updateField("program", v)}>
              <SelectTrigger id="brochure-program" className={cn(FIELD_CLASS, "w-full")}>
                <SelectValue placeholder="--None--" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_OPTIONS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TurnstileWidget onVerify={setCaptchaToken} onExpire={() => setCaptchaToken(null)} />

          <div className="flex items-center justify-center gap-2 rounded-md bg-amber-100 text-amber-900 text-sm font-medium py-2.5 px-3">
            <ShieldCheck className="h-4 w-4" />
            Your Personal information is secure with us
          </div>

          <Button
            type="submit"
            disabled={submitting || (captchaRequired && !captchaToken)}
            variant="accent"
            size="lg"
            className="w-full rounded-full"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Details"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
