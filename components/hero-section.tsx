"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { ArrowRight, Users, Award, BookOpen, ChevronDown } from "lucide-react"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function HeroSection() {
  return (
    <section id="home" className="relative bg-navy py-24 lg:py-36 overflow-hidden">
      {/* Animated background layer */}
      <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent/25 blur-[110px] animate-float-slow" />
      <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-secondary/20 blur-[110px] animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 w-[320px] h-[320px] rounded-full bg-primary/25 blur-[100px] animate-float-slow" />

      <div className="relative container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={item} className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-black font-sans text-white leading-tight text-balance">
                Build Your Future with
                <span className="text-accent block">Technical Excellence</span>
              </h1>
              <p className="text-lg text-white/70 font-serif leading-relaxed max-w-lg">
                Join Vision Matrix Institute online - your gateway to industry-relevant technical education from anywhere.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                >
                  Download Brochure
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/15 rounded-lg mb-2 mx-auto">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-white/60">Students Trained</div>
              </div>
              <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/15 rounded-lg mb-2 mx-auto">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm text-white/60">Placement Rate</div>
              </div>
              <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/15 rounded-lg mb-2 mx-auto">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-sm text-white/60">Courses Offered</div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/modern-computer-classroom.png"
                alt="Students learning technical skills"
                className="w-full"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/30 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/25 rounded-full blur-xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-scroll-bounce" />
      </div>
    </section>
  )
}
