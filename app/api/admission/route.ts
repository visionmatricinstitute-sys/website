import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"
import { verifyCaptcha, clientIp } from "@/lib/turnstile"
import { isValidPhone, PHONE_VALIDATION_MESSAGE } from "@/lib/phone"

const REQUIRED_FIELDS = ["firstName", "lastName", "email", "phone", "course"] as const

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

  if (!isValidPhone(String(body.phone))) {
    return NextResponse.json({ error: PHONE_VALIDATION_MESSAGE }, { status: 400 })
  }

  const captchaOk = await verifyCaptcha(body.captchaToken, clientIp(request))
  if (!captchaOk) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error: insertError } = await supabase.from("admission_requests").insert({
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    phone: body.phone,
    course: body.course,
    education: body.education || null,
    message: body.message || null,
  })

  if (insertError) {
    console.error("Admission request insert failed:", insertError)
    return NextResponse.json(
      { error: "Something went wrong submitting your application. Please try again or contact us directly." },
      { status: 500 },
    )
  }

  // Best-effort mirror to the existing CRM sheet via n8n — the application is already
  // saved above, so a webhook failure (e.g. n8n being down) must not fail the submission.
  const webhookUrl = process.env.ADMISSION_SHEET_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, source: "Admission Form" }),
      })
    } catch (error) {
      console.error("Admission form webhook mirror failed (non-fatal):", error)
    }
  }

  return NextResponse.json({ success: true })
}
