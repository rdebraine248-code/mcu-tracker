// the indexes' scroll (October 2026): opening the Raft, the Compound or the Collection starts at the top, never at the last index's place;
// backing out of a file returns to the same spot in the list
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  const w = ['Iron Man', 'The Incredible Hulk', 'Iron Man 2', 'Thor', 'Captain America: The First Avenger', 'The Avengers', 'Iron Man 3', 'Captain America: The Winter Soldier', 'Avengers: Age of Ultron', 'Captain America: Civil War', 'Avengers: Infinity War', 'Avengers: Endgame'];
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } },
    JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, raftIn: 1, cpIn: 1, collIn: 1, checks: Object.fromEntries(w.map(t => ['tl::' + t, true])) }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500);
  const P = () => document.getElementById('collPanel');
  const r = {};
  r.raftOpen = await p.evaluate(() => { openColl('raft'); return document.getElementById('collPanel').scrollTop; });
  await p.evaluate(() => { document.getElementById('collPanel').scrollTop = 1500; }); await sleep(200);
  r.raftScrolled = await p.evaluate(() => document.getElementById('collPanel').scrollTop);
  await p.evaluate(() => closeColl(true)); await sleep(200);
  await p.evaluate(() => openColl('cp')); await sleep(300);
  r.cpAfterRaft = await p.evaluate(() => document.getElementById('collPanel').scrollTop);
  // inside one index: scroll, open a file, back out: the list returns to the same spot
  await p.evaluate(() => { const v = document.getElementById('collPanel'); v.scrollTop = 900; }); await sleep(200);
  const at = await p.evaluate(() => document.getElementById('collPanel').scrollTop);
  await p.evaluate(() => { collShow(document.querySelector('[data-co]').dataset.co); }); await sleep(300);
  await p.evaluate(() => collGrid(true)); await sleep(300);
  r.backInList = [at, await p.evaluate(() => document.getElementById('collPanel').scrollTop)];
  await p.evaluate(() => closeColl(true)); await sleep(200);
  await p.evaluate(() => openColl('coll')); await sleep(300);
  r.collAfterCp = await p.evaluate(() => document.getElementById('collPanel').scrollTop);
  const fails = [];
  if (r.cpAfterRaft !== 0) fails.push('the Compound opened at the Raft\'s scroll ' + r.cpAfterRaft);
  if (r.collAfterCp !== 0) fails.push('the Collection opened at the Compound\'s scroll ' + r.collAfterCp);
  if (r.backInList[0] !== r.backInList[1] || !r.backInList[0]) fails.push('backing out of a file lost the list position ' + JSON.stringify(r.backInList));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
