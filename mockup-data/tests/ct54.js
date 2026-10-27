// October 2026, round 2: an index's search looks only through the tab you're on and carries over when you pick another; the Defenders chapter
// in two Parts; a pill takes a tap only while its panel is open; the Atlas Earth map reaches the pole, so the Arctic isn't on its edge; Fury's 1995 entry
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } },
    JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, raftIn: 1, cpIn: 1, collIn: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1500);
  await p.evaluate(() => { DATA.timeline.forEach(e => state.checks['tl::' + e.t] = true); DATA.chapters.forEach(c => c.items.forEach(i => state.checks[ck(c, i.t)] = true)); state.mvEver = 1; state.incEver = 1; persist(); });
  await p.reload(); await sleep(9000);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  // 1. search within the tab
  for (const [m, q, tab, Q, at, L] of [['raft', 'loki', 'by', 'rfQ', 'rfu', 'THREATS'], ['cp', 'peter', 'sv', 'cpQ', 'cpu', 'ALLIES'], ['coll', 'stone', 'by', 'cxQ', 'cxu', 'COLLX']]) {
    await p.evaluate(m => { closeColl(true); openColl(m); }, m); await sleep(300);
    await p.fill('#' + Q, q); await sleep(300);
    const ids = () => p.evaluate(() => [...document.querySelectorAll('#collView [data-co]')].map(x => x.dataset.co));
    const unis = (L, I) => p.evaluate(([L, I]) => [...new Set(I.map(id => rfUniOf(window[L] ? window[L].find(o => o.id === id) : eval(L).find(o => o.id === id))))], [L, I]);
    let I = await ids(); ok(I.length, `${m}: "${q}" finds something on the Sacred Timeline tab`);
    ok(JSON.stringify(await unis(L, I)) === '["mcu"]', `${m}: results only from the Sacred Timeline tab ` + JSON.stringify(await unis(L, I)));
    ok(await p.evaluate(at => document.querySelector(`[data-${at}="mcu"]`).getAttribute('aria-selected') === 'true', at), `${m}: the tab stays selected while searching`);
    await p.click(`[data-${at}="${tab}"]`); await sleep(300);
    ok(await p.inputValue('#' + Q) === q, `${m}: the search carries over to the tab you pick`);
    I = await ids(); ok(I.length && JSON.stringify(await unis(L, I)) === JSON.stringify([tab]), `${m}: results only from ${tab} ` + JSON.stringify(await unis(L, I)));
  }
  await p.evaluate(() => closeColl(true)); await sleep(300);
  // 2. the Defenders in two Parts
  await p.evaluate(() => { const e = DATA.chapters.find(c => c.id === 'ch-5'); openPanel(e, 'chapter', document.body); }); await sleep(1200);
  const parts = await p.evaluate(() => { const out = []; let g = null; document.querySelectorAll('.panel .list > li').forEach(li => { if (li.classList.contains('earthh')) out.push([g = li.textContent, []]); else if (g) out[out.length - 1][1].push(li.querySelector('.row').dataset.t); }); return out; });
  ok(JSON.stringify(parts) === JSON.stringify([['Part 1', ['Daredevil S1', 'Jessica Jones S1', 'Daredevil S2', 'Luke Cage S1', 'Iron Fist S1', 'The Defenders']], ['Part 2', ['The Punisher S1', 'Jessica Jones S2', 'Luke Cage S2', 'Iron Fist S2', 'Daredevil S3', 'The Punisher S2', 'Jessica Jones S3']]]), 'Defenders Parts ' + JSON.stringify(parts));
  await p.evaluate(() => document.getElementById('btnBack').click()); await sleep(1200);
  // 3. a pill takes a tap only while its panel is open
  const hit = () => p.evaluate(() => { const t = document.getElementById('toast'), r = t.getBoundingClientRect(); if (!t.classList.contains('show') || !r.width) return 'none'; const el = document.elementFromPoint(r.left + r.width * .85, r.top + r.height / 2); return t.contains(el) ? 'pill' : 'page'; });
  await p.evaluate(() => say('A headline long enough to read for a while', null, undefined, 2500, false, 'Daily Bugle', undefined, true));
  const seq = []; for (let i = 0; i < 45; i++) { seq.push(await hit()); await sleep(120); }
  const s = seq.join(' ');
  ok(/^(page )+(pill )+(page )+/.test(s + ' '), 'pill: page while it opens, pill while open, page while it folds away ' + s);
  // 4. the Atlas reaches the pole: the Arctic has map above it, and the map can be framed there
  await p.evaluate(() => openAtlas()); await sleep(1200);
  ok(await p.evaluate(() => { const [, y0] = atlBounds(), a = ATLAS.earth.find(q => q.id === 'arctic'); return y0 <= 0 && 90 - a.at[0] - y0 >= 10; }), 'the Arctic sits clear of the top edge');
  // 5. Fury in 1995
  ok(await p.evaluate(() => DOSSIERS[FURY_BOX].story.some(([t, x]) => t === 'Captain Marvel' && /^1995\. Fury is a young desk agent\. He meets/.test(x)) && !JSON.stringify(DOSSIERS).includes('both eyes')), "Fury's 1995 entry");
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
