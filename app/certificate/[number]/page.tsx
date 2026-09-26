import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PrintButton } from "@/components/dashboard/print-button"
import { SIGNATORY_NAME, SIGNATORY_TITLE, verifyUrl } from "@/lib/certificates"

export const metadata = {
  title: "Certificate | Vision Matrix Institute",
  robots: { index: false, follow: false },
}

// Printable certificate. Signed-in students see only their own valid certificate
// (row-level security on the certificates table); admins can also open any.
// Use the browser's "Save as PDF" to get a PDF.
export default async function CertificatePage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/login?redirect=${encodeURIComponent(`/certificate/${number}`)}`)

  const { data: cert } = await supabase
    .from("certificates")
    .select("certificate_number, recipient_name, course_title, course_hours, approved_at, status")
    .eq("certificate_number", number)
    .maybeSingle()

  if (!cert || cert.status !== "valid") notFound()

  const issued = new Date(cert.approved_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 print:bg-white print:p-0">
      <style>{`@page { size: A4 landscape; margin: 0; } @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`}</style>

      <div className="max-w-5xl mx-auto mb-4 flex items-center justify-between print:hidden">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Back to dashboard
        </Link>
        <PrintButton />
      </div>

      <div className="mx-auto bg-white text-slate-900 shadow-lg print:shadow-none w-full max-w-5xl aspect-[297/210] p-4 print:max-w-none print:w-[297mm] print:h-[210mm]">
        <div className="h-full w-full border-[6px] border-slate-900 p-2">
          <div className="h-full w-full border border-slate-400 flex flex-col items-center justify-between py-8 px-10 text-center">
            <div className="flex flex-col items-center gap-2">
              <Image src="/logo.png" alt="Vision Matrix Institute logo" width={56} height={56} className="h-14 w-14" />
              <div className="font-black tracking-wide text-lg">VISION MATRIX INSTITUTE</div>
            </div>

            <div className="space-y-3">
              <div className="text-sm tracking-[0.3em] text-slate-500">CERTIFICATE OF COMPLETION</div>
              <div className="text-sm text-slate-600">This certifies that</div>
              <div className="text-4xl font-serif font-bold">{cert.recipient_name}</div>
              <div className="text-sm text-slate-600">has completed</div>
              <div className="text-2xl font-bold">{cert.course_title}</div>
              {cert.course_hours ? <div className="text-sm text-slate-600">({cert.course_hours} hours)</div> : null}
            </div>

            <div className="w-full flex items-end justify-between text-left text-xs text-slate-600">
              <div className="space-y-1">
                <div>Issued on {issued}</div>
                <div className="font-mono">Certificate ID: {cert.certificate_number}</div>
                <div className="font-mono">Verify at {verifyUrl(cert.certificate_number)}</div>
              </div>
              <div className="text-center">
                <div className="w-56 border-t border-slate-900 pt-1">
                  {SIGNATORY_NAME ? <div className="font-semibold text-slate-900">{SIGNATORY_NAME}</div> : null}
                  <div>{SIGNATORY_TITLE}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
