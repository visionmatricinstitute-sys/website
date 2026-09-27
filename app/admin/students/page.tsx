import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { listStudentsWithEmail } from "@/lib/admin-students"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, UserCog } from "lucide-react"

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const supabase = await createClient()

  const students = await listStudentsWithEmail()

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
