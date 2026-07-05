"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Phone, Mail, Clock, MessageCircle, Video, PlayCircle, Users2 } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Get in touch with us for admissions, course information, or any queries. We're here to help you start your
            journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-3">
                  <Globe className="h-6 w-6 text-accent" />
                  100% Online Institute
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  We operate fully online — live, instructor-led virtual classes accessible from anywhere, anytime.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-3">
                  <Phone className="h-6 w-6 text-accent" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">+91 9930259997</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-3">
                  <Mail className="h-6 w-6 text-accent" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">info.visionmatrix@gmail.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-green-500" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif mb-3">
                  Get instant support and quick responses to your queries.
                </p>
                <button
                  onClick={() => window.open("https://wa.me/919930259997", "_blank")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-3">
                  <Clock className="h-6 w-6 text-accent" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Monday - Saturday: 9:00 AM - 6:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Online Learning Experience */}
          <div className="space-y-6">
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
          </div>
        </div>
      </div>
    </section>
  )
}
