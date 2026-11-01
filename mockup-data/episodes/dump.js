// every moment tied to a show, grouped by show, for the episode pass
const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js');
const fs = require('fs'), D = __dirname;
(async () => {
  const { browser, page } = await open({ state: { entered: 1 } }); await page.waitForTimeout(1200);
  const app = await page.evaluate(() => {
    const TV = Object.keys(EPS).filter(t => epTotal(t) > 1), set = new Set(TV), out = {};
    TV.forEach(t => { out[t] = { title: t, episodes: epNames(t).length ? epNames(t) : Array.from({ length: epTotal(t) }, (_, i) => 'Episode ' + (i + 1)), seasons: epList(t), steps: [], net: [], atlas: [], news: [], msgs: [] }; });
    [['A', ALLIES, 'C'], ['T', THREATS, 'R']].forEach(([g, L, sd]) => L.forEach(o => { const keep = new Set(hoKeep(o.st, o, sd)), n = {};
      o.st.forEach(x => { const j = n[x[1]] = (n[x[1]] ?? -1) + 1; if (set.has(x[1]) && keep.has(x)) out[x[1]].steps.push({ key: g + ':' + o.id + '|' + x[1] + '|' + j, file: (g === 'A' ? 'Compound: ' : 'Raft: ') + (Array.isArray(o.n) ? o.n[o.n.length - 1][0] : o.n), text: x[0] }); }); }));
    Object.values(ATLAS).forEach(L => Array.isArray(L) && L.forEach(p => (p.e || []).forEach((e, i) => { if (set.has(e[0])) out[e[0]].atlas.push({ key: p.id + '|' + i, place: p.n + (e[1] ? ' (' + e[1] + ')' : ''), text: e[2] }); })));
    Object.entries(NEWS).forEach(([t, L]) => { if (set.has(t)) L.forEach(h => out[t].news.push({ key: t + '|' + h, text: h })); });
    COMMS.forEach(m => { if (set.has(m.t)) out[m.t].msgs.push({ key: msgId(m), text: [m.f, m.re, m.b].filter(Boolean).join(' | ') }); });
    return out; });
  const H = JSON.parse(fs.readFileSync(D + '/../prof/hub.json')), R = JSON.parse(fs.readFileSync(D + '/../prof/rel.json'));
  R.ties.forEach(([a, b, st]) => { const ids = [H.nodes[a][11], H.nodes[b][11]].sort(), nm = { [H.nodes[a][11]]: H.nodes[a][0], [H.nodes[b][11]]: H.nodes[b][0] }, n = {};
    st.forEach(x => { const t = R.titles[x[1]], j = n[t] = (n[t] ?? -1) + 1; if (app[t]) app[t].net.push({ key: ids.join('|') + '|' + t + '|' + j, pair: nm[ids[0]] + ' & ' + nm[ids[1]], kind: R.kinds[x[0]], text: x[2] }); }); });
  fs.writeFileSync(D + '/moments.json', JSON.stringify(app, null, 1));
  const c = Object.values(app).reduce((m, t) => { ['steps', 'net', 'atlas', 'news', 'msgs'].forEach(k => m[k] = (m[k] || 0) + t[k].length); return m; }, {});
  console.log(Object.keys(app).length, 'shows', JSON.stringify(c)); await browser.close();
})();
