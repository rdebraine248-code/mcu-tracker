// the eggs in the Compound's files (owner, 14 November 2026). Drax: after Infinity War, leave his file alone and it fades out completely,
// which records the egg; a touch brings it back without tapping what's under it; before Infinity War nothing happens. Pepper: after Iron
// Man 3, holding her name sets every item of her file burning at once, it never drops near off while it burns, and it records the egg
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const ctx = await b.newContext({ viewport: { width: 384, height: 832 }, hasTouch: true });
  await ctx.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' });
    if (/\/network\.html/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), 'network.html'), contentType: 'text/html; charset=utf-8' });
    return u === 'http://t/' ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue(); });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => errs.push(e.message));
  // watched up to a title, story order: everything before it on the Sacred Timeline, and it
  const upTo = async t => { await p.goto('http://t/'); await sleep(1800);
    await p.evaluate(t => { const L = DATA.timeline.map(e => e.t), n = L.indexOf(t); state.checks = {}; DATA.chapters.forEach(c => c.items.forEach(i => { const k = L.indexOf(i.t); if (k >= 0 && k <= n) state.checks[ck(c, i.t)] = true; }));
      state.eggs = Object.assign({}, { compound: 1, raft: 1, collector: 1 }); persist(); renderAll(); setInterval(() => { try { sayQ.length = 0; } catch (e) {} }, 50); }, t); await sleep(400); };
  const open = async id => { await p.evaluate(() => openColl('cp')); await sleep(600); await p.evaluate(id => fileGo('A', id), id); await sleep(900); };
  const op = () => p.evaluate(() => { const r = document.querySelector('#collView .co-rec'); return r ? +getComputedStyle(r).opacity : -1; });
  const egg = id => p.evaluate(id => !!(state.eggs || {})[id], id);

  // Drax, before Infinity War: nothing
  await upTo('Guardians of the Galaxy Vol. 2'); await open('drax'); await sleep(11000);
  ok((await op()) > .99 && !(await egg('drax')), 'Drax faded before Infinity War');
  // after it: still for seven seconds, then gone completely, and found
  await upTo('Avengers: Infinity War'); await open('drax'); await sleep(4000);
  ok((await op()) > .99, 'Drax started fading too soon');
  await sleep(7000); ok((await op()) < .01, 'Drax did not fade out completely: ' + (await op())); ok(await egg('drax'), 'Drax egg not recorded');
  // a touch brings him back, and the tap doesn't open what was under it
  const before = await p.evaluate(() => collRec); await p.tap('#collView .co-teams, #collView .cp-teams button', { force: true }).catch(async () => { await p.mouse.click(190, 470); }); await sleep(700);
  ok((await op()) > .99, 'Drax did not come back on a touch'); ok(await p.evaluate(b => collRec === b && collMode === 'cp', before), 'the touch that brought Drax back also tapped through');
  // touching while it fades stops it (no egg needed for that, it's already found): it comes back
  await p.evaluate(() => { delete state.eggs.drax; }); await open('drax'); await sleep(7600); await p.mouse.wheel(0, 10); await sleep(500);
  ok((await op()) > .99 && !(await egg('drax')), 'a touch mid-fade did not bring Drax back, or recorded the egg anyway');

  // Pepper, before Iron Man 3: holding her name does nothing
  await upTo('Iron Man 2'); await open('pepper-potts');
  const hold = async () => { const r = await p.evaluate(() => { const h = document.querySelector('#collView .cp-id h3').getBoundingClientRect(); return [h.left + 30, h.top + h.height / 2]; });
    await p.mouse.move(r[0], r[1]); await p.mouse.down(); await sleep(800); await p.mouse.up(); };
  await hold(); await sleep(600); ok(!(await p.evaluate(() => document.querySelectorAll('.xm-hot').length)), 'Extremis ran before Iron Man 3');
  // after it: every item catches at once, and never drops near off while it burns
  await upTo('Iron Man 3'); await open('pepper-potts'); await hold(); await sleep(900);
  const h1 = await p.evaluate(() => { const L = [...document.querySelectorAll('#collView .xm-hot')]; return [L.length, Math.min(...L.map(e => +e.style.getPropertyValue('--xh')))]; });
  ok(h1[0] >= 6, 'Extremis lit too few items: ' + h1[0]); ok(h1[1] > .4, 'an item was not burning a moment in: ' + h1[1]);
  let low = 1; for (let i = 0; i < 12; i++) { await sleep(500); low = Math.min(low, await p.evaluate(() => Math.min(...[...document.querySelectorAll('#collView .xm-hot')].map(e => +e.style.getPropertyValue('--xh'))))); }
  ok(low > .4, 'the burn dropped near off: ' + low);
  await sleep(6000); ok(await egg('extremis'), 'Extremis egg not recorded'); ok(!(await p.evaluate(() => document.querySelectorAll('.xm-hot, .xm-txt').length)), 'Extremis left its classes behind');
  ok(await p.evaluate(() => EGGS.some(e => e[0] === 'drax') && EGGS.some(e => e[0] === 'extremis')), 'the Agent File is missing an egg');
  ok(!errs.length, 'page errors: ' + errs.slice(0, 2).join(' | '));
  await b.close(); console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok: Drax and Extremis'); process.exit(fails.length ? 1 : 0); })();
