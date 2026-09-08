"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Phone, Mail, Clock, MessageCircle, Video, PlayCircle, Users2 } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

const CONTACT_CARDS = [
  {
    icon: Globe,
    iconClassName: "text-accent",
    title: "100% Online Institute",
    body: "We operate fully online — live, instructor-led virtual classes accessible from anywhere, anytime.",
  },
  {
    icon: Phone,
    iconClassName: "text-accent",
    title: "Call Us",
    body: "+91 9930259997",
  },
  {
    icon: Mail,
    iconClassName: "text-accent",
    title: "Email Us",
    body: (
      <a
        href="mailto:info@visionmatrixinstitute.com"
        className="text-muted-foreground font-serif rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        info@visionmatrixinstitute.com
      </a>
    ),
  },
  {
    icon: MessageCircle,
    iconClassName: "text-green-500",
    title: "WhatsApp",
    body: (
      <>
        <p className="text-muted-foreground font-serif mb-3">
          Get instant support and quick responses to your queries.
        </p>
        <button
          onClick={() => window.open("https://wa.me/919930259997", "_blank")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </button>
      </>
    ),
  },
  {
    icon: Clock,
    iconClassName: "text-accent",
    title: "Office Hours",
    body: (
      <>
        Monday - Saturday: 9:00 AM - 6:00 PM
        <br />
        Sunday: Closed
      </>
    ),
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Get in touch with us for admissions, course information, or any queries. We're here to help you start your
            journey.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {CONTACT_CARDS.map((card, index) => (
              <FadeIn key={card.title} delay={index * 0.08}>
                <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <CardHeader>
                    <CardTitle className="font-sans flex items-center gap-3">
                      <card.icon className={`h-6 w-6 ${card.iconClassName}`} />
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof card.body === "string" ? (
                      <p className="text-muted-foreground font-serif">{card.body}</p>
                    ) : (
                      card.body
                    )}
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Online Learning Experience */}
          <FadeIn delay={0.15} className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-sans">The Online Learning Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg shrink-0">
                    <Video className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Live Interactive Classes</h4>
                    <p className="text-sm text-muted-foreground font-serif">
                      Real-time sessions with instructors, not pre-recorded videos alone.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg shrink-0">
                    <PlayCircle className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Recorded Sessions</h4>
                    <p className="text-sm text-muted-foreground font-serif">
                      Every class is recorded so you can revisit lessons anytime.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg shrink-0">
                    <Users2 className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Learn From Anywhere</h4>
                    <p className="text-sm text-muted-foreground font-serif">
                      Join from any city or country — all you need is an internet connection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
