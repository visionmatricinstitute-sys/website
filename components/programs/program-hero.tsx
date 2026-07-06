"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { MessageCircle, Download, Zap } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export function ProgramHero() {
  return (
    <section className="relative bg-navy py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent/25 blur-[110px] animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-secondary/20 blur-[110px] animate-float-slower" />

      <div className="relative container mx-auto px-4">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={item} className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Zap className="h-4 w-4" />
            Professional Master Program
          </motion.div>

          <motion.h1 variants={item} className="text-4xl lg:text-6xl font-black font-sans text-white leading-tight text-balance mb-4">
            Electrical Design Engineer
            <span className="text-accent block">Data Center Specialist</span>
          </motion.h1>

          <motion.p variants={item} className="text-lg text-white/70 font-serif leading-relaxed max-w-2xl mb-8">
            AI-First Electrical Design for Mission-Critical Facilities. From tier classification to L5
            commissioning — the complete competence stack, taught by practitioners and anchored in current
            IEC/IEEE/Uptime standards.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-12">
            <MagneticButton>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
                onClick={() => window.open("https://wa.me/919930259997", "_blank")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enquire on WhatsApp
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "14", label: "Core Modules" },
              { value: "240", label: "Learning Hours" },
              { value: "40+", label: "Deliverables" },
              { value: "18", label: "Software Tools" },
            ].map((stat) => (
              <div key={stat.label} className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
