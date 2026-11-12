// a scene set in the past inside a later title doesn't move anyone (owner, 12 November 2026): Endgame's trip to 2012 meets Sitwell,
// Pierce, Rollins and Rumlow inside S.H.I.E.L.D., but they end where their own story ends. With the whole Sacred Timeline watched, no
// one's last group may come from an Endgame stage whose step is set in an earlier year; the four end in HYDRA (Rumlow: Independent)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: require('path').join(require('path').dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' });   /* a split main's files data (mainsplit.py) */ return u === 'http://t/' ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : u.startsWith('http://t/') ? r.fulfill({ body: '<!doctype html><title>x</title>', contentType: 'text/html' }) : r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1500);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const r = await p.evaluate(() => {
    const TL = DATA.timeline.map(e => e.t), ix = t => { const b = String(t).replace(/#\d+$/, '').replace(/ \((Post|Mid)-Credits Scene\)$/, ''); let i = TL.indexOf(b); if (i < 0) i = TL.findIndex(x => x.startsWith(b + ' S') || b.startsWith(x)); return i; };
    const last = o => { const L = Array.isArray(o.tm) ? o.tm.filter(x => x[1]).map((x, k) => [x[0], x[1], ix(x[1]), k]).sort((a, b) => a[2] - b[2] || a[3] - b[3]) : []; return L.length ? L[L.length - 1] : null; };
    const bad = [], four = {};
    [...THREATS, ...ALLIES].forEach(o => { if (/^(sv|fox|pr|by)-/.test(o.id)) return; const g = last(o); if (!g) return;
      if (['jasper-sitwell', 'alexander-pierce', 'jack-rollins', 'brock-rumlow'].includes(o.id)) four[o.id] = g[0];
      if (g[1] !== 'Avengers: Endgame') return;
      const s = (o.st || []).filter(x => x[1] === 'Avengers: Endgame'); if (s.length && s.every(x => /^In (19|20)\d\d,/.test(x[0]) && +x[0].slice(3, 7) < 2023)) bad.push(o.id + ': ' + g[0]); });
    return { bad, four }; });
  ok(!r.bad.length, 'last group from a past visit in Endgame: ' + r.bad.join(', '));
  ok(r.four['jasper-sitwell'] === 'HYDRA', 'Sitwell ends in HYDRA (got ' + r.four['jasper-sitwell'] + ')');
  ok(r.four['alexander-pierce'] === 'HYDRA', 'Pierce ends in HYDRA (got ' + r.four['alexander-pierce'] + ')');
  ok(r.four['jack-rollins'] === 'HYDRA', 'Rollins ends in HYDRA (got ' + r.four['jack-rollins'] + ')');
  ok(r.four['brock-rumlow'] === 'Independent', 'Rumlow ends Independent (got ' + r.four['brock-rumlow'] + ')');
  // the Network sorts group stages by each title's place in the timeline: a past stage must not come out last there either
  // (split.json "past", 12 November 2026): Yondu, Foggy, Janet, the cartoon Apocalypse, Roxy Glass, three cartoon Peter Parkers
  const net = fs.readFileSync(require('path').join(require('path').dirname(process.argv[2]), 'network.html'), 'utf8'), at = net.indexOf('const DATA = ');
  let N = null; try { const src = net.slice(at + 13); let d = 0, i = 0, q = false, e = false; for (; i < src.length; i++) { const c = src[i]; if (q) { if (e) e = false; else if (c === '\\') e = true; else if (c === '"') q = false; continue; } if (c === '"') q = true; else if (c === '{') d++; else if (c === '}' && !--d) break; } N = JSON.parse(src.slice(0, i + 1)).nodes; } catch (x) { fails.push('the Network data does not parse: ' + x.message); }
  if (N) { const now = id => (N.find(n => n[11] === id) || [])[2];
    [['jasper-sitwell', 'HYDRA'], ['alexander-pierce', 'HYDRA'], ['jack-rollins', 'HYDRA'], ['brock-rumlow', 'Independent'], ['yondu', 'Guardians of the Galaxy'],
     ['st-foggy-nelson', 'Nelson, Murdock & Page'], ['janet-van-dyne', 'Independent'], ['fox-anim-apocalypse', 'The Horsemen of Apocalypse'], ['by-st-roxy-glass', 'S.H.I.E.L.D.'],
     ['sv-peter-parker-1967', 'Spider-Society'], ['sv-peter-parker-smu', 'Spider-Society'], ['sv-peter-parker-ssm', 'Spider-Society']].forEach(([id, g]) => ok(now(id) === g, 'Network: ' + id + ' ends in ' + g + ' (got ' + now(id) + ')')); }
  ok(!errs.length, 'page errors: ' + errs.join(' | '));
  console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'ok'); await b.close(); process.exit(fails.length ? 1 : 0); })();
