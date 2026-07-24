import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata = {
  title: "Create Student Account | Vision Matrix Institute",
  description: "Create your Vision Matrix Institute student account.",
}

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-gradient-to-br from-background to-muted flex items-center justify-center py-20 px-4">
        <SignupForm />
      </main>
      <Footer />
    </>
  )
}
