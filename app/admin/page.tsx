import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

// /admin has no page of its own; send people to the most useful starting point.
// The admin layout already redirects anyone who is not an admin or instructor.
export default async function AdminIndexPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
  redirect(profile?.role === "admin" ? "/admin/courses" : "/admin/teacher")
}
