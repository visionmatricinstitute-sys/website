import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Save, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { addChapter, updateChapter, deleteChapter, moveChapter } from "./actions"

export default async function AdminChaptersPage() {
  const supabase = await createClient()
  const { data: modules } = await supabase
    .from("course_modules")
    .select("id, module_number, title, courses(title)")
    .order("order_index")

  const moduleIds = (modules ?? []).map((m: any) => m.id)
  const { data: chapters } =
    moduleIds.length > 0
      ? await supabase.from("chapters").select("id, module_id, order_index, title, video_url").in("module_id", moduleIds).order("order_index")
      : { data: [] }

  const chaptersByModule = new Map<string, any[]>()
  for (const c of chapters ?? []) {
    const list = chaptersByModule.get(c.module_id) ?? []
    list.push(c)
    chaptersByModule.set(c.module_id, list)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Chapters</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Break each module into chapters, each with its own video. Students unlock chapters one by one; end-of-module
          documents and the quiz unlock once every chapter in the module is watched.
        </p>
      </div>

      <div className="space-y-6">
        {(modules ?? []).map((m: any) => {
          const moduleChapters = chaptersByModule.get(m.id) ?? []
          return (
            <Card key={m.id}>
              <CardContent className="py-4 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{m.module_number}</span>
                  <span className="font-semibold text-foreground">{m.title}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{m.courses?.title}</span>
                </div>

                <div className="space-y-3">
                  {moduleChapters.length === 0 && (
                    <p className="text-sm text-muted-foreground font-serif">No chapters yet.</p>
                  )}
                  {moduleChapters.map((ch: any, i: number) => (
                    <div key={ch.id} className="rounded-lg border border-border p-3 space-y-2">
                      <div className="flex items-center gap-1">
                        <form action={moveChapter.bind(null, m.id, ch.id, "up")}>
                          <button type="submit" disabled={i === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                        </form>
                        <form action={moveChapter.bind(null, m.id, ch.id, "down")}>
                          <button
                            type="submit"
                            disabled={i === moduleChapters.length - 1}
                            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                        </form>
                        <span className="text-xs text-muted-foreground font-mono ml-1">Chapter {i + 1}</span>
                        <form action={deleteChapter.bind(null, ch.id)} className="ml-auto">
                          <button type="submit" className="text-destructive hover:text-destructive/80">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </form>
                      </div>
                      <form action={updateChapter.bind(null, ch.id)} className="flex gap-2 flex-wrap">
                        <Input name="title" defaultValue={ch.title} placeholder="Chapter title" className="flex-1 min-w-[160px]" />
                        <Input
                          name="videoUrl"
                          defaultValue={ch.video_url ?? ""}
                          placeholder="https://youtube.com/watch?v=..."
                          className="flex-1 min-w-[200px]"
                        />
                        <Button type="submit" size="sm" variant="outline" className="gap-1.5 bg-transparent flex-shrink-0">
                          <Save className="h-3.5 w-3.5" /> Save
                        </Button>
                      </form>
                    </div>
                  ))}
                </div>

                <form action={addChapter.bind(null, m.id)} className="flex gap-2 flex-wrap pt-2 border-t border-border">
                  <Input name="title" placeholder="New chapter title" className="flex-1 min-w-[160px]" />
                  <Input name="videoUrl" placeholder="https://youtube.com/watch?v=..." className="flex-1 min-w-[200px]" />
                  <Button type="submit" size="sm" className="gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0">
                    <Plus className="h-3.5 w-3.5" /> Add Chapter
                  </Button>
                </form>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
