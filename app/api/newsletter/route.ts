import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const email = String(body.email ?? "").trim()
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error: insertError } = await supabase
    .from("newsletter_subscribers")
    .insert({ email })

  if (insertError) {
    // Unique violation means they're already subscribed — treat as success, not an error.
    if (insertError.code === "23505") {
      return NextResponse.json({ success: true })
    }
    console.error("Newsletter signup insert failed:", insertError)
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 },
    )
  }

  // Best-effort mirror to the existing CRM sheet via n8n — the signup is already
  // saved above, so a webhook failure (e.g. n8n being down) must not fail the request.
  const webhookUrl = process.env.ADMISSION_SHEET_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Newsletter" }),
      })
    } catch (error) {
      console.error("Newsletter webhook mirror failed (non-fatal):", error)
    }
  }

  return NextResponse.json({ success: true })
}
