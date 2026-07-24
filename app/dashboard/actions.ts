"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function enrollInCourse(courseId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  await supabase.from("enrollments").insert({ student_id: user.id, course_id: courseId })
  revalidatePath("/dashboard")
}

export async function toggleModuleComplete(moduleId: string, isCompleted: boolean, courseSlug: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const nextStatus = isCompleted ? "not_started" : "completed"
  await supabase.from("module_progress").upsert(
    {
      student_id: user.id,
      module_id: moduleId,
      status: nextStatus,
      completed_at: nextStatus === "completed" ? new Date().toISOString() : null,
    },
    { onConflict: "student_id,module_id" },
  )

  revalidatePath(`/dashboard/courses/${courseSlug}`)
  revalidatePath("/dashboard")
}

export async function logAttendance(liveClassId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  await supabase
    .from("attendance")
    .upsert({ live_class_id: liveClassId, student_id: user.id }, { onConflict: "live_class_id,student_id" })
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
