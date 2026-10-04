import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { listStudentsWithEmail } from "@/lib/admin-students"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UserPlus, UserMinus, Link2 } from "lucide-react"
import { promoteToInstructor, demoteInstructor, assignInstructorToCourse, removeInstructorAssignment } from "./actions"

export default async function AdminInstructorsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
  if (profile?.role !== "admin") redirect("/dashboard")

  const people = await listStudentsWithEmail()
  const students = people.filter((p: any) => p.role === "student")
  const instructors = people.filter((p: any) => p.role === "instructor")

  const { data: courses } = await supabase.from("courses").select("id, title").order("title")
  const { data: assignments } = await supabase
    .from("course_instructors")
    .select("id, instructor_id, courses(title)")
    .order("created_at", { ascending: false })

  const nameByPerson = new Map(people.map((p: any) => [p.id, p.full_name || p.email || "Instructor"]))

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Instructors</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Promote a student to instructor, then assign them to the course(s) they'll manage. Instructors can only
          create/edit content for courses they're assigned to — they never get full admin access.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-base">Instructors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {instructors.length === 0 ? (
            <p className="text-sm text-muted-foreground font-serif">No instructors yet.</p>
          ) : (
            instructors.map((i: any) => (
              <div key={i.id} className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-foreground">{i.full_name || "Unnamed"}</div>
                  <div className="text-sm text-muted-foreground font-serif">{i.email}</div>
                </div>
                <form action={demoteInstructor.bind(null, i.id)}>
                  <Button type="submit" size="sm" variant="ghost" className="gap-1.5 text-destructive hover:text-destructive">
                    <UserMinus className="h-3.5 w-3.5" /> Remove Role
                  </Button>
                </form>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-base">Promote a Student</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {students.length === 0 ? (
            <p className="text-sm text-muted-foreground font-serif">No student accounts to promote.</p>
          ) : (
            students.map((s: any) => (
              <div key={s.id} className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-foreground">{s.full_name || "Unnamed"}</div>
                  <div className="text-sm text-muted-foreground font-serif">{s.email}</div>
                </div>
                <form action={promoteToInstructor.bind(null, s.id)}>
                  <Button type="submit" size="sm" variant="outline" className="gap-1.5 bg-transparent">
                    <UserPlus className="h-3.5 w-3.5" /> Make Instructor
                  </Button>
                </form>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-base">Assign to a Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={assignInstructorToCourse} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instructorId">Instructor</Label>
              <select
                id="instructorId"
                name="instructorId"
                required
                defaultValue=""
                className="file:text-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
              >
                <option value="" disabled>
                  Select an instructor
                </option>
                {instructors.map((i: any) => (
                  <option key={i.id} value={i.id}>
                    {i.full_name || i.email}
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
              <Link2 className="mr-2 h-4 w-4" /> Assign
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">Current Assignments</h2>
        {(assignments ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No course assignments yet.</p>
        ) : (
          (assignments ?? []).map((a: any) => (
            <Card key={a.id}>
              <CardContent className="py-3 flex items-center justify-between gap-4">
                <div className="text-sm">
                  <span className="font-medium text-foreground">{nameByPerson.get(a.instructor_id)}</span>
                  <span className="text-muted-foreground"> — {a.courses?.title}</span>
                </div>
                <form action={removeInstructorAssignment.bind(null, a.id)}>
                  <button type="submit" className="text-destructive hover:text-destructive/80 text-sm">
                    Remove
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
