import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/motion/fade-in"
import { INTRO_VIDEO } from "@/lib/video-data"

export function IntroVideoSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn className="max-w-lg mx-auto">
          <Card className="overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${INTRO_VIDEO.id}`}
                title={INTRO_VIDEO.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h2 className="text-sm font-semibold text-foreground">{INTRO_VIDEO.title}</h2>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
