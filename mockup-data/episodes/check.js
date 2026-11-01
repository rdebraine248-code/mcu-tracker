const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js');
(async () => {
  const { browser, page, errs } = await open({ state: { entered: 1 } }); await page.waitForTimeout(5000);
  console.log('applied:', JSON.stringify(await page.evaluate(() => { let st = 0, at = 0; [...ALLIES, ...THREATS].forEach(o => o.st.forEach(x => { if (/^In episode \d+,/.test(x[0])) st++; }));
    Object.values(ATLAS).forEach(L => Array.isArray(L) && L.forEach(p => (p.e || []).forEach(e => { if (/#\d+$/.test(e[0])) at++; })));
    return { steps: st, atlas: at, newsTitles: Object.keys(NEWS).filter(t => /#\d+$/.test(t)).length, msgs: COMMS.filter(m => /#\d+$/.test(m.t || '')).length }; })));
  const base = ['Captain America: The Winter Soldier', 'Avengers: Age of Ultron', 'Captain America: Civil War', 'Avengers: Infinity War', 'Avengers: Endgame'];
  const run = async eps => { await page.evaluate(([T, E]) => { state.checks = {}; T.forEach(t => DATA.chapters.forEach(c => { if (c.items.some(i => i.t === t)) { state.unlocked[c.id] = true; state.checks[c.id + '::' + t] = true; } }));
      state.cpIn = 1; state.raftIn = 1; state.eps = {}; DATA.chapters.forEach(c => { if (c.items.some(i => i.t === 'WandaVision')) state.eps[c.id + '::WandaVision'] = E; }); }, [base, eps]);
    const app = await page.evaluate(() => { const w = ALLIES.find(o => o.id === 'wanda-maximoff'); const S = cpSteps(w).filter(x => x[1] === 'WandaVision').map(x => stepTtl(x).replace(/<[^>]+>/g, ''));
      const at = []; Object.values(ATLAS).forEach(L => Array.isArray(L) && L.forEach(p => (p.e || []).forEach(e => { if (/^WandaVision/.test(e[0]) && atlEvSeen(e)) at.push(p.n + ' @' + tn(e[0])); })));
      return { file: S, atlas: at, news: newsPending().filter(x => /WandaVision/.test(x[0])).map(x => tn(x[0]) + ': ' + x[2]) }; });
    await page.evaluate(() => { openNet(); netSync(); }); await page.waitForTimeout(600); const f = page.frames().find(f => f !== page.mainFrame());
    const net = await f.evaluate(() => { const w = N.find(p => p.id === 'wanda-maximoff'); return w.R.filter(r => r.S.some(x => /^WandaVision/.test(x.t))).map(r => N[r.j].n + ' @' + epShow(r.S.find(x => /^WandaVision/.test(x.t)).t)).slice(0, 10); });
    await page.evaluate(() => closeNet(true)); return { ...app, net }; };
  for (const E of [[1], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9]]) console.log('WandaVision eps up to', E[E.length - 1], JSON.stringify(await run(E), null, 0));
  console.log('errors', errs); await browser.close();
})();
