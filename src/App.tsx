import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrushDefs } from './components/BrushDefs'
import { Header } from './components/Header'
import { LangProvider } from './i18n/lang'
import { ScrollManager } from './lib/ScrollManager'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

const ProgramPage = lazy(() => import('./pages/ProgramPage').then((m) => ({ default: m.ProgramPage })))
const EnrollPage = lazy(() => import('./pages/EnrollPage').then((m) => ({ default: m.EnrollPage })))

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <ScrollManager />
        <BrushDefs />
        <Header />
        <Suspense fallback={<div className="min-h-[100svh] bg-ink" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs/:id" element={<ProgramPage />} />
            <Route path="/enroll" element={<EnrollPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LangProvider>
  )
}
