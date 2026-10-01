"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function submitQuizAttempt(quizId: string, answers: Record<string, number>) {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("submit_quiz_attempt", { p_quiz_id: quizId, p_answers: answers })
  if (error) throw new Error(error.message)
  const result = Array.isArray(data) ? data[0] : data
  const { score, total, correct_count } = result as { score: number; total: number; correct_count: number }

  const { data: passed, error: completeError } = await supabase.rpc("complete_module_if_passed", {
    p_quiz_id: quizId,
    p_score: score,
  })
  if (completeError) throw new Error(completeError.message)

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("course_modules(courses(slug))")
    .eq("id", quizId)
    .single()
  const slug = (quiz as any)?.course_modules?.courses?.slug
  if (slug) {
    revalidatePath(`/dashboard/courses/${slug}`)
    revalidatePath("/dashboard")
  }

  return { score, total, correct_count, passed: Boolean(passed) }
}
