import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useId, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { pics, src } from '../data/images'
import { useLang } from '../i18n/lang'
import { scribble, useMedia, useSize } from '../lib/hooks'

/**
 * Scene 01 — First Stroke.
 * A dark, almost empty canvas. A pencil line enters on load; scrolling turns it into a turquoise brush
 * that paints a student's photograph into view. Sticky inside its own height — normal scrolling, no hijack.
 */
export function FirstStroke() {
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  const isDesktop = useMedia('(min-width: 768px)', true)
  const section = useRef<HTMLElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const { w, h } = useSize(box)
  const stageSize = useSize(stage)
  const maskId = useId().replace(/:/g, '')

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const paint = useTransform(scrollYProgress, [0, 0.82], [isDesktop ? 0.16 : 0.3, 1])
  // the brush is a short tip travelling just ahead of the paint
  const brushDash = useTransform(paint, (v) => -Math.min(v - 0.05, 0.94))
  const brushOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.12, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  const pic = pics.boyLion
  const sc = w > 0 ? scribble(w, h, isDesktop ? 5 : 3) : null

  // Pencil line: from the left edge, under the text, into the top-left corner of the picture box.
  // Measured after layout (not during render) and recomputed whenever either box changes size.
  const [pencil, setPencil] = useState<string | null>(null)
  useLayoutEffect(() => {
    const W = stageSize.w
    const H = stageSize.h
    const b = box.current
    const s = stage.current
    if (!W || !b || !s) return
    const br = b.getBoundingClientRect()
    const sr = s.getBoundingClientRect()
    const bx = br.left - sr.left
    const by = br.top - sr.top
    setPencil(
      isDesktop
        ? `M -20 ${H * 0.36} C ${W * 0.16} ${H * 0.28}, ${W * 0.3} ${H * 0.5}, ${bx - W * 0.06} ${by + 40} S ${bx + 10} ${by - 10}, ${bx + 30} ${by + 18}`
        : `M -10 ${by - 30} C ${W * 0.3} ${by - 70}, ${W * 0.55} ${by + 10}, ${bx + 30} ${by + 14}`,
    )
  }, [stageSize.w, stageSize.h, w, h, isDesktop])

  const sticky = !reduce

  return (
    <section
      ref={section}
      id="top"
      aria-labelledby="hero-title"
      className={`relative bg-ink ${sticky ? 'h-[165svh] md:h-[185svh]' : 'min-h-[100svh]'}`}
    >
      <div ref={stage} className={`${sticky ? 'sticky top-0' : 'relative'} h-[100svh] min-h-[560px] overflow-hidden`}>
        {/* pencil line, behind everything */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          {pencil && (
            <motion.path
              d={pencil}
              fill="none"
              stroke="var(--color-canvas)"
              strokeOpacity="0.55"
              strokeWidth={1.6}
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
            />
          )}
        </svg>

        <div className="frame relative flex h-full flex-col pt-[calc(var(--header-h)+3svh)] md:pt-[calc(var(--header-h)+5svh)]">
          <motion.h1
            id="hero-title"
            className="font-display text-[clamp(3.6rem,16.6vw,7rem)] font-semibold leading-[0.86] tracking-display md:text-[clamp(5rem,13.1vw,15rem)]"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            PICTORIA
            <span className="sr-only"> Art Studio</span>
          </motion.h1>

          <div className="mt-6 flex max-w-[34rem] flex-col gap-7 md:mt-auto md:mb-[8svh] md:max-w-[min(34rem,40vw)]">
            <motion.p
              className="text-lead leading-[1.45] text-canvas"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.hero.sub}
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 xs:flex-row xs:items-center xs:gap-7"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/#find" className="btn btn-primary">
                {t.hero.ctaPrimary}
                <span className="arrow" aria-hidden>
                  →
                </span>
              </Link>
              <Link to="/#gallery" className="line-link self-start xs:self-auto">
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* the picture painted by the brush */}
        <div
          ref={box}
          className="absolute bottom-[3svh] left-[var(--gutter)] right-[var(--gutter)] top-[calc(var(--header-h)+3svh+clamp(3.6rem,16.6vw,7rem)*0.86+300px)] md:left-auto md:top-[calc(var(--header-h)+5svh+clamp(5rem,13.1vw,15rem)*0.86+4svh)] md:bottom-[6svh] md:w-[46vw]"
        >
          {sc && (
            <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="absolute inset-0 overflow-visible">
              <title>{l(pic.alt)}</title>
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse" x={-w} y={-h} width={w * 3} height={h * 3}>
                  <motion.path
                    d={sc.d}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={sc.stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ pathLength: reduce ? 1 : paint }}
                  />
                </mask>
              </defs>
              <g mask={`url(#${maskId})`}>
                <motion.image
                  href={src(pic)}
                  x={0}
                  y={0}
                  width={w}
                  height={h}
                  preserveAspectRatio="xMidYMid slice"
                  style={{ scale: reduce ? 1 : photoScale, transformOrigin: `${w / 2}px ${h / 2}px` }}
                />
              </g>
              {!reduce && (
                <motion.path
                  className="brush-edge"
                  d={sc.d}
                  fill="none"
                  stroke="var(--color-turquoise)"
                  strokeWidth={Math.max(14, sc.stroke * 0.22)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray="0.07 1.2"
                  style={{ strokeDashoffset: brushDash, opacity: brushOpacity }}
                />
              )}
            </svg>
          )}
        </div>

        {!reduce && (
          <motion.p
            aria-hidden
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-6 left-[var(--gutter)] hidden text-[0.9375rem] text-canvas/80 md:block"
          >
            {t.hero.scroll}
          </motion.p>
        )}
      </div>
    </section>
  )
}
