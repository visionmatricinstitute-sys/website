"use client"

import type { ReactNode } from "react"

/** Submit button that asks "are you sure?" first. Used for destructive admin actions. */
export function ConfirmSubmitButton({
  message,
  className,
  ariaLabel,
  children,
}: {
  message: string
  className?: string
  ariaLabel?: string
  children: ReactNode
}) {
  return (
    <button
      type="submit"
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault()
      }}
    >
      {children}
    </button>
  )
}
