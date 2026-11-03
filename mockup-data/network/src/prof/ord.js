const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js');
(async () => { const { browser, page } = await open({ state: { entered: 1 } });
  const T = require('./hub.json').titles;
  const r = await page.evaluate(T => { const L = DATA.timeline.map(e => e.t);
    return T.map(t0 => { const n = +((/#(\d+)$/.exec(t0) || [])[1] || 0), t = t0.replace(/#\d+$/, '');   // an episode: just after its show's place, in episode order
      const at = t => { let i = L.indexOf(t); if (i < 0) i = L.findIndex(x => x.startsWith(t + ' S') || x.startsWith(t + ':') || x.startsWith(t + ' (')); return i; };
      // an episode stands at its own season's place when the timeline lists the seasons ("Agents of S.H.I.E.L.D.#81" at season 4)
      const sz = n && epList(t), sl = (() => { if (!sz || sz.length < 2) return -1; let k = n, j = 0; while (j < sz.length - 1 && sz[j] != null && k > sz[j]) { k -= sz[j]; j++; }
        return L.indexOf(t.replace(/ S\d+(?:–S\d+)?$/, '') + ' S' + (j + 1 + (EPO[t] || 0))); })();
      let i = sl >= 0 ? sl : at(t); if (i < 0 && / S\d+$/.test(t)) i = at(t.replace(/ S\d+$/, ''));   // a season the timeline lists only as its whole show
      if (i < 0 && DATA.chapters.some(c => c.items.some(x => x.t === t))) i = L.length;   // a title off the Sacred Timeline (the Incursions chapter's shows): after it, in episode order
      return i < 0 ? i : i + n / 10000; }); }, T);
  const miss = T.filter((t, i) => r[i] < 0); console.log('mapped', T.length - miss.length, 'of', T.length, '| missing:', miss);
  require('fs').writeFileSync(__dirname + '/ord.json', JSON.stringify(r));
  await browser.close(); })();
