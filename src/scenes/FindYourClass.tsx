import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { recommend, type What, type Who } from '../data/matcher'
import { programs } from '../data/programs'
import { studios, type StudioId } from '../data/studios'
import { useLang } from '../i18n/lang'

/** Scene 06 — Find Your Class. The one live thing: three choices, one honest recommendation. */
export function FindYourClass() {
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  const [who, setWho] = useState<Who | null>(null)
  const [what, setWhat] = useState<What | null>(null)
  const [where, setWhere] = useState<StudioId | null>(null)

  const done = who && what && where
  const rec = done ? recommend(who, what, where) : null
  const p = rec ? programs[rec.program] : null
  const enrollHref = rec ? `/enroll?program=${rec.program}&studio=${rec.studio.id}&who=${who}` : '/enroll'

  return (
    <section id="find" aria-labelledby="find-title" className="on-turquoise relative bg-turquoise py-[clamp(6rem,12vw,11rem)] text-ink">
      <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <h2 id="find-title" className="text-display">
            {t.find.title}
          </h2>
          <p className="text-lead mt-6 max-w-[40ch]">{t.find.lead}</p>

          <form className="mt-12 flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
            <Choice
              legend={t.find.q1}
              value={who}
              onChange={(v) => setWho(v as Who)}
              options={(['child', 'teen', 'adult'] as const).map((k) => ({ value: k, label: t.find.who[k] }))}
            />
            <Choice
              legend={t.find.q2}
              value={what}
              onChange={(v) => setWhat(v as What)}
              options={(['painting', 'digital', 'unsure'] as const).map((k) => ({ value: k, label: t.find.what[k] }))}
            />
            <Choice
              legend={t.find.q3}
              value={where}
              onChange={(v) => setWhere(v as StudioId)}
              options={studios.map((s) => ({ value: s.id, label: l(s.district) }))}
            />
          </form>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <div aria-live="polite" className="bg-ink p-[clamp(1.5rem,3vw,2.5rem)] text-canvas">
              <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-turquoise">{t.find.resultTitle}</h3>
              <AnimatePresence mode="wait" initial={false}>
                {!rec || !p ? (
                  <motion.p
                    key="empty"
                    className="mt-4 text-[1.0625rem]"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {t.find.resultEmpty}
                    <span className="mt-6 flex gap-2" aria-hidden>
                      {[who, what, where].map((v, i) => (
                        <span key={i} className={`h-1.5 flex-1 transition-colors duration-300 ${v ? 'bg-turquoise' : 'bg-canvas/25'}`} />
                      ))}
                    </span>
                  </motion.p>
                ) : (
                  <motion.div
                    key={`${rec.program}-${rec.studio.id}-${who}`}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mt-4 font-display text-title font-semibold leading-[1] tracking-display">{l(p.name)}</p>
                    <p className="mt-3 text-[1.0625rem]">
                      {l(rec.studio.district)} · {l(rec.studio.address)}
                    </p>
                    {rec.moved && <p className="mt-3 text-[1rem] text-ochre">{t.find.digitalMoved(l(rec.studio.district))}</p>}
                    {rec.unsure && <p className="mt-3 text-[1rem] text-ochre">{t.find.unsureNote}</p>}

                    <div className="mt-6 bg-plum p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">{t.find.scheduleTitle}</p>
                        <span className="demo-tag">{t.find.demo}</span>
                      </div>
                      <ul className="mt-3 flex flex-col gap-1 text-[1rem]">
                        {rec.slots.map((s) => (
                          <li key={s.ru}>{l(s)}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <Link to={enrollHref} className="btn btn-primary w-full">
                        {t.find.cta}
                        <span className="arrow" aria-hidden>
                          →
                        </span>
                      </Link>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link to={`/programs/${rec.program}`} className="line-link">
                          {t.find.details}
                        </Link>
                        <button
                          type="button"
                          className="min-h-11 text-[0.9375rem] font-semibold underline underline-offset-4 hover:text-turquoise"
                          onClick={() => {
                            setWho(null)
                            setWhat(null)
                            setWhere(null)
                          }}
                        >
                          {t.find.reset}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Choice({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: { value: string; label: string }[]
  value: string | null
  onChange: (v: string) => void
}) {
  const name = useId()
  const reduce = useReducedMotion()
  return (
    <fieldset>
      <legend className="font-display text-[1.375rem] font-semibold tracking-[-0.02em]">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o.value
          return (
            <label
              key={o.value}
              className={`relative inline-flex min-h-14 cursor-pointer border-2 select-none items-center px-5 text-[1.0625rem] font-semibold transition-[background-color,color,transform] duration-200 active:scale-[0.98] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                checked ? 'border-ink bg-ink text-canvas' : 'border-ink hover:bg-ink/10'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              {o.label}
              {checked && (
                <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute bottom-2 left-5 right-5 h-2 w-[calc(100%-2.5rem)]">
                  <motion.path
                    d="M 1 6 C 25 2, 60 9, 99 4"
                    stroke="var(--color-turquoise)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
