import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Users,
  Palette,
  Code,
  Megaphone,
  Monitor,
  DraftingCompassIcon as Drafting,
  Building,
} from "lucide-react"

const popularCourses = [
  {
    id: 1,
    title: "Computer Skills & Applications",
    description:
      "Master essential computer skills including basic operations, MS Office suite, internet tools, and digital literacy for modern workplace requirements.",
    icon: Monitor,
    duration: "2-4 months",
    students: "500+",
    level: "Beginner to Advanced",
    features: ["Basic Computer", "MS Office", "Internet Tools", "Digital Literacy"],
    image: "/computer-skills-training.png",
    isUpcoming: false,
  },
  {
    id: 2,
    title: "Drafting & Design (CAD)",
    description:
      "Professional AutoCAD training covering 2D drafting and 3D modeling for engineering, architecture, and design applications.",
    icon: Drafting,
    duration: "3-6 months",
    students: "300+",
    level: "Intermediate to Advanced",
    features: ["AutoCAD 2D", "AutoCAD 3D", "Technical Drawing", "Design Principles"],
    image: "/autocad-training.png",
    isUpcoming: false,
  },
  {
    id: 3,
    title: "BIM (Building Information Modeling)",
    description:
      "Advanced BIM training with Revit MEP focusing on building information modeling for construction and engineering projects.",
    icon: Building,
    duration: "4-8 months",
    students: "200+",
    level: "Advanced",
    features: ["Revit MEP", "3D Modeling", "Project Coordination", "BIM Standards"],
    image: "/bim-training.png",
    isUpcoming: false,
  },
]

const upcomingCourses = [
  {
    id: 4,
    title: "Graphic Design",
    description:
      "Creative graphic design training covering visual communication, branding, and digital design using industry-standard software.",
    icon: Palette,
    duration: "4-6 months",
    students: "Coming Soon",
    level: "Beginner to Intermediate",
    features: ["Adobe Photoshop", "Adobe Illustrator", "Logo Design", "Brand Identity"],
    image: "/graphic-design-training.png",
    isUpcoming: true,
  },
  {
    id: 5,
    title: "Web Development",
    description:
      "Comprehensive web development training covering front-end and back-end technologies to build modern websites and applications.",
    icon: Code,
    duration: "6-9 months",
    students: "Coming Soon",
    level: "Intermediate to Advanced",
    features: ["HTML/CSS", "JavaScript", "React", "Node.js"],
    image: "/web-development-training.png",
    isUpcoming: true,
  },
  {
    id: 6,
    title: "Digital Marketing",
    description:
      "Master digital marketing strategies including social media marketing, SEO, content marketing, and online advertising.",
    icon: Megaphone,
    duration: "3-5 months",
    students: "Coming Soon",
    level: "Beginner to Intermediate",
    features: ["SEO", "Social Media Marketing", "Google Ads", "Content Strategy"],
    image: "/digital-marketing-training.png",
    isUpcoming: true,
  },
]

const CourseCard = ({ course }: { course: any }) => {
  const IconComponent = course.icon
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-accent text-accent-foreground">{course.level}</Badge>
        </div>
        {course.isUpcoming && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-orange-500 text-white">Coming Soon</Badge>
          </div>
        )}
      </div>

      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
            <IconComponent className="h-6 w-6 text-accent" />
          </div>
          <CardTitle className="text-xl font-bold font-sans text-foreground">{course.title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-muted-foreground font-serif leading-relaxed">{course.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{course.students}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Key Features:</h4>
          <div className="flex flex-wrap gap-2">
            {course.features.map((feature: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={course.isUpcoming}>
            {course.isUpcoming ? "Notify Me" : "Enroll Now"}
          </Button>
          <Button
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function CoursesSection() {
  return (
    <section id="courses" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Our Courses</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of industry-relevant courses designed to give you the skills employers are
            looking for. From established programs to exciting new offerings.
          </p>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold font-sans text-foreground mb-4">Popular Courses</h3>
            <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
              Our most sought-after programs with proven track records of student success and industry recognition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold font-sans text-foreground mb-4">Upcoming Courses</h3>
            <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
              Exciting new programs launching soon to keep you ahead in the digital age. Get notified when enrollment
              opens!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            Get Notified When New Courses Launch
          </Button>
        </div>
      </div>
    </section>
  )
}
