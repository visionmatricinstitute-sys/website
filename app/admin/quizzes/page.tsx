import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, Trash2 } from "lucide-react"
import { QuizBuilder } from "@/components/admin/quiz-builder"
import { updateQuizTitle, deleteQuiz } from "./actions"

export default async function AdminQuizzesPage() {
  const supabase = await createClient()
  const { data: modules } = await supabase
    .from("course_modules")
    .select("id, module_number, title, courses(title)")
    .order("order_index")

  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("id, title, course_modules(title, module_number)")
    .order("created_at", { ascending: false })

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
              <CardContent className="py-4 space-y-3">
                <div className="text-sm text-muted-foreground font-serif">
                  {q.course_modules?.module_number} — {q.course_modules?.title}
                </div>
                <form action={updateQuizTitle.bind(null, q.id)} className="flex gap-2">
                  <Input name="title" defaultValue={q.title} className="flex-1" />
                  <Button type="submit" size="sm" variant="outline" className="gap-1.5 bg-transparent flex-shrink-0">
                    <Save className="h-3.5 w-3.5" /> Save
                  </Button>
                </form>
                <form action={deleteQuiz.bind(null, q.id)}>
                  <Button type="submit" size="sm" variant="ghost" className="gap-1.5 text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" /> Delete Quiz
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
