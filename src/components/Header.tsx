import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang, type Lang } from '../i18n/lang'
import { Mark } from './Mark'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-8 w-8 shrink-0" />
      <span className="font-display text-[1.05rem] font-medium tracking-[0.02em]">PICTORIA</span>
    </span>
  )
}

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  const opts: Lang[] = ['ru', 'ro']
  return (
    <div role="group" aria-label={t.nav.lang} className={`flex ${className}`}>
      {opts.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => setLang(o)}
          aria-pressed={lang === o}
          lang={o}
          aria-label={o === 'ru' ? 'Русский' : 'Română'}
          className={`grid h-11 min-w-11 place-items-center px-2 text-[0.9375rem] font-semibold uppercase transition-colors ${
            lang === o ? 'text-turquoise' : 'opacity-80 hover:opacity-100'
          }`}
        >
          <span className="relative">
            {o}
            {lang === o && <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-0.5 bg-turquoise" />}
          </span>
        </button>
      ))}
    </div>
  )
}

const links = [
  { to: '/#explore', key: 'programs' },
  { to: '/#digital', key: 'digital' },
  { to: '/#gallery', key: 'gallery' },
  { to: '/#inside', key: 'studios' },
  { to: '/#find', key: 'find' },
] as const

export function Header() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()
  const menuBtn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close on route change (state adjusted during render, no effect needed)
  const routeKey = location.pathname + location.hash
  const [lastRoute, setLastRoute] = useState(routeKey)
  if (lastRoute !== routeKey) {
    setLastRoute(routeKey)
    setOpen(false)
  }

  // lock scroll, Esc to close, keep focus inside the panel
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panel.current?.querySelector<HTMLElement>('a,button')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
      if (e.key === 'Tab' && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>('a,button'))
        const a = f[0]
        const z = f[f.length - 1]
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault()
          z.focus()
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault()
          a.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-3 top-3 z-[60] bg-turquoise px-4 py-3 font-semibold text-ink">
        {t.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-canvas transition-colors duration-300 ${
          scrolled || open || location.pathname !== '/' ? 'bg-ink' : 'bg-transparent'
        }`}
      >
        <div className="frame flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link to="/" aria-label={t.nav.home} className="-m-2 p-2">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((l) => (
                <li key={l.key}>
                  <Link to={l.to} className="nav-link py-3 text-[1rem] font-medium">
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <LangSwitch className="hidden sm:flex" />
            <Link to="/enroll" className="btn btn-primary hidden !min-h-11 !px-5 !text-[0.9375rem] md:inline-flex">
              {t.nav.enroll}
            </Link>
            <button
              ref={menuBtn}
              type="button"
              className="grid h-11 w-11 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden>
                <motion.path
                  d="M2 4 C 9 2, 19 6, 26 4"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                  animate={open ? { d: 'M5 3 C 11 9, 17 11, 23 17' } : { d: 'M2 4 C 9 2, 19 6, 26 4' }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                />
                <motion.path
                  d="M2 16 C 9 18, 19 14, 26 16"
                  stroke="var(--color-turquoise)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                  animate={open ? { d: 'M5 17 C 11 11, 17 9, 23 3' } : { d: 'M2 16 C 9 18, 19 14, 26 16' }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 flex flex-col overflow-y-auto bg-ink text-canvas lg:hidden"
            initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Mobile" className="frame flex flex-1 flex-col pt-6">
              <ul className="flex flex-col">
                {[...links, { to: '/#contacts', key: 'contacts' as const }].map((l, i) => (
                  <motion.li
                    key={l.key}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-display text-[clamp(2rem,9vw,3rem)] font-medium tracking-display active:text-turquoise"
                    >
                      {t.nav[l.key]}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-4 pb-8 pt-10">
                <LangSwitch className="-ml-2" />
                <Link to="/enroll" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  {t.nav.enroll}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
