"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export function PrintButton() {
  return (
    <Button
      size="lg"
      variant="outline"
      className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
      onClick={() => window.print()}
    >
      <Printer className="mr-2 h-5 w-5" />
      Print / Save as PDF
    </Button>
  )
}
