// a step filed "In season N," shows the season with its title, never in the sentence (October 2026); Natasha's description follows Endgame
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
const FILE = process.argv[2], SHOT = process.argv[3] || null;
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', JSON.stringify({ entered: 1, booted: 1, orderPicked: 1 })); sessionStorage.setItem('x', 1); } });
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(FILE, 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  // everything watched, in the Sacred Timeline (both orders), so every step is open
  await p.evaluate(() => { DATA.timeline.forEach(e => state.checks['tl::' + e.t] = true); DATA.timelineRelease.forEach(e => state.checks['tr::' + e.t] = true); persist(); });
  const look = async (mode, id) => p.evaluate(([mode, id]) => { openColl(mode); collShow(id); const el = document.getElementById('collPanel');
    return { txt: [...el.querySelectorAll('li p')].map(x => x.textContent), ttl: [...el.querySelectorAll('li small')].map(x => x.textContent), all: el.innerText }; }, [mode, id]);
  const L = await look('cp', 'st-lincoln-campbell');
  ok(L.txt.length >= 3 && !/In season/.test(L.all), 'Lincoln: no "In season" (' + L.txt[0] + ')');
  ok(L.ttl.some(t => t.startsWith('Agents of S.H.I.E.L.D. S2')) && L.ttl.some(t => t.startsWith('Agents of S.H.I.E.L.D. S3')), 'Lincoln: seasons with the title ' + JSON.stringify(L.ttl));
  ok(/^[A-Z]/.test(L.txt[0]), 'sentence starts with a capital');
  ok(/First seen\s*Agents of S.H.I.E.L.D. S2/i.test(L.all) && /Last seen\s*Agents of S.H.I.E.L.D. S3/i.test(L.all), 'first and last seen carry the season');
  if (SHOT) await p.screenshot({ path: SHOT });
  const D = await look('raft', 'st-the-doctor');
  ok(!/In season/.test(D.all) && /^Inside the Framework/.test(D.txt[0]) && D.ttl[0].startsWith('Agents of S.H.I.E.L.D. S4'), "The Doctor: " + D.txt[0] + ' | ' + D.ttl[0]);
  const R = await look('coll', 'pr-staff-of-one');
  ok(!/In season/.test(R.all) && R.ttl.some(t => /^Runaways S2/.test(t)) && !R.ttl.some(t => /S1–S2/.test(t)), 'Runaways: ' + JSON.stringify(R.ttl));
  const N = await p.evaluate(() => stageAt(ALLIES.find(o => o.id === 'natasha-romanoff').k, atlSeenT)[0]);
  ok(N === 'Leader of the Avengers after the Snap', 'Natasha: ' + N);
  // nowhere in any open file
  const left = await p.evaluate(() => { let n = 0; for (const [m, L] of [['cp', ALLIES], ['raft', THREATS], ['coll', COLLX]]) { openColl(m); for (const o of L) { collShow(o.id); if (/In season \d/.test(document.getElementById('collPanel').innerText)) n++; } } return n; });
  ok(left === 0, left + ' files still show "In season"');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
