"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Loader2 } from "lucide-react"
import { updateQuizQuestions } from "@/app/admin/quizzes/actions"

type Question = { question: string; options: string[]; correctIndex: number }

export function QuizEditor({
  quizId,
  initialTitle,
  initialQuestions,
}: {
  quizId: string
  initialTitle: string
  initialQuestions: Question[]
}) {
  const router = useRouter()
  const [title, setTitle] = useState(initialTitle)
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions.length > 0 ? initialQuestions : [{ question: "", options: ["", ""], correctIndex: 0 }],
  )
  const [submitting, setSubmitting] = useState(false)

  function updateQuestion(i: number, patch: Partial<Question>) {
    setQuestions((prev) => prev.map((q, idx) => (idx === i ? { ...q, ...patch } : q)))
  }
  function updateOption(qi: number, oi: number, value: string) {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === qi ? { ...q, options: q.options.map((o, j) => (j === oi ? value : o)) } : q)),
    )
  }
  function addQuestion() {
    setQuestions((prev) => [...prev, { question: "", options: ["", ""], correctIndex: 0 }])
  }
  function removeQuestion(i: number) {
    setQuestions((prev) => prev.filter((_, idx) => idx !== i))
  }
  function addOption(qi: number) {
    setQuestions((prev) => prev.map((q, idx) => (idx === qi ? { ...q, options: [...q.options, ""] } : q)))
  }
  function removeOption(qi: number, oi: number) {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === qi
          ? {
              ...q,
              options: q.options.filter((_, j) => j !== oi),
              correctIndex: q.correctIndex >= oi && q.correctIndex > 0 ? q.correctIndex - 1 : q.correctIndex,
            }
          : q,
      ),
    )
  }

  async function handleSubmit() {
    if (!title.trim()) {
      toast.error("Enter a quiz title.")
      return
    }
    if (questions.some((q) => !q.question.trim() || q.options.some((o) => !o.trim()))) {
      toast.error("Fill in every question and option.")
      return
    }
    setSubmitting(true)
    try {
      await updateQuizQuestions(quizId, title, questions)
      toast.success("Quiz saved.")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Edit Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="quiz-title">Quiz Title</Label>
          <Input id="quiz-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="space-y-4">
          {questions.map((q, qi) => (
            <div key={qi} className="rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Label>Question {qi + 1}</Label>
                {questions.length > 1 && (
                  <button type="button" onClick={() => removeQuestion(qi)} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Input value={q.question} onChange={(e) => updateQuestion(qi, { question: e.target.value })} placeholder="Question text" />
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${qi}`}
                      checked={q.correctIndex === oi}
                      onChange={() => updateQuestion(qi, { correctIndex: oi })}
                      aria-label={`Mark option ${oi + 1} as correct`}
                    />
                    <Input value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)} placeholder={`Option ${oi + 1}`} className="flex-1" />
                    {q.options.length > 2 && (
                      <button type="button" onClick={() => removeOption(qi, oi)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {q.options.length < 6 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => addOption(qi)} className="gap-1.5 bg-transparent">
                    <Plus className="h-3.5 w-3.5" /> Add Option
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addQuestion} className="gap-1.5 bg-transparent">
            <Plus className="h-4 w-4" /> Add Question
          </Button>
        </div>

        <Button onClick={handleSubmit} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save Quiz"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
