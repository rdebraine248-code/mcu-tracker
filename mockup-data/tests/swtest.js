// the offline copy under a weak signal: the page cut off partway, stalled, the connection gone, and the Network's file missing
const http = require('http'), fs = require('fs'), path = require('path'), { chromium } = require('/opt/node22/lib/node_modules/playwright');
const ROOT = process.argv[2], SW = process.argv[3], sleep = ms => new Promise(r => setTimeout(r, ms));
let mode = 'normal', netMode = 'normal';
const srv = http.createServer((q, s) => { let u = decodeURIComponent(q.url.split('?')[0]);
  if (!u.startsWith('/mcu-tracker/')) { s.writeHead(404); return s.end(); } u = u.slice(13) || 'index.html';
  const f = u === 'sw.js' ? SW : path.join(ROOT, u); if (!fs.existsSync(f)) { s.writeHead(404); return s.end(); }
  const body = fs.readFileSync(f), type = u.endsWith('.html') ? 'text/html; charset=utf-8' : u.endsWith('.js') ? 'text/javascript' : u.endsWith('.png') ? 'image/png' : 'application/json';
  const m = u === 'index.html' ? mode : u === 'network.html' ? netMode : 'normal';
  if (m === 'down') return q.socket.destroy();
  if (m === '404') { s.writeHead(404); return s.end('missing'); }
  s.writeHead(200, { 'content-type': type, 'content-length': body.length, 'cache-control': 'no-cache' });
  if (m === 'cut') { s.write(body.slice(0, body.length >> 1)); return setTimeout(() => q.socket.destroy(), 200); }
  if (m === 'stall') { s.write(body.slice(0, 1 << 16)); return; }   // never finishes
  s.end(body); });
srv.listen(0, async () => { const base = `http://localhost:${srv.address().port}/mcu-tracker/`;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' }), ctx = await b.newContext(), p = await ctx.newPage();
  await ctx.addInitScript(() => { if (!localStorage.getItem('mcu-watch-tracker-v1')) localStorage.setItem('mcu-watch-tracker-v1', JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} })); });
  const app = () => p.evaluate(() => !!document.getElementById('dock') && typeof state === 'object').catch(() => false);
  await p.goto(base); await sleep(4000); await p.reload(); await sleep(4000);   // installed, in control, the saved copy in place
  const res = { controlled: await p.evaluate(() => !!navigator.serviceWorker.controller) };
  for (const m of ['cut', 'stall', 'down']) { mode = m; const t0 = Date.now(); let err = null;
    try { await p.goto(base, { timeout: 15000, waitUntil: 'domcontentloaded' }); } catch (e) { err = e.message.split('\n')[0]; }
    await sleep(1500); res[m] = { app: await app(), ms: Date.now() - t0 - 1500, err }; }
  mode = 'normal'; await p.goto(base); await sleep(3000); res.backOnline = await app();
  // the Network's file missing: its frame must never get a second copy of the app
  netMode = '404'; await p.evaluate(() => { const f = document.getElementById('netFrame'); f.dataset.on = ''; f.src = 'network.html?x=' + Date.now(); }); await sleep(3000);
  res.frame = await p.evaluate(() => { const d = document.getElementById('netFrame').contentDocument; return !d ? 'none' : d.getElementById('dock') ? 'THE APP (second copy)' : (d.body && d.body.innerText || '').slice(0, 40) || 'blank'; });
  console.log(JSON.stringify(res)); await b.close(); srv.close(); });
