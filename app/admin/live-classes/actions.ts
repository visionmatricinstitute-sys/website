"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createZoomMeeting } from "@/lib/zoom"

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
