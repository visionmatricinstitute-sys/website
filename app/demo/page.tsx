import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DemoForm } from "@/components/demo-form"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarCheck } from "lucide-react"
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

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Header />
      <main>
        <section className="relative bg-navy py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="relative container mx-auto px-4 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <CalendarCheck className="h-4 w-4" />
              Free Demo Class
            </div>
            <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">
              Electrical Design Demo Class Registration
            </h1>
            <p className="text-lg text-white/70 font-serif leading-relaxed">
              Tell us about yourself and we&apos;ll call you to schedule your free, live demo class — no
              obligation, no payment required.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardContent className="p-6 lg:p-8">
                <DemoForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
