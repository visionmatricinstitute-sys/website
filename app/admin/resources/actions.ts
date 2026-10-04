"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function uploadResource(formData: FormData) {
  const supabase = await createClient()

  const target = String(formData.get("target") || "")
  const [courseId, moduleId] = target.split("::")
  const title = String(formData.get("title") || "").trim()
  const resourceType = String(formData.get("resourceType") || "pdf").trim() || "pdf"
  const file = formData.get("file") as File | null

  if (!courseId) throw new Error("Choose a course or module to attach this resource to.")
  if (!title) throw new Error("Resource title is required.")
  if (!file || file.size === 0) throw new Error("Please choose a file to upload.")

  const path = `${courseId}/${moduleId || "course"}/${Date.now()}-${file.name}`
  const { error: uploadError } = await supabase.storage.from("course-resources").upload(path, file)
  if (uploadError) throw new Error(uploadError.message)

  const { error } = await supabase.from("resources").insert({
    course_id: courseId,
    module_id: moduleId || null,
    title,
    resource_type: resourceType,
    file_path: path,
    file_name: file.name,
    file_url: null,
  })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/resources")
  revalidatePath("/dashboard")
}

export async function deleteResource(resourceId: string) {
  const supabase = await createClient()

  const { data: resource } = await supabase.from("resources").select("file_path").eq("id", resourceId).single()

  const { error } = await supabase.from("resources").delete().eq("id", resourceId)
  if (error) throw new Error(error.message)

  if (resource?.file_path) {
    await supabase.storage.from("course-resources").remove([resource.file_path])
  }

  revalidatePath("/admin/resources")
  revalidatePath("/dashboard")
}
