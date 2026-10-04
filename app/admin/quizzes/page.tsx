import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Trash2 } from "lucide-react"
import { QuizBuilder } from "@/components/admin/quiz-builder"
import { deleteQuiz } from "./actions"

export default async function AdminQuizzesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const supabase = await createClient()
  const { data: modules } = await supabase
    .from("course_modules")
    .select("id, module_number, title, courses(title)")
    .order("order_index")

  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("id, title, course_modules(title, module_number, courses(title))")
    .order("created_at", { ascending: false })

  const moduleOptions = (modules ?? []).map((m: any) => ({
    id: m.id,
    label: `${m.module_number} — ${m.title} (${m.courses?.title})`,
  }))

  const query = (q ?? "").trim().toLowerCase()
  const filteredQuizzes = query
    ? (quizzes ?? []).filter((quiz: any) => {
        const cm = quiz.course_modules
        return (
          quiz.title.toLowerCase().includes(query) ||
          cm?.title?.toLowerCase().includes(query) ||
          cm?.courses?.title?.toLowerCase().includes(query)
        )
      })
    : (quizzes ?? [])

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Quizzes</h1>
        <p className="text-muted-foreground font-serif mt-1">Build a multiple-choice quiz for a module.</p>
      </div>

      <QuizBuilder modules={moduleOptions} />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg font-bold font-sans text-foreground">Existing Quizzes</h2>
          <form method="get" className="flex gap-2">
            <Input name="q" defaultValue={q ?? ""} placeholder="Search quiz, module, or course" className="w-64" />
            <Button type="submit" variant="outline" size="sm" className="gap-1.5 bg-transparent flex-shrink-0">
              <Search className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
        {filteredQuizzes.length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No quizzes match.</p>
        ) : (
          filteredQuizzes.map((quiz: any) => (
            <Card key={quiz.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4 flex-wrap">
                <Link href={`/admin/quizzes/${quiz.id}`} className="min-w-0 hover:text-accent transition-colors">
                  <div className="font-semibold text-foreground">{quiz.title}</div>
                  <div className="text-sm text-muted-foreground font-serif">
                    {quiz.course_modules?.module_number} — {quiz.course_modules?.title} ({quiz.course_modules?.courses?.title})
                  </div>
                </Link>
                <form action={deleteQuiz.bind(null, quiz.id)} className="flex-shrink-0">
                  <button type="submit" className="text-destructive hover:text-destructive/80">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
