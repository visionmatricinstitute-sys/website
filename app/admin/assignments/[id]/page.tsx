import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Download, Save, Trash2 } from "lucide-react"
import { gradeSubmission, updateAssignment, deleteAssignment } from "../actions"

export default async function AdminAssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: assignment } = await supabase
    .from("assignments")
    .select("id, title, description, due_at, courses(title)")
    .eq("id", id)
    .single()
  if (!assignment) notFound()

  const { data: submissions } = await supabase
    .from("assignment_submissions")
    .select("id, student_id, file_path, file_name, submitted_at, grade, feedback")
    .eq("assignment_id", id)
    .order("submitted_at", { ascending: false })

  const studentIds = [...new Set((submissions ?? []).map((s: any) => s.student_id))]
  const { data: profiles } =
    studentIds.length > 0 ? await supabase.from("profiles").select("id, full_name").in("id", studentIds) : { data: [] }
  const nameByStudent = new Map((profiles ?? []).map((p: any) => [p.id, p.full_name]))

  const submissionsWithUrls = await Promise.all(
    (submissions ?? []).map(async (s: any) => {
      const { data } = await supabase.storage.from("assignment-submissions").createSignedUrl(s.file_path, 3600)
      return { ...s, studentName: nameByStudent.get(s.student_id), downloadUrl: data?.signedUrl ?? null }
    }),
  )

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">{assignment.title}</h1>
        <p className="text-muted-foreground font-serif mt-1">
          {(assignment as any).courses?.title}
          {assignment.due_at ? ` · Due ${new Date(assignment.due_at).toLocaleString()}` : ""}
        </p>
        {assignment.description && (
          <p className="text-sm text-muted-foreground font-serif mt-2">{assignment.description}</p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-base">Edit Assignment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={updateAssignment.bind(null, id)} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required defaultValue={assignment.title} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" defaultValue={assignment.description ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dueAt">Due Date</Label>
              <Input
                id="dueAt"
                name="dueAt"
                type="datetime-local"
                defaultValue={assignment.due_at ? new Date(assignment.due_at).toISOString().slice(0, 16) : ""}
              />
            </div>
            <Button type="submit" size="sm" variant="outline" className="gap-1.5 bg-transparent">
              <Save className="h-3.5 w-3.5" /> Save Changes
            </Button>
          </form>
          <form action={deleteAssignment.bind(null, id)}>
            <Button type="submit" size="sm" variant="ghost" className="gap-1.5 text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Delete Assignment
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">Submissions</h2>
        {submissionsWithUrls.length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No submissions yet.</p>
        ) : (
          submissionsWithUrls.map((s: any) => (
            <Card key={s.id}>
              <CardContent className="py-4 space-y-3">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-semibold text-foreground">{s.studentName || "Student"}</div>
                    <div className="text-xs text-muted-foreground">
                      Submitted {new Date(s.submitted_at).toLocaleString()}
                    </div>
                  </div>
                  {s.downloadUrl && (
                    <Button asChild variant="outline" size="sm" className="gap-1.5 bg-transparent">
                      <a href={s.downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-3.5 w-3.5" /> {s.file_name}
                      </a>
                    </Button>
                  )}
                </div>
                <form action={gradeSubmission.bind(null, s.id, id)} className="flex gap-2 items-end flex-wrap">
                  <div className="space-y-1.5">
                    <Label htmlFor={`grade-${s.id}`}>Grade (%)</Label>
                    <Input
                      id={`grade-${s.id}`}
                      name="grade"
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={s.grade ?? ""}
                      className="w-24"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-[200px]">
                    <Label htmlFor={`feedback-${s.id}`}>Feedback</Label>
                    <Input id={`feedback-${s.id}`} name="feedback" defaultValue={s.feedback ?? ""} placeholder="Feedback for the student" />
                  </div>
                  <Button type="submit" size="sm">
                    Save Grade
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
