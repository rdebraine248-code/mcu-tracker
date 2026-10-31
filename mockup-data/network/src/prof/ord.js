const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js');
(async () => { const { browser, page } = await open({ state: { entered: 1 } });
  const T = require('./hub.json').titles;
  const r = await page.evaluate(T => { const L = DATA.timeline.map(e => e.t);
    return T.map(t => { let i = L.indexOf(t); if (i < 0) i = L.findIndex(x => x.startsWith(t + ' S') || x.startsWith(t + ':') || x.startsWith(t + ' (')); return i; }); }, T);
  const miss = T.filter((t, i) => r[i] < 0); console.log('mapped', T.length - miss.length, 'of', T.length, '| missing:', miss);
  require('fs').writeFileSync(__dirname + '/ord.json', JSON.stringify(r));
  await browser.close(); })();
