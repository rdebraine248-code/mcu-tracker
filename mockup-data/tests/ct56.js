// the S.H.I.E.L.D. keycard (October 2026): a sideways swipe on the box's stripes brings up the reader with your own Agent ID; a swipe of the
// card through it verifies; once any of the Level 7 files is on your watch the doors open on them, each tied to one title (Pegasus to
// Captain Marvel, the Avengers Initiative to The Avengers, T.A.H.I.T.I. to Agents of S.H.I.E.L.D. S1) and the rest classified; with none of
// them watched, access denied; the egg counts once you close the files, and the box only pans up and down
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const cdp = await ctx.newCDPSession(p);
  const swipe = async (x0, x1, y) => { await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y }] }); for (let i = 1; i <= 12; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 + (x1 - x0) * i / 12, y: y + 2 }] }); await sleep(16); } await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); };
  const run = async watched => {
    await p.evaluate(w => { const st = state; st.checks = {}; st.eggs = {}; const c = DATA.chars.find(c => c.id === SHIELD_BOX); (st.charOpen = st.charOpen || {})[c.id] = 1; (st.seen = st.seen || {})[c.id] = true;
      c.items.forEach(i => { if (w.includes(i.t) || w === 'all') st.checks[ck(c, i.t)] = true; }); st.mode = 'chars'; persist(); }, watched);
    await p.reload(); await sleep(2500);
    await p.evaluate(() => activate(document.querySelector(`.tile[data-id="${SHIELD_BOX}"]`))); await sleep(1500);
    ok(await p.evaluate(() => panel.style.touchAction === 'pan-y'), 'the S.H.I.E.L.D. box pans only up and down');
    const r = await p.evaluate(() => { const s = panel.firstElementChild.getBoundingClientRect(); return [s.left, s.top, s.width]; });
    await swipe(r[0] + 20, r[0] + r[2] - 20, r[1] + 6); await sleep(1000);
    ok(await p.evaluate(() => { const k = document.getElementById('kcReader'); return k && !k.hidden && !!k.querySelector('.kcard .hf-id'); }), 'the reader comes up with the Agent ID');
    const c = await p.evaluate(() => { const k = document.getElementById('kcard').getBoundingClientRect(); return [k.left, k.top, k.width, k.height]; });
    await swipe(c[0] + 40, c[0] + c[2] + 80, c[1] + c[3] / 2); await sleep(5600);
    return p.evaluate(() => ({ files: [...document.querySelectorAll('#kcReader .kx-r')].map(x => x.classList.contains('lk') ? 'locked' : x.dataset.kf), egg: !!(state.eggs || {}).level7, denied: !!document.querySelector('#kcReader .kr.no') }));
  };
  let R = await run('all');
  ok(!R.egg && JSON.stringify(R.files) === '["pegasus","initiative","tahiti"]', 'granted with everything watched, and the egg waits until the files are closed: ' + JSON.stringify(R));
  await p.evaluate(() => document.querySelector('[data-kf="initiative"]').click()); await sleep(5200);
  ok(await p.evaluate(() => /Avengers Initiative/i.test(document.querySelector('#kcReader h4').textContent) && document.querySelectorAll('#kcReader p').length === 4 && /Avenger\.$/.test(document.querySelector('#kcReader p').textContent)), 'the Avengers Initiative file types out its four lines');
  await p.evaluate(() => document.getElementById('kcReader').click()); await sleep(400);
  ok(await p.evaluate(() => document.getElementById('kcReader').hidden && !!(state.eggs || {}).level7), 'closing the files counts the egg');
  R = await run(['Captain America: The First Avenger']);
  ok(R.denied && !R.egg, 'with none of the three files watched the reader turns you away: ' + JSON.stringify(R));
  R = await run(['Agents of S.H.I.E.L.D. S1']);
  ok(!R.denied && JSON.stringify(R.files) === '["locked","locked","tahiti"]', 'Agents of S.H.I.E.L.D. S1 alone opens T.A.H.I.T.I. and nothing else: ' + JSON.stringify(R));
  R = await run(['The Avengers']);
  ok(!R.denied && JSON.stringify(R.files) === '["locked","initiative","locked"]', 'The Avengers alone opens the Initiative: ' + JSON.stringify(R));
  ok(await p.evaluate(() => EGGS.some(e => e[0] === 'level7') && EGGS.find(e => e[0] === 'fury')[1] === 'They were in his jacket'), 'the eggs list');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
