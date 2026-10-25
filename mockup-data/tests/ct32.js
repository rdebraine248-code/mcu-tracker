const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 }, isMobile: true, hasTouch: true });
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: require('fs').readFileSync(process.argv[2], 'utf8'), contentType: 'text/html' }); return r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://t/'); await sleep(2500);
  // someone who already used the old Collection
  await p.evaluate(() => { state.coll = { tesseract: 1 }; DATA.chapters.filter(c => c.num && c.num <= 6).forEach(c => c.items.forEach(i => state.checks[ck(c, i.t)] = true)); persist(); });
  const r = await p.evaluate(() => { openAtlas(); openColl(); return { cases: document.querySelectorAll('.cx-case').length, intake: (document.querySelector('.cx-intake') || {}).textContent, egg: !!state.eggs.collector }; });
  const rec = await p.evaluate(() => { collShow('tesseract'); return { h3: document.querySelector('.co-rec h3').textContent, hands: document.querySelectorAll('[data-cxh]').length }; });
  const noir = await p.evaluate(() => JSON.stringify((typeof ATL_PLACES !== 'undefined' ? ATL_PLACES : []).length));
  console.log(JSON.stringify({ r, rec }), 'errors', errs); await b.close(); })();
