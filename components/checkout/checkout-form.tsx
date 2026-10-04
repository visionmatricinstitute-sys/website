"use client"

import { useState, type FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, Lock, MailCheck } from "lucide-react"
import { TurnstileWidget } from "@/components/turnstile-widget"
import { PHONE_INPUT_PATTERN, PHONE_VALIDATION_MESSAGE } from "@/lib/phone"

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

const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

function formatPrice(amountInPaise: number, currency: string) {
  const amount = amountInPaise / 100
  if (currency === "INR") return `₹${amount.toLocaleString("en-IN")}`
  return `${amount.toLocaleString()} ${currency}`
}

export function CheckoutForm({
  courseSlug,
  courseTitle,
  courseDescription,
  priceAmount,
  priceCurrency,
}: {
  courseSlug: string
  courseTitle: string
  courseDescription: string
  priceAmount: number
  priceCurrency: string
}) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paid, setPaid] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      setError("Could not load the payment gateway. Check your connection and try again.")
      setSubmitting(false)
      return
    }

    const orderRes = await fetch("/api/enroll/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseSlug, fullName, email, phone, captchaToken }),
    })
    const orderData = await orderRes.json()
    if (!orderRes.ok) {
      setError(orderData.error || "Could not start payment.")
      setCaptchaToken(null)
      setSubmitting(false)
      return
    }

    const razorpay = new window.Razorpay({
      key: orderData.keyId,
      order_id: orderData.orderId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Vision Matrix Institute",
      description: courseTitle,
      prefill: { name: fullName, email, contact: phone },
      theme: { color: "#1c1b1a" },
      handler: async (response: any) => {
        const verifyRes = await fetch("/api/enroll/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
        if (verifyRes.ok) {
          setPaid(true)
        } else {
          setError(
            "Payment succeeded but we couldn't confirm your enrolment automatically. Contact support with your payment ID and we'll sort it out.",
          )
        }
        setSubmitting(false)
      },
      modal: {
        ondismiss: () => setSubmitting(false),
      },
    })

    razorpay.on("payment.failed", () => {
      setError("Payment failed. You have not been charged.")
      setSubmitting(false)
    })

    razorpay.open()
  }

  if (paid) {
    return (
      <Card>
        <CardContent className="text-center py-10 space-y-3">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
            <MailCheck className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-xl font-bold font-sans text-foreground">You're enrolled!</h2>
          <p className="text-sm text-muted-foreground font-serif">
            We've sent an email to <strong>{email}</strong> with a link to set your password. Use it to sign in and
            access <strong>{courseTitle}</strong> from your dashboard.
          </p>
          <Button asChild className="mt-2 bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="/login">Go to Sign In</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="font-sans text-xl">{courseTitle}</CardTitle>
        {courseDescription && (
          <p className="text-sm text-muted-foreground font-serif leading-relaxed">{courseDescription}</p>
        )}
        <div className="text-3xl font-black font-sans text-foreground pt-2">
          {formatPrice(priceAmount, priceCurrency)}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="checkout-name">Full Name</Label>
            <Input
              id="checkout-name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkout-email">Email</Label>
            <Input
              id="checkout-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkout-phone">Phone / WhatsApp Number</Label>
            <Input
              id="checkout-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern={PHONE_INPUT_PATTERN}
              title={PHONE_VALIDATION_MESSAGE}
              placeholder="+91 90000 00000"
            />
          </div>

          <p className="text-xs text-muted-foreground font-serif flex items-start gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-accent" />
            A student dashboard account is created automatically after payment — you'll get an email to set your
            password and start immediately.
          </p>

          {error && <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>}

          <TurnstileWidget onVerify={setCaptchaToken} onExpire={() => setCaptchaToken(null)} />

          <Button
            type="submit"
            disabled={submitting || (captchaRequired && !captchaToken)}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Proceed to Pay {formatPrice(priceAmount, priceCurrency)}
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground font-serif">
            Payments are processed securely by Razorpay. Vision Matrix Institute never sees your card details.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
