// Direct Google Sheets sync for demo requests, independent of n8n.
// Uses a standard OAuth2 refresh token (not a service account — blocked by
// an org policy on this Google Workspace, see FOUNDER-ACTION-ITEMS.md) to
// mint short-lived access tokens on demand.

const SPREADSHEET_ID = "1Wk_0lmKiwDAWszyX18kMV1nDn-fb-PXrh55lVgDU8jg"
const SHEET_RANGE = "Demo Requests!A1"

async function getAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID!
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET!
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN!

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to refresh Google access token: ${await res.text()}`)
  }

  const data = await res.json()
  return data.access_token as string
}

export async function appendDemoRequestToSheet(row: {
  studentName: string
  education?: string | null
  college?: string | null
  currentYearSemester?: string | null
  graduationYear?: string | null
  currentOccupation?: string | null
  workExperience?: string | null
  currentCompany?: string | null
  designExperience?: string | null
  softwareKnown?: string[]
  expectations?: string | null
  trainingGoal?: string | null
  phone: string
  email?: string | null
  heardFrom?: string | null
  courseInterest?: string | null
}) {
  const accessToken = await getAccessToken()

  const values = [
    row.studentName,
    row.education || "",
    row.college || "",
    row.currentYearSemester || "",
    row.graduationYear || "",
    row.currentOccupation || "",
    row.workExperience || "",
    row.currentCompany || "",
    row.designExperience || "",
    (row.softwareKnown || []).join(", "),
    row.expectations || "",
    row.trainingGoal || "",
    row.phone,
    row.email || "",
    row.heardFrom || "",
    row.courseInterest || "",
    new Date().toISOString(),
  ]

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(
    SHEET_RANGE,
  )}:append?valueInputOption=USER_ENTERED`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
  })

  if (!res.ok) {
    throw new Error(`Sheets append failed: ${await res.text()}`)
  }
}
