// ct65 (owner, November 2026): a file opened from the Network, its group tapped: the Compound opens filtered by that group (not back to the
// Network), and back from that list returns to the Network. Kate Bishop with only Hawkeye watched, her Bishop Security chip.
const { open } = require('./h.js');
(async () => {
  const { browser, page, errs } = await open({ wait: 2500 });
  await page.evaluate(() => { const st = { checks: {}, unlocked: {}, seen: {}, mode: 'chapters', entered: 1, booted: 1, orderPicked: 1, cpIn: 1, raftIn: 1, collIn: 1 };
    const c = DATA.chapters.find(c => c.items.some(i => i.t === 'Hawkeye')); st.checks[c.id + '::Hawkeye'] = true;
    localStorage.setItem('mcu-watch-tracker-v1', JSON.stringify(st)); });
  await page.reload(); await page.waitForTimeout(4000);
  await page.evaluate(() => openNet()); await page.waitForTimeout(3000);
  const W = () => page.evaluate(() => ({ net: netOpen, coll: collOpen, mode: collMode, rec: collRec, team: cpTeamF }));
  await page.evaluate(() => netOpenFile('kate-bishop')); await page.waitForTimeout(1200);
  const a = await W();
  const b = await page.$('#collPanel [data-cpt="Bishop Security"]'); if (b) { await b.scrollIntoViewIfNeeded(); await b.click(); } await page.waitForTimeout(1200);
  const c = await W(), roster = await page.evaluate(() => (document.querySelector('#collPanel') || {}).textContent.includes('Bishop Security'));
  await page.goBack(); await page.waitForTimeout(1200); const d = await W();
  const bad = [];
  if (!(a.coll && a.rec === 'kate-bishop')) bad.push('file did not open: ' + JSON.stringify(a));
  if (!b) bad.push('no Bishop Security chip');
  if (!(c.coll && c.rec === null && c.mode === 'cp' && c.team === 'Bishop Security' && roster)) bad.push('chip did not open the filtered Compound: ' + JSON.stringify(c));
  if (!(d.net && !d.coll)) bad.push('back from the list did not return to the Network: ' + JSON.stringify(d));
  console.log(bad.length ? 'FAIL\n' + bad.join('\n') : 'ok'); if (errs.length) console.log(errs.join('\n'));
  await browser.close(); process.exit(bad.length ? 1 : 0); })();
