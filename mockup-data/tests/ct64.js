// a person shows the group they're in during a title you've watched (owner, November 2026: with only Spider-Man: Homecoming watched,
// Peter stood alone in the Network, his school being recorded at Civil War, and Tony too). The Network and the files' Teams rows agree,
// and nothing after the latest title you've seen them in shows (Peter's Avengers wait for Infinity War)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } }), dir = path.dirname(process.argv[2]);
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('x')) { localStorage.setItem('mcu-watch-tracker-v1', s); sessionStorage.setItem('x', 1); } }, JSON.stringify({ entered: 1, booted: 1, orderPicked: 1, checks: {} }));
  await ctx.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: require('path').join(require('path').dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' });   /* a split main's files data (mainsplit.py) */ if (u === 'http://t/') return r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' });
    if (u === 'http://t/network.html' && fs.existsSync(dir + '/network.html')) return r.fulfill({ body: fs.readFileSync(dir + '/network.html', 'utf8'), contentType: 'text/html; charset=utf-8' });
    return u.startsWith('http://t/') ? r.fulfill({ body: '<!doctype html><title>x</title>', contentType: 'text/html' }) : r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1200);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  await p.evaluate(() => { const c = DATA.chapters.find(c => c.items.some(i => i.t === 'Spider-Man: Homecoming')); state.checks[ck(c, 'Spider-Man: Homecoming')] = true; state.cpIn = 1; state.raftIn = 1; persist(); });
  await p.reload(); await sleep(4000);
  const A = await p.evaluate(() => { const f = id => ALLIES.find(a => a.id === id); return { peter: tmNow(f('peter-parker').tm, f('peter-parker')), tony: tmNow(f('tony-stark').tm, f('tony-stark')), cpPeter: cpTeam(f('peter-parker')) }; });
  ok(/Midtown/.test(A.peter) && /Midtown/.test(A.cpPeter), 'Peter\'s file: Midtown with only Homecoming watched: ' + JSON.stringify(A));
  ok(A.tony !== 'Independent', 'Tony\'s file has a group with only Homecoming watched: ' + A.tony);
  // the Network, if this build carries it
  const net = await p.evaluate(async () => { if (!NET_SRC) return null; openNet(); await new Promise(r => setTimeout(r, 4000)); const w = document.getElementById('netFrame').contentWindow; if (!w.eval) return null;
    return w.eval("(() => { const g = id => { const q = N.find(x => x.id === id); return q ? String(q.g).split('\\u2063')[0] : null; }; return { peter: g('peter-parker'), tony: g('tony-stark') }; })()"); });
  if (net) { ok(/Midtown/.test(net.peter), 'Peter in the Network stands with Midtown: ' + JSON.stringify(net)); ok(net.tony && net.tony !== 'Independent', 'Tony in the Network has a group: ' + JSON.stringify(net)); ok(!/Avengers/.test(net.peter), 'Peter not yet an Avenger'); }
  // nothing later: Peter's Avengers only from Infinity War
  ok(!/Avengers/.test(A.peter), 'Peter not an Avenger on his file before Infinity War: ' + A.peter);
  ok(!errs.length, 'page errors: ' + errs.join(' | '));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok' + (net ? '' : ' (no Network in this build)')); await b.close(); process.exit(fails.length ? 1 : 0); })();
