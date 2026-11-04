import { Link } from 'react-router-dom'
import { Mark } from '../components/Mark'
import { useLang } from '../i18n/lang'
import { usePageTitle } from '../lib/usePageTitle'

export function NotFound() {
  const { t } = useLang()
  usePageTitle('404')
  return (
    <main id="main" className="frame flex min-h-[100svh] flex-col items-start justify-center gap-8 bg-ink pt-[var(--header-h)]">
      <Mark className="w-24" />
      <h1 className="text-display max-w-[14ch]">{t.notFound.title}</h1>
      <Link to="/" className="btn btn-primary">
        {t.notFound.back}
      </Link>
    </main>
  )
}
