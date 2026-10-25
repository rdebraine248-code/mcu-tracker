// a villain's factions (October 2026): staged by what you've watched, a tag opens the faction's roster (with its group file where one is left),
// the registry groups by faction, a brainwashed servant (the Winter Soldier) still counts as HYDRA's, the current faction is lit and named in
// the header while past ones say Former, and a villain's file links back to the hero's
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
const save = w => JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, raftIn: 1, cpIn: 1, checks: Object.fromEntries(w.map(t => ['tl::' + t, true])) });
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); }, errs = [];
  const run = async (w, fn) => { const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
    await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, save(w));
    await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500);
    const r = await fn(p); await ctx.close(); return r; };
  const tags = (p, id) => p.evaluate(id => { openColl('raft'); collShow(id); return [...document.querySelectorAll('[data-rft]')].map(x => x.dataset.rft); }, id);
  // only The Avengers: Thanos commands the Chitauri, and his Children aren't named yet
  const early = await run(['The Avengers'], p => tags(p, 'thanos'));
  ok(JSON.stringify(early) === '["The Chitauri"]', 'Thanos before Infinity War ' + JSON.stringify(early));
  const r = await run(['The Avengers', 'Captain America: The Winter Soldier', 'Agents of S.H.I.E.L.D. S1', 'Avengers: Infinity War'], async p => {
    const out = { thanos: await tags(p, 'thanos'), ward: await tags(p, 'st-grant-ward'), bucky: await tags(p, 'winter-soldier'), maw: await tags(p, 'ebony-maw') };
    const roster = async id => { await tags(p, id); await p.click('[data-rft]'); await sleep(700);
      return p.evaluate(() => ({ head: document.querySelector('.tf-bar b').textContent, gf: ((document.querySelector('.tf-bar [data-co]') || {}).dataset || {}).co || null,
        rows: document.querySelectorAll('.rf-row').length })); };
    out.order = await roster('ebony-maw'); out.hydra = await roster('st-grant-ward');
    await tags(p, 'winter-soldier'); out.now = await p.evaluate(() => ({ head: document.querySelector('.rf-head small').textContent, cur: [...document.querySelectorAll('[data-rft].cur')].map(x => x.dataset.rft), past: [...document.querySelectorAll('[data-rft].past')].map(x => x.dataset.rft) })); out.back = await p.evaluate(() => [...document.querySelectorAll('[data-rfcp]')].map(x => x.dataset.rfcp));
    await p.click('[data-rfcp]'); await sleep(700); out.hero = await p.evaluate(() => [collMode, collRec]);
    out.grp = await p.evaluate(() => { openColl('raft'); collRec = null; rfTeamF = ''; rfGrp = 'tm'; renderColl(); return { label: [...document.querySelectorAll('[data-rfg]')].map(x => x.textContent),
      secs: [...document.querySelectorAll('.rf-sh span')].map(x => x.textContent) }; });
    return out; });
  ok(JSON.stringify(r.thanos) === '["The Chitauri","The Children of Thanos"]', 'Thanos after Infinity War ' + JSON.stringify(r.thanos));
  ok(['HYDRA', 'Project Centipede', 'S.H.I.E.L.D.'].every(t => r.ward.includes(t)), 'Ward in season 1 ' + JSON.stringify(r.ward));
  ok(r.bucky.includes('HYDRA') && r.bucky[r.bucky.length - 1] === 'Independent', 'the Winter Soldier served HYDRA ' + JSON.stringify(r.bucky));
  ok(/Independent$/.test(r.now.head) && r.now.cur.join() === 'Independent' && r.now.past.includes('HYDRA') && r.now.past.includes('U.S. Army'), 'HYDRA and his war years are former, Independent current ' + JSON.stringify(r.now));
  ok(r.order.head === 'The Children of Thanos' && r.order.gf === null && r.order.rows === 5, 'Children of Thanos roster, its team file gone ' + JSON.stringify(r.order));
  ok(r.hydra.head === 'HYDRA' && r.hydra.gf === 'hydra', 'HYDRA roster keeps its group file ' + JSON.stringify(r.hydra));
  ok(JSON.stringify(r.back) === '["bucky-barnes"]' && r.hero.join() === 'cp,bucky-barnes', 'the Winter Soldier links back to Bucky ' + JSON.stringify([r.back, r.hero]));
  ok(r.grp.label.includes('Faction') && r.grp.secs.includes('HYDRA') && r.grp.secs[r.grp.secs.length - 1] === 'Independent', 'grouped by faction ' + JSON.stringify(r.grp));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
