"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

// Scroll-reveal wrapper. Server render and first paint show the content (no opacity-0 start state),
// so above-the-fold content, including the Largest Contentful Paint element, is visible before any
// JavaScript runs. After hydration, only content that is still below the fold is hidden and then
// faded in as it scrolls into view. The previous framer-motion version rendered every FadeIn with
// opacity 0 until hydration, which delayed LCP to about 6 s on mobile for several pages.
export function FadeIn({ children, delay = 0, y = 24, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<"initial" | "hidden" | "shown">("initial")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion || el.getBoundingClientRect().top < window.innerHeight - 80) {
      setState("shown")
      return
    }
    setState("hidden")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown")
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)"
  const style =
    state === "hidden"
      ? { opacity: 0, transform: `translateY(${y}px)` }
      : state === "shown"
        ? { opacity: 1, transform: "none", transition: `opacity 0.6s ${ease} ${delay}s, transform 0.6s ${ease} ${delay}s` }
        : undefined

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
