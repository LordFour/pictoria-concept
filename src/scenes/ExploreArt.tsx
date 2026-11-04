import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../components/Img'
import { Reveal, RevealItem } from '../components/Reveal'
import { pics } from '../data/images'
import { programList, type Program } from '../data/programs'
import { useLang } from '../i18n/lang'
import { useMedia } from '../lib/hooks'

/** Scene 02 — the line from the hero splits into three colours, each leading into its own world. */
export function ExploreArt() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const isDesktop = useMedia('(min-width: 1024px)', true)
  const [active, setActive] = useState(0)
  const lines = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lines, offset: ['start 90%', 'end 55%'] })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Split paths in a 1200×220 box: one trunk from the top centre, three branches to the panel centres.
  const trunk = 'M 600 0 C 600 40, 600 60, 600 80'
  const branches = [
    { d: 'M 600 80 C 600 150, 200 120, 200 220', c: 'var(--color-coral)' },
    { d: 'M 600 80 C 610 140, 590 170, 600 220', c: 'var(--color-turquoise)' },
    { d: 'M 600 80 C 600 150, 1000 120, 1000 220', c: 'var(--color-ochre)' },
  ]

  return (
    <section id="explore" aria-labelledby="explore-title" className="relative scroll-mt-0 bg-ink pt-[clamp(6rem,14vw,12rem)]">
      <Reveal className="frame grid gap-6 md:grid-cols-12 md:items-end">
        <RevealItem as="h2" className="text-display md:col-span-9">
          <span id="explore-title">{t.explore.title}</span>
        </RevealItem>
        <RevealItem as="p" className="text-lead max-w-[36ch] md:col-span-3 md:col-start-10">
          {t.explore.lead}
        </RevealItem>
      </Reveal>

      <div ref={lines} aria-hidden className="frame mt-10 md:mt-14">
        <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className="block h-[110px] w-full md:h-[200px]">
          <motion.path
            d={trunk}
            stroke="var(--color-turquoise)"
            strokeWidth="3"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduce ? 1 : draw }}
          />
          {branches.map((b, i) => (
            <motion.path
              key={i}
              d={b.d}
              stroke={b.c}
              strokeWidth={6}
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : draw }}
            />
          ))}
        </svg>
      </div>

      <div className="frame pb-[var(--gutter)]">
        <ul
          className="flex flex-col gap-3 lg:h-[min(86svh,860px)] lg:flex-row lg:gap-2"
          onMouseLeave={() => undefined}
        >
          {programList.map((p, i) => (
            <Panel
              key={p.id}
              program={p}
              index={i}
              active={!isDesktop || active === i}
              onActivate={() => setActive(i)}
              desktop={isDesktop}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

const tone = {
  coral: 'bg-coral text-ink',
  plum: 'bg-plum text-canvas',
  ochre: 'bg-ochre text-ink',
} as const

function Panel({
  program: p,
  active,
  onActivate,
  desktop,
}: {
  program: Program
  index: number
  active: boolean
  onActivate: () => void
  desktop: boolean
}) {
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  const grow = desktop ? (active ? 2.5 : 1) : 1

  return (
    <li
      className={`group relative isolate flex min-h-[88svh] flex-col overflow-hidden lg:min-h-0 ${tone[p.color]}`}
      style={{ flexGrow: grow, flexBasis: 0, transition: reduce ? undefined : 'flex-grow 700ms cubic-bezier(.22,1,.36,1)' }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <PanelArt program={p} active={active} />

      <div className="relative z-10 mt-auto flex flex-col gap-4 p-[clamp(1.25rem,2.4vw,2.5rem)]">
        <h3 className={`font-display font-semibold leading-[0.95] tracking-display ${desktop && !active ? 'text-[clamp(1.6rem,2.2vw,2.2rem)]' : 'text-title'}`}>
          <Link
            to={`/programs/${p.id}`}
            className="outline-none after:absolute after:inset-0 after:z-20 after:content-[''] focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:-outline-offset-[6px] focus-visible:after:outline-current"
          >
            {l(p.name)}
          </Link>
        </h3>
        <p className="text-[1.0625rem] font-medium">{l(p.short)}</p>

        <div
          className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
          style={{ gridTemplateRows: active ? '1fr' : '0fr', opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          aria-hidden={desktop && !active ? true : undefined}
        >
          <div className="min-h-0 overflow-hidden">
            <p className="max-w-[44ch] pt-1 text-[1.0625rem] leading-[1.5]">{l(p.lead)}</p>
            {p.techniques && (
              <p className="mt-4 max-w-[48ch] text-[1rem] font-semibold">
                {p.techniques.map((x) => l(x)).join(' · ')}
              </p>
            )}
            {p.modules && (
              <ol className="mt-4 grid gap-1 text-[1rem]">
                {p.modules.map((m) => (
                  <li key={m.title.ru} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] h-0.5 w-5 shrink-0 bg-turquoise" />
                    {l(m.title)}
                  </li>
                ))}
              </ol>
            )}
            <span className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 font-semibold">
              {p.status === 'demo' ? <span className="demo-tag">{t.explore.soon}</span> : null}
              <span className="inline-flex items-center gap-2 underline decoration-2 underline-offset-[6px] group-hover:decoration-[3px]">
                {t.explore.open}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}

/** Each discipline speaks its own visual language. */
function PanelArt({ program: p, active }: { program: Program; active: boolean }) {
  const reduce = useReducedMotion()
  const lift = reduce ? {} : { scale: active ? 1 : 1.06 }

  if (p.color === 'coral') {
    // Painting: a canvas print laid over ink brush strokes
    return (
      <div aria-hidden className="relative h-[46svh] lg:absolute lg:inset-x-0 lg:top-0 lg:h-[62%]">
        <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <g className="brush-edge" fill="none" strokeLinecap="round">
            <path d="M -20 120 C 120 60, 260 190, 420 110 S 600 60, 640 90" stroke="var(--color-ink)" strokeWidth="46" opacity="0.9" />
            <path d="M -20 300 C 140 250, 300 350, 640 260" stroke="var(--color-ochre)" strokeWidth="30" />
          </g>
        </svg>
        <motion.div
          className="absolute left-1/2 top-[8%] w-[min(62%,300px)] -translate-x-1/2 rotate-[-4deg] bg-canvas p-2.5 lg:left-[clamp(1.25rem,2.4vw,2.5rem)] lg:translate-x-0"
          animate={lift}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Img pic={pics.girlFlowers} sizes="300px" className="aspect-[4/5] w-full object-cover" decorative />
        </motion.div>
      </div>
    )
  }

  if (p.color === 'plum') {
    // Digital: a Procreate-like layer with turquoise selection handles over a photo of the tablet
    return (
      <div aria-hidden className="relative h-[46svh] lg:absolute lg:inset-x-0 lg:top-0 lg:h-[62%]">
        <Img pic={pics.tabletHands} sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity" decorative />
        <motion.div
          data-ui
          className="absolute right-[8%] top-[12%] w-[min(56%,320px)]"
          animate={reduce ? {} : { y: active ? 0 : 12, rotate: active ? 0 : 2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Img pic={pics.digitalYellow} sizes="320px" className="aspect-[4/3] w-full object-cover" decorative />
          <span className="absolute -inset-2 outline-2 outline-dashed outline-turquoise" />
          {['-left-3.5 -top-3.5', '-right-3.5 -top-3.5', '-left-3.5 -bottom-3.5', '-right-3.5 -bottom-3.5'].map((pos) => (
            <span key={pos} className={`absolute h-3 w-3 bg-turquoise ${pos}`} />
          ))}
        </motion.div>
        <div data-ui className="absolute bottom-3 left-[clamp(1.25rem,2.4vw,2.5rem)] flex gap-1.5">
          {['var(--color-turquoise)', 'var(--color-coral)', 'var(--color-ochre)', 'var(--color-canvas)'].map((c) => (
            <span key={c} className="h-7 w-7 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </div>
    )
  }

  // Workshops: torn-paper cut-out over the ochre field
  return (
    <div aria-hidden className="relative h-[46svh] lg:absolute lg:inset-x-0 lg:top-0 lg:h-[62%]">
      <motion.div
        className="absolute inset-x-[6%] top-[8%] bottom-0"
        style={{ clipPath: 'polygon(2% 6%, 18% 0%, 41% 5%, 63% 1%, 88% 6%, 100% 2%, 97% 38%, 100% 71%, 95% 100%, 64% 96%, 37% 100%, 9% 95%, 0% 70%, 3% 35%)' }}
        animate={reduce ? {} : { rotate: active ? -1.5 : 0 }}
        transition={{ duration: 0.7 }}
      >
        <Img pic={pics.tableClay} sizes="(min-width:1024px) 40vw, 100vw" className="h-full w-full object-cover" decorative />
      </motion.div>
      <svg viewBox="0 0 100 100" className="absolute -bottom-6 right-[10%] h-24 w-24" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="var(--color-coral)" />
      </svg>
    </div>
  )
}
