"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const title = String(formData.get("title") || "").trim()
  const body = String(formData.get("body") || "").trim()
  const courseId = String(formData.get("courseId") || "") || null
  const studentId = String(formData.get("studentId") || "") || null
  if (!title || !body) throw new Error("Title and message are required.")

  const audienceType = studentId ? "student" : courseId ? "course" : "all"

  const { error } = await supabase.from("announcements").insert({
    title,
    body,
    audience_type: audienceType,
    course_id: audienceType === "course" ? courseId : null,
    student_id: audienceType === "student" ? studentId : null,
    created_by: user.id,
  })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/announcements")
  revalidatePath("/dashboard")
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("announcements").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/announcements")
  revalidatePath("/dashboard")
}
