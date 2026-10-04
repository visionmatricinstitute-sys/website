"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, CreditCard, MessageCircle, Mail } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { MagneticButton } from "@/components/motion/magnetic-button"
import {
  COHORTS,
  PREREQUISITES,
  ENROLL_STEPS,
  WHO_SHOULD_JOIN,
  PROGRAM_MODULES,
  PROGRAM_TOTAL_HOURS,
  COURSE_FEE,
} from "@/lib/program-data"

export function ProgramEnroll() {
  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">05 · Who Should Enroll</Badge>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
              Built for four kinds of engineers.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {COHORTS.map((cohort, index) => (
              <FadeIn key={cohort.title} delay={index * 0.08}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <Badge variant="secondary" className="text-xs">
                      {cohort.years}
                    </Badge>
                    <h3 className="font-bold font-sans text-foreground">{cohort.title}</h3>
                    <p className="text-sm text-muted-foreground font-serif leading-relaxed">{cohort.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="max-w-3xl mx-auto mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold font-sans text-foreground mb-3">This program is also a strong fit if you're...</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {WHO_SHOULD_JOIN.map((w) => (
                    <div key={w} className="flex items-start gap-2 text-sm text-muted-foreground font-serif">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {w}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn className="max-w-2xl mx-auto">
            <Card className="bg-muted/40">
              <CardContent className="p-6">
                <h3 className="font-bold font-sans text-foreground mb-3">Prerequisites</h3>
                <div className="space-y-2">
                  {PREREQUISITES.map((p) => (
                    <div key={p} className="flex items-start gap-2 text-sm text-muted-foreground font-serif">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {p}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">06 · Investment</Badge>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">One course. One fee.</h2>
          </FadeIn>

          <FadeIn className="max-w-2xl mx-auto mb-16">
            <Card className="border-accent shadow-lg shadow-accent/20">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-sans text-foreground">Electrical Design – Data Center Specialist</h3>
                  <div className="text-3xl font-black font-sans text-foreground mt-2">{COURSE_FEE}</div>
                  <p className="text-xs text-muted-foreground font-serif mt-1">Fees may be revised in future.</p>
                </div>
                <div className="space-y-2">
                  {[
                    `${PROGRAM_MODULES.length} modules, ${PROGRAM_TOTAL_HOURS} hours`,
                    "Live, instructor-led classes taught by practising engineers",
                    "Every class is recorded so you can revisit it",
                    "Assignments and downloadable module handbooks",
                    "Vision Matrix Institute certificate of completion, with a Certificate ID anyone can verify",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-foreground font-serif">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <MagneticButton>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/checkout/electrical-design-data-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Enroll & Pay {COURSE_FEE}
                      </Link>
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                      onClick={() => window.open("https://wa.me/919930259997", "_blank")}
                    >
                      Enquire on WhatsApp
                    </Button>
                  </MagneticButton>
                </div>
                <p className="text-xs text-center text-muted-foreground font-serif">
                  Prefer to talk first?{" "}
                  <Link href="/#admission" className="text-foreground underline underline-offset-4 hover:no-underline">
                    Apply without paying yet
                  </Link>
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn className="text-center mb-8">
            <h3 className="text-2xl font-bold font-sans text-foreground">How to enrol — three simple steps</h3>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {ENROLL_STEPS.map((step) => (
              <div key={step.number} className="text-center">
                <div className="flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mx-auto mb-4 text-accent font-bold font-sans text-lg">
                  {step.number}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground font-serif">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-navy py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-accent/20 blur-[110px]" />
        <div className="relative container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-white mb-4">Ready to Specialise?</h2>
            <p className="text-lg text-white/70 font-serif mb-2 max-w-xl mx-auto">
              The data centers of 2035 are being designed today. The engineers who design them start here.
            </p>
            <p className="text-white/60 font-serif mb-8">Your seat in the next cohort is one message away.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
                  onClick={() => window.open("https://wa.me/919930259997", "_blank")}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp +91 99302 59997
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                  onClick={() => window.open("mailto:info@visionmatrixinstitute.com", "_blank")}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Button>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
