// the indexes' universe tabs (October 2026) are named by the same rule as the Sacred Timeline: once the Extra chapter is opened or every title
// in it is watched; holding the Incursions line under Avengers: Doomsday marks every Incursion watched, and a tap still opens the list
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); }, errs = [];
  const run = async (save, fn) => { const ctx = await b.newContext({ viewport: { width: 412, height: 900 }, hasTouch: false });
    await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify(save));
    await ctx.route('**/*', r => r.request().url().startsWith('http://t/') ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : r.continue());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(2500);
    const r = await fn(p); await ctx.close(); return r; };
  const base = { entered: 1, booted: 1, orderPicked: 1, raftIn: 1, cpIn: 1, collIn: 1 };
  const tabs = p => p.evaluate(() => ['raft', 'cp', 'coll'].map(m => { openColl(m); return [...document.querySelectorAll('#collView .rf-tabs button')].map(x => x.textContent); }));
  // every timeline title watched, no Extra chapter opened on the Chapters page: all five tabs are named
  const all = await run(null, async p => p.evaluate(() => DATA.timeline.map(e => e.t)));
  const named = await run({ ...base, checks: Object.fromEntries(all.map(t => ['tl::' + t, true])) }, tabs);
  ok(named.every(L => L.join('|') === 'Sacred Timeline|Beyond|Spider-Verse|FoX-Men|Pruned'), 'all watched, tabs named ' + JSON.stringify(named));
  // only the main line watched: the Extras stay classified
  const main = await run(null, async p => p.evaluate(() => DATA.timeline.filter(e => e.lane === 'main').map(e => e.t)));
  const shut = await run({ ...base, checks: Object.fromEntries(main.map(t => ['tl::' + t, true])) }, tabs);
  ok(shut.every(L => L[0] === 'Sacred Timeline' && L.slice(1).every(x => x === '[ Classified ]')), 'main line only, Extras classified ' + JSON.stringify(shut));
  // an Extra opened on the Chapters page names its tab, as before
  const opened = await run({ ...base, unlocked: { 'ch-the-fox-men': true }, checks: { 'tl::Loki S1': true } }, tabs);
  ok(opened[0][3] === 'FoX-Men' && opened[0][2] === '[ Classified ]', 'an opened Extra is named ' + JSON.stringify(opened[0]));
  // the Incursions line: a tap opens the list, a hold marks every Incursion watched
  const inc = await run({ ...base, mode: 'timeline', checks: Object.fromEntries(main.map(t => ['tl::' + t, true])) }, async p => {
    await p.evaluate(() => { const m = document.querySelector('#view [data-incm]'); if (m) m.scrollIntoView({ block: 'center' }); }); await sleep(400);
    const m = await p.$('#view [data-incm]'); if (!m) return { mark: false };
    const box = await m.boundingBox(), x = box.x + box.width / 2, y = box.y + box.height / 2;
    await p.mouse.click(x, y); await sleep(700);
    const tapOpened = await p.evaluate(() => !!document.querySelector('#panel:not([hidden]), .panel.open, [data-panel].open') || document.body.classList.contains('panel-open'));
    await p.evaluate(() => { try { history.back(); } catch (e) {} }); await sleep(700);
    const before = await p.evaluate(() => DATA.chapters.find(c => c.id === INC_ID).items.filter(i => state.checks['tl::' + i.t]).length);
    await p.mouse.move(x, y); await p.mouse.down(); await sleep(900); await p.mouse.up(); await sleep(400);
    const asked = await p.evaluate(() => !document.getElementById('ask').hidden && document.getElementById('askMsg').textContent);
    await p.click('#askYes'); await sleep(1200);
    return { mark: true, tapOpened, before, asked, after: await p.evaluate(() => { const L = DATA.chapters.find(c => c.id === INC_ID).items; return [L.filter(i => state.checks['tl::' + i.t]).length, L.length]; }),
      saved: await p.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('mcu-watch-tracker-v1')).checks).length),
      doom: await (async () => { const t = await p.$('#view .tl-row[data-tl="Avengers: Doomsday"] .tt'); const bb = await t.boundingBox();
        await p.mouse.move(bb.x + 8, bb.y + bb.height / 2); await p.mouse.down(); await sleep(1100); await p.mouse.up(); await sleep(300);
        return { canvas: await p.evaluate(() => !!document.querySelector('.fx-canvas') || !!state.found && !!(state.found.doom || (Array.isArray(state.found) && state.found.includes('doom')))), asked: await p.evaluate(() => !document.getElementById('ask').hidden) }; })() };
  });
  ok(inc.mark, 'the Incursions line shows once Doomsday is checked');
  ok(inc.before === 0 && inc.asked === 'Mark every Incursion as watched?', 'a hold asks first ' + JSON.stringify(inc));
  ok(inc.after && inc.after[0] === inc.after[1] && inc.after[1] > 50, 'every Incursion marked ' + JSON.stringify(inc.after));
  ok(inc.doom && !inc.doom.asked, 'holding the Doomsday title itself doesn\'t ask about the Incursions ' + JSON.stringify(inc.doom));
  // before Doomsday is checked there is no Incursions line to hold
  const none = await run({ ...base, mode: 'timeline', checks: Object.fromEntries(main.filter(t => t !== 'Avengers: Doomsday').map(t => ['tl::' + t, true])) }, p => p.evaluate(() => !!document.querySelector('#view [data-incm]')));
  ok(!none, 'no Incursions line before Doomsday');
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok', errs.length ? 'errors ' + errs.join(' | ') : '');
  await b.close(); process.exit(fails.length || errs.length ? 1 : 0); })();
