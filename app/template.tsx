"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

// Next.js remounts template.tsx on every navigation (unlike layout.tsx, which
// persists) — that's what gives each page a fresh entrance animation here
// without needing to coordinate an exit animation for the page being left.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
