import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { useLang } from '../i18n/lang'

const BASE = import.meta.env.BASE_URL
const art = (side: 'canvas' | 'digital', w: 1200 | 2400) => `${BASE}art/irises-${side}-${w}.webp`
const set = (side: 'canvas' | 'digital') => `${art(side, 1200)} 1200w, ${art(side, 2400)} 2400w`

/** Seam position (in % of the artwork width) the scene settles on, and how far scrolling pushes it. */
const REST = 50
const SCROLL_PUSH = 34

/**
 * Scene 01 — From Canvas to Digital.
 * One artwork, two states. On the left the oil painting with its real paint relief; on the right the same
 * picture redrawn as a flat digital illustration. A single line crosses the seam: a rough brush stroke on
 * the canvas, a clean vector curve with anchors on the digital side. The seam can be dragged (or moved with
 * the arrow keys); scrolling pushes it further towards the digital side until the visitor takes over.
 */
export function CanvasToDigital() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const band = useRef<HTMLDivElement>(null)
  const free = useRef(false)
  const intro = useRef(!reduce)

  const seam = useMotionValue(reduce ? REST : 100)
  const clip = useMotionTemplate`inset(0 0 0 ${seam}%)`
  const seamLeft = useMotionTemplate`${seam}%`
  const [value, setValue] = useState(reduce ? REST : 100)
  useMotionValueEvent(seam, 'change', (v) => setValue((prev) => (Math.round(v) === prev ? prev : Math.round(v))))

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (free.current || intro.current || reduce) return
    seam.set(REST - Math.min(p * 1.6, 1) * SCROLL_PUSH)
  })

  // Opening: the painting is shown whole, then the digital layer sweeps in from the right.
  useEffect(() => {
    if (reduce) return
    const c = animate(seam, REST, { duration: 1.8, delay: 0.7, ease: [0.65, 0, 0.35, 1] })
    c.then(() => {
      intro.current = false
    })
    return () => c.stop()
  }, [reduce, seam])

  const take = () => {
    free.current = true
    intro.current = false
    seam.stop()
  }
  const moveTo = (clientX: number) => {
    const r = band.current?.getBoundingClientRect()
    if (!r) return
    seam.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    take()
    e.currentTarget.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) moveTo(e.clientX)
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2
    const map: Record<string, number> = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step, PageDown: -10, PageUp: 10 }
    let next: number | null = null
    if (e.key in map) next = seam.get() + map[e.key]
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = 100
    if (next === null) return
    e.preventDefault()
    take()
    seam.set(Math.min(100, Math.max(0, next)))
  }

  const enter = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const } }

  return (
    <section ref={section} id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col bg-ink pt-[var(--header-h)]">
      <div className="frame grid gap-x-10 gap-y-6 pt-[clamp(1.5rem,5svh,3.5rem)] pb-[clamp(1.75rem,4.5svh,3rem)] lg:grid-cols-12 lg:items-end">
        <motion.h1
          id="hero-title"
          className="text-[clamp(2.6rem,10.4vw,3.6rem)] leading-[1] sm:text-[clamp(3rem,6.2vw,6.5rem)] lg:col-span-12"
          {...enter(0)}
        >
          <span className="block">{t.hero.titleA}</span>
          <span className="block italic text-turquoise">{t.hero.titleB}</span>
        </motion.h1>
        <motion.p className="text-lead max-w-[46ch] text-canvas lg:col-span-6" {...enter(0.15)}>
          {t.hero.sub}
        </motion.p>
        <motion.div
          className="flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4 lg:col-span-6 lg:justify-end"
          {...enter(0.3)}
        >
          <a href="#explore" className="btn btn-primary">
            {t.hero.ctaPrimary}
            <span className="arrow" aria-hidden>
              →
            </span>
          </a>
          <a href="#digital" className="btn btn-ghost">
            {t.hero.ctaDigital}
          </a>
        </motion.div>
      </div>

      {/* the artwork: one picture, two states */}
      <figure className="relative flex flex-1 flex-col">
        <div
          ref={band}
          className="relative isolate aspect-square w-full flex-1 select-none overflow-hidden bg-plum sm:aspect-auto sm:min-h-[min(46svh,520px)]"
        >
          {/* 1 · canvas: the oil painting with a brush stroke laid on it */}
          <img
            src={art('canvas', 1200)}
            srcSet={set('canvas')}
            sizes="100vw"
            width={2400}
            height={1000}
            alt=""
            fetchPriority="high"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
          />
          <svg viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full">
            <motion.path
              className="brush-edge"
              d={LINE}
              fill="none"
              stroke="var(--color-turquoise)"
              strokeWidth={22}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>

          {/* 2 · digital: the same picture as a flat illustration, with the same line as a vector path */}
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <img
              src={art('digital', 1200)}
              srcSet={set('digital')}
              sizes="100vw"
              width={2400}
              height={1000}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
            />
            <svg viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full">
              <path d={LINE} fill="none" stroke="var(--color-canvas)" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
              <path d="M 460 290 L 620 200 L 780 110" fill="none" stroke="var(--color-canvas)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            </svg>
            {/* anchor and its two handles, in HTML so they stay square at any aspect ratio */}
            <span aria-hidden className="absolute left-[62%] top-[50%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-canvas" />
            <span aria-hidden className="absolute left-[46%] top-[72.5%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas" />
            <span aria-hidden className="absolute left-[78%] top-[27.5%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas" />

            {/* a fragment of the drawing app: layers and brush */}
            <div data-ui aria-hidden className="absolute right-[var(--gutter)] top-4 hidden w-[13.5rem] bg-ink/90 p-3 text-[0.8125rem] text-canvas sm:block">
              <div className="flex items-center justify-between pb-2 font-semibold">
                <span>{t.hero.layers}</span>
                <span className="text-turquoise">+</span>
              </div>
              {[
                { n: t.hero.layerLine, c: 'var(--color-canvas)', on: true },
                { n: t.hero.layerColor, c: 'var(--color-turquoise)', on: false },
                { n: t.hero.layerSketch, c: 'var(--color-plum)', on: false },
              ].map((layer) => (
                <div key={layer.n} className={`mt-1 flex items-center gap-2.5 px-2 py-1.5 ${layer.on ? 'bg-turquoise text-ink' : 'bg-plum'}`}>
                  <span className="h-6 w-8 shrink-0 border border-canvas/40" style={{ background: layer.c }} />
                  <span className="flex-1 font-medium">{layer.n}</span>
                  <span>✓</span>
                </div>
              ))}
              <div className="mt-3 flex items-center gap-2">
                <span className="font-medium">{t.hero.brush}</span>
                <span className="relative h-1 flex-1 bg-plum">
                  <span className="absolute inset-y-0 left-0 w-[38%] bg-turquoise" />
                  <span className="absolute left-[38%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas" />
                </span>
                <span className="tabular-nums">2 px</span>
              </div>
            </div>
          </motion.div>

          {/* labels for the two states */}
          <span className="absolute bottom-3 left-[var(--gutter)] z-10 bg-ink px-3 py-1.5 text-[0.875rem] font-semibold text-canvas">
            {t.hero.canvas} <span className="font-normal text-canvas/80">· {t.hero.canvasNote}</span>
          </span>
          <span className="absolute bottom-3 right-[var(--gutter)] z-10 bg-ink px-3 py-1.5 text-[0.875rem] font-semibold text-canvas">
            {t.hero.digital} <span className="font-normal text-canvas/80">· {t.hero.digitalNote}</span>
          </span>

          {/* the seam: drag it, or use the arrow keys */}
          <motion.div className="absolute inset-y-0 z-20 w-0" style={{ left: seamLeft }}>
            <span aria-hidden className="absolute inset-y-0 -left-px w-0.5 bg-canvas" />
            <div
              role="slider"
              tabIndex={0}
              aria-label={t.hero.seam}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-valuetext={t.hero.seamValue(100 - value)}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onKeyDown={onKey}
              className="absolute left-0 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full bg-canvas text-ink"
            >
              <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 1 1 7l6 6M19 1l6 6-6 6" />
              </svg>
            </div>
          </motion.div>
        </div>
        <figcaption className="frame py-3 text-[0.875rem] leading-[1.45] text-canvas/75">{t.hero.caption}</figcaption>
      </figure>
    </section>
  )
}

/** One S-curve crossing the whole artwork; it is a brush stroke on the canvas and a vector path on the digital side. */
const LINE = 'M -20 260 C 180 380, 460 290, 620 200 S 880 40, 1020 90'
