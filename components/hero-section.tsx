"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { staggerContainer, staggerItem } from "@/components/motion/stagger"
import { ArrowRight, Download, Laptop, Wrench, Target, ChevronDown } from "lucide-react"

const HERO_POSTER = "/hero-data-center.jpg"

export function HeroSection() {
  // Starts false so server render / first paint always matches the safe,
  // fast fallback (poster image) — the video is a progressive upgrade that
  // only kicks in once we know the viewer can actually make use of it.
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isDesktop = window.matchMedia("(min-width: 768px)").matches
    setPlayVideo(!reducedMotion && isDesktop)
  }, [])

  return (
    <section
      id="home"
      className="relative bg-navy py-24 lg:py-36 overflow-hidden min-h-[640px] flex items-center"
    >
      {/* Cinematic data-center footage — full-bleed background, decorative only */}
      <div className="absolute inset-0">
        {playVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover animate-hero-video-zoom"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            aria-hidden="true"
          >
            <source src="/video/data-center-hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src={HERO_POSTER}
            alt="Vision Matrix Institute — data center electrical infrastructure and monitoring systems"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Dark gradient overlay — keeps headline/body text readable over the footage */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/25" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={staggerItem} className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.05] tracking-tight text-balance">
              Online Training for
              <span className="text-accent-tint block">Data Center Electrical Design & BIM</span>
            </h1>
            <p className="text-lg text-white/70 font-body leading-relaxed max-w-lg">
              Vision Matrix Institute teaches data center electrical design, BIM/Revit modeling, and the
              industry-standard tools engineers use on the job — 100% online, instructor-led.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 mt-8">
            <MagneticButton>
              <Button asChild size="lg" variant="accent-on-dark">
                <Link href="/#courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <a href="/brochures/electrical-design-data-center-brochure.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Brochure
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* What you get */}
          <motion.div variants={staggerItem} className="grid grid-cols-3 gap-4 pt-8 mt-8 max-w-lg">
            <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4 px-2">
              <div className="flex items-center justify-center w-12 h-12 bg-accent-tint/15 rounded-lg mb-2 mx-auto">
                <Laptop className="h-6 w-6 text-accent-tint" />
              </div>
              <div className="text-sm font-bold text-white">100% Online</div>
              <div className="text-xs text-white/60">Live instructor-led classes</div>
            </div>
            <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4 px-2">
              <div className="flex items-center justify-center w-12 h-12 bg-accent-tint/15 rounded-lg mb-2 mx-auto">
                <Wrench className="h-6 w-6 text-accent-tint" />
              </div>
              <div className="text-sm font-bold text-white">Real Tools</div>
              <div className="text-xs text-white/60">Revit, AutoCAD, ETAP, Excel</div>
            </div>
            <div className="text-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-4 px-2">
              <div className="flex items-center justify-center w-12 h-12 bg-accent-tint/15 rounded-lg mb-2 mx-auto">
                <Target className="h-6 w-6 text-accent-tint" />
              </div>
              <div className="text-sm font-bold text-white">Career-Focused</div>
              <div className="text-xs text-white/60">Data center design specialization</div>
            </div>
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
