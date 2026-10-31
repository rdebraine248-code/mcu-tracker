const { open, full } = require('./h.js');
// every panel that isn't open must not be on screen, on every page, from a fresh launch
(async () => {
  for (const prof of ['empty', 'full']) {
    const { browser, page, errs } = await open({ state: { entered: 1 } }); if (prof === 'full') await full(page);
    const vis = () => page.evaluate(() => [...document.querySelectorAll('.filepanel, .mappanel, .dossier, .panel')].filter(e => getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0 && (e.hidden || e.hasAttribute('hidden'))).map(e => e.id));
    const out = { start: await vis() };
    for (const d of ['log', 'atlas', 'map', 'comms', 'file', 'story']) { await page.evaluate(d => { if (d === 'map' && !document.querySelector('#dock [data-dock="map"]')) { document.querySelector('#dock [data-dock="log"]').click(); document.querySelector('#logHead [data-logt="paths"]').click(); } else document.querySelector(`#dock [data-dock="${d}"]`).click(); }, d); await page.waitForTimeout(700);
      out[d] = await page.evaluate(d => { const open = { log: 'dossier', atlas: 'atlasPanel', map: 'mapPanel', comms: 'commsPanel', file: 'filePanel', story: null }[d];
        return [...document.querySelectorAll('.filepanel, .mappanel, #dossier')].filter(e => getComputedStyle(e).display !== 'none' && e.id !== open).map(e => e.id); }, d); }
    console.log(prof, JSON.stringify(out), errs); await browser.close();
  }
})();
