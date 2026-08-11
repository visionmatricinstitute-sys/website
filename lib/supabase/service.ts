import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Service-role client — bypasses Row Level Security entirely.
// Use ONLY in trusted server code that has already independently verified
// the action it's about to perform (e.g. a Razorpay payment signature).
// Never import this into a client component or an unauthenticated route.
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}
