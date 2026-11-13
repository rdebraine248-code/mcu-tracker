// one person, one bubble, and the bubble stands where the person's own file says (owner, 13 November 2026: "why are jack and Ben
// seperate? Their only importance is being phastos family. Jack is like 6 years old why is he in hammer industries?"). The Network had
// merged Phastos's son Jack with Hammer's assistant Jack by name alone. Checks: no two files merged into one bubble without a title in
// common; every Network person's current group is a group in their own file(s), their family or place circle, or Independent (the zombie
// world keeps its own rule); Ben and Jack stand in Phastos's family and Hammer's Jack is his own bubble; no one is a "version" of
// someone who only shares a first name or codename (the five Jacks, Bobby, Dave, Luis, Sergei, Raza, Talos, Blackwell)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  const ctx = await b.newContext({ viewport: { width: 412, height: 900 } });
  await ctx.route('**/*', r => { const u = r.request().url(); if (/\/data\.[0-9a-f]{12}\.js$/.test(u)) return r.fulfill({ path: path.join(path.dirname(process.argv[2]), u.split('/').pop()), contentType: 'text/javascript' }); return u === 'http://t/' ? r.fulfill({ body: fs.readFileSync(process.argv[2], 'utf8'), contentType: 'text/html; charset=utf-8' }) : u.startsWith('http://t/') ? r.fulfill({ body: '<!doctype html><title>x</title>', contentType: 'text/html' }) : r.continue(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('http://t/'); await sleep(1500);
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const F = await p.evaluate(() => Object.fromEntries([...THREATS, ...ALLIES].map(o => [o.id, { tm: Array.isArray(o.tm) ? o.tm.map(x => x[0]) : [o.tm || 'Independent'], t: [...new Set((o.st || []).map(x => String(x[1]).replace(/#\d+$/, '').replace(/ S\d+.*$/, '')))] }])));
  const net = fs.readFileSync(path.join(path.dirname(process.argv[2]), 'network.html'), 'utf8'), at = net.indexOf('const DATA = ');
  let D = null; try { const src = net.slice(at + 13); let d = 0, i = 0, q = false, e = false; for (; i < src.length; i++) { const c = src[i]; if (q) { if (e) e = false; else if (c === '\\') e = true; else if (c === '"') q = false; continue; } if (c === '"') q = true; else if (c === '{') d++; else if (c === '}' && !--d) break; } D = JSON.parse(src.slice(0, i + 1)); } catch (x) { fails.push('the Network data does not parse: ' + x.message); }
  if (D) {
    const N = D.nodes, M = D.merged || {}, P = (D.rel && D.rel.places) || {}, inv = {};
    Object.entries(M).forEach(([a, c]) => { (inv[c] = inv[c] || []).push(a);
      if (F[a] && F[c] && !/^(sv|fox|pr|by)-/.test(a)) ok(F[a].t.some(t => F[c].t.includes(t)), 'merged without a title in common: ' + a + ' into ' + c); });
    N.forEach((n, i) => { const id = n[11]; if (/^by-zombie-/.test(id)) return; const ids = [id, ...(inv[id] || [])].filter(x => F[x]); if (!ids.length) return;
      const G = new Set(['Independent']); ids.forEach(x => F[x].tm.forEach(g => G.add(g)));
      ok(G.has(n[2]) || n[2] === P[String(i)], 'Network: ' + n[0] + ' (' + id + ') stands in ' + n[2] + ', not in their file'); });
    const node = id => N.findIndex(n => n[11] === id);
    ['jack-eternals', 'ben-eternals'].forEach(id => ok(P[String(node(id))] === "Phastos's family", id + " stands in Phastos's family (got " + P[String(node(id))] + ')'));
    const jh = N[node('jack-hammer')]; ok(jh && jh[2] === 'Hammer Industries', "Hammer's Jack is his own bubble, in Hammer Industries");
    ok(!M['jack-hammer'], "Hammer's Jack is not merged into Phastos's son");
    // and no one is another person's "version" for sharing only a first name or a codename
    const V = D.variants || [], vid = new Set(); V.forEach(([a, c]) => { vid.add(N[a][11]); vid.add(N[c][11]); });
    ['jack-eternals', 'jack-hammer', 'st-bobby', 'dave', 'luis', 'st-sergei', 'raza', 'talos', 'st-blackwell'].forEach(id => ok(!vid.has(id), id + ' is linked as a version of someone who only shares the name'));
  }
  ok(!errs.length, 'page errors: ' + errs.join(' | '));
  console.log(fails.length ? 'FAIL\n' + fails.slice(0, 30).join('\n') : 'ok'); await b.close(); process.exit(fails.length ? 1 : 0); })();
