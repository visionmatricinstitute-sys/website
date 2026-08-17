import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim()
  const whatsapp = body.whatsapp ? String(body.whatsapp).trim() : null
  const role = body.role ? String(body.role).trim() : null
  const magnet = body.magnet ? String(body.magnet).trim() : "data-center-load-calculator"

  if (!name || !email) {
    return NextResponse.json({ error: "Please share your name and email." }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error: insertError } = await supabase.from("lead_magnet_requests").insert({
    name,
    email,
    whatsapp,
    role,
    magnet,
  })

  if (insertError) {
    console.error("Lead magnet request insert failed:", insertError)
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email info@visionmatrixinstitute.com." },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}
