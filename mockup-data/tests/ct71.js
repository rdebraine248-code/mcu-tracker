// a list opened from a file in another index (owner, 15 November 2026: "Went wanda, darkhold, aida and then independent and it goes back to
// the objects held by aida not list of independents"): Wanda's file, her Darkhold, its holder Aida's objects, Aida's Raft file, her faction.
// The faction opens the Raft's own list (it used to go back to the Collection's "held by Aida"); back from it, the list having taken the
// file's place (ct65's rule), goes to the objects held by Aida, then to Wanda
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
    state.eggs = Object.assign(state.eggs || {}, { compound: 1, raft: 1, collector: 1, damagecontrol: 1 }); state.collIn = 1; state.raftIn = 1; persist(); renderAll(); setInterval(() => { try { sayQ.length = 0; } catch (e) {} }, 50); });
  const at = () => p.evaluate(() => collMode + ':' + (collRec || (collMode === 'raft' ? 'list/' + rfTeamF : collMode === 'coll' ? 'list/' + cxHoldF : 'list')));
  const tap = async sel => { const h = await p.$('#collView ' + sel); if (!h) return false; await h.scrollIntoViewIfNeeded(); await h.tap(); await sleep(800); return true; };
  await p.evaluate(() => { openColl('cp'); }); await sleep(300); await p.evaluate(() => fileGo('A', 'wanda-maximoff')); await sleep(700);
  ok(await tap('[data-held="darkhold"]'), 'Wanda has no Darkhold'); ok(await at() === 'coll:darkhold', 'not on the Darkhold: ' + await at());
  ok(await tap('[data-cxh="Aida"]'), 'the Darkhold has no Aida'); ok(await at() === 'coll:list/Aida', 'not on the objects held by Aida: ' + await at());
  ok(await tap('[data-cxo="T:st-aida"]'), 'no Raft file for Aida'); ok(await at() === 'raft:st-aida', 'not on Aida\'s Raft file: ' + await at());
  ok(await tap('[data-rft="Independent"]'), 'Aida has no Independent'); ok(await at() === 'raft:list/Independent', 'Independent opened ' + await at() + ', not the Raft\'s independents');
  for (const want of ['coll:list/Aida', 'cp:wanda-maximoff']) { await p.goBack(); await sleep(800); ok(await at() === want, 'back went to ' + await at() + ', not ' + want); }
  ok(!errs.length, 'page errors: ' + errs.slice(0, 2).join(' | '));
  await b.close(); console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok: a list opened from another index\'s file, and back'); process.exit(fails.length ? 1 : 0); })();
