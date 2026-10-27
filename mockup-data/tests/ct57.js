// back always returns to where you were (October 2026): a Compound file that opens its Raft file is one step, so back from the Raft file
// returns to the Compound file, then to the Compound's list, then out to the Atlas; the same the other way round
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  await p.evaluate(() => { const st = state; st.checks = {}; DATA.chapters.forEach(c => { st.unlocked[c.id] = true; c.items.forEach(i => st.checks[ck(c, i.t)] = true); }); DATA.timeline.forEach(e => st.checks['tl::' + e.t] = true);
    st.mvEver = 1; st.incEver = 1; st.charOpen = {}; st.seen = {}; DATA.chars.forEach(c => { st.charOpen[c.id] = 1; st.seen[c.id] = true; c.items.forEach(i => st.checks[ck(c, i.t)] = true); }); st.raftIn = 1; st.cpIn = 1; st.collIn = 1; persist(); });
  await p.reload(); await sleep(9000); await p.evaluate(() => { const g = [...document.querySelectorAll('button')].find(b => /got it/i.test(b.textContent)); if (g) g.click(); }); await sleep(400);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const where = () => p.evaluate(() => ({ open: collOpen, mode: collMode, rec: collRec, atl: atlOpen }));
  const back = async () => { await p.goBack().catch(() => {}); await sleep(700); };
  const id = await p.evaluate(() => ALLIES.find(a => a.rf && cpSteps(a).length && THREATS.find(x => x.id === a.rf && rfSteps(x).length)).id);
  await p.evaluate(() => openAtlas()); await sleep(800);
  await p.evaluate(() => openColl('cp')); await sleep(500); await p.evaluate(i => collShow(i), id); await sleep(500);
  await p.evaluate(() => document.querySelector('[data-cprf]').click()); await sleep(600);
  let w = await where(); ok(w.mode === 'raft' && w.rec, 'the Raft file opens: ' + JSON.stringify(w));
  await back(); w = await where(); ok(w.open && w.mode === 'cp' && w.rec === id, 'back returns to the Compound file: ' + JSON.stringify(w));
  ok(await p.evaluate(() => !!document.querySelector('#collPanel .cp-id')), 'and it is drawn as a Compound file');
  await back(); w = await where(); ok(w.open && w.mode === 'cp' && !w.rec, 'then to the Compound list: ' + JSON.stringify(w));
  await back(); w = await where(); ok(!w.open && w.atl, 'then out to the Atlas: ' + JSON.stringify(w));
  // the other way: a villain's hero file, and back
  const tid = await p.evaluate(() => { const a = ALLIES.find(a => a.rf && cpSteps(a).length && THREATS.find(x => x.id === a.rf && rfSteps(x).length)); return a.rf; });
  await p.evaluate(() => openColl('raft')); await sleep(500); await p.evaluate(i => collShow(i), tid); await sleep(500);
  await p.evaluate(() => document.querySelector('[data-rfcp]').click()); await sleep(600);
  w = await where(); ok(w.mode === 'cp', 'the hero file opens from the Raft');
  await back(); w = await where(); ok(w.mode === 'raft' && w.rec === tid, 'back returns to the Raft file: ' + JSON.stringify(w));
  await p.evaluate(() => document.getElementById('collBack').click()); await sleep(700); w = await where(); ok(w.mode === 'raft' && !w.rec, 'the Back button goes to the Raft list: ' + JSON.stringify(w));
  await p.evaluate(() => document.getElementById('collBack').click()); await sleep(700); w = await where(); ok(!w.open && w.atl, 'and then out: ' + JSON.stringify(w));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
