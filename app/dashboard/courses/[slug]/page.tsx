import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, CheckCircle2, Circle, ArrowLeft } from "lucide-react"
import { toggleModuleComplete } from "../../actions"

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
    .select("id, order_index, module_number, title, hours, focus")
    .eq("course_id", course.id)
    .order("order_index")

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
          return (
            <Card key={m.id}>
              <CardContent className="py-4 flex items-center gap-4">
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
                    <span className={`font-semibold ${isCompleted ? "text-foreground" : "text-foreground"}`}>{m.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-serif mt-0.5">{m.focus}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{m.hours}</span>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
