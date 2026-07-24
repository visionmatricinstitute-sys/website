"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MessageCircle, Clock, BarChart3, Video } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { MagneticButton } from "@/components/motion/magnetic-button"
import Link from "next/link"

export interface SimpleProgramFaq {
  question: string
  answer: string
}

export interface SimpleProgramPageProps {
  title: string
  tagline: string
  description: string
  duration: string
  level: string
  format: string
  audience: string[]
  tools: string[]
  outcomes: string[]
  faqs: SimpleProgramFaq[]
  whatsappMessage: string
}

export function SimpleProgramPage({
  title,
  tagline,
  description,
  duration,
  level,
  format,
  audience,
  tools,
  outcomes,
  faqs,
  whatsappMessage,
}: SimpleProgramPageProps) {
  const waHref = `https://wa.me/919930259997?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent/25 blur-[110px] animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-secondary/20 blur-[110px] animate-float-slower" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              {tagline}
            </div>

            <h1 className="text-4xl lg:text-6xl font-black font-sans text-white leading-tight text-balance mb-4">
              {title}
            </h1>

            <p className="text-lg text-white/70 font-serif leading-relaxed max-w-2xl mb-8">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <MagneticButton>
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
                  onClick={() => window.open(waHref, "_blank")}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Enquire on WhatsApp
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
                  <Link href="/#admission">Apply Now</Link>
                </Button>
              </MagneticButton>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4 px-2">
                <Clock className="h-5 w-5 text-accent mx-auto mb-1.5" />
                <div className="text-sm font-bold text-white">{duration}</div>
                <div className="text-xs text-white/60">Duration</div>
              </div>
              <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4 px-2">
                <BarChart3 className="h-5 w-5 text-accent mx-auto mb-1.5" />
                <div className="text-sm font-bold text-white">{level}</div>
                <div className="text-xs text-white/60">Level</div>
              </div>
              <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4 px-2">
                <Video className="h-5 w-5 text-accent mx-auto mb-1.5" />
                <div className="text-sm font-bold text-white">{format}</div>
                <div className="text-xs text-white/60">Format</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for + tools */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <FadeIn>
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Who This Is For</Badge>
            <h2 className="text-2xl lg:text-3xl font-black font-sans text-foreground mb-6">Is this course for you?</h2>
            <div className="space-y-3">
              {audience.map((a) => (
                <div key={a} className="flex items-start gap-2 text-muted-foreground font-serif">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  {a}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Tools & Skills</Badge>
            <h2 className="text-2xl lg:text-3xl font-black font-sans text-foreground mb-6">What you'll work with</h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <Badge key={t} variant="secondary" className="text-sm py-1.5 px-3">
                  {t}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Outcomes</Badge>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">What you'll be able to do</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {outcomes.map((o, index) => (
              <FadeIn key={o} delay={index * 0.08}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-serif leading-relaxed">{o}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Frequently Asked Questions</h2>
          </FadeIn>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={faq.question} delay={(index % 4) * 0.05}>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold font-sans text-foreground mb-1.5">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground font-serif leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-navy py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-accent/20 blur-[110px]" />
        <div className="relative container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-black font-sans text-white mb-4">Ready to get started?</h2>
            <p className="text-white/60 font-serif mb-8">Message us on WhatsApp and we'll answer your questions directly.</p>
            <MagneticButton>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
                onClick={() => window.open(waHref, "_blank")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp +91 99302 59997
              </Button>
            </MagneticButton>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
