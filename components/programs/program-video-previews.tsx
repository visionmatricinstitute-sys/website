import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/motion/fade-in"
import { PROGRAM_PREVIEW_VIDEOS } from "@/lib/video-data"

export function ProgramVideoPreviews() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Inside the Program</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Watch a module preview</h2>
          <p className="text-muted-foreground font-serif leading-relaxed">
            AI-generated summaries covering what each module teaches — a quick preview of the program content before
            you enrol. These are not recordings of live class sessions.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {PROGRAM_PREVIEW_VIDEOS.map((video, index) => (
            <FadeIn key={video.id} delay={index * 0.1}>
              <Card className="h-full overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">{video.title}</h3>
                  <Badge variant="secondary" className="text-xs font-normal">
                    AI-generated summary, not a live class recording
                  </Badge>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
