const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const p = await (await b.newContext()).newPage();
  await p.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: require('path').join(require('path').dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' }); return u === 'http://t/' ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : u.startsWith('http://t/') ? r.fulfill({ body: '', contentType: 'text/html' }) : r.continue(); });
  await p.goto('http://t/'); await sleep(1500);
  const r = await p.evaluate(() => [...THREATS.map(o => ['T', o]), ...ALLIES.map(o => ['A', o])].map(([g, o]) => ({ g, id: o.id, rf: o.rf || null, tm: o.tm, st: (o.st || []).map(x => [x[1], x[2], x[0].slice(0, 120)]) })));
  fs.writeFileSync(process.argv[3], JSON.stringify(r)); await b.close(); })();
