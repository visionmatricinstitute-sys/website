import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { getInstructorCourseIds } from "@/lib/instructor-scope"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Save, Trash2, ArrowUp, ArrowDown, Pencil, FileQuestion } from "lucide-react"
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button"
import { QuizBuilder } from "@/components/admin/quiz-builder"
import { createModule, updateModule, deleteModule, moveModule } from "../courses/actions"
import { addChapter, updateChapter, deleteChapter, moveChapter } from "../chapters/actions"

export default async function TeacherPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course: courseParam } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user!.id).maybeSingle()
  const courseIds = await getInstructorCourseIds(user!.id, profile?.role)

  let coursesQuery = supabase.from("courses").select("id, title").order("title")
  if (courseIds) coursesQuery = coursesQuery.in("id", courseIds)
  const { data: courses } = await coursesQuery

  if (!courses || courses.length === 0) {
    return (
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Teacher</h1>
        <p className="text-muted-foreground font-serif">
          {courseIds
            ? "You haven't been assigned to a course yet. Ask an admin to assign you one."
            : "There are no courses yet. Create one under Courses first."}
        </p>
      </div>
    )
  }

  const selected = courses.find((c: any) => c.id === courseParam) ?? courses[0]

  const { data: modules } = await supabase
    .from("course_modules")
    .select("id, order_index, module_number, title, hours, focus, chapters(id, order_index, title, video_url), quizzes(id, title)")
    .eq("course_id", selected.id)
    .order("order_index")

  const moduleOptions = (modules ?? []).map((m: any) => ({ id: m.id, label: `${m.module_number} — ${m.title}` }))

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Teacher</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Build one course at a time: its modules, the chapters (with videos) inside each module, and each module&apos;s quiz.
        </p>
      </div>

      <form method="get" className="flex gap-2 items-end flex-wrap">
        <div className="space-y-1 flex-1 min-w-[220px]">
          <Label htmlFor="course" className="text-xs">
            Course
          </Label>
          <select
            id="course"
            name="course"
            defaultValue={selected.id}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {courses.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="outline" className="bg-transparent">
          Open
        </Button>
      </form>

      <div className="space-y-4">
        {(modules ?? []).length === 0 && <p className="text-sm text-muted-foreground font-serif">No modules yet — add the first one below.</p>}
        {(modules ?? []).map((m: any, mi: number, marr: any[]) => {
          const chapters = [...(m.chapters ?? [])].sort((a: any, b: any) => a.order_index - b.order_index)
          return (
            <Card key={m.id}>
              <CardContent className="py-4 space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <form action={moveModule.bind(null, selected.id, m.id, "up")}>
                      <button type="submit" disabled={mi === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30" aria-label="Move module up">
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                    </form>
                    <form action={moveModule.bind(null, selected.id, m.id, "down")}>
                      <button
                        type="submit"
                        disabled={mi === marr.length - 1}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                        aria-label="Move module down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </form>
                    <div className="ml-2 flex items-baseline gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{m.module_number}</span>
                      <span className="font-semibold text-foreground">{m.title}</span>
                      <span className="text-xs text-muted-foreground">{m.hours}</span>
                    </div>
                  </div>
                  <form action={deleteModule.bind(null, selected.id, m.id)}>
                    <ConfirmSubmitButton
                      ariaLabel="Delete module"
                      message={`Delete module "${m.title}"? Its chapters and quiz are deleted too. This cannot be undone.`}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </ConfirmSubmitButton>
                  </form>
                </div>

                <details>
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                    <Pencil className="h-3 w-3" /> Edit module details
                  </summary>
                  <form action={updateModule.bind(null, selected.id, m.id)} className="pt-3 flex gap-2 flex-wrap items-end">
                    <div className="space-y-1 w-20">
                      <Label className="text-xs">#</Label>
                      <Input name="moduleNumber" defaultValue={m.module_number ?? ""} />
                    </div>
                    <div className="space-y-1 flex-1 min-w-[180px]">
                      <Label className="text-xs">Title</Label>
                      <Input name="title" required defaultValue={m.title} />
                    </div>
                    <div className="space-y-1 w-24">
                      <Label className="text-xs">Hours</Label>
                      <Input name="hours" defaultValue={m.hours ?? ""} />
                    </div>
                    <div className="space-y-1 flex-1 min-w-[180px]">
                      <Label className="text-xs">Focus</Label>
                      <Input name="focus" defaultValue={m.focus ?? ""} />
                    </div>
                    <Button type="submit" size="sm" className="gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Save className="h-3.5 w-3.5" /> Save
                    </Button>
                  </form>
                </details>

                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Chapters</div>
                  {chapters.length === 0 && <p className="text-sm text-muted-foreground font-serif">No chapters yet.</p>}
                  {chapters.map((ch: any, i: number) => (
                    <div key={ch.id} className="rounded-lg border border-border p-3 space-y-2">
                      <div className="flex items-center gap-1">
                        <form action={moveChapter.bind(null, m.id, ch.id, "up")}>
                          <button type="submit" disabled={i === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30" aria-label="Move chapter up">
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                        </form>
                        <form action={moveChapter.bind(null, m.id, ch.id, "down")}>
                          <button
                            type="submit"
                            disabled={i === chapters.length - 1}
                            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                            aria-label="Move chapter down"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                        </form>
                        <span className="text-xs text-muted-foreground font-mono ml-1">Chapter {i + 1}</span>
                        <form action={deleteChapter.bind(null, ch.id)} className="ml-auto">
                          <ConfirmSubmitButton
                            ariaLabel="Delete chapter"
                            message={`Delete chapter "${ch.title}"?`}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </ConfirmSubmitButton>
                        </form>
                      </div>
                      <form action={updateChapter.bind(null, ch.id)} className="flex gap-2 flex-wrap">
                        <Input name="title" defaultValue={ch.title} placeholder="Chapter title" className="flex-1 min-w-[160px]" />
                        <Input
                          name="videoUrl"
                          defaultValue={ch.video_url ?? ""}
                          placeholder="https://youtube.com/watch?v=..."
                          className="flex-1 min-w-[200px]"
                        />
                        <Button type="submit" size="sm" variant="outline" className="gap-1.5 bg-transparent flex-shrink-0">
                          <Save className="h-3.5 w-3.5" /> Save
                        </Button>
                      </form>
                    </div>
                  ))}
                  <form action={addChapter.bind(null, m.id)} className="flex gap-2 flex-wrap pt-2">
                    <Input name="title" required placeholder="New chapter title" className="flex-1 min-w-[160px]" />
                    <Input name="videoUrl" placeholder="https://youtube.com/watch?v=..." className="flex-1 min-w-[200px]" />
                    <Button type="submit" size="sm" className="gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0">
                      <Plus className="h-3.5 w-3.5" /> Add Chapter
                    </Button>
                  </form>
                </div>

                <div className="space-y-2 border-t border-border pt-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quiz</div>
                  {(m.quizzes ?? []).length === 0 ? (
                    <p className="text-sm text-muted-foreground font-serif">No quiz yet — create one in &ldquo;Add a quiz&rdquo; below.</p>
                  ) : (
                    (m.quizzes ?? []).map((q: any) => (
                      <Link key={q.id} href={`/admin/quizzes/${q.id}`} className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors">
                        <FileQuestion className="h-4 w-4" /> {q.title} <span className="text-xs text-muted-foreground">(edit questions)</span>
                      </Link>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardContent className="py-4">
          <form action={createModule.bind(null, selected.id)} className="flex gap-2 flex-wrap items-end">
            <div className="space-y-1 w-20">
              <Label htmlFor="moduleNumber" className="text-xs">
                #
              </Label>
              <Input id="moduleNumber" name="moduleNumber" placeholder="01" />
            </div>
            <div className="space-y-1 flex-1 min-w-[180px]">
              <Label htmlFor="moduleTitle" className="text-xs">
                New module title
              </Label>
              <Input id="moduleTitle" name="title" required placeholder="Module title" />
            </div>
            <div className="space-y-1 w-24">
              <Label htmlFor="hours" className="text-xs">
                Hours
              </Label>
              <Input id="hours" name="hours" placeholder="16h" />
            </div>
            <Button type="submit" size="sm" className="gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0">
              <Plus className="h-3.5 w-3.5" /> Add Module
            </Button>
          </form>
        </CardContent>
      </Card>

      {moduleOptions.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold font-sans text-foreground">Add a quiz</h2>
          <QuizBuilder modules={moduleOptions} />
        </div>
      )}
    </div>
  )
}
