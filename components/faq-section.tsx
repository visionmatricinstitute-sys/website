import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

const FAQS = [
  {
    question: "Are classes live or pre-recorded?",
    answer:
      "Our courses are delivered as live, instructor-led online sessions — not pre-recorded videos you watch on your own.",
  },
  {
    question: "How long do courses take?",
    answer:
      "It depends on the course — anywhere from 2 months (Computer Skills) to 4–8 months (BIM, Electrical Design). Each course page lists its specific duration.",
  },
  {
    question: "Will I receive a certificate?",
    answer: "Yes — you receive a Vision Matrix Institute certificate of completion once you finish a course.",
  },
  {
    question: "What does placement support actually include?",
    answer:
      "We provide resume guidance, interview preparation, and placement assistance to help job-ready graduates connect with employers. We don't guarantee a job or a specific placement rate — the support is real, but the outcome depends on you.",
  },
  {
    question: "How much do courses cost?",
    answer:
      "Fees vary by course. Message us on WhatsApp or fill out the admission form and our team will share current pricing for the course you're interested in.",
  },
  {
    question: "Do I need my own laptop and software?",
    answer:
      "Yes, you'll need a laptop capable of running the relevant software (AutoCAD, Revit, etc.). We guide you through software setup during onboarding.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Frequently Asked Questions</h2>
        </FadeIn>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
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
  )
}
