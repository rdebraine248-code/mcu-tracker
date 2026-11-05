// the Held line (owner, November 2026: "the Darkhold under Wanda's Multiverse of Madness entry"): under a file's entry, beside At and
// Case, the Collection objects that person holds in that title, on the last entry of the title, only once the Collection is found and
// the object's own step is reached; each opens the object's file on top, and back returns to the person's file. A show's running
// episode number finds its season ("In episode 42," is Agents of S.H.I.E.L.D. season 2)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  await ctx.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: require('path').join(require('path').dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' });   /* a split main's files data (mainsplit.py) */ return u === 'http://t/' ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : u.startsWith('http://t/') ? r.fulfill({ body: '<!doctype html><title>x</title>', contentType: 'text/html' }) : r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  await p.evaluate(() => { const st = state; DATA.chapters.forEach(c => { st.unlocked[c.id] = true; c.items.forEach(i => st.checks[ck(c, i.t)] = true); }); DATA.timeline.forEach(e => st.checks['tl::' + e.t] = true);
    st.mvEver = 1; st.incEver = 1; st.charOpen = {}; DATA.chars.forEach(c => { st.charOpen[c.id] = 1; c.items.forEach(i => st.checks[ck(c, i.t)] = true); }); st.collIn = 1; st.cpIn = 1; st.raftIn = 1; st.eggs = { collector: 1, compound: 1 }; persist(); });
  await p.reload(); await sleep(9000);
  const file = async (tg, id) => { await p.evaluate(([tg, id]) => fileGo(tg, id), [tg, id]); await sleep(700);   // straight from file to file, as Back would walk history past the page
    return p.evaluate(() => [...document.querySelectorAll('#collView .co-chain li')].map(li => ({ t: (li.querySelector('small') || {}).textContent || '', held: [...li.querySelectorAll('[data-held]')].map(a => a.dataset.held) })).filter(x => x.held.length)); };
  let r = await file('A', 'wanda-maximoff');
  ok(r.length && r.some(x => /WandaVision/.test(x.t) && x.held.includes('darkhold')), 'Wanda\'s WandaVision entry holds the Darkhold: ' + JSON.stringify(r));
  ok(r.every(x => x.held.length === new Set(x.held).size), 'an object is listed once per entry');
  await file('A', 'phil-coulson'); r = await file('T', 'wanda-maximoff');   // her two files share an id: another file between them
  ok(r.some(x => /Multiverse of Madness/.test(x.t) && x.held.includes('darkhold')), 'her Raft file\'s Multiverse of Madness entry holds it: ' + JSON.stringify(r));
  // several entries in one title: only the last carries it
  ok(await p.evaluate(() => { const L = [...document.querySelectorAll('#collView .co-chain li')].filter(li => /Multiverse of Madness/.test((li.querySelector('small') || {}).textContent || '')); return L.length < 2 || L.slice(0, -1).every(li => !li.querySelector('[data-held]')); }), 'only the title\'s last entry carries it');
  // a running episode number finds its season: Coulson's Agents of S.H.I.E.L.D. entries hold Lola
  r = await file('A', 'phil-coulson');
  ok(r.some(x => /S\.H\.I\.E\.L\.D\./.test(x.t) && x.held.includes('lola')), 'Coulson\'s season entries hold Lola: ' + JSON.stringify(r.map(x => x.t)));
  // tapping it opens the object, back returns to the person
  await file('A', 'wanda-maximoff'); await p.evaluate(() => document.querySelector('#collView [data-held="darkhold"]').click()); await sleep(800);
  ok(await p.evaluate(() => collMode === 'coll' && collRec === 'darkhold'), 'Held opens the object\'s file');
  await p.evaluate(() => history.back()); await sleep(800);
  ok(await p.evaluate(() => collMode === 'cp' && collRec === 'wanda-maximoff'), 'back returns to Wanda\'s file');
  // not before the Collection is found, and not before the object's own step
  await p.evaluate(() => { state.collIn = 0; renderColl(); }); await sleep(300); r = await p.evaluate(() => document.querySelectorAll('#collView [data-held]').length);
  ok(r === 0, 'no Held line before the Collection is found');
  await p.evaluate(() => { state.collIn = 1; renderColl(); }); await sleep(300); r = await p.evaluate(() => document.querySelectorAll('#collView [data-held]').length);
  ok(r > 0, 'back once it is');
  // specimens have homes, not holders
  ok(await p.evaluate(() => { let n = 0; heldIx().forEach(v => v.forEach(([o]) => { if (o.c === 'specimens') n++; })); return n === 0; }), 'no specimen is ever held');
  ok(!errs.length, 'page errors: ' + errs.join(' | '));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok'); await b.close(); process.exit(fails.length ? 1 : 0); })();
