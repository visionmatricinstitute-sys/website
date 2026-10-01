import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/service"

// This confirms payment from the browser's callback, for immediate UX
// (redirect to the course right after paying). It is NOT the sole source of
// truth — the /api/razorpay/webhook route independently confirms the same
// payment from Razorpay's own servers, in case the browser closes or the
// network drops before this route ever gets called.
export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

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

  // Constant-time comparison — a plain !== leaks timing information about how
  // many leading characters matched, which is the textbook side-channel a
  // signature check must not have.
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

  if (!payment || payment.student_id !== user.id) {
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
  }

  return NextResponse.json({ success: true })
}
