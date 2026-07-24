"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function createAssignment(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const courseId = String(formData.get("courseId") || "")
  const title = String(formData.get("title") || "")
  const description = String(formData.get("description") || "") || null
  const dueAt = String(formData.get("dueAt") || "")

  if (!courseId || !title) throw new Error("Course and title are required.")

  const { error } = await supabase.from("assignments").insert({
    course_id: courseId,
    title,
    description,
    due_at: dueAt ? new Date(dueAt).toISOString() : null,
    created_by: user.id,
  })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/assignments")
  revalidatePath("/dashboard")
}

export async function gradeSubmission(submissionId: string, assignmentId: string, formData: FormData) {
  const supabase = await createClient()
  const gradeRaw = formData.get("grade")
  const grade = gradeRaw === null || gradeRaw === "" ? null : Number(gradeRaw)
  const feedback = String(formData.get("feedback") || "") || null

  const { error } = await supabase
    .from("assignment_submissions")
    .update({ grade, feedback, graded_at: new Date().toISOString() })
    .eq("id", submissionId)
  if (error) throw new Error(error.message)

  revalidatePath(`/admin/assignments/${assignmentId}`)
}
