"use client"

import { useEffect, useId, useRef, useState } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
        },
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js"
const MAX_AUTO_RETRIES = 2

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
  if (existing) {
    return new Promise((resolve) => existing.addEventListener("load", () => resolve()))
  }
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

/**
 * Renders nothing (and never blocks submission) when no site key is configured,
 * so the form keeps working exactly as before until the Founder finishes Turnstile setup.
 *
 * Turnstile occasionally reports a client-side error (widget "crashed") for reasons
 * outside the visitor's control — a slow load, a transient Cloudflare hiccup, a
 * conflicting browser extension. Without recovery, that permanently disables the
 * submit button with no explanation. This retries automatically a couple of times,
 * then falls back to a visible retry affordance instead of a silently dead form.
 */
export function TurnstileWidget({
  onVerify,
  onExpire,
}: {
  onVerify: (token: string) => void
  onExpire?: () => void
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | undefined>(undefined)
  const retriesRef = useRef(0)
  const domId = useId()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return
    let cancelled = false

    function renderWidget() {
      if (cancelled || !containerRef.current || !window.turnstile) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey!,
        callback: (token) => {
          setFailed(false)
          onVerify(token)
        },
        "expired-callback": onExpire,
        "error-callback": () => {
          if (cancelled) return
          if (retriesRef.current < MAX_AUTO_RETRIES && widgetIdRef.current && window.turnstile) {
            retriesRef.current += 1
            window.turnstile.reset(widgetIdRef.current)
          } else {
            setFailed(true)
          }
        },
      })
    }

    loadTurnstileScript().then(renderWidget)

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  function handleRetry() {
    retriesRef.current = 0
    setFailed(false)
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  if (!siteKey) return null

  return (
    <div className="my-2 space-y-2">
      <div ref={containerRef} id={`turnstile-${domId}`} />
      {failed && (
        <p className="text-sm text-destructive">
          Verification failed to load.{" "}
          <button type="button" onClick={handleRetry} className="underline font-medium">
            Retry
          </button>
          {" — "}if this keeps happening, message us on WhatsApp and we&apos;ll register you directly.
        </p>
      )}
    </div>
  )
}
