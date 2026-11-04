import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Img } from '../components/Img'
import { Reveal, RevealItem } from '../components/Reveal'
import { pics, src, type Pic } from '../data/images'
import { useLang } from '../i18n/lang'

type Item = { pic: Pic; digital?: boolean }

const dropped: { pic: Pic; cls: string; rot: number }[] = [
  { pic: pics.girlBee, cls: 'left-[5%] top-[3%] w-[38vw] md:left-[3%] md:top-[6%] md:w-[19vw] lg:w-[17vw]', rot: -8 },
  { pic: pics.boyKoi, cls: 'right-[5%] bottom-[11%] w-[32vw] md:right-[4%] md:bottom-[5%] md:w-[19vw] lg:w-[17vw]', rot: 6 },
  { pic: pics.girlPeacock, cls: 'hidden md:block md:right-[14%] md:top-[4%] md:w-[10vw]', rot: -3 },
]

const wall: (Item & { cls: string })[] = [
  { pic: pics.teenStarry, cls: 'col-span-6 md:col-span-4' },
  { pic: pics.girlAbstract, cls: 'col-span-6 mt-16 md:col-span-5 md:col-start-6 md:mt-[18svh]' },
  { pic: pics.girlJellyfish, cls: 'col-span-6 md:col-span-3 md:col-start-2 md:-mt-[10svh]' },
  { pic: pics.digitalViolet, cls: 'col-span-6 mt-10 md:col-span-4 md:col-start-6 md:mt-0', digital: true },
  { pic: pics.girlEaselOrange, cls: 'col-span-6 md:col-span-3 md:col-start-10 md:-mt-[24svh]' },
  { pic: pics.boyJellyfish, cls: 'col-span-6 mt-10 md:col-span-3 md:col-start-1 md:mt-0' },
  { pic: pics.toddlerEasel, cls: 'col-span-6 md:col-span-5 md:col-start-5 md:mt-[8svh]' },
  { pic: pics.digitalPink, cls: 'col-span-6 mt-10 md:col-span-3 md:col-start-10 md:mt-[2svh]', digital: true },
  { pic: pics.girlBlackTree, cls: 'col-span-6 md:col-span-3 md:col-start-2 md:-mt-[12svh]' },
  { pic: pics.girlSmile, cls: 'col-span-6 mt-10 md:col-span-3 md:col-start-6 md:mt-0' },
]

const all: Item[] = [...dropped.map((d) => ({ pic: d.pic })), ...wall]

/** Scene 04 — The Gallery. Prints dropped on the headline, then an asymmetric wall. */
export function Gallery() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-plum text-canvas">
      {/* prints dropped on the headline */}
      <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-24">
        <h2 id="gallery-title" className="relative z-0 text-center font-display text-[clamp(2.75rem,13.5vw,7rem)] font-semibold leading-[0.88] tracking-display md:text-[clamp(4.5rem,10vw,11.5rem)]">
          <span className="block">{t.gallery.titleA}</span>
          <span className="block text-turquoise">{t.gallery.titleB}</span>
        </h2>
        {dropped.map((d, i) => (
          <Print key={d.pic.id} pic={d.pic} rot={d.rot} className={`absolute z-10 ${d.cls}`} onOpen={() => setOpen(i)} delay={i * 0.12} />
        ))}
        <p className="absolute bottom-6 left-[var(--gutter)] z-20 max-w-[50%] text-[0.9375rem] md:max-w-[34ch] md:text-base">{t.gallery.lead}</p>
      </div>

      {/* the wall */}
      <div className="frame pb-[clamp(6rem,12vw,12rem)] pt-[clamp(2rem,6vw,6rem)]">
        <ul className="grid grid-cols-12 gap-x-4 gap-y-10 md:gap-x-6">
          {wall.map((w, i) => (
            <Reveal as="li" key={w.pic.id} className={w.cls} amount={0.15}>
              <RevealItem>
                <WallPrint item={w} onOpen={() => setOpen(dropped.length + i)} />
              </RevealItem>
            </Reveal>
          ))}
        </ul>
        <p className="mt-16 max-w-[60ch] text-[0.9375rem] text-canvas/85">{t.gallery.credit}</p>
      </div>

      <Lightbox items={all} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  )
}

function Print({ pic, rot, className, onOpen, delay }: { pic: Pic; rot: number; className: string; onOpen: () => void; delay: number }) {
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`${t.gallery.open}: ${l(pic.alt)}`}
      className={`group bg-canvas p-2 md:p-2.5 focus-visible:z-30 ${className}`}
      initial={reduce ? false : { opacity: 0, y: -60, rotate: rot * 2.2, scale: 1.08 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay }}
      whileHover={reduce ? undefined : { rotate: 0, scale: 1.04, zIndex: 30 }}
      whileFocus={reduce ? undefined : { rotate: 0, scale: 1.04, zIndex: 30 }}
      whileTap={{ scale: 0.98 }}
    >
      <Img pic={pic} sizes="(min-width:768px) 24vw, 44vw" className="aspect-[3/4] w-full object-cover" decorative />
    </motion.button>
  )
}

function WallPrint({ item, onOpen }: { item: Item; onOpen: () => void }) {
  const { t, l } = useLang()
  return (
    <figure>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t.gallery.open}: ${l(item.pic.alt)}`}
        className="group relative block w-full overflow-hidden bg-ink"
      >
        <Img
          pic={item.pic}
          sizes="(min-width:768px) 33vw, 50vw"
          className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
          decorative
        />
        {/* the Pictoria line traces the print on hover */}
        <span aria-hidden className="pointer-events-none absolute inset-0 border-[6px] border-turquoise opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
      </button>
      {item.digital && <figcaption className="mt-3 text-[0.9375rem] text-canvas/85">{t.gallery.digitalCredit}</figcaption>}
    </figure>
  )
}

function Lightbox({ items, index, onClose, onIndex }: { items: Item[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const { t, l } = useLang()
  const ref = useRef<HTMLDialogElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (index !== null && !d.open) {
      lastFocus.current = document.activeElement as HTMLElement
      d.showModal()
    } else if (index === null && d.open) {
      d.close()
    }
  }, [index])

  useEffect(() => {
    const d = ref.current
    if (!d) return
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length)
    }
    const onCloseEvt = () => {
      onClose()
      lastFocus.current?.focus()
    }
    d.addEventListener('keydown', onKey)
    d.addEventListener('close', onCloseEvt)
    return () => {
      d.removeEventListener('keydown', onKey)
      d.removeEventListener('close', onCloseEvt)
    }
  }, [index, items.length, onClose, onIndex])

  const item = index !== null ? items[index] : null

  return (
    <dialog
      ref={ref}
      aria-label={item ? l(item.pic.alt) : t.gallery.open}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink/95 p-0 text-canvas backdrop:bg-ink/80"
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close()
      }}
    >
      {item && index !== null && (
        <div className="frame flex h-full flex-col py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.9375rem]" aria-live="polite">
              {t.gallery.counter(index + 1, items.length)}
            </p>
            <button type="button" onClick={() => ref.current?.close()} className="btn btn-ghost !min-h-11 !px-4" autoFocus>
              {t.gallery.close}
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
            </button>
          </div>
          <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 py-4">
            <motion.img
              key={item.pic.id}
              src={src(item.pic)}
              width={item.pic.w}
              height={item.pic.h}
              alt={l(item.pic.alt)}
              className="max-h-full min-h-0 w-auto max-w-full object-contain"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            />
            <figcaption className="max-w-[60ch] text-center text-[1rem]">
              {l(item.pic.alt)}
              {item.digital ? ` · ${t.gallery.digitalCredit}` : ''}
            </figcaption>
          </figure>
          <div className="flex justify-between gap-4">
            <button type="button" className="btn btn-ghost !min-h-12" onClick={() => onIndex((index - 1 + items.length) % items.length)}>
              <span aria-hidden>←</span> <span className="sr-only md:not-sr-only">{t.gallery.prev}</span>
            </button>
            <button type="button" className="btn btn-primary !min-h-12" onClick={() => onIndex((index + 1) % items.length)}>
              <span className="sr-only md:not-sr-only">{t.gallery.next}</span> <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
