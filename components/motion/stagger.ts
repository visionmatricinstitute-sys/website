import type { Variants } from "framer-motion"

/**
 * Shared stagger variants — previously copy-pasted separately in
 * hero-section.tsx, header.tsx, and program-hero.tsx. Use with a parent
 * `motion.div variants={staggerContainer} initial="hidden" animate="show"`
 * and children `motion.div variants={staggerItem}`.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}
