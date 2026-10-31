// the Network's relationships: every connection explicit, with a kind, its meaning and the title it's shown in (from rel/final_*.json
// once written, else the best draft per pair), plus a circle for everyone with no crew
const fs = require('fs'), R = __dirname + '/../rel/';
const H = JSON.parse(fs.readFileSync(__dirname + '/hub.json')), SL = JSON.parse(fs.readFileSync(__dirname + '/story.json'));
const ix = new Map(H.nodes.map((n, i) => [n[0], i]).filter(([, i]) => (H.nodes[i][10] || 'mcu') === 'mcu'));   // relationships are Sacred Timeline ones, by name
const so = t => { let i = SL.indexOf(t); if (i < 0) i = SL.findIndex(x => x.startsWith(t + ' S') || x.startsWith(t + ':') || x.startsWith(t + ' (')); return i; };
const KINDS = ['family', 'partner', 'friend', 'mentor', 'boss', 'ally', 'rival', 'enemy'];
let ties = [], src = 'drafts';
// the short card lines (rel/who/who_N.json: the staged connections with whoA/whoB on every stage) replace the staged files once all five are in
const whoF = [1, 2, 3, 4, 5].map(k => R + 'who/who_' + k + '.json'), hasWho = whoF.every(f => fs.existsSync(f));
const staged = hasWho ? whoF : [1, 2, 3, 4, 5].map(k => R + 'staged_' + k + '.json'), allStaged = staged.every(f => fs.existsSync(f));
const finals = allStaged ? [] : fs.existsSync(R + 'through.json') ? ['through.json'] : fs.readdirSync(R).filter(f => /^final_.*\.json$/.test(f));   // the through-line review, once done, is the last word
if (allStaged) { src = hasWho ? 'staged + who lines' : 'staged'; staged.forEach(f => JSON.parse(fs.readFileSync(f)).forEach(t => ties.push({ a: t.a, b: t.b, stages: t.stages }))); }
else if (finals.length) { src = finals.join(', '); finals.forEach(f => ties.push(...JSON.parse(fs.readFileSync(R + f)).keep)); }
else JSON.parse(fs.readFileSync(R + 'merged.json')).forEach(m => { const c = m.cands.slice().sort((a, b) => b.detail.length - a.detail.length)[0]; ties.push({ a: c.from, b: c.from === m.a ? m.b : m.a, kind: c.kind, detail: c.detail, title: c.title }); });
const T = [], tIx = t => { t = t.replace(/ \((Post|Mid)-Credits Scene\)$/, ''); let i = T.indexOf(t); if (i < 0) { i = T.length; T.push(t); } return i; };
const out = []; let skip = 0;
// the same person under a second name folds into the first; if that leaves a pair twice, the fuller card stays
const SAME = { 'Deathlok': 'Mike Peterson', 'Lash': 'Andrew Garner' }, best = new Map();
// each connection is a list of stages in story order: [kind, title, text]; an unstaged one is a single stage
ties.forEach(t => { if (!t.stages) t.stages = [{ kind: t.kind, title: t.title, text: t.detail }]; t.a = SAME[t.a] || t.a; t.b = SAME[t.b] || t.b; if (t.a === t.b) return; const key = [t.a, t.b].sort().join('|'), o = best.get(key), len = x => x.stages.reduce((n, s) => n + s.text.length, 0); if (!o || len(t) > len(o)) best.set(key, t); });
[...best.values()].forEach(t => { const a = ix.get(t.a), b = ix.get(t.b), st = t.stages.map(x => [KINDS.indexOf(x.kind), tIx(x.title), x.text, x.whoA || '', x.whoB || '']); if (a == null || b == null || st.some(x => x[0] < 0)) { skip++; return; } out.push([a, b, st]); });
// the other universes, and the crossings between them, by id (names repeat across worlds); a Raft file merged into its Compound twin
// goes by the twin's id
const ixId = new Map(H.nodes.map((n, i) => [n[11], i])), mg = H.merged || {}, idOf = id => ixId.get(mg[id] || id);
const seenPair = new Set(out.map(([a, b]) => [a, b].sort((x, y) => x - y).join('|'))); let uni = 0, cross = 0, uskip = [];
const UNI = fs.existsSync(R + 'uni') ? fs.readdirSync(R + 'uni').filter(d => fs.existsSync(R + 'uni/' + d + '/out.json')).map(d => R + 'uni/' + d + '/out.json') : [];
const CROSS = R + 'uni/crossings/crossings_out.json';
[...UNI, ...(fs.existsSync(CROSS) ? [CROSS] : [])].forEach(f => JSON.parse(fs.readFileSync(f)).forEach(t => { const a = idOf(t.a), b = idOf(t.b);
  const st = (t.stages || []).map(x => [KINDS.indexOf(x.kind), tIx(x.title), x.text, x.whoA || '', x.whoB || '']);
  if (a == null || b == null || a === b || !st.length || st.some(x => x[0] < 0)) { uskip.push(t.a + '|' + t.b); return; }
  const key = [a, b].sort((x, y) => x - y).join('|'); if (seenPair.has(key)) return; seenPair.add(key); out.push([a, b, st]); f === CROSS ? cross++ : uni++; }));
const SAME_P = { 'Deathlok': 'Mike Peterson', 'Lash': 'Andrew Garner' }, places = {}; [1, 2, 3, 4].forEach(k => JSON.parse(fs.readFileSync(R + 'out' + k + '.json')).places.forEach(p => { const i = ix.get(SAME_P[p.name] || p.name); if (i != null && p.circle && p.with !== 'none') places[i] = p.circle; }));
fs.writeFileSync(__dirname + '/rel.json', JSON.stringify({ kinds: KINDS, titles: T, ord: T.map(so), ties: out, places, cross: cross > 0 }));
console.log('other universes', uni, 'from', UNI.length, 'files | crossings', cross, '| skipped', uskip.length, uskip.slice(0, 8).join(', '));
console.log('from', src, '| ties', out.length, 'skipped', skip, '| titles', T.length, 'unplaced titles', T.filter(t => so(t) < 0), '| circles', Object.keys(places).length);
