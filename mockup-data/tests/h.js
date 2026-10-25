const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const ROOT = process.env.ROOT || '/home/user/mcu-tracker';
async function open(opts = {}) {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const co = { viewport: { width: 412, height: 900 }, deviceScaleFactor: opts.video ? 1 : 2, hasTouch: !!opts.touch, isMobile: !!opts.touch };
  if (opts.video) co.recordVideo = { dir: opts.video, size: { width: 412, height: 900 } };
  const ctx = await browser.newContext(co);
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/vibrate/.test(m.text())) errs.push('console: ' + m.text()); });
  await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith('http://app/')) { const f = path.join(ROOT, u.slice(11).split('?')[0] || 'index.html'); return r.fulfill({ path: f }); } return r.continue(); });
  if (opts.state) await ctx.addInitScript(s => { try { if (!sessionStorage.getItem('__seeded')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('__seeded', '1'); } } catch (e) {} }, JSON.stringify(opts.state));
  await page.goto('http://app/index.html');
  await page.waitForTimeout(opts.wait || 1500);
  return { browser, ctx, page, errs };
}
// a state with everything checked in every list (for "fully watched")
module.exports = { open, S: __dirname + '/../shots' };
// everything watched in every list, every chapter unlocked, every hidden box opened
async function full(page, extra) {
  await page.evaluate(x => {
    const st = { checks: {}, unlocked: {}, seen: {}, mode: 'chapters', entered: 1, charOpen: {}, mvEver: 1, incEver: 1 };
    DATA.chapters.forEach(c => { st.unlocked[c.id] = true; c.items.forEach(i => st.checks[c.id + '::' + i.t] = true); });
    DATA.chars.forEach(c => { st.charOpen[c.id] = 1; c.items.forEach(i => st.checks[c.id + '::' + i.t] = true); });
    DATA.timeline.forEach(e => st.checks['tl::' + e.t] = true); DATA.timelineRelease.forEach(e => st.checks['tr::' + e.t] = true);
    Object.assign(st, x || {});
    localStorage.setItem('mcu-watch-tracker-v1', JSON.stringify(st));
  }, extra);
  await page.reload(); await page.waitForTimeout(1500);
}
module.exports.full = full;
async function openBox(page, id, kind) {
  await page.evaluate(([id, kind]) => { const L = kind === 'char' ? DATA.chars : DATA.chapters, e = L.find(c => c.id === id); const t = document.querySelector(`.tile[data-id="${id}"]`); openPanel(e, kind, t || document.body); }, [id, kind || 'char']);
  await page.waitForTimeout(900);
}
module.exports.openBox = openBox;
