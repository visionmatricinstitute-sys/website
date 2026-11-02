import type { ReactNode } from "react"

// Next.js remounts template.tsx on every navigation (unlike layout.tsx, which persists), so each
// page gets a fresh entrance fade. It is CSS-only (see .page-enter in globals.css) on purpose: the
// previous version was a framer-motion client component whose opacity-0 start state kept the whole
// page invisible until JavaScript had downloaded and hydrated, which pushed Largest Contentful
// Paint to about 4-6 s on mobile for every inner page. The animation starts at opacity 0.01, not 0,
// because Chrome ignores opacity-0 elements when choosing the LCP element.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>
}
