import { createClient } from "@/lib/supabase/server"
import { getInstructorCourseIds } from "@/lib/instructor-scope"
import { Card, CardContent } from "@/components/ui/card"
import { QuizBuilder } from "@/components/admin/quiz-builder"

export default async function AdminQuizzesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user!.id).maybeSingle()
  const courseIds = await getInstructorCourseIds(user!.id, profile?.role)

  let modulesQuery = supabase
    .from("course_modules")
    .select("id, module_number, title, course_id, courses(title)")
    .order("order_index")
  if (courseIds) modulesQuery = modulesQuery.in("course_id", courseIds)
  const { data: modules } = await modulesQuery

  const scopedModuleIds = courseIds ? (modules ?? []).map((m: any) => m.id) : null

  let quizzesQuery = supabase
    .from("quizzes")
    .select("id, title, module_id, course_modules(title, module_number)")
    .order("created_at", { ascending: false })
  if (scopedModuleIds) quizzesQuery = quizzesQuery.in("module_id", scopedModuleIds)
  const { data: quizzes } = await quizzesQuery

  const moduleOptions = (modules ?? []).map((m: any) => ({
    id: m.id,
    label: `${m.module_number} — ${m.title} (${m.courses?.title})`,
  }))

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Quizzes</h1>
        <p className="text-muted-foreground font-serif mt-1">Build a multiple-choice quiz for a module.</p>
      </div>

      <QuizBuilder modules={moduleOptions} />

      <div className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">Existing Quizzes</h2>
        {(quizzes ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No quizzes yet.</p>
        ) : (
          (quizzes ?? []).map((q: any) => (
            <Card key={q.id}>
              <CardContent className="py-4">
                <div className="font-semibold text-foreground">{q.title}</div>
                <div className="text-sm text-muted-foreground font-serif">
                  {q.course_modules?.module_number} — {q.course_modules?.title}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
