"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function manualEnroll(formData: FormData) {
  const supabase = await createClient()
  const studentId = String(formData.get("studentId") || "")
  const courseId = String(formData.get("courseId") || "")
  if (!studentId || !courseId) throw new Error("Choose both a student and a course.")

  const { error } = await supabase
    .from("enrollments")
    .upsert({ student_id: studentId, course_id: courseId }, { onConflict: "student_id,course_id", ignoreDuplicates: true })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/enrollments")
  revalidatePath("/admin/students")
}

export async function removeEnrollment(enrollmentId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("enrollments").delete().eq("id", enrollmentId)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/enrollments")
  revalidatePath("/admin/students")
}
