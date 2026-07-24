"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitQuizAttempt(quizId: string, answers: Record<string, number>) {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("submit_quiz_attempt", { p_quiz_id: quizId, p_answers: answers })
  if (error) throw new Error(error.message)
  const result = Array.isArray(data) ? data[0] : data
  return result as { score: number; total: number; correct_count: number }
}
