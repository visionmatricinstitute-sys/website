"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function markAnnouncementRead(announcementId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { error } = await supabase
    .from("announcement_reads")
    .upsert({ student_id: user.id, announcement_id: announcementId }, { onConflict: "student_id,announcement_id" })
  if (error) throw new Error(error.message)

  revalidatePath("/dashboard")
}
