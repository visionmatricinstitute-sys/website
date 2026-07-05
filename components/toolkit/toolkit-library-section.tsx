import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Lock } from "lucide-react"
import { RESOURCE_CATEGORIES, RESOURCE_ITEMS } from "@/lib/toolkit-data"

export function ToolkitLibrarySection() {
  return (
    <section id="toolkit-library" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-accent/10 text-accent mb-4 hover:bg-accent/10">Resource Library</Badge>
          <h2 className="text-3xl lg:text-5xl font-black font-sans text-foreground mb-4">
            Reference Documents &amp; Templates
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Formula sheets, standards summaries and drawing templates that support what you learn in class. New
            items are added here regularly.
          </p>
        </div>

        <div className="space-y-16">
          {RESOURCE_CATEGORIES.map((cat) => {
            const items = RESOURCE_ITEMS.filter((i) => i.category === cat.key)
            return (
              <div key={cat.key}>
                <div className="text-center mb-10">
                  <h3 className="text-2xl lg:text-3xl font-bold font-sans text-foreground mb-3">{cat.title}</h3>
                  <p className="text-muted-foreground font-serif max-w-2xl mx-auto">{cat.blurb}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item) => {
                    const Icon = item.icon
                    const isAvailable = item.status === "available" && item.href
                    return (
                      <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                              <Icon className="h-6 w-6 text-accent" />
                            </div>
                            <Badge className={isAvailable ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}>
                              {isAvailable ? "Available" : "Coming Soon"}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg font-bold font-sans text-foreground">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <p className="text-muted-foreground font-serif leading-relaxed text-sm">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              {item.tag}
                            </Badge>
                            {isAvailable ? (
                              <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                <a href={item.href} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </a>
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                <Lock className="h-4 w-4 mr-2" />
                                Coming Soon
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
