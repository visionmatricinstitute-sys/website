"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Lock, Clock, Layers, ChevronDown } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import {
  BIM_CURRICULUM,
  BIM_CURRICULUM_TOTAL_HOURS,
  BIM_CURRICULUM_TOTAL_MODULES,
  BIM_CURRICULUM_TOTAL_LESSONS,
  BIM_CURRICULUM_SCOPE_NOTE,
} from "@/lib/bim-curriculum-data"

export function ProgramCurriculum() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Course Content</div>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4 text-balance">
            Explore every module
          </h2>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-serif">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-secondary" /> {BIM_CURRICULUM_TOTAL_MODULES} modules
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-secondary" /> {BIM_CURRICULUM_TOTAL_HOURS} hours
            </span>
            <span className="text-muted-foreground/70">{BIM_CURRICULUM_TOTAL_LESSONS} lessons</span>
          </div>
        </FadeIn>

        {/* Column headers */}
        <div className="hidden sm:flex items-center justify-between border-b-2 border-foreground/80 pb-3 mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          <span>Module</span>
          <span className="flex items-center gap-10 lg:gap-16">
            <span>Lessons</span>
            <span>Duration</span>
          </span>
        </div>

        <div>
          {BIM_CURRICULUM.map((stage, stageIndex) => (
            <FadeIn key={stage.stage} delay={stageIndex * 0.06}>
              <div className="pt-8 pb-2 first:pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">{stage.stage}</span>
                  <span className="text-sm font-semibold text-foreground font-sans">{stage.title}</span>
                  <span className="text-xs text-muted-foreground font-serif hidden md:inline">{stage.subtitle}</span>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {stage.modules.map((module) => (
                  <AccordionItem
                    key={module.number}
                    value={module.number}
                    className="border-b border-dotted border-border"
                  >
                    <AccordionTrigger className="py-5 hover:no-underline group [&>svg]:hidden">
                      <div className="flex flex-1 items-center justify-between gap-4">
                        <span className="flex items-center gap-3">
                          <Lock className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                          <span className="font-mono text-xs text-secondary font-semibold">{module.number}</span>
                          <span className="font-sans font-bold text-foreground group-hover:text-secondary transition-colors">
                            {module.title}
                          </span>
                        </span>
                        <span className="flex items-center gap-6 lg:gap-12 text-sm text-muted-foreground shrink-0">
                          <span className="font-serif hidden sm:inline">{module.lessons.length} lessons</span>
                          <span className="font-serif w-12 text-right">{module.hours}</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pl-7 pb-2">
                        {module.lessons.map((lesson) => (
                          <li
                            key={lesson.number}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground font-serif"
                          >
                            <Lock className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0 mt-1" />
                            <span>
                              <span className="font-mono text-xs text-muted-foreground/70 mr-1.5">
                                {lesson.number}
                              </span>
                              {lesson.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground font-serif leading-relaxed">
            <span className="font-semibold text-foreground">Scope: </span>
            {BIM_CURRICULUM_SCOPE_NOTE}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
