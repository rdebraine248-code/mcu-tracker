// the Collection's cases you can handle (October 2026): the Darkhold, the Sokovia Accords, the sling rings and the arc reactor
// join the Tesseract, and handling all five is one Classified file, Handle with care. From the first case its card counts them under
// [ Classified ]; the name shows only once the file is found
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, collIn: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  await p.evaluate(() => { DATA.chapters.forEach(c => { state.unlocked[c.id] = true; c.items.forEach(i => state.checks[ck(c, i.t)] = true); }); state.stones = {}; persist(); });
  await p.reload(); await sleep(6000); await p.evaluate(() => { const g = [...document.querySelectorAll('button')].find(b => /got it/i.test(b.textContent)); if (g) g.click(); }); await sleep(300);
  ok(await p.evaluate(() => CX_SET.join() === 'tesseract,darkhold,sling-ring,arc,sokovia-accords'), 'five cases in the set');
  ok(await p.evaluate(() => EGGS.some(e => e[0] === 'artifacts') && !EGGS.some(e => e[0] === 'darkhold' || e[0] === 'accords')), 'one Classified file for them');
  const card = () => p.evaluate(() => { const a = achList().find(x => x.id === 'egg-artifacts'); hfPage = a.pg; if (!fileOpen) openFile(); renderFile(); const c = document.querySelector('[data-ach="egg-artifacts"]'); const t = c ? c.textContent : ''; closeFile(); return t; });
  ok(!/Handle with care/.test(await card()), 'the card is Classified (or not yet shown) before any case is handled');
  const open = id => p.evaluate(id => { if (!collOpen) openColl("coll"); collShow(id); }, id);
  const ctr = () => p.evaluate(() => { const r = document.querySelector('.cx-big .cx-obj').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  const H = () => p.evaluate(() => Object.keys(state.cxHand || {}).sort().join());
  // the arc reactor: hold until it's charged
  await open('arc'); await sleep(300); let [x, y] = await ctr(); await p.mouse.move(x, y); await p.mouse.down(); await sleep(2200); await p.mouse.up(); await sleep(900);
  ok((await H()) === 'arc', 'the arc reactor counts once charged: ' + await H());
  const c1 = await card(); ok(!/Handle with care/.test(c1) && /Classified/.test(c1) && /1 of 5/.test(c1), 'after one, the card stays Classified with a count under it: ' + c1);
  // the Darkhold: let go early, nothing; hold through, the spell
  await open('darkhold'); await sleep(300); [x, y] = await ctr(); await p.mouse.move(x, y); await p.mouse.down(); await sleep(1500); await p.mouse.up(); await sleep(1200);
  ok(!(await H()).includes('darkhold') && await p.evaluate(() => !document.querySelector('.cx-rune') && !document.querySelector('.fxl')), 'letting the Darkhold go early casts nothing and leaves the page clean');
  await p.mouse.down(); await sleep(6200); await p.mouse.up(); await sleep(3500);
  ok((await H()).includes('darkhold') && await p.evaluate(() => !document.querySelector('.cx-rune') && !document.querySelector('.fxl') && !document.querySelector('canvas.fx-canvas')), 'holding it through casts its spell, and the page comes back');
  // the sling rings: a circle opens a portal onto another case, and back returns
  await open('sling-ring'); await sleep(300);
  await p.evaluate(async () => { const st = document.querySelector('.cx-big'), r = st.querySelector('.cx-obj').getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2 + 10;
    const ev = (t, el, x, y) => el.dispatchEvent(new PointerEvent(t, { bubbles: true, clientX: x, clientY: y, pointerId: 7, button: 0, pointerType: 'touch' }));
    ev('pointerdown', st, cx + 62, cy); for (let k = 1; k <= 30; k++) { await new Promise(r => setTimeout(r, 16)); const a = k / 30 * Math.PI * 2.05; ev('pointermove', window, cx + Math.cos(a) * 62, cy + Math.sin(a) * 58); } ev('pointerup', window, cx + 62, cy); });
  await p.waitForFunction(() => collRec !== 'sling-ring', null, { timeout: 15000 }).catch(() => {}); await sleep(600);
  ok(await p.evaluate(() => collRec !== 'sling-ring' && document.querySelectorAll('.collpanel').length === 1), 'the portal lands on another case, and its view is gone');
  ok((await H()).includes('sling-ring'), 'the sling rings count');
  await p.goBack(); await sleep(700); ok(await p.evaluate(() => collRec === 'sling-ring'), 'back returns to the sling rings');
  // the Accords: sign them
  await open('sokovia-accords'); await sleep(300); [x, y] = await ctr(); await p.mouse.click(x, y); await sleep(400);
  const sg = await p.evaluate(() => { const r = document.querySelector('.acc-sig').getBoundingClientRect(); return [r.left, r.top]; });
  await p.mouse.move(sg[0] + 30, sg[1] + 50); await p.mouse.down(); for (let k = 0; k <= 40; k++) await p.mouse.move(sg[0] + 30 + k * 6, sg[1] + 45 + Math.sin(k / 3) * 16); await p.mouse.up(); await sleep(3000);
  ok(await p.evaluate(() => state.accords && state.accords.v === 'signed' && !document.querySelector('.acc-ov') && /signature is on file/.test(document.querySelector('.cx-big').textContent)), 'signed, and the case says so');
  ok(!(await p.evaluate(() => !!(state.eggs || {}).artifacts)), 'not yet: the Tesseract is still to come');
  // the Tesseract: carried off, it gives its stone and completes the set
  await open('tesseract'); await sleep(300); [x, y] = await ctr(); await p.mouse.move(x, y); await p.mouse.down(); await sleep(600); for (let k = 1; k <= 8; k++) await p.mouse.move(x - 10 * k, y + 40 * k); await p.mouse.up(); await sleep(5500);
  ok(await p.evaluate(() => !!(state.stones || {}).space && !!(state.eggs || {}).artifacts), 'the Tesseract gives the stone and completes Handle with care');
  ok(/Found/.test(await card()), 'and the card reads Found');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
