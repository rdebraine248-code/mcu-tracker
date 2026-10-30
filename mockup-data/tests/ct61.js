// the objects on their titles, the sling ring into the Atlas and the Watcher's other realities (October 2026): the Darkhold and the Sokovia Accords
// are held on their titles, each its own Classified file; only the Tesseract still answers in the Collection; three circles anywhere open
// onto a place in the Atlas; holding in the Watcher's box (or Beyond the MCU) cracks into another reality and back
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  await p.evaluate(() => { DATA.chapters.forEach(c => { state.unlocked[c.id] = true; c.items.forEach(i => state.checks[ck(c, i.t)] = true); }); DATA.chars.forEach(c => c.items.forEach(i => state.checks[c.id + "::" + i.t] = true)); state.mvEver = 1; state.stones = {};
    state.eggs = Object.assign(state.eggs || {}, { collector: 1, raft: 1 }); persist(); });
  await p.reload(); await sleep(7000); await p.evaluate(() => { document.querySelectorAll('button').forEach(g => { if (/got it/i.test(g.textContent)) g.click(); }); }); await sleep(300);
  ok(await p.evaluate(() => Object.keys(CX_LIVE).join() === 'tesseract'), 'only the Tesseract answers in the Collection');
  ok(await p.evaluate(() => ['darkhold', 'accords', 'sling'].every(k => EGGS.some(e => e[0] === k)) && !EGGS.some(e => e[0] === 'artifacts' || e[0] === 'aether')), 'the objects have their own files, and Handle with care and the Aether are gone');
  const E = k => p.evaluate(k => !!(state.eggs || {})[k], k);
  // hold a title in a box's list
  const holdRow = async (t, ms) => { const at = await p.evaluate(t => { if (openEntry) closePanel(); const c = DATA.chapters.find(c => c.items.some(i => i.t === t)); openPanel(c, 'chapter', document.body); return c.id; }, t); await sleep(900);
    const r = await p.evaluate(t => { const el = document.querySelector(`#panel .row[data-t="${CSS.escape(t)}"]`); el.scrollIntoView({ block: 'center' }); const q = el.getBoundingClientRect(); return [q.left + 60, q.top + q.height / 2]; }, t); await sleep(300);
    await p.mouse.move(r[0], r[1]); await p.mouse.down(); await sleep(ms); await p.mouse.up(); return at; };
  // the Darkhold: held through, its spell is cast, and the page comes back
  await holdRow('Doctor Strange in the Multiverse of Madness', 6500); await sleep(3500);
  ok(await E('darkhold'), 'holding Multiverse of Madness through casts the Darkhold');
  ok(await p.evaluate(() => !document.querySelector('.cx-rune') && !document.querySelector('.fx-obj') && !document.querySelector('canvas.fx-canvas')), 'and the page comes back, the book gone');
  // the Accords: hold Civil War, then sign
  await holdRow('Captain America: Civil War', 900); await sleep(700);
  ok(await p.evaluate(() => !!document.querySelector('.acc-ov')), 'holding Civil War brings up the Accords');
  const sg = await p.evaluate(() => { const r = document.querySelector('.acc-sig').getBoundingClientRect(); return [r.left, r.top]; });
  await p.mouse.move(sg[0] + 30, sg[1] + 50); await p.mouse.down(); for (let k = 0; k <= 40; k++) await p.mouse.move(sg[0] + 30 + k * 6, sg[1] + 45 + Math.sin(k / 3) * 16); await p.mouse.up(); await sleep(3000);
  ok(await p.evaluate(() => state.accords && state.accords.v === 'signed' && !document.querySelector('.acc-ov')) && await E('accords'), 'signed, on file');
  // the Tesseract, still in the Collection: carried off, it gives its stone
  await p.evaluate(() => { if (openEntry) closePanel(); openColl('coll'); collShow('tesseract'); }); await sleep(600);
  let [x, y] = await p.evaluate(() => { const r = document.querySelector('.cx-big .cx-obj').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  await p.mouse.move(x, y); await p.mouse.down(); await sleep(600); for (let k = 1; k <= 8; k++) await p.mouse.move(x - 10 * k, y + 40 * k); await p.mouse.up(); await sleep(5500);
  ok(await p.evaluate(() => !!(state.stones || {}).space), 'the Tesseract gives the Space Stone');
  await p.evaluate(() => closeColl()); await sleep(600);
  // the sling ring: three circles drawn anywhere open a portal onto a place in the Atlas: Earth (its cities too), the Cosmos, Beyond and the multiverse (inside other universes too), never the Incursions
  const sl = await p.evaluate(() => { const D = [...Array(4000)].map(() => slingDest()); return { atlas: D.every(d => d && d.k === 'atlas'), inc: D.some(d => d.v === 'incursions'), hosts: D.some(d => d.p.city || d.p.uni || d.p.home), v: [...new Set(D.map(d => d.v))].sort().join() }; });
  ok(sl.atlas && !sl.inc && !sl.hosts, 'the sling ring only opens onto Atlas places, never the Incursions, never a city or universe pin itself');
  ok(sl.v === 'beyond,city,cosmos,earth,multi,uni', 'every realm, and the places inside cities and other universes: ' + sl.v);
  await p.evaluate(() => { window._d = null; const o = slingDest; slingDest = () => { let d; do d = o(); while (d.v !== 'city'); window._d = d; return d; }; });
  const cx = 206, cy = 450, R = 70; await p.mouse.move(cx + R, cy); await p.mouse.down(); for (let k = 1; k <= 132; k++) { const a = k / 40 * Math.PI * 2; await p.mouse.move(cx + Math.cos(a) * R, cy + Math.sin(a) * R); await sleep(10); } await p.mouse.up();
  await sleep(4200);
  ok(await p.evaluate(() => _d && atlOpen && atlView === 'city' && atlCity === _d.sub && atlSel === _d.p.id && !document.querySelector('.fx-slingview')), 'three circles land you on a spot inside a city, and the portal is gone');
  ok(await E('sling'), 'the sling ring is on file');
  await p.evaluate(() => document.querySelector('#dock [data-dock="story"]').click()); await sleep(800);
  // the Watcher: another reality cracks in and shatters back, in his box and in Beyond the MCU
  for (const id of ['cx-the-watcher', 'ch-beyond-the-mcu']) {
    await p.evaluate(id => { const e = DATA.chars.find(c => c.id === id) || DATA.chapters.find(c => c.id === id); openPanel(e, id.startsWith('cx-') ? 'char' : 'chapter', document.body); }, id); await sleep(1200);
    await p.mouse.move(206, 600); await p.mouse.down(); await sleep(900); await p.mouse.up(); await sleep(2600);
    ok(await p.evaluate(() => !!document.querySelector('.fx-altbox')), id + ': another reality shows');
    await sleep(5200);
    ok(await p.evaluate(id => openEntry && openEntry.id === id && !document.querySelectorAll('.fx-altbox, .fx-shard, .fx-crack').length && !shattering, id), id + ': it shatters back, with nothing left over');
    await p.evaluate(() => closePanel()); await sleep(600);
  }
  ok(await E('shatter'), 'New realities is on file');
  // with a mouse, a long press stands in for fingers: a hand's small wobble doesn't cancel it, a real drag does (Four colors here)
  const mhold = async move => { await p.evaluate(() => { if (openEntry) closePanel(); const e = DATA.chars.find(c => c.id === 'cx-the-defenders'); openPanel(e, 'char', document.body); }); await sleep(1300);
    await p.evaluate(() => { defOn = false; (state.eggs || {}).defenders = 0; });
    const [x, y] = await p.evaluate(() => { const r = document.getElementById('panelTitle').getBoundingClientRect(); return [r.left + 20, r.top + r.height / 2]; });
    await p.mouse.move(x, y); await p.mouse.down(); await p.mouse.move(x + move, y + 2); await sleep(1500); const on = await p.evaluate(() => !!defOn); await p.mouse.up(); await sleep(6500); return on; };
  ok(await mhold(5), 'a mouse hold with a 5px wobble still plays Four colors');
  ok(!(await mhold(30)), 'a 30px drag cancels it');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
