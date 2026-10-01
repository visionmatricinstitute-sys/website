"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const fullName = String(formData.get("fullName") || "").trim()
  const phone = String(formData.get("phone") || "").trim() || null
  if (!fullName) throw new Error("Name is required.")

  const { error } = await supabase.from("profiles").update({ full_name: fullName, phone }).eq("id", user.id)
  if (error) throw new Error(error.message)

  revalidatePath("/dashboard/profile")
  revalidatePath("/dashboard")
}

export async function changePassword(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const newPassword = String(formData.get("newPassword") || "")
  const confirmPassword = String(formData.get("confirmPassword") || "")

  if (newPassword.length < 8) throw new Error("Password must be at least 8 characters.")
  if (newPassword !== confirmPassword) throw new Error("Passwords do not match.")

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw new Error(error.message)

  revalidatePath("/dashboard/profile")
}
