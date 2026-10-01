import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle2, XCircle } from "lucide-react"

export const metadata = {
  title: "Certificate Verification | Vision Matrix Institute",
  robots: { index: false, follow: false },
}

// Public page (not under /dashboard, so no login). It calls the database
// function verify_certificate, which does an exact match on the certificate ID
// and returns the holder's name only if they agreed to show it.
export default async function VerifyCertificatePage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params
  const supabase = await createClient()
  const { data } = await supabase.rpc("verify_certificate", { p_number: number })
  const cert = Array.isArray(data) ? data[0] : null
  const isValid = cert?.status === "valid"
  const isRevoked = cert?.status === "revoked"

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex items-center justify-center gap-2.5">
          <Image src="/logo.png" alt="Vision Matrix Institute logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-black font-sans text-foreground">Vision Matrix Institute</span>
        </Link>

        <Card className={isValid ? "border-accent/40" : "border-destructive/40"}>
          <CardContent className="py-8 text-center space-y-4">
            {isValid && (
              <>
                <CheckCircle2 className="h-10 w-10 text-accent mx-auto" />
                <div>
                  <p className="text-sm text-muted-foreground font-serif">This certificate is valid.</p>
                  <p className="text-xs text-muted-foreground font-serif mt-1">Issued by Vision Matrix Institute</p>
                  <h1 className="text-xl font-black font-sans text-foreground mt-3">
                    {cert.recipient_name || "Holder name withheld by the holder"}
                  </h1>
                  <p className="text-muted-foreground font-serif mt-1">has completed</p>
                  <p className="font-semibold text-foreground mt-1">{cert.course_title}</p>
                  {cert.course_hours ? (
                    <p className="text-sm text-muted-foreground font-serif mt-1">{cert.course_hours} hours</p>
                  ) : null}
                </div>
                <div className="pt-4 border-t border-border space-y-1">
                  <p className="text-xs text-muted-foreground font-mono">Certificate ID {cert.certificate_number}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    Issued{" "}
                    {new Date(cert.issued_on).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </>
            )}

            {isRevoked && (
              <>
                <XCircle className="h-10 w-10 text-destructive mx-auto" />
                <div>
                  <h1 className="text-lg font-bold font-sans text-foreground">This certificate has been revoked</h1>
                  <p className="text-sm text-muted-foreground font-serif mt-1">
                    Certificate ID <span className="font-mono">{cert.certificate_number}</span> is no longer valid.
                  </p>
                </div>
              </>
            )}

            {!cert && (
              <>
                <XCircle className="h-10 w-10 text-destructive mx-auto" />
                <div>
                  <h1 className="text-lg font-bold font-sans text-foreground">Certificate not found</h1>
                  <p className="text-sm text-muted-foreground font-serif mt-1">
                    No certificate matches <span className="font-mono">{number}</span>. Check the ID and try again.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground font-serif flex items-center justify-center gap-1.5">
          <Award className="h-3.5 w-3.5" /> Vision Matrix Institute certificate verification
        </p>
      </div>
    </div>
  )
}
