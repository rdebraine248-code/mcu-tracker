// The content check (owner, November 2026): is anything shown too early, does anything point at a title, episode, file or place that
// isn't there, does the wording break the owner's rules, does anything contradict itself. Not a features test: the ct tests do that.
//   node tests/content.js [report.json]          fast: the rules over all the content (before every push)
//   node tests/content.js [report.json] --full   also ticks every title, season and episode one at a time on every list
// ROOT is the app's folder (out/root or out/mainroot). Exit 1 when anything breaks a rule; "flags" are leads for the audit, not failures.
const { open } = require('./h.js');
const fs = require('fs');
const out = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null, FULL = process.argv.includes('--full');
(async () => {
  const { browser, page, errs } = await open({ state: { entered: 1, booted: 1, orderPicked: 1 } });
  const R = await page.evaluate(FULL => {
    const fails = {}, flags = {}, fail = (k, v) => (fails[k] = fails[k] || []).push(v), flag = (k, v) => (flags[k] = flags[k] || []).push(v);
    // ---------- every title the app knows
    const T = new Set();
    [...DATA.timeline, ...DATA.timelineRelease].forEach(e => T.add(e.t));
    [...DATA.chapters, ...DATA.chars].forEach(c => c.items.forEach(i => T.add(i.t)));
    Object.keys(EPS).forEach(t => T.add(t));
    const known = t => { if (t == null) return false; const b = epBase(t), n = epNo(t); if (!T.has(b) && !ATL_BOX[b]) return false;
      if (!n) return true; const tot = epTotal(b); if (tot) return n <= tot; const d = (epSeas().down[b] || []); return d.length ? n <= d.reduce((a, [, off, len]) => Math.max(a, off + len), 0) : false; };
    const stepT = x => { const e = /^In episode (\d+),/.exec(x[0] || ""); return e ? x[1] + "#" + e[1] : x[1]; };
    // ---------- 1. every tag points at a title (and an episode) the app has
    const tagOf = (where, t) => { if (!known(t)) fail('unknown title or episode', where + ' -> ' + t); };
    [['A', ALLIES], ['T', THREATS], ['C', COLLX]].forEach(([g, F]) => F.forEach(o => (o.st || []).forEach((x, k) => tagOf(g + ':' + o.id + ':' + k, stepT(x)))));
    const allPlaces = []; Object.entries(ATLAS).forEach(([v, L]) => L.forEach(p => { if (p.city) atlPlaces('city', p.city).forEach(q => allPlaces.push(['city:' + p.city, q])); else if (!p.uni) allPlaces.push([v, p]); }));
    Object.entries(ATLAS_UNI).forEach(([u, U]) => U.places.forEach(p => { if (!p.uni) allPlaces.push(['uni:' + u, p]); }));
    allPlaces.forEach(([m, p]) => (p.e || []).forEach((e, i) => { tagOf('atlas ' + m + ':' + p.id + ':' + i, e[0]); if (e[3]) tagOf('atlas ' + m + ':' + p.id + ':' + i + ' (also)', e[3]); }));
    Object.keys(NEWS).forEach(t => tagOf('news', t));
    COMMS.forEach(m => { if (m.t !== WELCOME) tagOf('comms ' + (m.id || m.t), m.t); (m.also || []).forEach(t => tagOf('comms also ' + (m.id || m.t), t)); });
    DC.forEach(d => { tagOf('dc ' + d.id, d.t); ['fall', 'loss'].map(k => [k, d[k]]).forEach(([k, v]) => { if (Array.isArray(v)) v.forEach((x, i) => { if (Array.isArray(x) && typeof x[1] === 'string' && x.length === 2) tagOf('dc ' + d.id + ' ' + k + ':' + i, x[1]); }); }); });
    Object.entries(DOSSIERS).forEach(([id, D]) => Object.entries(D.rows || {}).forEach(([k, L]) => (L || []).forEach((x, i) => { if (Array.isArray(x) && typeof x[1] === 'string') tagOf('log ' + id + ' ' + k + ':' + i, x[1]); })));
    // ---------- 2. links and references
    Object.entries(AT_CASE).forEach(([key, e]) => { const [g, id, k] = key.split(':'), o = (g === 'A' ? ALLIES : g === 'C' ? COLLX : THREATS).find(x => x.id === id);   // a Collection object's steps are its own (C:)
      if (!o || !o.st[+k]) fail('At/Case on a missing step', key); (e.at || []).forEach(p => { if (!atPlace(p)) fail('At on a missing place', key + ' -> ' + p); });
      (e.cases || []).forEach(c => { if (!DC.find(d => d.id === c)) fail('Case on a missing report', key + ' -> ' + c); }); });
    ALLIES.forEach(a => { if (a.rf && !THREATS.find(t => t.id === a.rf)) fail('Compound file hands over to a missing Raft file', a.id + ' -> ' + a.rf); });
    Object.keys(DOSSIERS).forEach(id => { if (!DATA.chars.find(c => c.id === id) && !DATA.chapters.find(c => c.id === id)) fail('character log for a missing box', id); });
    Object.entries(ATL_CITY).forEach(([c, C]) => { const host = ATLAS.earth.find(p => p.city === c); (host ? host.e : []).forEach(e => { const k = atlSpot(e[1]); if (k && !C.spots[k]) fail('city entry on a spot the map lacks', c + ': ' + e[1] + ' (' + e[0] + ')'); }); });
    const dupIds = (m, L) => { const s = new Set(); L.forEach(p => { if (s.has(p.id)) fail('two places with one id on a map', m + ':' + p.id); s.add(p.id); }); };
    Object.entries(ATLAS).forEach(([v, L]) => dupIds(v, L)); Object.entries(ATLAS_UNI).forEach(([u, U]) => dupIds('uni:' + u, U.places));
    // a gate on an Agent File record must name one that exists (Damage Control's Case lines asked for "damagecontrol", the record is "egg-damagecontrol")
    { const ids = new Set(achList().map(a => a.id)), src = [...document.scripts].map(x => x.textContent).join('\n');
      [...src.matchAll(/earned\("([^"]+)"\)/g)].forEach(m => { if (!ids.has(m[1])) fail('a gate on an Agent File record that does not exist', m[1]); }); }
    // ---------- 3. the owner's wording rules, over every line of content
    const texts = [];
    [['A', ALLIES], ['T', THREATS], ['C', COLLX]].forEach(([g, F]) => F.forEach(o => { (o.st || []).forEach((x, k) => texts.push([g + ':' + o.id + ':' + k, x[0]])); ['n', 'kind', 'k', 'd', 'desc'].forEach(f => typeof o[f] === 'string' && texts.push([g + ':' + o.id + ' ' + f, o[f]])); }));
    allPlaces.forEach(([m, p]) => { texts.push(['atlas ' + m + ':' + p.id + ' name', p.n + ' / ' + (p.r || '')]); (p.e || []).forEach((e, i) => texts.push(['atlas ' + m + ':' + p.id + ':' + i, (e[1] || '') + ' ' + e[2]])); });
    Object.entries(NEWS).forEach(([t, L]) => L.forEach(h => texts.push(['news ' + t, h])));
    COMMS.forEach(m => texts.push(['comms ' + (m.id || m.t), JSON.stringify(m)]));
    // the boxes, the story lists, the eggs, stones, achievements and insignia: every string they hold
    const consts = { DATA, QUOTES: typeof QUOTES !== 'undefined' ? QUOTES : null, CHAR_QUOTES: typeof CHAR_QUOTES !== 'undefined' ? CHAR_QUOTES : null, EGGS: typeof EGGS !== 'undefined' ? EGGS : null,
      STONES: typeof STONES !== 'undefined' ? STONES : null, STONE_HOW: typeof STONE_HOW !== 'undefined' ? STONE_HOW : null, EMB_HINT, EMBLEM_NAMES, TVA: typeof TVA !== 'undefined' ? TVA : null,
      ACH: typeof achList === 'function' ? achList() : null };
    const walk = (k, v, d) => { if (d > 8 || v == null) return; if (typeof v === 'string') { if (!/^(#|rgba?\(|url\(|M[\d. ]|<svg|data:)/.test(v) && v.length > 3) texts.push([k, v]); return; }
      if (typeof v === 'object') Object.entries(v).forEach(([kk, vv]) => walk(k + '.' + kk, vv, d + 1)); };
    Object.entries(consts).forEach(([k, v]) => walk(k, v, 0));
    DC.forEach(d => texts.push(['dc ' + d.id, JSON.stringify(d)]));
    Object.entries(DOSSIERS).forEach(([id, D]) => texts.push(['log ' + id, JSON.stringify(D)]));
    const RULES = [['em dash', /—/], ['gesture instruction', /\b(tap|hold|swipe|double-tap|long-press|pinch)\b[^.!?]{0,24}\bto (open|see|view|unlock|reveal|read|go|close)\b/i],
      ['"in 0 titles"', /\bin 0 titles?\b/i], ['leftover "Profile" button', /\bProfile button\b/i], ['placeholder text', /\b(TODO|TBD|lorem|undefined|NaN|\[object Object\])\b/]];
    texts.forEach(([w, s]) => RULES.forEach(([n, re]) => { if (n === 'gesture instruction' && /^(EGGS|ACH|STONE_HOW|STONES)\./.test(w)) return;   // an egg's how-to names its gesture by design
      if (re.test(s || '')) fail('wording: ' + n, w + ': ' + String(s).slice(0, 140)); }));
    // ---------- 4. leads for the audit: a step whose At line names a place that has no entry for that step's title (or its season or
    // episode): the place is missing what happens there (owner, November 2026: Earth-67 had no season 2 at all)
    { const same = (a, b) => { const A = epBase(a), B = epBase(b); return A === B || A.replace(/ S\d.*$/, '') === B.replace(/ S\d.*$/, '') || A.replace(/ \((Post|Mid)-Credits Scene\)$/, '') === B.replace(/ \((Post|Mid)-Credits Scene\)$/, ''); };
      Object.entries(AT_CASE).forEach(([key, e]) => { const [g, id, k] = key.split(':'), o = (g === 'A' ? ALLIES : THREATS).find(x => x.id === id), x = o && o.st[+k]; if (!x) return; const t = stepT(x);
        (e.at || []).forEach(pk => { const r = atPlace(pk); if (!r || !r.p) return; const E = r.p.uni ? [] : (r.p.e || []); if (r.p.uni) return;
          const n = epNo(t), hit = E.some(en => same(en[0], t) && (!n || !epNo(en[0]) || epNo(en[0]) === n)); if (!hit) flag('a place with no entry for a title its files put there', key + ' (' + t + ') -> ' + pk); }); }); }
    // ---------- 4b. leads for the audit: a file that says someone died and then has them act again
    [['A', ALLIES], ['T', THREATS]].forEach(([g, F]) => F.forEach(o => { let dead = -1; (o.st || []).forEach((x, k) => { if (x[2] === 'Deceased') dead = k; else if (dead >= 0 && x[2] && x[2] !== 'Deceased') { flag('alive again after Deceased', g + ':' + o.id + ' step ' + dead + ' -> ' + k + ' (' + x[2] + ')'); dead = -1; } }); }));
    // ---------- 5. (full) tick every title, season and episode alone on every list: only it (and what belongs to it) may show
    const sweep = { states: 0 };
    if (FULL) {
      const all = [...T], rel = (t, x) => { const a = epBase(t), b = epBase(x); if (a === b) return true; const sa = a.replace(/ S\d.*$/, ''), sb = b.replace(/ S\d.*$/, ''); if (sa === sb) return true;
        const pa = a.replace(/ \((Post|Mid)-Credits Scene\)$/, ''), pb = b.replace(/ \((Post|Mid)-Credits Scene\)$/, ''); return pa === pb; };
      const lists = [['tl', DATA.timeline.map(e => ['tl::' + e.t, e.t])], ['tr', DATA.timelineRelease.map(e => ['tr::' + e.t, e.t])],
        ['chapters', DATA.chapters.flatMap(c => c.items.map(i => [ck(c, i.t), i.t]))], ['chars', DATA.chars.flatMap(c => c.items.map(i => [ck(c, i.t), i.t]))]];
      const keep = { checks: state.checks, eps: state.eps }, seenBy = {};
      for (const [ln, L] of lists) for (const [key, t] of L) {
        state.checks = { [key]: true }; state.eps = {}; sweep.states++;
        if (!atlSeenT(t)) fail('a ticked title does not count as watched', ln + ' ' + t);
        const seen = all.filter(x => x !== t && atlSeenT(x));
        seen.filter(x => !rel(t, x)).forEach(x => fail('ticking one title opens another', ln + ': ticking ' + t + ' opens ' + x));
        const sig = seen.filter(x => rel(t, x)).sort().join('|'); (seenBy[t] = seenBy[t] || {})[ln] = sig;
        const tot = epTotal(t); if (tot > 1) { state.checks = {}; state.eps = { [key]: [1] }; sweep.states++;
          if (!atlSeenT(t + '#1')) fail('episode 1 watched does not open episode 1', ln + ' ' + t); if (atlSeenT(t + '#2')) fail('episode 1 watched opens episode 2', ln + ' ' + t);
          if (atlSeenT(t)) fail('one episode watched counts the whole title', ln + ' ' + t); }
      }
      Object.entries(seenBy).forEach(([t, m]) => { const v = Object.values(m); if (new Set(v).size > 1) fail('the lists disagree on what one title opens', t + ': ' + JSON.stringify(m)); });
      state.checks = keep.checks; state.eps = keep.eps;
    }
    const n = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.length]));
    return { titles: T.size, texts: texts.length, sweep, failCounts: n(fails), flagCounts: n(flags), fails, flags };
  }, FULL);
  if (out) fs.writeFileSync(out, JSON.stringify(R, null, 1));
  console.log(JSON.stringify({ titles: R.titles, texts: R.texts, sweep: R.sweep, fails: R.failCounts, flags: R.flagCounts }, null, 1));
  Object.entries(R.fails).forEach(([k, L]) => { console.log('\nFAIL ' + k + ' (' + L.length + ')'); L.slice(0, 12).forEach(x => console.log('  ' + x)); });
  if (errs.length) console.log('page errors: ' + errs.join(' | '));
  await browser.close(); process.exit(Object.keys(R.fails).length || errs.length ? 1 : 0);
})();
