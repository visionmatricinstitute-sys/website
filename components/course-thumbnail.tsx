import type { LucideIcon } from "lucide-react"

const GRADIENTS = [
  "from-primary via-primary/80 to-navy",
  "from-accent via-accent/70 to-navy",
  "from-secondary via-secondary/70 to-navy",
  "from-navy via-primary/70 to-accent/50",
]

interface CourseThumbnailProps {
  icon: LucideIcon
  index?: number
  muted?: boolean
}

export function CourseThumbnail({ icon: Icon, index = 0, muted = false }: CourseThumbnailProps) {
  const gradient = GRADIENTS[index % GRADIENTS.length]

  return (
    <div
      className={`relative w-full h-48 overflow-hidden bg-gradient-to-br ${
        muted ? "from-gray-300 via-gray-200 to-gray-300" : gradient
      }`}
    >
      <div className={`absolute inset-0 bg-grid-lines ${muted ? "opacity-30" : "opacity-40"}`} />

      <Icon
        className={`absolute -right-6 -bottom-10 h-44 w-44 ${muted ? "text-gray-400/30" : "text-white/10"}`}
        strokeWidth={1}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`flex items-center justify-center w-20 h-20 rounded-2xl backdrop-blur-md border ${
            muted ? "bg-gray-400/30 border-gray-400/40" : "bg-white/10 border-white/25 shadow-lg"
          }`}
        >
          <Icon className={`h-10 w-10 ${muted ? "text-gray-500" : "text-white"}`} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}
