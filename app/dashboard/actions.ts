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

// Marks one chapter watched — but only after checking, server-side, that it's actually
// unlocked (previous chapter in the same module completed, or for a module's first
// chapter, the previous module's quiz already passed). Module completion itself is no
// longer student-togglable at all (see 008_chapters.sql) — it's system-derived from a
// passing quiz score in submitQuizAttempt.
export async function markChapterComplete(chapterId: string, courseSlug: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: chapter } = await supabase
    .from("chapters")
    .select("id, order_index, module_id, course_modules(id, order_index, course_id)")
    .eq("id", chapterId)
    .single()
  if (!chapter) throw new Error("Chapter not found.")

  const thisModule = (chapter as any).course_modules
  const moduleId = chapter.module_id

  const { data: siblingChapters } = await supabase
    .from("chapters")
    .select("id, order_index")
    .eq("module_id", moduleId)
    .order("order_index")
  const isFirstChapterInModule = (siblingChapters ?? [])[0]?.id === chapterId

  if (isFirstChapterInModule) {
    const { data: courseModules } = await supabase
      .from("course_modules")
      .select("id, order_index")
      .eq("course_id", thisModule.course_id)
      .order("order_index")
    const isFirstModuleInCourse = (courseModules ?? [])[0]?.id === moduleId

    if (!isFirstModuleInCourse) {
      const prevModule = (courseModules ?? [])
        .filter((m: any) => m.order_index < thisModule.order_index)
        .sort((a: any, b: any) => b.order_index - a.order_index)[0]
      const { data: prevProgress } = prevModule
        ? await supabase
            .from("module_progress")
            .select("status")
            .eq("student_id", user.id)
            .eq("module_id", prevModule.id)
            .maybeSingle()
        : { data: null }
      if (prevProgress?.status !== "completed") {
        throw new Error("Pass the previous module's quiz to unlock this chapter.")
      }
    }
  } else {
    const prevChapter = (siblingChapters ?? [])
      .filter((c: any) => c.order_index < chapter.order_index)
      .sort((a: any, b: any) => b.order_index - a.order_index)[0]
    const { data: prevProgress } = prevChapter
      ? await supabase
          .from("chapter_progress")
          .select("status")
          .eq("student_id", user.id)
          .eq("chapter_id", prevChapter.id)
          .maybeSingle()
      : { data: null }
    if (prevProgress?.status !== "completed") {
      throw new Error("Watch the previous chapter first.")
    }
  }

  await supabase.from("chapter_progress").upsert(
    { student_id: user.id, chapter_id: chapterId, status: "completed", completed_at: new Date().toISOString() },
    { onConflict: "student_id,chapter_id" },
  )

  revalidatePath(`/dashboard/courses/${courseSlug}`)
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
