// builds network-hub.html: the data, plus where each crew stands, worked out here once
const { chromium } = require('/opt/node22/lib/node_modules/playwright'), fs = require('fs'), dir = __dirname + '/..';
(async () => { const src = fs.readFileSync(dir + '/hub-src.html', 'utf8'), d = JSON.parse(fs.readFileSync(__dirname + '/hub.json', 'utf8')); d.ord = JSON.parse(fs.readFileSync(__dirname + '/ord.json', 'utf8')); d.map = JSON.parse(fs.readFileSync(__dirname + '/map.json', 'utf8')); d.rel = JSON.parse(fs.readFileSync(__dirname + '/rel.json', 'utf8')); { const ef = __dirname + '/../rel/uni/earth/earths.json'; d.earth = {}; if (fs.existsSync(ef)) Object.entries(JSON.parse(fs.readFileSync(ef, 'utf8'))).forEach(([id, v]) => { d.earth[id] = v && v.earth || null; });   /* null: from another world with no number, so never shown as Earth-616 */ }
  fs.writeFileSync(__dirname + '/bake.html', src.replace('/*DATA*/null', JSON.stringify(d)));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' }), p = await b.newPage();
  await p.goto('file://' + __dirname + '/bake.html'); await p.waitForTimeout(300);
  d.at = await p.evaluate(() => Z0.map(z => [Math.round(z.x * 10) / 10, Math.round(z.y * 10) / 10])); await b.close();
  fs.writeFileSync(dir + '/network-hub.html', src.replace('/*DATA*/null', JSON.stringify(d)));
  // a phone-true copy for screenshots: the published page gets this viewport from the artifact's own wrapper
  fs.writeFileSync(__dirname + '/phone.html', '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' + src.replace('/*DATA*/null', JSON.stringify(d))); console.log('baked', d.at.length, 'crews'); })();
