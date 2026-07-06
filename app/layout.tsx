import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "600", "700", "800", "900"],
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")

const siteName = "Vision Matrix Institute"
const siteTitle = "Vision Matrix Institute - Online Technical & Electrical Engineering Education"
const siteDescription =
  "Leading online technical education institute offering Computer Skills, Drafting & Design, BIM, Electrical Design, Data Center Specialist courses and more. Build your career with industry-relevant skills from anywhere."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "online technical education",
    "computer courses",
    "BIM training",
    "drafting design",
    "electrical design courses",
    "data center training",
    "career courses",
  ],
  generator: "v0.app",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/modern-computer-classroom.png",
        width: 1200,
        height: 630,
        alt: "Students learning technical skills at Vision Matrix Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/modern-computer-classroom.png"],
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  email: "info.visionmatrix@gmail.com",
  telephone: "+91-9930259997",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9930259997",
    email: "info.visionmatrix@gmail.com",
    contactType: "admissions",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
