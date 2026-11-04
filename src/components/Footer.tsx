import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/lang'
import { LangSwitch } from './Header'
import { Mark } from './Mark'

/** The close: the name returns at full width, the tree mark grows out of it. */
export function Footer({ tone = 'paper' }: { tone?: 'paper' | 'ink' }) {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const paper = tone === 'paper'

  return (
    <footer className={`${paper ? 'paper' : 'bg-ink text-canvas'} relative overflow-hidden pt-[clamp(4rem,8vw,7rem)]`}>
      <div className="frame">
        <div className="flex items-end gap-[1.5vw]">
          <motion.div
            initial={reduce ? false : { rotate: -40, scale: 0.6, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
            className="shrink-0"
          >
            <Mark className="w-[12vw] max-w-[200px]" color={paper ? 'var(--color-ink)' : 'var(--color-turquoise)'} />
          </motion.div>
          <p aria-hidden className="min-w-0 font-display text-[12.6vw] font-medium leading-[0.78] tracking-[-0.05em]">
            PICTORIA
          </p>
        </div>

        <div className="mt-12 grid gap-8 pb-10 md:grid-cols-12 md:items-end">
          <div className="flex flex-col gap-3 md:col-span-7">
            <p className="max-w-[62ch] text-[0.9375rem] leading-[1.5]">{t.footer.concept}</p>
            <p className="max-w-[62ch] text-[0.9375rem] leading-[1.5]">{t.footer.photos}</p>
          </div>
          <div className="flex items-center justify-between gap-6 md:col-span-4 md:col-start-9 md:justify-end">
            <LangSwitch className="-ml-2" />
            <Link to="/#top" className="line-link">
              {t.footer.top} ↑
            </Link>
          </div>
        </div>
      </div>
      <div aria-hidden className="h-3 bg-turquoise" />
    </footer>
  )
}
