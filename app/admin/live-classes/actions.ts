"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createZoomMeeting } from "@/lib/zoom"
import { logAudit } from "@/lib/audit-log"

export async function scheduleLiveClass(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const courseId = String(formData.get("courseId") || "")
  const title = String(formData.get("title") || "")
  const description = String(formData.get("description") || "") || undefined
  const scheduledStart = String(formData.get("scheduledStart") || "")
  const durationMinutes = Number(formData.get("durationMinutes")) || 60

  if (!courseId || !title || !scheduledStart) {
    throw new Error("Course, title and date/time are required.")
  }

  const startTimeIso = new Date(scheduledStart).toISOString()

  const meeting = await createZoomMeeting({
    topic: title,
    agenda: description,
    startTimeIso,
    durationMinutes,
  })

  const { error } = await supabase.from("live_classes").insert({
    course_id: courseId,
    title,
    description,
    scheduled_start: startTimeIso,
    duration_minutes: durationMinutes,
    zoom_meeting_id: meeting.meetingId,
    join_url: meeting.joinUrl,
    start_url: meeting.startUrl,
    created_by: user.id,
  })

  if (error) throw new Error(error.message)

  revalidatePath("/admin/live-classes")
  revalidatePath("/dashboard")
}

// Edits the title/description shown to students. Date/time and duration are not editable
// here because they are baked into the Zoom meeting created at scheduling time — to move a
// session, delete it and schedule a new one.
export async function updateLiveClass(classId: string, formData: FormData) {
  const supabase = await createClient()
  const title = String(formData.get("title") || "").trim()
  if (!title) throw new Error("Title is required.")

  const { error } = await supabase
    .from("live_classes")
    .update({ title, description: String(formData.get("description") || "").trim() || null })
    .eq("id", classId)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/live-classes")
  revalidatePath("/dashboard")
}

// Removes the session from VMI. The Zoom meeting itself is not cancelled by this — cancel it
// in Zoom if students might still join it.
export async function deleteLiveClass(classId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: row } = await supabase.from("live_classes").select("title, scheduled_start").eq("id", classId).single()

  const { error } = await supabase.from("live_classes").delete().eq("id", classId)
  if (error) throw new Error(error.message)

  await logAudit({
    actorId: user.id,
    action: "live_class.delete",
    entityType: "live_class",
    entityId: classId,
    metadata: row ?? undefined,
  })

  revalidatePath("/admin/live-classes")
  revalidatePath("/dashboard")
}
