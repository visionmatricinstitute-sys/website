import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoForm } from "@/components/demo-form"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarCheck, PhoneCall, Video, GraduationCap } from "lucide-react"
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

const HOW_IT_WORKS = [
  {
    icon: CalendarCheck,
    title: "Book your free demo",
    description: "Tell us a bit about your background — takes under 2 minutes.",
  },
  {
    icon: PhoneCall,
    title: "We call to schedule",
    description: "Our team calls you within 24 hours to fix a convenient time.",
  },
  {
    icon: Video,
    title: "Attend the live class",
    description: "A real instructor-led session — not a recording, no obligation.",
  },
  {
    icon: GraduationCap,
    title: "Enroll & start learning",
    description: "Liked what you saw? Join the program and start building real skills.",
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <section className="relative bg-navy py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent/25 blur-[110px]" />

          <div className="relative container mx-auto px-4">
            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 items-start">
              {/* Left: pitch + how it works */}
              <div className="lg:pt-4">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                  <CalendarCheck className="h-4 w-4" />
                  Free Demo Class
                </div>
                <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">
                  See a Real Class Before You Enroll
                </h1>
                <p className="text-lg text-white/70 font-serif leading-relaxed mb-10 max-w-lg">
                  Tell us about yourself and we&apos;ll call you to schedule your free, live demo class — no
                  obligation, no payment required.
                </p>

                <div className="space-y-6">
                  {HOW_IT_WORKS.map((item, index) => {
                    const Icon = item.icon
                    const isLast = index === HOW_IT_WORKS.length - 1
                    return (
                      <div key={item.title} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 shrink-0">
                            <Icon className="h-5 w-5 text-accent-tint" />
                          </div>
                          {!isLast && <div className="w-px flex-1 bg-white/15 my-2" />}
                        </div>
                        <div className={isLast ? "" : "pb-2"}>
                          <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-white/60 font-serif">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right: the form */}
              <Card className="shadow-2xl">
                <CardContent className="p-6 lg:p-8">
                  <DemoForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
