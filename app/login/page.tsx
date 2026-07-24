import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Student Login | Vision Matrix Institute",
  description: "Sign in to your Vision Matrix Institute student dashboard.",
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-gradient-to-br from-background to-muted flex items-center justify-center py-20 px-4">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
