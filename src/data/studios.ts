import type { L } from '../i18n/lang'

export type StudioId = 'riscani' | 'ciocana' | 'botanica' | 'buiucani'

export type Studio = {
  id: StudioId
  district: L
  address: L
  /** Programs offered here according to pictoria.info (to be confirmed, see CONTENT-GAPS). */
  digital: boolean
  mapQuery: string
}

/** Addresses as published on pictoria.info/desen and pictoria.info (Nov 2026). */
export const studios: Studio[] = [
  {
    id: 'riscani',
    district: { ru: 'Рышкановка', ro: 'Râșcani' },
    address: { ru: 'бул. Московский, 6, 3 этаж', ro: 'bd. Moscova 6, etajul 3' },
    digital: true,
    mapQuery: 'Bulevardul Moscova 6, Chișinău',
  },
  {
    id: 'ciocana',
    district: { ru: 'Чеканы', ro: 'Ciocana' },
    address: { ru: 'ул. Алеку Руссо, 20, 4 этаж', ro: 'str. Alecu Russo 20, etajul 4' },
    digital: false,
    mapQuery: 'Strada Alecu Russo 20, Chișinău',
  },
  {
    id: 'botanica',
    district: { ru: 'Ботаника', ro: 'Botanica' },
    address: { ru: 'ул. Н. Зелинского, 15/5', ro: 'str. N. Zelinski 15/5' },
    digital: true,
    mapQuery: 'Strada Nicolae Zelinski 15/5, Chișinău',
  },
  {
    id: 'buiucani',
    district: { ru: 'Буюканы', ro: 'Buiucani' },
    address: { ru: 'ул. Алба Юлия, 75, 9 этаж', ro: 'str. Alba Iulia 75, etajul 9' },
    digital: false,
    mapQuery: 'Strada Alba Iulia 75, Chișinău',
  },
]

export const contacts = {
  email: 'pictoria.md@gmail.com',
  phones: [
    { number: '060 098 252', tel: '+37360098252', label: { ru: 'Рисунок и живопись', ro: 'Desen și pictură' } },
    { number: '068 750 450', tel: '+37368750450', label: { ru: 'Digital Art', ro: 'Digital Art' } },
    { number: '068 446 524', tel: '+37368446524', label: { ru: 'Digital Art', ro: 'Digital Art' } },
  ],
  instagram: 'https://www.instagram.com/digital.pictoria/',
  facebook: 'https://www.facebook.com/digital.pictoria',
}

export const mapLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
