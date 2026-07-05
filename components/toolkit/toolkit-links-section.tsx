import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink as ExternalLinkIcon } from "lucide-react"
import { EXTERNAL_LINKS } from "@/lib/toolkit-data"

export function ToolkitLinksSection() {
  return (
    <section id="toolkit-links" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">External Links</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">Curated External Resources</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Trusted, external sites our instructors point students to for deeper reading, official documentation
            and practice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXTERNAL_LINKS.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block group">
              <Card className="h-full group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold font-sans text-foreground leading-snug">{link.title}</h3>
                    <ExternalLinkIcon className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-accent transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground font-serif leading-relaxed">{link.description}</p>
                  <Badge variant="secondary" className="text-xs truncate max-w-full">
                    {new URL(link.url).hostname.replace("www.", "")}
                  </Badge>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
