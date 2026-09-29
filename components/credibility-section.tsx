import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, MessageSquareQuote } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

export function CredibilitySection() {
  return (
    <section id="why-us" className="py-20 bg-navy">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-sans font-black uppercase text-white mb-4">Who You'll Learn From</h2>
          <p className="text-lg text-white/70 font-body max-w-3xl mx-auto leading-relaxed">
            We're building out detailed instructor profiles and student stories as our programs grow. Here's what
            we can tell you honestly right now.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FadeIn delay={0}>
            <Card className="h-full bg-white/5 border-white/10">
              <CardContent className="p-8 space-y-4">
                <MessageSquareQuote className="h-10 w-10 text-accent-tint" />
                <h3 className="text-xl font-bold font-sans uppercase text-white">Instructors</h3>
                <p className="text-sm text-white/70 font-body leading-relaxed">
                  Our courses are taught live by practicing engineers, not pre-recorded by a generic narrator.
                  Detailed instructor profiles are being added to this page — in the meantime, ask us who's
                  teaching a specific course over WhatsApp before you enroll.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="h-full bg-white/5 border-white/10">
              <CardContent className="p-8 space-y-4">
                <GraduationCap className="h-10 w-10 text-accent-tint" />
                <h3 className="text-xl font-bold font-sans uppercase text-white">Student Stories</h3>
                <p className="text-sm text-white/70 font-body leading-relaxed">
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
