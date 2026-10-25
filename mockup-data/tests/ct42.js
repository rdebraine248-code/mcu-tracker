// chapters 3 to 6 reorganized (October 2026) and "Completed" once ever: a save from before both carries over
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  const ch2 = ['Thor: The Dark World', 'Guardians of the Galaxy', 'Guardians of the Galaxy Vol. 2', 'I Am Groot', 'Captain Marvel'];
  const old = { entered: 1, booted: 1, orderPicked: 1,
    checks: Object.assign({ 'ch-3::Daredevil S1': true, 'ch-4::Ant-Man': true, 'ch-4::The Defenders': true, 'ch-5::Agents of S.H.I.E.L.D. S4': true,
      'ch-5::Agents of S.H.I.E.L.D.: Slingshot': true, 'ch-5::Agents of S.H.I.E.L.D. S5': true, 'ch-3::Iron Man 3': true }, Object.fromEntries(ch2.map(t => ['ch-2::' + t, true]))),
    eps: { 'ch-3::Daredevil S1': [1, 2], 'ch-5::Agents of S.H.I.E.L.D. S4': [3] },
    dSeen: { 'ch-3': { 's:Daredevil S1': 1, 's:Iron Man 3': 1, d: 1, 'r0.0': 1 }, 'ch-5': { 's:Agents of S.H.I.E.L.D. S5': 1, d: 1 }, 'ch-1': { d: 1 } },
    achSeen: { 'ch-ch-2': 1 } };
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify(old));
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: require('fs').readFileSync(process.argv[2], 'utf8'), contentType: 'text/html' }); return r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://t/'); await sleep(2500);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const r = await p.evaluate(() => {
    const said = []; const was = window.say; window.say = (...a) => { said.push(String(a[0])); };
    const C = id => DATA.chapters.find(c => c.id === id);
    const o = { checks: Object.keys(state.checks).filter(k => state.checks[k]).sort(), eps: state.eps, dSeen: JSON.parse(JSON.stringify(state.dSeen)), chReorg: state.chReorg, boxDone: Object.assign({}, state.boxDone) };
    o.items = Object.fromEntries(['ch-3', 'ch-4', 'ch-5', 'ch-6'].map(id => [id, C(id).items.map(i => i.t)]));
    o.logs = Object.fromEntries(['ch-3', 'ch-4', 'ch-5', 'ch-6'].map(id => [id, DOSSIERS[id].story.map(x => x[0])]));
    boxNews(C('ch-1'), 'Complete', undefined, true); boxNews(C('ch-1'), 'Complete', undefined, true); boxNews(C('ch-2'), 'Complete', undefined, true);
    const ch = DATA.chars[0]; boxNews(ch, 'Complete', undefined, true); boxNews(ch, 'Complete', undefined, true);
    o.said = said.slice(); window.say = was;
    state.dSeen['ch-3'].d = 1; persist();
    return o; });
  const has = k => r.checks.includes(k);
  ['ch-5::Daredevil S1', 'ch-3::Ant-Man', 'ch-5::The Defenders', 'ch-4::Agents of S.H.I.E.L.D. S4', 'ch-4::Agents of S.H.I.E.L.D.: Slingshot', 'ch-6::Agents of S.H.I.E.L.D. S5', 'ch-3::Iron Man 3'].forEach(k => ok(has(k), 'tick moved: ' + k));
  ['ch-3::Daredevil S1', 'ch-4::Ant-Man', 'ch-5::Agents of S.H.I.E.L.D. S4'].forEach(k => ok(!has(k), 'old tick gone: ' + k));
  ok(JSON.stringify(r.eps['ch-5::Daredevil S1']) === '[1,2]' && JSON.stringify(r.eps['ch-4::Agents of S.H.I.E.L.D. S4']) === '[3]', 'episodes moved');
  ok(r.dSeen['ch-5']['s:Daredevil S1'] && !r.dSeen['ch-3']['s:Daredevil S1'] && r.dSeen['ch-3']['s:Iron Man 3'], 'read entries moved');
  ok(r.dSeen['ch-6']['s:Agents of S.H.I.E.L.D. S5'], 'AoS S5 read mark to ch-6');
  ok(!r.dSeen['ch-3'].d && !r.dSeen['ch-3']['r0.0'] && !r.dSeen['ch-5'].d && r.dSeen['ch-1'].d, 'rewritten debriefs and periods read as new, others untouched');
  ok(r.chReorg === 1, 'migration flagged');
  ok(r.boxDone['ch-2'] && !r.boxDone['ch-1'], 'finished box counts as announced');
  ok(r.items['ch-5'].length === 13 && r.items['ch-3'].includes('Ant-Man') && r.items['ch-6'].includes('Agents of S.H.I.E.L.D. S5'), 'new boxes');
  ['ch-3', 'ch-4', 'ch-5', 'ch-6'].forEach(id => ok(JSON.stringify(r.items[id]) === JSON.stringify(r.logs[id]), 'log follows box: ' + id));
  ok(r.said.length === 2, 'Completed once per box (said ' + JSON.stringify(r.said) + ')');
  // a reload doesn't migrate twice: the debrief read after the move stays read
  await sleep(300); await p.reload(); await sleep(2000);   // the same tab, so the old save isn't seeded again
  const r2 = await p.evaluate(() => ({ d: state.dSeen['ch-3'].d, b: state.boxDone['ch-1'] }));
  ok(r2.d === 1 && r2.b === 1, 'no second migration; announced stays announced');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
