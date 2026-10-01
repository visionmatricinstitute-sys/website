import { createServiceClient } from "@/lib/supabase/service"

// Used by the guest-checkout flow (app/api/enroll/*): a visitor pays before they
// ever create an account, so the account has to be created (or reused, if they've
// bought a course before) as part of that flow, using the service-role client —
// never call this from a route a browser can trigger without a verified payment
// behind it.
//
// Returns the auth user id to attach the payment/enrollment to, plus whether the
// account was just created (the caller uses that to decide whether to send a
// "set your password" email — an existing customer already has one).
export async function findOrCreateAuthUserByEmail(
  email: string,
  fullName: string,
): Promise<{ userId: string; isNewAccount: boolean }> {
  const admin = createServiceClient()
  const normalizedEmail = email.trim().toLowerCase()

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: normalizedEmail,
    email_confirm: true, // a completed payment is a stronger identity signal than an email click
    user_metadata: { full_name: fullName },
  })

  if (!createError && created.user) {
    return { userId: created.user.id, isNewAccount: true }
  }

  // "already registered" is the expected, non-exceptional case for a returning
  // customer buying a second course — anything else is a real failure.
  const alreadyExists =
    createError?.status === 422 ||
    /already registered|already exists|email_exists/i.test(createError?.message ?? "")
  if (!alreadyExists) {
    throw createError ?? new Error("Could not create account")
  }

  // supabase-js v2's admin.listUsers() does not take an email filter in the
  // version this project pins (@supabase/supabase-js ^2.45.4), so the existing
  // user is found by paging through the list — fine at this institute's scale,
  // but re-check this if the user base grows into the thousands.
  let page = 1
  const perPage = 200
  for (let i = 0; i < 25; i++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage })
    if (error) throw error
    const match = data.users.find((u) => u.email?.toLowerCase() === normalizedEmail)
    if (match) return { userId: match.id, isNewAccount: false }
    if (data.users.length < perPage) break
    page += 1
  }

  throw new Error("Account already exists for this email but could not be looked up")
}
