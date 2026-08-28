import { createClient } from "@/lib/supabase/server"

// Returns null for admins (no filter needed — see the calling page) or the list of course
// ids an instructor has been assigned (possibly empty, meaning they see nothing yet).
// RLS is still the real enforcement for writes; this is what keeps the admin content
// pages from showing an instructor a confusing list of courses they can't act on.
export async function getInstructorCourseIds(userId: string, role: string | undefined) {
  if (role !== "instructor") return null
  const supabase = await createClient()
  const { data } = await supabase.from("course_instructors").select("course_id").eq("instructor_id", userId)
  return (data ?? []).map((r: any) => r.course_id as string)
}
