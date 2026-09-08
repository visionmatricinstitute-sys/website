import { NextResponse } from "next/server"
import crypto from "crypto"
import { createServiceClient } from "@/lib/supabase/service"

// Configure this URL in Razorpay Dashboard → Settings → Webhooks, subscribed
// to "payment.captured" and "payment.failed". This is the reliable source of
// truth for payment status — /api/razorpay/verify only handles the fast-path
// UX (immediate redirect after paying); this route is what actually
// guarantees an enrollment isn't missed if the browser never calls back.
export async function POST(request: Request) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!webhookSecret) return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })

  const rawBody = await request.text()
  const signature = request.headers.get("x-razorpay-signature")

  const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex")

  // Constant-time comparison — see the same fix in /api/razorpay/verify for why
  // a plain !== is a timing side-channel on a signature check.
  const signaturesMatch =
    typeof signature === "string" &&
    expectedSignature.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))

  if (!signaturesMatch) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 })
  }

  const event = JSON.parse(rawBody)
  const serviceClient = createServiceClient()

  if (event.event === "payment.captured" || event.event === "payment.failed") {
    const paymentEntity = event.payload?.payment?.entity
    const orderId = paymentEntity?.order_id
    if (!orderId) return NextResponse.json({ received: true })

    const { data: payment } = await serviceClient
      .from("payments")
      .select("id, student_id, course_id, status")
      .eq("razorpay_order_id", orderId)
      .single()

    if (payment && payment.status !== "paid") {
      if (event.event === "payment.captured") {
        await serviceClient
          .from("payments")
          .update({ status: "paid", razorpay_payment_id: paymentEntity.id, paid_at: new Date().toISOString() })
          .eq("id", payment.id)

        await serviceClient
          .from("enrollments")
          .upsert(
            { student_id: payment.student_id, course_id: payment.course_id },
            { onConflict: "student_id,course_id" },
          )
      } else {
        await serviceClient.from("payments").update({ status: "failed" }).eq("id", payment.id)
      }
    }
  }

  return NextResponse.json({ received: true })
}
