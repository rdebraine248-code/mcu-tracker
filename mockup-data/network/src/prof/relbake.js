// the Network's relationships: every connection explicit, with a kind, its meaning and the title it's shown in (from rel/final_*.json
// once written, else the best draft per pair), plus a circle for everyone with no crew
const fs = require('fs'), R = __dirname + '/../rel/';
const H = JSON.parse(fs.readFileSync(__dirname + '/hub.json')), SL = JSON.parse(fs.readFileSync(__dirname + '/story.json'));
// relationships written by name are Sacred Timeline ones. Two other-world versions share a name with their main self (White Vision is
// "Vision", Binary is "Maria Rambeau"): a name means the main one; they're reached by id only
// a Sacred Timeline name shared with someone else (S.W.O.R.D.'s Vision, Binary, every Earth-838 variant) goes to the Sacred Timeline one;
// the others are reached by id only (Mordo's ties had all gone to Earth-838's Mordo)
const BY_ID_ONLY = new Set(['white-vision', 'binary', 'wanda-maximoff-838', 'billy-maximoff-838', 'tommy-maximoff-838', 'christine-palmer-838', 'stephen-strange-838', 'maria-rambeau-838', 'reed-richards-838', 'karl-mordo-838',
  // the left-out characters (November 2026) who share a name with someone: their ties come by id (rel/uni/newfiles/extra_unfiled.json)
  'st-aisha-axton', 'st-kyle-assistant', 'st-kyle', 'st-philip-cabroni', 'st-philip', 'st-roy-bartender', 'st-roy-hardin', 'st-ruben-mackenzie', 'st-ruben',
  'st-shirley', 'shirley-sagar-skrull', 'john-king', 'st-john-donnelly', 'jack-eternals', 'jack-hammer']);
const ix = new Map(H.nodes.map((n, i) => [n[0], i]).filter(([, i]) => (H.nodes[i][10] || 'mcu') === 'mcu' && !BY_ID_ONLY.has(H.nodes[i][11])));   // relationships are Sacred Timeline ones, by name
const so = t => { { const m = /^(.*)#(\d+)$/.exec(t); if (m) { const b = so(m[1]); return b < 0 ? b : b + m[2] / 1000; } } let i = SL.indexOf(t); if (i < 0) i = SL.findIndex(x => x.startsWith(t + ' S') || x.startsWith(t + ':') || x.startsWith(t + ' (')); return i; };
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
let extraMcu = 0; ['fights_out.json', 'offscreen_out.json', ...[1, 2, 3, 4].map(k => 'gaps_out_' + k + '.json'), 'westview_out.json', 'unfiled_out.json'].forEach(f => { if (!fs.existsSync(R + f)) return;
  (JSON.parse(fs.readFileSync(R + f)).keep || []).forEach(t => { if (t.stages && t.stages.length) { ties.push({ a: t.a, b: t.b, stages: t.stages }); extraMcu++; } }); });
const T = [], tIx = t => { t = t.replace(/ \((Post|Mid)-Credits Scene\)$/, ''); let i = T.indexOf(t); if (i < 0) { i = T.length; T.push(t); } return i; };
const out = []; let skip = 0;
// the same person under a second name folds into the first; if that leaves a pair twice, the fuller card stays
const SAME = { 'Deathlok': 'Mike Peterson', 'Lash': 'Andrew Garner', 'The Doctor': 'Leo Fitz' }, best = new Map();
// each connection is a list of stages in story order: [kind, title, text]; an unstaged one is a single stage
// files split or merged by the owner's answers (rel/retarget.json, November 2026): a connection of a file that's gone, or of the steps that
// moved to another file, follows them. Each rule: "from" (a Sacred Timeline name, or an id elsewhere), "to" (one or more; a split gives each
// their own copy of the connection), "titles" (only the stages in those titles move; none given, all of them)
const RT = fs.existsSync(R + 'retarget.json') ? JSON.parse(fs.readFileSync(R + 'retarget.json')).rules : [], rtBase = t => String(t).replace(/#\d+$/, '').replace(/ \((Post|Mid)-Credits Scene\)$/, '');
let rtN = 0; const retarget = L => { RT.forEach(r => { const add = []; L.forEach(t => { if (!t.stages) t.stages = [{ kind: t.kind, title: t.title, text: t.detail }];
    const side = t.a === r.from ? 'a' : t.b === r.from ? 'b' : null; if (!side) return;
    const mv = t.stages.filter(x => !r.titles || r.titles.includes(rtBase(x.title))); if (!mv.length) return;
    t.stages = t.stages.filter(x => !mv.includes(x)); r.to.forEach(to => add.push({ ...t, [side]: to, stages: mv.map(x => ({ ...x })) })); rtN += mv.length; });
  L.push(...add); for (let k = L.length - 1; k >= 0; k--) if (!L[k].stages.length) L.splice(k, 1); }); return L; };
retarget(ties);
ties.forEach(t => { if (!t.stages) t.stages = [{ kind: t.kind, title: t.title, text: t.detail }]; t.a = SAME[t.a] || t.a; t.b = SAME[t.b] || t.b; if (t.a === t.b) return; const key = [t.a, t.b].sort().join('|'), o = best.get(key), len = x => x.stages.reduce((n, s) => n + s.text.length, 0); if (!o || len(t) > len(o)) best.set(key, t); });
[...best.values()].forEach(t => { const a = ix.get(t.a), b = ix.get(t.b), st = t.stages.map(x => [KINDS.indexOf(x.kind), tIx(x.title), x.text, x.whoA || '', x.whoB || '']); if (a == null || b == null || st.some(x => x[0] < 0)) { skip++; return; } out.push([a, b, st]); });
// the other universes, and the crossings between them, by id (names repeat across worlds); a Raft file merged into its Compound twin
// goes by the twin's id
const ixId = new Map(H.nodes.map((n, i) => [n[11], i])), mg = H.merged || {}, idOf = id => ixId.get(mg[id] || id);
const seenPair = new Set(out.map(([a, b]) => [a, b].sort((x, y) => x - y).join('|'))); let uni = 0, cross = 0, uskip = [], merged2 = 0; const uniTie = new Map();
const UNI = fs.existsSync(R + 'uni') ? fs.readdirSync(R + 'uni').filter(d => fs.existsSync(R + 'uni/' + d + '/out.json')).flatMap(d => fs.existsSync(R + 'uni/' + d + '/reviewed.json') ? [R + 'uni/' + d + '/reviewed.json'] : [R + 'uni/' + d + '/out.json', ...fs.readdirSync(R + 'uni/' + d).filter(f => /^extra_.*\.json$/.test(f)).map(f => R + 'uni/' + d + '/' + f)]) : [];
const CROSS = fs.existsSync(R + 'uni/crossings/reviewed.json') ? R + 'uni/crossings/reviewed.json' : R + 'uni/crossings/crossings_out.json';   // the reviewed file once there
// Fox's X-Men split at Days of Future Past (split.json): a younger self's stages before it are the older self's (one bubble, their shared
// past); from it on they're the younger self's own bubble in the changed timeline. One connection can become two
const SPL = JSON.parse(fs.readFileSync(__dirname + '/split.json')), POST = new Set(SPL.post), isPost = t => POST.has(String(t).replace(/#\d+$/, '').replace(/ \((Post|Mid)-Credits Scene\)$/, ''));
const splitTie = t => { const A = mg[t.a] || t.a, B = mg[t.b] || t.b, sp = x => SPL.age[x] || SPL.single[x]; if (!sp(A) && !sp(B)) return [t];
  const pre = x => SPL.age[x] || x, post = x => SPL.single[x] || x, S0 = (t.stages || []).filter(x => !isPost(x.title)), S1 = (t.stages || []).filter(x => isPost(x.title));
  return [S0.length && { ...t, a: pre(A), b: pre(B), stages: S0 }, S1.length && { ...t, a: post(A), b: post(B), stages: S1 }].filter(Boolean); };
[...UNI, ...(fs.existsSync(CROSS) ? [CROSS] : [])].forEach(f => retarget(JSON.parse(fs.readFileSync(f))).flatMap(splitTie).forEach(t => { const a = idOf(t.a), b = idOf(t.b);
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
const SAME_P = { 'Deathlok': 'Mike Peterson', 'Lash': 'Andrew Garner' }, places = {}; [1, 2, 3, 4].forEach(k => JSON.parse(fs.readFileSync(R + 'out' + k + '.json')).places.forEach(p => { const i = p.id ? H.nodes.findIndex(n => n[11] === p.id) : ix.get(SAME_P[p.name] || p.name); if (i != null && i >= 0 && p.circle && p.with !== 'none') places[i] = p.circle; }));
// circles for the other universes' crewless people, from each part's review ({ id: circle })
let uc = 0; if (fs.existsSync(R + 'uni')) fs.readdirSync(R + 'uni').forEach(d => { const f = R + 'uni/' + d + '/circles.json'; if (!fs.existsSync(f)) return;
  Object.entries(JSON.parse(fs.readFileSync(f))).forEach(([id, c]) => { const i = idOf(id); if (i != null && c && H.nodes[i][2] === 'Independent') { const [cn, w] = String(c).split('@'); places[i] = cn + '\u2064' + d + (w || ''); uc++; }   /* "Name@world": one name, separate worlds */   /* a circle belongs to its part: two worlds' "Parker family" stay apart (the key carries it, unseen) */ }); });
// episode by episode (November 2026): a stage tied to the episode by which all it tells has happened (rel/ep_tags.json, { "idA|idB|title|n": episode },
// the ids sorted, n counting that pair's stages in that title from 0): its title becomes "Title#episode", shown once that episode is ticked
let epTagged = 0; if (fs.existsSync(R + 'ep_tags.json')) { const E = JSON.parse(fs.readFileSync(R + 'ep_tags.json'));
  out.forEach(([a, b, st]) => { const ids = [H.nodes[a][11], H.nodes[b][11]].sort(), seenN = {};
    st.forEach(x => { const t = T[x[1]]; if (/#\d+$/.test(t)) return; const n = seenN[t] = (seenN[t] ?? -1) + 1, e = E[ids.join('|') + '|' + t + '|' + n]; if (e > 0) { x[1] = tIx(t + '#' + e); epTagged++; } }); }); }
console.log('episode-tagged stages', epTagged);
// texts checked against the episodes (rel/text_fix.json, November 2026): a wrong detail rewritten, a stage that never happens in its
// title cut (a connection left with no stages goes). After the episode tags, which count stages as they were
let tFix = 0, tCut = 0; if (fs.existsSync(R + 'text_fix.json')) { const X = JSON.parse(fs.readFileSync(R + 'text_fix.json')), cut = new Set(X.cut || []);
  for (let k = out.length - 1; k >= 0; k--) { const st = out[k][2];
    for (let i = st.length - 1; i >= 0; i--) { if (cut.has(st[i][2])) { st.splice(i, 1); tCut++; continue; }
      [2, 3, 4].forEach(f => { if (X.fix && X.fix[st[i][f]]) { st[i][f] = X.fix[st[i][f]]; tFix++; } });   // the connection's text and both who lines
      // a name a title never says, swapped for the one it does (sub: [title prefix, old, new]): Cherry is only "Cherry" in Born Again S1
      (X.sub || []).forEach(([tp, o, n]) => { if (T[st[i][1]].startsWith(tp)) [2, 3, 4].forEach(f => { if (st[i][f] && st[i][f].includes(o)) { st[i][f] = st[i][f].split(o).join(n); tFix++; } }); }); }
    if (!st.length) out.splice(k, 1); } }
console.log('text fixes', tFix, 'cuts', tCut);
// connections that change (rel/stage_fix.json, November 2026: owner, "I thought relationships grow and change"): a stage corrected, or a
// later stage added where the relationship turns (an enemy who becomes an ally), kept in story order
// a and b by id (any world) or by Sacred Timeline name; the review's files (rel/stage_fix_*.json) after the hand-written one
const pid = k => { const i = idOf(k); return i != null ? i : ix.get(k); };
// a fix written for a file that has since been split or merged goes to the file(s) it became (rel/retarget.json, rules that move every stage)
const rtFix = f => { for (const r of RT) if (!r.titles && (f.a === r.from || f.b === r.from)) return r.to.map(to => ({ ...f, a: f.a === r.from ? to : f.a, b: f.b === r.from ? to : f.b })); return [f]; };
let sFix = 0; ['stage_fix.json', ...fs.readdirSync(R).filter(f => /^stage_fix_.+\.json$/.test(f)).sort()].forEach(fn => { if (fs.existsSync(R + fn)) JSON.parse(fs.readFileSync(R + fn)).pairs.flatMap(rtFix).forEach(f => {
  const a = pid(f.a), b = pid(f.b), t = out.find(o => (o[0] === a && o[1] === b) || (o[0] === b && o[1] === a)); if (!t) { console.warn('stage_fix: no connection', f.a, '|', f.b); return; }
  const flip = t[0] !== a, st = t[2];
  (f.edit || []).forEach(e => { const x = st[e.i]; if (!x) { console.warn('stage_fix: no stage', e.i, f.a, f.b); return; } if (e.kind) x[0] = KINDS.indexOf(e.kind); if (e.text) x[2] = e.text; if (e.episode) x[1] = tIx(T[x[1]].replace(/#\d+$/, '') + '#' + e.episode); if (e.title) { if (so(e.title) < 0) console.warn('stage_fix: bad title', e.title, f.a, f.b); else x[1] = tIx(e.title); }   // a stage moved to another title (audit, November 2026)   // a stage moved to the episode it happens in
    if (e.whoA != null) x[flip ? 4 : 3] = e.whoA; if (e.whoB != null) x[flip ? 3 : 4] = e.whoB; if (e.drop) x.drop = 1; sFix++; });   // drop: a stage that tells nothing between the two (owner's rule) goes
  (f.add || []).forEach(e => { if (KINDS.indexOf(e.kind) < 0 || so(e.title) < 0) { console.warn('stage_fix: bad kind or title', e.kind, e.title, f.a, f.b); return; }
    st.push([KINDS.indexOf(e.kind), tIx(e.title + (e.episode ? '#' + e.episode : '')), e.text, flip ? e.whoB : e.whoA, flip ? e.whoA : e.whoB]); sFix++; });
  for (let i = st.length - 1; i >= 0; i--) if (st[i].drop) st.splice(i, 1);
  st.sort((x, y) => so(T[x[1]]) - so(T[y[1]])); }); });
for (let k = out.length - 1; k >= 0; k--) if (!out[k][2].length) out.splice(k, 1);   // a connection whose every stage was dropped goes
console.log('stage fixes', sFix, '| moved with their files', rtN);
// the card lines rewritten so it's always clear who's who (owner, November 2026: no leading name, the card's own person named, a pronoun
// only where one person fits): rel/line_fix.json, "idA|idB|stage|A or B" -> [old, new]; applied last, only where the old line still matches
let lfDone = 0, lfStale = 0; if (fs.existsSync(R + 'line_fix.json')) { const F = JSON.parse(fs.readFileSync(R + 'line_fix.json'));
  // matched by place first, then by the old line anywhere in the pair on that side (a stage added or moved earlier shifts the places)
  const byText = new Map(); Object.entries(F).forEach(([k, f]) => { const [x1, x2, , sd] = k.split('|'); const g = x1 + '|' + x2 + '|' + sd; if (!byText.has(g)) byText.set(g, new Map()); byText.get(g).set(f[0], f[1]); });
  out.forEach(([a, b, st]) => st.forEach((x, si) => ['A', 'B'].forEach((side, j) => { const pk = H.nodes[a][11] + '|' + H.nodes[b][11]; const f = F[pk + '|' + si + '|' + side];
    if (f && x[3 + j] === f[0]) { x[3 + j] = f[1]; lfDone++; return; } const m = byText.get(pk + '|' + side); if (m && m.has(x[3 + j])) { x[3 + j] = m.get(x[3 + j]); lfDone++; return; } if (f) lfStale++; }))); }
console.log('card lines rewritten', lfDone, '| stale (the old line changed since)', lfStale);
// whole lines reworded wherever they stand (owner, November 2026: the four are the Black Order; Gamora and Nebula are Thanos's children but
// never in it, so a line that put them there says "his children" instead):
// rel/word_fix.json, old line -> new line, for a stage's text and both card lines
let tfDone = 0; if (fs.existsSync(R + 'word_fix.json')) { const F = JSON.parse(fs.readFileSync(R + 'word_fix.json')); out.forEach(([, , st]) => st.forEach(x => [2, 3, 4].forEach(j => { if (F[x[j]] != null) { x[j] = F[x[j]]; tfDone++; } }))); }
console.log('lines reworded', tfDone);
fs.writeFileSync(__dirname + '/rel.json', JSON.stringify({ kinds: KINDS, titles: T, ord: T.map(so), ties: out, places, cross: cross > 0 }));
console.log('know-each-other audit: cut', kaCut, 'corrected', kaFix); console.log('other-universe circles', uc, '| Sacred Timeline fights and gaps added', extraMcu); console.log('other universes', uni, 'from', UNI.length, 'files | combined', merged2, '| crossings', cross, '| skipped', uskip.length, uskip.slice(0, 8).join(', '));
console.log('from', src, '| ties', out.length, 'skipped', skip, '| titles', T.length, 'unplaced titles', T.filter(t => so(t) < 0), '| circles', Object.keys(places).length);
