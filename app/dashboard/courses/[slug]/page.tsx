import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle2, Circle, ArrowLeft, ClipboardList, HelpCircle } from "lucide-react"
import { toggleModuleComplete } from "../../actions"
import { submitAssignment } from "./assignment-actions"
import { getEmbedUrl } from "@/lib/video-embed"

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: course } = await supabase.from("courses").select("id, slug, title, description").eq("slug", slug).single()
  if (!course) notFound()

  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", user.id)
    .eq("course_id", course.id)
    .maybeSingle()
  if (!enrollment) redirect("/dashboard")

  const { data: modules } = await supabase
    .from("course_modules")
    .select("id, order_index, module_number, title, hours, focus, video_url")
    .eq("course_id", course.id)
    .order("order_index")

  const moduleIds = (modules ?? []).map((m: any) => m.id)

  const { data: progressRows } = await supabase
    .from("module_progress")
    .select("module_id, status")
    .eq("student_id", user.id)

  const progressMap = new Map((progressRows ?? []).map((p: any) => [p.module_id, p.status]))

  const { data: certificate } = await supabase
    .from("certificates")
    .select("certificate_code")
    .eq("student_id", user.id)
    .eq("course_id", course.id)
    .maybeSingle()

  const { data: quizzes } =
    moduleIds.length > 0
      ? await supabase.from("quizzes").select("id, module_id, title").in("module_id", moduleIds)
      : { data: [] }
  const quizzesByModule = new Map((quizzes ?? []).map((q: any) => [q.module_id, q]))

  const quizIds = (quizzes ?? []).map((q: any) => q.id)
  const { data: quizAttempts } =
    quizIds.length > 0
      ? await supabase
          .from("quiz_attempts")
          .select("quiz_id, score")
          .eq("student_id", user.id)
          .in("quiz_id", quizIds)
      : { data: [] }
  const bestScoreByQuiz = new Map<string, number>()
  for (const a of quizAttempts ?? []) {
    const prev = bestScoreByQuiz.get(a.quiz_id)
    if (prev === undefined || a.score > prev) bestScoreByQuiz.set(a.quiz_id, a.score)
  }

  const { data: assignments } = await supabase
    .from("assignments")
    .select("id, title, description, due_at")
    .eq("course_id", course.id)
    .order("due_at", { ascending: true })

  const assignmentIds = (assignments ?? []).map((a: any) => a.id)
  const { data: mySubmissions } =
    assignmentIds.length > 0
      ? await supabase
          .from("assignment_submissions")
          .select("assignment_id, file_name, submitted_at, grade, feedback")
          .eq("student_id", user.id)
          .in("assignment_id", assignmentIds)
      : { data: [] }
  const submissionByAssignment = new Map((mySubmissions ?? []).map((s: any) => [s.assignment_id, s]))

  const total = modules?.length ?? 0
  const completed = (modules ?? []).filter((m: any) => progressMap.get(m.id) === "completed").length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">{course.title}</h1>
        <p className="text-muted-foreground font-serif mt-1">{course.description}</p>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {completed} / {total} modules complete
          </span>
          <span className="font-semibold text-foreground">{pct}%</span>
        </div>
        <Progress value={pct} />
      </div>

      {certificate && (
        <Card className="border-accent/40 bg-accent/5">
          <CardContent className="py-5 flex items-center gap-3">
            <Award className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <div className="font-semibold text-foreground">Certificate earned</div>
              <div className="text-xs text-muted-foreground font-mono">Certificate #{certificate.certificate_code}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {(modules ?? []).map((m: any) => {
          const isCompleted = progressMap.get(m.id) === "completed"
          const embedUrl = m.video_url ? getEmbedUrl(m.video_url) : null
          const quiz = quizzesByModule.get(m.id)
          const bestScore = quiz ? bestScoreByQuiz.get(quiz.id) : undefined
          return (
            <Card key={m.id}>
              <CardContent className="py-4 space-y-4">
                <div className="flex items-center gap-4">
                  <form action={toggleModuleComplete.bind(null, m.id, isCompleted, course.slug)}>
                    <button type="submit" aria-label={isCompleted ? "Mark as not started" : "Mark as complete"}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </button>
                  </form>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{m.module_number}</span>
                      <span className="font-semibold text-foreground">{m.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-serif mt-0.5">{m.focus}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{m.hours}</span>
                </div>

                {m.video_url && (
                  <div className="pl-10">
                    {embedUrl ? (
                      <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
                        <iframe src={embedUrl} className="h-full w-full" allowFullScreen title={m.title} />
                      </div>
                    ) : (
                      <video src={m.video_url} controls className="w-full rounded-lg border border-border" />
                    )}
                  </div>
                )}

                {quiz && (
                  <div className="pl-10">
                    <Button asChild variant="outline" size="sm" className="gap-1.5 bg-transparent">
                      <Link href={`/dashboard/quizzes/${quiz.id}`}>
                        <HelpCircle className="h-3.5 w-3.5" />
                        {bestScore !== undefined ? `Retake Quiz (best: ${bestScore}%)` : "Take Quiz"}
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {(assignments ?? []).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-sans text-foreground flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-accent" /> Assignments
          </h2>
          <div className="space-y-3">
            {(assignments ?? []).map((a: any) => {
              const submission = submissionByAssignment.get(a.id)
              return (
                <Card key={a.id}>
                  <CardContent className="py-4 space-y-3">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="font-semibold text-foreground">{a.title}</div>
                        {a.description && <p className="text-sm text-muted-foreground font-serif mt-0.5">{a.description}</p>}
                        {a.due_at && (
                          <p className="text-xs text-muted-foreground font-mono mt-1">
                            Due {new Date(a.due_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                          </p>
                        )}
                      </div>
                      {submission?.grade != null && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-lg font-black font-sans text-accent">{submission.grade}</div>
                          {submission.feedback && (
                            <p className="text-xs text-muted-foreground font-serif max-w-[200px]">{submission.feedback}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {submission ? (
                      <p className="text-sm text-muted-foreground font-serif">
                        Submitted: {submission.file_name} &middot;{" "}
                        {new Date(submission.submitted_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                        {submission.grade == null && " (awaiting grade)"}
                      </p>
                    ) : null}

                    {submission?.grade == null && (
                      <form
                        action={submitAssignment.bind(null, a.id, course.slug)}
                        className="flex items-center gap-2 flex-wrap"
                      >
                        <input
                          type="file"
                          name="file"
                          required
                          className="text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent-foreground"
                        />
                        <Button type="submit" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          {submission ? "Resubmit" : "Submit"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
