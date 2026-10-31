// the Network hub's data, from the files themselves: who fought whom (every Raft file's opponents, with the title), who served with whom
// (everyone who shares a crew, no cap), and every title each person is on file in, so a link can say where the two crossed paths
const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js');
(async () => { const { browser, page } = await open({ state: { entered: 1 } });
  const d = await page.evaluate(() => {
    const nm = o => Array.isArray(o.n) ? o.n[o.n.length - 1][0] : o.n;
    const tmAll = o => Array.isArray(o.tm) ? o.tm.map(x => [x[0], x[1]]) : o.tm ? [[o.tm, '']] : [];
    const tmNow = o => Array.isArray(o.tm) ? o.tm[o.tm.length - 1][0] : o.tm || 'Independent';
    const TT = [], ti = t => { t = t.replace(/ \((Post|Mid)-Credits Scene\)$/, ''); let i = TT.indexOf(t); if (i < 0) { i = TT.length; TT.push(t); } return i; };
    const P = {}, mk = (o, k) => ({ u: rfUniOf(o), dk: Array.isArray(o.k) ? o.k[o.k.length - 1][0] : o.k || '', n: nm(o), k, g: tmNow(o), T: [], A: new Set(), L: new Map(), TM: [], AL: [] });
    const absorb = (p, o) => { (o.al || []).forEach(x => p.AL.push(Array.isArray(x) ? x : [x, ''])); if (Array.isArray(o.n)) o.n.forEach(x => p.AL.push([x[0], x[1] || ''])); tmAll(o).forEach(([t, w]) => { if (!p.T.some(x => x[0] === t)) p.T.push([t, w]); p.TM.push([t, w]); }); (o.st || []).forEach(x => x[1] && p.A.add(x[1])); };
    ALLIES.filter(o => !o.grp).forEach(o => absorb(P[o.id] = mk(o, 'A'), o));
    const TH = THREATS.filter(o => !o.grp);
    // one person, one bubble (owner, October 2026): a Raft file under another id but the same name as a Compound file is the same person
    // and merges into it; two pairs share a name but are different people, so they stay apart
    const APART = new Set(['white-vision', 'binary', 'sv-venom-sony', 'karl-mordo-838']), byName = {}, as = {};
    ALLIES.filter(o => rfUniOf(o) === 'mcu' && !o.grp).forEach(o => byName[nm(o)] = o.id);
    TH.forEach(o => { if (rfUniOf(o) === 'mcu' && !P[o.id] && !APART.has(o.id) && byName[nm(o)]) as[o.id] = byName[nm(o)]; });
    // and two whose Raft files go by their villain names: Deathlok is Mike Peterson, Lash is Andrew Garner (one person, one bubble)
    Object.assign(as, { 'st-deathlok': 'st-mike-peterson', 'st-lash': 'st-andrew-garner' });
    // in every universe, a hero file the app links to its villain file (o.rf) is the same person: one bubble (owner: "one person each").
    // Same-name files from different worlds (Spectacular Harry, Raimi Harry) stay apart
    ALLIES.filter(o => o.rf && !o.grp).forEach(o => { if (!as[o.rf] && o.rf !== o.id && !APART.has(o.rf)) as[o.rf] = o.id; });
    const cid = id => as[id] || id;
    TH.forEach(o => { const id = cid(o.id); if (P[id]) P[id].k = 'B'; else P[id] = mk(o, 'T'); absorb(P[id], o); });
    ALLIES.filter(o => o.rf && P[o.id]).forEach(o => P[o.id].k = 'B');
    const fight = (a, b, w) => { if (a === b || !P[a] || !P[b]) return; for (const [x, y] of [[a, b], [b, a]]) { const s = P[x].L.get(y) || new Set(); if (w) s.add(w); P[x].L.set(y, s); } };
    TH.forEach(o => (o.opp || []).forEach(([h, w]) => fight(cid(o.id), cid(h), w)));
    // a file records each group at the title they join it (or change sides); a group then holds until their next change, a later title
    // whose groups leave it out. A group with no title holds throughout
    const SO = DATA.timeline.map(e => e.t), so = t => { let i = SO.indexOf(t); if (i < 0) i = SO.findIndex(x => x.startsWith(t + ' S') || x.startsWith(t + ':') || x.startsWith(t + ' (')); return i < 0 ? 9999 : i; };
    Object.values(P).forEach(q => { const st = new Map(); q.TM.forEach(([c, w]) => { const k = w ? so(w) : -1; st.has(k) || st.set(k, new Set()); st.get(k).add(c); }); q.ST = [...st].sort((a, b) => a[0] - b[0]); });
    const active = (q, c, t) => { const x = so(t); let on = false; for (const [k, set] of q.ST) { if (k > x) break; if (k < 0) { if (set.has(c)) return true; continue; } on = set.has(c); } return on; };
    const ids = Object.keys(P).sort((a, b) => (P[a].u !== 'mcu') - (P[b].u !== 'mcu')), idx = Object.fromEntries(ids.map((id, i) => [id, i])), byTeam = {};
    ids.forEach(id => P[id].T.forEach(([t]) => t !== 'Independent' && (byTeam[t] = byTeam[t] || []).push(id)));
    const crews = id => P[id].T.map(x => x[0]).filter(t => t !== 'Independent');
    const deg0 = id => P[id].L.size + P[id].T.length;
    const deg = id => P[id].L.size + crews(id).length * 3 + P[id].A.size;
    return { merged: as, titles: TT, nodes: ids.map(id => { const p = P[id], mine = crews(id), M = new Set();
      // served with: in the same group at the same time, in a title they're both in (owner, October 2026: being in HYDRA doesn't connect
      // Wanda to everyone who was ever in HYDRA)
      mine.forEach(c => byTeam[c].forEach(o => { if (o !== id && !p.L.has(o) && [...p.A].some(t => P[o].A.has(t) && active(p, c, t) && active(P[o], c, t))) M.add(o); }));
      const sh = x => crews(x).filter(t => mine.includes(t)).length;
      const g = p.g === 'Independent' && mine.length ? mine[mine.length - 1] : p.g;
      return [p.n, p.k, g,
        [...p.L].sort((a, b) => deg(b[0]) - deg(a[0])).map(([o, w]) => [idx[o], ...[...w].map(ti)]),
        [...M].sort((a, b) => sh(b) - sh(a) || deg0(b) - deg0(a)).map(x => idx[x]),
        deg(id), p.T.filter(x => x[0] !== 'Independent').map(([t, w]) => [t, w ? ti(w) : -1]), [...new Set([...p.A].map(ti))],
        // their crews as the story goes: each group with the story-order place of the title they're in it from, the current one last
        p.TM.map(([c, w], k) => [c, w ? so(w) : -1, k]).sort((x, y) => x[1] - y[1] || x[2] - y[2]).map(([c, o]) => [c, o]),
        // the other names they go by, for search, each with where it's first said (story order), so a name that's a reveal stays hidden
        (() => { const m = new Map(); p.AL.forEach(([a, w]) => { if (!a || a === p.n) return; const o = w ? so(w) : -1; if (!m.has(a) || o < m.get(a)) m.set(a, o); }); return [...m]; })(), p.u, id, p.dk]; }),
      // other versions of the same person: the same name in another file, and two the MCU names differently
      variants: (() => { const by = {}; ids.forEach(id => (by[P[id].n] = by[P[id].n] || []).push(idx[id])); const V = [];
        Object.values(by).forEach(L => { for (let a = 0; a < L.length; a++) for (let b = a + 1; b < L.length; b++) V.push([L[a], L[b]]); });
        const st = ids.find(id => P[id].u === 'mcu' && P[id].n === 'Stephen Strange'); ['sinister-strange', 'by-strange-supreme', 'defender-strange'].forEach(id => { if (P[id] && st) V.push([idx[st], idx[id]]); });
        return V; })() };
  });
  require('fs').writeFileSync(__dirname + '/hub.json', JSON.stringify(d));
  const N = d.nodes, ix = n => N.findIndex(x => x[0] === n && x[10] === 'mcu' && !/-838$/.test(x[11])), w = N[ix('Wanda Maximoff')], r = ix('Brock Rumlow');
  console.log(N.length, 'people,', d.titles.length, 'titles, KB', Math.round(JSON.stringify(d).length / 1024), '| Wanda fought', w[3].length, 'served', w[4].length, '| Rumlow link', JSON.stringify(w[3].find(x => x[0] === r)), (w[3].find(x => x[0] === r) || [])[1] != null ? d.titles[w[3].find(x => x[0] === r)[1]] : '');   // a sample only: several Wandas now
  console.log('max served', Math.max(...N.map(n => n[4].length)), 'max fought', Math.max(...N.map(n => n[3].length)));
  await browser.close(); })();
