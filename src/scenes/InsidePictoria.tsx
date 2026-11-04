import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal, RevealItem } from '../components/Reveal'
import { pics } from '../data/images'
import { mapLink, studios } from '../data/studios'
import { useLang } from '../i18n/lang'
import { useMedia } from '../lib/hooks'

/**
 * Scene 05 — Inside Pictoria.
 * Three picture frames hang on a dark wall; the middle one grows until its frame becomes a window onto the studio.
 */
export function InsidePictoria() {
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  const isDesktop = useMedia('(min-width: 768px)', true)
  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] })

  // frame rect, in % of the stage, from "picture on the wall" to "window"
  const from = isDesktop ? { t: 20, r: 37, b: 18, l: 37 } : { t: 22, r: 20, b: 26, l: 20 }
  const range = [0.08, 0.72]
  const top = useTransform(scrollYProgress, range, [from.t, 0])
  const right = useTransform(scrollYProgress, range, [from.r, 0])
  const bottom = useTransform(scrollYProgress, range, [from.b, 0])
  const left = useTransform(scrollYProgress, range, [from.l, 0])
  const clip = useMotionTemplate`inset(${top}% ${right}% ${bottom}% ${left}%)`
  const frameOpacity = useTransform(scrollYProgress, [0.55, 0.75], [1, 0])
  const sideX = useTransform(scrollYProgress, [0.08, 0.6], [0, 1])
  const leftX = useTransform(sideX, (v) => `${-v * 40}vw`)
  const rightX = useTransform(sideX, (v) => `${v * 40}vw`)
  const sideOpacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.25, 1])
  const captionOpacity = useTransform(scrollYProgress, [0.72, 0.85], [0, 1])
  const fTop = useMotionTemplate`${top}%`
  const fRight = useMotionTemplate`${right}%`
  const fBottom = useMotionTemplate`${bottom}%`
  const fLeft = useMotionTemplate`${left}%`

  return (
    <section id="inside" aria-labelledby="inside-title" className="relative bg-ink text-canvas">
      <Reveal className="frame grid gap-6 pt-[clamp(6rem,13vw,12rem)] lg:grid-cols-12">
        <RevealItem as="h2" className="text-display lg:col-span-7">
          <span id="inside-title">{t.inside.title}</span>
        </RevealItem>
        <RevealItem as="p" className="text-lead max-w-[40ch] lg:col-span-4 lg:col-start-9 lg:self-end">
          {t.inside.lead}
        </RevealItem>
      </Reveal>

      {reduce ? (
        <div className="frame mt-12 grid gap-3 md:grid-cols-3">
          {[pics.kidsEasels, pics.studioEasels, pics.girlEaselRoom].map((p) => (
            <Img key={p.id} pic={p} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[3/4] w-full object-cover" />
          ))}
        </div>
      ) : (
        <div ref={stage} className="relative h-[200svh] md:h-[230svh]">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            {/* side frames */}
            <motion.div
              aria-hidden
              style={{ x: leftX, opacity: sideOpacity }}
              className="absolute left-[6%] top-[30%] hidden w-[17%] bg-ink outline outline-[12px] outline-coral md:block"
            >
              <Img pic={pics.kidsEasels} sizes="20vw" loading="eager" className="aspect-[3/4] w-full object-cover" decorative />
            </motion.div>
            <motion.div
              aria-hidden
              style={{ x: rightX, opacity: sideOpacity }}
              className="absolute right-[6%] top-[26%] hidden w-[17%] outline outline-[12px] outline-ochre md:block"
            >
              <Img pic={pics.girlEaselRoom} sizes="20vw" loading="eager" className="aspect-[3/4] w-full object-cover" decorative />
            </motion.div>

            {/* the window */}
            <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
              <motion.div className="h-full w-full" style={{ scale: photoScale }}>
                <Img pic={pics.studioEasels} sizes="100vw" className="h-full w-full object-cover" />
              </motion.div>
            </motion.div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute outline outline-[clamp(10px,1.4vw,18px)] outline-turquoise"
              style={{ top: fTop, right: fRight, bottom: fBottom, left: fLeft, opacity: frameOpacity }}
            />
            <motion.p
              style={{ opacity: captionOpacity }}
              className="absolute bottom-0 left-0 right-0 bg-ink/75 px-[var(--gutter)] py-4 text-[1rem]"
            >
              {l(pics.studioEasels.alt)}
            </motion.p>
          </div>
        </div>
      )}

      {/* what a visit is like */}
      <div className="frame grid gap-14 py-[clamp(5rem,10vw,10rem)] lg:grid-cols-12">
        <Reveal as="ul" className="grid gap-10 sm:grid-cols-3 lg:col-span-12">
          {t.inside.facts.map((f) => (
            <RevealItem as="li" key={f.v} className="flex flex-col gap-2">
              <span className="font-display text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-display text-turquoise">{f.k}</span>
              <span className="text-lead">{f.v}</span>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
          {t.inside.notes.map((n) => (
            <RevealItem key={n.title} className="sm:col-span-2 lg:col-span-2">
              <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em]">{n.title}</h3>
              <p className="mt-2 max-w-[38ch] text-[1.0625rem]">{n.text}</p>
            </RevealItem>
          ))}
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <h3 className="font-display text-title font-semibold">{t.inside.studiosTitle}</h3>
          <Reveal as="ul" className="mt-8 flex flex-col gap-2">
            {studios.map((s) => (
              <RevealItem as="li" key={s.id}>
                <a
                  href={mapLink(s.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 bg-plum px-5 py-5 transition-colors hover:bg-plum-2 md:grid-cols-[minmax(10rem,14rem)_1fr_auto] md:px-6"
                >
                  <span className="font-display text-[1.375rem] font-semibold tracking-[-0.02em]">{l(s.district)}</span>
                  <span className="order-3 col-span-2 text-[1.0625rem] md:order-none md:col-span-1">
                    {l(s.address)}
                    {s.digital && <span className="ml-3 inline-block whitespace-nowrap font-semibold text-turquoise">· {t.inside.digitalHere}</span>}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
                    {t.inside.route}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </a>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
