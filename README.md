# PICTORIA — The Living Canvas · concept prototype

Интерактивный концепт-прототип сайта **Pictoria Art Studio** (Кишинёв): рисунок и живопись, Digital Art, творческие мастер-классы.

> ⚠️ Это **концепция для презентации владелице студии**, а не официальный сайт. Действующий сайт pictoria.info не изменялся. Фотографии детей взяты с pictoria.info; согласия родителей на публикацию в рамках концепта не подтверждены — см. `docs/CONTENT-GAPS.md` §5.

## Демо онлайн

https://lordfour.github.io/pictoria-concept/ — статическая сборка в ветке `gh-pages`. Страница помечена `noindex`.

Обновить демо после изменений (Git Bash):

```bash
MSYS_NO_PATHCONV=1 PAGES_BASE=/pictoria-concept/ npm run build
cp dist/index.html dist/404.html   # SPA-fallback для прямых ссылок
npx gh-pages -d dist               # или вручную: закоммитить dist в ветку gh-pages
```

## Запуск

Требуется Node.js 20+ (проверено на Node 24).

```bash
cd pictoria-concept
npm install
npm run dev        # http://127.0.0.1:5173 — режим разработки
```

Production-сборка и локальный просмотр (так прототип лучше показывать на встрече):

```bash
npm run build      # тип-проверка + сборка в dist/
npm run preview    # http://127.0.0.1:4173
```

Язык можно открыть сразу ссылкой: `http://127.0.0.1:4173/?lang=ro`.

## Маршруты

| URL | Что это |
| --- | --- |
| `/` | Главная: семь сцен (First Stroke → Your Turn) |
| `/#explore` `/#journey` `/#gallery` `/#inside` `/#find` `/#contacts` | Якоря сцен |
| `/programs/drawing-painting` | Страница курса «Рисунок и живопись» |
| `/programs/digital-art` | Страница курса «Digital Art» (4 модуля) |
| `/programs/workshops` | Мастер-классы (демо-страница, формат не подтверждён) |
| `/enroll?program=…&studio=…&who=…` | Демо-форма записи; параметры предзаполняются из подбора |
| любой другой | Страница 404 |

## Стек

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Motion (`motion/react`) · React Router 7.
Шрифты Unbounded + Onest (fontsource, локально, кириллица и румынская латиница).
GSAP не используется: Motion закрывает все задачи (scroll-linked `pathLength`, `clip-path`, `whileInView`, spring).

## Структура

```
docs/                BRAND-CONCEPT · STORYBOARD · CONTENT-GAPS
src/index.css        дизайн-токены (@theme), кнопки, бумажная фактура, reduced-motion
src/i18n/            RU/RO словарь + контекст языка
src/data/            программы, студии, контакты, фото (всё — с pictoria.info)
src/scenes/          7 сцен главной страницы
src/pages/           Home · ProgramPage · EnrollPage · NotFound
src/components/      Header (+ мобильное меню), Footer, Img, Mark, Reveal, BrushDefs
public/img/          фото Pictoria в WebP, 640/1280 px
public/brand/        знак (дерево в круге), вырезан из растрового логотипа
_source-temp/        исходные загрузки с сайта (не попадают в сборку)
screenshots/         qa/ — скриншоты автотестов; presentation/ — подборка для показа
```

## Дизайн-токены

| Токен | Значение |
| --- | --- |
| `ink` | `#171321` |
| `plum` | `#32233D` |
| `canvas` | `#F2E9DB` |
| **`turquoise`** | **`#04BFB8`**: Pictoria Turquoise, сверен с файлом логотипа и CSS шапки pictoria.info |
| `turquoise-deep` | `#02706C`: бирюзовый для текста на светлом (4.9:1) |
| `coral` | `#EE685A` |
| `ochre` | `#F5C84D` |

## Что проверено

Автоматический прогон (Chrome headless, production-сборка), 32/32 PASS:

- главная: один `h1`, нет горизонтального переполнения на 1440 и 390 px;
- галерея: лайтбокс открывается, ← → листают, Esc закрывает, фокус возвращается;
- подбор: «Взрослый + Digital Art + Буюканы» → Digital Art на Рышкановке с пояснением; «Ребёнок + Пока не знаем + Чеканы» → Рисунок и живопись на Чеканах с подсказкой;
- CTA подбора → `/enroll` с предзаполненными направлением и студией;
- форма: пустая отправка → сводка ошибок с фокусом; корректная → экран «Заявка принята» (демо);
- три страницы программ и 404; мобильная липкая кнопка записи на странице курса;
- RU ↔ RO: `html[lang]` и тексты переключаются;
- клавиатура: первая остановка — «Перейти к содержанию», далее навигация, язык, CTA;
- мобильное меню: диалог, ловушка фокуса, Esc, закрытие по переходу;
- `prefers-reduced-motion`: липкие сцены отключены, всё показано в финальном состоянии;
- консоль без ошибок и предупреждений (desktop, mobile, reduced motion).

Скрипт QA лежит вне проекта (временный инструмент); скриншоты — в `screenshots/qa/`.

## Ограничения прототипа

- Форма ничего не отправляет и не сохраняет.
- Расписание в подборе — пример, помечен «Демо».
- Стоимость не показана нигде.
- Знак Pictoria — растровая маска из логотипа сайта; для продакшена нужен вектор.
- Румынский перевод рабочий, нужна вычитка носителем.
- Полный список вопросов к студии — `docs/CONTENT-GAPS.md`.
