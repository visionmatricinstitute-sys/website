"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calculator, Library, Link2, ArrowRight, Wrench } from "lucide-react"

export function ToolkitHero() {
  return (
    <section
      id="toolkit-home"
      className="relative bg-gradient-to-br from-background to-muted py-20 lg:py-28 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold">
                <Wrench className="h-4 w-4" />
                Engineer's Toolkit
              </div>
              <h1 className="text-4xl lg:text-6xl font-black font-sans text-foreground leading-tight text-balance">
                Practical tools for the
                <span className="text-accent block">engineers we train</span>
              </h1>
              <p className="text-lg text-muted-foreground font-serif leading-relaxed max-w-lg">
                A companion workspace for our CAD, BIM and technical students — sizing calculators, formula
                sheets, drawing templates and curated links, all in one place so you can practice with the
                same tools used on real projects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => document.getElementById("toolkit-calculators")?.scrollIntoView({ behavior: "smooth" })}
              >
                Open Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                onClick={() => document.getElementById("toolkit-library")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse Resource Library
              </Button>
            </div>

            {/* Offering highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-2 mx-auto">
                  <Calculator className="h-6 w-6 text-accent" />
                </div>
                <div className="text-sm font-semibold text-foreground">Calculators</div>
                <div className="text-xs text-muted-foreground">Cable &amp; load sizing</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-2 mx-auto">
                  <Library className="h-6 w-6 text-accent" />
                </div>
                <div className="text-sm font-semibold text-foreground">Resource Library</div>
                <div className="text-xs text-muted-foreground">Standards &amp; templates</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-2 mx-auto">
                  <Link2 className="h-6 w-6 text-accent" />
                </div>
                <div className="text-sm font-semibold text-foreground">External Links</div>
                <div className="text-xs text-muted-foreground">Curated &amp; trusted</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 aspect-[4/3] rounded-lg shadow-2xl overflow-hidden">
              <Image
                src="/engineers-toolkit-hero.jpg"
                alt="Engineer working across Revit BIM, AutoCAD electrical schematics, ETAP short-circuit analysis and Excel load schedule and cable sizing sheets"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
