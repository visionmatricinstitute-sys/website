import { NextResponse } from "next/server"
import crypto from "crypto"
import { createServiceClient } from "@/lib/supabase/service"
import { sendAccountSetupEmailIfNeeded } from "@/lib/account-setup-email"

// Guest-checkout counterpart to /api/razorpay/verify — same signature check,
// but no session is expected (the payments row created by /api/enroll/create-order
// already carries the right student_id, looked up by razorpay_order_id instead of
// trusting the caller). Same "not the sole source of truth" note applies: the
// /api/razorpay/webhook route independently confirms the same payment.
export async function POST(request: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment details" }, { status: 400 })
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keySecret) return NextResponse.json({ error: "Razorpay is not configured" }, { status: 500 })

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex")

  const signaturesMatch =
    typeof razorpay_signature === "string" &&
    expectedSignature.length === razorpay_signature.length &&
    crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature))

  if (!signaturesMatch) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
  }

  const serviceClient = createServiceClient()

  const { data: payment } = await serviceClient
    .from("payments")
    .select("id, student_id, course_id, status")
    .eq("razorpay_order_id", razorpay_order_id)
    .single()

  if (!payment) {
    return NextResponse.json({ error: "Payment record not found" }, { status: 404 })
  }

  if (payment.status !== "paid") {
    await serviceClient
      .from("payments")
      .update({ status: "paid", razorpay_payment_id, paid_at: new Date().toISOString() })
      .eq("id", payment.id)

    await serviceClient
      .from("enrollments")
      .upsert({ student_id: payment.student_id, course_id: payment.course_id }, { onConflict: "student_id,course_id" })

    await sendAccountSetupEmailIfNeeded(payment.student_id)
  }

  return NextResponse.json({ success: true })
}
