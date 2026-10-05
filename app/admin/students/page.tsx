import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { listStudentsWithEmail } from "@/lib/admin-students"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Search, UserCog, UserPlus } from "lucide-react"
import { createStudentAccount } from "./actions"

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const supabase = await createClient()

  const students = await listStudentsWithEmail()
  const { data: allCourses } = await supabase.from("courses").select("id, title").order("title")

  const { data: enrollments } = await supabase.from("enrollments").select("student_id, courses(title)")
  const coursesByStudent = new Map<string, string[]>()
  for (const e of enrollments ?? []) {
    const list = coursesByStudent.get(e.student_id) ?? []
    if ((e as any).courses?.title) list.push((e as any).courses.title)
    coursesByStudent.set(e.student_id, list)
  }

  const query = (q ?? "").trim().toLowerCase()
  const filtered = query
    ? students.filter(
        (s: any) => (s.full_name ?? "").toLowerCase().includes(query) || (s.email ?? "").toLowerCase().includes(query),
      )
    : students

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Students</h1>
        <p className="text-muted-foreground font-serif mt-1">
          {students.length} account{students.length === 1 ? "" : "s"} total.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Add a student</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createStudentAccount} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" name="fullName" required placeholder="e.g. Asha Verma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="student@example.com" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="courseId">Enroll in a course (optional)</Label>
              <select
                id="courseId"
                name="courseId"
                defaultValue=""
                className="border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs"
              >
                <option value="">Don&apos;t enroll yet</option>
                {(allCourses ?? []).map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                <UserPlus className="mr-2 h-4 w-4" /> Create account &amp; send invite
              </Button>
              <p className="text-xs text-muted-foreground font-serif">
                The student gets an email with a link to set their own password. Accounts can't be deleted from here —
                that would erase the student's progress and certificates.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <form method="get" className="flex gap-2 max-w-sm">
        <Input name="q" defaultValue={q ?? ""} placeholder="Search name or email" />
        <Button type="submit" variant="outline" className="gap-1.5 bg-transparent flex-shrink-0">
          <Search className="h-3.5 w-3.5" /> Search
        </Button>
      </form>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No students match.</p>
        ) : (
          filtered.map((s: any) => {
            const courses = coursesByStudent.get(s.id) ?? []
            return (
              <Card key={s.id}>
                <CardContent className="py-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{s.full_name || "Unnamed"}</span>
                      {s.role === "admin" && <Badge variant="secondary">Admin</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground font-serif">{s.email}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {courses.length > 0 ? courses.join(", ") : "Not enrolled in any course"}
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="gap-1.5 bg-transparent flex-shrink-0">
                    <Link href={`/admin/enrollments?student=${s.id}`}>
                      <UserCog className="h-3.5 w-3.5" /> Manage Enrollment
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
