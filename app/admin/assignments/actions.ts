"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { logAudit } from "@/lib/audit-log"

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

  const { data: assignment, error } = await supabase
    .from("assignments")
    .insert({
      course_id: courseId,
      title,
      description,
      due_at: dueAt ? new Date(dueAt).toISOString() : null,
      created_by: user.id,
    })
    .select("id")
    .single()
  if (error) throw new Error(error.message)

  await logAudit({ actorId: user.id, action: "assignment.created", entityType: "assignment", entityId: assignment.id, metadata: { title } })

  revalidatePath("/admin/assignments")
  revalidatePath("/dashboard")
}

export async function updateAssignment(assignmentId: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const title = String(formData.get("title") || "").trim()
  const description = String(formData.get("description") || "").trim() || null
  const dueAt = String(formData.get("dueAt") || "")
  if (!title) throw new Error("Title is required.")

  const { error } = await supabase
    .from("assignments")
    .update({ title, description, due_at: dueAt ? new Date(dueAt).toISOString() : null })
    .eq("id", assignmentId)
  if (error) throw new Error(error.message)

  await logAudit({ actorId: user.id, action: "assignment.updated", entityType: "assignment", entityId: assignmentId, metadata: { title } })

  revalidatePath(`/admin/assignments/${assignmentId}`)
  revalidatePath("/admin/assignments")
  revalidatePath("/dashboard")
}

export async function deleteAssignment(assignmentId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { error } = await supabase.from("assignments").delete().eq("id", assignmentId)
  if (error) throw new Error(error.message)

  await logAudit({ actorId: user.id, action: "assignment.deleted", entityType: "assignment", entityId: assignmentId })

  revalidatePath("/admin/assignments")
  revalidatePath("/dashboard")
  redirect("/admin/assignments")
}

export async function gradeSubmission(submissionId: string, assignmentId: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const gradeRaw = formData.get("grade")
  const grade = gradeRaw === null || gradeRaw === "" ? null : Number(gradeRaw)
  const feedback = String(formData.get("feedback") || "") || null

  const { error } = await supabase
    .from("assignment_submissions")
    .update({ grade, feedback, graded_at: new Date().toISOString() })
    .eq("id", submissionId)
  if (error) throw new Error(error.message)

  if (user) {
    await logAudit({
      actorId: user.id,
      action: "assignment.graded",
      entityType: "assignment_submission",
      entityId: submissionId,
      metadata: { grade },
    })
  }

  revalidatePath(`/admin/assignments/${assignmentId}`)
}
