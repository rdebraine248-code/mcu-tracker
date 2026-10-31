// each other universe's people, from the app's own files, for its relationship pass: id, name, what they are, aliases, crews, every
// title they're in, their service record, and who they fight
const { open } = require('/home/user/mcu-tracker/mockup-data/tests/h.js'), fs = require('fs');
(async () => { const { browser, page } = await open({ state: { entered: 1 } });
  const d = await page.evaluate(() => { const out = {}, so = DATA.timeline.map(e => e.t);
    const fl = o => ({ id: o.id, name: Array.isArray(o.n) ? o.n[o.n.length - 1][0] : o.n, what: Array.isArray(o.k) ? o.k[o.k.length - 1][0] : o.k || '',
      aliases: (o.al || []).map(x => Array.isArray(x) ? x[0] : x), crews: Array.isArray(o.tm) ? o.tm.map(x => x[0]) : o.tm ? [o.tm] : [],
      titles: [...new Set((o.st || []).map(x => x[1]).filter(Boolean))], record: (o.st || []).map(x => x[1] + ': ' + x[0]),
      fights: (o.opp || []).map(([h, w]) => h + (w ? ' @ ' + w : '')) });
    [...ALLIES.map(o => [o, 'hero']), ...THREATS.map(o => [o, 'villain'])].forEach(([o, side]) => { if (o.grp) return; const u = rfUniOf(o); if (u === 'mcu') return;
      (out[u] = out[u] || []).push(Object.assign(fl(o), { side })); });
    return { out, order: so }; });
  Object.entries(d.out).forEach(([u, L]) => fs.writeFileSync(__dirname + '/../rel/uni/' + u + '.json', JSON.stringify(L, null, 1)));
  fs.writeFileSync(__dirname + '/../rel/uni/story_order.json', JSON.stringify(d.order));
  console.log(Object.entries(d.out).map(([u, L]) => u + ' ' + L.length).join(', '));
  await browser.close(); })();
