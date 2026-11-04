import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../components/Img'
import { Reveal, RevealItem } from '../components/Reveal'
import { pics } from '../data/images'
import { programs } from '../data/programs'
import { useLang } from '../i18n/lang'

const works = [pics.digitalViolet, pics.digitalYellow, pics.digitalPink]

/**
 * Scene 03 — Digital Art, fully open on the home page.
 * The students' illustrations sit on a drawing-app canvas; the layer strip below switches between them.
 * Then the year-long programme as one line with four stops.
 */
export function DigitalArt() {
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  const [{ pick, prev }, setState] = useState({ pick: 0, prev: 0 })
  const setPick = (i: number) => setState((s) => (s.pick === i ? s : { pick: i, prev: s.pick }))
  const p = programs['digital-art']
  const work = works[pick]

  return (
    <section id="digital" aria-labelledby="digital-title" className="relative bg-plum py-[clamp(6rem,12vw,11rem)] text-canvas">
      <div className="frame grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-12 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-7 lg:col-span-5">
          <RevealItem as="h2" className="text-[clamp(2.5rem,4.7vw,5rem)]">
            <span id="digital-title">{t.digital.title}</span>
          </RevealItem>
          <RevealItem as="p" className="text-lead max-w-[40ch]">
            {t.digital.lead}
          </RevealItem>
          <RevealItem as="ul" className="mt-2 grid gap-5">
            {t.digital.facts.map((f) => (
              <li key={f.v} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-t border-canvas/25 pt-4">
                <span className="font-display text-[2.25rem] italic leading-none text-turquoise">{f.k}</span>
                <span className="text-[1.0625rem]">{f.v}</span>
              </li>
            ))}
          </RevealItem>
          <RevealItem className="mt-2 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-6">
            <Link to="/programs/digital-art" className="btn btn-primary">
              {t.digital.cta}
              <span className="arrow" aria-hidden>
                →
              </span>
            </Link>
            <Link to="/enroll?program=digital-art" className="line-link self-start xs:self-auto">
              {t.digital.try}
            </Link>
          </RevealItem>
        </Reveal>

        {/* the drawing app, with the students' work on its canvas */}
        <div className="lg:col-span-7">
          <div className="border-[clamp(8px,1vw,14px)] border-ink bg-ink">
            <div data-ui aria-hidden className="flex items-center justify-between gap-4 px-3 pb-2.5 pt-1 text-[0.8125rem] text-canvas/85">
              <span className="flex gap-4 font-medium">
                <span>Gallery</span>
                <span className="hidden xs:inline">Actions</span>
                <span className="hidden sm:inline">Adjustments</span>
              </span>
              <span className="flex items-center gap-3">
                {/* brush, smudge, eraser, layers, colour */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-turquoise)" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 20c3 0 4-2 4-4l9-10 2 2-10 9c-2 0-3 1-3 3H4Z" />
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 3v9m-4 0h8l-1 9H9l-1-9Z" />
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="m4 15 9-9 6 6-7 7H7l-3-4Zm5-5 6 6" />
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="m12 4 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5" />
                </svg>
                <span className="h-[18px] w-[18px] rounded-full border-2 border-canvas bg-turquoise" />
              </span>
            </div>
            <figure className="relative aspect-[4/3] overflow-hidden bg-canvas">
              {/* the previous work stays underneath while the new one is wiped in over it */}
              <Img pic={works[prev]} sizes="(min-width:1024px) 55vw, 100vw" decorative className="absolute inset-0 h-full w-full object-cover" />
              <motion.div
                key={work.id}
                className="absolute inset-0"
                initial={reduce || pick === prev ? false : { clipPath: 'inset(0 0 0 100%)' }}
                animate={{ clipPath: 'inset(0 0 0 0%)' }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              >
                <Img pic={work} sizes="(min-width:1024px) 55vw, 100vw" className="h-full w-full object-cover" />
              </motion.div>
              <figcaption className="sr-only">{l(work.alt)}</figcaption>
            </figure>
          </div>

          <fieldset className="mt-4">
            <legend className="sr-only">{t.digital.pick}</legend>
            <div className="grid grid-cols-3 gap-3">
              {works.map((w, i) => (
                <label key={w.id} className="group relative cursor-pointer">
                  <input type="radio" name="digital-work" className="peer sr-only" checked={pick === i} onChange={() => setPick(i)} />
                  <span className="sr-only">{l(w.alt)}</span>
                  <Img
                    pic={w}
                    sizes="20vw"
                    decorative
                    className="aspect-[4/3] w-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-100 peer-checked:opacity-100"
                  />
                  <span aria-hidden className="absolute inset-0 border-2 border-transparent peer-checked:border-turquoise peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-turquoise" />
                </label>
              ))}
            </div>
          </fieldset>
          <p className="mt-3 text-[0.875rem] text-canvas/75">{t.digital.credit}</p>
        </div>
      </div>

      {/* a year of the course as one line with four stops */}
      <div className="frame mt-[clamp(5rem,9vw,8rem)] grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h3 className="text-title">{t.digital.modulesTitle}</h3>
          <Reveal as="ol" className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-0.5 bg-turquoise lg:block" />
            {p.modules!.map((m, i) => (
              <RevealItem as="li" key={m.title.ru} className="relative flex flex-col gap-3">
                <span aria-hidden className="h-4 w-4 rounded-full border-2 border-turquoise bg-plum" />
                <span className="text-[0.9375rem] font-semibold text-turquoise">{t.digital.month(i * 3 + 1, i * 3 + 3)}</span>
                <span className="font-display text-[1.5rem] leading-[1.1]">{l(m.title)}</span>
              </RevealItem>
            ))}
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-[1.5rem]">{t.digital.audienceTitle}</h3>
              <ul className="mt-4 grid gap-2 text-[1.0625rem]">
                {p.audience!.map((a) => (
                  <li key={a.ru} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-0.5 w-5 shrink-0 bg-turquoise" />
                    {l(a)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-[1.5rem]">{t.digital.whereLabel}</h3>
              <p className="mt-4 text-[1.0625rem]">{t.digital.where}</p>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-4">
          <Img pic={pics.tabletHands} sizes="(min-width:1024px) 30vw, 100vw" className="aspect-[4/5] w-full object-cover lg:h-full" />
        </div>
      </div>
    </section>
  )
}
