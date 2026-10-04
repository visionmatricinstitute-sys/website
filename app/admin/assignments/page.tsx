import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ClipboardList, Search } from "lucide-react"
import { createAssignment } from "./actions"

export default async function AdminAssignmentsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const supabase = await createClient()
  const { data: courses } = await supabase.from("courses").select("id, title").order("title")
  const { data: assignments } = await supabase
    .from("assignments")
    .select("id, title, due_at, courses(title), assignment_submissions(id)")
    .order("created_at", { ascending: false })

  const query = (q ?? "").trim().toLowerCase()
  const filteredAssignments = query
    ? (assignments ?? []).filter(
        (a: any) => a.title.toLowerCase().includes(query) || a.courses?.title?.toLowerCase().includes(query),
      )
    : (assignments ?? [])

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Assignments</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Create an assignment for a course and review student submissions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">New Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createAssignment} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="e.g. Cable Sizing Calculation Report" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input id="description" name="description" placeholder="What students should submit" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueAt">Due Date (optional)</Label>
              <Input id="dueAt" name="dueAt" type="datetime-local" />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <ClipboardList className="mr-2 h-4 w-4" /> Create Assignment
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg font-bold font-sans text-foreground">All Assignments</h2>
          <form method="get" className="flex gap-2">
            <Input name="q" defaultValue={q ?? ""} placeholder="Search title or course" className="w-64" />
            <Button type="submit" variant="outline" size="sm" className="gap-1.5 bg-transparent flex-shrink-0">
              <Search className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
        {filteredAssignments.length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No assignments match.</p>
        ) : (
          filteredAssignments.map((a: any) => (
            <Link key={a.id} href={`/admin/assignments/${a.id}`}>
              <Card className="hover:border-accent/40 transition-colors">
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-foreground">{a.title}</div>
                    <div className="text-sm text-muted-foreground font-serif">
                      {a.courses?.title}
                      {a.due_at ? ` · Due ${new Date(a.due_at).toLocaleDateString()}` : ""}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground flex-shrink-0">
                    {a.assignment_submissions?.length ?? 0} submission
                    {(a.assignment_submissions?.length ?? 0) === 1 ? "" : "s"}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
