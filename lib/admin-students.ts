import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/service"

// Throws unless the signed-in user is an admin. Layouts are not a security boundary in the
// Next.js App Router (a client-side navigation can skip a layout's check), so every admin page
// and action that touches data checks for itself.
export async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") redirect("/dashboard")
  return supabase
}

// Combines profiles (name/role/joined date) with auth.users (email) — profiles has no
// email column, and auth.users isn't reachable through the regular client, so this needs
// the service-role client, which bypasses row-level security. It therefore checks the caller
// is an admin itself, before touching the service-role client.
export async function listStudentsWithEmail() {
  const supabase = await requireAdmin()
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .order("created_at", { ascending: false })

  const service = createServiceClient()
  const { data: authUsers } = await service.auth.admin.listUsers({ perPage: 1000 })
  const emailById = new Map((authUsers?.users ?? []).map((u) => [u.id, u.email ?? ""]))

  return (profiles ?? []).map((p: any) => ({ ...p, email: emailById.get(p.id) ?? "" }))
}
