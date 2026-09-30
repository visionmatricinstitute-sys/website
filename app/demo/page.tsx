import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoForm } from "@/components/demo-form"
import { Card, CardContent } from "@/components/ui/card"
import {
  CalendarCheck,
  Users,
  Wrench,
  MessageCircle,
  TrendingUp,
  Globe,
  Video,
  CheckCircle2,
  Briefcase,
} from "lucide-react"
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema"

const title = "Book a Free Electrical Design Demo Class | Vision Matrix Institute"
const description =
  "Register for a free, live demo class covering data center electrical design fundamentals — tell us about your background and we'll call you to schedule it."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/demo" },
  openGraph: {
    type: "website",
    url: "/demo",
    title,
    description,
    images: [{ url: "/electrical-design-data-center.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/electrical-design-data-center.jpg"] },
}

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Book a Free Demo", path: "/demo" },
])

const FEATURES = [
  {
    icon: Users,
    title: "Learn from Industry Experts",
    description: "Taught live by practicing engineers, not pre-recorded videos.",
  },
  {
    icon: Wrench,
    title: "See Real Design Workflows",
    description: "SLD, GAD, transformer/UPS/DG sizing and more, worked through live.",
  },
  {
    icon: MessageCircle,
    title: "Ask Questions Live",
    description: "Real-time sessions — get your doubts answered on the spot.",
  },
  {
    icon: TrendingUp,
    title: "Explore Career Opportunities",
    description: "Resume guidance, interview prep and placement support.",
  },
]

const QUICK_FACTS = [
  { icon: Globe, title: "100% Online", description: "Live virtual classes, accessible anywhere." },
  { icon: Video, title: "Live Instructor-Led", description: "Real-time sessions, not recordings." },
  { icon: CheckCircle2, title: "Free, No Obligation", description: "No payment required to attend." },
  { icon: Briefcase, title: "Placement Support", description: "Resume, interview prep, job guidance." },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/hero-data-center.jpg"
              alt="Vision Matrix Institute — live data center electrical design training"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30" />
          </div>

          <div className="relative container mx-auto px-4 py-16 lg:py-24">
            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 items-start">
              {/* Left: pitch + features */}
              <div className="lg:pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-6 tracking-wide">
                  <span>LIVE</span>
                  <span className="text-accent-tint">|</span>
                  <span>INTERACTIVE</span>
                  <span className="text-accent-tint">|</span>
                  <span>INDUSTRY FOCUSED</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-black font-sans text-white leading-tight mb-4">
                  Experience Real
                  <br />
                  Data Center <span className="text-accent-tint">Learning</span>
                </h1>
                <p className="text-lg text-white/70 font-serif leading-relaxed mb-10 max-w-lg">
                  Join a free demo class and see how VMI makes data center electrical design simple,
                  practical and career focused.
                </p>

                <div className="space-y-6">
                  {FEATURES.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="flex gap-4 items-start">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 shrink-0">
                          <Icon className="h-5 w-5 text-accent-tint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-white/60 font-serif">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right: the form */}
              <Card className="shadow-2xl bg-white/95 backdrop-blur">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarCheck className="h-5 w-5 text-accent" />
                    <span className="text-sm font-semibold text-accent">Book a FREE Demo Class</span>
                  </div>
                  <DemoForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-10 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {QUICK_FACTS.map((fact) => {
                const Icon = fact.icon
                return (
                  <div key={fact.title} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-accent/10 shrink-0">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-bold font-sans text-foreground text-sm">{fact.title}</div>
                      <div className="text-xs text-muted-foreground">{fact.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
