import Link from "next/link"
import Image from "next/image"
import { Target, Eye, Trophy } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To provide quality technical education that empowers students with industry-relevant skills and prepares them for successful careers in the digital age.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be the leading online technical education institute, recognized for excellence, innovation, and transforming lives through quality education.",
  },
  {
    icon: Trophy,
    title: "Placement Support",
    text: "Resume guidance, interview preparation, and placement assistance to help job-ready graduates connect with employers.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-background">
      <div className="grid lg:grid-cols-2 items-stretch">
        <FadeIn className="relative min-h-[420px] lg:min-h-full">
          <Image
            src="/modern-tech-classroom.png"
            alt="Vision Matrix Institute online learning"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </FadeIn>

        <div className="py-20 px-4 lg:px-16">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-serif font-medium text-foreground mb-4 leading-tight">
              About Vision Matrix Institute
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-10">
              Founded in 2025, Vision Matrix Institute is India's specialist data center electrical design training
              institute, reaching learners across India and beyond. We build real, job-ready data center skills —
              entirely online.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="text-2xl font-bold font-sans text-foreground mb-4">Empowering Students Since 2025</h3>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Vision Matrix Institute has been at the forefront of online data center skills training, delivering
              live, instructor-led classes to students wherever they are. Our modern virtual classrooms, experienced
              faculty, and industry-aligned curriculum ensure that our students are job-ready from day one.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              We specialize in data center electrical design, BIM (Building Information Modeling) with Revit MEP,
              and AutoCAD — the specific technical skills employers are hiring for in the data center industry
              today.
            </p>
            <Link href="/about" className="inline-block text-accent font-semibold hover:underline mb-10">
              Read our full story →
            </Link>
          </FadeIn>

          <div className="space-y-6 border-t border-border pt-10">
            {PILLARS.map((pillar, index) => (
              <FadeIn key={pillar.title} delay={0.1 + index * 0.08} className="flex gap-4">
                <div className="flex items-center justify-center w-11 h-11 shrink-0 bg-accent/10 rounded-full">
                  <pillar.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold font-sans text-foreground mb-1">{pillar.title}</h4>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{pillar.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
