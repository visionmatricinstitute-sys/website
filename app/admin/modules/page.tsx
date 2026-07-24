import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import { updateModuleVideo } from "./actions"

export default async function AdminModulesPage() {
  const supabase = await createClient()
  const { data: modules } = await supabase
    .from("course_modules")
    .select("id, module_number, title, video_url, courses(title)")
    .order("order_index")

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Module Videos</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Attach a recorded video (YouTube, Vimeo, or a direct file link) to each module.
        </p>
      </div>

      <div className="space-y-3">
        {(modules ?? []).map((m: any) => (
          <Card key={m.id}>
            <CardContent className="py-4 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-mono text-muted-foreground">{m.module_number}</span>
                <span className="font-semibold text-foreground">{m.title}</span>
                <span className="text-xs text-muted-foreground ml-auto">{m.courses?.title}</span>
              </div>
              <form action={updateModuleVideo.bind(null, m.id)} className="flex gap-2">
                <Input
                  name="videoUrl"
                  defaultValue={m.video_url ?? ""}
                  placeholder="https://youtube.com/watch?v=..."
                  className="flex-1"
                />
                <Button type="submit" size="sm" variant="outline" className="gap-1.5 bg-transparent flex-shrink-0">
                  <PlayCircle className="h-4 w-4" /> Save
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
