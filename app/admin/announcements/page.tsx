import { createClient } from "@/lib/supabase/server"
import { listStudentsWithEmail } from "@/lib/admin-students"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Trash2 } from "lucide-react"
import { createAnnouncement, deleteAnnouncement } from "./actions"

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient()
  const { data: courses } = await supabase.from("courses").select("id, title").order("title")
  const students = await listStudentsWithEmail()

  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, title, body, audience_type, created_at, courses(title)")
    .order("created_at", { ascending: false })

  const nameByStudent = new Map(students.map((s: any) => [s.id, s.full_name || s.email || "Student"]))

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Announcements</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Post to all students, one course, or one student. Leave both dropdowns blank to reach everyone.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">New Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createAnnouncement} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="e.g. New live class scheduled" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Message</Label>
              <Textarea id="body" name="body" required rows={4} placeholder="What students need to know" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseId">Course (optional)</Label>
                <select
                  id="courseId"
                  name="courseId"
                  defaultValue=""
                  className="file:text-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                >
                  <option value="">All courses</option>
                  {(courses ?? []).map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student (optional)</Label>
                <select
                  id="studentId"
                  name="studentId"
                  defaultValue=""
                  className="file:text-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                >
                  <option value="">All students</option>
                  {students.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.full_name || s.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-serif">
              If you pick a student, the course dropdown is ignored — it goes to that one student only.
            </p>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <Megaphone className="mr-2 h-4 w-4" /> Post Announcement
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">All Announcements</h2>
        {(announcements ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No announcements yet.</p>
        ) : (
          (announcements ?? []).map((a: any) => (
            <Card key={a.id}>
              <CardContent className="py-4 space-y-2">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{a.title}</span>
                    <Badge variant="secondary" className="capitalize">
                      {a.audience_type === "course" ? a.courses?.title ?? "Course" : a.audience_type === "student" ? "One student" : "All students"}
                    </Badge>
                  </div>
                  <form action={deleteAnnouncement.bind(null, a.id)}>
                    <button type="submit" className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
                <p className="text-sm text-muted-foreground font-serif">{a.body}</p>
                <p className="text-xs text-muted-foreground font-mono">{new Date(a.created_at).toLocaleString()}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
