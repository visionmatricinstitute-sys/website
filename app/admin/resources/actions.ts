"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

function parseWebUrl(rawUrl: string): string {
  // Only plain web links: blocks javascript:, data: and other schemes that would run
  // code or leak content when a student clicks the link.
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    throw new Error("Enter a full link starting with https://")
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Links must start with http:// or https://")
  }
  return url.toString()
}

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

export async function addResourceLink(formData: FormData) {
  const supabase = await createClient()

  const target = String(formData.get("target") || "")
  const [courseId, moduleId] = target.split("::")
  const title = String(formData.get("title") || "").trim()
  const rawUrl = String(formData.get("url") || "").trim()

  if (!courseId) throw new Error("Choose a course or module to attach this link to.")
  if (!title) throw new Error("Link title is required.")

  const fileUrl = parseWebUrl(rawUrl)

  const { error } = await supabase.from("resources").insert({
    course_id: courseId,
    module_id: moduleId || null,
    title,
    resource_type: "link",
    file_url: fileUrl,
    file_path: null,
    file_name: null,
  })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/resources")
  revalidatePath("/dashboard")
}

export async function updateResource(resourceId: string, formData: FormData) {
  const supabase = await createClient()
  const title = String(formData.get("title") || "").trim()
  if (!title) throw new Error("Title is required.")

  const { data: existing } = await supabase.from("resources").select("file_path, file_url").eq("id", resourceId).single()
  if (!existing) throw new Error("Resource not found.")

  const update: Record<string, unknown> = { title }
  if (existing.file_path) {
    // Uploaded file: the type label can change; replace the file by deleting and re-uploading.
    update.resource_type = String(formData.get("resourceType") || "").trim() || "other"
  } else {
    // Link: the URL can be changed too.
    update.file_url = parseWebUrl(String(formData.get("url") || "").trim())
  }

  const { error } = await supabase.from("resources").update(update).eq("id", resourceId)
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
