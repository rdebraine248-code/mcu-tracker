// the Paths map's own data (DATA.map), for the Network's widest zoom: each box's line and each title's stop, plus where each title falls in
// story order so "Seen up to" can cut it, and which file title it is so a line can find its people
const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js');
(async () => { const { browser, page } = await open({ state: { entered: 1 } });
  const T = require('./hub.json').titles;
  const m = await page.evaluate(T => { const M = DATA.map, L = DATA.timeline.map(e => e.t);
    const pos = t => { let i = L.indexOf(t); if (i < 0) i = L.findIndex(x => x.startsWith(t + ' S') || x.startsWith(t + ':') || x.startsWith(t + ' (')); return i; };
    const tt = t => { let i = T.indexOf(t); if (i < 0) { const b = t.replace(/ S\d+$/, '').replace(/ \(.*\)$/, ''); i = T.indexOf(b); } return i; };
    return { top: M.top, dy: M.dy, rows: M.rows.map(r => ({ n: r.n, c: r.c, pruned: !!r.pruned })), cols: M.cols.map(c => ({ t: c.t, yr: c.yr, m: c.m, o: c.o, big: !!c.big, ord: pos(c.t), tt: tt(c.t) })) }; }, T);
  require('fs').writeFileSync(__dirname + '/map.json', JSON.stringify(m));
  console.log('rows', m.rows.length, 'cols', m.cols.length, '| no story place:', m.cols.filter(c => c.ord < 0).map(c => c.t).join('; '), '| no file title:', m.cols.filter(c => c.tt < 0).length);
  await browser.close(); })();
