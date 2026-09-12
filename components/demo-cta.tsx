"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { CalendarCheck, Loader2 } from "lucide-react"
import { TurnstileWidget } from "@/components/turnstile-widget"
import { isValidPhone, PHONE_INPUT_PATTERN, PHONE_VALIDATION_MESSAGE } from "@/lib/phone"

const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

const SOFTWARE_OPTIONS = ["AutoCAD", "ETAP", "EPLAN", "Revit MEP", "Dialux", "Excel"] as const

const EMPTY_FORM = {
  studentName: "",
  education: "",
  educationOther: "",
  college: "",
  currentYearSemester: "",
  graduationYear: "",
  currentOccupation: "",
  workExperience: "",
  currentCompany: "",
  designExperience: "",
  softwareKnown: [] as string[],
  softwareOther: "",
  expectations: "",
  trainingGoal: "",
  trainingGoalOther: "",
  phone: "",
  email: "",
  heardFrom: "",
  heardFromOther: "",
  courseInterest: "",
}

export function DemoCta() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  function updateField<K extends keyof typeof EMPTY_FORM>(field: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleSoftware(name: string, checked: boolean) {
    setForm((prev) => ({
      ...prev,
      softwareKnown: checked ? [...prev.softwareKnown, name] : prev.softwareKnown.filter((s) => s !== name),
    }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!form.studentName || !form.phone || !form.courseInterest) {
      toast.error("Please fill in your name, phone, and course of interest.")
      return
    }
    if (!isValidPhone(form.phone)) {
      toast.error(PHONE_VALIDATION_MESSAGE)
      return
    }
    if (captchaRequired && !captchaToken) {
      toast.error("Please complete the verification check.")
      return
    }

    setSubmitting(true)
    try {
      const education = form.education === "Other" ? form.educationOther : form.education
      const trainingGoal = form.trainingGoal === "Other" ? form.trainingGoalOther : form.trainingGoal
      const heardFrom = form.heardFrom === "Other" ? form.heardFromOther : form.heardFrom
      const softwareKnown = form.softwareOther
        ? [...form.softwareKnown, form.softwareOther]
        : form.softwareKnown

      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, education, trainingGoal, heardFrom, softwareKnown, captchaToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      toast.success("Demo request received! We'll call you to schedule it shortly.")
      setForm(EMPTY_FORM)
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
      {/* Desktop: floating button, bottom-right */}
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        variant="accent"
        className="hidden sm:flex fixed bottom-6 right-24 z-50 rounded-full px-6"
      >
        <CalendarCheck className="h-5 w-5 mr-2" />
        Book Free Demo
      </Button>

      {/* Mobile: full-width bottom bar */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-accent text-white py-3.5 flex items-center justify-center gap-2 font-semibold shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
      >
        <CalendarCheck className="h-5 w-5" />
        Book Free Demo
      </button>

      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Electrical Design Demo Class — Registration</DialogTitle>
          <DialogDescription>Tell us about yourself and we'll call you to schedule your free demo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="demo-name">1. Student Name *</Label>
            <Input
              id="demo-name"
              placeholder="Your full name"
              value={form.studentName}
              onChange={(e) => updateField("studentName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>2. Education / Qualification</Label>
            <RadioGroup value={form.education} onValueChange={(v) => updateField("education", v)} className="gap-2">
              {["Diploma in Electrical Engineering", "B.E./B.Tech in Electrical Engineering", "M.E./M.Tech", "ITI", "Other"].map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem value={opt} id={`edu-${opt}`} />
                  <Label htmlFor={`edu-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
            {form.education === "Other" && (
              <Input
                placeholder="Please specify"
                value={form.educationOther}
                onChange={(e) => updateField("educationOther", e.target.value)}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="demo-college">3. College / Institute</Label>
              <Input id="demo-college" value={form.college} onChange={(e) => updateField("college", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-year">4. Current Year / Semester</Label>
              <Input id="demo-year" value={form.currentYearSemester} onChange={(e) => updateField("currentYearSemester", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="demo-grad">5. Graduation Year</Label>
              <Input id="demo-grad" value={form.graduationYear} onChange={(e) => updateField("graduationYear", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-occupation">6. Current Occupation / Job Role</Label>
              <Input id="demo-occupation" value={form.currentOccupation} onChange={(e) => updateField("currentOccupation", e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>7. Work Experience</Label>
            <RadioGroup value={form.workExperience} onValueChange={(v) => updateField("workExperience", v)} className="gap-2">
              {["Fresher", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"].map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem value={opt} id={`exp-${opt}`} />
                  <Label htmlFor={`exp-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-company">8. Current Company (if employed)</Label>
            <Input id="demo-company" value={form.currentCompany} onChange={(e) => updateField("currentCompany", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>9. Electrical Design Experience</Label>
            <RadioGroup value={form.designExperience} onValueChange={(v) => updateField("designExperience", v)} className="gap-2">
              {["No experience", "Basic knowledge", "Less than 1 year", "1–3 years", "3+ years"].map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem value={opt} id={`design-${opt}`} />
                  <Label htmlFor={`design-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>10. Software Known</Label>
            <div className="grid grid-cols-2 gap-2">
              {SOFTWARE_OPTIONS.map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <Checkbox
                    id={`sw-${opt}`}
                    checked={form.softwareKnown.includes(opt)}
                    onCheckedChange={(checked) => toggleSoftware(opt, checked === true)}
                  />
                  <Label htmlFor={`sw-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Other software (optional)"
              value={form.softwareOther}
              onChange={(e) => updateField("softwareOther", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-expect">11. What do you expect to learn from the demo class?</Label>
            <Textarea id="demo-expect" value={form.expectations} onChange={(e) => updateField("expectations", e.target.value)} rows={3} />
          </div>

          <div className="space-y-2">
            <Label>12. Preferred Training Goal</Label>
            <RadioGroup value={form.trainingGoal} onValueChange={(v) => updateField("trainingGoal", v)} className="gap-2">
              {["Electrical Design Engineer Job", "Improve Existing Design Skills", "Learn Electrical Design Software", "Project-Based Learning", "Career Guidance", "Other"].map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem value={opt} id={`goal-${opt}`} />
                  <Label htmlFor={`goal-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
            {form.trainingGoal === "Other" && (
              <Input
                placeholder="Please specify"
                value={form.trainingGoalOther}
                onChange={(e) => updateField("trainingGoalOther", e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-phone">13. Mobile / WhatsApp Number *</Label>
            <Input
              id="demo-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              pattern={PHONE_INPUT_PATTERN}
              title={PHONE_VALIDATION_MESSAGE}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-email">14. Email ID</Label>
            <Input id="demo-email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>15. How did you hear about the demo class?</Label>
            <RadioGroup value={form.heardFrom} onValueChange={(v) => updateField("heardFrom", v)} className="gap-2">
              {["WhatsApp", "Instagram", "YouTube", "Referral", "Other"].map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem value={opt} id={`heard-${opt}`} />
                  <Label htmlFor={`heard-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
            {form.heardFrom === "Other" && (
              <Input
                placeholder="Please specify"
                value={form.heardFromOther}
                onChange={(e) => updateField("heardFromOther", e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-course">Course Interest *</Label>
            <Select value={form.courseInterest} onValueChange={(v) => updateField("courseInterest", v)}>
              <SelectTrigger id="demo-course">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electrical-design-data-center">
                  Electrical Design – Data Center Specialist
                </SelectItem>
                <SelectItem value="computer-skills">Computer Skills & Applications</SelectItem>
                <SelectItem value="cad">AutoCAD</SelectItem>
                <SelectItem value="bim">BIM (Building Information Modeling)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TurnstileWidget onVerify={setCaptchaToken} onExpire={() => setCaptchaToken(null)} />

          <Button
            type="submit"
            disabled={submitting || (captchaRequired && !captchaToken)}
            variant="accent"
            className="w-full"
            size="lg"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Free Demo"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
