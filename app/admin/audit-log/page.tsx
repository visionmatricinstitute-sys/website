import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = { title: "Audit log | Admin" }

export default async function AdminAuditLogPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (me?.role !== "admin") redirect("/dashboard")

  const { data: entries } = await supabase
    .from("audit_log")
    .select("id, actor_id, action, entity_type, entity_id, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(200)

  const actorIds = Array.from(new Set((entries ?? []).map((e: any) => e.actor_id).filter(Boolean)))
  const { data: actors } =
    actorIds.length > 0 ? await supabase.from("profiles").select("id, full_name").in("id", actorIds) : { data: [] }
  const nameById = new Map((actors ?? []).map((a: any) => [a.id, a.full_name || "Admin"]))

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Audit log</h1>
        <p className="text-muted-foreground font-serif mt-1">
          The latest 200 recorded admin actions (deleting courses, sessions, quizzes and assignments). Read-only.
        </p>
      </div>

      {(entries ?? []).length === 0 ? (
        <p className="text-sm text-muted-foreground font-serif">Nothing recorded yet.</p>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Who</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {(entries ?? []).map((e: any) => (
                  <tr key={e.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-muted-foreground">
                      {new Date(e.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-foreground">{nameById.get(e.actor_id) ?? "—"}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{e.action}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs break-all">
                      {e.entity_type}
                      {e.metadata ? ` · ${JSON.stringify(e.metadata)}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
