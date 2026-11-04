import type { L } from '../i18n/lang'
import type { ProgramId } from './programs'
import { studios, type StudioId } from './studios'

export type Who = 'child' | 'teen' | 'adult'
export type What = 'painting' | 'digital' | 'unsure'

/** Demo-only sample slots. NOT Pictoria's schedule — clearly labelled in the UI. */
const demoSlots: Record<Who, L[]> = {
  child: [
    { ru: 'Вторник и четверг · 16:30', ro: 'Marți și joi · 16:30' },
    { ru: 'Суббота · 11:00', ro: 'Sâmbătă · 11:00' },
  ],
  teen: [
    { ru: 'Понедельник и среда · 17:30', ro: 'Luni și miercuri · 17:30' },
    { ru: 'Суббота · 13:00', ro: 'Sâmbătă · 13:00' },
  ],
  adult: [
    { ru: 'Среда и пятница · 19:00', ro: 'Miercuri și vineri · 19:00' },
    { ru: 'Воскресенье · 12:00', ro: 'Duminică · 12:00' },
  ],
}

/** Where to send a Digital Art student when their district has no iPad studio (per pictoria.info; to confirm). */
const nearestDigital: Record<StudioId, StudioId> = { riscani: 'riscani', botanica: 'botanica', ciocana: 'riscani', buiucani: 'riscani' }

export function recommend(who: Who, what: What, district: StudioId) {
  const program: ProgramId = what === 'digital' ? 'digital-art' : 'drawing-painting'
  const studioId = program === 'digital-art' ? nearestDigital[district] : district
  return {
    program,
    studio: studios.find((s) => s.id === studioId)!,
    moved: studioId !== district,
    unsure: what === 'unsure',
    slots: demoSlots[who],
  }
}

