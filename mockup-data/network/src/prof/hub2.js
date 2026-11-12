// the Network hub's data, from the files themselves: who fought whom (every Raft file's opponents, with the title), who served with whom
// (everyone who shares a crew, no cap), and every title each person is on file in, so a link can say where the two crossed paths
const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js');
(async () => { const { browser, page } = await open({ state: { entered: 1 } });
  const SPL = JSON.parse(require('fs').readFileSync(__dirname + '/split.json', 'utf8'));
  page.on("pageerror", e => console.log("PE", e.message)); const d = await page.evaluate(SPL => { try {
    const nm = o => Array.isArray(o.n) ? o.n[o.n.length - 1][0] : o.n;
    const tmAll = o => Array.isArray(o.tm) ? o.tm.map(x => [x[0], x[1]]) : o.tm ? [[o.tm, '']] : [];
    const tmNow = o => Array.isArray(o.tm) ? (o.tm.length ? o.tm[o.tm.length - 1][0] : 'Independent') : o.tm || 'Independent';
    const TT = [], ti = t => { t = t.replace(/ \((Post|Mid)-Credits Scene\)$/, ''); let i = TT.indexOf(t); if (i < 0) { i = TT.length; TT.push(t); } return i; };
    // a step on a show that runs several seasons counts at its own episode (owner, November 2026: "Network titles should be broken down by
    // season"): "In episode 44," is the show's episode 44, "In season 2," the last episode of season 2 (so no one shows before their season
    // is done), and the Network lists it under its season, "What If...? S2". A season the app lists as its own title keeps that title
    const ITEMS = new Set(); DATA.chapters.forEach(c => c.items.forEach(i => ITEMS.add(i.t)));
    const season = x => { const t = x[1], e = /^In episode (\d+),/.exec(x[0] || ''); if (e) return t + '#' + e[1];
      const m = /^In season (\d+),/.exec(x[0] || ''); if (!m) return t; if (ITEMS.has(t + ' S' + m[1])) return t + ' S' + m[1];
      const L = epList(t) || [], k = +m[1] - (EPO[t] || 0); if (L.length < 2 || k < 1 || k > L.length) return t;
      let off = 0; for (let i = 0; i < k; i++) { if (L[i] == null) return t; off += L[i]; } return t + '#' + off; };
    // the season a title is listed under: "What If...?#14" is "What If...? S2"; "Runaways S1–S2#15" is "Runaways S2"
    const SEAS = {}; Object.keys(EPS).forEach(b => { const L = epList(b); if (L && L.length > 1) SEAS[b] = [L, EPO[b] || 0]; });
    const lab = t => { const m = /^(.*)#(\d+)$/.exec(t); if (!m) return t; const b = m[1], z = SEAS[b]; if (!z) return b; let k = +m[2], i = 0; const L = z[0];
      while (i < L.length - 1 && L[i] != null && k > L[i]) { k -= L[i]; i++; } return b.replace(/ S\d+(?:–S\d+)?$/, '') + ' S' + (i + 1 + z[1]); };
    const P = {}, mk = (o, k) => ({ u: rfUniOf(o), dk: Array.isArray(o.k) ? o.k[o.k.length - 1][0] : o.k || '', n: nm(o), NS: Array.isArray(o.n) ? o.n : null, k, g: tmNow(o), T: [], A: new Set(), L: new Map(), TM: [], AL: [] });
    const absorb = (p, o) => { if (!p.NS && Array.isArray(o.n)) p.NS = o.n; (o.al || []).forEach(x => p.AL.push(Array.isArray(x) ? x : [x, ''])); if (Array.isArray(o.n)) o.n.forEach(x => p.AL.push([x[0], x[1] || ''])); tmAll(o).forEach(([t, w]) => { if (!p.T.some(x => x[0] === t)) p.T.push([t, w]); p.TM.push([t, w, o.id]); }); (o.st || []).forEach(x => x[1] && p.A.add(season(x))); };
    // one person played young and old (Fox's films: McAvoy's and Stewart's Charles, owner, November 2026: "a few Jean Greys and a few
    // Charles Xaviers ... all mixed in") is one bubble: the younger file folds into the older one, titles, crews and connections together
    const AGE = { 'fox-charles-xavier-young': 'fox-charles-xavier', 'fox-cyclops-young': 'fox-cyclops', 'fox-jean-grey-young': 'fox-jean-grey', 'fox-storm-young': 'fox-storm',
      'fox-nightcrawler-young': 'fox-nightcrawler', 'fox-beast-young': 'fox-beast', 'fox-moira-mactaggert-young': 'fox-moira-mactaggert', 'fox-raven-darkholme': 'fox-mystique',
      'fox-magneto-erik': 'fox-magneto', 'fox-stryker-young': 'fox-stryker' };
    // ...until Days of Future Past splits their timeline (owner, November 2026): the younger file's titles before it fold into the older
    // self (their shared past); from it on, the younger self is a bubble of its own, in the changed timeline's Earth (split.json)
    const POST = new Set(SPL.post), SINGLE = SPL.single, isPost = t => POST.has(String(t || '').replace(/#\d+$/, '').replace(/ \((Post|Mid)-Credits Scene\)$/, ''));
    const part = (o, post) => { const c = { ...o }; ['tm', 'st', 'opp', 'cl', 'op', 'al', 'k'].forEach(k => { const v = o[k]; if (Array.isArray(v) && v.length && v.every(x => Array.isArray(x) && typeof x[1] === 'string')) { const f = v.filter(x => isPost(x[1]) === post); c[k] = f.length || k !== 'k' ? f : v; } }); return c; };   // names stay whole
    const has = o => ['st', 'tm', 'k', 'opp', 'cl', 'op'].some(k => Array.isArray(o[k]) && o[k].length), PRE = [];
    ALLIES.filter(o => !o.grp && !AGE[o.id]).forEach(o => { if (SINGLE[o.id]) { const a = part(o, false), b = part(o, true); if (has(a)) absorb(P[o.id] = mk(a, 'A'), a); if (has(b)) absorb(P[SINGLE[o.id]] = mk(b, 'A'), b); return; } absorb(P[o.id] = mk(o, 'A'), o); });
    ALLIES.filter(o => !o.grp && AGE[o.id]).forEach(o => { const a = part(o, false), b = part(o, true); if (has(a)) PRE.push([AGE[o.id], a, 'A']); if (has(b)) absorb(P[o.id] = mk(b, 'A'), b); });
    const TH = THREATS.filter(o => !o.grp);
    // one person, one bubble (owner, October 2026): a Raft file under another id but the same name as a Compound file is the same person
    // and merges into it; two pairs share a name but are different people, so they stay apart
    const APART = new Set(['white-vision', 'binary', 'sv-venom-sony', 'karl-mordo-838',
      /* the left-out characters (November 2026): a villain who shares a hero's name but is someone else */ 'st-oconnor-fbi', 'st-grace', 'tomas', 'john-king', 'diego']), byName = {}, as = {};
    ALLIES.filter(o => rfUniOf(o) === 'mcu' && !o.grp).forEach(o => byName[nm(o)] = o.id);
    TH.forEach(o => { if (rfUniOf(o) === 'mcu' && !P[o.id] && !APART.has(o.id) && byName[nm(o)]) as[o.id] = byName[nm(o)]; });
    // and two whose Raft files go by their villain names: Deathlok is Mike Peterson, Lash is Andrew Garner (one person, one bubble)
    Object.assign(as, { 'st-deathlok': 'st-mike-peterson', 'st-lash': 'st-andrew-garner' });
    // in every universe, a hero file the app links to its villain file (o.rf) is the same person: one bubble (owner: "one person each").
    // Same-name files from different worlds (Spectacular Harry, Raimi Harry) stay apart
    ALLIES.filter(o => o.rf && !o.grp).forEach(o => { if (!as[o.rf] && o.rf !== o.id && !APART.has(o.rf)) as[o.rf] = o.id; });
    Object.assign(as, AGE);   // Raft files too (young Raven's are)
    const cid = id => { let x = id; for (let n = 0; as[x] && n < 6; n++) x = as[x]; return x; };
    const ageOf = id => { let x = id; for (let n = 0; n < 7; n++) { if (AGE[x]) return x; if (!as[x]) return null; x = as[x]; } return null; };   // the younger self a file belongs to, if any
    const cidT = (id, w) => { const y = ageOf(id); if (y) return isPost(w) ? y : cid(y); if (SINGLE[id]) return isPost(w) ? SINGLE[id] : id; return cid(id); };   // a merge can chain (Phoenix into young Jean into Jean)
    TH.forEach(o => { const put = (id, x) => { if (P[id]) P[id].k = 'B'; else P[id] = mk(x, 'T'); absorb(P[id], x); }, y = ageOf(o.id);
      if (y || SINGLE[o.id]) { const a = part(o, false), b = part(o, true); if (y) { if (has(a)) PRE.push([cid(y), a, 'T']); if (has(b)) put(y, b); } else { if (has(a)) put(o.id, a); if (has(b)) put(SINGLE[o.id], b); } return; }
      put(cid(o.id), o); });
    PRE.forEach(([id, x, k]) => { if (P[id]) { if (P[id].k !== k) P[id].k = 'B'; } else P[id] = mk(x, k); absorb(P[id], x); });
    ALLIES.filter(o => o.rf && P[o.id]).forEach(o => P[o.id].k = 'B');
    const fight = (a, b, w) => { if (a === b || !P[a] || !P[b]) return; for (const [x, y] of [[a, b], [b, a]]) { const s = P[x].L.get(y) || new Set(); if (w) s.add(w); P[x].L.set(y, s); } };
    TH.forEach(o => (o.opp || []).forEach(([h, w]) => fight(cidT(o.id, w), cidT(h, w), w)));
    // a file records each group at the title they join it (or change sides); a group then holds until their next change, a later title
    // whose groups leave it out. A group with no title holds throughout
    const SO = DATA.timeline.map(e => e.t), so = t => { t = String(t).replace(/#\d+$/, ''); let i = SO.indexOf(t); if (i < 0) i = SO.indexOf(t.replace(/ S\d+$/, '')); if (i < 0) i = SO.findIndex(x => x.startsWith(t + ' S') || x.startsWith(t + ':') || x.startsWith(t + ' (')); return i < 0 ? 9999 : i; };
    // the owner's rule (November 2026): a person stays in a group until the story moves them. A title on their own isn't a move, so a file's
    // "Independent" only counts where it's a real departure (split.json "left": file id|title). A person's groups can also be written out
    // step by step (split.json "steps": id -> [[group, title key]]), the zombie world episode by episode
    // a group stage set in the past inside a later title (owner, 12 November 2026: a past scene doesn't move anyone): split.json "past",
    // "file id|title" -> the title it happens before in the story; it sorts there, so the group someone ends in is where their own story ends
    const PASTO = SPL.past || {}, soP = (w, f) => { const t = PASTO[f + '|' + w]; return t ? so(t) - 0.5 : so(w); };
    const LEFT = new Set(SPL.left || []); Object.entries(P).forEach(([id, q]) => { if (SPL.steps && SPL.steps[id]) q.TM = SPL.steps[id].map(([c, w]) => [c, w, 'step']); else q.TM = q.TM.filter(([c, w, f]) => c !== 'Independent' || LEFT.has(f + '|' + w)); });
    Object.values(P).forEach(q => { const st = new Map(); q.TM.forEach(([c, w, f]) => { const k = w ? soP(w, f) : -1; st.has(k) || st.set(k, new Set()); st.get(k).add(c); }); q.ST = [...st].sort((a, b) => a[0] - b[0]); });
    const active = (q, c, t) => { const x = so(t); let on = false; for (const [k, set] of q.ST) { if (k > x) break; if (k < 0) { if (set.has(c)) return true; continue; } on = set.has(c); } return on; };
    const ids = Object.keys(P).sort((a, b) => (P[a].u !== 'mcu') - (P[b].u !== 'mcu')), idx = Object.fromEntries(ids.map((id, i) => [id, i])), byTeam = {};
    ids.forEach(id => P[id].T.forEach(([t]) => t !== 'Independent' && (byTeam[t] = byTeam[t] || []).push(id)));
    const crews = id => P[id].T.map(x => x[0]).filter(t => t !== 'Independent');
    const deg0 = id => P[id].L.size + P[id].T.length;
    Object.values(P).forEach(q => { q.AS = new Set([...q.A].map(lab)); });   // the seasons they're in, for who served alongside whom
    const deg = id => P[id].L.size + crews(id).length * 3 + P[id].AS.size;
    return { merged: Object.fromEntries(Object.keys(as).filter(k => !AGE[k]).map(k => [k, ageOf(k) || cid(k)])), age: AGE, single: SINGLE, titles: TT, seas: SEAS, nodes: ids.map(id => { const p = P[id], mine = crews(id), M = new Set();
      // served with: in the same group at the same time, in a title they're both in (owner, October 2026: being in HYDRA doesn't connect
      // Wanda to everyone who was ever in HYDRA)
      mine.forEach(c => byTeam[c].forEach(o => { if (o !== id && !p.L.has(o) && [...p.AS].some(t => P[o].AS.has(t) && active(p, c, t) && active(P[o], c, t))) M.add(o); }));
      const sh = x => crews(x).filter(t => mine.includes(t)).length;
      const TMs = p.TM.map(([c, w, f], k) => [c, w ? soP(w, f) + (+((/#(\d+)$/.exec(w) || [])[1] || 0)) / 10000 : -1, k]).sort((x, y) => x[1] - y[1] || x[2] - y[2]), g = TMs.length ? TMs[TMs.length - 1][0] : 'Independent';   // where the story leaves them
      return [p.n, p.k, g,
        [...p.L].sort((a, b) => deg(b[0]) - deg(a[0])).map(([o, w]) => [idx[o], ...[...w].map(ti)]),
        [...M].sort((a, b) => sh(b) - sh(a) || deg0(b) - deg0(a)).map(x => idx[x]),
        deg(id), p.T.filter(x => x[0] !== 'Independent').map(([t, w]) => [t, w ? ti(w) : -1]), [...new Set([...p.A].map(ti))],
        // their crews as the story goes: each group with the story-order place of the title they're in it from, the current one last
        p.TM.map(([c, w, f], k) => [c, w ? soP(w, f) + (+((/#(\d+)$/.exec(w) || [])[1] || 0)) / 10000 : -1, k, w]).sort((x, y) => x[1] - y[1] || x[2] - y[2]).map(([c, o, , w]) => [c, o, w ? ti(w) : -1]),
        // the other names they go by, for search, each with where it's first said (story order), so a name that's a reveal stays hidden
        (() => { const m = new Map(); p.AL.forEach(([a, w]) => { if (!a || a === p.n) return; const o = w ? so(w) : -1; if (!m.has(a) || o < m.get(a)) m.set(a, o); }); return [...m]; })(), p.u, id, p.dk,
        // staged names (the files' own): the name they go by from each title or episode, so a card shows a cover name until the reveal
        p.NS ? p.NS.map(([a, w]) => [a, w || '', w ? so(w) + (+((/#(\d+)$/.exec(w) || [])[1] || 0)) / 10000 : -1]) : null]; }),
      // other versions of the same person: the same name in another file, and two the MCU names differently
      variants: (() => { const by = {}; ids.forEach(id => (by[P[id].n] = by[P[id].n] || []).push(idx[id])); const V = [];
        // the left-out characters (November 2026) who only share a name with someone in their own universe: different people, not versions
        const NOTV = new Set(['diego', 'john-king', 'shirley-sagar-skrull', 'st-aisha-axton', 'st-diego', 'st-grace', 'st-grace-bennett', 'st-john-donnelly', 'st-kyle', 'st-kyle-assistant', 'st-oconnor', 'st-oconnor-fbi', 'st-philip', 'st-philip-cabroni', 'st-roy-bartender', 'st-roy-hardin', 'st-ruben', 'st-ruben-mackenzie', 'st-shirley', 'st-tomas-ciancio', 'tomas']);
        Object.values(by).forEach(L => { for (let a = 0; a < L.length; a++) for (let b = a + 1; b < L.length; b++) { const A = ids[L[a]], B = ids[L[b]]; if ((NOTV.has(A) || NOTV.has(B)) && P[A].u === P[B].u) continue; V.push([L[a], L[b]]); } });
        const st = ids.find(id => P[id].u === 'mcu' && P[id].n === 'Stephen Strange'); ['sinister-strange', 'by-strange-supreme', 'defender-strange'].forEach(id => { if (P[id] && st) V.push([idx[st], idx[id]]); });
        return V; })() };
  } catch (e) { return { err: e.stack }; } }, SPL); if (d.err) { console.log(d.err); process.exit(1); }
  require('fs').writeFileSync(__dirname + '/hub.json', JSON.stringify(d));
  const N = d.nodes, ix = n => N.findIndex(x => x[0] === n && x[10] === 'mcu' && !/-838$/.test(x[11])), w = N[ix('Wanda Maximoff')], r = ix('Brock Rumlow');
  console.log(N.length, 'people,', d.titles.length, 'titles, KB', Math.round(JSON.stringify(d).length / 1024), '| Wanda fought', w[3].length, 'served', w[4].length, '| Rumlow link', JSON.stringify(w[3].find(x => x[0] === r)), (w[3].find(x => x[0] === r) || [])[1] != null ? d.titles[w[3].find(x => x[0] === r)[1]] : '');   // a sample only: several Wandas now
  console.log('max served', Math.max(...N.map(n => n[4].length)), 'max fought', Math.max(...N.map(n => n[3].length)));
  await browser.close(); })();
