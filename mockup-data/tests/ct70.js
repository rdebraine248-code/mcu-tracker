// the files as S.H.I.E.L.D. would keep them (owner, 15 November 2026): one layout for the Compound, the Raft and the Collection, each in its
// own colour. Every file has the ID card (index, number, status; mark, name; facts) and the path with a circle at each end; the incident count
// opens Damage Control on that file's reports alone and back comes down to the file; the researched fields use only their fixed terms; a
// person in both indexes reads one entry; a location only comes from the file's latest title
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const ctx = await b.newContext({ viewport: { width: 384, height: 832 }, hasTouch: true });
  await ctx.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' });
    if (/\/network\.html/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), 'network.html'), contentType: 'text/html; charset=utf-8' });
    return u === 'http://t/' ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue(); });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://t/'); await sleep(1800);
  await p.evaluate(() => { [...DATA.chapters, ...DATA.chars].forEach(c => c.items.forEach(i => { state.checks[ck(c, i.t)] = true; }));
    state.eggs = Object.assign(state.eggs || {}, { compound: 1, raft: 1, collector: 1, damagecontrol: 1 }); persist(); renderAll(); setInterval(() => { try { sayQ.length = 0; } catch (e) {} }, 50); });
  // the fixed terms
  const bad = await p.evaluate(() => { const IDX = ['Human', 'Enhanced', 'Super soldier', 'Mutant', 'Inhuman', 'Sorcerer', 'Witch', 'Werewolf', 'Vampire', 'Artificial intelligence', 'Synthezoid', 'Robot', 'Cyborg', 'Asgardian', 'Frost Giant', 'Eternal', 'Deviant', 'Celestial', 'Kree', 'Skrull', 'Alien', 'Cosmic being'];
    return Object.entries(FILEX).filter(([id, x]) => (x.idx && !IDX.includes(x.idx)) || (x.ident && !['Public', 'Secret', 'Exposed', 'Forgotten'].includes(x.ident)) || (x.accords && !['Signed', 'Not signed'].includes(x.accords)) || (x.blip && !['Blipped', 'Not blipped'].includes(x.blip))
      || ![...ALLIES, ...THREATS, ...COLLX].some(o => o.id === id)).map(([id]) => id); });
  ok(!bad.length, 'researched fields off their fixed terms, or for no file: ' + bad.join(', '));
  const open = async (m, tg, id) => { await p.evaluate(m => { try { closeColl(true); } catch (e) {} openColl(m); }, m); await sleep(300); await p.evaluate(([tg, id]) => fileGo(tg, id), [tg, id]); await sleep(700); };
  const card = () => p.evaluate(() => { const r = document.querySelector('#collView .uf'), c = r && r.querySelector('.uf-card');
    return c ? { kind: r.className, top: c.querySelector('.uf-top span').textContent, st: c.querySelector('.uf-st').textContent, name: c.querySelector('h3').textContent,
      facts: Object.fromEntries([...c.querySelectorAll('.uf-facts > div')].map(d => [d.querySelector('dt').textContent, d.querySelector('dd').textContent])), ends: document.querySelectorAll('#collView .uf-line i').length,
      heads: [...r.querySelectorAll('.co-h')].map(h => h.textContent) } : null; });
  // the three indexes, one layout
  await open('cp', 'A', 'wanda-maximoff'); let c = await card();
  ok(c && /uf cp/.test(c.kind) && /^Personnel file \d{4}$/.test(c.top) && c.name === 'Wanda Maximoff' && c.ends === 2, 'Wanda\'s card ' + JSON.stringify(c && [c.kind, c.top, c.ends]));
  ok(c && c.facts.Index === 'Enhanced' && c.facts.Aliases && c.facts.Universe && /^\d+›$/.test(c.facts['Incident reports'] || ''), 'Wanda\'s facts ' + JSON.stringify(c && c.facts));
  ok(c && ['Abilities', 'Teams', 'Registrations'].every(h => c.heads.includes(h)) && !c.heads.includes('Incident reports'), 'Wanda\'s sections ' + JSON.stringify(c && c.heads));
  ok(c && !c.heads.includes('Last known location'), 'Wanda\'s latest title names no place, so the file names none (it once said Westview)');
  // the incident count opens her reports alone; back comes down to her file
  const n = await p.evaluate(() => { document.querySelector('[data-ufinc]').click(); return 0; }); await sleep(700);
  const dc = await p.evaluate(() => [collMode, document.querySelectorAll('#collView .dc-row').length, (document.querySelector('#collView .tf-bar b') || {}).textContent]);
  ok(dc[0] === 'dc' && dc[1] === +c.facts['Incident reports'].replace('›', '') && dc[2] === 'Wanda Maximoff', 'the count opens just her reports ' + JSON.stringify(dc));
  await p.goBack(); await sleep(700); ok(await p.evaluate(() => collMode === 'cp' && collRec === 'wanda-maximoff'), 'back comes down to her file');
  // the Raft: a codename's real name and the threat class are facts; one person in two indexes reads one entry
  await open('raft', 'T', 'winter-soldier'); c = await card();
  ok(c && /uf rf/.test(c.kind) && /^Threat file \d{4}$/.test(c.top) && c.facts.Threat && c.facts.Index === 'Super soldier', 'Bucky\'s Raft card reads his Compound entry ' + JSON.stringify(c && c.facts));
  await open('raft', 'T', 'hela'); c = await card();
  ok(c && c.ends === 2 && /Seen once/.test(await p.evaluate(() => document.querySelector('#collView .uf-mid').textContent)), 'seen once still has a circle at each end');
  // the Collection: who's held it is one list; the Tesseract's case is its mark
  await open('coll', 'C', 'mjolnir'); c = await card();
  ok(c && /uf cx/.test(c.kind) && /^Collection lot \d{4}$/.test(c.top) && c.facts.Kind && c.facts['Held by'] && c.facts.Origin === 'Asgardian', 'Mjolnir\'s card ' + JSON.stringify(c && c.facts));
  ok(c && c.heads.includes("Who's held it") && !c.heads.some(h => /Hands it has passed|Worthy/.test(h)) && c.heads.includes('Properties'), 'Mjolnir\'s sections ' + JSON.stringify(c && c.heads));
  ok(await p.evaluate(() => document.querySelector('#collView .uf-quote').textContent === 'Whosoever holds this hammer, if he be worthy, shall possess the power of Thor.'), 'the enchantment, word for word');
  await open('coll', 'C', 'tesseract'); ok(await p.evaluate(() => document.querySelector('#collView .uf-mark').dataset.live === 'tesseract'), 'the Tesseract can still be handled');
  // a file the research doesn't cover has no researched facts, and nothing else missing
  await open('cp', 'A', 'christine-everhart'); c = await card(); ok(c && !c.facts.Index && c.facts.Universe && c.ends === 2, 'a file without research ' + JSON.stringify(c && c.facts));
  // the Accords only once Civil War is watched, the Blip only once you've reached the person after the Snap
  await p.evaluate(() => { const L = DATA.timeline.map(e => e.t), n = L.indexOf('Avengers: Age of Ultron'); state.checks = {}; DATA.chapters.forEach(c => c.items.forEach(i => { const k = L.indexOf(i.t); if (k >= 0 && k <= n) state.checks[ck(c, i.t)] = true; })); persist(); renderAll(); });
  await open('cp', 'A', 'wanda-maximoff'); ok(!(await p.evaluate(() => document.querySelector('#collView .uf-rows'))), 'Accords or Blip shown before their films');
  ok(!errs.length, 'page errors: ' + errs.slice(0, 2).join(' | '));
  await b.close(); console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok: the files, one layout'); process.exit(fails.length ? 1 : 0); })();
