import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"
import { findOrCreateAuthUserByEmail } from "@/lib/supabase/admin-auth"
import { isValidPhone } from "@/lib/phone"
import { verifyCaptcha, clientIp } from "@/lib/turnstile"

// Guest checkout: unlike /api/razorpay/create-order, this route does NOT require
// an existing session — the visitor is paying for a course before they have an
// account. The account is created here (or reused, for a returning customer),
// so that even if the browser never calls /api/enroll/verify, the independent
// /api/razorpay/webhook route (already keyed off razorpay_order_id -> payments
// row -> student_id/course_id) still has a real student_id to enrol once
// Razorpay confirms the payment. No changes were needed to the webhook route.
export async function POST(request: Request) {
  const { courseSlug, fullName, email, phone, captchaToken } = await request.json()

  if (!courseSlug || !fullName || !email || !phone) {
    return NextResponse.json({ error: "Name, email, phone and course are required" }, { status: 400 })
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number" }, { status: 400 })
  }

  // This route creates a real account and a real Razorpay order from a fully
  // public, unauthenticated page — captcha-gate it like every other public
  // lead/account-creating form on the site.
  const captchaOk = await verifyCaptcha(captchaToken, clientIp(request))
  if (!captchaOk) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 })
  }

  const serviceClient = createServiceClient()

  const { data: course } = await serviceClient
    .from("courses")
    .select("id, price_amount, price_currency")
    .eq("slug", courseSlug)
    .single()
  if (!course || !course.price_amount) {
    return NextResponse.json({ error: "Course not found or has no price set" }, { status: 404 })
  }

  let userId: string
  let isNewAccount: boolean
  try {
    ;({ userId, isNewAccount } = await findOrCreateAuthUserByEmail(email, fullName))
  } catch (err) {
    console.error("Guest checkout — account lookup/creation failed:", err)
    return NextResponse.json({ error: "Could not set up your account. Please try again." }, { status: 500 })
  }

  const { data: existingEnrollment } = await serviceClient
    .from("enrollments")
    .select("id")
    .eq("student_id", userId)
    .eq("course_id", course.id)
    .maybeSingle()
  if (existingEnrollment) {
    return NextResponse.json(
      { error: "This email is already enrolled in this course. Sign in to access it." },
      { status: 409 },
    )
  }

  // Keep the phone number on the profile — the trigger that creates it on
  // signup only sets full_name from user_metadata, so this is a follow-up write.
  await serviceClient.from("profiles").update({ phone }).eq("id", userId)

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
      notes: { student_id: userId, course_id: course.id, guest_checkout: "true" },
    }),
  })

  if (!orderRes.ok) {
    const errBody = await orderRes.text()
    console.error("Razorpay order creation failed:", errBody)
    return NextResponse.json({ error: "Could not create payment order" }, { status: 502 })
  }

  const order = await orderRes.json()

  const { error: insertError } = await serviceClient.from("payments").insert({
    student_id: userId,
    course_id: course.id,
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
    isNewAccount,
  })
}
