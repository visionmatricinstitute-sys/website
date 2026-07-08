"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, FileText, CreditCard, GraduationCap, Loader2 } from "lucide-react"

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  course: "",
  education: "",
  message: "",
}

export function AdmissionSection() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  function updateField(field: keyof typeof EMPTY_FORM, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.course || !form.education) {
      toast.error("Please fill in all required fields.")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      toast.success("Application submitted! Our team will contact you within 24 hours.")
      setForm(EMPTY_FORM)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="admission" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Start Your Journey Today</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Ready to transform your career? Fill out our admission form and take the first step towards a brighter
            future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Admission Process */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold font-sans text-foreground mb-6">Simple Admission Process</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full flex-shrink-0">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Fill Application Form</h4>
                  <p className="text-muted-foreground font-serif">
                    Complete the online application form with your personal and educational details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Document Verification</h4>
                  <p className="text-muted-foreground font-serif">
                    Submit required documents for verification and eligibility check.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Fee Payment</h4>
                  <p className="text-muted-foreground font-serif">
                    Pay the course fee through our secure online payment gateway or connect with an online academic
                    advisor for support.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">4. Start Learning</h4>
                  <p className="text-muted-foreground font-serif">
                    Begin your journey with our expert instructors on our modern virtual learning platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-sans">Admission Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-sm font-serif">10th/12th Pass Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-sm font-serif">Valid ID Proof (Aadhar/PAN/Passport)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-sm font-serif">Recent Passport Size Photographs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-sm font-serif">Basic Computer Knowledge (Preferred)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admission Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-2xl font-sans text-foreground">Admission Form</CardTitle>
              <p className="text-muted-foreground font-serif">
                Fill out this form and our team will contact you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Interested Course *</Label>
                  <Select value={form.course} onValueChange={(v) => updateField("course", v)}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical-design-data-center">
                        Electrical Design – Data Center Specialist
                      </SelectItem>
                      <SelectItem value="computer-skills">Computer Skills & Applications</SelectItem>
                      <SelectItem value="cad">AutoCAD</SelectItem>
                      <SelectItem value="bim">BIM (Building Information Modeling)</SelectItem>
                      <SelectItem value="graphic-design">Graphic Design</SelectItem>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Educational Qualification *</Label>
                  <Select value={form.education} onValueChange={(v) => updateField("education", v)}>
                    <SelectTrigger id="education">
                      <SelectValue placeholder="Select your qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th Pass</SelectItem>
                      <SelectItem value="12th">12th Pass</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your goals and expectations..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center font-serif">
                  By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
