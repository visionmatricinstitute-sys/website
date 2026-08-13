import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

const REQUIRED_FIELDS = ["studentName", "phone"] as const

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const missing = REQUIRED_FIELDS.filter((field) => !String(body[field] ?? "").trim())
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 })
  }

  const softwareKnown = Array.isArray(body.softwareKnown)
    ? (body.softwareKnown as unknown[]).map(String).filter(Boolean)
    : []

  const supabase = createServiceClient()
  const { error: insertError } = await supabase.from("demo_requests").insert({
    student_name: body.studentName,
    education: body.education || null,
    college: body.college || null,
    current_year_semester: body.currentYearSemester || null,
    graduation_year: body.graduationYear || null,
    current_occupation: body.currentOccupation || null,
    work_experience: body.workExperience || null,
    current_company: body.currentCompany || null,
    design_experience: body.designExperience || null,
    software_known: softwareKnown,
    expectations: body.expectations || null,
    training_goal: body.trainingGoal || null,
    phone: body.phone,
    email: body.email || null,
    heard_from: body.heardFrom || null,
    course_interest: body.courseInterest || null,
  })

  if (insertError) {
    console.error("Demo request insert failed:", insertError)
    return NextResponse.json(
      { error: "Something went wrong submitting your request. Please try again or contact us directly." },
      { status: 500 },
    )
  }

  // Best-effort mirror to the existing CRM sheet via n8n — the request is already saved above,
  // so a webhook failure (e.g. n8n being down) must not fail the whole submission.
  const webhookUrl = process.env.ADMISSION_SHEET_WEBHOOK_URL
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: body.studentName,
        lastName: "",
        email: body.email || "",
        phone: body.phone,
        course: body.courseInterest || "",
        education: body.education || "",
        message: `Demo request. Training goal: ${body.trainingGoal || "n/a"}. Expects: ${body.expectations || "n/a"}`,
        source: "Demo Request",
      }),
    }).catch((error) => {
      console.error("Demo request webhook mirror failed (non-fatal):", error)
    })
  }

  return NextResponse.json({ success: true })
}
