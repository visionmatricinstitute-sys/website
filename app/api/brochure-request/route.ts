import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"
import { appendBrochureRequestToSheet } from "@/lib/google-sheets"
import { verifyCaptcha, clientIp } from "@/lib/turnstile"
import { isValidPhone, PHONE_VALIDATION_MESSAGE } from "@/lib/phone"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REQUIRED_FIELDS = ["firstName", "lastName", "mobile", "email"] as const

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

  if (!isValidPhone(String(body.mobile))) {
    return NextResponse.json({ error: PHONE_VALIDATION_MESSAGE }, { status: 400 })
  }
  if (!EMAIL_RE.test(String(body.email))) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const captchaOk = await verifyCaptcha(body.captchaToken, clientIp(request))
  if (!captchaOk) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error: insertError } = await supabase.from("brochure_requests").insert({
    first_name: body.firstName,
    last_name: body.lastName,
    mobile: body.mobile,
    email: body.email,
    state: body.state || null,
    program: body.program || null,
  })

  if (insertError) {
    console.error("Brochure request insert failed:", insertError)
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
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
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.mobile,
        course: body.program || "",
        education: "",
        message: `Brochure download request. State: ${body.state || "n/a"}`,
        source: "Brochure Download",
      }),
    }).catch((error) => {
      console.error("Brochure request webhook mirror failed (non-fatal):", error)
    })
  }

  // Best-effort direct mirror to the "Brochure Requests" tab — independent of n8n, doesn't
  // need it to be running. Awaited (not fire-and-forget): Vercel can freeze a serverless
  // function's execution right after the response is sent, which kills any un-awaited async
  // work before it completes. Still non-fatal on failure.
  if (process.env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    try {
      await appendBrochureRequestToSheet({
        firstName: String(body.firstName),
        lastName: String(body.lastName),
        mobile: String(body.mobile),
        email: String(body.email),
        state: body.state as string | undefined,
        program: body.program as string | undefined,
      })
    } catch (error) {
      console.error("Brochure request Google Sheets mirror failed (non-fatal):", error)
    }
  }

  return NextResponse.json({ success: true })
}
