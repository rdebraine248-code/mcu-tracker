const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  const old = { entered: 1, booted: 1, orderPicked: 1, checks: { 'ch-beyond-the-mcu::Agents of S.H.I.E.L.D.': true, 'ch-beyond-the-mcu::Agents of S.H.I.E.L.D.: Slingshot': true },
    eps: { 'ch-beyond-the-mcu::Agent Carter': [1, 2, 8, 9, 12], 'ch-beyond-the-mcu::Agents of S.H.I.E.L.D.': [1, 23, 111, 136] }, rate: { 'Agent Carter': { r: 4 } } };
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify(old));
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: require('fs').readFileSync(process.argv[2], 'utf8'), contentType: 'text/html' }); return r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://t/'); await sleep(2500);
  const r = await p.evaluate(() => {
    const o = { checks: Object.keys(state.checks).filter(k => state.checks[k]), eps: state.eps, rate: Object.keys(state.rate) };
    // season steps open season by season; a whole show nobody lists counts once every season is in
    const coul = [...ALLIES, ...THREATS, ...COLLX].filter(x => x.st.some(s => s[1] === 'Agents of S.H.I.E.L.D.'));
    state.checks = { 'ch-3::Agents of S.H.I.E.L.D. S1': true };
    o.withS1 = coul.reduce((a, x) => a + x.st.filter(atlSeenStep).filter(s => s[1] === 'Agents of S.H.I.E.L.D.').length, 0);
    o.wholeS1 = atlSeenT('Agents of S.H.I.E.L.D.');
    ['ch-3::Agents of S.H.I.E.L.D. S2','ch-4::Agents of S.H.I.E.L.D. S3','ch-5::Agents of S.H.I.E.L.D. S4','ch-5::Agents of S.H.I.E.L.D. S5','ch-beyond-the-mcu::Agents of S.H.I.E.L.D. S6–S7'].forEach(k => state.checks[k] = true);
    o.wholeAll = atlSeenT('Agents of S.H.I.E.L.D.');
    o.allSteps = coul.reduce((a, x) => a + x.st.filter(s => s[1] === 'Agents of S.H.I.E.L.D.').length, 0);
    o.openAll = coul.reduce((a, x) => a + x.st.filter(atlSeenStep).filter(s => s[1] === 'Agents of S.H.I.E.L.D.').length, 0);
    // every title any index, the Atlas or the news uses can be opened by watching everything
    state.checks = {}; [...DATA.chapters, ...DATA.chars].forEach(c => c.items.forEach(i => state.checks[ck(c, i.t)] = true));
    const used = new Set([...ALLIES, ...THREATS, ...COLLX].flatMap(x => x.st.map(s => s[1])).concat(Object.keys(NEWS)));
    o.unreachable = [...used].filter(t => !atlSeenT(t));
    return o; });
  console.log(JSON.stringify(r, null, 1), 'errors', errs); await b.close(); })();
