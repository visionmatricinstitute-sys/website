import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: course } = await supabase.from("courses").select("title").eq("slug", slug).single()

  return {
    title: course ? `Enroll — ${course.title}` : "Enroll",
    robots: { index: false, follow: false }, // a checkout page has no reason to rank in search
  }
}

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: course } = await supabase
    .from("courses")
    .select("id, slug, title, description, price_amount, price_currency")
    .eq("slug", slug)
    .single()

  // Only a course that is actually priced in the database can be checked out —
  // anything else (a program page with no real price set yet) has no real
  // payment to take, so this route correctly 404s rather than showing a fake
  // "pay" button for it.
  if (!course || !course.price_amount) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-[70vh] bg-gradient-to-br from-background to-muted py-16 px-4">
        <div className="container mx-auto max-w-lg">
          <CheckoutForm
            courseSlug={course.slug}
            courseTitle={course.title}
            courseDescription={course.description ?? ""}
            priceAmount={course.price_amount}
            priceCurrency={course.price_currency ?? "INR"}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
