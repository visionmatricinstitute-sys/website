import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Inter } from "next/font/google"
import { Fraunces } from "next/font/google"
import Script from "next/script"
import { Toaster } from "@/components/ui/sonner"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import "./globals.css"

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

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

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")

const siteName = "Vision Matrix Institute"
const siteTitle = "Data Center Electrical Design Training | Vision Matrix Institute"
const siteDescription =
  "India's specialist data center electrical design training institute. Build real data center skills in ETAP, Revit MEP, AutoCAD & IS/IEC standards — 100% live, online."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "data center training",
    "data center skills",
    "data center training institute",
    "data center electrical design training",
    "data center electrical design course",
    "online technical education",
    "BIM training",
    "drafting design",
    "electrical design courses",
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
        url: "/hero-data-center.jpg",
        width: 1600,
        height: 894,
        alt: "Vision Matrix Institute — data center electrical infrastructure and monitoring systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/hero-data-center.jpg"],
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  email: "info@visionmatrixinstitute.com",
  telephone: "+91-9930259997",
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.png`,
    width: 128,
    height: 128,
  },
  image: `${siteUrl}/icon.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9930259997",
    email: "info@visionmatrixinstitute.com",
    contactType: "admissions",
  },
  sameAs: [
    "https://www.facebook.com/visionmatrixinstitute",
    "https://www.instagram.com/visionmatrixinstitute",
    "https://www.youtube.com/@visionMatrixInstitute",
    "https://www.linkedin.com/company/vision-matrix-institutes",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${fraunces.variable} antialiased`}>
      <head>
        <meta name="msvalidate.01" content="9166F8A67733A6CEF2B393A997444A3C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {gtmId && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
      </head>
      <body>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <ScrollProgress />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
