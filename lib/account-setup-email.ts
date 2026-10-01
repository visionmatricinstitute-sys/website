import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { createServiceClient } from "@/lib/supabase/service"
import { SITE_URL } from "@/lib/certificates"

// Called once, right when a guest-checkout payment is confirmed paid — from
// both /api/enroll/verify (the fast browser-callback path) and
// /api/razorpay/webhook (the reliable path, in case the browser never calls
// back). Both routes only enter the "just became paid" branch once per
// payment, so this only ever fires once per real purchase.
//
// admin.generateLink() does NOT send email (it only returns a link for the
// caller to embed in its own email service, which this project doesn't
// have) — resetPasswordForEmail() is what actually triggers Supabase's own
// email delivery, the same mechanism the normal signup flow already relies
// on for its confirmation email. Sending it unconditionally (not just for
// brand-new accounts) is deliberate: for a returning customer buying a
// second course, it's just an ordinary "reset your password" email they can
// ignore if they don't need it.
export async function sendAccountSetupEmailIfNeeded(studentId: string): Promise<void> {
  const serviceClient = createServiceClient()
  const { data: userResult } = await serviceClient.auth.admin.getUserById(studentId)
  const email = userResult?.user?.email
  if (!email) return

  const anonClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const { error } = await anonClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/reset-password`,
  })
  if (error) {
    // The payment and enrollment are already recorded by the caller — a
    // failure here only means the email didn't go out, not that the
    // purchase or enrollment is lost.
    console.error("Could not send account-setup email after payment:", error.message)
  }
}
