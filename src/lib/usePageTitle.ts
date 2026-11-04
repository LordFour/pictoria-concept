import { useEffect } from 'react'
import { useLang } from '../i18n/lang'

export function usePageTitle(title?: string) {
  const { t } = useLang()
  useEffect(() => {
    document.title = title ? `${title} — Pictoria Art Studio` : t.meta.title
  }, [title, t])
}
