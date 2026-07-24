import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, Download, ArrowRight, FileText, Video } from "lucide-react"
import { enrollInCourse } from "./actions"
import { JoinClassButton } from "@/components/dashboard/join-class-button"

export default async function DashboardHomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, courses(id, slug, title, description)")
    .eq("student_id", user.id)

  const enrolledCourses = (enrollments ?? []).map((e: any) => e.courses).filter(Boolean)
  const enrolledCourseIds = enrolledCourses.map((c: any) => c.id)

  const { data: allCourses } = await supabase.from("courses").select("id, slug, title, description")
  const availableCourses = (allCourses ?? []).filter((c: any) => !enrolledCourseIds.includes(c.id))

  const progressByCourse: Record<string, { completed: number; total: number }> = {}
  for (const course of enrolledCourses) {
    const { data: modules } = await supabase.from("course_modules").select("id").eq("course_id", course.id)
    const moduleIds = (modules ?? []).map((m: any) => m.id)
    let completed = 0
    if (moduleIds.length > 0) {
      const { count } = await supabase
        .from("module_progress")
        .select("id", { count: "exact", head: true })
        .eq("student_id", user.id)
        .eq("status", "completed")
        .in("module_id", moduleIds)
      completed = count ?? 0
    }
    progressByCourse[course.id] = { completed, total: moduleIds.length }
  }

  const { data: certificates } = await supabase
    .from("certificates")
    .select("id, certificate_code, issued_at, courses(title)")
    .eq("student_id", user.id)

  const { data: resources } =
    enrolledCourseIds.length > 0
      ? await supabase.from("resources").select("id, title, file_url, resource_type").in("course_id", enrolledCourseIds)
      : { data: [] }

  const { data: upcomingClasses } =
    enrolledCourseIds.length > 0
      ? await supabase
          .from("live_classes")
          .select("id, title, scheduled_start, duration_minutes, join_url, courses(title)")
          .in("course_id", enrolledCourseIds)
          .gte("scheduled_start", new Date().toISOString())
          .order("scheduled_start", { ascending: true })
          .limit(5)
      : { data: [] }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Welcome back</h1>
        <p className="text-muted-foreground font-serif mt-1">Here's where you left off.</p>
      </div>

      {/* Upcoming live classes */}
      {(upcomingClasses ?? []).length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold font-sans text-foreground flex items-center gap-2">
            <Video className="h-5 w-5 text-accent" /> Upcoming Live Classes
          </h2>
          <div className="space-y-3">
            {(upcomingClasses ?? []).map((c: any) => (
              <Card key={c.id} className="border-accent/30">
                <CardContent className="py-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground">{c.title}</div>
                    <div className="text-sm text-muted-foreground font-serif">
                      {c.courses?.title} &middot;{" "}
                      {new Date(c.scheduled_start).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}{" "}
                      &middot; {c.duration_minutes} min
                    </div>
                  </div>
                  <JoinClassButton liveClassId={c.id} joinUrl={c.join_url} />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Enrolled courses & progress */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-sans text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" /> My Courses
        </h2>

        {enrolledCourses.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center space-y-3">
              <p className="text-muted-foreground font-serif">You're not enrolled in a course yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {enrolledCourses.map((course: any) => {
              const p = progressByCourse[course.id] ?? { completed: 0, total: 0 }
              const pct = p.total > 0 ? Math.round((p.completed / p.total) * 100) : 0
              return (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="font-sans text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground font-serif">{course.description}</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {p.completed} / {p.total} modules complete
                        </span>
                        <span className="font-semibold text-foreground">{pct}%</span>
                      </div>
                      <Progress value={pct} />
                    </div>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href={`/dashboard/courses/${course.slug}`}>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* Available courses to enroll */}
      {availableCourses.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold font-sans text-foreground">Available Programs</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {availableCourses.map((course: any) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="font-sans text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground font-serif">{course.description}</p>
                  <form action={enrollInCourse.bind(null, course.id)}>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Enroll Now
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-sans text-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-accent" /> Certificates
        </h2>
        {(certificates ?? []).length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center">
              <p className="text-sm text-muted-foreground font-serif">
                Complete every module in a course to earn its certificate.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {(certificates ?? []).map((cert: any) => (
              <Card key={cert.id} className="border-accent/30">
                <CardContent className="py-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-foreground">{cert.courses?.title}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">
                      Certificate #{cert.certificate_code}
                    </div>
                  </div>
                  <Award className="h-8 w-8 text-accent flex-shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Downloads */}
      {(resources ?? []).length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold font-sans text-foreground flex items-center gap-2">
            <Download className="h-5 w-5 text-accent" /> Downloads
          </h2>
          <Card>
            <CardContent className="divide-y divide-border py-0">
              {(resources ?? []).map((res: any) => (
                <a
                  key={res.id}
                  href={res.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-4 hover:text-accent transition-colors"
                >
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{res.title}</span>
                </a>
              ))}
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}
