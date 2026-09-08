"use client"

import { motion, useScroll, useSpring } from "framer-motion"

// Thin accent bar across the very top of the viewport that fills as the
// visitor scrolls the page — sits above the header (z-[60] vs header's z-50).
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-accent motion-reduce:hidden"
    />
  )
}
