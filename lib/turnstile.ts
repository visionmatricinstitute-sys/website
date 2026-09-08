// Shared server-side Cloudflare Turnstile verification, used by every public
// lead-capture route. Fails open (returns true) only when no secret is
// configured yet, so forms keep working during initial setup — once
// TURNSTILE_SECRET_KEY is set, a missing/invalid token is rejected.
export async function verifyCaptcha(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (typeof token !== "string" || !token) return false

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.set("remoteip", ip)
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })
    const result = await verifyRes.json()
    return result.success === true
  } catch (error) {
    console.error("Turnstile verification request failed:", error)
    return false
  }
}

export function clientIp(request: Request): string | null {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null
}
