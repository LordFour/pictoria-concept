import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal, RevealItem } from '../components/Reveal'
import { pics } from '../data/images'
import { useLang } from '../i18n/lang'

const stages = [
  { pic: pics.girlPalette, span: 'lg:col-span-2', h: 'lg:h-[30svh]', mh: 'h-[56vw]' },
  { pic: pics.tableWatercolor, span: 'lg:col-span-3', h: 'lg:h-[40svh]', mh: 'h-[66vw]' },
  { pic: pics.boyEasel, span: 'lg:col-span-3', h: 'lg:h-[50svh]', mh: 'h-[78vw]' },
  { pic: pics.teenStarry, span: 'lg:col-span-4', h: 'lg:h-[62svh]', mh: 'h-[96vw]' },
]

/**
 * Scene 03 — The Creative Journey, on paper.
 * The branch from Pictoria's tree mark grows across four stages; tiles grow with it.
 */
export function CreativeJourney() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const row = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: row, offset: ['start 85%', 'end 60%'] })
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1])
  const dots = [0.12, 0.38, 0.64, 0.95]

  return (
    <section id="journey" aria-labelledby="journey-title" className="paper relative overflow-hidden py-[clamp(6rem,13vw,13rem)]">
      <div className="frame">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <RevealItem as="h2" className="text-display lg:col-span-7">
            <span id="journey-title">{t.journey.title}</span>
          </RevealItem>
          <RevealItem as="p" className="text-lead max-w-[38ch] lg:col-span-4 lg:col-start-9 lg:self-end">
            {t.journey.lead}
          </RevealItem>
        </Reveal>

        <div ref={row} className="relative mt-[clamp(4rem,8vw,8rem)]">
          {/* the branch: desktop climbs across the tops, phone runs down the left edge */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -top-[9svh] left-0 hidden h-[calc(62svh+9svh)] w-full overflow-visible lg:block"
          >
            <motion.path
              d="M 0 88 C 4 80, 6 70, 8 62 C 14 52, 22 50, 29 46 C 38 40, 46 36, 54 31 C 64 24, 74 14, 83 6 C 88 2, 94 -2, 100 -4"
              fill="none"
              stroke="var(--color-turquoise)"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : grow }}
            />
          </svg>
          <svg aria-hidden viewBox="0 0 10 100" preserveAspectRatio="none" className="pointer-events-none absolute -left-1 top-0 h-full w-4 lg:hidden">
            <motion.path
              d="M 5 0 C 2 20, 8 40, 5 60 S 3 85, 5 100"
              fill="none"
              stroke="var(--color-turquoise)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : grow }}
            />
          </svg>

          <ol className="relative grid gap-12 pl-6 lg:grid-cols-12 lg:items-end lg:gap-x-3 lg:gap-y-0 lg:pl-0">
            {stages.map((s, i) => {
              const step = t.journey.steps[i]
              return (
                <Reveal as="li" key={step.title} className={`flex flex-col ${s.span}`} amount={0.2}>
                  <RevealItem className={`relative overflow-hidden bg-canvas-2 ${s.mh} ${s.h}`}>
                    <Img
                      pic={s.pic}
                      sizes="(min-width:1024px) 33vw, 92vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                    />
                    <motion.span
                      aria-hidden
                      className="absolute left-3 top-3 h-4 w-4 rounded-full bg-turquoise"
                      initial={reduce ? false : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ delay: dots[i] * 0.6, type: 'spring', stiffness: 260, damping: 16 }}
                    />
                  </RevealItem>
                  <RevealItem className="pt-5 lg:min-h-[10.5rem]">
                    <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em]">{step.title}</h3>
                    <p className="mt-2 max-w-[34ch] text-[1.0625rem] leading-[1.5]">{step.text}</p>
                  </RevealItem>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
