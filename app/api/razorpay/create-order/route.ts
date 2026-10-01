import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/service"

// There are no coupons. The launch offer (LAUNCH60) ended on 2026-09-26 and its
// hardcoded branch was removed; the amount is always the course's price_amount.
// If coupons return, add a real `coupons` table rather than `if` branches here.

export async function POST(request: Request) {
  // URGENT, TEMPORARY (2026-09-28): server-side half of the same pause as
  // components/dashboard/enroll-button.tsx — hiding the button isn't enough,
  // since this route could still be called directly. See FOUNDER-ACTION-ITEMS.md
  // item 0.1: Razorpay's Demo payment method lets anyone "pay" for free while
  // the account isn't fully activated.
  if (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED !== "true") {
    return NextResponse.json({ error: "Online payment is temporarily paused." }, { status: 503 })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

  const { courseId } = await request.json()
  if (!courseId) return NextResponse.json({ error: "courseId is required" }, { status: 400 })

  const { data: course } = await supabase
    .from("courses")
    .select("id, price_amount, price_currency")
    .eq("id", courseId)
    .single()
  if (!course || !course.price_amount) {
    return NextResponse.json({ error: "Course not found or has no price set" }, { status: 404 })
  }

  const { data: existingEnrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", user.id)
    .eq("course_id", courseId)
    .maybeSingle()
  if (existingEnrollment) {
    return NextResponse.json({ error: "Already enrolled in this course" }, { status: 409 })
  }

  const amount = course.price_amount

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Razorpay is not configured" }, { status: 500 })
  }

  const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
    },
    body: JSON.stringify({
      amount,
      currency: course.price_currency || "INR",
      notes: { student_id: user.id, course_id: courseId },
    }),
  })

  if (!orderRes.ok) {
    const errBody = await orderRes.text()
    console.error("Razorpay order creation failed:", errBody)
    return NextResponse.json({ error: "Could not create payment order" }, { status: 502 })
  }

  const order = await orderRes.json()

  // Recorded via the service-role client, not the user's own session — see
  // the note on the `payments` table in migrations/004_payments.sql for why.
  const serviceClient = createServiceClient()
  const { error: insertError } = await serviceClient.from("payments").insert({
    student_id: user.id,
    course_id: courseId,
    razorpay_order_id: order.id,
    amount,
    currency: course.price_currency || "INR",
    status: "created",
  })
  if (insertError) {
    console.error("Failed to record payment order:", insertError.message)
    return NextResponse.json({ error: "Could not record payment order" }, { status: 500 })
  }

  return NextResponse.json({
    orderId: order.id,
    amount,
    currency: course.price_currency || "INR",
    keyId,
  })
}
