"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/motion/fade-in"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919930259997"
    const message = "Hi, I'd like to know more about Vision Matrix Institute's courses."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <FadeIn delay={0.8} y={12} className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        size="lg"
        variant="whatsapp"
        className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <MessageCircle className="h-6 w-6 mr-2" />
        WhatsApp
      </Button>
    </FadeIn>
  )
}
