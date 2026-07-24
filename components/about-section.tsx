import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Users, Trophy } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            About Vision Matrix Institute
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Founded in 2025, Vision Matrix Institute has been empowering students with technical education online, reaching learners across India and beyond. We are your gateway to industry-relevant skills and career success.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <FadeIn>
            <img
              src="/modern-tech-classroom.png"
              alt="Vision Matrix Institute online learning"
              className="rounded-lg shadow-lg w-full"
            />
          </FadeIn>
          <FadeIn delay={0.15} className="space-y-6">
            <h3 className="text-2xl font-bold font-sans text-foreground">Empowering Students Since 2025</h3>
            <p className="text-muted-foreground font-serif leading-relaxed">
              Vision Matrix Institute has been at the forefront of online skill development, delivering live,
              instructor-led training to students wherever they are. Our modern virtual classrooms, experienced
              faculty, and industry-aligned curriculum ensure that our students are job-ready from day one.
            </p>
            <p className="text-muted-foreground font-serif leading-relaxed">
              We specialize in cutting-edge technologies including Computer Applications, CAD/CAM, BIM (Building
              Information Modeling), and various certification programs that are highly valued in today's competitive
              job market.
            </p>
          </FadeIn>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn delay={0}>
            <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold font-sans text-foreground">Our Mission</h4>
                <p className="text-sm text-muted-foreground font-serif">
                  To provide quality technical education that empowers students with industry-relevant skills and prepares
                  them for successful careers in the digital age.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold font-sans text-foreground">Our Vision</h4>
                <p className="text-sm text-muted-foreground font-serif">
                  To be the leading online technical education institute, recognized for excellence, innovation, and
                  transforming lives through quality education.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold font-sans text-foreground">Expert Faculty</h4>
                <p className="text-sm text-muted-foreground font-serif">
                  Learn from industry professionals with years of practical experience and academic excellence.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto">
                  <Trophy className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold font-sans text-foreground">Placement Support</h4>
                <p className="text-sm text-muted-foreground font-serif">
                  Resume guidance, interview preparation, and placement assistance to help job-ready
                  graduates connect with employers.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
