"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, MessageCircle } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "bg-background/85 shadow-lg border-b border-border" : "bg-background/50 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-muted-foreground border-b border-border">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 9930259997</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info.visionmatrix@gmail.com</span>
            </div>
          </div>
          <div className="text-sm">
            <span>🌐 100% Online Institute</span>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-black font-sans text-primary">Vision Matrix Institute</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#home" className="text-foreground hover:text-accent transition-colors font-medium">
              Home
            </a>
            <a href="/#about" className="text-foreground hover:text-accent transition-colors font-medium">
              About
            </a>
            <a href="/#courses" className="text-foreground hover:text-accent transition-colors font-medium">
              Courses
            </a>
            <a href="/#admission" className="text-foreground hover:text-accent transition-colors font-medium">
              Admission
            </a>
            <Link href="/engineers-toolkit" className="text-foreground hover:text-accent transition-colors font-medium">
              Engineer's Toolkit
            </Link>
            <a href="/#contact" className="text-foreground hover:text-accent transition-colors font-medium">
              Contact Us
            </a>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => window.open("https://wa.me/919930259997", "_blank")}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="/#home" className="text-foreground hover:text-accent transition-colors font-medium">
                Home
              </a>
              <a href="/#about" className="text-foreground hover:text-accent transition-colors font-medium">
                About
              </a>
              <a href="/#courses" className="text-foreground hover:text-accent transition-colors font-medium">
                Courses
              </a>
              <a href="/#admission" className="text-foreground hover:text-accent transition-colors font-medium">
                Admission
              </a>
              <Link href="/engineers-toolkit" className="text-foreground hover:text-accent transition-colors font-medium">
                Engineer's Toolkit
              </Link>
              <a href="/#contact" className="text-foreground hover:text-accent transition-colors font-medium">
                Contact Us
              </a>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white w-fit"
                onClick={() => window.open("https://wa.me/919930259997", "_blank")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
