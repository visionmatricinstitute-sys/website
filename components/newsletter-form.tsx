"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { TurnstileWidget } from "@/components/turnstile-widget"

const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email.")
      return
    }
    if (captchaRequired && !captchaToken) {
      toast.error("Please complete the verification check.")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, captchaToken }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Signup failed")

      toast.success("Subscribed! We'll keep you posted.")
      setEmail("")
      setCaptchaToken(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setCaptchaToken(null)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-navy-foreground/10 border-navy-foreground/20 text-navy-foreground placeholder:text-navy-foreground/60"
        />
        <Button
          type="submit"
          disabled={submitting || (captchaRequired && !captchaToken)}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </div>
      <TurnstileWidget onVerify={setCaptchaToken} onExpire={() => setCaptchaToken(null)} />
    </form>
  )
}
