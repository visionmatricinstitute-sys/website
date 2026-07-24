"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function submitAssignment(assignmentId: string, courseSlug: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const file = formData.get("file") as File | null
  if (!file || file.size === 0) throw new Error("Please choose a file to upload.")

  const path = `${user.id}/${assignmentId}/${Date.now()}-${file.name}`
  const { error: uploadError } = await supabase.storage.from("assignment-submissions").upload(path, file, { upsert: true })
  if (uploadError) throw new Error(uploadError.message)

  const { error } = await supabase.from("assignment_submissions").upsert(
    {
      assignment_id: assignmentId,
      student_id: user.id,
      file_path: path,
      file_name: file.name,
      submitted_at: new Date().toISOString(),
      grade: null,
      feedback: null,
      graded_at: null,
    },
    { onConflict: "assignment_id,student_id" },
  )
  if (error) throw new Error(error.message)

  revalidatePath(`/dashboard/courses/${courseSlug}`)
}
