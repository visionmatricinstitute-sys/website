"use client"

import { Button } from "@/components/ui/button"
import { logAttendance } from "@/app/dashboard/actions"

export function JoinClassButton({ liveClassId, joinUrl }: { liveClassId: string; joinUrl: string }) {
  return (
    <Button
      asChild
      size="sm"
      className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0"
      onClick={() => {
        logAttendance(liveClassId)
      }}
    >
      <a href={joinUrl} target="_blank" rel="noopener noreferrer">
        Join Class
      </a>
    </Button>
  )
}
