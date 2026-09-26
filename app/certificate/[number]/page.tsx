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

// Printable certificate, laid out from the Founder's template (VMI-certificate-template.pdf):
// white page, thin blue border with navy corner marks, logo at the top, name with a rule
// beneath it, signature at the left, logo mark in the centre, certificate ID and date at the foot.
// Wording is limited to what is true: a certificate of COMPLETION of a course. No claim of
// accreditation, external certification or assessed proficiency.
//
// Signed-in students see only their own valid certificate (row-level security on the
// certificates table); admins can open any. Use the browser's "Save as PDF".
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

      <div className="relative mx-auto bg-white text-slate-900 shadow-lg print:shadow-none w-full max-w-5xl aspect-[297/210] print:max-w-none print:w-[297mm] print:h-[210mm]">
        {/* thin blue border */}
        <div className="absolute inset-[14px] border border-blue-300" />
        {/* navy corner marks */}
        <div className="absolute left-[10px] top-[10px] h-5 w-5 border-l-2 border-t-2 border-slate-900" />
        <div className="absolute right-[10px] top-[10px] h-5 w-5 border-r-2 border-t-2 border-slate-900" />
        <div className="absolute left-[10px] bottom-[10px] h-5 w-5 border-l-2 border-b-2 border-slate-900" />
        <div className="absolute right-[10px] bottom-[10px] h-5 w-5 border-r-2 border-b-2 border-slate-900" />

        <div className="relative h-full w-full flex flex-col items-center justify-between px-16 py-12 text-center">
          <div className="flex flex-col items-center gap-2">
            <Image src="/logo.png" alt="Vision Matrix Institute logo" width={64} height={64} className="h-16 w-16" />
            <div className="font-sans font-bold tracking-wide text-slate-800">VISION MATRIX INSTITUTE</div>
          </div>

          <div className="space-y-4">
            <div className="font-sans text-4xl font-bold text-slate-900">Certificate of Completion</div>
            <div className="text-sm text-slate-500">This certificate is presented to</div>
            <div>
              <div className="font-sans text-5xl font-bold text-slate-900 px-8">{cert.recipient_name}</div>
              <div className="mx-auto mt-3 h-px w-72 bg-slate-300" />
            </div>
            <div className="text-sm text-slate-500">for successfully completing the course</div>
            <div className="font-sans text-2xl font-bold text-slate-900">{cert.course_title}</div>
            {cert.course_hours ? <div className="text-sm text-slate-500">{cert.course_hours} hours</div> : null}
          </div>

          <div className="w-full">
            <div className="grid grid-cols-3 items-end">
              <div className="text-left">
                <div className="w-56 border-t border-slate-400 pt-1 text-center">
                  {SIGNATORY_NAME ? <div className="font-sans text-sm font-bold text-slate-900">{SIGNATORY_NAME}</div> : null}
                  <div className="text-[10px] tracking-widest text-slate-500 uppercase">{SIGNATORY_TITLE}</div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/logo.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
              <div className="text-right text-[10px] leading-snug text-slate-500">
                <div>Verify this certificate at</div>
                <div className="font-mono break-all">{verifyUrl(cert.certificate_number)}</div>
              </div>
            </div>
            <div className="mt-5 text-[10px] tracking-widest text-slate-400 uppercase">
              Certificate ID: <span className="font-mono">{cert.certificate_number}</span> &nbsp;&middot;&nbsp; Issued{" "}
              {issued}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
