// Builds index.html (English) and ko/index.html (Korean) from projects.mjs.
// Run: node build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { groups } from './projects.mjs';

const ORIGIN = 'https://wonjoonseol-ws.github.io/';
// GoatCounter site code (the name before .goatcounter.com); empty means no counter.
const GOATCOUNTER = 'wonjoonseol';

const text = {
  en: {
    title: 'Wonjoon Seol: open source',
    description: 'Small open source tools by Wonjoon Seol: Android apps, a subtitle extension, Claude add-ons and Windows utilities.',
    h1: 'Small tools, free to try.',
    lead: 'Things I built for my own problems and put on GitHub. Some are polished, some are slop. Pick one by where you would use it.',
    by: 'Wonjoon Seol on GitHub',
    sites: 'Projects with their own website',
    prev: 'Previous project',
    next: 'Next project',
    visit: 'Visit the site',
    allProjects: 'All projects',
    filter: 'Show projects for',
    everything: 'All',
    try: 'Try it',
    code: 'Code',
    deprecated: 'Deprecated',
    fromNote: (name) => `You came from ${name}. Here is everything else.`,
    here: 'You came from this one',
    footer: 'Everything is free and open source. Found a bug? Open an issue on that project.',
    all: 'All repositories on GitHub',
    langs: [['en', './', 'EN', true], ['ko', 'ko/', '한국어', false]],
    root: './',
  },
  ko: {
    title: 'Wonjoon Seol: 오픈소스',
    description: 'Wonjoon Seol이 만든 작은 오픈소스 도구 모음: 안드로이드 앱, 자막 확장 프로그램, Claude 애드온, 윈도우 도구.',
    h1: '작은 도구들, 마음껏 써 보세요.',
    lead: '제 불편을 풀려고 만든 것들을 GitHub에 올려 두었습니다. 잘 다듬은 것도, 대충 만든 것도 있어요. 어디서 쓸지로 골라 보세요.',
    by: 'GitHub의 Wonjoon Seol',
    sites: '웹사이트가 있는 프로젝트',
    prev: '이전 프로젝트',
    next: '다음 프로젝트',
    visit: '사이트 가기',
    allProjects: '전체 프로젝트',
    filter: '프로젝트 고르기',
    everything: '전체',
    try: '써 보기',
    code: '코드',
    deprecated: '지원 종료',
    fromNote: (name) => `${name}에서 오셨네요. 나머지 프로젝트도 둘러보세요.`,
    here: '여기서 오셨어요',
    footer: '모두 무료 오픈소스입니다. 버그를 찾으면 해당 프로젝트에 이슈를 남겨 주세요.',
    all: 'GitHub의 전체 저장소',
    langs: [['en', '../', 'EN', false], ['ko', './', '한국어', true]],
    root: '../',
  },
};

// short platform names: the filter chips and the label on each card
const SHORT = {
  android: { en: 'Android', ko: '안드로이드' },
  browser: { en: 'Web', ko: '웹' },
  games: { en: 'Games', ko: '게임' },
  claude: { en: 'Claude', ko: 'Claude' },
  desktop: { en: 'PC', ko: 'PC' },
  tools: { en: 'Tools', ko: '도구' },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pick = (obj, lang) => (typeof obj === 'string' ? obj : obj ? obj[lang] ?? obj.en : undefined);
// Escapes text, then turns [label](https://url) into links.
const rich = (s) => esc(s).replace(/\[([^\]]+)\]\((https:[^)\s]+)\)/g, (_, label, url) => `<a href="${url}">${label}</a>`);
const warn = (p, lang) => (p.warn ? `<p class="warn" role="note">${esc(pick(p.warn, lang))}</p>` : '');
const count = (name) => (GOATCOUNTER ? ` data-goatcounter-click="${name}"` : '');

function thumb(p, lang, eager = false) {
  const file = pick(p.thumb, lang);
  if (!file) return `<div class="thumb thumb-type" aria-hidden="true"><span>${esc(pick(p.name, lang))}</span></div>`;
  return `<img class="thumb" src="${text[lang].root}assets/thumbs/${file}" width="960" height="504" alt=""${eager ? '' : ' loading="lazy"'}>`;
}

function also(p, lang) {
  return p.also ? `<a class="also" href="${esc(p.also.url)}"${count(`also-${p.id}`)}>${esc(pick(p.also.label, lang))}</a>` : '';
}

function links(p, lang) {
  const t = text[lang];
  const tryUrl = pick(p.try, lang);
  const tryLabel = pick(p.tryLabel, lang) ?? t.try;
  return `<p class="links">${tryUrl ? `<a class="try" href="${esc(tryUrl)}"${count(`try-${p.id}`)}>${esc(tryLabel)}</a>` : ''}${also(p, lang)}<a class="code" href="${esc(p.code)}"${count(`code-${p.id}`)}>${t.code}</a></p>`;
}

function slide(p, lang, i, n) {
  const t = text[lang];
  return `
        <li class="slide" id="slide-${p.id}" aria-roledescription="slide" aria-label="${i + 1} / ${n}: ${esc(pick(p.name, lang))}">
          <a class="slide-shot" href="${esc(pick(p.try, lang))}" tabindex="-1"${count(`slide-${p.id}`)}>${thumb(p, lang, i === 0)}</a>
          <div class="slide-text">
            <h3 class="slide-name">${esc(pick(p.name, lang))}</h3>
            <p class="what">${rich(pick(p.what, lang))}</p>
          ${warn(p, lang)}
            <p class="links"><a class="try" href="${esc(pick(p.try, lang))}"${count(`try-${p.id}`)}>${esc(pick(p.tryLabel, lang) ?? t.visit)}</a>${also(p, lang)}<a class="code" href="${esc(p.code)}"${count(`code-${p.id}`)}>${t.code}</a></p>
          </div>
        </li>`;
}

function card(p, g, lang, i) {
  const t = text[lang];
  return `
        <li class="card" id="${p.id}" data-group="${g.id}" data-name="${esc(pick(p.name, lang))}">
          ${thumb(p, lang, i < 4)}
          <div class="card-body">
          <p class="platform">${esc(pick(SHORT[g.id], lang))}${p.deprecated ? `<span class="deprecated">${t.deprecated}</span>` : ''}</p>
          <h3 class="name">${esc(pick(p.name, lang))}</h3>
          <p class="here-note">${t.here}</p>
          <p class="what">${rich(pick(p.what, lang))}</p>
          ${warn(p, lang)}
          ${links(p, lang)}
          </div>
        </li>`;
}

function page(lang) {
  const t = text[lang];
  const other = lang === 'en' ? 'ko' : 'en';
  const featured = groups.flatMap((g) => g.projects).filter((p) => p.featured);
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>${esc(t.title)}</title>
  <meta name="description" content="${esc(t.description)}">
  <meta property="og:title" content="${esc(t.title)}">
  <meta property="og:description" content="${esc(t.description)}">
  <link rel="alternate" hreflang="${other}" href="${ORIGIN}${other === 'ko' ? 'ko/' : ''}">
  <link rel="icon" href="${t.root}assets/icon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Instrument+Sans:wght@400;500;600&display=swap">
  ${lang === 'ko' ? '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">\n  ' : ''}<link rel="stylesheet" href="${t.root}assets/style.css">
  ${GOATCOUNTER ? `<script data-goatcounter="https://${GOATCOUNTER}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>` : ''}
</head>
<body>
  <header class="top wrap">
    <a class="by" href="https://github.com/wonjoonSeol-WS">${t.by}</a>
    <nav class="languages" aria-label="Language">
      ${t.langs.map(([l, href, label, cur]) => `<a href="${href}" lang="${l}"${cur ? ' aria-current="true"' : ''}>${label}</a>`).join('\n      ')}
    </nav>
  </header>

  <main class="wrap">
    <section class="intro">
      <h1>${t.h1}</h1>
      <p class="lead">${t.lead}</p>
      <p class="from-note" hidden></p>
    </section>

    <section class="carousel" aria-roledescription="carousel" aria-labelledby="sites-h">
      <div class="carousel-head">
        <h2 id="sites-h">${t.sites}</h2>
        <div class="carousel-controls">
          <button type="button" class="step" data-step="-1" aria-label="${t.prev}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
          <button type="button" class="step" data-step="1" aria-label="${t.next}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
        </div>
      </div>
      <ul class="track" tabindex="0">${featured.map((p, i) => slide(p, lang, i, featured.length)).join('')}
      </ul>
    </section>

    <section class="all-projects" aria-labelledby="all-h">
    <h2 class="section-h" id="all-h">${t.allProjects}</h2>
    <nav class="filters" aria-label="${t.filter}">
      <button type="button" data-filter="all" aria-pressed="true">${t.everything}</button>
      ${groups.map((g) => `<button type="button" data-filter="${g.id}" aria-pressed="false">${esc(pick(SHORT[g.id], lang))}</button>`).join('\n      ')}
    </nav>

    <ul class="grid">${groups.flatMap((g) => g.projects.map((p) => [p, g])).map(([p, g], i) => card(p, g, lang, i)).join('')}
    </ul>
    </section>
  </main>

  <footer class="bottom wrap">
    <p>${t.footer}</p>
    <a href="https://github.com/wonjoonSeol-WS?tab=repositories">${t.all}</a>
  </footer>

  <script>
    (function () {
      // Carousel: arrow buttons and arrow keys step through the slides; it also moves on its own every 5 s,
      // pausing while the pointer or keyboard focus is on it, and never for people who prefer reduced motion.
      var carousel = document.querySelector('.carousel');
      var track = document.querySelector('.track');
      var slides = Array.prototype.slice.call(track.children);
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function current() { return Math.round(track.scrollLeft / track.clientWidth); }
      function go(i) {
        i = (i + slides.length) % slides.length;
        track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
      }
      document.querySelectorAll('.step').forEach(function (b) {
        b.addEventListener('click', function () { go(current() + Number(b.getAttribute('data-step'))); });
      });
      track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
      });
      var paused = false;
      carousel.addEventListener('pointerenter', function () { paused = true; });
      carousel.addEventListener('pointerleave', function () { paused = false; });
      carousel.addEventListener('focusin', function () { paused = true; });
      carousel.addEventListener('focusout', function () { paused = false; });
      if (!reduce) setInterval(function () { if (!paused && !document.hidden) go(current() + 1); }, 5000);

      // Filter chips: show only the projects for one platform (everything is visible without script).
      var cards = Array.prototype.slice.call(document.querySelectorAll('.grid .card'));
      var chips = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
      // a card left alone on the last row of three spans the row (styled wide on desktop only)
      function balance() {
        var shown = cards.filter(function (c) { return !c.hidden; });
        cards.forEach(function (c) { c.classList.remove('wide'); });
        if (shown.length % 3 === 1) shown[shown.length - 1].classList.add('wide');
      }
      chips.forEach(function (b) {
        b.addEventListener('click', function () {
          var f = b.getAttribute('data-filter');
          chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
          cards.forEach(function (c) { c.hidden = f !== 'all' && c.getAttribute('data-group') !== f; });
          balance();
        });
      });
      balance();

      // ?from=<project id>: mark the project the visitor came from.
      var from = new URLSearchParams(location.search).get('from');
      var card = from && document.getElementById(from);
      if (!card || !card.classList.contains('card')) return;
      card.classList.add('is-from');
      var note = document.querySelector('.from-note');
      note.textContent = ${JSON.stringify(t.fromNote('%s'))}.replace('%s', card.getAttribute('data-name'));
      note.hidden = false;
    })();
  </script>
</body>
</html>
`;
}

writeFileSync('index.html', page('en'));
mkdirSync('ko', { recursive: true });
writeFileSync('ko/index.html', page('ko'));
console.log('Built index.html and ko/index.html');
