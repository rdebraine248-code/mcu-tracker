const { open, full } = require('./h.js');
(async () => {
  for (const ver of ['new']) {
  const { browser, page, errs } = await open({ state: { entered: 1 } }); await full(page, { news: {}, msgs: {} });
  const vis = () => page.evaluate(() => { const w = document.getElementById('whih'), r = w.getBoundingClientRect(); return !w.hidden && w.classList.contains('in') ? 1 : 0; });
  for (let i = 0; i < 25 && !(await vis()); i++) await page.waitForTimeout(400);
  await page.waitForTimeout(1000);
  const tile = await page.evaluate(() => { const t = document.querySelector('.tile[data-id="ch-1"]'); t.scrollIntoView({ block: 'center' }); const r = t.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  await page.waitForTimeout(300); const before = await vis();
  await page.mouse.click(tile[0], tile[1]);
  const samples = []; for (let i = 0; i < 12; i++) { samples.push(await vis()); await page.waitForTimeout(50); }
  await page.waitForTimeout(2000); const inBox = await vis();
  await page.evaluate(() => uiClose()); await page.waitForTimeout(4000); const back = await vis();
  console.log(JSON.stringify({ before, samples: samples.join(''), inBox, backOnStory: back }), errs); await browser.close(); }
})();
