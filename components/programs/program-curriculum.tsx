"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlayCircle, Clock, Layers } from "lucide-react"
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-10 max-w-2xl mx-auto">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Course Curriculum</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            {BIM_CURRICULUM_TOTAL_MODULES} modules across 4 stages
          </h2>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-serif">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" /> {BIM_CURRICULUM_TOTAL_HOURS} hours
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-accent" /> {BIM_CURRICULUM_TOTAL_LESSONS} lessons
            </span>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-6">
          {BIM_CURRICULUM.map((stage, stageIndex) => (
            <FadeIn key={stage.stage} delay={stageIndex * 0.08}>
              <Card className="overflow-hidden">
                <div className="bg-navy px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-accent mb-0.5">
                      {stage.stage} · {stage.title}
                    </div>
                    <div className="text-sm text-navy-foreground/70 font-serif">{stage.subtitle}</div>
                  </div>
                  <Badge variant="secondary" className="shrink-0 whitespace-nowrap">
                    {stage.hours}
                  </Badge>
                </div>

                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {stage.modules.map((module) => (
                      <AccordionItem key={module.number} value={module.number} className="px-5">
                        <AccordionTrigger>
                          <span className="flex items-center gap-3 font-sans">
                            <span className="font-mono text-accent font-semibold text-sm">{module.number}</span>
                            <span className="text-foreground">{module.title}</span>
                          </span>
                          <span className="ml-auto mr-2 text-xs text-muted-foreground font-serif shrink-0">
                            {module.hours}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2.5">
                            {module.lessons.map((lesson) => (
                              <li
                                key={lesson.number}
                                className="flex items-start gap-2.5 text-sm text-muted-foreground font-serif"
                              >
                                <PlayCircle className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
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
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="max-w-3xl mx-auto mt-8">
          <Card className="bg-background border-dashed">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                <span className="font-semibold text-foreground">Scope: </span>
                {BIM_CURRICULUM_SCOPE_NOTE}
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
