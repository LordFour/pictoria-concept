import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

type Tag = 'div' | 'section' | 'header' | 'ul' | 'ol' | 'li' | 'p' | 'h2' | 'h3' | 'figure' | 'article' | 'span'

/**
 * Staggered entrance for the parts of a section. Content is visible without JS (SSR-less SPA renders with motion),
 * and with reduced motion it is shown immediately.
 */
export function Reveal({ children, className, as = 'div', amount = 0.25 }: { children: ReactNode; className?: string; as?: Tag; amount?: number }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  if (reduce) return <M className={className}>{children}</M>
  return (
    <M className={className} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </M>
  )
}

export function RevealItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: Tag }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  if (reduce) return <M className={className}>{children}</M>
  return (
    <M className={className} variants={item}>
      {children}
    </M>
  )
}
