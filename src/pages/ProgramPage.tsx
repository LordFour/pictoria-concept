import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Img } from '../components/Img'
import { Reveal, RevealItem } from '../components/Reveal'
import { programList, programs, type ProgramId } from '../data/programs'
import { mapLink, studios } from '../data/studios'
import { useLang } from '../i18n/lang'
import { usePageTitle } from '../lib/usePageTitle'

const heroTone = {
  coral: 'bg-coral text-ink',
  plum: 'bg-plum text-canvas',
  ochre: 'bg-ochre text-ink',
} as const

export function ProgramPage() {
  const { id } = useParams<{ id: ProgramId }>()
  const p = id ? programs[id] : undefined
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  usePageTitle(p ? l(p.name) : undefined)

  const hero = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  // mobile sticky CTA appears once the hero CTA has scrolled away
  const heroCta = useRef<HTMLAnchorElement>(null)
  const [showBar, setShowBar] = useState(false)
  useEffect(() => {
    const el = heroCta.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [id])

  if (!p) return <Navigate to="/404" replace />

  const enrollHref = `/enroll?program=${p.id}`
  const where = p.id === 'digital-art' ? studios.filter((s) => s.digital) : studios
  const dark = p.color === 'plum'

  return (
    <>
      <main id="main">
        {/* HERO */}
        <section ref={hero} aria-labelledby="program-title" className={`relative overflow-hidden ${heroTone[p.color]}`}>
          <div className="frame grid min-h-[100svh] gap-10 pb-12 pt-[calc(var(--header-h)+2rem)] lg:grid-cols-12 lg:items-end lg:pb-[8svh]">
            <div className="flex flex-col lg:col-span-6 lg:self-stretch">
              <Link to="/#explore" className="line-link self-start text-[0.9375rem]">
                ← {t.program.back}
              </Link>
              <div className="mt-auto pt-10">
                <motion.h1
                  id="program-title"
                  className="font-display text-[clamp(2.5rem,6.2vw,6.25rem)] font-semibold leading-[0.92] tracking-display"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l(p.name)}
                </motion.h1>
                <p className="text-lead mt-6 max-w-[38ch]">{l(p.lead)}</p>
                {p.status === 'demo' && <p className="demo-tag mt-6">{t.program.demoNote}</p>}
                <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center xs:gap-7">
                  <Link ref={heroCta} to={enrollHref} className={`btn ${dark ? 'btn-primary' : 'btn-ink'}`}>
                    {t.program.cta}
                    <span className="arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative h-[52svh] lg:col-span-6 lg:h-[78svh]">
              <motion.div className="absolute inset-0 overflow-hidden" style={{ y: reduce ? 0 : photoY }}>
                <Img pic={p.hero} priority sizes="(min-width:1024px) 50vw, 100vw" className="h-full w-full object-cover" />
              </motion.div>
              <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute -bottom-4 -left-6 h-10 w-[70%]">
                <motion.path
                  className="brush-edge"
                  d="M 4 22 C 90 8, 200 34, 396 16"
                  stroke="var(--color-turquoise)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </div>
          </div>
        </section>

        {/* FACTS */}
        <section aria-labelledby="facts-title" className="bg-ink py-[clamp(4rem,8vw,7rem)] text-canvas">
          <div className="frame">
            <h2 id="facts-title" className="sr-only">
              {t.program.facts}
            </h2>
            <Reveal as="ul" className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {p.facts.map((f) => (
                <RevealItem as="li" key={f.k.ru} className="flex flex-col gap-2">
                  <span className="text-[1rem]">{l(f.k)}</span>
                  <span className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-turquoise">{l(f.v)}</span>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>

        {/* MODULES (Digital Art) */}
        {p.modules && (
          <section aria-labelledby="modules-title" className="bg-plum py-[clamp(5rem,10vw,9rem)] text-canvas">
            <div className="frame">
              <h2 id="modules-title" className="text-display">
                {t.program.modules}
              </h2>
              <Reveal as="ol" className="mt-14 grid gap-0 md:grid-cols-4">
                {p.modules.map((m, i) => (
                  <RevealItem as="li" key={m.title.ru} className="relative pb-10 pl-8 md:pb-0 md:pl-0 md:pr-6 md:pt-12">
                    <span aria-hidden className="absolute bottom-0 left-2 top-0 w-1 bg-turquoise md:bottom-auto md:left-0 md:right-1 md:top-3 md:h-1 md:w-auto" style={{ opacity: 0.4 + i * 0.2 }} />
                    <span aria-hidden className="absolute left-0 top-1 h-5 w-5 rounded-full bg-turquoise md:top-1" />
                    <p className="text-[1rem]">{t.program.months(m.months)}</p>
                    <h3 className="mt-2 font-display text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.02em]">{l(m.title)}</h3>
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {/* TECHNIQUES / AUDIENCE */}
        {(p.techniques || p.audience) && (
          <section aria-labelledby="who-title" className="paper py-[clamp(5rem,10vw,9rem)]">
            <div className="frame grid gap-10 lg:grid-cols-12">
              <h2 id="who-title" className="text-display lg:col-span-5">
                {p.techniques ? t.program.techniques : t.program.audience}
              </h2>
              <Reveal as="ul" className="flex flex-col lg:col-span-6 lg:col-start-7">
                {(p.techniques ?? p.audience ?? []).map((x, i) => (
                  <RevealItem as="li" key={x.ru} className="flex items-baseline gap-5 py-3">
                    <span aria-hidden className="h-3 w-3 shrink-0 translate-y-[-0.2em] rounded-full" style={{ background: ['var(--color-turquoise)', 'var(--color-coral)', 'var(--color-ochre)', 'var(--color-plum)'][i % 4] }} />
                    <span className="font-display text-[clamp(1.375rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{l(x)}</span>
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {/* PROCESS / OUTCOMES */}
        {(p.process || p.outcomes) && (
          <section aria-labelledby="process-title" className="bg-ink py-[clamp(5rem,10vw,9rem)] text-canvas">
            <div className="frame">
              <h2 id="process-title" className="text-display max-w-[16ch]">
                {p.process ? t.program.process : t.program.outcomes}
              </h2>
              <Reveal as="ul" className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {p.process
                  ? p.process.map((s) => (
                      <RevealItem as="li" key={s.title.ru}>
                        <span aria-hidden className="block h-1 w-12 bg-turquoise" />
                        <h3 className="mt-5 font-display text-[1.375rem] font-semibold tracking-[-0.02em]">{l(s.title)}</h3>
                        <p className="mt-2 text-[1.0625rem]">{l(s.text)}</p>
                      </RevealItem>
                    ))
                  : p.outcomes!.map((o) => (
                      <RevealItem as="li" key={o.ru}>
                        <span aria-hidden className="block h-1 w-12 bg-turquoise" />
                        <p className="mt-5 font-display text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.02em]">{l(o)}</p>
                      </RevealItem>
                    ))}
              </Reveal>
            </div>
          </section>
        )}

        {/* WHY + GALLERY */}
        <section aria-labelledby="why-title" className={`${heroTone[p.color]} py-[clamp(5rem,10vw,9rem)]`}>
          <div className="frame grid gap-14 lg:grid-cols-12">
            {p.why.length > 0 && (
              <div className="lg:col-span-5">
                <h2 id="why-title" className="text-title font-semibold">
                  {t.program.why}
                </h2>
                <Reveal as="ul" className="mt-8 flex flex-col gap-4">
                  {p.why.map((w) => (
                    <RevealItem as="li" key={w.ru} className="flex gap-4 text-[1.1875rem] font-medium leading-[1.4]">
                      <span aria-hidden className={`mt-[0.55em] h-1 w-6 shrink-0 ${dark ? 'bg-turquoise' : 'bg-ink'}`} />
                      {l(w)}
                    </RevealItem>
                  ))}
                </Reveal>
              </div>
            )}
            <div className={p.why.length > 0 ? 'lg:col-span-6 lg:col-start-7' : 'lg:col-span-12'}>
              <h2 id={p.why.length > 0 ? undefined : 'why-title'} className="text-title font-semibold">
                {t.program.gallery}
              </h2>
              <Reveal as="ul" className={`mt-8 grid gap-3 ${p.id === 'digital-art' ? 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
                {p.gallery.map((g) => (
                  <RevealItem as="li" key={g.id} className="overflow-hidden">
                    <Img pic={g} sizes="(min-width:1024px) 16vw, 33vw" className={`w-full object-cover transition-transform duration-700 hover:scale-105 ${p.id === 'digital-art' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`} />
                  </RevealItem>
                ))}
              </Reveal>
              {p.id === 'digital-art' && <p className="mt-4 text-[0.9375rem]">{t.gallery.digitalCredit}</p>}
            </div>
          </div>
        </section>

        {/* WHERE */}
        <section aria-labelledby="where-title" className="paper py-[clamp(5rem,10vw,9rem)]">
          <div className="frame grid gap-10 lg:grid-cols-12">
            <h2 id="where-title" className="text-title font-semibold lg:col-span-4">
              {t.program.where}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-8">
              {where.map((s) => (
                <li key={s.id}>
                  <a href={mapLink(s.mapQuery)} target="_blank" rel="noreferrer" className="group flex h-full flex-col gap-1 bg-canvas-2 p-6 transition-colors hover:bg-[#e0d1b9]">
                    <span className="font-display text-[1.5rem] font-semibold tracking-[-0.02em]">{l(s.district)}</span>
                    <span className="text-[1.0625rem]">{l(s.address)}</span>
                    <span className="mt-3 text-[0.9375rem] font-semibold text-turquoise-deep">{t.inside.route} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        {p.faq.length > 0 && (
          <section aria-labelledby="faq-title" className="bg-ink py-[clamp(5rem,10vw,9rem)] text-canvas">
            <div className="frame grid gap-10 lg:grid-cols-12">
              <h2 id="faq-title" className="text-title font-semibold lg:col-span-4">
                {t.program.faq}
              </h2>
              <div className="flex flex-col gap-2 lg:col-span-8">
                {p.faq.map((f) => (
                  <details key={f.q.ru} className="group bg-plum open:bg-plum-2">
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-6 py-4 font-display text-[1.1875rem] font-semibold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                      {l(f.q)}
                      <span aria-hidden className="text-[1.5rem] text-turquoise transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="max-w-[60ch] px-6 pb-6 text-[1.0625rem]">{l(f.a)}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section aria-labelledby="program-cta-title" className="on-turquoise bg-turquoise py-[clamp(5rem,10vw,9rem)] text-ink">
          <div className="frame grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 id="program-cta-title" className="text-display">
                {t.turn.title}
              </h2>
              <p className="text-lead mt-6 max-w-[42ch]">{t.program.ctaLead}</p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Link to={enrollHref} className="btn btn-ink w-full">
                {t.program.cta}
                <span className="arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* OTHER PROGRAMS */}
        <nav aria-labelledby="other-title" className="bg-ink py-16 text-canvas">
          <div className="frame">
            <h2 id="other-title" className="font-display text-[1.375rem] font-semibold tracking-[-0.02em]">
              {t.program.other}
            </h2>
            <ul className="mt-6 grid gap-2 md:grid-cols-2">
              {programList
                .filter((x) => x.id !== p.id)
                .map((x) => (
                  <li key={x.id}>
                    <Link to={`/programs/${x.id}`} className={`group flex min-h-28 items-end justify-between gap-4 p-6 ${heroTone[x.color]}`}>
                      <span className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-none tracking-display">{l(x.name)}</span>
                      <span aria-hidden className="text-[1.75rem] transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </main>
      <Footer tone="paper" />

      {/* mobile sticky action */}
      <div
        aria-hidden={!showBar}
        className={`fixed inset-x-0 bottom-0 z-40 bg-ink p-3 transition-transform duration-300 md:hidden ${showBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <Link to={enrollHref} tabIndex={showBar ? 0 : -1} className="btn btn-primary w-full">
          {t.program.cta}
        </Link>
      </div>
    </>
  )
}
