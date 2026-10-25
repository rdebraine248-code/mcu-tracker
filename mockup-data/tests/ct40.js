// no level-up pill (the owner removed it): finishing the whole main line raises the level silently, and the Agent File shows no XP line
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const p = await (await b.newContext()).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://t/')) return r.fulfill({ body: require('fs').readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }); return r.continue(); });
  await p.goto('http://t/'); await sleep(2500);
  const r = await p.evaluate(async () => { const said = []; const s0 = window.say; window.say = (m, e, f) => said.push(f + ': ' + m);
    state.checks = {}; state.achSeen = {}; checkAch();
    const lv0 = xpLevel(xpOf(achList()), achList());
    DATA.timeline.filter(e => e.lane === 'main').forEach(e => state.checks['tl::' + e.t] = true); checkAch();
    await new Promise(r => setTimeout(r, 1200));
    renderFile(true);
    return { lv0, lv1: xpLevel(xpOf(achList()), achList()), said: said.filter(x => /Clearance|Level \d/.test(x)), xpLine: /\bXP\b/.test(document.getElementById('fileView').textContent), lvl: (document.querySelector('.hf-lvl') || {}).textContent }; });
  const ok = r.lv1 > r.lv0 && r.said.length === 0 && !r.xpLine && /Level \d/.test(r.lvl || '');
  console.log(ok ? 'ok' : 'FAIL', JSON.stringify(r), errs.join(' | ')); await b.close(); process.exit(ok && !errs.length ? 0 : 1); })();
