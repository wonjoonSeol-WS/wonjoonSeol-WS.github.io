// One entry per project. `thumb` is a file in assets/thumbs (960x504), rendered from thumbs/<name>.html by
// render-thumbs.mjs along with a 2400x1260 copy in assets/thumbs/full; projects without one get a type-only tile.
// `featured` projects have their own website and also appear in the carousel at the top.
// A project's name links to that website (`try`), or to `code` when it is not featured.
// `warn` is shown above the links when trying it blindly can hurt. `what` may contain [text](https://...) links.
// `also` is an optional second way to use it ({ label, url }).
// `try` is where someone can start using it; `code` is the repo (leave it out while the repo is private).
// `deprecated` marks an archived project on its card and always puts it at the end of the grid.
// `license` is the SPDX id from the repo LICENSE, shown on the card.
// Groups are shown in this order, and projects in the order listed, except that `top` comes first,
// then everything else, then `bottom`, then `deprecated` projects.
const gh = (repo) => `https://github.com/wonjoonSeol/${repo}`;
const site = (repo) => `https://wonjoonseol.github.io/${repo}/`;

// Project ids shown first, in this order, in both the carousel and the project grid.
export const top = ['fitgymlog', 'dice-roguelife'];
// Project ids shown last, just before the deprecated ones.
export const bottom = ['property-simulator'];

export const groups = [
  {
    id: 'android',
    name: { en: 'On your Android phone', ko: '안드로이드 폰에서', ja: 'Androidスマホで' },
    projects: [
      {
        id: 'fitgymlog',
        license: 'MIT',
        featured: true,
        thumb: { en: 'fitgymlog-en.webp', ko: 'fitgymlog-ko.webp' },
        name: 'FitGymLog',
        what: {
          en: 'A workout log you run from a Galaxy Fit band. Press play on the band to finish a set, feel a buzz when rest is over, load the bar by tapping plates.',
          ko: '갤럭시 핏 밴드로 조작하는 운동 기록 앱이에요. 밴드에서 재생을 누르면 세트가 끝나고, 쉬는 시간이 끝나면 진동이 와요. 원판을 눌러 무게를 올려요.',
          ja: 'Galaxy Fitバンドで操作する筋トレ記録アプリ。バンドの再生ボタンでセット完了、休憩が終わると振動でお知らせ、プレートをタップしてバーの重さを組めます。',
        },
        try: { en: site('fitgymlog'), ko: site('fitgymlog') + 'ko/' },
        code: gh('fitgymlog'),
      },
      {
        id: 'quietbuzz',
        license: 'MIT',
        featured: true,
        thumb: { en: 'quietbuzz-en.webp', ko: 'quietbuzz-ko.webp' },
        name: 'QuietBuzz',
        what: {
          en: 'Turn off vibration for every app in one tap, instead of going through them one by one. Only the apps you pick still buzz, and every notification still shows up.',
          ko: '모든 앱의 진동을 한 번에 꺼요. 앱마다 하나씩 끌 필요 없이 고른 앱만 진동하고, 알림은 그대로 와요.',
          ja: 'すべてのアプリのバイブをワンタップでオフに。1つずつ切り替える必要はなく、選んだアプリだけが振動し、通知はすべてそのまま届きます。',
        },
        try: { en: site('quietbuzz'), ko: site('quietbuzz') },
        code: gh('quietbuzz'),
      },
      {
        id: 'morphe-patches',
        license: 'GPL-3.0',
        thumb: { en: 'morphe-patches.webp' },
        name: { en: 'KakaoTalk patches for Morphe', ko: '카카오톡 Morphe 패치', ja: 'Morphe用カカオトークパッチ' },
        what: {
          en: 'Assorted KakaoTalk patches for Morphe, made from the decompiled app.',
          ko: '디컴파일한 앱을 바탕으로 만든 카카오톡용 Morphe 패치 모음이에요.',
          ja: '逆コンパイルしたアプリをもとに作った、Morphe用のカカオトークパッチ集。',
        },
        warn: {
          en: 'Warning: read the README before you patch. Skipping its steps can get your KakaoTalk account banned.',
          ko: '주의: README를 꼭 읽고 그대로 따라 하세요. 건너뛰면 카카오톡 계정이 차단될 수 있어요.',
          ja: '注意: パッチを当てる前に必ずREADMEを読んでください。手順を飛ばすとカカオトークのアカウントが停止されることがあります。',
        },
        try: { en: gh('morphe-patches') + '#readme' },
        tryLabel: { en: 'Read the guide first', ko: '가이드부터 읽기', ja: 'まずガイドを読む' },
        code: gh('morphe-patches'),
      },
    ],
  },
  {
    id: 'browser',
    name: { en: 'In your browser', ko: '브라우저에서', ja: 'ブラウザで' },
    projects: [
      {
        id: 'subpair',
        license: 'MIT',
        featured: true,
        thumb: { en: 'subpair.webp' },
        name: 'Subpair',
        what: {
          en: 'Two subtitle lines at once on Netflix and Jellyfin, with a transcript, line replay and auto-pause. A free, open alternative to [Language Reactor](https://www.languagereactor.com/).',
          ko: '넷플릭스와 젤리핀에서 자막 두 줄을 같이 볼 수 있어요. 대본, 한 줄 다시 듣기, 자동 일시정지도 돼요. [Language Reactor](https://www.languagereactor.com/)를 대신할 무료 오픈소스예요.',
          ja: 'NetflixとJellyfinで字幕を2行同時に表示。文字起こし、1行リピート、自動一時停止つき。[Language Reactor](https://www.languagereactor.com/)の無料オープンソース代替です。',
        },
        try: { en: site('subpair'), ko: site('subpair') + 'ko/', ja: site('subpair') + 'ja/' },
        code: gh('subpair'),
      },
      {
        id: 'property-simulator',
        featured: true,
        thumb: { en: 'property-simulator.webp' },
        name: { en: 'Property simulator', ko: '부동산 투자 시뮬레이터', ja: '不動産投資シミュレーター' },
        what: {
          en: 'Puts the same money into a Korean redevelopment unit, an apartment now, or rent plus the S&P 500, and shows what is left after taxes, loan limits and interest. Korean only.',
          ko: '같은 돈을 재개발 입주권, 아파트, S&P500에 넣으면 각각 얼마가 남는지 세금, 대출 한도, 이자까지 빼고 비교해요.',
          ja: '同じ資金で韓国の再開発入居権、今すぐのマンション購入、賃貸に住みながらのS&P500積立を比べ、税金、ローン上限、利息を引いていくら残るかを示します。韓国語のみ。',
        },
        try: { en: 'https://property-simulator-three.vercel.app' },
      },
      {
        id: 'property-times',
        license: 'MIT',
        deprecated: true,
        thumb: { en: 'property-times.webp' },
        name: { en: 'Property Times', ko: '부동산 Times', ja: '不動産Times' },
        what: {
          en: 'LLM summaries, tags and a watch-or-skip rating for new videos from Korean real estate YouTube channels, built from subtitles pulled with yt-dlp. Archived and no longer maintained.',
          ko: '부동산 유튜브 채널에 새 영상이 올라오면 yt-dlp로 자막을 가져와 LLM이 요약하고, 태그를 달고, 직접 볼 만한지 알려 줘요. 지금은 보관만 하고 더 이상 관리하지 않아요.',
          ja: '韓国の不動産YouTubeチャンネルの新着動画を、yt-dlpで取得した字幕からLLMが要約し、タグを付け、見る価値があるかを評価します。アーカイブ済みで、今後はメンテナンスしません。',
        },
        code: gh('property-times'),
      },
    ],
  },
  {
    id: 'tv',
    name: { en: 'On your LG TV', ko: 'LG TV에서', ja: 'LGテレビで' },
    projects: [
      {
        id: 'lg-luma',
        license: 'MIT',
        thumb: { en: 'lg-luma-en.webp', ko: 'lg-luma-ko.webp' },
        name: { en: 'Luma for webOS 6', ko: 'webOS 6용 Luma', ja: 'webOS 6向けLuma' },
        what: {
          en: 'An Apple TV style Home screen for rooted LG TVs. My Korean app name, icon and logo fixes are now part of [Luma](https://github.com/ecklf/lg-luma), and my fork also replaces LG Home on webOS 6.',
          ko: '루팅한 LG TV에 쓰는 애플 TV 스타일 홈 화면이에요. 제가 고친 한글 앱 이름, 아이콘, 로고는 [Luma](https://github.com/ecklf/lg-luma)에 합쳐졌고, 제 포크에서는 webOS 6에서도 LG 홈을 바꿀 수 있어요.',
          ja: 'ルート化したLGテレビ向けの、Apple TV風のホーム画面。韓国語のアプリ名、アイコン、ロゴの修正は[Luma](https://github.com/ecklf/lg-luma)本体に取り込まれ、私のフォークではwebOS 6でもLGのホームを置き換えられます。',
        },
        warn: {
          en: 'Needs a rooted TV. The risk of bricking it is low, but read the README before you install.',
          ko: '루팅한 TV가 필요해요. 벽돌이 될 위험은 낮지만, 설치하기 전에 README를 꼭 읽어 주세요.',
          ja: 'ルート化したテレビが必要です。文鎮化のリスクは低いですが、インストール前に必ずREADMEを読んでください。',
        },
        try: { en: gh('lg-luma') + '#about-this-fork', ko: gh('lg-luma') + '/blob/main/readme.ko.md' },
        tryLabel: { en: 'Install', ko: '설치하기', ja: 'インストール' },
        code: gh('lg-luma'),
      },
    ],
  },
  {
    id: 'games',
    name: { en: 'Games', ko: '게임', ja: 'ゲーム' },
    projects: [
      {
        id: 'dice-roguelife',
        license: 'MIT',
        featured: true,
        thumb: { en: 'dice-roguelife-en.webp', ko: 'dice-roguelife-ko.webp', ja: 'dice-roguelife-ja.webp' },
        name: 'Dice Roguelife',
        what: {
          en: 'Open-source alternative to [Crack](https://crack.wrtn.ai/), the Korean AI character chat app: a roguelike AI chat game you play on your Claude subscription, or with an API key or a self-hosted local model.',
          ko: '오픈소스로 만든 [크랙AI](https://crack.wrtn.ai/) 대안, 로그라이크 AI 채팅 게임이에요. Claude 구독, API 키, 직접 띄운 로컬 모델로 즐길 수 있어요.',
          ja: '韓国のAIキャラクターチャットアプリ[Crack](https://crack.wrtn.ai/)のオープンソース代替。Claudeのサブスクリプション、APIキー、自前のローカルモデルで遊べるローグライクAIチャットゲーム。',
        },
        try: { en: site('dice-roguelife'), ko: site('dice-roguelife') + '?lang=ko', ja: site('dice-roguelife') + '?lang=ja' },
        tryLabel: { en: 'Play in Claude', ko: 'Claude에서 하기', ja: 'Claudeで遊ぶ' },
        also: {
          label: { en: 'Run it yourself', ko: '직접 실행하기', ja: '自分で動かす' },
          url: gh('dice-roguelife') + '/tree/main/standalone#readme',
        },
        code: gh('dice-roguelife'),
      },
    ],
  },
  {
    id: 'claude',
    name: { en: 'Inside Claude', ko: 'Claude 안에서', ja: 'Claudeの中で' },
    projects: [
      {
        id: 'claude-side-insights',
        license: 'MIT',
        thumb: { en: 'claude-side-insights.webp' },
        name: 'Side Insights',
        what: {
          en: 'A side panel for Claude Code. Checks every question got answered, walks through the logic of changed code, and shows tool calls live.',
          ko: 'Claude Code 옆에 붙는 패널이에요. 질문에 빠짐없이 답했는지 확인하고, 바뀐 코드의 흐름을 짚어 주고, 도구 호출을 실시간으로 보여 줘요.',
          ja: 'Claude Codeの横に置くパネル。すべての質問に答えたかを確認し、変更したコードの流れをたどり、ツール呼び出しをリアルタイムで表示します。',
        },
        try: { en: gh('claude-side-insights') + '#install', ko: gh('claude-side-insights') + '/blob/main/README.ko.md', ja: gh('claude-side-insights') + '/blob/main/README.ja.md' },
        tryLabel: { en: 'Install', ko: '설치하기', ja: 'インストール' },
        code: gh('claude-side-insights'),
      },
      {
        id: 'language-mistake-tracker',
        license: 'MIT',
        thumb: { en: 'language-mistake-tracker.webp' },
        name: 'Language mistake tracker',
        what: {
          en: 'Turns the corrections Claude gives you in chat into a review sheet: your most common mistakes, repeated habits and rules with memory tricks.',
          ko: '대화하다가 Claude가 고쳐 준 표현을 복습 시트로 모아 줘요. 자주 하는 실수, 반복되는 습관, 외우기 쉬운 규칙까지 정리해요.',
          ja: '会話の中でClaudeが直してくれた表現を復習シートにまとめます。よくある間違い、繰り返しがちな癖、覚え方つきのルールまで。',
        },
        try: { en: gh('language-mistake-tracker') + '#install-and-update-in-the-claude-app-phones-too', ko: gh('language-mistake-tracker') + '/blob/main/README.ko.md' },
        tryLabel: { en: 'Install', ko: '설치하기', ja: 'インストール' },
        code: gh('language-mistake-tracker'),
      },
    ],
  },
  {
    id: 'desktop',
    name: { en: 'On your computer', ko: '컴퓨터에서', ja: 'パソコンで' },
    projects: [
      {
        id: 'nanazip-auto-encoding',
        license: 'MIT',
        thumb: { en: 'nanazip-auto-encoding.webp' },
        name: 'NanaZip auto encoding',
        what: {
          en: 'Windows right-click menus that extract with NanaZip and pick the file name encoding for you, so Japanese ZIPs stop coming out garbled.',
          ko: 'NanaZip으로 압축을 풀 때 파일 이름 인코딩을 알아서 골라 주는 윈도우 우클릭 메뉴예요. 일본어 ZIP 파일 이름이 더는 깨지지 않아요.',
          ja: 'NanaZipで展開するときにファイル名の文字コードを自動で選ぶ、Windowsの右クリックメニュー。日本語のZIPのファイル名がもう文字化けしません。',
        },
        try: { en: gh('nanazip-auto-encoding'), ko: gh('nanazip-auto-encoding') + '/blob/main/README.ko.md' },
        tryLabel: { en: 'Install', ko: '설치하기', ja: 'インストール' },
        code: gh('nanazip-auto-encoding'),
      },
      {
        id: 'subsync-repair',
        license: 'MIT',
        thumb: { en: 'subsync-repair-en.webp', ko: 'subsync-repair-ko.webp' },
        name: 'subsync-repair',
        what: {
          en: 'Fixes subtitles whose timing drifts in pieces by aligning them to a subtitle in another language. Command line, Bazarr hook, and a local server.',
          ko: '중간중간 싱크가 어긋나는 자막을 다른 언어 자막에 맞춰 고쳐요. 명령줄, Bazarr 훅, 로컬 서버로 쓸 수 있어요.',
          ja: '途中で少しずつタイミングがずれる字幕を、別の言語の字幕に合わせて直します。コマンドライン、Bazarrフック、ローカルサーバーで使えます。',
        },
        code: gh('subsync-repair'),
      },
    ],
  },
  {
    id: 'tools',
    name: { en: 'Tools', ko: '도구', ja: 'ツール' },
    projects: [
      {
        id: 'otpauth-to-2fas',
        license: 'GPL-3.0',
        thumb: { en: 'otpauth-to-2fas-en.webp', ko: 'otpauth-to-2fas-ko.webp' },
        name: 'otpauth-to-2fas',
        what: {
          en: 'Moves your codes from OTP Auth on iOS to 2FAS or Aegis in one step, by decrypting the backup into an Aegis vault. No QR codes one by one.',
          ko: 'iOS OTP Auth 백업을 풀어 Aegis 보관함으로 만들고, 2FAS나 Aegis로 한 번에 옮겨요. QR 코드를 하나씩 찍지 않아도 돼요.',
          ja: 'iOSのOTP AuthのバックアップをAegisの保管庫に復号して、2FASやAegisへ一度に移します。QRコードを1つずつ読み込む必要はありません。',
        },
        code: gh('otpauth-to-2fas'),
      },
    ],
  },
];
