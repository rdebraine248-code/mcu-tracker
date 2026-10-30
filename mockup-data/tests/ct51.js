// the indexes' Sort switch (October 2026): First seen (story order of first appearance, ties A to Z) or A to Z (ignoring a leading "The"),
// one setting for the Raft, the Compound and the Collection, kept with the save
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  const w = ['Iron Man', 'The Incredible Hulk', 'Iron Man 2', 'Thor', 'Captain America: The First Avenger', 'The Avengers', 'Iron Man 3', 'Captain America: The Winter Soldier', 'Avengers: Age of Ultron'];
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } },
    JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, raftIn: 1, cpIn: 1, collIn: 1, checks: Object.fromEntries(w.map(t => ['tl::' + t, true])) }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  // each open group's names, as shown
  const secs = () => p.evaluate(() => [...document.querySelectorAll('.rf-sec:not(.shut)')].map(s => [...s.querySelectorAll('.rf-row .rf-tx > b, .cp-card .cp-tx > b, .cx-case .cx-tx > b')].map(x => x.firstChild.textContent)));
  const sorted = L => L.every((n, i) => !i || L[i - 1].replace(/^The /, '').localeCompare(n.replace(/^The /, '')) <= 0);
  for (const mode of ['raft', 'cp', 'coll']) {
    await p.evaluate(m => { closeColl(true); openColl(m); }, mode); await sleep(300);
    ok(await p.$('[data-ixs="first"]') && await p.$('[data-ixs="az"]'), mode + ': the Sort switch shows');
    await p.click('[data-ixs="az"]'); await sleep(300);
    const S = await secs(); ok(S.length && S.every(sorted), mode + ': A to Z inside every group ' + JSON.stringify(S.map(x => x.slice(0, 4))));
    await p.click('[data-ixs="first"]'); await sleep(300);
  }
  // First seen keeps story order: the Raft's Active group under First seen differs from A to Z when the story order isn't alphabetical
  await p.evaluate(() => { closeColl(true); openColl('raft'); }); await sleep(300);
  const first = await secs(); await p.click('[data-ixs="az"]'); await sleep(300); const az = await secs();
  ok(JSON.stringify(first) !== JSON.stringify(az), 'First seen and A to Z give different orders');
  ok(await p.evaluate(() => JSON.parse(localStorage.getItem('mcu-watch-tracker-v1')).ixAZ === 1), 'the choice is saved');
  await p.evaluate(() => { closeColl(true); openColl('cp'); }); await sleep(300);
  ok(await p.evaluate(() => document.querySelector('[data-ixs="az"]').getAttribute('aria-pressed') === 'true'), 'one setting for all three indexes');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
