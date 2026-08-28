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

export async function updateQuizTitle(quizId: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const title = String(formData.get("title") || "").trim()
  if (!title) throw new Error("Quiz title is required.")

  const { error } = await supabase.from("quizzes").update({ title }).eq("id", quizId)
  if (error) throw new Error(error.message)

  await logAudit({ actorId: user.id, action: "quiz.renamed", entityType: "quiz", entityId: quizId, metadata: { title } })

  revalidatePath("/admin/quizzes")
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
}
