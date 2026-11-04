import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to #hash after navigation (also across routes), otherwise to the top; move focus for screen readers. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const go = () => {
      const el = document.getElementById(id)
      if (!el) {
        if (tries++ < 20) requestAnimationFrame(go)
        return
      }
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    }
    requestAnimationFrame(go)
  }, [pathname, hash])

  return null
}
