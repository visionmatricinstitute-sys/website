"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") redirect("/dashboard")
  return supabase
}

// Approves a pending certificate. The database function checks again that the
// caller is an admin, assigns the certificate ID, saves the name/course/hours
// on the certificate, and (unless overridden) checks that a payment was made.
// Name display on the public page is off; the student turns it on themselves.
export async function approveCertificate(formData: FormData) {
  const supabase = await requireAdmin()

  const certificateId = String(formData.get("certificateId") || "")
  const recipientName = String(formData.get("recipientName") || "").trim()
  const courseHours = Number(formData.get("courseHours"))
  const paymentOverride = formData.get("paymentOverride") === "on"

  if (!certificateId || !recipientName || !Number.isInteger(courseHours) || courseHours <= 0) {
    throw new Error("Certificate, recipient name and whole-number course hours are required.")
  }

  const { error } = await supabase.rpc("approve_certificate", {
    p_certificate_id: certificateId,
    p_recipient_name: recipientName,
    p_course_hours: courseHours,
    p_public_name_consent: false,
    p_payment_override: paymentOverride,
  })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/certificates")
  revalidatePath("/dashboard")
}

export async function revokeCertificate(formData: FormData) {
  const supabase = await requireAdmin()

  const certificateId = String(formData.get("certificateId") || "")
  const reason = String(formData.get("reason") || "").trim()
  if (!certificateId || !reason) throw new Error("A reason is required to revoke a certificate.")

  const { error } = await supabase.rpc("revoke_certificate", {
    p_certificate_id: certificateId,
    p_reason: reason,
  })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/certificates")
  revalidatePath("/dashboard")
}
