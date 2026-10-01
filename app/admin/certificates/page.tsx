import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/service"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { approveCertificate, revokeCertificate } from "./actions"

// Admin-only (the admin layout redirects non-admins; this page checks again).
// Certificates start as "pending_approval" when a student completes every module.
// Approving one creates its public Certificate ID.
export default async function AdminCertificatesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (me?.role !== "admin") redirect("/dashboard")

  const { data: pending } = await supabase
    .from("certificates")
    .select("id, student_id, course_id, issued_at, courses(title)")
    .eq("status", "pending_approval")
    .order("issued_at", { ascending: true })

  const { data: valid } = await supabase
    .from("certificates")
    .select("id, student_id, certificate_number, recipient_name, course_title, course_hours, approved_at, public_name_consent")
    .eq("status", "valid")
    .order("approved_at", { ascending: false })

  // Student names: the admin policy on `profiles` only allows an admin to read their own row,
  // so names are read with the service-role client, after the admin check above.
  const studentIds = Array.from(new Set([...(pending ?? []), ...(valid ?? [])].map((c: any) => c.student_id)))
  const nameById: Record<string, string> = {}
  if (studentIds.length > 0) {
    const service = createServiceClient()
    const { data: profiles } = await service.from("profiles").select("id, full_name").in("id", studentIds)
    for (const p of profiles ?? []) nameById[p.id] = p.full_name || ""
  }

  // Suggested course hours: the sum of the numbers in course_modules.hours ("8h", "16h", ...).
  const courseIds = Array.from(new Set((pending ?? []).map((c: any) => c.course_id)))
  const hoursByCourse: Record<string, number> = {}
  if (courseIds.length > 0) {
    const { data: modules } = await supabase.from("course_modules").select("course_id, hours").in("course_id", courseIds)
    for (const m of modules ?? []) {
      const n = parseInt(String(m.hours ?? ""), 10)
      if (!Number.isNaN(n)) hoursByCourse[m.course_id] = (hoursByCourse[m.course_id] ?? 0) + n
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Certificates</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Approve a certificate after checking the student has completed the course. Approval creates the
          Certificate ID that anyone can verify.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">Waiting for approval</h2>
        {(pending ?? []).length === 0 ? (
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground font-serif">Nothing waiting.</CardContent>
          </Card>
        ) : (
          (pending ?? []).map((c: any) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle className="font-sans text-base">
                  {c.courses?.title} &middot; completed{" "}
                  {new Date(c.issued_at).toLocaleDateString("en-GB", { dateStyle: "medium" })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form action={approveCertificate} className="grid gap-3 sm:grid-cols-2">
                  <input type="hidden" name="certificateId" value={c.id} />
                  <div className="space-y-1">
                    <Label htmlFor={`name-${c.id}`}>Name as it should appear on the certificate</Label>
                    <Input id={`name-${c.id}`} name="recipientName" required defaultValue={nameById[c.student_id] || ""} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`hours-${c.id}`}>Course hours (from the module list)</Label>
                    <Input
                      id={`hours-${c.id}`}
                      name="courseHours"
                      type="number"
                      min={1}
                      step={1}
                      required
                      defaultValue={hoursByCourse[c.course_id] || ""}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm sm:col-span-2">
                    <input type="checkbox" name="paymentOverride" />
                    Payment was taken outside the portal (approve without a recorded payment)
                  </label>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Approve and issue Certificate ID
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">Issued</h2>
        {(valid ?? []).length === 0 ? (
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground font-serif">None yet.</CardContent>
          </Card>
        ) : (
          (valid ?? []).map((c: any) => (
            <Card key={c.id}>
              <CardContent className="py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0 text-sm">
                  <div className="font-semibold text-foreground">
                    {c.recipient_name} &middot; {c.course_title} ({c.course_hours} h)
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {c.certificate_number} &middot; issued{" "}
                    {new Date(c.approved_at).toLocaleDateString("en-GB", { dateStyle: "medium" })} &middot; name on public
                    page: {c.public_name_consent ? "yes" : "no"}
                  </div>
                </div>
                <form action={revokeCertificate} className="flex items-center gap-2">
                  <input type="hidden" name="certificateId" value={c.id} />
                  <Input name="reason" required placeholder="Reason for revoking" className="h-8 w-56 text-sm" />
                  <Button type="submit" size="sm" variant="outline">
                    Revoke
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  )
}
