import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UploadCloud, FileText, Trash2 } from "lucide-react"
import { uploadResource, deleteResource } from "./actions"

const RESOURCE_TYPES = ["pdf", "doc", "xlsx", "pptx", "zip", "image", "other"]

export default async function AdminResourcesPage() {
  const supabase = await createClient()

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, course_modules(id, module_number, title)")
    .order("title")

  const { data: resources } = await supabase
    .from("resources")
    .select("id, title, resource_type, file_url, file_path, file_name, courses(title), course_modules(title)")
    .order("id", { ascending: false })

  const resourcesWithLinks = await Promise.all(
    (resources ?? []).map(async (r: any) => {
      if (r.file_path) {
        const { data } = await supabase.storage.from("course-resources").createSignedUrl(r.file_path, 3600)
        return { ...r, link: data?.signedUrl ?? null }
      }
      return { ...r, link: r.file_url }
    }),
  )

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Resources</h1>
        <p className="text-muted-foreground font-serif mt-1">
          Attach downloadable course material (PDF, Excel, etc.) to a course or a specific module. Only enrolled
          students can access uploaded files.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Upload Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={uploadResource} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target">Attach to</Label>
              <select
                id="target"
                name="target"
                required
                defaultValue=""
                className="file:text-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
              >
                <option value="" disabled>
                  Select a course or module
                </option>
                {(courses ?? []).map((c: any) => (
                  <optgroup key={c.id} label={c.title}>
                    <option value={`${c.id}::`}>{c.title} (whole course)</option>
                    {(c.course_modules ?? []).map((m: any) => (
                      <option key={m.id} value={`${c.id}::${m.id}`}>
                        {m.module_number ? `${m.module_number} — ` : ""}
                        {m.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="e.g. Cable Sizing Worksheet" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resourceType">Type</Label>
              <select
                id="resourceType"
                name="resourceType"
                defaultValue="pdf"
                className="file:text-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
              >
                {RESOURCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <input
                id="file"
                type="file"
                name="file"
                required
                className="text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent-foreground"
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <UploadCloud className="mr-2 h-4 w-4" /> Upload
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-bold font-sans text-foreground">All Resources</h2>
        {resourcesWithLinks.length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No resources yet.</p>
        ) : (
          resourcesWithLinks.map((r: any) => (
            <Card key={r.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    {r.link ? (
                      <a href={r.link} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-accent transition-colors">
                        {r.title}
                      </a>
                    ) : (
                      <span className="font-medium text-foreground">{r.title}</span>
                    )}
                    <div className="text-xs text-muted-foreground font-serif">
                      {r.courses?.title}
                      {r.course_modules?.title ? ` · ${r.course_modules.title}` : " · whole course"} &middot;{" "}
                      {r.resource_type?.toUpperCase()}
                    </div>
                  </div>
                </div>
                <form action={deleteResource.bind(null, r.id)}>
                  <button type="submit" className="text-destructive hover:text-destructive/80 flex-shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
