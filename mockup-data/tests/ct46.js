// mockup (test build): Nick Fury and S.H.I.E.L.D. as two character boxes; a save from the combined box carries over to both
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
const FILE = process.argv[2] || __dirname + '/../out/datapad-test.html', SHOTS = process.argv[3] || null;
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); }, errs = [];
  const page = async seed => { const ctx = await b.newContext({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2 });
    if (seed) await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); localStorage.setItem('tb-seed', 'next1'); sessionStorage.setItem('x', 1); } }, JSON.stringify(seed));
    await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(FILE, 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500); return p; };
  // 1. the test build's own start (everything watched), made from the combined box
  const p = await page(null);
  const r = await p.evaluate(() => {
    const F = DATA.chars.find(c => c.id === 'cx-nick-fury'), S = DATA.chars.find(c => c.id === 'cx-s-h-i-e-l-d'), at = id => DATA.chars.findIndex(c => c.id === id);
    const n = b => b.items.filter(i => state.checks[b.id + '::' + i.t]).length;
    return { old: !!DATA.chars.find(c => c.id === 'cx-nick-fury-s-h-i-e-l-d') || !!DOSSIERS['cx-nick-fury-s-h-i-e-l-d'], nf: F && F.items.length, ns: S && S.items.length,
      order: at('cx-nick-fury') + 1 === at('cx-s-h-i-e-l-d') && DATA.chars[at('cx-nick-fury') - 1].id === 'cx-hulk',
      first: F.items[0].t, cmNote: F.items[0].note, ff: n(F), ss: n(S), logF: DOSSIERS[F.id].story.map(x => x[0]).join('|') === F.items.map(i => i.t).join('|'),
      logS: DOSSIERS[S.id].story.map(x => x[0]).join('|') === S.items.map(i => i.t).join('|'), emb: [charEmb(F), charEmb(S)], fury: !!EMBLEMS.fury,
      skin: [LSKIN[F.id] && LSKIN[F.id].tag, LSKIN[S.id] && LSKIN[S.id].tag], eggs: [FURY_BOX, !!SIDE['cx-nick-fury|Goose']], furyFile: ALLIES.find(o => o.id === 'nick-fury').em, mapRows: DATA.map.rows.map(r => r.n).filter(n => /Fury|S\.H\.I\.E\.L\.D/.test(n)), mapAligned: DATA.map.rows.every((r, i) => r.n === DATA.chars[i].title), embOrder: Object.keys(EMBLEMS).indexOf('fury') + 1 === Object.keys(EMBLEMS).indexOf('eagle'), hint: !!EMB_HINT.fury, met: MET_BY['cx-nick-fury'], shieldAt: DATA.map.cols.filter(c => c.m.includes(DATA.chars.findIndex(x => x.id === 'cx-s-h-i-e-l-d'))).map(c => c.t) }; });
  ok(!r.old, 'combined box and log gone'); ok(r.nf === 15 && r.ns === 24, 'box sizes ' + r.nf + '/' + r.ns); ok(r.order, 'the two boxes sit where the combined one was');
  ok(r.first === 'Captain Marvel' && /mid-credits/.test(r.cmNote || ''), 'Fury opens with Captain Marvel and its note');
  ok(r.ff === 15 && r.ss === 24, 'everything watched carries over, both boxes full (' + r.ff + ', ' + r.ss + ')');
  ok(r.logF && r.logS, 'each log follows its box'); ok(r.emb[0] === 'fury' && r.emb[1] === 'eagle' && r.fury, 'insignia: ' + r.emb);
  ok(r.skin[0] === 'Nick Fury' && r.skin[1] === 'S.H.I.E.L.D.', 'log skins'); ok(r.eggs[0] === 'cx-nick-fury' && r.eggs[1], 'eggs follow Fury'); ok(r.furyFile === 'fury', "Fury's Compound file wears his insignia");
  ok(JSON.stringify(r.mapRows) === '["Nick Fury","S.H.I.E.L.D."]' && r.mapAligned, 'Paths: a line for each, in box order ' + JSON.stringify(r.mapRows));
  ok(r.shieldAt.includes('Agent Carter (One-Shot)') && r.shieldAt.includes('Ant-Man') && r.shieldAt.includes('Agents of S.H.I.E.L.D.'), 'S.H.I.E.L.D. line stops ' + JSON.stringify(r.shieldAt));
  ok(r.embOrder && r.hint && JSON.stringify(r.met) === '["Iron Man"]', 'insignia beside the eagle, with its hint; met in Iron Man');
  if (SHOTS) {
    for (const [id, nm] of [['cx-nick-fury', 'fury'], ['cx-s-h-i-e-l-d', 'shield']]) {
      await p.evaluate(id => openPanel(DATA.chars.find(c => c.id === id), 'char', document.body), id); await sleep(1200); await p.screenshot({ path: SHOTS + '/box-' + nm + '.png' });
      await p.evaluate(id => { closePanel && closePanel(); openDossier(id); }, id).catch(() => {}); await sleep(1500); await p.screenshot({ path: SHOTS + '/log-' + nm + '.png' });
      await p.evaluate(() => { const x = document.querySelector('#dossier .dclose, #dossier [data-close], .dossier .back'); if (x) x.click(); }); await sleep(600);
    }
    await p.evaluate(() => { document.body.insertAdjacentHTML('beforeend', `<div id="embT" style="position:fixed;inset:0;z-index:9999;background:#0B0F13;display:flex;gap:28px;align-items:center;justify-content:center">${['fury', 'eagle'].map(k => `<div style="width:128px;height:128px;transform:scale(2);transform-origin:center">${embHTML(k)}</div>`).join('')}</div>`); });
    await sleep(400); await p.screenshot({ path: SHOTS + '/insignia.png' });
  }
  // 2. a save from before the split
  const old = { entered: 1, booted: 1, orderPicked: 1, codename: 'TEST',
    checks: { 'cx-nick-fury-s-h-i-e-l-d::Iron Man': true, 'cx-nick-fury-s-h-i-e-l-d::Agents of S.H.I.E.L.D. S2': true, 'cx-nick-fury-s-h-i-e-l-d::Captain America: The First Avenger': true, 'ch-1::Agent Carter S1': true },
    eps: { 'cx-nick-fury-s-h-i-e-l-d::Agents of S.H.I.E.L.D. S2': [1, 2] }, charOpen: { 'cx-nick-fury-s-h-i-e-l-d': 1 }, seen: { 'cx-nick-fury-s-h-i-e-l-d': true },
    dSeen: { 'cx-nick-fury-s-h-i-e-l-d': { 's:Iron Man': 1, 's:Agents of S.H.I.E.L.D. S2': 1, 'r0.1': 1 } }, achSeen: {} };
  const q = await page(old);
  const m = await q.evaluate(() => ({ c: Object.keys(state.checks).filter(k => state.checks[k]).sort(), e: state.eps, o: state.charOpen, s: state.seen, d: state.dSeen, f: state.furySplit }));
  const has = k => m.c.includes(k);
  ok(has('cx-nick-fury::Iron Man') && has('cx-s-h-i-e-l-d::Iron Man') && has('cx-s-h-i-e-l-d::Agents of S.H.I.E.L.D. S2') && has('cx-s-h-i-e-l-d::Captain America: The First Avenger'), 'checks to both boxes');
  ok(!has('cx-nick-fury::Agents of S.H.I.E.L.D. S2') && !m.c.some(k => k.startsWith('cx-nick-fury-s-h-i-e-l-d::')), 'only where the title is, old keys gone');
  ok(has('cx-s-h-i-e-l-d::Agent Carter S1') && !has('cx-s-h-i-e-l-d::Agent Carter S2'), 'a new Agent Carter season comes checked only if watched elsewhere');
  ok(JSON.stringify(m.e['cx-s-h-i-e-l-d::Agents of S.H.I.E.L.D. S2']) === '[1,2]', 'episodes carried');
  ok(m.o['cx-nick-fury'] && m.o['cx-s-h-i-e-l-d'] && !m.o['cx-nick-fury-s-h-i-e-l-d'] && m.s['cx-nick-fury'] && m.s['cx-s-h-i-e-l-d'], 'box openings carried');
  ok(m.d['cx-nick-fury']['s:Iron Man'] && m.d['cx-s-h-i-e-l-d']['s:Iron Man'] && m.d['cx-s-h-i-e-l-d']['s:Agents of S.H.I.E.L.D. S2'] && !m.d['cx-nick-fury']['s:Agents of S.H.I.E.L.D. S2'] && !m.d['cx-nick-fury-s-h-i-e-l-d'], 'read entries carried');
  ok(m.f === 1, 'migration flagged');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
