import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Student Dashboard | Vision Matrix Institute",
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single()

  return <DashboardShell studentName={profile?.full_name || user.email || "Student"}>{children}</DashboardShell>
}
