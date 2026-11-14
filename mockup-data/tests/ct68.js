// the dock looks the same however a page was reached (owner, 13 November 2026: a character log opened from the Network had the dock on
// top of it, unlike one opened from Story; "Does that issue pop up on other pages or through other means?"). A character log always
// covers the dock; a file, Paths, the Network and the Atlas always show it; opened directly or on top of another page, upright and sideways
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  for (const [W, H, o] of [[384, 832, 'upright'], [832, 384, 'sideways']]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch: true });
    await ctx.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' });
      if (/\/network\.html/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), 'network.html'), contentType: 'text/html; charset=utf-8' });
      return u === 'http://t/' ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue(); });
    let p; const errs = [];
    await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
    const fresh = async () => { await p.goto('http://t/'); await sleep(1800);
      await p.evaluate(() => { const D = DATA.chapters.flatMap(c => c.items.map(i => [c, i.t])); D.forEach(([c, t]) => { state.checks[ck(c, t)] = true; }); state.eggs = Object.assign(state.eggs || {}, { compound: 1, raft: 1, collector: 1 }); persist(); renderAll(); setInterval(() => { try { sayQ.length = 0; } catch (e) {} const t = document.getElementById('toast'); t.classList.remove('show'); t.style.display = 'none'; }, 50); }); await sleep(600); };   // pills over the dock aren't what's checked
    const dockOn = () => p.evaluate(() => { const bs = [...document.querySelectorAll('#dock [data-dock]')]; return bs.every(b => { const r = b.getBoundingClientRect(); if (!r.width) return false; const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return e && (e === b || b.contains(e)); }); });
    const dockOff = () => p.evaluate(() => [...document.querySelectorAll('#dock [data-dock]')].every(b => { const r = b.getBoundingClientRect(); if (!r.width) return true; const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !(e && (e === b || b.contains(e))); }));
    const box = async () => { await p.evaluate(() => { const e = DATA.chars.find(c => c.id === 'cx-iron-man'); openPanel ? openPanel(e) : document.querySelector('#view .tile[data-id="cx-iron-man"]').click(); }).catch(() => {}); await sleep(900); };
    const cases = [
      ['a character log from its box', 'off', async () => { await p.evaluate(() => profGo('cx-iron-man')); }],
      ['a file from its index', 'on', async () => { await p.evaluate(() => { openColl('cp'); }); await sleep(600); await p.evaluate(() => fileGo('A', 'tony-stark')); }],
      ['a character log from a file', 'off', async () => { await p.evaluate(() => { openColl('cp'); }); await sleep(600); await p.evaluate(() => fileGo('A', 'tony-stark')); await sleep(800); await p.evaluate(() => profGo('cx-iron-man')); }],
      ['a character log from Paths', 'off', async () => { await p.evaluate(() => openMap()); await sleep(900); await p.evaluate(() => profGo('cx-iron-man')); }],
      ['a file from Paths', 'on', async () => { await p.evaluate(() => openMap()); await sleep(900); await p.evaluate(() => fileGo('A', 'tony-stark')); }],
      ['a file from a character log', 'on', async () => { await p.evaluate(() => profGo('cx-iron-man')); await sleep(900); await p.evaluate(() => fileGo('A', 'tony-stark')); }],
      ['Paths from a file', 'on', async () => { await p.evaluate(() => { openColl('cp'); }); await sleep(600); await p.evaluate(() => fileGo('A', 'tony-stark')); await sleep(800); await p.evaluate(() => pathGo('Iron Man')); }] ];
    p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    for (const [n, want, go] of cases) { await fresh(); await p.evaluate(() => { while (JUMPS.length) JUMPS.pop(); jumpCls(); [closeDossier, closeMap, closeColl].forEach(f => { try { f(true); } catch (e) {} }); }); await sleep(500); await go(); await sleep(1400); ok(want === 'on' ? await dockOn() : await dockOff(), o + ': ' + n + ' should ' + (want === 'on' ? 'show' : 'cover') + ' the dock'); }
    ok(!errs.length, o + ': page errors: ' + errs.slice(0, 2).join(' | ')); await ctx.close(); }
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok'); await b.close(); process.exit(fails.length ? 1 : 0); })();
