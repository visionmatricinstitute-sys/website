import Link from "next/link"
import Image from "next/image"
import { Globe, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin } from "lucide-react"
import { NewsletterForm } from "@/components/newsletter-form"
import { FadeIn } from "@/components/motion/fade-in"

const SOCIAL_BADGE_CLASS =
  "flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110 hover:-translate-y-0.5"

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 py-16">
        <FadeIn className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Vision Matrix Institute logo" width={36} height={36} className="h-9 w-9" />
              <h3 className="text-2xl font-serif font-medium">Vision Matrix Institute</h3>
            </div>
            <p className="text-navy-foreground/80 font-body leading-relaxed">
              India's specialist data center electrical design training institute, building real data center
              skills from anywhere.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/vision-matrix-institutes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vision Matrix Institute on LinkedIn"
                className={SOCIAL_BADGE_CLASS}
                style={{ backgroundColor: "#0A66C2" }}
              >
                <Linkedin className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              </a>
              <a
                href="https://www.youtube.com/@visionMatrixInstitute"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vision Matrix Institute on YouTube"
                className={SOCIAL_BADGE_CLASS}
                style={{ backgroundColor: "#FF0000" }}
              >
                <Youtube className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              </a>
              <a
                href="https://www.instagram.com/visionmatrixinstitute"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vision Matrix Institute on Instagram"
                className={SOCIAL_BADGE_CLASS}
                style={{
                  background:
                    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
                }}
              >
                <Instagram className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="https://www.facebook.com/visionmatrixinstitute"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vision Matrix Institute on Facebook"
                className={SOCIAL_BADGE_CLASS}
                style={{ backgroundColor: "#1877F2" }}
              >
                <Facebook className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-sans">Quick Links</h4>
            <ul className="space-y-2 font-body">
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
              <li>
                <Link href="/blog" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/data-center-design-basics-checklist"
                  className="text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                >
                  Free Design Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-sans">Popular Courses</h4>
            <ul className="space-y-2 font-body">
              <li>
                <Link
                  href="/programs/electrical-design-data-center"
                  className="text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                >
                  Electrical Design – Data Center Specialist
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/autocad-training"
                  className="text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                >
                  CAD Training
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/bim-revit-training"
                  className="text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                >
                  BIM Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-sans">Contact Info</h4>
            <div className="space-y-3 font-body">
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
                  href="mailto:info@visionmatrixinstitute.com"
                  className="text-navy-foreground/80 rounded-sm transition-colors hover:text-accent-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-tint focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  info@visionmatrixinstitute.com
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
        </FadeIn>

        {/* Newsletter */}
        <div className="border-t border-navy-foreground/20 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold font-sans mb-2">Stay Updated</h4>
              <p className="text-navy-foreground/80 font-body">
                Subscribe to our newsletter for course updates and career tips.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-navy-foreground/20 mt-8 pt-8 text-center">
          <p className="text-navy-foreground/60 font-body">© 2025 Vision Matrix Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
