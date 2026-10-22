// One entry per project. `thumb` is a file in assets/thumbs (960x504); projects without one get a type-only tile.
// `featured` projects have their own website and also appear in the carousel at the top.
// `try` is where someone can start using it; `code` is the repo.
// Groups are shown in this order, and projects in the order listed.
const gh = (repo) => `https://github.com/wonjoonSeol-WS/${repo}`;
const site = (repo) => `https://wonjoonseol-ws.github.io/${repo}/`;

export const groups = [
  {
    id: 'android',
    name: { en: 'On your Android phone', ko: '안드로이드 폰에서' },
    projects: [
      {
        id: 'fitgymlog',
        featured: true,
        thumb: { en: 'fitgymlog-en.webp', ko: 'fitgymlog-ko.webp' },
        name: 'FitGymLog',
        what: {
          en: 'A workout log you run from a Galaxy Fit band. Press play on the band to finish a set, feel a buzz when rest is over, load the bar by tapping plates.',
          ko: '갤럭시 핏 밴드로 조작하는 운동 기록 앱. 밴드에서 재생을 누르면 세트 완료, 휴식이 끝나면 진동, 원판을 눌러 무게를 올립니다.',
        },
        try: { en: site('fitgymlog'), ko: site('fitgymlog') + 'ko/' },
        code: gh('fitgymlog'),
      },
      {
        id: 'quietbuzz',
        featured: true,
        thumb: { en: 'quietbuzz-en.webp', ko: 'quietbuzz-ko.webp' },
        name: 'QuietBuzz',
        what: {
          en: 'Turn off vibration for every app in one tap, instead of going through them one by one. Only the apps you pick still buzz, and every notification still shows up.',
          ko: '모든 앱의 진동을 한 번에 끕니다. 앱마다 하나씩 끌 필요 없이, 고른 앱만 계속 진동하고 알림은 그대로 옵니다.',
        },
        try: { en: site('quietbuzz'), ko: site('quietbuzz') },
        code: gh('quietbuzz'),
      },
      {
        id: 'morphe-patches',
        thumb: { en: 'morphe-patches.webp' },
        name: 'Block KakaoPay',
        what: {
          en: 'A Morphe patch bundle for KakaoTalk: turns off KakaoPay on a patched app and removes the ad slots other patch sources leave behind.',
          ko: '카카오톡용 Morphe 패치 묶음. 패치한 앱에서 카카오페이를 끄고, 다른 패치가 남겨 둔 광고 자리를 지웁니다.',
        },
        try: { en: 'https://morphe.software/add-source?github=wonjoonSeol-WS/morphe-patches' },
        tryLabel: { en: 'Add to Morphe', ko: 'Morphe에 추가' },
        code: gh('morphe-patches'),
      },
    ],
  },
  {
    id: 'browser',
    name: { en: 'In your browser', ko: '브라우저에서' },
    projects: [
      {
        id: 'subpair',
        featured: true,
        thumb: { en: 'subpair.webp' },
        name: 'Subpair',
        what: {
          en: 'Two subtitle lines at once on Netflix and Jellyfin, with a transcript, line replay and auto-pause. A free, open alternative to Language Reactor.',
          ko: '넷플릭스와 젤리핀에서 자막 두 줄을 동시에. 대본, 한 줄 다시 듣기, 자동 일시정지까지. 무료 오픈소스 Language Reactor 대안입니다.',
        },
        try: { en: site('subpair'), ko: site('subpair') + 'ko/' },
        code: gh('subpair'),
      },
    ],
  },
  {
    id: 'claude',
    name: { en: 'Inside Claude', ko: 'Claude 안에서' },
    projects: [
      {
        id: 'dice-roguelife',
        featured: true,
        thumb: { en: 'dice-roguelife.webp' },
        name: 'Dice Roguelife',
        what: {
          en: 'A roguelike chat game. Dice roll your world, race and talent, and Claude narrates each life like a web novel. English, Korean and Japanese.',
          ko: '주사위가 세계, 종족, 재능을 정하고 Claude가 그 인생을 웹소설처럼 들려주는 로그라이크 채팅 게임. 한국어, 영어, 일본어.',
        },
        try: { en: site('dice-roguelife'), ko: site('dice-roguelife') + '?lang=ko' },
        code: gh('dice-roguelife'),
      },
      {
        id: 'language-mistake-tracker',
        thumb: { en: 'language-mistake-tracker.webp' },
        name: 'Language mistake tracker',
        what: {
          en: 'Turns the corrections Claude gives you in chat into a review sheet: your most common mistakes, repeated habits and rules with memory tricks.',
          ko: '대화 중 Claude가 고쳐 준 표현을 복습 시트로 모아 줍니다. 자주 하는 실수, 반복되는 습관, 외우기 쉬운 규칙까지.',
        },
        try: { en: gh('language-mistake-tracker') + '#install-and-update-in-the-claude-app-phones-too', ko: gh('language-mistake-tracker') + '/blob/main/README.ko.md' },
        tryLabel: { en: 'Install', ko: '설치하기' },
        code: gh('language-mistake-tracker'),
      },
      {
        id: 'claude-side-insights',
        thumb: { en: 'claude-side-insights.webp' },
        name: 'Side Insights',
        what: {
          en: 'A side panel for Claude Code. Checks every question got answered, walks through the logic of changed code, and shows tool calls live.',
          ko: 'Claude Code 옆에 붙는 패널. 질문에 빠짐없이 답했는지 확인하고, 바뀐 코드의 흐름을 짚어 주고, 도구 호출을 실시간으로 보여 줍니다.',
        },
        try: { en: gh('claude-side-insights') + '#install', ko: gh('claude-side-insights') + '/blob/main/README.ko.md' },
        tryLabel: { en: 'Install', ko: '설치하기' },
        code: gh('claude-side-insights'),
      },
    ],
  },
  {
    id: 'desktop',
    name: { en: 'On your computer', ko: '컴퓨터에서' },
    projects: [
      {
        id: 'nanazip-auto-encoding',
        thumb: { en: 'nanazip-auto-encoding.webp' },
        name: 'NanaZip auto encoding',
        what: {
          en: 'Windows right-click menus that extract with NanaZip and pick the file name encoding for you, so Japanese ZIPs stop coming out garbled.',
          ko: 'NanaZip으로 압축을 풀 때 파일 이름 인코딩을 알아서 골라 주는 윈도우 우클릭 메뉴. 일본어 ZIP 이름이 더 이상 깨지지 않습니다.',
        },
        try: { en: gh('nanazip-auto-encoding'), ko: gh('nanazip-auto-encoding') + '/blob/main/README.ko.md' },
        tryLabel: { en: 'Install', ko: '설치하기' },
        code: gh('nanazip-auto-encoding'),
      },
      {
        id: 'subsync-repair',
        name: 'subsync-repair',
        what: {
          en: 'Fixes subtitles whose timing drifts in pieces by aligning them to a subtitle in another language. Command line, Bazarr hook, and a local server.',
          ko: '중간중간 싱크가 어긋나는 자막을 다른 언어 자막에 맞춰 고칩니다. 명령줄, Bazarr 훅, 로컬 서버로 쓸 수 있습니다.',
        },
        code: gh('subsync-repair'),
      },
      {
        id: 'otpauth-to-2fas',
        name: 'otpauth-to-2fas',
        what: {
          en: 'Moves your codes from OTP Auth on iOS to 2FAS or Aegis in one step, by decrypting the backup into an Aegis vault. No QR codes one by one.',
          ko: 'iOS OTP Auth 백업을 풀어 Aegis 보관함으로 만들어, 2FAS나 Aegis로 한 번에 옮깁니다. QR 코드를 하나씩 찍지 않아도 됩니다.',
        },
        code: gh('otpauth-to-2fas'),
      },
    ],
  },
];
