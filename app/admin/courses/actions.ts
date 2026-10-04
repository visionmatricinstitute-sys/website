"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function courseFieldsFromForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim()
  const rupees = String(formData.get("priceRupees") || "").trim()

  return {
    title,
    short_description: String(formData.get("shortDescription") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    category: String(formData.get("category") || "").trim() || null,
    level: String(formData.get("level") || "").trim() || null,
    language: String(formData.get("language") || "English").trim() || "English",
    thumbnail_url: String(formData.get("thumbnailUrl") || "").trim() || null,
    prerequisites: String(formData.get("prerequisites") || "").trim() || null,
    learning_objectives: String(formData.get("learningObjectives") || "").trim() || null,
    price_amount: rupees ? Math.round(Number(rupees) * 100) : null,
  }
}

export async function createCourse(formData: FormData) {
  const supabase = await createClient()
  const fields = courseFieldsFromForm(formData)
  if (!fields.title) throw new Error("Course title is required.")

  const slugInput = String(formData.get("slug") || "").trim()
  const slug = slugify(slugInput || fields.title)
  if (!slug) throw new Error("Could not derive a URL slug from the title — set one manually.")

  const { data, error } = await supabase.from("courses").insert({ ...fields, slug }).select("id").single()
  if (error) throw new Error(error.message)

  revalidatePath("/admin/courses")
  redirect(`/admin/courses/${data.id}`)
}

export async function updateCourse(courseId: string, formData: FormData) {
  const supabase = await createClient()
  const fields = courseFieldsFromForm(formData)
  if (!fields.title) throw new Error("Course title is required.")

  const { data: course } = await supabase.from("courses").select("slug").eq("id", courseId).single()

  const { error } = await supabase.from("courses").update(fields).eq("id", courseId)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/courses")
  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath("/dashboard")
  if (course?.slug) revalidatePath(`/dashboard/courses/${course.slug}`)
}

export async function setCourseStatus(courseId: string, status: "draft" | "published" | "archived") {
  const supabase = await createClient()
  const { error } = await supabase.from("courses").update({ status }).eq("id", courseId)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/courses")
  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath("/dashboard")
}

export async function createModule(courseId: string, formData: FormData) {
  const supabase = await createClient()
  const title = String(formData.get("title") || "").trim()
  if (!title) throw new Error("Module title is required.")

  const { data: existing } = await supabase
    .from("course_modules")
    .select("order_index")
    .eq("course_id", courseId)
    .order("order_index", { ascending: false })
    .limit(1)
  const nextOrder = (existing?.[0]?.order_index ?? -1) + 1

  const { error } = await supabase.from("course_modules").insert({
    course_id: courseId,
    order_index: nextOrder,
    module_number: String(formData.get("moduleNumber") || "").trim() || String(nextOrder + 1).padStart(2, "0"),
    title,
    hours: String(formData.get("hours") || "").trim() || null,
    focus: String(formData.get("focus") || "").trim() || null,
  })
  if (error) throw new Error(error.message)

  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath("/admin/modules")
}

export async function deleteModule(courseId: string, moduleId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("course_modules").delete().eq("id", moduleId)
  if (error) throw new Error(error.message)

  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath("/admin/modules")
}

export async function moveModule(courseId: string, moduleId: string, direction: "up" | "down") {
  const supabase = await createClient()
  const { data: siblings } = await supabase
    .from("course_modules")
    .select("id, order_index")
    .eq("course_id", courseId)
    .order("order_index")
  if (!siblings) return

  const index = siblings.findIndex((m) => m.id === moduleId)
  const swapWith = direction === "up" ? index - 1 : index + 1
  if (index === -1 || swapWith < 0 || swapWith >= siblings.length) return

  const a = siblings[index]
  const b = siblings[swapWith]

  await supabase.from("course_modules").update({ order_index: b.order_index }).eq("id", a.id)
  await supabase.from("course_modules").update({ order_index: a.order_index }).eq("id", b.id)

  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath("/admin/modules")
}
