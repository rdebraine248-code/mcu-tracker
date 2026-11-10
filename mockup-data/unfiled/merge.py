# fold every checked batch (chkNN.json) into the app's data: answers_fix adds (q "unfiled"), the files' episode tags, the Network ties
# (rel/unfiled_out.json, the two sample files' ties kept first) and the ties' episode tags. Rerunnable: it replaces what it added before.
import json, re, glob, sys
MD = '/home/user/mcu-tracker/mockup-data/'
H = json.load(open(MD + 'network/src/prof/hub.json'))
SEAS = {k: v[0] for k, v in H['seas'].items()}
def base(t): t = re.sub(r'#\d+$', '', t); t = re.sub(r' S\d+(?:[–-]S?\d+)?$', '', t); return re.sub(r' \((Post|Mid)-Credits Scene\)$', '', t)
# Network names to ids (the Sacred Timeline), with the titles each is in, to settle a shared name by title
BYN = {}
for n in H['nodes']:
    if n[10] not in ('mcu', 'by'): continue
    BYN.setdefault(n[0], []).append((n[11], {base(H['titles'][i]) for i in n[7]}, n[10]))
batches = sorted(glob.glob('chk*.json')); files, ties, problems = [], [], []
for f in batches:
    d = json.load(open(f)); files += d['files']; ties += d['ties']
def s67(x):
    for st in x['add']['st']:
        m = re.match(r'In season (\d+),', st[0])
        if not (st[1].startswith('Agents of S.H.I.E.L.D.') and (m and int(m.group(1)) >= 6 or re.search(r' S[67]$', st[1]))): return False
    return True
for x in files:
    if s67(x) and not x['add']['id'].startswith('by-'): x['add']['id'] = 'by-' + (x['add']['id'] if x['add']['id'].startswith('st-') else 'st-' + x['add']['id'])
NEW = {}
for x in files:
    a = x['add']; n = a['n']
    for nm in ([n] if isinstance(n, str) else [s[0] for s in n]): NEW[nm] = a['id']
ids = [x['add']['id'] for x in files]
dups = {i for i in ids if ids.count(i) > 1}
# the same person drafted twice (two wiki pages for one person): same final name and a shared title
def fname(x): n = x['add']['n']; return n if isinstance(n, str) else n[-1][0]
seen = {}
for x in files:
    k = fname(x).lower(); ts = {st[1] for st in x['add']['st']}
    for y in seen.get(k, []):
        if ts & {st[1] for st in y['add']['st']}: problems.append(f"same person twice? {fname(x)}: {x['add']['id']} and {y['add']['id']}")
    seen.setdefault(k, []).append(x)
if dups: problems.append('duplicate ids across batches: ' + ', '.join(sorted(dups)))
# ids already in the app
D = MD + 'out/mainroot/'; import os
s = open(D + [q for q in os.listdir(D) if q.startswith('data.')][0], encoding='utf8').read()
have = set(re.findall(r'\{"id": "([^"]+)"', s))
clash = [i for i in ids if i in have]
if clash: problems.append('ids the app already has: ' + ', '.join(clash))
def nid(name, title):
    if name in NEW: return NEW[name]
    c = BYN.get(name) or []
    if len(c) == 1: return c[0][0]
    m = [x for x in c if base(title) in x[1]]
    if len(m) == 1: return m[0][0]
    u = 'by' if re.search(r' S[67]$', title) else 'mcu'
    m2 = [x for x in (m or c) if x[2] == u]
    if len(m2) == 1: return m2[0][0]
    problems.append(f'tie name {name} ({title}): {len(c)} matches'); return None
def season(title, ep):
    if title in SEAS and ep:
        k = 0
        for si, cnt in enumerate(SEAS[title]):
            if ep <= k + cnt: return f'{title} S{si + 1}', ep - k
            k += cnt
    return title, ep
# answers_fix: drop earlier batch adds, keep the sample's, add these
p = MD + 'answers_fix.json'; af = json.load(open(p)); mine = set(ids)
for tg in ('A', 'T'): af[tg] = [o for o in af[tg] if not (o.get('q') == 'unfiled' and o.get('add', {}).get('id') in mine)]
TMFIX = {'The Howling Commandos': 'Howling Commandos'}   # the spelling the members' own files use
def tmfix(v): return TMFIX.get(v, v) if isinstance(v, str) else [[TMFIX.get(g, g), t] for g, t in v]
for x in files:
    a = dict(x['add'])
    if 'tm' in a: a['tm'] = tmfix(a['tm'])
    if x['tg'] == 'T':   # opposers: names to ids
        a['opp'] = [[o[0] if o[0] in have or o[0] in mine or o[0].startswith('team:') else (nid(o[0], o[1]) or o[0]), o[1]] for o in a.get('opp', [])]
    af[x['tg']].append({'q': 'unfiled', 'add': a})
open(p, 'w').write(json.dumps(af, indent=1, ensure_ascii=False) + '\n')
# the files' episode tags
p = MD + 'ep_tags.json'; et = json.load(open(p))
for x in files:
    if x.get('ep'): et['st'][f"{x['tg']}:{x['add']['id']}"] = x['ep']
open(p, 'w').write(json.dumps(et, indent=0, ensure_ascii=False))
# Network ties: the sample's first, then these; season titles for the shows the Network splits by season
p = MD + 'network/rel/unfiled_out.json'; uo = json.load(open(p)); sample = [t for t in uo['keep'] if t['a'] in ('Nic West', 'Evanora Harkness')]
rel = json.load(open(MD + 'network/rel/ep_tags.json')); keep = []
for t in ties:
    st2 = []
    for i, sg in enumerate(t['stages']):
        title, ep = season(sg['title'], sg.get('ep'))
        st2.append({k: v for k, v in {**sg, 'title': title}.items() if k != 'ep'})
        if ep:
            A, B = nid(t['a'], title), nid(t['b'], title)
            if A and B: rel['|'.join(sorted([A, B])) + f'|{title}|{i}'] = ep
    keep.append({'a': t['a'], 'b': t['b'], 'stages': st2})
uo['keep'] = sample + keep; json.dump(uo, open(p, 'w'), indent=1, ensure_ascii=False)
open(MD + 'network/rel/ep_tags.json', 'w').write(json.dumps(rel, indent=0, ensure_ascii=False))
print(len(batches), 'batches |', len(files), 'files (A', sum(1 for x in files if x['tg'] == 'A'), 'T', sum(1 for x in files if x['tg'] == 'T'), ') |', len(keep), 'ties')
print('problems:', len(problems)); [print(' ', q) for q in problems[:40]]
