"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function updateModuleVideo(moduleId: string, formData: FormData) {
  const supabase = await createClient()
  const videoUrl = String(formData.get("videoUrl") || "").trim() || null

  const { data: mod } = await supabase
    .from("course_modules")
    .select("courses(slug)")
    .eq("id", moduleId)
    .single()

  const { error } = await supabase.from("course_modules").update({ video_url: videoUrl }).eq("id", moduleId)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/modules")
  const slug = (mod as any)?.courses?.slug
  if (slug) revalidatePath(`/dashboard/courses/${slug}`)
}
