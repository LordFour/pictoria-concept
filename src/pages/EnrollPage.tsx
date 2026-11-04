import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Img } from '../components/Img'
import { Mark } from '../components/Mark'
import { pics } from '../data/images'
import { programList, programs, type ProgramId } from '../data/programs'
import { studios, type StudioId } from '../data/studios'
import { useLang } from '../i18n/lang'
import { usePageTitle } from '../lib/usePageTitle'
import type { Who } from '../data/matcher'

type Form = {
  name: string
  phone: string
  who: Who
  age: string
  program: ProgramId
  studio: StudioId | 'any'
  time: 'weekday' | 'evening' | 'weekend'
  comment: string
  consent: boolean
}
type Errors = Partial<Record<'name' | 'phone' | 'consent', string>>

const isProgram = (v: string | null): v is ProgramId => !!v && v in programs
const isStudio = (v: string | null): v is StudioId => !!v && studios.some((s) => s.id === v)
const isWho = (v: string | null): v is Who => v === 'child' || v === 'teen' || v === 'adult'

/** Demo enrolment: validates like a real form, sends nothing. */
export function EnrollPage() {
  const { t, l } = useLang()
  usePageTitle(t.enroll.title)
  const reduce = useReducedMotion()
  const [params] = useSearchParams()
  const qp = params.get('program')
  const qs = params.get('studio')
  const qw = params.get('who')

  const [form, setForm] = useState<Form>({
    name: '',
    phone: '',
    who: isWho(qw) ? qw : 'child',
    age: '',
    program: isProgram(qp) ? qp : 'drawing-painting',
    studio: isStudio(qs) ? qs : 'any',
    time: 'weekday',
    comment: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const summaryRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = (f: Form): Errors => {
    const e: Errors = {}
    if (f.name.trim().length < 2) e.name = t.enroll.errors.name
    const digits = f.phone.replace(/\D/g, '').replace(/^373/, '')
    if (digits.length < 8 || digits.length > 9) e.phone = t.enroll.errors.phone
    if (!f.consent) e.consent = t.enroll.errors.consent
    return e
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setState('sending')
    // No network request: this is a demo. Simulate a short round-trip so the state is visible.
    window.setTimeout(() => {
      setState('done')
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      requestAnimationFrame(() => doneRef.current?.focus())
    }, 900)
  }

  const studioOptions = form.program === 'digital-art' ? studios.filter((s) => s.digital) : studios
  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Errors, string][]

  return (
    <>
      <main id="main" className="paper min-h-[100svh] pt-[var(--header-h)]">
        <div className="frame grid gap-12 pb-[clamp(5rem,10vw,9rem)] pt-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <div className="relative hidden lg:block">
                <Img pic={pics.girlPortrait} sizes="30vw" className="aspect-[4/5] w-full object-cover" />
                <Mark className="absolute -bottom-6 -right-6 w-24" />
              </div>
              <p className="demo-tag mt-0 lg:mt-12">{t.enroll.demoBanner}</p>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait" initial={false}>
              {state === 'done' ? (
                <motion.div key="done" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <svg aria-hidden viewBox="0 0 220 60" className="h-14 w-56">
                    <motion.path
                      d="M 6 34 C 40 30, 52 50, 70 50 C 96 50, 120 12, 214 8"
                      stroke="var(--color-turquoise)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="none"
                      initial={reduce ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                    />
                  </svg>
                  <h1 ref={doneRef} tabIndex={-1} className="mt-6 text-display outline-none">
                    {t.enroll.doneTitle}
                  </h1>
                  <p className="text-lead mt-6 max-w-[44ch]">{t.enroll.doneText(form.name.trim())}</p>
                  <p className="demo-tag mt-4">{t.enroll.doneDemo}</p>

                  <dl className="mt-10 grid gap-x-8 gap-y-4 bg-canvas-2 p-6 sm:grid-cols-2">
                    <Row k={t.enroll.program} v={l(programs[form.program].name)} />
                    <Row k={t.enroll.studio} v={form.studio === 'any' ? t.enroll.anyStudio : l(studios.find((s) => s.id === form.studio)!.district)} />
                    <Row k={t.enroll.who} v={t.find.who[form.who]} />
                    <Row k={t.enroll.time} v={t.enroll.times[form.time]} />
                    <Row k={t.enroll.phone} v={form.phone} />
                  </dl>

                  <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:items-center xs:gap-7">
                    <Link to="/" className="btn btn-ink">
                      {t.enroll.home}
                    </Link>
                    <button
                      type="button"
                      className="line-link self-start xs:self-auto"
                      onClick={() => {
                        setState('idle')
                        setForm((f) => ({ ...f, name: '', phone: '', comment: '', consent: false }))
                      }}
                    >
                      {t.enroll.again}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h1 className="text-display">{t.enroll.title}</h1>
                  <p className="text-lead mt-6 max-w-[44ch]">{t.enroll.lead}</p>

                  {errorList.length > 0 && (
                    <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-8 bg-coral p-5 text-ink outline-none">
                      <p className="font-semibold">{t.enroll.errors.summary}</p>
                      <ul className="mt-2 flex flex-col gap-1">
                        {errorList.map(([k, v]) => (
                          <li key={k}>
                            <a href={`#f-${k}`} className="underline underline-offset-4">
                              {v}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <form noValidate onSubmit={submit} className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
                    <Field id="f-name" label={t.enroll.name} required error={errors.name}>
                      {(p) => <input {...p} type="text" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} />}
                    </Field>
                    <Field id="f-phone" label={t.enroll.phone} hint={t.enroll.phoneHint} required error={errors.phone}>
                      {(p) => (
                        <input {...p} type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                      )}
                    </Field>

                    <Segmented
                      legend={t.enroll.who}
                      value={form.who}
                      onChange={(v) => set('who', v as Who)}
                      options={(['child', 'teen', 'adult'] as const).map((k) => ({ value: k, label: t.find.who[k] }))}
                    />

                    {form.who !== 'adult' && (
                      <Field id="f-age" label={t.enroll.age} hint={t.enroll.ageHint}>
                        {(p) => <input {...p} type="number" min={3} max={18} inputMode="numeric" value={form.age} onChange={(e) => set('age', e.target.value)} />}
                      </Field>
                    )}

                    <Field id="f-program" label={t.enroll.program}>
                      {(p) => (
                        <select
                          {...p}
                          value={form.program}
                          onChange={(e) => {
                            const prog = e.target.value as ProgramId
                            setForm((f) => ({
                              ...f,
                              program: prog,
                              studio: prog === 'digital-art' && f.studio !== 'any' && !studios.find((s) => s.id === f.studio)?.digital ? 'any' : f.studio,
                            }))
                          }}
                        >
                          {programList.map((x) => (
                            <option key={x.id} value={x.id}>
                              {l(x.name)}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Field id="f-studio" label={t.enroll.studio}>
                      {(p) => (
                        <select {...p} value={form.studio} onChange={(e) => set('studio', e.target.value as StudioId | 'any')}>
                          <option value="any">{t.enroll.anyStudio}</option>
                          {studioOptions.map((s) => (
                            <option key={s.id} value={s.id}>
                              {l(s.district)} — {l(s.address)}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>

                    <Segmented
                      legend={t.enroll.time}
                      value={form.time}
                      onChange={(v) => set('time', v as Form['time'])}
                      options={(['weekday', 'evening', 'weekend'] as const).map((k) => ({ value: k, label: t.enroll.times[k] }))}
                    />

                    <Field id="f-comment" label={t.enroll.comment} hint={t.enroll.commentHint} wide>
                      {(p) => <textarea {...p} rows={3} value={form.comment} onChange={(e) => set('comment', e.target.value)} />}
                    </Field>

                    <div className="sm:col-span-2">
                      <label htmlFor="f-consent" className="flex min-h-12 cursor-pointer items-start gap-4">
                        <input
                          id="f-consent"
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => set('consent', e.target.checked)}
                          aria-invalid={!!errors.consent}
                          aria-describedby={errors.consent ? 'f-consent-err' : undefined}
                          className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--color-turquoise-deep)]"
                        />
                        <span className="text-[1.0625rem]">{t.enroll.consent}</span>
                      </label>
                      {errors.consent && (
                        <p id="f-consent-err" className="mt-2 pl-10 text-[0.9375rem] font-semibold text-[#b3261e]">
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <button type="submit" disabled={state === 'sending'} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
                        {state === 'sending' ? t.enroll.sending : t.enroll.submit}
                        {state !== 'sending' && (
                          <span className="arrow" aria-hidden>
                            →
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer tone="ink" />
    </>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[0.9375rem]">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  )
}

const inputCls =
  'block w-full min-h-14 bg-[#fbf7f0] px-4 py-3 text-[1.0625rem] text-ink border-2 border-ink/40 transition-colors placeholder:text-ink/50 hover:border-ink/70 focus:border-turquoise-deep focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-turquoise-deep aria-[invalid=true]:border-[#b3261e]'

function Field({
  id,
  label,
  hint,
  required,
  error,
  wide,
  children,
}: {
  id: string
  label: string
  hint?: string
  required?: boolean
  error?: string
  wide?: boolean
  children: (p: { id: string; className: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string; required?: boolean }) => ReactNode
}) {
  const { t } = useLang()
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-err` : ''].filter(Boolean).join(' ') || undefined
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {label}
        {required && (
          <span className="text-turquoise-deep" aria-hidden>
            {' '}
            *
          </span>
        )}
        {required && <span className="sr-only"> ({t.enroll.required})</span>}
      </label>
      {children({ id, className: inputCls, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy, required })}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-[0.9375rem]">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[0.9375rem] font-semibold text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  )
}

function Segmented({ legend, options, value, onChange }: { legend: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  const name = useId()
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = o.value === value
          return (
            <label
              key={o.value}
              className={`inline-flex min-h-12 cursor-pointer border-2 border-transparent items-center px-4 text-[1rem] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-turquoise-deep ${
                checked ? 'bg-ink text-canvas' : 'border-2 border-ink/40 bg-[#fbf7f0] hover:border-ink/75'
              }`}
            >
              <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="sr-only" />
              {o.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
