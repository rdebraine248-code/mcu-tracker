// Agents of S.H.I.E.L.D. S6–S7 became two titles, S6 and S7 (October 2026): a save from before carries over to both
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
const T = 'Agents of S.H.I.E.L.D. S6–S7', S6 = 'Agents of S.H.I.E.L.D. S6', S7 = 'Agents of S.H.I.E.L.D. S7';
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  const old = { entered: 1, booted: 1, orderPicked: 1,
    checks: { ['ch-beyond-the-mcu::' + T]: true, ['tl::' + T]: true, ['cx-nick-fury-s-h-i-e-l-d::' + T]: true },
    eps: { ['tr::' + T]: [1, 2, 14, 15] }, rate: { [T]: 4 }, watchedOn: { [T]: '2026-01-02' },
    dSeen: { 'ch-beyond-the-mcu': { ['s:' + T]: 1 }, 'cx-nick-fury-s-h-i-e-l-d': { ['s:' + T]: 1 } }, msgs: { [T]: 1 } };
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify(old));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const r = await p.evaluate(([T, S6, S7]) => {
    const has = k => !!state.checks[k], any = k => Object.keys(state.checks).some(x => x.includes(T));
    return { checks: ['ch-beyond-the-mcu::', 'tl::', 'cx-s-h-i-e-l-d::'].map(p => has(p + S6) && has(p + S7)), stale: any(), eps: [state.eps['tr::' + S6], state.eps['tr::' + S7]],
      rate: [state.rate[S6], state.rate[S7]], on: [state.watchedOn[S6], state.watchedOn[S7]], ds: [state.dSeen['ch-beyond-the-mcu']['s:' + S6], state.dSeen['ch-beyond-the-mcu']['s:' + S7], state.dSeen['ch-beyond-the-mcu']['s:' + T]], dsh: [state.dSeen['cx-s-h-i-e-l-d'] && state.dSeen['cx-s-h-i-e-l-d']['s:' + S6], state.dSeen['cx-s-h-i-e-l-d'] && state.dSeen['cx-s-h-i-e-l-d']['s:' + S7]],
      tl: [DATA.timeline.some(e => e.t === T), DATA.timeline.findIndex(e => e.t === S7) - DATA.timeline.findIndex(e => e.t === S6)],
      tr: DATA.timelineRelease.map(e => e.t).filter(t => [S6, S7, 'Runaways S3', 'The New Mutants', 'Dark Phoenix'].includes(t)),
      box: DATA.chapters.find(c => c.id === 'ch-beyond-the-mcu').items.map(i => i.t).filter(t => t.startsWith('Agents of S.H.I.E.L.D.')),
      log: DOSSIERS['ch-beyond-the-mcu'].story.map(x => x[0]).filter(t => t.startsWith('Agents of S.H.I.E.L.D.')),
      msg: msgSeen().some(m => msgId(m) === T && m.t === S7) && !!state.msgs[T],
      gate: [atlSeenStep(['In season 7, x', 'Agents of S.H.I.E.L.D.']), atlSeenStep(['In season 5, x', 'Agents of S.H.I.E.L.D.'])] }; }, [T, S6, S7]);
  ok(r.checks.every(Boolean) && !r.stale, 'checkmarks split to both seasons ' + JSON.stringify(r.checks));
  ok(JSON.stringify(r.eps) === '[[1,2],[1,2]]', 'episodes cut at season 6\'s 13 ' + JSON.stringify(r.eps));
  ok(r.rate.join() === '4,4' && r.on.join() === '2026-01-02,2026-01-02', 'rating and date to both');
  ok(r.ds[0] && r.ds[1] && !r.ds[2], 'read log entry to both');
  ok(r.dsh[0] && r.dsh[1], 'the combined box\'s read entry reaches S.H.I.E.L.D.\'s log');
  ok(!r.tl[0] && r.tl[1] === 1, 'story timeline: S6 then S7');
  ok(JSON.stringify(r.tr) === JSON.stringify([S6, 'Dark Phoenix', 'Runaways S3', S7, 'The New Mutants']), 'release order ' + JSON.stringify(r.tr));
  ok(JSON.stringify(r.box) === JSON.stringify([S6, S7]) && JSON.stringify(r.log) === JSON.stringify([S6, S7]), 'Extras box and log');
  ok(r.msg, "Coulson's message moves to S7 and stays read");
  ok(r.gate[0] && !r.gate[1], 'a season 7 step opens with S7 ' + JSON.stringify(r.gate));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
