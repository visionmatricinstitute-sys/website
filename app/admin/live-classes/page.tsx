import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Video, ExternalLink } from "lucide-react"
import { scheduleLiveClass } from "./actions"

export default async function AdminLiveClassesPage() {
  const supabase = await createClient()

  const { data: courses } = await supabase.from("courses").select("id, title").order("title")

  const { data: classes } = await supabase
    .from("live_classes")
    .select("id, title, scheduled_start, duration_minutes, join_url, start_url, courses(title)")
    .order("scheduled_start", { ascending: false })

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Schedule a Live Class</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Creates a real Zoom meeting and makes it visible to every student enrolled in the selected course.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">New Session</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={scheduleLiveClass} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseId">Course</Label>
              <select
                id="courseId"
                name="courseId"
                required
                defaultValue=""
                className="file:text-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
              >
                <option value="" disabled>
                  Select a course
                </option>
                {(courses ?? []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Session Title</Label>
              <Input id="title" name="title" required placeholder="e.g. Module 3 Live Walkthrough" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input id="description" name="description" placeholder="What this session covers" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduledStart">Date &amp; Time</Label>
                <Input id="scheduledStart" name="scheduledStart" type="datetime-local" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                <Input id="durationMinutes" name="durationMinutes" type="number" defaultValue={60} min={15} required />
              </div>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <Video className="mr-2 h-4 w-4" />
              Create Zoom Meeting &amp; Schedule
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">Scheduled Sessions</h2>
        {(classes ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No sessions scheduled yet.</p>
        ) : (
          (classes ?? []).map((c: any) => (
            <Card key={c.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-foreground">{c.title}</div>
                  <div className="text-sm text-muted-foreground font-serif">
                    {c.courses?.title} &middot; {new Date(c.scheduled_start).toLocaleString()} &middot; {c.duration_minutes} min
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="flex-shrink-0 gap-1.5 bg-transparent">
                  <a href={c.start_url} target="_blank" rel="noopener noreferrer">
                    Host Link <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
