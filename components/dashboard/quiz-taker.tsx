"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import { submitQuizAttempt } from "@/app/dashboard/quizzes/[quizId]/actions"

type Question = { id: string; order_index: number; question: string; options: string[] }

export function QuizTaker({ quizId, questions }: { quizId: string; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ score: number; total: number; correct_count: number } | null>(null)

  async function handleSubmit() {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Answer every question before submitting.")
      return
    }
    setSubmitting(true)
    try {
      const res = await submitQuizAttempt(quizId, answers)
      setResult(res)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <Card className="border-accent/40">
        <CardContent className="py-10 text-center space-y-3">
          <CheckCircle2 className="h-10 w-10 text-accent mx-auto" />
          <div className="text-3xl font-black font-sans text-foreground">{result.score}%</div>
          <p className="text-muted-foreground font-serif">
            {result.correct_count} of {result.total} correct
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <Card key={q.id}>
          <CardContent className="py-4 space-y-3">
            <div className="font-semibold text-foreground">
              {qi + 1}. {q.question}
            </div>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <label key={oi} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === oi}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Quiz"
        )}
      </Button>
    </div>
  )
}
