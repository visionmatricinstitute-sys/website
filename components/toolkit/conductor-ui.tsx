"use client"

import type { ReactNode } from "react"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center text-muted-foreground hover:text-accent focus-visible:outline-none"
          aria-label="More information"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  )
}

export function FieldLabel({ children, tip }: { children: ReactNode; tip: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Label>{children}</Label>
      <InfoTip text={tip} />
    </div>
  )
}

export function StatTile({
  label,
  value,
  tip,
  tone = "default",
}: {
  label: string
  value: ReactNode
  tip?: string
  tone?: "default" | "good" | "bad" | "warn"
}) {
  return (
    <div
      className={`rounded-lg p-4 ${
        tone === "good"
          ? "bg-green-500/10"
          : tone === "bad"
            ? "bg-red-500/10"
            : tone === "warn"
              ? "bg-orange-500/10"
              : "bg-muted/50"
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground">
        {label}
        {tip ? <InfoTip text={tip} /> : null}
      </div>
      <div className="text-xl font-bold text-foreground mt-1 break-words">{value}</div>
    </div>
  )
}

export function PassFailBanner({ pass, passText = "PASS", failText = "FAIL" }: { pass: boolean; passText?: string; failText?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-lg p-4 text-lg font-bold ${
        pass ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
      }`}
    >
      {pass ? passText : failText}
    </div>
  )
}

export function WarningList({ warnings }: { warnings: { level: "warn" | "danger"; message: string }[] }) {
  if (warnings.length === 0) return null
  return (
    <div className="space-y-2">
      {warnings.map((w, i) => (
        <div
          key={i}
          className={`rounded-lg p-3 text-sm ${
            w.level === "danger" ? "bg-red-500/10 text-red-700" : "bg-orange-500/10 text-orange-700"
          }`}
        >
          {w.message}
        </div>
      ))}
    </div>
  )
}
