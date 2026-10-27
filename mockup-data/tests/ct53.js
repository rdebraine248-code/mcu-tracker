// First seen and Last seen (October 2026) go by release order, season by season: Coulson is last seen in Agents of S.H.I.E.L.D. S7, not
// Slingshot; the animated Jubilee is first seen in her own first X-Men season, not a later Spider-Man (1994) crossover; Sitwell is first
// seen in Thor and last in Avengers: Endgame; the Void's Juggernaut is the Last Stand's, in one file
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); }, errs = [];
  const html = fs.readFileSync(process.argv[2], 'utf8');
  const c0 = await b.newContext(); await c0.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: html, contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p0 = await c0.newPage(); await p0.goto('http://t/'); await sleep(1500);
  const all = await p0.evaluate(() => [...new Set([...DATA.chapters, ...DATA.chars].flatMap(c => c.items.map(i => i.t)))]); await c0.close();
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } },
    JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, raftIn: 1, cpIn: 1, collIn: 1, checks: Object.fromEntries(all.map(t => ['tl::' + t, true])) }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: html, contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500);
  const seen = (m, id) => p.evaluate(([m, id]) => { openColl(m); collShow(id); return [...document.querySelectorAll('.co-tiles > div')].slice(0, 2).map(d => d.querySelector('b').textContent); }, [m, id]);
  const coul = await seen('cp', 'phil-coulson'), jub = await seen('cp', 'fox-anim-jubilee'), sit = await seen('raft', 'jasper-sitwell');
  ok(/S7$/.test(coul[1]) && coul[0] === 'Iron Man', 'Coulson first and last seen ' + JSON.stringify(coul));
  ok(/Animated Series S1$/.test(jub[0]) && /S2$/.test(jub[1]) && /97/.test(jub[1]), 'Jubilee first and last seen ' + JSON.stringify(jub));
  ok(sit[0] === 'Thor' && sit[1] === 'Avengers: Endgame', 'Sitwell first and last seen ' + JSON.stringify(sit));
  const jug = await p.evaluate(() => [THREATS.some(o => o.id === 'fox-juggernaut-void'), (THREATS.find(o => o.id === 'fox-juggernaut') || {}).st.map(x => x[1]), IDMOVE['fox-juggernaut-void']]);
  ok(!jug[0] && jug[1].join('|') === 'X-Men: The Last Stand|Deadpool & Wolverine' && jug[2] === 'fox-juggernaut', 'the Void Juggernaut in the Last Stand file ' + JSON.stringify(jug));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
