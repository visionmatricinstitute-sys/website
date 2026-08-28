import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle2, XCircle } from "lucide-react"

export const metadata = {
  title: "Certificate Verification | Vision Matrix Institute",
  robots: { index: false, follow: false },
}

export default async function CertificateVerificationPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const supabase = await createClient()
  const { data } = await supabase.rpc("verify_certificate", { p_code: code })
  const cert = Array.isArray(data) ? data[0] : null

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex items-center justify-center gap-2.5">
          <Image src="/logo.png" alt="Vision Matrix Institute logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-black font-sans text-foreground">Vision Matrix Institute</span>
        </Link>

        <Card className={cert ? "border-accent/40" : "border-destructive/40"}>
          <CardContent className="py-8 text-center space-y-4">
            {cert ? (
              <>
                <CheckCircle2 className="h-10 w-10 text-accent mx-auto" />
                <div>
                  <p className="text-sm text-muted-foreground font-serif">This certificate is valid.</p>
                  <h1 className="text-xl font-black font-sans text-foreground mt-2">{cert.student_name}</h1>
                  <p className="text-muted-foreground font-serif mt-1">has successfully completed</p>
                  <p className="font-semibold text-foreground mt-1">{cert.course_title}</p>
                </div>
                <div className="pt-4 border-t border-border space-y-1">
                  <p className="text-xs text-muted-foreground font-mono">Certificate #{cert.certificate_code}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    Issued {new Date(cert.issued_at).toLocaleDateString(undefined, { dateStyle: "long" })}
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-10 w-10 text-destructive mx-auto" />
                <div>
                  <h1 className="text-lg font-bold font-sans text-foreground">Certificate not found</h1>
                  <p className="text-sm text-muted-foreground font-serif mt-1">
                    We couldn't find a certificate matching code <span className="font-mono">{code}</span>. Check the
                    code and try again.
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
