"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { TurnstileWidget } from "@/components/turnstile-widget"
import { isValidPhone, PHONE_VALIDATION_MESSAGE } from "@/lib/phone"
import { cn } from "@/lib/utils"

const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

// Large, rounded, generously-padded pill fields — matching the reference design.
const FIELD_CLASS = "h-12 rounded-full px-5 text-base"

const COURSE_OPTIONS = [
  { value: "electrical-design-data-center", label: "Electrical Design – Data Center Specialist" },
  { value: "computer-skills", label: "Computer Skills & Applications" },
  { value: "cad", label: "AutoCAD" },
  { value: "bim", label: "BIM (Building Information Modeling)" },
]

const EDUCATION_OPTIONS = [
  "Diploma in Electrical Engineering",
  "B.E./B.Tech in Electrical Engineering",
  "M.E./M.Tech",
  "ITI",
  "Other",
]

const EMPTY_FORM = {
  studentName: "",
  email: "",
  phone: "",
  location: "",
  courseInterest: "",
  education: "",
}

type FieldErrors = Partial<Record<"studentName" | "phone" | "location" | "courseInterest", string>>

export function DemoForm() {
  const router = useRouter()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  function updateField<K extends keyof typeof EMPTY_FORM>(field: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const nextErrors: FieldErrors = {}
    if (!form.studentName.trim()) nextErrors.studentName = "Name is required."
    if (!form.phone.trim()) nextErrors.phone = "Mobile number is required."
    else if (!isValidPhone(form.phone)) nextErrors.phone = PHONE_VALIDATION_MESSAGE
    if (!form.location.trim()) nextErrors.location = "Location is required."
    if (!form.courseInterest) nextErrors.courseInterest = "Please choose a course."

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (captchaRequired && !captchaToken) {
      toast.error("Please complete the verification check.")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      toast.success("Demo request received! We'll call you to schedule it shortly.")
      setForm(EMPTY_FORM)
      setCaptchaToken(null)
      router.push("/")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setCaptchaToken(null)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold font-sans text-foreground text-center mb-6">Let&apos;s get started</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <Input
              aria-label="Name"
              placeholder="Name"
              value={form.studentName}
              onChange={(e) => updateField("studentName", e.target.value)}
              className={cn(FIELD_CLASS, "pr-8", errors.studentName && "border-destructive")}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-destructive">*</span>
          </div>
          {errors.studentName && <p className="text-sm text-destructive mt-1 ml-5">{errors.studentName}</p>}
        </div>

        <div>
          <Input
            aria-label="Email ID"
            type="email"
            placeholder="Email ID"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <div className="relative">
            <Input
              aria-label="Mobile Number"
              type="tel"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={cn(FIELD_CLASS, "pr-8", errors.phone && "border-destructive")}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-destructive">*</span>
          </div>
          {errors.phone && <p className="text-sm text-destructive mt-1 ml-5">{errors.phone}</p>}
        </div>

        <div>
          <div className="relative">
            <Input
              aria-label="Your Location"
              placeholder="Your Location"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              className={cn(FIELD_CLASS, "pr-8", errors.location && "border-destructive")}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-destructive">*</span>
          </div>
          {errors.location && <p className="text-sm text-destructive mt-1 ml-5">{errors.location}</p>}
        </div>

        <div>
          <Select value={form.courseInterest} onValueChange={(v) => updateField("courseInterest", v)}>
            <SelectTrigger
              aria-label="Choose Course"
              className={cn(FIELD_CLASS, "w-full", errors.courseInterest && "border-destructive")}
            >
              <SelectValue placeholder="Choose Course *" />
            </SelectTrigger>
            <SelectContent>
              {COURSE_OPTIONS.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.courseInterest && <p className="text-sm text-destructive mt-1 ml-5">{errors.courseInterest}</p>}
        </div>

        <div>
          <Select value={form.education} onValueChange={(v) => updateField("education", v)}>
            <SelectTrigger aria-label="Educational Qualification" className={cn(FIELD_CLASS, "w-full")}>
              <SelectValue placeholder="Educational Qualification" />
            </SelectTrigger>
            <SelectContent>
              {EDUCATION_OPTIONS.map((opt) => (
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
            "Submit"
          )}
        </Button>
      </form>
    </div>
  )
}
