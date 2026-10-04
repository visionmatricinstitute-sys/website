import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { updateCourse, setCourseStatus, createModule, deleteModule, moveModule } from "../actions"

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
                  <button type="submit" className="text-destructive hover:text-destructive/80 flex-shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </CardContent>
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
    </div>
  )
}
