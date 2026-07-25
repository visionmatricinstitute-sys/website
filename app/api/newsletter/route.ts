import { NextResponse } from "next/server"

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

  const webhookUrl = process.env.ADMISSION_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("ADMISSION_SHEET_WEBHOOK_URL is not set")
    return NextResponse.json(
      { error: "Signup isn't connected yet. Please contact us directly via WhatsApp or email." },
      { status: 500 },
    )
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "Newsletter" }),
    })

    if (!response.ok) {
      throw new Error(`Sheet webhook responded with status ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Newsletter signup failed:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 502 },
    )
  }
}
