"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

type QuestionInput = { question: string; options: string[]; correctIndex: number }

export async function createQuiz(moduleId: string, title: string, questions: QuestionInput[]) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  if (!moduleId || !title.trim() || questions.length === 0) {
    throw new Error("Module, title and at least one question are required.")
  }

  const { data: quiz, error } = await supabase
    .from("quizzes")
    .insert({ module_id: moduleId, title })
    .select("id")
    .single()
  if (error) throw new Error(error.message)

  const rows = questions.map((q, i) => ({
    quiz_id: quiz.id,
    order_index: i,
    question: q.question,
    options: q.options,
    correct_index: q.correctIndex,
  }))

  const { error: qError } = await supabase.from("quiz_questions").insert(rows)
  if (qError) throw new Error(qError.message)

  revalidatePath("/admin/quizzes")
}
