const fs = require('fs'); const s = fs.readFileSync('/home/user/mcu-tracker/index.html', 'utf8');
const re = /<script>([\s\S]*?)<\/script>/g; let m, n = 0, bad = 0;
while ((m = re.exec(s))) { n++; try { new Function(m[1]); } catch (e) { bad++; console.log('SYNTAX', e.message); } }
const em = (s.match(/—/g) || []).length; console.log('scripts', n, 'bad', bad, 'emdash', em);
