/**
 * Zoom Server-to-Server OAuth integration.
 * Requires ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID and ZOOM_CLIENT_SECRET (server-only env vars)
 * from a Server-to-Server OAuth app created in the Zoom App Marketplace.
 */

let cachedToken: { token: string; expiresAt: number } | null = null

async function getZoomAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.token
  }

  const accountId = process.env.ZOOM_ACCOUNT_ID
  const clientId = process.env.ZOOM_CLIENT_ID
  const clientSecret = process.env.ZOOM_CLIENT_SECRET

  if (!accountId || !clientId || !clientSecret) {
    throw new Error("Zoom is not configured — set ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID and ZOOM_CLIENT_SECRET.")
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const res = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}` },
  })

  if (!res.ok) {
    throw new Error(`Zoom authentication failed (${res.status}): ${await res.text()}`)
  }

  const data = await res.json()
  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 }
  return cachedToken.token
}

export async function createZoomMeeting(opts: {
  topic: string
  agenda?: string
  startTimeIso: string
  durationMinutes: number
}): Promise<{ meetingId: string; joinUrl: string; startUrl: string }> {
  const token = await getZoomAccessToken()

  const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: opts.topic,
      agenda: opts.agenda,
      type: 2, // scheduled meeting
      start_time: opts.startTimeIso,
      duration: opts.durationMinutes,
      timezone: "UTC",
      settings: {
        join_before_host: true,
        waiting_room: false,
        approval_type: 2,
        host_video: true,
        participant_video: false,
      },
    }),
  })

  if (!res.ok) {
    throw new Error(`Zoom meeting creation failed (${res.status}): ${await res.text()}`)
  }

  const data = await res.json()
  return { meetingId: String(data.id), joinUrl: data.join_url, startUrl: data.start_url }
}
