import { NextResponse } from "next/server"

const REQUIRED_FIELDS = ["name", "phone", "course"] as const

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

  const webhookUrl = process.env.ADMISSION_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("ADMISSION_SHEET_WEBHOOK_URL is not set")
    return NextResponse.json(
      { error: "The demo request form isn't connected yet. Please contact us directly via WhatsApp or email." },
      { status: 500 },
    )
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: body.name,
        lastName: "",
        email: "",
        phone: body.phone,
        course: body.course,
        education: "",
        message: body.preferredTime ? `Preferred time: ${body.preferredTime}` : "",
        source: "Demo Request",
      }),
    })

    if (!response.ok) {
      throw new Error(`Sheet webhook responded with status ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Demo request submission failed:", error)
    return NextResponse.json(
      { error: "Something went wrong submitting your request. Please try again or contact us directly." },
      { status: 502 },
    )
  }
}
