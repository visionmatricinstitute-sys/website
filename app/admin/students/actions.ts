"use server"

import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/admin-students"
import { createServiceClient } from "@/lib/supabase/service"
import { SITE_URL } from "@/lib/certificates"
import { logAudit } from "@/lib/audit-log"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Creates a student account and emails them an invitation to set their own password.
// Admin-only (requireAdmin runs first, before the service-role client is touched). Deliberately
// create-only: deleting an account would cascade to that student's progress and certificates.
export async function createStudentAccount(formData: FormData) {
  const supabase = await requireAdmin()
  const {
    data: { user: admin },
  } = await supabase.auth.getUser()

  const fullName = String(formData.get("fullName") || "").trim()
  const email = String(formData.get("email") || "").trim().toLowerCase()
  const courseId = String(formData.get("courseId") || "").trim()

  if (!fullName) throw new Error("Student name is required.")
  if (!EMAIL_RE.test(email)) throw new Error("Enter a valid email address.")

  const service = createServiceClient()
  // inviteUserByEmail creates the account and sends Supabase's invite email through the
  // project's SMTP. It is an admin (service-role) call, so it is not subject to the CAPTCHA
  // that protects public sign-in and password-reset requests.
  const { data, error } = await service.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    redirectTo: `${SITE_URL}/reset-password`,
  })
  if (error) {
    if (/already (been )?registered|already exists/i.test(error.message)) {
      throw new Error("An account with this email already exists.")
    }
    throw new Error(error.message)
  }

  const studentId = data.user?.id
  if (studentId && courseId) {
    const { error: enrollError } = await supabase
      .from("enrollments")
      .upsert({ student_id: studentId, course_id: courseId }, { onConflict: "student_id,course_id", ignoreDuplicates: true })
    if (enrollError) throw new Error(`Account created and invited, but enrolling failed: ${enrollError.message}`)
  }

  if (admin) {
    await logAudit({
      actorId: admin.id,
      action: "student.create",
      entityType: "student",
      entityId: studentId,
      metadata: { email, enrolled_course_id: courseId || null },
    })
  }

  revalidatePath("/admin/students")
  revalidatePath("/admin/enrollments")
}
