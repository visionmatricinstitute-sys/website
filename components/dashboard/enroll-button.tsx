"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    Razorpay: any
  }
}

// URGENT, TEMPORARY (2026-09-28): Razorpay's checkout widget offers a "Demo"
// payment method (Done/Failed buttons) on accounts pending full business
// verification — clicking "Done" returns a genuinely valid signature without
// moving real money, so anyone could get free course access through this
// button right now. Paused until Razorpay activation is confirmed; set
// NEXT_PUBLIC_PAYMENTS_ENABLED=true (no code change needed) to turn real
// payment back on. See FOUNDER-ACTION-ITEMS.md item 0.1.
const paymentsEnabled = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true"

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function EnrollButton({
  courseId,
  courseTitle,
  studentName,
  studentEmail,
}: {
  courseId: string
  courseTitle: string
  studentName: string
  studentEmail: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleEnroll() {
    setLoading(true)
    setError(null)

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      setError("Could not load the payment gateway. Check your connection and try again.")
      setLoading(false)
      return
    }

    const orderRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    })
    const orderData = await orderRes.json()
    if (!orderRes.ok) {
      setError(orderData.error || "Could not start payment.")
      setLoading(false)
      return
    }

    const razorpay = new window.Razorpay({
      key: orderData.keyId,
      order_id: orderData.orderId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Vision Matrix Institute",
      description: courseTitle,
      prefill: { name: studentName, email: studentEmail },
      theme: { color: "#1c1b1a" },
      handler: async (response: any) => {
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
        if (verifyRes.ok) {
          router.refresh()
        } else {
          setError("Payment succeeded but enrollment couldn't be confirmed. Contact support with your payment ID.")
        }
        setLoading(false)
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    })

    razorpay.on("payment.failed", () => {
      setError("Payment failed. You have not been charged.")
      setLoading(false)
    })

    razorpay.open()
  }

  if (!paymentsEnabled) {
    return (
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Online payment is temporarily paused while we finish setting up our payment provider.
        </p>
        <Button asChild variant="outline" className="w-full">
          <a href="https://wa.me/919930259997" target="_blank" rel="noopener noreferrer">
            Contact us to enrol
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button
        onClick={handleEnroll}
        disabled={loading}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        {loading ? "Processing..." : "Enroll Now"}
      </Button>
    </div>
  )
}
