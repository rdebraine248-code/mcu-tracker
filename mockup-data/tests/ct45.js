// a chapter's Period builds from the titles you've watched, in any order, as one range (October 2026); a Period you had read stays read
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  const old = { entered: 1, booted: 1, orderPicked: 1, checks: { 'cx-the-avengers::The Avengers': true }, dSeen: { 'ch-1': { 'r0.5': 1, d: 1 } } };
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify(old));
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: require('fs').readFileSync(process.argv[2], 'utf8'), contentType: 'text/html' }); return r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://t/'); await sleep(2500);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const r = await p.evaluate(() => {
    const C = id => DATA.chapters.find(c => c.id === id), o = {};
    o.seen = JSON.parse(JSON.stringify(state.dSeen['ch-1'])); o.v2 = state.perV2;
    o.only = slPer(C('ch-1')); slPlace('ch-1'); o.html = slHTML().includes('<p>2012</p>'); slPlace(null);
    state.checks['ch-1::Captain America: The First Avenger'] = true; o.two = slPer(C('ch-1'))[0];
    const run = (id, pick) => { const v = DOSSIERS[id].rows.period, on = new Set(pick === 'all' ? v.map(x => x[1]) : pick); return perNow(v, t => on.has(t))[0]; };
    o.cases = {
      ch1: run('ch-1', 'all'), ch1in: run('ch-1', ['Captain America: The First Avenger', 'Agent Carter S1', 'Agent Carter S2', 'Agent Carter (One-Shot)', 'Iron Man']),
      ch2: run('ch-2', 'all'), ch2cm: run('ch-2', ['Captain Marvel']), ch7: run('ch-7', 'all'), ch7wv: run('ch-7', ['WandaVision']),
      ch8: run('ch-8', ['Moon Knight']), ch6: run('ch-6', 'all'), ch9: run('ch-9', 'all'), ch11: run('ch-11', ['Ant-Man and the Wasp: Quantumania', 'Loki S2']), ch11all: run('ch-11', 'all'),
      by: run('ch-beyond-the-mcu', 'all'), fox: run('ch-the-fox-men', 'all'), foxA: run('ch-the-fox-men', ['X-Men: The Animated Series']),
      foxB: run('ch-the-fox-men', ['X-Men (2000)', 'X2']), foxC: run('ch-the-fox-men', ['X-Men (2000)', 'X-Men Origins: Wolverine']),
      sv: run('ch-the-spider-verse', ['Spider-Man: Into the Spider-Verse']), sv2: run('ch-the-spider-verse', ['Venom']),
      inc: run('ch-incursions', DOSSIERS['ch-incursions'].rows.period.slice(3, 6).map(x => x[1])) };
    const v = DOSSIERS['ch-1'].rows.period; o.key = perNow(v, () => true)[1] === String(v.length - 1);
    return o; });
  ok(r.only && r.only[0] === '2012', 'only The Avengers watched: 2012 (got ' + JSON.stringify(r.only) + ')');
  ok(r.html, 'the Story log shows it');
  ok(r.two === '1942 to 2012', 'with The First Avenger: one range (got ' + r.two + ')');
  ok(r.v2 === 1 && !r.seen['r0.5'] && r.seen['r0.' + r.only[1]] && r.seen.d, 'old read mark carried to the new Period (' + JSON.stringify(r.seen) + ')');
  ok(r.key, 'everything watched: the plain last-stage key');
  const want = { ch1: '1942 to 2012', ch1in: '1942 to 2008', ch2: '1995 to 2014', ch2cm: '1995', ch7: 'Outside of time, and 2023 to 2024', ch7wv: '2023',
    ch8: '2025', ch6: '2016 to 2024', ch9: "Across Wakanda's history, and 2025 to 2026", ch11: 'The Quantum Realm, and outside of time', ch11all: 'Across the multiverse',
    by: 'Other realities, and 1931 onward', fox: '1845 to 2029, and another world', foxA: 'Another world', foxB: '2000s', foxC: '1845 to the 2000s',
    sv: 'Countless worlds', sv2: 'One world', inc: 'Three worlds, lost' };
  Object.entries(want).forEach(([k, w]) => ok(r.cases[k] === w, k + ': want ' + w + ', got ' + r.cases[k]));
  // a reload doesn't migrate again
  await p.evaluate(() => { state.dSeen['ch-1']['r0.0'] = 1; persist(); }); await sleep(300); await p.reload(); await sleep(2000);
  const r2 = await p.evaluate(() => state.dSeen['ch-1']['r0.0']);
  ok(r2 === 1, 'no second migration');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
