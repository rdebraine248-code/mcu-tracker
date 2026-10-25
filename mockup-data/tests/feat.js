const { open, full } = require('./h.js');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { browser, page, errs } = await open({ touch: true, state: { entered: 1 } });
  await full(page); await sleep(2500);
  const r = {};
  r.eps = await page.evaluate(() => ({ titles: [...new Set([...DATA.chapters, ...DATA.chars].flatMap(c => c.items.map(i => i.t)))].filter(t => epTotal(t)).length, aos67: epList('Agents of S.H.I.E.L.D. S6–S7'), carter2: epTotal('Agent Carter S2') }));
  await page.evaluate(() => { state.eps = {}; epSheet('tl::Agents of S.H.I.E.L.D. S6–S7'); }); await sleep(500);
  r.seasons = await page.evaluate(() => [...document.querySelectorAll('#rateSheet [data-eps]')].map(b => b.textContent));
  await page.evaluate(() => document.querySelector('#rateSheet [data-epn]').click()); await sleep(300);
  r.epSaved = await page.evaluate(() => ({ list: state.eps['tl::Agents of S.H.I.E.L.D. S6–S7'], shared: state.eps['Agents of S.H.I.E.L.D. S6–S7'] }));
  await page.evaluate(() => document.querySelector('#rateSheet .rs-done').click()); await sleep(500);
  // the Raft, first visit
  await page.evaluate(() => { document.querySelector('#dock [data-dock="atlas"]').click(); }); await sleep(1200);
  await page.evaluate(() => openColl('raft')); await sleep(800);
  r.raft = await page.evaluate(() => ({ title: document.querySelector('#collPanel .maptop h2').textContent, line: (document.querySelector('.rf-intake') || {}).textContent, rows: document.querySelectorAll('.rf-row').length, newBadges: document.querySelectorAll('.rf-row .nw').length }));
  await page.fill('#rfQ', 'loki'); await sleep(300);
  r.raftQ = await page.evaluate(() => [...document.querySelectorAll('.rf-body .rf-row b')].map(b => b.textContent).slice(0, 4));
  await page.evaluate(() => document.querySelector('.rf-body .rf-row').click()); await sleep(400);
  r.record = await page.evaluate(() => document.querySelector('.rf-head h3').textContent + ' / ' + document.querySelector('.rf-head small').textContent);
  await page.evaluate(() => history.back()); await sleep(500); await page.evaluate(() => history.back()); await sleep(700);
  r.afterBack = await page.evaluate(() => ({ coll: collOpen, atlas: atlOpen }));
  await page.fill('#atlQ', 'vormir'); await sleep(300);
  await page.evaluate(() => document.querySelector('[data-af]').click()); await sleep(1500);
  r.atlas = await page.evaluate(() => ({ view: atlView, sel: atlSel }));
  await page.evaluate(() => openColl()); await sleep(600);
  r.coll = await page.evaluate(() => document.querySelector('#collPanel .maptop h2').textContent);
  console.log(JSON.stringify(r, null, 1)); console.log('errs', errs); await browser.close();
})();
