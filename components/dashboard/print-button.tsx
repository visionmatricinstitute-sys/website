"use client"

import { Button } from "@/components/ui/button"

// Opens the browser's print dialog; "Save as PDF" there gives the PDF certificate.
export function PrintButton() {
  return (
    <Button onClick={() => window.print()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
      Download / Print PDF
    </Button>
  )
}
