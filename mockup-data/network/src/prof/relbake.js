// the Network's relationships: every connection explicit, with a kind, its meaning and the title it's shown in (from rel/final_*.json
// once written, else the best draft per pair), plus a circle for everyone with no crew
const fs = require('fs'), R = __dirname + '/../rel/';
const H = JSON.parse(fs.readFileSync(__dirname + '/hub.json')), SL = JSON.parse(fs.readFileSync(__dirname + '/story.json'));
// relationships written by name are Sacred Timeline ones. Two other-world versions share a name with their main self (White Vision is
// "Vision", Binary is "Maria Rambeau"): a name means the main one; they're reached by id only
const BY_ID_ONLY = new Set(['white-vision', 'binary']);
const ix = new Map(H.nodes.map((n, i) => [n[0], i]).filter(([, i]) => (H.nodes[i][10] || 'mcu') === 'mcu' && !BY_ID_ONLY.has(H.nodes[i][11])));   // relationships are Sacred Timeline ones, by name
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
// the Sacred Timeline's checked fights and the gaps pass (real relationships the first pass missed): the "keep" lists, by name
let extraMcu = 0; ['fights_out.json', 'offscreen_out.json', ...[1, 2, 3, 4].map(k => 'gaps_out_' + k + '.json')].forEach(f => { if (!fs.existsSync(R + f)) return;
  (JSON.parse(fs.readFileSync(R + f)).keep || []).forEach(t => { if (t.stages && t.stages.length) { ties.push({ a: t.a, b: t.b, stages: t.stages }); extraMcu++; } }); });
const T = [], tIx = t => { t = t.replace(/ \((Post|Mid)-Credits Scene\)$/, ''); let i = T.indexOf(t); if (i < 0) { i = T.length; T.push(t); } return i; };
const out = []; let skip = 0;
// the same person under a second name folds into the first; if that leaves a pair twice, the fuller card stays
const SAME = { 'Deathlok': 'Mike Peterson', 'Lash': 'Andrew Garner', 'The Doctor': 'Leo Fitz' }, best = new Map();
// each connection is a list of stages in story order: [kind, title, text]; an unstaged one is a single stage
ties.forEach(t => { if (!t.stages) t.stages = [{ kind: t.kind, title: t.title, text: t.detail }]; t.a = SAME[t.a] || t.a; t.b = SAME[t.b] || t.b; if (t.a === t.b) return; const key = [t.a, t.b].sort().join('|'), o = best.get(key), len = x => x.stages.reduce((n, s) => n + s.text.length, 0); if (!o || len(t) > len(o)) best.set(key, t); });
[...best.values()].forEach(t => { const a = ix.get(t.a), b = ix.get(t.b), st = t.stages.map(x => [KINDS.indexOf(x.kind), tIx(x.title), x.text, x.whoA || '', x.whoB || '']); if (a == null || b == null || st.some(x => x[0] < 0)) { skip++; return; } out.push([a, b, st]); });
// the other universes, and the crossings between them, by id (names repeat across worlds); a Raft file merged into its Compound twin
// goes by the twin's id
const ixId = new Map(H.nodes.map((n, i) => [n[11], i])), mg = H.merged || {}, idOf = id => ixId.get(mg[id] || id);
const seenPair = new Set(out.map(([a, b]) => [a, b].sort((x, y) => x - y).join('|'))); let uni = 0, cross = 0, uskip = [], merged2 = 0; const uniTie = new Map();
const UNI = fs.existsSync(R + 'uni') ? fs.readdirSync(R + 'uni').filter(d => fs.existsSync(R + 'uni/' + d + '/out.json')).flatMap(d => fs.existsSync(R + 'uni/' + d + '/reviewed.json') ? [R + 'uni/' + d + '/reviewed.json'] : [R + 'uni/' + d + '/out.json', ...fs.readdirSync(R + 'uni/' + d).filter(f => /^extra_.*\.json$/.test(f)).map(f => R + 'uni/' + d + '/' + f)]) : [];
const CROSS = fs.existsSync(R + 'uni/crossings/reviewed.json') ? R + 'uni/crossings/reviewed.json' : R + 'uni/crossings/crossings_out.json';   // the reviewed file once there
[...UNI, ...(fs.existsSync(CROSS) ? [CROSS] : [])].forEach(f => JSON.parse(fs.readFileSync(f)).forEach(t => { const a = idOf(t.a), b = idOf(t.b);
  const st = (t.stages || []).map(x => [KINDS.indexOf(x.kind), tIx(x.title), x.text, x.whoA || '', x.whoB || '']);
  if (a == null || b == null || a === b || !st.length || st.some(x => x[0] < 0)) { uskip.push(t.a + '|' + t.b); return; }
  const key = [a, b].sort((x, y) => x - y).join('|');
  // the same pair twice (two files of one person, now one bubble): one connection, its stages together in story order, exact repeats out
  if (seenPair.has(key)) { const o = uniTie.get(key); if (!o) return; const flip = o[0] !== a, add = st.map(x => flip ? [x[0], x[1], x[2], x[4], x[3]] : x);
    add.forEach(x => { if (!o[2].some(y => y[1] === x[1])) o[2].push(x); });   /* a title the main file already tells stays as it tells it */ o[2].sort((x, y) => (so(T[x[1]]) < 0 ? 1e4 : so(T[x[1]])) - (so(T[y[1]]) < 0 ? 1e4 : so(T[y[1]]))); merged2++; return; }
  seenPair.add(key); const tie = [a, b, st]; uniTie.set(key, tie); out.push(tie); f === CROSS ? cross++ : uni++; }));
// the owner's know-each-other rule, applied to every existing connection (rel/knowaudit_out.json): cuts go, corrections replace the stages
let kaCut = 0, kaFix = 0; if (fs.existsSync(R + 'knowaudit_out.json')) { const K = JSON.parse(fs.readFileSync(R + 'knowaudit_out.json')), pk = (a, b) => [a, b].sort((x, y) => x - y).join('|');
  const cut = new Set((K.cut || []).map(x => pk(idOf(x.a), idOf(x.b)))), fix = new Map((K.keep || []).filter(x => x.stages && x.stages.length).map(x => [pk(idOf(x.a), idOf(x.b)), x]));
  for (let k = out.length - 1; k >= 0; k--) { const [a, b] = out[k], key = pk(a, b);
    if (cut.has(key)) { out.splice(k, 1); kaCut++; continue; }
    const f = fix.get(key); if (f) { const flip = idOf(f.a) !== a; out[k][2] = f.stages.map(x => { const st = [KINDS.indexOf(x.kind), tIx(x.title), x.text, x.whoA || '', x.whoB || '']; return flip ? [st[0], st[1], st[2], st[4], st[3]] : st; }); kaFix++; } } }
const SAME_P = { 'Deathlok': 'Mike Peterson', 'Lash': 'Andrew Garner' }, places = {}; [1, 2, 3, 4].forEach(k => JSON.parse(fs.readFileSync(R + 'out' + k + '.json')).places.forEach(p => { const i = ix.get(SAME_P[p.name] || p.name); if (i != null && p.circle && p.with !== 'none') places[i] = p.circle; }));
// circles for the other universes' crewless people, from each part's review ({ id: circle })
let uc = 0; if (fs.existsSync(R + 'uni')) fs.readdirSync(R + 'uni').forEach(d => { const f = R + 'uni/' + d + '/circles.json'; if (!fs.existsSync(f)) return;
  Object.entries(JSON.parse(fs.readFileSync(f))).forEach(([id, c]) => { const i = idOf(id); if (i != null && c && H.nodes[i][2] === 'Independent') { const [cn, w] = String(c).split('@'); places[i] = cn + '\u2064' + d + (w || ''); uc++; }   /* "Name@world": one name, separate worlds */   /* a circle belongs to its part: two worlds' "Parker family" stay apart (the key carries it, unseen) */ }); });
fs.writeFileSync(__dirname + '/rel.json', JSON.stringify({ kinds: KINDS, titles: T, ord: T.map(so), ties: out, places, cross: cross > 0 }));
console.log('know-each-other audit: cut', kaCut, 'corrected', kaFix); console.log('other-universe circles', uc, '| Sacred Timeline fights and gaps added', extraMcu); console.log('other universes', uni, 'from', UNI.length, 'files | combined', merged2, '| crossings', cross, '| skipped', uskip.length, uskip.slice(0, 8).join(', '));
console.log('from', src, '| ties', out.length, 'skipped', skip, '| titles', T.length, 'unplaced titles', T.filter(t => so(t) < 0), '| circles', Object.keys(places).length);
