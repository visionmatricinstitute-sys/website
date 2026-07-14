import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Vision Matrix Institute logo" className="h-9 w-9" />
              <h3 className="text-2xl font-black font-sans">Vision Matrix Institute</h3>
            </div>
            <p className="text-navy-foreground/80 font-serif leading-relaxed">
              Leading online technical education institute, empowering students with industry-relevant skills from
              anywhere.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-navy-foreground hover:bg-navy-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-navy-foreground hover:bg-navy-foreground/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-navy-foreground hover:bg-navy-foreground/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button asChild size="sm" variant="ghost" className="text-navy-foreground hover:bg-navy-foreground/10">
                <a href="https://www.youtube.com/@visionMatrixInstitute" target="_blank" rel="noopener noreferrer" aria-label="Vision Matrix Institute on YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-sans">Quick Links</h4>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="/#home" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#about" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#courses"
                  className="text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="/#admission"
                  className="text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                >
                  Admission
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/engineers-toolkit"
                  className="text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                >
                  Engineer's Toolkit
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-sans">Popular Courses</h4>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  Computer Skills
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  CAD Training
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  BIM Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  Graphic Design
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-sans">Contact Info</h4>
            <div className="space-y-3 font-serif">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-navy-foreground/80 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-navy-foreground/80">
                    100% Online Institute
                    <br />
                    Live virtual classes, accessible anywhere
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-navy-foreground/80" />
                <p className="text-navy-foreground/80">+91 9930259997</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-navy-foreground/80" />
                <a
                  href="mailto:info.visionmatrix@gmail.com"
                  className="text-navy-foreground/80 rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  info.visionmatrix@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-navy-foreground/80 mt-0.5" />
                <div>
                  <p className="text-navy-foreground/80">
                    Mon - Sat: 9:00 AM - 6:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-navy-foreground/20 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold font-sans mb-2">Stay Updated</h4>
              <p className="text-navy-foreground/80 font-serif">
                Subscribe to our newsletter for course updates and career tips.
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-navy-foreground/10 border-navy-foreground/20 text-navy-foreground placeholder:text-navy-foreground/60"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-navy-foreground/20 mt-8 pt-8 text-center">
          <p className="text-navy-foreground/60 font-serif">© 2025 Vision Matrix Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
