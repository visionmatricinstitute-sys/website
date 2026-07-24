import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoCta } from "@/components/demo-cta"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, BookOpen, MessageCircle } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { Button } from "@/components/ui/button"

const title = "About Us"
const description =
  "Vision Matrix Institute is an online technical training institute focused on data center electrical design, BIM/Revit, AutoCAD, and practical computer skills."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">
              About Vision Matrix Institute
            </h1>
            <p className="text-lg text-white/70 font-serif leading-relaxed">
              We teach the specific, practical skills that get engineers hired for data center electrical design,
              BIM/Revit modeling, drafting, and workplace computing — entirely online.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl space-y-12">
            <FadeIn>
              <h2 className="text-2xl lg:text-3xl font-black font-sans text-foreground mb-4">Why we exist</h2>
              <p className="text-muted-foreground font-serif leading-relaxed mb-4">
                Founded in 2025, Vision Matrix Institute was built around a simple observation: the tools and
                standards used in electrical design, BIM coordination, and drafting are changing faster than most
                traditional courses teach them. We focus specifically on the niche of data center electrical
                design and adjacent technical skills — not a broad, generic curriculum — because we think depth in
                a real, in-demand specialization serves students better than breadth.
              </p>
              <p className="text-muted-foreground font-serif leading-relaxed">
                We're a young institute, and we'd rather say that plainly than inflate our track record. What we
                can promise is a curriculum built around real deliverables — single-line diagrams, cable
                schedules, BIM models — not just slides and multiple-choice tests.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h2 className="text-2xl lg:text-3xl font-black font-sans text-foreground mb-4">Our founder's note</h2>
              <Card className="bg-muted/40">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                    We're still putting together a proper founder's story and team page for this section — check
                    back soon, or ask us directly on WhatsApp if you'd like to know more about who's behind Vision
                    Matrix Institute before you enroll.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="h-full">
                  <CardContent className="p-6 space-y-3 text-center">
                    <div className="flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mx-auto">
                      <Target className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-bold font-sans text-foreground">Our Mission</h3>
                    <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                      Teach the specific, practical skills that get engineers hired for real technical roles —
                      not generic theory.
                    </p>
                  </CardContent>
                </Card>
                <Card className="h-full">
                  <CardContent className="p-6 space-y-3 text-center">
                    <div className="flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mx-auto">
                      <Eye className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-bold font-sans text-foreground">Our Vision</h3>
                    <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                      Become known for depth in a specific niche — data center electrical design and BIM — rather
                      than breadth across everything.
                    </p>
                  </CardContent>
                </Card>
                <Card className="h-full">
                  <CardContent className="p-6 space-y-3 text-center">
                    <div className="flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mx-auto">
                      <BookOpen className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-bold font-sans text-foreground">How We Teach</h3>
                    <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                      Live, instructor-led online sessions built around producing real deliverables — not
                      pre-recorded lectures.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="relative bg-navy py-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="relative container mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-2xl lg:text-4xl font-black font-sans text-white mb-3">Have questions for us directly?</h2>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
                asChild
              >
                <a href="https://wa.me/919930259997" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp +91 99302 59997
                </a>
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <DemoCta />
    </div>
  )
}
