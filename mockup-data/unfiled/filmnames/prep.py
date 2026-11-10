# batch inputs for the film re-judge: the same shape as build/inNN.json (people, titles with title_strings, network_people,
# groups_in_app, example_files), from the built app data and the Network
import json, glob, re, collections, sys
S = '/tmp/claude-0/-home-user-mcu-tracker/13e06574-b05a-50ee-830d-59d89dc2d0d9/scratchpad'
MD = '/home/user/mcu-tracker/mockup-data/'
U = {'Sacred Timeline': 'mcu', 'Spider-Verse': 'sv', 'FoX-Men': 'fox', 'Pruned': 'pr', 'Beyond': 'by'}
def uof(i): m = re.match(r'(sv|fox|pr|by)-', i); return m.group(1) if m else 'mcu'
def base(t): t = re.sub(r'#\d+$', '', t); t = re.sub(r' S\d+(?:[–-]S?\d+)?$', '', t); return re.sub(r' \((Post|Mid)-Credits Scene\)$', '', t)
s = open(glob.glob(MD + 'out/mainroot/data.*')[0], encoding='utf8').read()
dec = json.JSONDecoder(); F = []
for m in re.finditer(r'\{"id": "', s):
    try: o, _ = dec.raw_decode(s, m.start())
    except Exception: continue
    if isinstance(o, dict) and 'st' in o and isinstance(o['st'], list): F.append(o)
H = json.load(open(MD + 'network/src/prof/hub.json')); T = H['titles']
allt = json.load(open(MD + 'alltitles.json'))
J = {}
for f in sorted(glob.glob(S + '/sel3/j*.json')):
    for p in json.load(open(f))['people']: J[p['key']] = p
ins = []
for f in sorted(glob.glob(S + '/sel3/v*.json')):
    for e in json.load(open(f))['d']:
        if e['v'] == 'in': p = J[e['key']]; ins.append({**p, 'side': e['side'], 'why': e['why'], 'page': e['key'].split('|', 1)[1]})
def title_block(u, t):
    ts = sorted({x for x in allt if base(x) == t})
    np = sorted({n[0] for n in H['nodes'] if n[10] == u and any(base(T[i]) == t for i in n[7])})
    fs = [o for o in F if uof(o['id']) == u and any(len(st) > 1 and base(st[1]) == t for st in o['st'])]
    groups = set()
    for o in fs:
        tm = o.get('tm')
        if isinstance(tm, str): groups.add(tm)
        elif isinstance(tm, list): groups |= {g[0] for g in tm if isinstance(g, list) and len(g) > 1 and base(g[1]) == t}
    ex = sorted(fs, key=lambda o: -len(json.dumps(o)))[:2]
    return {'title_strings': ts, 'network_people': np, 'groups_in_app': sorted(groups), 'example_files': ex}
# batches of about eight, kept together by universe and film
ins.sort(key=lambda p: (p['uni'], p['film_titles'][0]))
n0 = int(sys.argv[1]); size = 8; out = []
for k in range(0, len(ins), size):
    grp = ins[k:k + size]; titles = {}
    for p in grp:
        u = U[p['uni']]
        for t in dict.fromkeys(base(x) for x in p['titles']):
            if any(base(x) == t for x in allt): titles[f'{u}|{t}'] = title_block(u, t)
    people = [{'page': p['page'], 'name': p['name'], 'uni': p['uni'], 'titles': p['titles'], 'state': 'missing', 'side': p['side'],
               'why': p['why'], 'page_file': p.get('page_file')} for p in grp]
    n = n0 + k // size
    json.dump({'people': people, 'titles': titles}, open(f'{S}/build/in{n}.json', 'w'), indent=1, ensure_ascii=False)
    print(n, len(people), [p['name'] for p in people])
