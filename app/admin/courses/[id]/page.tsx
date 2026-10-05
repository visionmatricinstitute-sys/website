import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, Trash2, ArrowUp, ArrowDown, Pencil } from "lucide-react"
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button"
import { updateCourse, setCourseStatus, createModule, deleteModule, moveModule, updateModule, deleteCourse } from "../actions"

export default async function AdminCourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: course } = await supabase.from("courses").select("*").eq("id", id).single()
  if (!course) notFound()

  const { data: modules } = await supabase
    .from("course_modules")
    .select("id, order_index, module_number, title, hours, focus, chapters(id), quizzes(id)")
    .eq("course_id", id)
    .order("order_index")

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link href="/admin/courses" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Link>
        <div className="flex items-center gap-2">
          {(["draft", "published", "archived"] as const).map((s) => (
            <form key={s} action={setCourseStatus.bind(null, id, s)}>
              <Button
                type="submit"
                size="sm"
                variant={course.status === s ? "default" : "outline"}
                className={course.status === s ? "bg-accent hover:bg-accent/90 text-accent-foreground capitalize" : "bg-transparent capitalize"}
              >
                {s}
              </Button>
            </form>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground flex items-center gap-3">
          {course.title}
          <Badge variant={course.status === "published" ? "default" : "secondary"} className="capitalize">
            {course.status}
          </Badge>
        </h1>
        <p className="text-muted-foreground font-serif mt-1">/{course.slug}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateCourse.bind(null, id)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required defaultValue={course.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short description</Label>
              <Input id="shortDescription" name="shortDescription" defaultValue={course.short_description ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full description</Label>
              <Input id="description" name="description" defaultValue={course.description ?? ""} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" defaultValue={course.category ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input id="level" name="level" defaultValue={course.level ?? ""} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" name="language" defaultValue={course.language ?? "English"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceRupees">Price (₹)</Label>
                <Input
                  id="priceRupees"
                  name="priceRupees"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={course.price_amount ? course.price_amount / 100 : ""}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail image URL</Label>
              <Input id="thumbnailUrl" name="thumbnailUrl" defaultValue={course.thumbnail_url ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Input id="prerequisites" name="prerequisites" defaultValue={course.prerequisites ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="learningObjectives">Learning objectives</Label>
              <Input id="learningObjectives" name="learningObjectives" defaultValue={course.learning_objectives ?? ""} />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <Save className="mr-2 h-4 w-4" /> Save Course
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-sans text-foreground">Modules</h2>
        </div>

        <div className="space-y-3">
          {(modules ?? []).length === 0 && <p className="text-sm text-muted-foreground font-serif">No modules yet.</p>}
          {(modules ?? []).map((m: any, i: number, arr: any[]) => (
            <Card key={m.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <form action={moveModule.bind(null, id, m.id, "up")}>
                    <button type="submit" disabled={i === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                  </form>
                  <form action={moveModule.bind(null, id, m.id, "down")}>
                    <button
                      type="submit"
                      disabled={i === arr.length - 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </form>
                  <div className="ml-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{m.module_number}</span>
                      <span className="font-semibold text-foreground">{m.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-serif">
                      {m.hours ?? "—"} &middot; {m.chapters?.length ?? 0} chapter{(m.chapters?.length ?? 0) === 1 ? "" : "s"} &middot;{" "}
                      {m.quizzes?.length ?? 0} quiz{(m.quizzes?.length ?? 0) === 1 ? "" : "zes"}
                    </div>
                  </div>
                </div>
                <form action={deleteModule.bind(null, id, m.id)}>
                  <ConfirmSubmitButton
                    ariaLabel="Delete module"
                    message={`Delete module "${m.title}"? Its chapters and quiz are deleted too. This cannot be undone.`}
                    className="text-destructive hover:text-destructive/80 flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </ConfirmSubmitButton>
                </form>
              </CardContent>
              <details className="border-t border-border">
                <summary className="cursor-pointer px-6 py-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                  <Pencil className="h-3 w-3" /> Edit module details
                </summary>
                <form action={updateModule.bind(null, id, m.id)} className="px-6 pb-4 flex gap-2 flex-wrap items-end">
                  <div className="space-y-1 w-24">
                    <Label className="text-xs">#</Label>
                    <Input name="moduleNumber" defaultValue={m.module_number ?? ""} />
                  </div>
                  <div className="space-y-1 flex-1 min-w-[180px]">
                    <Label className="text-xs">Title</Label>
                    <Input name="title" required defaultValue={m.title} />
                  </div>
                  <div className="space-y-1 w-24">
                    <Label className="text-xs">Hours</Label>
                    <Input name="hours" defaultValue={m.hours ?? ""} />
                  </div>
                  <div className="space-y-1 flex-1 min-w-[180px]">
                    <Label className="text-xs">Focus</Label>
                    <Input name="focus" defaultValue={m.focus ?? ""} />
                  </div>
                  <Button type="submit" size="sm" className="gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Save className="h-3.5 w-3.5" /> Save
                  </Button>
                </form>
              </details>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="py-4">
            <form action={createModule.bind(null, id)} className="flex gap-2 flex-wrap items-end">
              <div className="space-y-1 w-24">
                <Label htmlFor="moduleNumber" className="text-xs">
                  #
                </Label>
                <Input id="moduleNumber" name="moduleNumber" placeholder="01" />
              </div>
              <div className="space-y-1 flex-1 min-w-[180px]">
                <Label htmlFor="moduleTitle" className="text-xs">
                  Title
                </Label>
                <Input id="moduleTitle" name="title" required placeholder="Module title" />
              </div>
              <div className="space-y-1 w-24">
                <Label htmlFor="hours" className="text-xs">
                  Hours
                </Label>
                <Input id="hours" name="hours" placeholder="16h" />
              </div>
              <div className="space-y-1 flex-1 min-w-[180px]">
                <Label htmlFor="focus" className="text-xs">
                  Focus (optional)
                </Label>
                <Input id="focus" name="focus" placeholder="What this module covers" />
              </div>
              <Button type="submit" size="sm" className="gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0">
                <Plus className="h-3.5 w-3.5" /> Add Module
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="font-sans text-destructive">Delete this course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground font-serif">
            Permanently deletes the course with its modules, chapters, quizzes and assignments. A course with enrolled
            students can't be deleted — archive it instead. Type <strong>DELETE</strong> to confirm.
          </p>
          <form action={deleteCourse.bind(null, id)} className="flex gap-2 flex-wrap items-center">
            <Input name="confirm" placeholder="DELETE" className="max-w-[160px]" autoComplete="off" />
            <ConfirmSubmitButton
              message="Delete this course permanently? This cannot be undone."
              className="inline-flex items-center gap-1.5 rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4" /> Delete course
            </ConfirmSubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
