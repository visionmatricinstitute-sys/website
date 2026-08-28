import { createClient } from "@/lib/supabase/server"
import { listStudentsWithEmail } from "@/lib/admin-students"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UserPlus, Trash2 } from "lucide-react"
import { manualEnroll, removeEnrollment } from "./actions"

export default async function AdminEnrollmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string }>
}) {
  const { student } = await searchParams
  const supabase = await createClient()

  const students = await listStudentsWithEmail()
  const { data: courses } = await supabase.from("courses").select("id, title").order("title")

  let query = supabase
    .from("enrollments")
    .select("id, student_id, enrolled_at, courses(title)")
    .order("enrolled_at", { ascending: false })
  if (student) query = query.eq("student_id", student)
  const { data: enrollments } = await query

  const nameByStudent = new Map(students.map((s: any) => [s.id, s.full_name || s.email || "Student"]))
  const filteredStudentName = student ? nameByStudent.get(student) : null

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Enrollments</h1>
        <p className="text-muted-foreground font-serif mt-1">
          {filteredStudentName ? `Showing enrollments for ${filteredStudentName}.` : "Manually enroll or remove a student from a course."}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Enroll a Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={manualEnroll} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student</Label>
              <select
                id="studentId"
                name="studentId"
                required
                defaultValue={student ?? ""}
                className="file:text-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
              >
                <option value="" disabled>
                  Select a student
                </option>
                {students.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name || "Unnamed"} ({s.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseId">Course</Label>
              <select
                id="courseId"
                name="courseId"
                required
                defaultValue=""
                className="file:text-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
              >
                <option value="" disabled>
                  Select a course
                </option>
                {(courses ?? []).map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <UserPlus className="mr-2 h-4 w-4" /> Enroll
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">
          {filteredStudentName ? "This Student's Enrollments" : "All Enrollments"}
        </h2>
        {(enrollments ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No enrollments yet.</p>
        ) : (
          (enrollments ?? []).map((e: any) => (
            <Card key={e.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-semibold text-foreground">{nameByStudent.get(e.student_id) ?? "Student"}</div>
                  <div className="text-sm text-muted-foreground font-serif">
                    {e.courses?.title} &middot; Enrolled {new Date(e.enrolled_at).toLocaleDateString()}
                  </div>
                </div>
                <form action={removeEnrollment.bind(null, e.id)}>
                  <button type="submit" className="text-destructive hover:text-destructive/80 flex-shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
