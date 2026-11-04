import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dict, type Dict } from './dict'

export type Lang = 'ru' | 'ro'
/** A string available in both languages. */
export type L = { ru: string; ro: string }

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; l: (v: L) => string }

const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'ro' || fromUrl === 'ru') return fromUrl
  const stored = window.localStorage.getItem('pictoria-lang')
  return stored === 'ro' ? 'ro' : 'ru'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem('pictoria-lang', lang)
  }, [lang])

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: dict[lang], l: (v: L) => v[lang] }),
    [lang],
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
