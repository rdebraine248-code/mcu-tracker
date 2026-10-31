// a reviewer's extra inputs for one part: fights on file with no written connection, and people with no crew
const fs = require('fs'), H = require('./hub.json'), R = require('./rel.json'), N = H.nodes, part = process.argv[2];
const D = __dirname + '/../rel/uni/', P = JSON.parse(fs.readFileSync(D + part + '.json')), mg = H.merged || {};
const ids = new Set(P.map(o => mg[o.id] || o.id)), ix = new Map(N.map((n, i) => [n[11], i]));
const tied = new Set(R.ties.map(([a, b]) => [a, b].sort((x, y) => x - y).join('|')));
const fights = []; N.forEach((n, i) => { if (!ids.has(n[11])) return; n[3].forEach(([j, ...w]) => { if (i < j && ids.has(N[j][11]) && !tied.has(i + '|' + j)) fights.push({ a: n[11], b: N[j][11], name_a: n[0], name_b: N[j][0], on_file_in: w.map(t => H.titles[t]) }); }); });
const crewless = N.filter(n => ids.has(n[11]) && n[2] === 'Independent').map(n => ({ id: n[11], name: n[0], what: n[12], titles: n[7].map(t => H.titles[t]) }));
fs.writeFileSync(D + part + '_review_in.json', JSON.stringify({ fights_unwritten: fights, crewless }, null, 1));
console.log(part, 'fights unwritten', fights.length, '| crewless', crewless.length);
