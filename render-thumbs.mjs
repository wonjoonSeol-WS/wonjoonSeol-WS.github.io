// Renders thumbs/<name>.html into assets/thumbs/<name>.webp (960x504, shown on the cards) and
// assets/thumbs/full/<name>.webp (2400x1260, for sharp screens and the enlarged view), with headless Chrome.
// Run: node render-thumbs.mjs [name ...]   (no names renders every template)
// Set CHROME to the browser binary when it is not in the usual place.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const WIDTH = 960;
const HEIGHT = 504;
const SIZES = [
  { dir: 'assets/thumbs', scale: 1, quality: 90 },
  { dir: 'assets/thumbs/full', scale: 2.5, quality: 90 },
];
const CHROME = process.env.CHROME ?? [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => existsSync(p));

const names = process.argv.length > 2
  ? process.argv.slice(2)
  : readdirSync('thumbs').filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -'.html'.length));

// A minimal DevTools Protocol client: send() resolves with a command's result, next() with the next event of a kind.
function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  const waiting = [];
  let id = 0;
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id) {
      const { ok, fail } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) fail(new Error(msg.error.message));
      else ok(msg.result);
      return;
    }
    const i = waiting.findIndex((w) => w.method === msg.method);
    if (i >= 0) waiting.splice(i, 1)[0].ok(msg.params);
  });
  return new Promise((ok) => ws.addEventListener('open', () => ok({
    send: (method, params = {}) => new Promise((ok, fail) => {
      pending.set(++id, { ok, fail });
      ws.send(JSON.stringify({ id, method, params }));
    }),
    next: (method) => new Promise((ok) => waiting.push({ method, ok })),
    close: () => ws.close(),
  })));
}

const profile = mkdtempSync(join(tmpdir(), 'render-thumbs-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--force-color-profile=srgb', 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] });

try {
  const browser = await new Promise((ok, fail) => {
    let log = '';
    chrome.stderr.on('data', (d) => {
      log += d;
      const m = log.match(/DevTools listening on ws:\/\/([^/\s]+)\//);
      if (m) ok(m[1]);
    });
    chrome.on('exit', () => fail(new Error(`Chrome exited before it was ready:\n${log}`)));
  });
  const tabs = await (await fetch(`http://${browser}/json/list`)).json();
  const page = await connect(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await page.send('Page.enable');

  for (const name of names) {
    const file = resolve('thumbs', `${name}.html`);
    if (!existsSync(file)) throw new Error(`No template ${file}`);
    for (const { dir, scale, quality } of SIZES) {
      await page.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: scale, mobile: false });
      const loaded = page.next('Page.loadEventFired');
      await page.send('Page.navigate', { url: pathToFileURL(file).href });
      await loaded;
      // wait for web fonts and every image, then two frames so the last layout is painted
      await page.send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `document.fonts.ready
          .then(() => Promise.all(Array.from(document.images, (i) => i.decode().catch(() => {}))))
          .then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))`,
      });
      const { data } = await page.send('Page.captureScreenshot', { format: 'webp', quality });
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, `${name}.webp`), Buffer.from(data, 'base64'));
    }
    console.log(`Rendered ${name}`);
  }
  page.close();
} finally {
  chrome.kill();
  await new Promise((r) => (chrome.exitCode === null ? chrome.on('exit', r) : r()));
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
