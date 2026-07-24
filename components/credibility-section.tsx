import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, MessageSquareQuote } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

export function CredibilitySection() {
  return (
    <section id="why-us" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Who You'll Learn From</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            We're building out detailed instructor profiles and student stories as our programs grow. Here's what
            we can tell you honestly right now.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn delay={0}>
            <Card className="h-full">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mx-auto">
                  <GraduationCap className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-sans text-foreground">Instructors</h3>
                <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                  Our courses are taught live by practicing engineers, not pre-recorded by a generic narrator.
                  Detailed instructor profiles are being added to this page — in the meantime, ask us who's
                  teaching a specific course over WhatsApp before you enroll.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="h-full">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mx-auto">
                  <MessageSquareQuote className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-sans text-foreground">Student Stories</h3>
                <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                  We're collecting real student testimonials and outcomes as cohorts complete their programs and
                  will publish them here. Want to talk to a current student first? Reach out and we'll connect
                  you.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
