// the Network (owner, 16 November 2026): a file's preview shows its person's connections whatever tab the Network last showed ("Christine
// Palmer in beyond mcu tab network preview has no lines"), and a tab you go back to reuses its room ("Same slowdown happens going to sacred
// timeline tab in network"): the second visit is a fraction of the first, laid out exactly the same
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const ctx = await b.newContext({ viewport: { width: 384, height: 832 }, hasTouch: true });
  await ctx.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' });
    if (/\/network\.html/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), 'network.html'), contentType: 'text/html; charset=utf-8' });
    return u === 'http://t/' ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue(); });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {}, eggs: { compound: 1, raft: 1 }, cpIn: 1, raftIn: 1 }));
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://t/'); await sleep(1800);
  await p.evaluate(() => { [...DATA.chapters, ...DATA.chars].forEach(c => c.items.forEach(i => { state.checks[ck(c, i.t)] = true; })); persist(); });
  await p.reload(); await sleep(7000);
  await p.evaluate(() => openNet()); await sleep(2500);
  const f = p.frames().find(x => /network/.test(x.url())); ok(!!f, 'no Network frame');
  // the preview, with the Network on each tab
  for (const u of ['mcu', 'by']) { await f.evaluate(u => setUni(u), u); await sleep(600);
    const v = await f.evaluate(() => [netPreview('by-christine-palmer'), netPreview('wanda-maximoff')].map(x => x && x.n));
    ok(v[0] >= 1 && v[1] >= 10, 'with the Network on ' + u + ', previews: Christine ' + v[0] + ', Wanda ' + v[1]); }
  // the room laid out once per tab: back on the Sacred Timeline, the same room, much quicker
  const go = u => f.evaluate(u => { const t0 = performance.now(); setUni(u); return [performance.now() - t0, N.filter(q => q.vis).slice(0, 40).map(q => Math.round(q.hx) + ',' + Math.round(q.hy)).join(' ')]; }, u);
  await go('by'); await sleep(300); const a = await go('mcu'); await sleep(300); await go('sv'); await sleep(300); const c = await go('mcu');
  ok(c[1] === a[1], 'the Sacred Timeline room moved between visits');
  ok(c[0] < a[0] / 3 || c[0] < 150, 'going back to the Sacred Timeline took ' + Math.round(c[0]) + ' ms (first ' + Math.round(a[0]) + ')');
  ok(!errs.length, 'page errors: ' + errs.slice(0, 2).join(' | '));
  await b.close(); console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok: Network previews and tabs'); process.exit(fails.length ? 1 : 0); })();
