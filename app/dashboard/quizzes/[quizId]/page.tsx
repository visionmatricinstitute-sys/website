import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { QuizTaker } from "@/components/dashboard/quiz-taker"
import { ArrowLeft } from "lucide-react"

export default async function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("id, title, course_modules(course_id, courses(slug))")
    .eq("id", quizId)
    .single()
  if (!quiz) notFound()

  const { data: questions, error } = await supabase.rpc("get_quiz_for_student", { p_quiz_id: quizId })
  if (error) notFound()

  const courseSlug = (quiz as any).course_modules?.courses?.slug

  return (
    <div className="space-y-6 max-w-2xl">
      {courseSlug && (
        <Link
          href={`/dashboard/courses/${courseSlug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to course
        </Link>
      )}
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">{quiz.title}</h1>
      </div>
      <QuizTaker quizId={quizId} questions={(questions ?? []) as any} />
    </div>
  )
}
