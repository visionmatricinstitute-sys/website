import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2 } from "lucide-react"
import { QuizEditor } from "@/components/admin/quiz-editor"
import { deleteQuiz } from "../actions"

export default async function AdminQuizDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("id, title, course_modules(title, module_number, courses(title))")
    .eq("id", id)
    .single()
  if (!quiz) notFound()

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("question, options, correct_index")
    .eq("quiz_id", id)
    .order("order_index")

  const initialQuestions = (questions ?? []).map((q: any) => ({
    question: q.question,
    options: q.options,
    correctIndex: q.correct_index,
  }))

  const moduleInfo = (quiz as any).course_modules

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link href="/admin/quizzes" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to quizzes
        </Link>
        <form action={deleteQuiz.bind(null, id)}>
          <Button type="submit" size="sm" variant="ghost" className="gap-1.5 text-destructive hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" /> Delete Quiz
          </Button>
        </form>
      </div>

      <div>
        <p className="text-sm text-muted-foreground font-serif">
          {moduleInfo?.module_number} — {moduleInfo?.title} ({moduleInfo?.courses?.title})
        </p>
      </div>

      <QuizEditor quizId={id} initialTitle={quiz.title} initialQuestions={initialQuestions} />
    </div>
  )
}
