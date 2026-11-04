import type { L } from '../i18n/lang'
import { pics, type Pic } from './images'

export type ProgramId = 'drawing-painting' | 'digital-art' | 'workshops'

export type Program = {
  id: ProgramId
  /** 'confirmed' = content from pictoria.info; 'demo' = format to be confirmed with Pictoria */
  status: 'confirmed' | 'demo'
  color: 'coral' | 'plum' | 'ochre'
  name: L
  short: L
  lead: L
  hero: Pic
  facts: { k: L; v: L }[]
  techniques?: L[]
  audience?: L[]
  modules?: { title: L; months: number }[]
  why: L[]
  process?: { title: L; text: L }[]
  outcomes?: L[]
  gallery: Pic[]
  faq: { q: L; a: L }[]
}

const l = (ru: string, ro: string): L => ({ ru, ro })

export const programs: Record<ProgramId, Program> = {
  'drawing-painting': {
    id: 'drawing-painting',
    status: 'confirmed',
    color: 'coral',
    name: l('Рисунок и живопись', 'Desen și pictură'),
    short: l('От карандаша до масла', 'De la creion la ulei'),
    lead: l(
      'Курсы рисования для детей и взрослых: от карандашного рисунка до живописи маслом. Опыт не нужен, материалы ждут вас в мастерской.',
      'Cursuri de desen pentru copii și adulți: de la desenul în creion la pictura în ulei. Nu e nevoie de experiență, materialele vă așteaptă în atelier.',
    ),
    hero: pics.boyLion,
    facts: [
      { k: l('Занятие', 'Lecția'), v: l('1,5–2 часа', '1,5–2 ore') },
      { k: l('Материалы', 'Materiale'), v: l('Все на месте', 'Toate sunt în atelier') },
      { k: l('Студии', 'Studiouri'), v: l('4 в Кишинёве', '4 în Chișinău') },
      { k: l('Для кого', 'Pentru cine'), v: l('Дети и взрослые', 'Copii și adulți') },
    ],
    techniques: [
      l('Карандашный рисунок', 'Desen în creion'),
      l('Графика', 'Grafică'),
      l('Акварель', 'Acuarelă'),
      l('Акрил', 'Acrilic'),
      l('Тушь', 'Tuș'),
      l('Живопись маслом', 'Pictură în ulei'),
      l('Лепка', 'Modelaj'),
    ],
    why: [
      l('Опытные и внимательные преподаватели', 'Profesori cu experiență și atenți'),
      l('Разнообразные программы и индивидуальный подход', 'Programe variate și abordare individuală'),
      l('Обратная связь на каждом этапе работы', 'Feedback la fiecare etapă a lucrului'),
      l('Четыре студии в разных районах Кишинёва', 'Patru studiouri în diferite sectoare ale Chișinăului'),
    ],
    process: [
      {
        title: l('Только важное', 'Doar esențialul'),
        text: l('Структурированный материал: от простого к сложному, без лишней теории.', 'Material structurat: de la simplu la complex, fără teorie inutilă.'),
      },
      {
        title: l('Учимся через практику', 'Învățăm prin practică'),
        text: l('Бо́льшая часть занятия — работа руками, на основе академических принципов.', 'Cea mai mare parte a lecției este lucru practic, pe principii academice.'),
      },
      {
        title: l('Лепка', 'Modelaj'),
        text: l('Развивает мелкую моторику, концентрацию и фантазию.', 'Dezvoltă motricitatea fină, concentrarea și imaginația.'),
      },
      {
        title: l('Фотоотчёты', 'Reportaje foto'),
        text: l('У каждой группы есть Viber-чат: там появляются работы и фото с занятий.', 'Fiecare grupă are un chat pe Viber, unde apar lucrările și fotografiile de la lecții.'),
      },
    ],
    gallery: [pics.girlFlowers, pics.girlBee, pics.boyKoi, pics.teenStarry, pics.girlPeacock, pics.boyJellyfish],
    faq: [
      {
        q: l('Нужен ли опыт рисования?', 'Este nevoie de experiență în desen?'),
        a: l('Нет. Важно только желание творить: обучение идёт от простого к сложному.', 'Nu. Contează doar dorința de a crea: învățăm de la simplu la complex.'),
      },
      {
        q: l('Что принести на занятие?', 'Ce trebuie să aduc la lecție?'),
        a: l('Ничего. Все материалы и инструменты есть в мастерской.', 'Nimic. Toate materialele și instrumentele sunt în atelier.'),
      },
      {
        q: l('Сколько длится занятие?', 'Cât durează o lecție?'),
        a: l('1,5–2 часа: успеете позаниматься, а устать не успеете.', '1,5–2 ore: aveți timp să lucrați, dar nu și să obosiți.'),
      },
      {
        q: l('Сколько стоит и когда занятия?', 'Cât costă și când au loc lecțiile?'),
        a: l('Стоимость и ближайшее расписание вашей студии сообщим при записи на пробный урок.', 'Prețul și cel mai apropiat orar al studioului vă vor fi comunicate la înscrierea la lecția de probă.'),
      },
    ],
  },

  'digital-art': {
    id: 'digital-art',
    status: 'confirmed',
    color: 'plum',
    name: l('Digital Art', 'Digital Art'),
    short: l('Иллюстрация на iPad', 'Ilustrație pe iPad'),
    lead: l(
      'Цифровая иллюстрация на iPad в Procreate: от пятна и линии до готовой сцены. iPad и Apple Pencil дают на занятии.',
      'Ilustrație digitală pe iPad în Procreate: de la pată și linie la o scenă finalizată. iPad-ul și Apple Pencil sunt oferite la lecție.',
    ),
    hero: pics.tabletHands,
    facts: [
      { k: l('Программа', 'Programul'), v: l('4 модуля по 3 месяца', '4 module a câte 3 luni') },
      { k: l('Инструменты', 'Instrumente'), v: l('iPad и Apple Pencil включены', 'iPad și Apple Pencil incluse') },
      { k: l('Группы', 'Grupe'), v: l('Небольшие', 'Mici') },
      { k: l('В конце', 'La final'), v: l('Сертификат и портфолио', 'Certificat și portofoliu') },
    ],
    audience: [
      l('Новичкам в цифровой иллюстрации', 'Începătorilor în ilustrația digitală'),
      l('Тем, кто уже увлекается рисованием', 'Celor pasionați deja de desen'),
      l('Начинающим графическим дизайнерам и концепт-художникам', 'Designerilor grafici și artiștilor de concept la început de drum'),
    ],
    modules: [
      { title: l('Базовые навыки рисования в Procreate', 'Abilități de bază — desen în Procreate'), months: 3 },
      { title: l('Мир иллюстрации и акварели', 'Ilustrație și acuarelă'), months: 3 },
      { title: l('Реализм и пейзаж', 'Realism și peisaj'), months: 3 },
      { title: l('Портрет и работа с 3D', 'Portret și lucru 3D'), months: 3 },
    ],
    why: [
      l('Собственная программа обучения', 'Program propriu de studiu'),
      l('Занятия в малых группах', 'Lecții în grupuri mici'),
      l('iPad и Apple Pencil включены', 'iPad și Apple Pencil incluse'),
      l('Сертификат по окончании курса', 'Certificat la finalul cursului'),
      l('Занятия в атмосферной студии', 'Lecții într-un studio cu atmosferă creativă'),
      l('Собственное портфолио работ', 'Propriul portofoliu de lucrări'),
    ],
    outcomes: [
      l('Работа в Procreate: слои, инструменты, эффекты', 'Lucrul în Procreate: straturi, instrumente, efecte'),
      l('Перспектива, цвет и объём', 'Perspectivă, culoare și volum'),
      l('Поиск и развитие идей для иллюстраций', 'Găsirea și dezvoltarea ideilor pentru ilustrații'),
      l('Простые портреты и анимация', 'Portrete simple și animație'),
    ],
    gallery: [pics.digitalYellow, pics.digitalViolet, pics.digitalPink],
    faq: [
      {
        q: l('Нужен ли свой iPad?', 'Am nevoie de iPad propriu?'),
        a: l('Нет, iPad и Apple Pencil есть в студии и входят в занятие.', 'Nu, iPad-ul și Apple Pencil sunt în studio și sunt incluse în lecție.'),
      },
      {
        q: l('Подойдёт ли курс тем, кто никогда не рисовал?', 'Este potrivit cursul pentru cine n-a desenat niciodată?'),
        a: l('Да, первый модуль начинается с базовых навыков рисования в Procreate.', 'Da, primul modul începe cu abilitățile de bază ale desenului în Procreate.'),
      },
      {
        q: l('Где проходят занятия?', 'Unde au loc lecțiile?'),
        a: l('На Рышкановке и на Ботанике.', 'La Râșcani și la Botanica.'),
      },
      {
        q: l('Сколько стоит и когда занятия?', 'Cât costă și când au loc lecțiile?'),
        a: l('Стоимость и ближайшее расписание сообщим при записи на пробный урок.', 'Prețul și cel mai apropiat orar vi le vom comunica la înscrierea la lecția de probă.'),
      },
    ],
  },

  workshops: {
    id: 'workshops',
    status: 'demo',
    color: 'ochre',
    name: l('Мастер-классы', 'Ateliere de creație'),
    short: l('Творческие встречи для детей и взрослых', 'Întâlniri creative pentru copii și adulți'),
    lead: l(
      'Pictoria проводит творческие мастер-классы для детей и взрослых. Темы и формат уточняйте у администратора.',
      'Pictoria organizează ateliere de creație pentru copii și adulți. Temele și formatul le aflați de la administrator.',
    ),
    hero: pics.tableClay,
    facts: [
      { k: l('Для кого', 'Pentru cine'), v: l('Дети и взрослые', 'Copii și adulți') },
      { k: l('Материалы', 'Materiale'), v: l('В мастерской', 'În atelier') },
    ],
    why: [],
    gallery: [pics.girlPaperCraft, pics.boyTreeCraft, pics.girlAbstract],
    faq: [],
  },
}

export const programList: Program[] = [programs['drawing-painting'], programs['digital-art'], programs.workshops]
