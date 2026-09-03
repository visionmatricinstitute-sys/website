import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/service"

// Combines profiles (name/role/joined date) with auth.users (email) — profiles has no
// email column, and auth.users isn't reachable through the regular client, so this needs
// the service-role client. Only ever call this from an already admin-gated page
// (app/admin/layout.tsx verifies the caller is an admin before any admin page renders).
export async function listStudentsWithEmail() {
  const supabase = await createClient()
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .order("created_at", { ascending: false })

  const service = createServiceClient()
  const { data: authUsers } = await service.auth.admin.listUsers({ perPage: 1000 })
  const emailById = new Map((authUsers?.users ?? []).map((u) => [u.id, u.email ?? ""]))

  return (profiles ?? []).map((p: any) => ({ ...p, email: emailById.get(p.id) ?? "" }))
}
