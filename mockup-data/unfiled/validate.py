# the writing and format rules, checked on a draft or a checked batch: python3 validate.py chkNN.json inNN.json
import json, re, sys
d = json.load(open(sys.argv[1])); b = json.load(open(sys.argv[2]))
TS = {t for v in b['titles'].values() for t in v['title_strings']} | set(json.load(open('/home/user/mcu-tracker/mockup-data/alltitles.json')))
NP = {n for v in b['titles'].values() for n in v['network_people']}
ST = {'A': {'Active', 'Off-world', 'Retired', 'Fugitive', 'Imprisoned', 'Missing', 'Deceased'}, 'T': {'Active', 'In custody', 'Captive', 'At large', 'Missing', 'Allied', 'Deceased'}}
BAN = re.compile(r'\b(season|episode|finale|credits|flashback)\b|the film|the show', re.I)
errs = []; ids = set(); names = set()
def nm(f): n = f['add']['n']; return n if isinstance(n, str) else n[-1][0]
for f in d['files']:
    a = f['add']; tg = f['tg']
    if a['id'] in ids: errs.append('dup id ' + a['id'])
    ids.add(a['id']); names.add(nm(f)); names.update(x[0] for x in a['n']) if isinstance(a['n'], list) else None
    for k in ('n', 'k', 'tm'):
        v = a.get(k)
        if isinstance(v, list):
            for x in v:
                t = x[1].split('#')[0]
                if t not in TS: errs.append(f"{a['id']} {k} title {x[1]}")
    for st in a['st']:
        txt = re.sub(r'^In season \d+, ', '', st[0])
        if st[1] not in TS: errs.append(f"{a['id']} title {st[1]}")
        if st[2] not in ST[tg]: errs.append(f"{a['id']} status {st[2]}")
        if '—' in st[0] or '–' in st[0]: errs.append(f"{a['id']} dash")
        if BAN.search(txt): errs.append(f"{a['id']} banned word: {txt[:60]}")
        if len(txt) > 140: errs.append(f"{a['id']} long {len(txt)}: {txt[:50]}")
    if tg == 'T' and not all(a.get(k) for k in ('cl', 'op')): errs.append(f"{a['id']} raft fields")
for t in d['ties']:
    for x in (t['a'], t['b']):
        if x not in NP and x not in names: errs.append(f"tie name {x}")
    for sg in t['stages']:
        if sg['kind'] not in ('family', 'partner', 'friend', 'mentor', 'boss', 'ally', 'rival', 'enemy'): errs.append(f"kind {sg['kind']}")
        for k in ('text', 'whoA', 'whoB'):
            if '—' in sg[k] or '–' in sg[k]: errs.append(f"tie dash {t['a']}|{t['b']}")
            if BAN.search(sg[k]): errs.append(f"tie banned {t['a']}|{t['b']}: {sg[k][:50]}")
print(len(d['files']), 'files', len(d['ties']), 'ties', len(d.get('dropped', [])), 'dropped |', len(errs), 'problems'); [print(' ', e) for e in errs[:40]]
