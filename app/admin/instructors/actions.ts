"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { logAudit } from "@/lib/audit-log"

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
  if (profile?.role !== "admin") throw new Error("Only admins can manage instructors.")

  return { supabase, user }
}

export async function promoteToInstructor(studentId: string) {
  const { supabase, user } = await requireAdmin()

  const { error } = await supabase.from("profiles").update({ role: "instructor" }).eq("id", studentId)
  if (error) throw new Error(error.message)

  await logAudit({ actorId: user.id, action: "instructor.promoted", entityType: "profile", entityId: studentId })

  revalidatePath("/admin/instructors")
  revalidatePath("/admin/students")
}

export async function demoteInstructor(instructorId: string) {
  const { supabase, user } = await requireAdmin()

  const { error } = await supabase.from("profiles").update({ role: "student" }).eq("id", instructorId)
  if (error) throw new Error(error.message)

  await logAudit({ actorId: user.id, action: "instructor.demoted", entityType: "profile", entityId: instructorId })

  revalidatePath("/admin/instructors")
  revalidatePath("/admin/students")
}

export async function assignInstructorToCourse(formData: FormData) {
  const { supabase, user } = await requireAdmin()

  const instructorId = String(formData.get("instructorId") || "")
  const courseId = String(formData.get("courseId") || "")
  if (!instructorId || !courseId) throw new Error("Choose both an instructor and a course.")

  const { error } = await supabase
    .from("course_instructors")
    .upsert({ instructor_id: instructorId, course_id: courseId }, { onConflict: "course_id,instructor_id", ignoreDuplicates: true })
  if (error) throw new Error(error.message)

  await logAudit({
    actorId: user.id,
    action: "instructor.assigned",
    entityType: "course_instructors",
    metadata: { instructorId, courseId },
  })

  revalidatePath("/admin/instructors")
}

export async function removeInstructorAssignment(assignmentId: string) {
  const { supabase, user } = await requireAdmin()

  const { error } = await supabase.from("course_instructors").delete().eq("id", assignmentId)
  if (error) throw new Error(error.message)

  await logAudit({ actorId: user.id, action: "instructor.unassigned", entityType: "course_instructors", entityId: assignmentId })

  revalidatePath("/admin/instructors")
}
