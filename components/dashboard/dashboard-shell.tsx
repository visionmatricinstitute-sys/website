import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import { LogOut } from "lucide-react"
import { signOut } from "@/app/dashboard/actions"

export function DashboardShell({
  studentName,
  isAdmin,
  children,
}: {
  studentName: string
  isAdmin?: boolean
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-navy text-navy-foreground">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Vision Matrix Institute logo" width={32} height={32} className="h-8 w-8" />
            <span className="font-black font-sans">VMI Student Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-navy-foreground/80 font-serif hidden sm:inline">{studentName}</span>
            {isAdmin && (
              <div className="hidden lg:flex items-center gap-3 text-sm text-navy-foreground/70">
                <Link href="/admin/live-classes" className="hover:text-navy-foreground transition-colors">
                  Live Classes
                </Link>
                <Link href="/admin/modules" className="hover:text-navy-foreground transition-colors">
                  Modules
                </Link>
                <Link href="/admin/assignments" className="hover:text-navy-foreground transition-colors">
                  Assignments
                </Link>
                <Link href="/admin/quizzes" className="hover:text-navy-foreground transition-colors">
                  Quizzes
                </Link>
              </div>
            )}
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
