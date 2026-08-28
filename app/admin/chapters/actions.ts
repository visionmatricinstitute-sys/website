"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function addChapter(moduleId: string, formData: FormData) {
  const supabase = await createClient()
  const title = String(formData.get("title") || "").trim()
  const videoUrl = String(formData.get("videoUrl") || "").trim() || null
  if (!title) throw new Error("Chapter title is required.")

  const { data: existing } = await supabase
    .from("chapters")
    .select("order_index")
    .eq("module_id", moduleId)
    .order("order_index", { ascending: false })
    .limit(1)
  const nextOrder = (existing?.[0]?.order_index ?? -1) + 1

  const { error } = await supabase.from("chapters").insert({ module_id: moduleId, title, video_url: videoUrl, order_index: nextOrder })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/chapters")
}

export async function updateChapter(chapterId: string, formData: FormData) {
  const supabase = await createClient()
  const title = String(formData.get("title") || "").trim()
  const videoUrl = String(formData.get("videoUrl") || "").trim() || null
  if (!title) throw new Error("Chapter title is required.")

  const { error } = await supabase.from("chapters").update({ title, video_url: videoUrl }).eq("id", chapterId)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/chapters")
}

export async function deleteChapter(chapterId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("chapters").delete().eq("id", chapterId)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/chapters")
}

export async function moveChapter(moduleId: string, chapterId: string, direction: "up" | "down") {
  const supabase = await createClient()
  const { data: siblings } = await supabase
    .from("chapters")
    .select("id, order_index")
    .eq("module_id", moduleId)
    .order("order_index")
  if (!siblings) return

  const index = siblings.findIndex((c) => c.id === chapterId)
  const swapWith = direction === "up" ? index - 1 : index + 1
  if (index === -1 || swapWith < 0 || swapWith >= siblings.length) return

  const a = siblings[index]
  const b = siblings[swapWith]

  await supabase.from("chapters").update({ order_index: b.order_index }).eq("id", a.id)
  await supabase.from("chapters").update({ order_index: a.order_index }).eq("id", b.id)

  revalidatePath("/admin/chapters")
}
