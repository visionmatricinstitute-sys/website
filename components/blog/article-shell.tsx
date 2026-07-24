import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MessageCircle } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

export interface ArticleFaq {
  question: string
  answer: string
}

export interface ArticleShellProps {
  category: string
  title: string
  description: string
  children: ReactNode
  faqs: ArticleFaq[]
  whatsappMessage: string
}

export function ArticleShell({ category, title, description, children, faqs, whatsappMessage }: ArticleShellProps) {
  const waHref = `https://wa.me/919930259997?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <>
      <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent/25 blur-[110px]" />
        <div className="relative container mx-auto px-4 max-w-3xl">
          <Badge className="bg-accent/10 text-accent mb-6 hover:bg-accent/10">{category}</Badge>
          <h1 className="text-3xl lg:text-5xl font-black font-sans text-white leading-tight mb-4">{title}</h1>
          <p className="text-lg text-white/70 font-serif leading-relaxed">{description}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl space-y-10 font-serif text-foreground leading-relaxed [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-black [&_h2]:font-sans [&_h2]:text-foreground [&_h2]:mb-4 [&_h2]:mt-2 [&_p]:text-muted-foreground [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:text-muted-foreground [&_li]:leading-relaxed">
          {children}

          <section id="faq" className="pt-6">
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
          </section>
        </div>
      </section>

      <section className="relative bg-navy py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <div className="relative container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-2xl lg:text-4xl font-black font-sans text-white mb-3">Want to learn this properly?</h2>
            <p className="text-white/60 font-serif mb-6">
              This topic is covered in depth in our Electrical Design – Data Center Specialist program.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
              asChild
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask us on WhatsApp
              </a>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
