// Damage Control's incident reports (October 2026): found in the Atlas in Midtown after Spider-Man: Homecoming; every report on file, by year
// (BC first, the TVA's last), with a search, grouping and sorting; names link into the indexes you've found, plain before; back steps
// through every file you opened; the egg and the Agent File's archive
// every universe has its tab, the same as the Raft's (October 2026)
// was: back always returns to where you were (October 2026): a Compound file that opens its Raft file is one step, so back from the Raft file
// returns to the Compound file, then to the Compound's list, then out to the Atlas; the same the other way round
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  await p.evaluate(() => { const st = state; st.checks = {}; DATA.chapters.forEach(c => { st.unlocked[c.id] = true; c.items.forEach(i => st.checks[ck(c, i.t)] = true); }); DATA.timeline.forEach(e => st.checks['tl::' + e.t] = true);
    st.mvEver = 1; st.incEver = 1; st.charOpen = {}; st.seen = {}; DATA.chars.forEach(c => { st.charOpen[c.id] = 1; st.seen[c.id] = true; c.items.forEach(i => st.checks[ck(c, i.t)] = true); }); st.raftIn = 0; st.cpIn = 1; st.collIn = 0; persist(); });
  await p.reload(); await sleep(9000); await p.evaluate(() => { const g = [...document.querySelectorAll('button')].find(b => /got it/i.test(b.textContent)); if (g) g.click(); }); await sleep(400);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const where = () => p.evaluate(() => ({ open: collOpen, mode: collMode, rec: collRec, atl: atlOpen }));
  const back = async () => { await p.goBack().catch(() => {}); await sleep(700); };
  await p.evaluate(() => openAtlas()); await sleep(800);
  await p.evaluate(() => openColl('dc')); await sleep(500);
  const n = await p.evaluate(() => document.querySelectorAll('.dc-row').length); ok(n === await p.evaluate(() => DC.filter(d => dcU(d) === 'mcu' && dcSeen(d)).length) && n > 100, 'every report is listed: ' + n);
  const yrs = await p.evaluate(() => [...document.querySelectorAll('[data-dcf]')].map(x => x.dataset.dcf)); ok(yrs[0] === '1260 BC' && yrs[yrs.length - 1] === 'Outside time', 'years: ' + yrs.slice(0, 3) + ' ... ' + yrs.slice(-2));
  for (const [u, min] of [['by', 15], ['sv', 25], ['fox', 25], ['pr', 18]]) { await p.evaluate(u => document.querySelector('[data-dcu="' + u + '"]').click(), u); await sleep(300);
    const c = await p.evaluate(u => [document.querySelectorAll('.dc-row').length, DC.filter(d => dcU(d) === u && dcSeen(d)).length], u); ok(c[0] === c[1] && c[0] >= min, 'the ' + u + ' tab lists its reports: ' + c); }
  await p.evaluate(() => document.querySelector('[data-dcu="mcu"]').click()); await sleep(300);
  await p.evaluate(() => collShow('dc-bny')); await sleep(500);
  const ch = await p.evaluate(() => ({ btnA: document.querySelectorAll('.dc-chips button[data-dcp^="A:"]').length, spanT: document.querySelectorAll('.dc-chips span.v').length, btnT: document.querySelectorAll('.dc-chips button.v').length, spanO: document.querySelectorAll('.dc-chips span.o').length, btnO: document.querySelectorAll('.dc-chips button.o').length }));
  ok(ch.btnA > 0 && ch.spanT > 0 && !ch.btnT && ch.spanO > 0 && !ch.btnO, 'Compound found: hero links; Raft and Collection not found: plain names: ' + JSON.stringify(ch));
  await p.evaluate(() => document.querySelector('.dc-chips button[data-dcp^="A:"]').click()); await sleep(600);
  let w = await where(); ok(w.mode === 'cp' && w.rec, 'a hero file opens: ' + JSON.stringify(w));
  await back(); w = await where(); ok(w.mode === 'dc' && w.rec === 'dc-bny' && await p.evaluate(() => !!document.querySelector('.dc-head')), 'back returns to the report: ' + JSON.stringify(w));
  await back(); w = await where(); ok(w.mode === 'dc' && !w.rec, 'then to the list: ' + JSON.stringify(w));
  await back(); w = await where(); ok(!w.open && w.atl, 'then out to the Atlas: ' + JSON.stringify(w));
  await p.evaluate(() => openColl('dc')); await sleep(500);
  const typ = async q => { await p.fill('#dcQ', q); await sleep(300); return p.evaluate(() => [...document.querySelectorAll('.dc-row b')].map(x => x.textContent)); };
  let F = await typ('harlem'); ok(F.length >= 3 && F.some(x => /Harlem Rampage/.test(x)), 'search by place: ' + F);
  F = await typ('wakanda'); ok(F.some(x => /Battle of Wakanda/.test(x)), 'search by name');
  F = await typ('dora milaje'); ok(F.some(x => /Mount Bashenga/.test(x)), 'search by team: ' + F.length);
  F = await typ('natasha'); ok(F.some(x => /Battle of New York/.test(x)), 'search by who: ' + F.length);
  F = await typ('2016'); ok(F.some(x => /Lagos/.test(x)), 'search by year'); F = await typ('captain america'); ok(F.some(x => /Battle of New York/.test(x)) && F.some(x => /Celestial Island/.test(x)), 'search by alias: ' + F.length);
  F = await typ('zzzz'); ok(await p.evaluate(() => !!document.querySelector('.dc-body .sr-empty')), 'nothing found says so');
  await p.evaluate(() => document.querySelector('.pg-qx').click()); await sleep(300);
  for (const g of ['t', 'who', 'tm', 'yr']) { await p.evaluate(g => document.querySelector('[data-dcg="' + g + '"]').click(), g); await sleep(300);
    const r = await p.evaluate(() => ({ secs: document.querySelectorAll('.dc-body .rf-sec').length, rows: document.querySelectorAll('.dc-body .dc-row').length })); ok(r.secs > 3, 'group by ' + g + ': ' + JSON.stringify(r)); }
  await p.evaluate(() => document.querySelector('[data-dcg="tm"]').click()); await sleep(300);
  await p.evaluate(() => [...document.querySelectorAll('[data-dcf]')].find(b => b.dataset.dcf === 'The Avengers').click()); await sleep(300);
  F = await p.evaluate(() => [...document.querySelectorAll('.dc-row b')].map(x => x.textContent)); ok(F.includes('The Battle of New York') && !F.includes('The Westview Anomaly'), 'the Avengers section opens: ' + F.length);
  await p.evaluate(() => document.querySelector('[data-ixs="az"]').click()); await sleep(300);
  const az = await p.evaluate(() => [...document.querySelectorAll('.dc-row b')].map(x => x.textContent.replace(/^The /, ''))); ok(az.join() === az.slice().sort((a, b) => a.localeCompare(b)).join(), 'A to Z sorts');
  await p.evaluate(() => document.querySelector('[data-ixs="first"]').click()); await sleep(200);
  await p.evaluate(() => collShow('dc-bny')); await sleep(400);
  const tm = await p.evaluate(() => { const h = [...document.querySelectorAll('.co-h')].find(x => x.textContent === 'Teams'); return h ? [...h.nextElementSibling.children].map(x => x.textContent + ':' + x.tagName) : null; });
  ok(tm && tm.includes('The Avengers:BUTTON') && tm.some(x => /Chitauri:SPAN/.test(x)), 'teams on the report, linked where the index is found: ' + tm);
  ok(await p.evaluate(() => EGGS.some(e => e[0] === 'damagecontrol') && !!(state.eggs || {}).damagecontrol), 'the egg is listed and found');
  await p.evaluate(() => { closeColl(); }); await sleep(500);
  await p.evaluate(() => { atlSub('city', 'ny'); }); await sleep(700); await p.evaluate(() => atlSelect(document.getElementById('atlMap'), 'Midtown', true)); await sleep(800);
  ok(await p.evaluate(() => !!document.querySelector('.atl-dc')), 'Midtown has the Damage Control button');
  await p.evaluate(() => document.querySelector('.atl-dc').click()); await sleep(600); let w2 = await where(); ok(w2.open && w2.mode === 'dc', 'and it opens the reports');
  await p.evaluate(() => { closeColl(); }); await sleep(400); await p.evaluate(() => openFile()); await sleep(900); ok(await p.evaluate(() => !!document.querySelector('.hf-arch .ar-dc')), 'the Agent File lists Damage Control under Archives');
  // a battle replay's file button follows the same rule as the report's names: never into an index you haven't found
  const tr = async () => p.evaluate(() => { const out = { A: [0, 0], T: [0, 0] };   // [shown, hidden] per index, over every replay's every unit with a file
    for (const id of Object.keys(TR)) { if (!DC.some(d => d.id === id && dcSeen(d))) continue; openColl('dc', true, true); collShow(id); trOpen[id] = true;
      const sec = document.querySelector(`.tr[data-tr="${id}"]`); if (sec) sec.outerHTML = trHTML(id); else continue;
      TR[id].units.forEach((u, i) => { if (!u.f) return; trPick = i; trWho(id); const tg = u.f.split(':')[0], fb = document.querySelector(`.tr[data-tr="${id}"] [data-trf]`); out[tg][fb.hidden ? 1 : 0]++; }); trPick = null; }
    return out; });
  let t1 = await tr(); ok(t1.T[0] === 0 && t1.T[1] > 0 && t1.A[0] > 0, 'Raft not found: no replay opens a villain file; Compound found: hero files open: ' + JSON.stringify(t1));
  await p.evaluate(() => { state.raftIn = 1; state.cpIn = 0; }); let t2 = await tr();
  ok(t2.A[0] === 0 && t2.A[1] > 0 && t2.T[0] > 0, 'and the other way round: ' + JSON.stringify(t2));
  await p.evaluate(() => { state.cpIn = 0; state.raftIn = 0; const fb = document.createElement('button'); fb.dataset.trf = 'T:' + THREATS.find(o => rfSteps(o).length).id; document.querySelector('.tr').appendChild(fb); fb.click(); });
  await sleep(300); ok(await p.evaluate(() => collMode === 'dc'), 'a forced click on a hidden file button still goes nowhere');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();

