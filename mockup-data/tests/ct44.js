// the episodes link under a title follows its check straight away (in a box and on a side lane of the timeline), and pressing it doesn't
// press the title's checkbox
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 }, hasTouch: false });
  const ch = id => [];
  const st = { entered: 1, booted: 1, orderPicked: 1, mode: 'chapters', unlocked: { 'ch-1': true, 'ch-2': true, 'ch-3': true, 'ch-4': true, 'ch-5': true }, checks: { 'ch-5::Jessica Jones S1': true } };
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify(st));
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: require('fs').readFileSync(process.argv[2], 'utf8'), contentType: 'text/html' }); return r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  await p.evaluate(() => { const t = document.querySelector('.tile[data-id="ch-5"]'); t.scrollIntoView(); t.click(); }); await sleep(1500);
  const chip = t => p.evaluate(t => { const r = [...document.querySelectorAll('#panel .row[data-t]')].find(x => x.dataset.t === t); return r ? !!r.querySelector('.epl') : null; }, t);
  ok(await chip('Daredevil S1') === true && await chip('Jessica Jones S1') === false, 'start: link only on the unchecked title');
  const tap = t => p.evaluate(t => { [...document.querySelectorAll('#panel .row[data-t]')].find(x => x.dataset.t === t).click(); }, t);
  await tap('Daredevil S1'); await sleep(400); ok(await chip('Daredevil S1') === false, 'checked: link goes');
  await tap('Daredevil S1'); await sleep(400); ok(await chip('Daredevil S1') === true, 'unchecked: link comes back');
  // pressing the link: the box doesn't shrink; pressing the title itself still does
  const boxT = async sel => { const bb = await p.evaluate(sel => { const e = document.querySelector(sel); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, sel);
    await p.mouse.move(bb[0], bb[1]); await p.mouse.down(); await sleep(250);
    const tf = await p.evaluate(sel => getComputedStyle(document.querySelector(sel).closest('.row').querySelector('.box')).transform, sel); await p.mouse.up(); await sleep(500); return tf; };
  const onLink = await boxT('#panel .row[data-t="Daredevil S1"] .epl');
  await p.evaluate(() => { const s = document.getElementById('rateSheet'); if (s) s.querySelector('.rs-done').click(); }); await sleep(700);
  const onTitle = await boxT('#panel .row[data-t="Jessica Jones S1"] .t');
  ok(onLink === 'none', 'link press leaves the box still (' + onLink + ')');
  ok(onTitle !== 'none', 'title press still shrinks the box (' + onTitle + ')');
  // a side lane of the Sacred Timeline (only the main lane redraws the whole list)
  const p2 = await ctx.newPage(); p2.on('pageerror', e => errs.push(e.message)); await p2.goto('http://t/'); await sleep(1500);
  const tlr = await p2.evaluate(async () => { state.mode = 'timeline'; state.tlMode = 'story'; state.checks['tl::Loki S1'] = true; persist(); renderAll(); await new Promise(r => setTimeout(r, 800));
    const r = document.querySelector(`.tl-row[data-tl="X-Men '97"]`); if (!r) return 'no row';
    const before = !!r.querySelector('.epl'); r.scrollIntoView({ block: 'center' }); r.querySelector('.tl-text').click(); await new Promise(z => setTimeout(z, 400));
    const r2 = document.querySelector(`.tl-row[data-tl="X-Men '97"]`); return [before, r2.getAttribute('aria-pressed'), !!r2.querySelector('.epl')]; });
  ok(JSON.stringify(tlr) === '[true,"true",false]', 'timeline side lane: link goes when checked (' + JSON.stringify(tlr) + ')');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
