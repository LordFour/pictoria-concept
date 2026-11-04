import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Reveal, RevealItem } from '../components/Reveal'
import { contacts, mapLink, studios } from '../data/studios'
import { useLang } from '../i18n/lang'

/** Scene 07 — Your Turn. The last light canvas: the brush stroke becomes the button. */
export function YourTurn() {
  const { t, l } = useLang()
  const reduce = useReducedMotion()

  return (
    <section id="contacts" aria-labelledby="turn-title" className="paper relative overflow-hidden pb-[clamp(6rem,11vw,10rem)] pt-[clamp(6rem,13vw,13rem)]">
      <div className="frame">
        <Reveal>
          <RevealItem as="h2" className="font-display text-[clamp(2.25rem,10vw,9.25rem)] font-medium leading-[0.92] tracking-display md:text-[8.6vw]">
            <span id="turn-title">{t.turn.title}</span>
          </RevealItem>
        </Reveal>

        <div className="relative mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-center">
          <p className="text-lead max-w-[40ch] lg:col-span-5">{t.turn.lead}</p>

          {/* the stroke that carries the action */}
          <Link to="/enroll" className="btn btn-primary w-full md:hidden">
            {t.turn.cta}
            <span className="arrow" aria-hidden>
              →
            </span>
          </Link>
          <div className="relative hidden md:block lg:col-span-6 lg:col-start-7">
            <svg aria-hidden viewBox="0 0 700 160" preserveAspectRatio="none" className="absolute -inset-x-6 -inset-y-5 h-[calc(100%+2.5rem)] w-[calc(100%+3rem)] md:-inset-x-10">
              <motion.path
                className="brush-edge"
                d="M 20 92 C 140 60, 320 112, 470 78 S 650 70, 684 84"
                stroke="var(--color-turquoise)"
                strokeWidth="118"
                strokeLinecap="round"
                fill="none"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            <Link
              to="/enroll"
              className="group relative flex min-h-[5.5rem] items-center justify-between gap-6 px-2 font-display text-[clamp(1.25rem,2.2vw,1.875rem)] font-medium tracking-[-0.02em] text-ink"
            >
              <span>{t.turn.cta}</span>
              <span aria-hidden className="text-[1.5em] transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </div>

        <Reveal className="mt-[clamp(5rem,10vw,9rem)] grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <RevealItem className="lg:col-span-5">
            <h3 className="font-display text-[1.375rem] font-medium tracking-[-0.02em]">{t.turn.studios}</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {studios.map((s) => (
                <li key={s.id}>
                  <a href={mapLink(s.mapQuery)} target="_blank" rel="noreferrer" className="group inline-block">
                    <span className="block font-semibold group-hover:text-turquoise-deep">{l(s.district)}</span>
                    <span className="block text-[1.0625rem] underline decoration-ink/30 decoration-1 underline-offset-4 group-hover:decoration-turquoise-deep">
                      {l(s.address)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem className="lg:col-span-3 lg:col-start-7">
            <h3 className="font-display text-[1.375rem] font-medium tracking-[-0.02em]">{t.turn.call}</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {contacts.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="group inline-block">
                    <span className="block font-display text-[1.375rem] font-medium tracking-[-0.01em] group-hover:text-turquoise-deep">{p.number}</span>
                    <span className="block text-[0.9375rem]">{l(p.label)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem className="lg:col-span-3 lg:col-start-10">
            <h3 className="font-display text-[1.375rem] font-medium tracking-[-0.02em]">{t.turn.write}</h3>
            <a href={`mailto:${contacts.email}`} className="mt-5 inline-block break-all text-[1.0625rem] font-semibold underline decoration-2 underline-offset-4 hover:text-turquoise-deep">
              {contacts.email}
            </a>
            <h3 className="mt-10 font-display text-[1.375rem] font-medium tracking-[-0.02em]">{t.turn.follow}</h3>
            <ul className="mt-4 flex gap-5">
              <li>
                <a href={contacts.instagram} target="_blank" rel="noreferrer" className="line-link">
                  Instagram
                </a>
              </li>
              <li>
                <a href={contacts.facebook} target="_blank" rel="noreferrer" className="line-link">
                  Facebook
                </a>
              </li>
            </ul>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  )
}
