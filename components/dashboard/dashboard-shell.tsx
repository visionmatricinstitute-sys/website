import Link from "next/link"
import type { ReactNode } from "react"
import { LogOut } from "lucide-react"
import { signOut } from "@/app/dashboard/actions"

export function DashboardShell({ studentName, children }: { studentName: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-navy text-navy-foreground">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Vision Matrix Institute logo" className="h-8 w-8" />
            <span className="font-black font-sans">VMI Student Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-navy-foreground/80 font-serif hidden sm:inline">{studentName}</span>
            <Link href="/" className="text-sm text-navy-foreground/70 hover:text-navy-foreground transition-colors hidden sm:inline">
              Back to website
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-sm text-navy-foreground/80 hover:text-navy-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">{children}</main>
    </div>
  )
}
