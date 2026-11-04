import type { L } from '../i18n/lang'

/**
 * All photographs are Pictoria's own, downloaded from pictoria.info for this LOCAL prototype only.
 * Publication rights and parental consent are NOT confirmed (see docs/CONTENT-GAPS.md §5).
 * Wix stock images found on the site (11062b_*) are deliberately excluded.
 */
export type Pic = {
  id: string
  w: number
  h: number
  alt: L
}

const p = (id: string, w: number, h: number, ru: string, ro: string): Pic => ({ id, w, h, alt: { ru, ro } })

export const pics = {
  boyLion: p('boy-lion', 1099, 1400, 'Мальчик в бирюзовом фартуке пишет льва на холсте у мольберта', 'Un băiat în șorț turcoaz pictează un leu pe pânză, la șevalet'),
  girlFlowers: p('girl-flowers', 1050, 1400, 'Девочка держит свою картину с букетом роз в кувшине', 'O fetiță își ține tabloul cu un buchet de trandafiri într-o cană'),
  girlBee: p('girl-bee', 1050, 1400, 'Девочка с картиной: шмель среди ромашек', 'O fetiță cu tabloul ei: un bondar printre mușețel'),
  girlJellyfish: p('girl-jellyfish', 1050, 1400, 'Девочка показывает картину с медузами', 'O fetiță arată tabloul cu meduze'),
  teenStarry: p('teen-starry-night', 960, 1280, 'Девушка держит свою картину по мотивам «Звёздной ночи»', 'O tânără își ține tabloul inspirat de „Noaptea înstelată”'),
  boyJellyfish: p('boy-jellyfish', 1050, 1400, 'Мальчик держит картину с медузами', 'Un băiat ține un tablou cu meduze'),
  girlPeacock: p('girl-peacock', 645, 1400, 'Девочка с картиной павлина на фоне бирюзовой стены студии', 'O fetiță cu tabloul unui păun, în fața peretelui turcoaz al studioului'),
  boyKoi: p('boy-koi', 1050, 1400, 'Мальчик с картиной: рыбы кои среди листьев', 'Un băiat cu tabloul său: pești koi printre frunze'),
  boyEasel: p('boy-easel', 1050, 1400, 'Мальчик работает кистью у мольберта', 'Un băiat lucrează cu pensula la șevalet'),
  kidsEasels: p('kids-easels', 995, 1400, 'Дети пишут картины у мольбертов в мастерской', 'Copii pictează la șevalete în atelier'),
  toddlerEasel: p('toddler-easel', 1050, 1400, 'Маленькая девочка сидит у мольберта с кистью', 'O fetiță mică stă la șevalet cu pensula'),
  girlEaselGreen: p('girl-easel-green', 1050, 1400, 'Девочка у мольберта в светлой мастерской', 'O fetiță la șevalet, în atelierul luminos'),
  girlEaselOrange: p('girl-easel-orange', 903, 1400, 'Девочка пишет оранжевую рыбу на холсте', 'O fetiță pictează un pește portocaliu pe pânză'),
  studioEasels: p('studio-easels', 1050, 1400, 'Мастерская Pictoria: мольберты, картины на стенах, ученица за работой', 'Atelierul Pictoria: șevalete, tablouri pe pereți, o elevă la lucru'),
  girlEaselRoom: p('girl-easel-room', 955, 1400, 'Девочка у мольберта, за ней полки с работами', 'O fetiță la șevalet, în spate rafturi cu lucrări'),
  girlPalette: p('girl-palette', 1050, 1400, 'Девочка смешивает краски на палитре', 'O fetiță amestecă vopselele pe paletă'),
  girlBlackTree: p('girl-black-tree', 1050, 1400, 'Девочка рисует чёрное дерево на белом листе', 'O fetiță desenează un copac negru pe o foaie albă'),
  boyTreeCraft: p('boy-tree-craft', 1050, 1400, 'Мальчик делает аппликацию: зелёное дерево', 'Un băiat face o aplicație: un copac verde'),
  tableClay: p('table-clay', 1400, 1050, 'Дети за общим столом лепят и рисуют', 'Copii la masa comună modelează și desenează'),
  girlAbstract: p('girl-abstract', 1400, 1267, 'Девочка положила голову рядом со своей яркой абстрактной картиной', 'O fetiță și-a pus capul lângă tabloul ei abstract și colorat'),
  girlPaperCraft: p('girl-paper-craft', 1050, 1400, 'Девочка вырезает оранжевые фигуры из бумаги', 'O fetiță decupează forme portocalii din hârtie'),
  tableWatercolor: p('table-watercolor', 1050, 1400, 'Акварельные работы детей на столе мастерской', 'Lucrări în acuarelă ale copiilor pe masa atelierului'),
  girlYellowCanvas: p('girl-yellow-canvas', 1050, 1400, 'Девочка пишет жёлтый холст, сидя у окна', 'O fetiță pictează o pânză galbenă, lângă fereastră'),
  girlSmile: p('girl-smile-studio', 1050, 1400, 'Улыбающаяся девочка в фартуке среди мольбертов', 'O fetiță zâmbitoare în șorț, printre șevalete'),
  girlPortrait: p('girl-portrait', 1050, 1400, 'Девочка в бирюзовом фартуке Pictoria улыбается в мастерской', 'O fetiță în șorțul turcoaz Pictoria zâmbește în atelier'),
  handWatercolor: p('hand-watercolor', 1400, 703, 'Рука с кистью проводит акварельную линию', 'O mână cu pensula trage o linie de acuarelă'),
  tabletHands: p('tablet-hands', 1400, 1000, 'Ученица рисует стилусом на iPad', 'O elevă desenează cu stiloul pe iPad'),
  digitalYellow: p('digital-girl-yellow', 799, 600, 'Цифровая иллюстрация: девочка с тёмными волосами на жёлтом фоне', 'Ilustrație digitală: o fetiță cu părul închis pe fundal galben'),
  digitalViolet: p('digital-boy-violet', 800, 600, 'Цифровая иллюстрация: мальчик на сиреневом фоне', 'Ilustrație digitală: un băiat pe fundal violet'),
  digitalPink: p('digital-girl-pink', 799, 600, 'Цифровая иллюстрация: девушка на розовом фоне', 'Ilustrație digitală: o tânără pe fundal roz'),
} satisfies Record<string, Pic>

const BASE = import.meta.env.BASE_URL
export const src = (pic: Pic, w: 640 | 1280 = 1280) => `${BASE}img/${pic.id}-${w}.webp`
export const srcSet = (pic: Pic) => `${BASE}img/${pic.id}-640.webp 640w, ${BASE}img/${pic.id}-1280.webp 1280w`
