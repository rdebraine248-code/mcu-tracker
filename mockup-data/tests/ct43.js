// X-Men '97 and I Am Groot split into seasons in release order only: an old release-order tick is season 1, episodes go to their seasons,
// and "In season N," steps open season by season
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const run = async (b, old, fn) => { const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify(old));
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: require('fs').readFileSync(process.argv[2], 'utf8'), contentType: 'text/html' }); return r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2200);
  const r = await p.evaluate(fn); await ctx.close(); return [r, errs]; };
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); }, all = [];
  const base = { entered: 1, booted: 1, orderPicked: 1 };
  const look = () => { const steps = t => [...ALLIES, ...THREATS, ...COLLX].flatMap(x => x.st).filter(s => s[1] === t);
    const open = (t, n) => steps(t).filter(s => s[0].startsWith('In season ' + n + ',')).filter(atlSeenStep).length;
    return { checks: Object.keys(state.checks).filter(k => state.checks[k]).sort(), eps: state.eps, rate: state.rate,
      x1: open("X-Men '97", 1), x2: open("X-Men '97", 2), g1: open('I Am Groot', 1), g2: open('I Am Groot', 2),
      xAll: steps("X-Men '97").length, unpre: steps("X-Men '97").concat(steps('I Am Groot')).filter(s => !/^In season \d,/.test(s[0])).length }; };
  // an old release tick, part of season 2's episodes: season 1 only, episodes split
  let [r, e] = await run(b, { ...base, checks: { "tr::X-Men '97": true, 'tr::I Am Groot': true }, eps: { "tr::X-Men '97": [1, 2, 11, 12] }, rate: { "X-Men '97": { r: 5 } } }, look); all.push(...e);
  ok(r.checks.includes("tr::X-Men '97 S1") && !r.checks.includes("tr::X-Men '97 S2") && !r.checks.includes("tr::X-Men '97"), 'old tick -> S1 only');
  ok(r.checks.includes('tr::I Am Groot S1') && !r.checks.includes('tr::I Am Groot S2'), 'I Am Groot tick -> S1 only');
  ok(JSON.stringify(r.eps["tr::X-Men '97 S1"]) === '[1,2]' && JSON.stringify(r.eps["tr::X-Men '97 S2"]) === '[1,2]', 'episodes split by season');
  ok(r.rate["X-Men '97 S1"] && r.rate["X-Men '97 S1"].r === 5, 'rating carried to S1');
  ok(r.x1 > 0 && r.x2 === 0 && r.g1 > 0 && r.g2 === 0, 'season 1 steps open, season 2 shut: ' + JSON.stringify([r.x1, r.x2, r.g1, r.g2]));
  ok(r.unpre === 0, 'every step has its season');
  // every season 2 episode watched counts season 2
  [r, e] = await run(b, { ...base, checks: {}, eps: { "tr::X-Men '97": [11, 12, 13, 14, 15, 16, 17, 18, 19] } }, look); all.push(...e);
  ok(r.checks.includes("tr::X-Men '97 S2") && !r.checks.includes("tr::X-Men '97 S1"), 'all S2 episodes -> S2 ticked');
  // the story order and the box keep one title, which opens both seasons
  [r, e] = await run(b, { ...base, checks: { "tl::X-Men '97": true, "ch-2::I Am Groot": true } }, look); all.push(...e);
  ok(r.x1 > 0 && r.x2 > 0 && r.x1 + r.x2 === r.xAll && r.g1 > 0 && r.g2 > 0, 'whole show opens every season');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', all.length ? 'errors ' + all.join(' | ') : '');
  await b.close(); process.exit(fails.length || all.length ? 1 : 0); })();
