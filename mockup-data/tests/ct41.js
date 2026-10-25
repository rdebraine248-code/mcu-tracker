const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext();
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, cpSeen: { 'by-st-daisy-johnson': 1, 'by-st-shield': 1 }, raftSeen: { 'by-st-hydra': 1 }, collSeen: { 'by-darkhold': 1 } }));
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: require('fs').readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }); return r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500);
  console.log(await p.evaluate(() => JSON.stringify({ cp: state.cpSeen, raft: state.raftSeen, coll: state.collSeen,
    tabs: Object.fromEntries(['mcu', 'by'].map(u => [u, ALLIES.filter(o => rfUniOf(o) === u).length + THREATS.filter(o => rfUniOf(o) === u).length + COLLX.filter(o => rfUniOf(o) === u).length])),
    byLeft: [...ALLIES, ...THREATS, ...COLLX].filter(o => o.id.startsWith('by-') && o.st.some(s => /^Agent Carter|Slingshot/.test(s[1]) || (s[1] === 'Agents of S.H.I.E.L.D.' && !/^In season [67],/.test(s[0])))).map(o => o.id) })), errs);
  await b.close(); })();
