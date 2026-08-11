import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/service"

// Only coupon that exists today — there's no coupon table yet, so this is a
// hardcoded check rather than a lookup. If more coupons show up, promote
// this to a real `coupons` table instead of adding more `if` branches here.
const LAUNCH60_PRICE_PAISE = 1396000 // ₹13,960

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

  const { courseId, couponCode } = await request.json()
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

  const normalizedCoupon = typeof couponCode === "string" ? couponCode.trim().toUpperCase() : ""
  const amount = normalizedCoupon === "LAUNCH60" ? LAUNCH60_PRICE_PAISE : course.price_amount

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
      notes: { student_id: user.id, course_id: courseId, coupon_code: normalizedCoupon || undefined },
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
    coupon_code: normalizedCoupon || null,
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
