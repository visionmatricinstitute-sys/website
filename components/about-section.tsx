import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Users, Trophy } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            About Vision Matrix Institute
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Founded in 2025, Vision Matrix Institute has been empowering students with technical education in Motihari, Bihar. We are your gateway to industry-relevant skills and career success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/bihar-educational-institute.png"
              alt="Vision Matrix Institute Campus"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-sans text-foreground">Empowering Students Since 2025</h3>
            <p className="text-muted-foreground font-serif leading-relaxed">
              With over 8 years of excellence in technical education, Vision Matrix Institute has been at the forefront
              of skill development in Bihar. Our state-of-the-art facilities, experienced faculty, and industry-aligned
              curriculum ensure that our students are job-ready from day one.
            </p>
            <p className="text-muted-foreground font-serif leading-relaxed">
              We specialize in cutting-edge technologies including Computer Applications, CAD/CAM, BIM (Building
              Information Modeling), and various certification programs that are highly valued in today's competitive
              job market.
            </p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
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

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-bold font-sans text-foreground">Our Vision</h4>
              <p className="text-sm text-muted-foreground font-serif">
                To be the leading technical education institute in Bihar, recognized for excellence, innovation, and
                transforming lives through quality education.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
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

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-bold font-sans text-foreground">Proven Results</h4>
              <p className="text-sm text-muted-foreground font-serif">
                95% placement rate with students working in top companies across India and abroad.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
