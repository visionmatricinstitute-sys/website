import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookPlus, Search } from "lucide-react"
import { createCourse } from "./actions"

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
}

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>
}) {
  const { q, status } = await searchParams
  const supabase = await createClient()
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, slug, status, category, price_amount, course_modules(id)")
    .order("title")

  const query = (q ?? "").trim().toLowerCase()
  const filteredCourses = (courses ?? []).filter((c: any) => {
    const matchesQuery = !query || c.title.toLowerCase().includes(query) || c.category?.toLowerCase().includes(query)
    const matchesStatus = !status || c.status === status
    return matchesQuery && matchesStatus
  })

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Courses</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Create and manage courses. A course stays in Draft until you publish it — only published courses appear on
          the student dashboard.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCourse} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="e.g. Data Center Electrical Design" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL slug (optional — derived from title if left blank)</Label>
              <Input id="slug" name="slug" placeholder="e.g. data-center-electrical-design" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short description</Label>
              <Input id="shortDescription" name="shortDescription" placeholder="One line for course cards" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full description</Label>
              <Input id="description" name="description" placeholder="Shown on the course detail page" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="e.g. Electrical Design" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input id="level" name="level" placeholder="e.g. Intermediate" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" name="language" defaultValue="English" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceRupees">Price (₹, optional)</Label>
                <Input id="priceRupees" name="priceRupees" type="number" min="0" step="1" placeholder="34900" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail image URL (optional)</Label>
              <Input id="thumbnailUrl" name="thumbnailUrl" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites (optional)</Label>
              <Input id="prerequisites" name="prerequisites" placeholder="What students should already know" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="learningObjectives">Learning objectives (optional)</Label>
              <Input id="learningObjectives" name="learningObjectives" placeholder="What students will be able to do" />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <BookPlus className="mr-2 h-4 w-4" /> Create Course (as Draft)
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg font-bold font-sans text-foreground">All Courses</h2>
          <form method="get" className="flex gap-2">
            <Input name="q" defaultValue={q ?? ""} placeholder="Search title or category" className="w-56" />
            <select
              name="status"
              defaultValue={status ?? ""}
              className="file:text-foreground border-input flex h-9 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
            >
              <option value="">Any status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <Button type="submit" variant="outline" size="sm" className="gap-1.5 bg-transparent flex-shrink-0">
              <Search className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
        {filteredCourses.length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No courses match.</p>
        ) : (
          filteredCourses.map((c: any) => (
            <Link key={c.id} href={`/admin/courses/${c.id}`}>
              <Card className="hover:border-accent/40 transition-colors">
                <CardContent className="py-4 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{c.title}</span>
                      <Badge variant={STATUS_VARIANT[c.status] ?? "secondary"} className="capitalize">
                        {c.status ?? "draft"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground font-serif">
                      {c.category ?? "Uncategorized"} &middot; {c.course_modules?.length ?? 0} module
                      {(c.course_modules?.length ?? 0) === 1 ? "" : "s"}
                    </div>
                  </div>
                  {c.price_amount ? (
                    <div className="text-sm font-semibold text-foreground flex-shrink-0">
                      ₹{(c.price_amount / 100).toLocaleString("en-IN")}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
