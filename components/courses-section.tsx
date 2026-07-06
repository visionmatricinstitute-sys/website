import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/motion/fade-in"
import { CourseThumbnail } from "@/components/course-thumbnail"
import {
  GraduationCap,
  Sparkles,
  Clock,
  Users,
  Palette,
  Code,
  Megaphone,
  Monitor,
  DraftingCompassIcon as Drafting,
  Building,
  Zap,
  Brain,
  Terminal,
  Wifi,
  Workflow,
  Sun,
  BatteryCharging,
  Bot,
  BrainCircuit,
  CircuitBoard,
} from "lucide-react"

const popularCourses = [
  {
    id: 4,
    title: "Electrical Design – Data Center Specialist",
    description:
      "Specialized training in electrical design for data centers — single line diagrams, panel GADs, cable and equipment sizing, and short-circuit studies aligned with IEC and data center standards.",
    icon: Zap,
    duration: "4-6 months",
    students: "New",
    level: "Intermediate to Advanced",
    features: ["SLD & GAD Drawings", "Transformer/UPS/DG Sizing", "Short-Circuit Studies", "TIA-942 & IEC Standards"],
    image: "/electrical-design-data-center.jpg",
    isUpcoming: false,
  },
  {
    id: 2,
    title: "AutoCAD",
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
    image: "/bim-training.jpg",
    isUpcoming: false,
  },
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
    image: "/computer-training-ms-office.png",
    isUpcoming: false,
  },
]

const upcomingCourses = [
  {
    id: 11,
    title: "Solar Design Expert",
    description:
      "End-to-end solar PV system design — load assessment, panel/inverter sizing, and grid-tie/off-grid configurations.",
    icon: Sun,
    duration: "3-5 months",
    students: "Coming Soon",
    level: "Intermediate to Advanced",
    features: ["PV System Design", "Inverter Sizing", "Grid-Tie Systems", "Solar Standards"],
    image: "/solar-design-expert.jpg",
    isUpcoming: true,
  },
  {
    id: 16,
    title: "Graphic Design",
    description:
      "Creative graphic design training covering visual communication, branding, and digital design using industry-standard software.",
    icon: Palette,
    duration: "4-6 months",
    students: "Coming Soon",
    level: "Beginner to Intermediate",
    features: ["Adobe Photoshop", "Adobe Illustrator", "Logo Design", "Brand Identity"],
    image: "/adobe-graphic-design-training.png",
    isUpcoming: true,
  },
  {
    id: 17,
    title: "Web Development",
    description:
      "Comprehensive web development training covering front-end and back-end technologies to build modern websites and applications.",
    icon: Code,
    duration: "6-9 months",
    students: "Coming Soon",
    level: "Intermediate to Advanced",
    features: ["HTML/CSS", "JavaScript", "React", "Node.js"],
    image: "/web-dev-training-multi-screen.png",
    isUpcoming: true,
  },
  {
    id: 18,
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
  {
    id: 7,
    title: "Artificial Intelligence for Engineers",
    description:
      "Applied AI concepts and tools for engineering workflows — from automation to intelligent design assistance.",
    icon: Brain,
    duration: "3-5 months",
    students: "Coming Soon",
    level: "Intermediate",
    features: ["AI Fundamentals", "Engineering Automation", "Prompt Engineering", "AI Tools"],
    isUpcoming: true,
  },
  {
    id: 8,
    title: "Python Programming",
    description:
      "Learn Python from the ground up, covering scripting, data handling, and automation for engineering and IT tasks.",
    icon: Terminal,
    duration: "2-4 months",
    students: "Coming Soon",
    level: "Beginner to Intermediate",
    features: ["Python Basics", "Automation Scripts", "Data Handling", "Libraries"],
    isUpcoming: true,
  },
  {
    id: 9,
    title: "Industrial IoT",
    description:
      "Design and implement connected industrial systems using IoT sensors, gateways, and monitoring platforms.",
    icon: Wifi,
    duration: "3-5 months",
    students: "Coming Soon",
    level: "Intermediate to Advanced",
    features: ["IoT Sensors", "Gateways", "Cloud Monitoring", "Industrial Networks"],
    isUpcoming: true,
  },
  {
    id: 10,
    title: "PLC & SCADA Advanced",
    description:
      "Advanced programmable logic controller and SCADA system design for industrial automation and process control.",
    icon: Workflow,
    duration: "4-6 months",
    students: "Coming Soon",
    level: "Advanced",
    features: ["PLC Programming", "SCADA Systems", "HMI Design", "Process Control"],
    isUpcoming: true,
  },
  {
    id: 12,
    title: "EV Charging Infrastructure",
    description:
      "Design and deployment of electric vehicle charging stations, covering load planning, standards, and grid integration.",
    icon: BatteryCharging,
    duration: "2-4 months",
    students: "Coming Soon",
    level: "Intermediate",
    features: ["Charger Types", "Load Planning", "Grid Integration", "EV Standards"],
    isUpcoming: true,
  },
  {
    id: 13,
    title: "Robotics",
    description:
      "Fundamentals of robotics design, control systems, and automation for industrial and educational applications.",
    icon: Bot,
    duration: "4-6 months",
    students: "Coming Soon",
    level: "Intermediate to Advanced",
    features: ["Robot Kinematics", "Control Systems", "Sensors & Actuators", "Automation"],
    isUpcoming: true,
  },
  {
    id: 14,
    title: "Machine Learning",
    description:
      "Core machine learning concepts and practical model building for real-world engineering and data problems.",
    icon: BrainCircuit,
    duration: "4-6 months",
    students: "Coming Soon",
    level: "Advanced",
    features: ["ML Fundamentals", "Model Training", "Data Preprocessing", "Applied Projects"],
    isUpcoming: true,
  },
  {
    id: 15,
    title: "Embedded Systems",
    description:
      "Microcontroller-based embedded systems design, covering firmware development and hardware interfacing.",
    icon: CircuitBoard,
    duration: "4-6 months",
    students: "Coming Soon",
    level: "Intermediate to Advanced",
    features: ["Microcontrollers", "Firmware Development", "Hardware Interfacing", "RTOS"],
    isUpcoming: true,
  },
]

const CourseCard = ({ course, index = 0 }: { course: any; index?: number }) => {
  const IconComponent = course.icon
  return (
    <Card
      className={`group transition-all duration-300 ${
        course.isUpcoming
          ? "bg-gray-100 border-gray-300 opacity-75 hover:opacity-100"
          : "hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="transition-transform duration-300 group-hover:scale-105">
          {course.image ? (
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
          ) : (
            <CourseThumbnail icon={IconComponent} index={index} muted={course.isUpcoming} />
          )}
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-accent text-accent-foreground">{course.level}</Badge>
        </div>
        {course.isUpcoming && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gray-500 text-white">Coming Soon</Badge>
          </div>
        )}
      </div>

      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${course.isUpcoming ? "bg-gray-300" : "bg-accent/10"}`}>
            <IconComponent className={`h-6 w-6 ${course.isUpcoming ? "text-gray-500" : "text-accent"}`} />
          </div>
          <CardTitle className={`text-xl font-bold font-sans ${course.isUpcoming ? "text-gray-500" : "text-foreground"}`}>
            {course.title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className={`font-serif leading-relaxed ${course.isUpcoming ? "text-gray-500" : "text-muted-foreground"}`}>
          {course.description}
        </p>

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
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Our Courses</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of industry-relevant courses designed to give you the skills employers are
            looking for. From established programs to exciting new offerings.
          </p>
        </FadeIn>

        <Tabs defaultValue="courses" className="items-center">
          <TabsList className="flex-wrap h-auto gap-2 bg-muted/60 p-2 rounded-2xl border border-border">
            {[
              { value: "courses", label: "Courses", icon: GraduationCap },
              { value: "upcoming", label: "Upcoming Courses", icon: Sparkles },
            ].map(({ value, label, icon: TabIcon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="gap-1.5 px-4 py-2 rounded-xl border border-transparent text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:border-accent data-[state=active]:shadow-md data-[state=active]:shadow-accent/30"
              >
                <TabIcon className="h-4 w-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="courses" className="w-full mt-10">
            <FadeIn className="text-center mb-12">
              <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
                Our most sought-after programs with proven track records of student success and industry recognition.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularCourses.map((course, index) => (
                <FadeIn key={course.id} delay={(index % 3) * 0.1}>
                  <CourseCard course={course} index={index} />
                </FadeIn>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="w-full mt-10">
            <FadeIn className="text-center mb-12">
              <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
                Exciting new programs launching soon to keep you ahead in the digital age. Get notified when
                enrollment opens!
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingCourses.map((course, index) => (
                <FadeIn key={course.id} delay={(index % 3) * 0.1}>
                  <CourseCard course={course} index={index} />
                </FadeIn>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                Get Notified When New Courses Launch
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
