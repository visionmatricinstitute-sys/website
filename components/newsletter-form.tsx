"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email.")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Signup failed")

      toast.success("Subscribed! We'll keep you posted.")
      setEmail("")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-navy-foreground/10 border-navy-foreground/20 text-navy-foreground placeholder:text-navy-foreground/60"
      />
      <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
      </Button>
    </form>
  )
}
