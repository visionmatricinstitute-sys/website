import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarCheck } from "lucide-react"

export function DemoCta() {
  return (
    <>
      {/* Desktop: floating button, bottom-right */}
      <Button
        asChild
        size="lg"
        variant="accent"
        className="hidden sm:flex fixed bottom-6 right-24 z-50 rounded-full px-6"
      >
        <Link href="/demo">
          <CalendarCheck className="h-5 w-5 mr-2" />
          Book Free Demo
        </Link>
      </Button>

      {/* Mobile: full-width bottom bar */}
      <Link
        href="/demo"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-accent text-white py-3.5 flex items-center justify-center gap-2 font-semibold shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
      >
        <CalendarCheck className="h-5 w-5" />
        Book Free Demo
      </Link>
    </>
  )
}
