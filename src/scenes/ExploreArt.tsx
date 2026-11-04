import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Img } from '../components/Img'
import { Reveal, RevealItem } from '../components/Reveal'
import { pics } from '../data/images'
import { programs } from '../data/programs'
import { useLang } from '../i18n/lang'

/**
 * Scene 02 — Two worlds of one studio.
 * Traditional and digital art side by side at equal weight: paper on the left, the brand turquoise on the right.
 * Who the classes are for is answered separately underneath, so age never stands in for a discipline.
 */
export function ExploreArt() {
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  const trad = programs['drawing-painting']

  return (
    <section id="explore" aria-labelledby="explore-title" className="relative bg-ink pt-[clamp(6rem,12vw,11rem)]">
      <Reveal className="frame grid gap-6 lg:grid-cols-12 lg:items-end">
        <RevealItem as="h2" className="text-display lg:col-span-7">
          <span id="explore-title">{t.explore.title}</span>
        </RevealItem>
        <RevealItem as="p" className="text-lead max-w-[40ch] lg:col-span-4 lg:col-start-9">
          {t.explore.lead}
        </RevealItem>
      </Reveal>

      <div className="mt-[clamp(3rem,6vw,5rem)] grid lg:grid-cols-2">
        {/* traditional */}
        <article className="paper group relative flex flex-col gap-10 p-[var(--gutter)] pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(2.5rem,5vw,4rem)] lg:min-h-[92svh]">
          <div className="grid grid-cols-[1fr_auto] items-start gap-6">
            <div>
              <p className="text-[1rem] font-semibold text-turquoise-deep">{t.explore.trad.kicker}</p>
              <h3 className="mt-3 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1]">
                <Link to={`/programs/${trad.id}`} className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:-outline-offset-[6px] focus-visible:after:outline-ink">
                  {t.explore.trad.name}
                </Link>
              </h3>
            </div>
          </div>
          <figure className="relative mx-auto w-[min(78%,420px)] lg:mx-0 lg:ml-[18%]">
            <div className="relative bg-canvas-2 p-[clamp(10px,1.4vw,18px)]">
              <Img pic={pics.artJellyfish} sizes="(min-width:1024px) 26vw, 78vw" className="aspect-[388/616] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              {/* a sheet of paper lifts off the work as it comes into view */}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="paper absolute inset-0 origin-right"
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                />
              )}
            </div>
            <figcaption className="mt-3 text-[0.875rem] text-ink/75">{t.explore.trad.caption}</figcaption>
          </figure>
          <div className="mt-auto grid gap-4">
            <p className="max-w-[44ch] text-[1.0625rem] leading-[1.5]">{t.explore.trad.text}</p>
            <p className="max-w-[52ch] text-[0.9375rem] font-semibold">{trad.techniques!.map((x) => l(x)).join(' · ')}</p>
            <span className="inline-flex items-center gap-2 font-semibold underline decoration-2 underline-offset-[6px] group-hover:decoration-[3px]">
              {t.explore.open}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </article>

        {/* digital */}
        <article className="on-turquoise group relative flex flex-col gap-10 bg-turquoise p-[var(--gutter)] pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(2.5rem,5vw,4rem)] text-ink lg:min-h-[92svh]">
          <div>
            <p className="text-[1rem] font-semibold">{t.explore.dig.kicker}</p>
            <h3 className="mt-3 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1]">
              <a href="#digital" className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:-outline-offset-[6px] focus-visible:after:outline-ink">
                {t.explore.dig.name}
              </a>
            </h3>
          </div>
          <figure className="relative mx-auto w-[min(88%,560px)] lg:mx-0 lg:ml-[8%]">
            <motion.div
              className="relative"
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Img pic={pics.digitalYellow} sizes="(min-width:1024px) 34vw, 88vw" className="aspect-[4/3] w-full object-cover" />
              {/* a transform box, as in the drawing app */}
              <span aria-hidden data-ui className="absolute -inset-2.5 border-2 border-dashed border-ink" />
              {['-left-4 -top-4', '-right-4 -top-4', '-left-4 -bottom-4', '-right-4 -bottom-4'].map((pos) => (
                <span key={pos} aria-hidden data-ui className={`absolute h-3.5 w-3.5 border-2 border-ink bg-canvas ${pos}`} />
              ))}
            </motion.div>
            <figcaption className="mt-5 text-[0.875rem] text-ink/80">{t.explore.dig.caption}</figcaption>
          </figure>
          <div className="mt-auto grid gap-4">
            <p className="max-w-[44ch] text-[1.0625rem] leading-[1.5]">{t.explore.dig.text}</p>
            <p className="max-w-[52ch] text-[0.9375rem] font-semibold">Procreate · iPad · Apple Pencil</p>
            <span className="inline-flex items-center gap-2 font-semibold underline decoration-2 underline-offset-[6px] group-hover:decoration-[3px]">
              {t.explore.more}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </span>
          </div>
        </article>
      </div>

      {/* for whom: a separate question from what to learn */}
      <div className="frame grid gap-10 py-[clamp(4rem,7vw,6rem)] lg:grid-cols-12">
        <h3 className="text-title lg:col-span-3">{t.explore.whoTitle}</h3>
        <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-9">
          {t.explore.who.map((w) => (
            <li key={w.k} className="border-t-2 border-turquoise pt-4">
              <span className="block font-display text-[1.75rem] leading-[1.1]">{w.k}</span>
              <span className="mt-2 block text-[1.0625rem] text-canvas/90">{w.v}</span>
            </li>
          ))}
          <li className="border-t border-canvas/30 pt-4 sm:col-span-3">
            <Link to="/programs/workshops" className="group inline-flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="font-display text-[1.5rem] underline decoration-1 underline-offset-[6px] group-hover:decoration-2">{t.explore.workshops}</span>
              <span className="text-[1.0625rem] text-canvas/90">{t.explore.workshopsText}</span>
              <span className="demo-tag">{t.explore.soon}</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
