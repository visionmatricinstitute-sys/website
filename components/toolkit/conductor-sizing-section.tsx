"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cable, Zap, Layers, Waves } from "lucide-react"
import { HtConductorSizing } from "./ht-conductor-sizing"
import { LvConductorSizing } from "./lv-conductor-sizing"
import { BusductSizing } from "./busduct-sizing"
import { EarthingConductorSizing } from "./earthing-conductor-sizing"

const SUB_MODULES = [
  { value: "ht", label: "HT Conductor Sizing", icon: Zap },
  { value: "lv", label: "LV Conductor Sizing", icon: Cable },
  { value: "busduct", label: "Busduct Sizing", icon: Layers },
  { value: "earthing", label: "Earthing Conductor Sizing", icon: Waves },
]

export function ConductorSizingSection() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h3 className="text-2xl font-black font-sans text-foreground">Conductor Sizing</h3>
        <p className="text-muted-foreground font-serif">
          Four independent engineering sizing tools — HT cables, LV cables, busducts and earthing conductors — each
          performing real IEC/IS-aligned calculations rather than a rough estimate.
        </p>
      </div>

      <Tabs defaultValue="lv" className="items-center">
        <TabsList className="flex-wrap h-auto gap-2 bg-muted/60 p-2 rounded-2xl border border-border">
          {SUB_MODULES.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="gap-1.5 px-4 py-2 rounded-xl border border-transparent text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:border-accent data-[state=active]:shadow-md data-[state=active]:shadow-accent/30"
            >
              <Icon className="h-4 w-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="ht" className="w-full mt-8">
          <HtConductorSizing />
        </TabsContent>
        <TabsContent value="lv" className="w-full mt-8">
          <LvConductorSizing />
        </TabsContent>
        <TabsContent value="busduct" className="w-full mt-8">
          <BusductSizing />
        </TabsContent>
        <TabsContent value="earthing" className="w-full mt-8">
          <EarthingConductorSizing />
        </TabsContent>
      </Tabs>
    </div>
  )
}
