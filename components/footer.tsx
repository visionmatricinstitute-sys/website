import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black font-sans">Vision Matrix Institute</h3>
            <p className="text-primary-foreground/80 font-serif leading-relaxed">
              Leading technical education institute in Motihari, Bihar, empowering students with industry-relevant
              skills since 2015.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-sans">Quick Links</h4>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="/#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#courses"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="/#admission"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Admission
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/engineers-toolkit"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
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
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Computer Skills
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  CAD Training
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  BIM Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Graphic Design
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
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
                <MapPin className="h-5 w-5 text-primary-foreground/80 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">
                    Main Road, Near Bus Stand
                    <br />
                    Motihari, Bihar 845401
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-foreground/80" />
                <p className="text-primary-foreground/80">+91 9876543210</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/80" />
                <p className="text-primary-foreground/80">info@visionmatrix.edu</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-foreground/80 mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80">
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
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold font-sans mb-2">Stay Updated</h4>
              <p className="text-primary-foreground/80 font-serif">
                Subscribe to our newsletter for course updates and career tips.
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 font-serif">© 2025 Vision Matrix Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
