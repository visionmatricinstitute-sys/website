/**
 * Shared PDF/Excel export helpers for the Conductor Sizing sub-modules.
 * jspdf / jspdf-autotable / xlsx are dynamically imported so they never bloat the initial bundle.
 */

export async function exportPdfReport(opts: {
  title: string
  subtitle?: string
  filename: string
  sections: { heading: string; rows: [string, string][] }[]
  notes?: string
}) {
  const { jsPDF } = await import("jspdf")
  const { default: autoTable } = await import("jspdf-autotable")
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text(opts.title, 14, 18)
  if (opts.subtitle) {
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(opts.subtitle, 14, 25)
  }
  doc.setFontSize(9)
  doc.setTextColor(130)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 31)

  let y = 37
  opts.sections.forEach((section) => {
    autoTable(doc, {
      startY: y,
      head: [[section.heading, "Value"]],
      body: section.rows,
      theme: "grid",
      headStyles: { fillColor: [0, 87, 217] },
      styles: { fontSize: 9 },
    })
    y = (doc as any).lastAutoTable.finalY + 8
  })

  if (opts.notes) {
    if (y > 260) {
      doc.addPage()
      y = 18
    }
    doc.setFontSize(8)
    doc.setTextColor(120)
    doc.text(opts.notes, 14, y, { maxWidth: 180 })
  }

  doc.save(opts.filename)
}

export async function exportExcelReport(filename: string, sheets: { name: string; rows: (string | number)[][] }[]) {
  const XLSX = await import("xlsx")
  const wb = XLSX.utils.book_new()
  sheets.forEach((sheet) => {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sheet.rows), sheet.name.slice(0, 31))
  })
  XLSX.writeFile(wb, filename)
}
