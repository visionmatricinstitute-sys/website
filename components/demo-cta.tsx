"use client"

import { useState, type FormEvent } from "react"
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
} from "@/components/ui/dialog"
import { CalendarCheck, Loader2 } from "lucide-react"

const EMPTY_FORM = { name: "", phone: "", course: "", preferredTime: "" }

export function DemoCta() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  function updateField(field: keyof typeof EMPTY_FORM, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!form.name || !form.phone || !form.course) {
      toast.error("Please fill in your name, phone, and course of interest.")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      toast.success("Demo request received! We'll call you to schedule it shortly.")
      setForm(EMPTY_FORM)
      setOpen(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
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
        className="hidden sm:flex fixed bottom-6 right-24 z-50 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg rounded-full px-6"
      >
        <CalendarCheck className="h-5 w-5 mr-2" />
        Book Free Demo
      </Button>

      {/* Mobile: full-width bottom bar */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-secondary text-secondary-foreground py-3.5 flex items-center justify-center gap-2 font-semibold shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
      >
        <CalendarCheck className="h-5 w-5" />
        Book Free Demo
      </button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Your Free Demo</DialogTitle>
          <DialogDescription>Tell us a bit about yourself and we'll call you to schedule it.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-name">Name *</Label>
            <Input
              id="demo-name"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-phone">Phone Number *</Label>
            <Input
              id="demo-phone"
              type="tel"
              placeholder="Your phone number"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-course">Course Interest *</Label>
            <Select value={form.course} onValueChange={(v) => updateField("course", v)}>
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

          <div className="space-y-2">
            <Label htmlFor="demo-time">Preferred Time</Label>
            <Select value={form.preferredTime} onValueChange={(v) => updateField("preferredTime", v)}>
              <SelectTrigger id="demo-time">
                <SelectValue placeholder="Any time that works" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (9 AM – 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM – 4 PM)</SelectItem>
                <SelectItem value="evening">Evening (4 PM – 7 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
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
