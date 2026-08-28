"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const NAVY: [number, number, number] = [15, 23, 42]
const ACCENT: [number, number, number] = [0, 168, 255]

export function CertificateDownloadButton({
  studentName,
  courseTitle,
  issuedAt,
  certificateCode,
}: {
  studentName: string
  courseTitle: string
  issuedAt: string
  certificateCode: string
}) {
  async function handleDownload() {
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const center = pageWidth / 2

    doc.setDrawColor(...NAVY)
    doc.setLineWidth(1.2)
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20)
    doc.setDrawColor(...ACCENT)
    doc.setLineWidth(0.4)
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28)

    doc.setTextColor(...NAVY)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("VISION MATRIX INSTITUTE", center, 34, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(...ACCENT)
    doc.text("CERTIFICATE OF COMPLETION", center, 44, { align: "center" })

    doc.setTextColor(...NAVY)
    doc.setFontSize(10)
    doc.text("This is to certify that", center, 62, { align: "center" })

    doc.setFont("helvetica", "bold")
    doc.setFontSize(24)
    doc.text(studentName, center, 76, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text("has successfully completed the course", center, 88, { align: "center" })

    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text(courseTitle, center, 100, { align: "center", maxWidth: pageWidth - 60 })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(90, 100, 120)
    doc.text(
      `Issued ${new Date(issuedAt).toLocaleDateString(undefined, { dateStyle: "long" })}`,
      center,
      pageHeight - 30,
      { align: "center" },
    )
    doc.text(`Certificate #${certificateCode}`, center, pageHeight - 24, { align: "center" })
    doc.text(
      `Verify at ${typeof window !== "undefined" ? window.location.origin : "visionmatrixinstitute.com"}/certificates/${certificateCode}`,
      center,
      pageHeight - 18,
      { align: "center" },
    )

    doc.save(`VMI-Certificate-${certificateCode}.pdf`)
  }

  return (
    <Button onClick={handleDownload} variant="outline" size="sm" className="gap-1.5 bg-transparent">
      <Download className="h-3.5 w-3.5" /> Download Certificate
    </Button>
  )
}
