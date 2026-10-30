// a holder's name in the Collection (October 2026): it still lists everything they've held, and that list now carries their own file in the
// Compound or the Raft, the "Also on file" way, only for an index you've found; back from the file returns to the holder's list
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  await p.evaluate(() => { const st = state; DATA.chapters.forEach(c => { st.unlocked[c.id] = true; c.items.forEach(i => st.checks[ck(c, i.t)] = true); }); DATA.timeline.forEach(e => st.checks['tl::' + e.t] = true);
    st.mvEver = 1; st.incEver = 1; st.charOpen = {}; DATA.chars.forEach(c => { st.charOpen[c.id] = 1; c.items.forEach(i => st.checks[ck(c, i.t)] = true); }); st.collIn = 1; st.cpIn = 1; st.raftIn = 0; st.eggs = { collector: 1, compound: 1 }; persist(); });
  await p.reload(); await sleep(9000);
  const holder = async (obj, h, uni) => { await p.evaluate(() => { if (collOpen) closeColl(); }); await sleep(700);   // closing walks back through its steps first
    await p.evaluate(([obj, uni]) => { openColl('coll'); cxUni = uni; collShow(obj); }, [obj, uni]); await sleep(500);
    await p.evaluate(h => [...document.querySelectorAll('[data-cxh]')].find(x => x.dataset.cxh === h).click(), h); await sleep(500);
    return p.evaluate(() => ({ list: !collRec && !!document.querySelector('.tf-bar'), files: [...document.querySelectorAll('[data-cxo]')].map(x => x.dataset.cxo), labels: [...document.querySelectorAll('[data-cxo] small')].map(x => x.textContent) })); };
  // the filter is still the first thing a name does
  let r = await holder('arrow', 'Yondu Udonta', 'mcu');
  ok(r.list, 'a name still lists what they held');
  ok(r.files.join() === 'A:yondu', 'Raft not found: only the Compound file: ' + r.files);
  // into the file and back to the holder's list
  await p.evaluate(() => document.querySelector('[data-cxo]').click()); await sleep(600);
  ok(await p.evaluate(() => collMode === 'cp' && collRec === 'yondu'), 'the button opens his Compound file');
  await p.evaluate(() => history.back()); await sleep(700);
  ok(await p.evaluate(() => collMode === 'coll' && !collRec && cxHoldF === 'Yondu Udonta' && !!document.querySelector('[data-cxo]')), 'back returns to the holder\'s list, with the button');
  await p.evaluate(() => { state.raftIn = 1; }); r = await holder('arrow', 'Yondu Udonta', 'mcu');
  ok(r.files.join() === 'A:yondu,T:yondu', 'Raft found too: both his files: ' + r.files);
  await p.evaluate(() => { state.cpIn = 0; state.raftIn = 0; }); r = await holder('arrow', 'Yondu Udonta', 'mcu');
  ok(r.list && !r.files.length, 'neither index found: no file buttons, the list still works');
  await p.evaluate(() => { state.cpIn = 1; state.raftIn = 1; });
  // the same name in a tab of many continuities finds the right person
  r = await holder('sv-raimi-spider-man-suit', 'Spider-Man', 'sv'); ok(r.files.join() === 'A:sv-peter-parker-raimi', 'the Raimi suit\'s Spider-Man is the Raimi Peter: ' + r.files);
  r = await holder('sv-asm-spider-man-suit', 'Spider-Man', 'sv'); ok(r.files.join() === 'A:sv-peter-parker-asm', 'the Amazing suit\'s is his own Peter: ' + r.files);
  r = await holder('fox-cerebro', 'Charles Xavier', 'fox'); ok(r.files.length === 2 && r.labels.every(l => l.includes('First seen')) && new Set(r.labels).size === 2, 'Cerebro: the young and the old Charles, each saying which: ' + JSON.stringify(r));
  r = await holder('sv-raimi-octavius-arms', 'Doctor Strange', 'sv'); ok(!r.files.length, 'the Sanctum\'s Strange isn\'t a Spider-Verse file: ' + r.files);
  // every hand-made link names a real file and comes out
  const bad = await p.evaluate(() => { const out = [];
    for (const [k, ids] of Object.entries(CX_HOLD_AKA)) { const [u, h] = k.split('|'); ids.forEach(id => { if (!ALLIES.some(f => f.id === id) && !THREATS.some(f => f.id === id)) out.push('no file ' + id); });
      const objs = COLLX.filter(o => rfUniOf(o) === u && o.st.some(x => x[3] === h)); if (!objs.length) out.push('no holder ' + k); else if (!objs.some(o => cxHoldFiles(o, h).length)) out.push('no link ' + k); }
    for (const [k, L] of Object.entries(CX_HOLD_PICK)) { const [id, h] = k.split('|'), o = COLLX.find(x => x.id === id); if (!o || !o.st.some(x => x[3] === h)) out.push('no holder ' + k); if (cxHoldFiles(o, h).length !== L.length) out.push('missing file in ' + k); }
    return out; });
  ok(!bad.length, 'every hand-made link resolves: ' + bad.join(', '));
  // holders go by their file's name (names_fix.json "hold"), and Item 47's Bennie is spelled as the film spells him
  const nm = await p.evaluate(() => { const out = [], all = JSON.stringify([THREATS, ALLIES, COLLX]);
    if (/Benny/.test(all)) out.push('Benny still in the data');
    if (/AIDA/.test(all + JSON.stringify(DC))) out.push('AIDA still in the data');
    // one person, one name in every universe (October 2026): a variant goes by the main universe's name
    const nm1 = (L, id) => { const f = L.find(x => x.id === id); return f && (Array.isArray(f.n) ? f.n[f.n.length - 1][0] : f.n); };
    for (const [L, id, n] of [[THREATS, 'ronan', 'Ronan the Accuser'], [THREATS, 'by-ronan-xandar', 'Ronan the Accuser'], [THREATS, 'wenwu', 'Wenwu'], [ALLIES, 'by-wenwu-ten-rings', 'Wenwu'], [ALLIES, 'by-zombie-wenwu', 'Wenwu'], [THREATS, 'st-aida', 'Aida']])
      if (nm1(L, id) !== n) out.push(id + ' is ' + nm1(L, id) + ', not ' + n);
    const want = { arrow: 'Yondu Udonta', rings: 'Wenwu', 'by-zombie-ten-rings': 'Wenwu', 'by-dark-aster-nova': 'Ronan the Accuser', framework: 'Aida', 'st-billyclub': 'Benjamin Poindexter', 'fox-claws': 'Logan', 'sv-kraven-calypso-serum': 'Calypso Ezili', 'pr-surfer-board': 'Victor von Doom', 'kree-implant': 'The Kree Empire', 'item-47': 'Bennie and Claire' };
    for (const [id, h] of Object.entries(want)) { const o = COLLX.find(x => x.id === id); if (!o || !o.st.some(x => x[3] === h)) out.push('holder not renamed ' + id + ' ' + h); else if (!cxHoldFiles(o, h).length) out.push('no file for ' + id + ' ' + h); }
    for (const [u, old] of [['mcu', 'Yondu'], ['mcu', 'Ronan'], ['mcu', 'Savin'], ['mcu', 'Mobius'], ['mcu', 'Katy'], ['mcu', 'Dex Poindexter'], ['mcu', 'Alphonso Mackenzie'], ['fox', 'James Howlett'], ['sv', 'Calypso']])   // What If's Ronan is filed as Ronan, so only these universes
      if (COLLX.some(o => rfUniOf(o) === u && o.st.some(x => x[3] === old))) out.push('old holder name left: ' + u + ' ' + old);
    return out; });
  ok(!nm.length, 'holders go by their files\' names: ' + nm.join(', '));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
