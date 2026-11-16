// the Agent File's Classified by sector (owner, 16 November 2026): a tile for each part of the datapad that has eggs, each egg in exactly one;
// a tile opens a full-size pop-up of its eggs: found ones with where they were found, the rest [ Classified ] with no lead, ten taps for the
// hint; back closes the pop-up and leaves the Agent File; a notification opens the egg's sector, glowing on it
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
  await p.goto('http://t/'); await sleep(1800);
  await p.evaluate(() => { state.eggs = { compound: 1, ironhud: 1, webs: 1, groot: 1, drax: 1, extremis: 1 }; persist(); renderAll(); setInterval(() => { try { sayQ.length = 0; } catch (e) {} }, 50); });
  ok(await p.evaluate(() => EGGS.every(e => EGG_AT[e[0]] && EGG_SECS.some(s => s[0] === EGG_AT[e[0]][0]) && EGG_AT[e[0]][1]) && Object.keys(EGG_AT).length === EGGS.length), 'an egg with no sector or place, or a place for no egg');
  await p.evaluate(() => openFile()); await sleep(600);
  const t = await p.evaluate(() => [...document.querySelectorAll('#fileView .af-s')].map(e => [e.dataset.afs, e.querySelector('.n').textContent, !!e.querySelector('.stamp')]));
  ok(t.reduce((n, x) => n + +x[1].split('/')[1], 0) === await p.evaluate(() => EGGS.length), 'the sectors don\'t add up to every egg ' + JSON.stringify(t));
  ok(t.some(x => x[0] === 'compound' && x[1] === '2/2' && x[2]) && t.some(x => x[0] === 'story' && x[1].startsWith('3/') && !x[2]), 'sector counts or cleared stamps wrong ' + JSON.stringify(t));
  await p.tap('#fileView [data-afs=compound]'); await sleep(700);
  const c = await p.evaluate(() => [...document.querySelectorAll('.afp .cd')].map(e => e.textContent.trim()));
  ok(c.length === 2 && c.every(x => /^Recovered/.test(x)) && c.some(x => /Drax's file/.test(x)), 'the Compound pop-up ' + JSON.stringify(c));
  await p.goBack(); await sleep(600); ok(await p.evaluate(() => !document.querySelector('.afp') && fileOpen), 'back did not close just the pop-up');
  // the cards keep the dots' order: a found egg stays where its dot is
  await p.tap('#fileView [data-afs=story]'); await sleep(700);
  ok(await p.evaluate(() => { const d = [...document.querySelectorAll('.afp .top .af-tk i')].map(i => i.classList.contains('on')), c = [...document.querySelectorAll('.afp .cd')].map(e => e.classList.contains('f')); return d.length === c.length && d.every((x, i) => x === c[i]) && c.some((x, i) => x && c.slice(0, i).includes(false)); }), 'the cards are not in the dots\' order');
  ok(await p.evaluate(() => ![...document.querySelectorAll('.afp .cd')].some(c => c.scrollHeight > c.clientHeight + 1)), 'a card\'s text spills out of it');
  await p.goBack(); await sleep(600);
  await p.tap('#fileView [data-afs=story]'); await sleep(700);
  ok(await p.evaluate(() => [...document.querySelectorAll('.afp .cd.lk')].every(e => e.textContent.trim() === '[ Classified ]')), 'a locked egg shows something besides [ Classified ]');
  for (let i = 0; i < 10; i++) { await p.tap('.afp .cd.lk >> nth=0'); await sleep(40); }
  ok(await p.evaluate(() => { const e = document.querySelector('.afp .cd.lk small'), a = achList().find(x => x.id === document.querySelector('.afp .cd.lk').dataset.ach); return e && a && e.textContent === a.h; }), 'ten taps gave no hint');
  ok(await p.evaluate(() => { const r = document.querySelector('.afp').getBoundingClientRect(), d = document.querySelector('.dock').getBoundingClientRect(), e = document.elementFromPoint(r.left + 30, r.bottom - 8); return !!e.closest('.afp'); }), 'something sits over the pop-up');
  await p.evaluate(() => closeFile()); await sleep(900); ok(await p.evaluate(() => !fileOpen && !document.querySelector('.afp, .afp-bd')), 'closing the Agent File left the pop-up');
  await p.evaluate(() => fileAt(['Invisible'])); await sleep(1200);
  ok(await p.evaluate(() => { const g = document.querySelector('.afp .cd.hf-glow'); return fileOpen && g && /Invisible/.test(g.textContent); }), 'a notification did not open the egg\'s sector on it');
  ok(!errs.length, 'page errors: ' + errs.slice(0, 2).join(' | '));
  await b.close(); console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok: Classified by sector'); process.exit(fails.length ? 1 : 0); })();
