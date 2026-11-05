# main's launch page, slimmed (owner, 5 November 2026, question 61: "Slim it"): the files' data (the Raft, the Compound, the Collection,
# the episode lists, the id moves) goes into its own script, data.<hash>.js, loaded by a plain <script src> just before the app's own,
# so the app runs exactly as before with every name already defined. The hash is the data's own, so a code-only update keeps the same
# file and the phone keeps its saved copy; sw.js keeps it for offline and only ever hands it over whole.
#   python3 mainsplit.py out/main.html out/mainroot     -> out/mainroot/index.html + out/mainroot/data.<hash>.js
import hashlib, os, sys
src, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
L = open(src, encoding='utf8').read().split('\n')
MOVE = ('const COLLX = ', 'const THREATS = ', 'const ALLIES = ', 'const IDMOVE = ', 'const EPS = ')
idx = [n for n, l in enumerate(L) if l.startswith(MOVE)]
assert len(idx) == len(MOVE), ('expected one line each', [L[n][:30] for n in idx])
opens = [n for n, l in enumerate(L) if l.strip() == '<script>' and n < idx[0]]
start = opens[-1]   # the app's one big script
assert all(start < n for n in idx) and '</script>' not in '\n'.join(L[start:max(idx) + 1]), 'the data lines must all sit inside the app script'
data = '\n'.join(L[n] for n in idx) + '\n'
h = hashlib.sha256(data.encode()).hexdigest()[:12]; name = 'data.' + h + '.js'
for d in os.listdir(out):
    if d.startswith('data.') and d.endswith('.js'): os.remove(os.path.join(out, d))
open(os.path.join(out, name), 'w', encoding='utf8').write('// the app\'s files data (mainsplit.py): loaded before the app\'s own script\n' + data)
keep = [l for n, l in enumerate(L) if n not in set(idx)]
# if the data file can't be had (the signal drops right then), the page tries once more rather than starting without it
keep.insert(start, '<script src="' + name + '" onerror="try{if(!sessionStorage.getItem(\'mcu-data-retry\')){sessionStorage.setItem(\'mcu-data-retry\',1);setTimeout(function(){location.reload()},1200)}}catch(e){}"></script>')
page = '\n'.join(keep); open(os.path.join(out, 'index.html'), 'w', encoding='utf8').write(page)
print('index.html', len(page.encode()), name, len(data.encode()))
