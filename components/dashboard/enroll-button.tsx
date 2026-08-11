"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

declare global {
  interface Window {
    Razorpay: any
  }
}

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
  const [couponCode, setCouponCode] = useState("")
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
      body: JSON.stringify({ courseId, couponCode }),
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
      theme: { color: "#0f172a" },
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

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={`coupon-${courseId}`} className="text-xs text-muted-foreground">
          Coupon code (optional)
        </Label>
        <Input
          id={`coupon-${courseId}`}
          placeholder="LAUNCH60"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
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
