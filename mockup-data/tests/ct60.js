// the Space Stone lives in the Tesseract's case (October 2026): hold the cube's mark in the Collection, carry it off and let go, and the
// Tesseract sends it home with the stone; The First Avenger's row no longer holds it, and a short carry just settles it back
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, collIn: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  await p.evaluate(() => { DATA.chapters.forEach(c => c.items.forEach(i => { if (["Captain America: The First Avenger", "Thor", "The Avengers"].includes(i.t)) { state.unlocked[c.id] = true; state.checks[ck(c, i.t)] = true; } })); state.stones = {}; persist(); });
  await p.reload(); await sleep(2500); await p.evaluate(() => { const g = [...document.querySelectorAll('button')].find(b => /got it/i.test(b.textContent)); if (g) g.click(); }); await sleep(300);
  ok(await p.evaluate(() => !ROW_EGGS["Captain America: The First Avenger"]), 'The First Avenger row holds no egg');
  ok(await p.evaluate(() => STONE_HOW.space.includes('Collection')), 'the answer points to the Collection');
  await p.evaluate(() => { openColl("coll"); collShow("tesseract"); }); await sleep(400);
  ok(await p.evaluate(() => document.querySelector('.cx-big').dataset.live === 'tesseract'), 'the Tesseract case can be handled');
  ok(await p.evaluate(() => { openColl("coll"); collShow("scepter"); return !document.querySelector('.cx-big[data-live]'); }), 'a case that does nothing is left alone');
  await p.evaluate(() => collShow("tesseract")); await sleep(300);
  const ctr = () => p.evaluate(() => { const r = document.querySelector('.cx-big .cx-obj').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  let [x, y] = await ctr();
  // a short carry: it settles back, nothing earned
  await p.mouse.move(x, y); await p.mouse.down(); await sleep(600); ok(await p.evaluate(() => !!document.querySelector('.fx-cxg')), 'holding lifts the mark out');
  ok(await p.evaluate(() => document.querySelector('.cx-big .cx-obj').style.opacity === '0'), 'and the case empties');
  await p.mouse.move(x + 20, y + 10); await p.mouse.up(); await sleep(900);
  ok(await p.evaluate(() => !(state.stones || {}).space && document.querySelector('.cx-big .cx-obj').style.opacity === ''), 'a short carry settles back');
  // carried off: the Tesseract takes it, and the stone is yours
  [x, y] = await ctr(); await p.mouse.move(x, y); await p.mouse.down(); await sleep(600);
  for (let k = 1; k <= 8; k++) await p.mouse.move(x - 10 * k, y + 40 * k);
  await p.mouse.up(); await sleep(500); ok(await p.evaluate(() => !!document.querySelector('.fx-tess')), 'the Tesseract appears where you let go');
  await sleep(2400); ok(await p.evaluate(() => !!(state.stones || {}).space), 'the Space Stone is earned');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
