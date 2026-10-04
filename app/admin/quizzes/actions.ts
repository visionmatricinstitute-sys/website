"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { logAudit } from "@/lib/audit-log"

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

  await logAudit({ actorId: user.id, action: "quiz.created", entityType: "quiz", entityId: quiz.id, metadata: { title } })

  revalidatePath("/admin/quizzes")
}

// Replaces a quiz's title and its full question set in one go. Questions are deleted and
// re-inserted rather than diffed — simpler and correct: quiz_attempts only references
// quiz_id, not individual quiz_questions rows, so past attempt history is unaffected.
export async function updateQuizQuestions(quizId: string, title: string, questions: QuestionInput[]) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  if (!title.trim() || questions.length === 0) {
    throw new Error("Title and at least one question are required.")
  }

  const { error: titleError } = await supabase.from("quizzes").update({ title }).eq("id", quizId)
  if (titleError) throw new Error(titleError.message)

  const { error: deleteError } = await supabase.from("quiz_questions").delete().eq("quiz_id", quizId)
  if (deleteError) throw new Error(deleteError.message)

  const rows = questions.map((q, i) => ({
    quiz_id: quizId,
    order_index: i,
    question: q.question,
    options: q.options,
    correct_index: q.correctIndex,
  }))
  const { error: insertError } = await supabase.from("quiz_questions").insert(rows)
  if (insertError) throw new Error(insertError.message)

  await logAudit({ actorId: user.id, action: "quiz.updated", entityType: "quiz", entityId: quizId, metadata: { title, questionCount: questions.length } })

  revalidatePath("/admin/quizzes")
  revalidatePath(`/admin/quizzes/${quizId}`)
}

export async function deleteQuiz(quizId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { error } = await supabase.from("quizzes").delete().eq("id", quizId)
  if (error) throw new Error(error.message)

  await logAudit({ actorId: user.id, action: "quiz.deleted", entityType: "quiz", entityId: quizId })

  revalidatePath("/admin/quizzes")
  redirect("/admin/quizzes")
}
