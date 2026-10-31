// every connection, every stage: the owner's rules that a script can check
const R = require('./rel.json'), H = require('./hub.json'), N = H.nodes, K = R.kinds;
const BAN = /\b(season|episode|the film|the show|the movie|movie|credits|flashback|cameo|scene)s?\b/i, DASH = /[–—]|\s-\s|--/;
const SHOW = new Set(R.titles.filter(t => R.titles.some(u => u !== t && u.startsWith(t + ' S'))));   // a show that has season titles
const P = {}, add = (k, x) => (P[k] = P[k] || []).push(x);
const seen = new Set();
R.ties.forEach(([a, b, st]) => { const nm = N[a][0] + ' / ' + N[b][0] + ' [' + N[a][10] + ']', key = [a, b].sort().join('|');
  if (a === b) add('self pair', nm); if (seen.has(key)) add('duplicate pair', nm); seen.add(key);
  let last = -1; st.forEach(([k, ti, d, wa, wb], i) => { const t = R.titles[ti], o = R.ord[ti];
    if (!K[k]) add('bad kind', nm);
    if (DASH.test(d) || DASH.test(wa || '') || DASH.test(wb || '')) add('dash', nm + ': ' + (d.match(DASH) ? d : wa + ' | ' + wb).slice(0, 90));
    if (BAN.test(d) || BAN.test(wa || '') || BAN.test(wb || '')) add('fourth-wall word', nm + ': ' + ((d + ' | ' + wa + ' | ' + wb).match(BAN) || [''])[0]);
    if (!wa || !wb) add('missing who line', nm + ' @ ' + t);
    if ((wa || '').split(/\s+/).length > 16 || (wb || '').split(/\s+/).length > 16) add('who line over 16 words', nm);
    const sn = (d.replace(/\b(?:[A-Z]\.){2,}/g, 'X').replace(/\b(?:Dr|Mr|Mrs|Ms|St|Jr)\./g, 'X').match(/[.!?](\s|$)/g) || []).length;   // initials (J.A.R.V.I.S.) and titles aren't sentence ends if (sn > 4) add('text over 3 sentences', nm + ' (' + sn + ')');
    if (SHOW.has(t)) add('stage keyed to a bare show title', nm + ' @ ' + t);
    if (o >= 0 && o < last) add('stages out of story order', nm); if (o >= 0) last = o; }); });
Object.entries(P).forEach(([k, L]) => { console.log(k + ': ' + L.length); L.slice(0, 6).forEach(x => console.log('   ' + x)); });
console.log('ties', R.ties.length, '| checks done');
