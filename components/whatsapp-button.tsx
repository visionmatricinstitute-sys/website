"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919930259997" // Replace with actual WhatsApp number
    const message = "Hi, I'm interested in the Data Center Electrical Design course"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
      >
        <MessageCircle className="h-6 w-6 mr-2" />
        WhatsApp
      </Button>
    </div>
  )
}
