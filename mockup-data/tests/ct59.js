// every index opens with its place (October 2026): Damage Control's door is in Midtown as soon as Midtown is on the map (The Avengers), and the
// Collector's on Knowhere as soon as Knowhere is (any title there, not only the ones he's in); the Compound and the Raft already did
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const watch = async T => { await p.evaluate(T => { state.checks = {}; DATA.chapters.forEach(c => c.items.forEach(i => { if (T.includes(i.t)) { state.unlocked[c.id] = true; state.checks[ck(c, i.t)] = true; } })); persist(); }, T); await p.reload(); await sleep(2500);
    await p.evaluate(() => { const g = [...document.querySelectorAll('button')].find(b => /got it/i.test(b.textContent)); if (g) g.click(); }); await sleep(300); };
  await watch(['The Avengers']);
  ok(await p.evaluate(() => atlSeenT('The Avengers') && !atlSeenT('Spider-Man: Homecoming')), 'only The Avengers is watched');
  await p.evaluate(() => { openAtlas(); atlSub('city', 'ny'); }); await sleep(800); await p.evaluate(() => atlSelect(document.getElementById('atlMap'), 'Midtown', true)); await sleep(800);
  ok(await p.evaluate(() => !!document.querySelector('.atl-dc')), 'Midtown has Damage Control right away');
  await p.evaluate(() => closeAtlas()); await sleep(400);
  await watch(['Guardians of the Galaxy Vol. 3']);
  ok(await p.evaluate(() => !['Thor: The Dark World', 'Guardians of the Galaxy', 'Avengers: Infinity War'].some(atlSeenT)), 'none of the Collector\'s own titles is watched');
  await p.evaluate(() => { openAtlas(); atlSwitch('cosmos'); }); await sleep(800);
  const lit = await p.evaluate(() => !!(document.getElementById('atlMap')._pins || []).find(x => x.id === 'knowhere'));
  ok(lit, 'Knowhere is on the map');
  if (lit) { await p.evaluate(() => atlSelect(document.getElementById('atlMap'), 'knowhere', true)); await sleep(800); ok(await p.evaluate(() => !!document.querySelector('.atl-coll')), 'and its Collector is open'); }
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
