const { open, full, S } = require('./h.js');
(async () => {
  for (const mode of ['empty', 'full']) {
    const { browser, page, errs } = await open({ state: { entered: 1 } });
    if (mode === 'full') await full(page);
    for (const m of ['chapters', 'timeline', 'chars']) {
      await page.evaluate(m => { state.mode = m; persist(); renderAll(); }, m); await page.waitForTimeout(300);
      const ids = await page.evaluate(() => [...document.querySelectorAll('#view .tile')].map(t => [t.dataset.id, t.dataset.kind]));
      for (const [id, kind] of ids) {
        await page.evaluate(([id, kind]) => { const L = kind === 'char' ? DATA.chars : DATA.chapters, e = L.find(c => c.id === id); if (kind === 'chapter' && !state.unlocked[id]) return; openPanel(e, kind, document.querySelector(`.tile[data-id="${id}"]`)); }, [id, kind]);
        await page.waitForTimeout(150);
        const has = await page.$('#btnDossier'); if (has && await has.isVisible()) { await page.evaluate(() => document.getElementById('btnDossier').click()); await page.waitForTimeout(250); await page.evaluate(() => closeDossier()); }
        await page.evaluate(() => { if (openEntry) closePanel(); }); await page.waitForTimeout(120);
      }
    }
    for (const d of ['log', 'atlas', 'map', 'comms', 'file', 'story']) { await page.evaluate(d => { if (d === 'map' && !document.querySelector('#dock [data-dock="map"]')) { document.querySelector('#dock [data-dock="log"]').click(); document.querySelector('#dossier [data-logv="paths"]').click(); } else document.querySelector(`#dock [data-dock="${d}"]`).click(); }, d); await page.waitForTimeout(700); }
    await page.evaluate(() => { for (const v of ['earth', 'cosmos', 'beyond', 'multi', 'incursions']) try { openAtlas(); atlSwitch(v); } catch (e) { console.error('atlas ' + v + ' ' + e.message); } });
    await page.waitForTimeout(800);
    console.log(mode, errs.length ? errs : 'no errors'); await browser.close();
  }
})();

// run after smoke: no closed page may stay on screen
require("child_process").execFileSync("node", [__dirname + "/overlay.js"], { stdio: "inherit", env: process.env });

// and the ticker never runs over a box as it opens
require("child_process").execFileSync("node", [__dirname + "/tickcut.js"], { stdio: "inherit", env: process.env });
