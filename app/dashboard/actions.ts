"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

// Free/manual enrollment — no longer wired into the dashboard UI now that
// paid courses go through Razorpay (see components/dashboard/enroll-button.tsx
// and app/api/razorpay/). Kept for admin/offline use (e.g. a WhatsApp-negotiated
// enrollment) rather than deleted.
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

// Lets the certificate's own student turn public display of their name on or
// off. The database function only updates a valid certificate that belongs to
// the signed-in user.
export async function setCertificateNameConsent(certificateId: string, consent: boolean) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { error } = await supabase.rpc("set_certificate_name_consent", {
    p_certificate_id: certificateId,
    p_consent: consent,
  })
  if (error) throw new Error(error.message)

  revalidatePath("/dashboard")
}
