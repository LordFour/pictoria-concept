import { useEffect, useLayoutEffect, useState, type RefObject } from 'react'

export function useMedia(query: string, fallback = false) {
  const [match, setMatch] = useState(() => (typeof window === 'undefined' ? fallback : window.matchMedia(query).matches))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** Pixel size of an element, kept current with ResizeObserver. */
export function useSize<T extends Element>(ref: RefObject<T | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect
      setSize((s) => (Math.abs(s.w - width) < 1 && Math.abs(s.h - height) < 1 ? s : { w: Math.round(width), h: Math.round(height) }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return size
}

/**
 * A hand-like zigzag that covers a w×h box when stroked with the returned width.
 * Used as the brush that paints a photograph into view.
 */
export function scribble(w: number, h: number, passes = 5) {
  const band = h / passes
  const stroke = band * 1.55
  const pts: string[] = []
  const x0 = -stroke * 0.2
  const x1 = w + stroke * 0.2
  let y = band * 0.45
  pts.push(`M ${x0.toFixed(1)} ${(y - band * 0.25).toFixed(1)}`)
  for (let i = 0; i < passes; i++) {
    const goingRight = i % 2 === 0
    const xs = goingRight ? x0 : x1
    const xe = goingRight ? x1 : x0
    const yEnd = y + band * 0.18
    // gentle belly in each pass so it reads as a hand stroke, not a raster scan
    const cx = (xs + xe) / 2
    const cy = y + (goingRight ? -band * 0.32 : band * 0.28)
    pts.push(`Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${xe.toFixed(1)} ${yEnd.toFixed(1)}`)
    if (i < passes - 1) {
      const yNext = y + band
      const turnX = goingRight ? xe + stroke * 0.15 : xe - stroke * 0.15
      pts.push(`Q ${turnX.toFixed(1)} ${((yEnd + yNext) / 2).toFixed(1)} ${xe.toFixed(1)} ${yNext.toFixed(1)}`)
      y = yNext
    }
  }
  return { d: pts.join(' '), stroke }
}
