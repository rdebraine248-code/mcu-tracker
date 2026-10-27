// every overlay pins the page behind it (an index too) and gives it back where it was; a closing box frees it at once, so a jump to another
// box lands; every index file names its universe
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, raftIn: 1, cpIn: 1, collIn: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  await p.evaluate(() => { DATA.timeline.forEach(e => state.checks['tl::' + e.t] = true); state.mvEver = 1; state.mode = 'chars'; persist(); });
  await p.reload(); await sleep(9000);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  for (const [name, open, close] of [['index', () => { openColl('cp'); collShow('ghost'); }, () => closeColl(true)], ['atlas', () => openAtlas(), () => closeAtlas(true)], ['file', () => openFile(), () => document.getElementById('fileBack') ? document.getElementById('fileBack').click() : null]]) {
    await p.evaluate(() => window.scrollTo(0, 1500)); await sleep(150);
    await p.evaluate(`(${open})()`); await sleep(400);
    await p.mouse.move(200, 600); await p.mouse.wheel(0, 1500); await sleep(300);
    ok(await p.evaluate(() => document.body.style.position === 'fixed' && document.body.style.top === '-1500px'), name + ': the page behind is pinned');
    await p.evaluate(`(${close})()`); await sleep(400);
    if (name === 'file') await p.evaluate(() => { if (fileOpen) { document.getElementById('filePanel').hidden = true; fileOpen = false; bodyFree(); } });
    ok(await p.evaluate(() => window.scrollY === 1500 && !document.body.style.position), name + ': the page comes back where it was ' + await p.evaluate(() => window.scrollY));
  }
  await p.evaluate(() => activate(document.querySelector('.tile[data-id="cx-iron-man"]'))); await sleep(1500);
  await p.evaluate(() => boxesAt('chars', ['cx-the-defenders'])); await sleep(1500);
  ok(await p.evaluate(() => { const r = document.querySelector('.tile[data-id="cx-the-defenders"]').getBoundingClientRect(); return r.top > -10 && r.bottom < innerHeight + 10; }), 'a jump from a box lands on the new box');
  for (const [m, id, want] of [['raft', 'winter-soldier', 'Sacred Timeline'], ['cp', 'ghost', 'Sacred Timeline'], ['coll', 'tesseract', 'Sacred Timeline']]) {
    await p.evaluate(([m, id]) => { closeColl(true); openColl(m === 'coll' ? undefined : m); collShow(id); }, [m, id]); await sleep(300);
    ok(await p.evaluate(want => [...document.querySelectorAll('.co-tiles div')].some(d => d.querySelector('small').textContent === 'Universe' && d.querySelector('b').textContent === want), want), m + ': the file names its universe');
  }
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
