// Loose international format: optional leading +, then digits/spaces/dashes only.
// Length check counts digits alone so separators don't count toward the range.
const PHONE_FORMAT = /^\+?[0-9\s-]+$/
const MIN_DIGITS = 7
const MAX_DIGITS = 15

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim()
  if (!PHONE_FORMAT.test(trimmed)) return false
  const digitCount = trimmed.replace(/[^0-9]/g, "").length
  return digitCount >= MIN_DIGITS && digitCount <= MAX_DIGITS
}

export const PHONE_INPUT_PATTERN = "^\\+?[0-9\\s-]{7,20}$"
export const PHONE_VALIDATION_MESSAGE =
  "Please enter a valid phone number (digits only, with optional +, spaces, or dashes)."
