const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>' + require('fs').readFileSync(process.argv[2] || __dirname + '/../out/datapad-test.html', 'utf8') + '</body></html>', contentType: 'text/html' }); return r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://t/'); await sleep(3000); await p.evaluate(() => { document.getElementById('tbOk')?.click(); [...DATA.chapters, ...DATA.chars].forEach(c => c.items.forEach(i => state.checks[ck(c, i.t)] = true)); state.eggs = Object.assign(state.eggs || {}, { compound: 1, raft: 1, collector: 1 }); }); await sleep(400);
  const r = await p.evaluate(() => { openAtlas(); openColl('raft'); collShow('hydra'); return { title: document.querySelector('.rf-head h3').textContent, steps: document.querySelectorAll('.co-chain li').length, opp: [...document.querySelectorAll('[data-rfo]')].map(b => b.textContent).slice(0, 6) }; });
  await p.screenshot({ path: __dirname + '/sh/org-hydra.png' });
  const c = await p.evaluate(() => { closeColl(true); openColl('cp'); collShow('maria-hill'); return [...document.querySelectorAll('[data-cpt]')].map(b => b.textContent); });
  await p.evaluate(() => [...document.querySelectorAll('[data-cpt]')].find(b => b.textContent === 'S.H.I.E.L.D.').click()); await sleep(700);
  const gf = await p.evaluate(() => { const b = document.querySelector('.tf-bar [data-co]'); return b ? b.dataset.co : null; });
  await p.evaluate(() => document.querySelector('.tf-bar [data-co]').click()); await sleep(500);
  const shield = await p.evaluate(() => ({ h3: document.querySelector('.cp-id h3').textContent, steps: [...document.querySelectorAll('.co-chain li small')].map(s => s.textContent.slice(0, 40)) }));
  // Beyond: Daisy's S.H.I.E.L.D. points at the show's own S.H.I.E.L.D.
  const by = await p.evaluate(() => { collGrid(true); cpTeamF = ''; collShow('st-daisy-johnson'); cpUni = 'mcu'; return cpGroupFile('S.H.I.E.L.D.', 'st-daisy-johnson')?.id; });
  const xm = await p.evaluate(() => { cpUni = 'fox'; return [cpGroupFile('The X-Men', 'fox-anim-cyclops')?.id, cpGroupFile('The X-Men', 'fox-cyclops-young')?.id]; });
  console.log(JSON.stringify({ r, c, gf, shield, by, xm }), 'errors', errs); await b.close(); })();
