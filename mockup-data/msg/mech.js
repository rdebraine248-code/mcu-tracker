// every name in a message that has a Compound or Raft file, a Collection case or an Atlas place, found by matching, not picked by hand
const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js');
const fs = require('fs');
(async () => { const { browser, page } = await open({ state: { entered: 1 } });
  const OLD = JSON.parse(fs.readFileSync(process.argv[2] + '/anchors.json', 'utf8'));
  const r = await page.evaluate(OLD => {
    const base = t => String(t || '').replace(/#\d+$/, '').replace(/ \((Post|Mid)-Credits Scene\)$/, '');
    const rk = t => { const b = base(t); return ATL_ORDER[b] ?? ATL_ORDER[b.replace(/ S\d+$/, '')] ?? 1e6; };
    const names = o => { const L = []; const add = x => { if (typeof x === 'string') L.push(x); else if (Array.isArray(x)) L.push(x[0]); };
      if (Array.isArray(o.n)) o.n.forEach(add); else add(o.n); (o.al || []).forEach(add); return [...new Set(L.filter(Boolean))]; };
    const files = [...ALLIES.map(o => ['A', o]), ...THREATS.map(o => ['T', o]), ...COLLX.map(o => ['C', o])].filter(([, o]) => !String(o.id).startsWith('grp')).map(([tg, o]) => {
      const T = [...new Set((o.st || []).map(x => base(x[1])))]; return { tg, id: o.id, o, uni: rfUniOf(o), T, first: Math.min(...T.map(rk)), names: names(o), grp: !!o.grp }; });
    const PU = { fox: ['fox'], sv: ['raimi', 'amazing', 'miles', 'sony'], pr: ['blade', 'daredevil', 'punisher', 'ff', 'pruned'] };
    const places = []; Object.entries(ATLAS).forEach(([v, L]) => L.forEach(p => { places.push({ v, p, uni: 'mcu' }); if (p.city) atlPlaces('city', p.city).forEach(q => places.push({ v: 'earth', p: q, uni: 'mcu', city: p.city })); }));
    Object.entries(ATLAS_UNI).forEach(([u, o]) => o.places.forEach(p => places.push({ v: 'uni:' + u, p, uni: Object.keys(PU).find(k => PU[k].includes(u)) || 'none' })));
    const STOP = new Set(['Agent', 'Doctor', 'Captain', 'Director', 'Black', 'Iron', 'Widow', 'King', 'Queen', 'Prince', 'Princess', 'Lord', 'Lady', 'General', 'Colonel', 'Major', 'Sergeant', 'Officer', 'Detective', 'Senator', 'President', 'Mister', 'Miss', 'Earth', 'Man', 'Woman', 'Girl', 'Boy', 'Kid', 'Young', 'Old', 'Dark', 'Red', 'White', 'Blue', 'Green', 'Gold', 'Ghost', 'Night', 'Star', 'Moon', 'Sun', 'Day', 'Time', 'Hope', 'Grace', 'Faith', 'Will', 'Mark', 'Rose', 'Ruby', 'Crystal', 'Fury'.slice(0, 0)]);
    const out = {}, skipped = [];
    COMMS.forEach(m => { if (m.log) return; const id = msgId(m), mt = rk(m.t);
      const onT = files.filter(f => f.T.includes(base(m.t))); const cnt = {}; onT.forEach(f => cnt[f.uni] = (cnt[f.uni] || 0) + 1); const uni = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0]?.[0] || 'mcu';
      const near = files.filter(f => f.uni === uni && f.first <= mt);
      const targets = [];   // [words, kind, id, tg|view]
      const all = [m.f, m.to || '', m.re, m.b].join(' \u0001 '), occurs = w => new RegExp('(^|[^\\w])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w])').test(all);
      const byName = new Map(); const put = (w, t) => { if (!w || w.length < 3) return; (byName.get(w) || byName.set(w, []).get(w)).push(t); };
      const curN = f => f.tg === 'C' ? cxName(f.o) : Array.isArray(f.o.n) ? f.o.n[f.o.n.length - 1][0] : f.o.n;
      near.forEach(f => { f.names.forEach(n => { const ok = x => !['Doctor', 'Hand', 'Accuser', 'Leader', 'Collector'].includes(x) && (/\s/.test(x) || x === curN(f) || 'The ' + x === curN(f)); /* "The Doctor" isn't every Doctor */ if (ok(n)) put(n, f); if (/^The /.test(n) && ok(n.slice(4))) put(n.slice(4), f); });
        if (f.tg !== 'C' && !f.grp && f.T.includes(base(m.t))) (Array.isArray(f.o.n) ? f.o.n.map(x => x[0]) : [f.o.n]).filter(n => /^[A-Z][a-z]+( [A-Z][a-z']+){1,2}$/.test(n.replace(/^(Dr\.|Agent|Director|Captain|Colonel|General|Doctor|Professor) /, '')) && !/^The /.test(n) && !/ (Prime|Supreme|Intelligence|Council|Empire|Corps)$/.test(n)).forEach(n => n.replace(/^(Dr\.|Agent|Director|Captain|Colonel|General|Doctor|Professor|King|Queen|Princess|Prince) /, '').replace(/"[^"]*" /, '').split(/\s+/).forEach(w => { if (w.length >= 3 && /^[A-Z][a-z]+$/.test(w) && !STOP.has(w)) put('§' + w, f); })); });
      // one person on file twice (Compound and Raft): the file that has this title, else the Compound
      const cur = f => f.tg === 'C' ? cxName(f.o) : Array.isArray(f.o.n) ? f.o.n[f.o.n.length - 1][0] : f.o.n;
      // a full name: the file on this title that goes by that name now (Jane Foster's "Thor" is an alias, Thor's is his name), then the
      // Compound over the Raft for one person on file twice; a tie between two different files is left out
      const pick = (L, w) => { const sc = f => (f.T.includes(base(m.t)) ? 4 : 0) + (w && (cur(f) === w || cur(f) === 'The ' + w) ? 2 : 0) + (f.tg === 'A' ? 1 : 0);
        const by = new Map(); L.forEach(f => { const v = sc(f); if (!by.has(f.id) || by.get(f.id)[0] < v) by.set(f.id, [v, f]); }); const R = [...by.values()].sort((a, b) => b[0] - a[0]);
        if (R.length === 1) return R[0][1]; if (!w) return null; const strip = v => v & ~1; return strip(R[0][0]) > strip(R[1][0]) ? R[0][1] : null; };
      byName.forEach((L, w) => { const f = pick(L, w.startsWith('§') ? null : w); const word = w.replace(/^§/, ''); if (!f) { if (occurs(word) && !w.startsWith('§')) skipped.push(m.t + ' | ' + word + ' | ' + [...new Set(L.map(x => x.tg + ':' + x.id))].join(', ')); return; }
        if (w.startsWith('§') && byName.has(word) && byName.get(word) !== L) return; targets.push([word, 'file', f.id, f.tg, w.startsWith('§') ? 1 : 0]); });
      const pl = places.filter(x => x.uni === (uni === 'by' ? 'mcu' : uni)); const pn = new Map(); pl.forEach(x => { const n = x.p.n; (pn.get(n) || pn.set(n, []).get(n)).push(x); });
      pn.forEach((L, n) => { if (n.length < 4) return; const on = L.filter(x => (x.p.e || []).some(e => base(e[0]) === base(m.t))); const x = on.length === 1 ? on[0] : L.length === 1 ? L[0] : null; if (!x) { if (occurs(n)) skipped.push(m.t + ' | place ' + n + ' | ' + L.length + ' places'); return; } targets.push([n, 'place', x.p.id, x.v, 0]); });
      targets.sort((a, b) => b[0].length - a[0].length || a[4] - b[4]);
      const found = []; const fields = { f: m.f, to: m.to || '', cl: m.cl || '', re: m.re, b: m.b }; const taken = { f: [], to: [], cl: [], re: [], b: [] }, done = new Set();
      for (const [w, k, x, tg, tok] of targets) { if (done.has(k + x)) continue;
        out1: for (const fld of ['f', 'to', 'cl', 're', 'b']) { const txt = fields[fld], re = new RegExp('(^|[^\\w-])(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![\\w-])', 'g'); let mm;
          while ((mm = re.exec(txt))) { const at = mm.index + mm[1].length, end = at + w.length; if (taken[fld].some(([a, b]) => at < b && end > a)) continue;
            if (tok && /^ [A-Z]/.test(txt.slice(end))) continue;   // a surname inside a longer name (Stark Industries) isn't the person
            taken[fld].push([at, end]); found.push([k, x, tg, fld, w]); done.add(k + x); break out1; } } }
      // the hand-checked words that name someone without their name ("the Director", "Cap", "the facility upstate") stay
      (OLD[id] || []).forEach(e => { if (done.has(e[0] + e[1])) return; const txt = fields[e[3]] || ''; const at = txt.indexOf(e[4]); if (at < 0 || taken[e[3]].some(([a, b]) => at < b && at + e[4].length > a)) return; taken[e[3]].push([at, at + e[4].length]); found.push(e); done.add(e[0] + e[1]); });
      if (found.length) out[id] = found; });
    return { out, skipped };
  }, OLD);
  fs.writeFileSync(process.argv[2] + '/anchors2.json', JSON.stringify(r.out, null, 1)); fs.writeFileSync(process.argv[2] + '/skipped.txt', r.skipped.join('\n'));
  console.log(Object.keys(r.out).length, 'messages', Object.values(r.out).reduce((a, L) => a + L.length, 0), 'links |', r.skipped.length, 'names skipped as ambiguous'); await browser.close(); })();
