import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata = {
  title: "Set Your Password",
  robots: { index: false, follow: false },
}

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-gradient-to-br from-background to-muted flex items-center justify-center py-20 px-4">
        <ResetPasswordForm />
      </main>
      <Footer />
    </>
  )
}
