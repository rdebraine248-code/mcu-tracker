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
    a = x['add']; n = a['n']; ts = {base(st[1]) for st in a['st']}
    for nm in ([n] if isinstance(n, str) else [s[0] for s in n]): NEW.setdefault(nm, []).append((a['id'], ts))
# the owner's one-episode cut (cut.json): out of the app with their ties; kept in NEW so a tie to them is recognized and left out
import os
CUT = set(json.load(open('cut.json'))['cut']) if os.path.exists('cut.json') else set()
CUT |= {'by-' + (i if i.startswith('st-') else 'st-' + i) for i in CUT}   # the same people after the seasons 6 and 7 rename
files = [x for x in files if x['add']['id'] not in CUT]
ids = [x['add']['id'] for x in files]
dups = {i for i in ids if ids.count(i) > 1}
# the same person drafted twice (two wiki pages for one person): same final name and a shared title
def fname(x): n = x['add']['n']; return n if isinstance(n, str) else n[-1][0]
# episodes each file is in, by step title: What If...? is one title for every episode, and each episode is its own story (the owner's rule)
EPS = {}
_et0 = json.load(open(MD + 'ep_tags.json'))['st']
for k, v in _et0.items(): EPS.setdefault(k.split(':', 1)[1], set()).update((t.rsplit('|', 1)[0], e) for t, e in v.items())
for x in files: EPS[x['add']['id']] = {(t.rsplit('|', 1)[0], e) for t, e in (x.get('ep') or {}).items()}
def apart(x, y, shared):   # two files with the same name in a title are two people when, in every title they share, their episodes never meet
    ex, ey = EPS.get(x['add']['id'], set()), EPS.get(y['add']['id'], set())
    for t in shared:
        a, b = {e for tt, e in ex if tt == t}, {e for tt, e in ey if tt == t}
        if not a or not b or a & b: return False
    return True
seen = {}
for x in files:
    k = fname(x).lower(); ts = {st[1] for st in x['add']['st']}
    for y in seen.get(k, []):
        sh = ts & {st[1] for st in y['add']['st']}
        if sh and not apart(x, y, sh): problems.append(f"same person twice? {fname(x)}: {x['add']['id']} and {y['add']['id']}")
    seen.setdefault(k, []).append(x)
if dups: problems.append('duplicate ids across batches: ' + ', '.join(sorted(dups)))
# ids already in the app
D = MD + 'out/mainroot/'; import os
s = open(D + [q for q in os.listdir(D) if q.startswith('data.')][0], encoding='utf8').read()
have = set(re.findall(r'\{"id": "([^"]+)"', s))
_af0 = json.load(open(MD + 'answers_fix.json')); have -= {o['add']['id'] for tg in ('A', 'T') for o in _af0[tg] if o.get('q') == 'unfiled'}   # our own adds, in the build from an earlier run
clash = [i for i in ids if i in have]
if clash: problems.append('ids the app already has: ' + ', '.join(clash))
def uof(i): m = re.match(r'(sv|fox|pr|by)-', i); return m.group(1) if m else 'mcu'
# the owner's retarget answers: a file whose steps in a title moved to another file is not that title's person (Logan in Logan)
RT = [(r['from'], set(r.get('titles', []))) for r in json.load(open(MD + 'network/rel/retarget.json'))['rules'] if r.get('titles')]
# one name, two files in one title, settled by hand: the film's own Wade, not the Weapon XI variant he shoots in the end credits
PIN = {('Wade Wilson', 'Deadpool 2'): 'fox-deadpool',
       ('Green Goblin', 'The Spectacular Spider-Man'): 'sv-green-goblin-ssm'}   # that show's Goblin file goes by Norman Osborn
WHATIF = {'What If...?'}; NOFILE = []
# the title's own lead when the app also has variants of him by the same name (Spider Wars' Spider-Men, Earth-42's Prowler)
MAIN = {('Peter Parker', 'Spider-Man (1994)'): 'sv-peter-parker-1994', ('Miles Morales', 'Spider-Man: Across the Spider-Verse'): 'sv-miles-morales'}
def nid(name, title, prefer=None, at=None):
    # everyone who goes by this name, new files and the app's own, settled by the title the tie is in, then by universe, then the plain-name file
    if (name, base(title)) in PIN: return PIN[(name, base(title))]
    c = [(i, ts, uof(i)) for i, ts in NEW.get(name, [])] + [x for x in BYN.get(name, []) if x[0] not in {y[0] for y in NEW.get(name, [])}]
    c = [x for x in c if not any(x[0] == f and base(title) in ts for f, ts in RT)]
    if len(c) == 1: return c[0][0]
    m = [x for x in c if base(title) in x[1]]
    if len(m) == 1: return m[0][0]
    if at and at[1]:   # the tie's own title and episode: the one version who is in that episode
        me = [x for x in (m or c) if (at[0], at[1]) in EPS.get(x[0], set())]
        if len(me) == 1: return me[0][0]
        if not me and at[0] in WHATIF and len(m) > 1:   # every version the app has in What If...? is from another episode: no file for this one
            NOFILE.append(f'{name} in {at[0]} #{at[1]}'); return None
    u = prefer or ('by' if re.search(r' S[67]$', title) else 'mcu')
    m2 = [x for x in (m or c) if x[2] == u]
    if len(m2) == 1: return m2[0][0]
    if (name, base(title)) in MAIN: return MAIN[(name, base(title))]   # after the episode test, so a variant in its own episode still wins
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    m3 = [x[0] for x in (m or c) if x[0] == slug]
    if len(m3) == 1: return m3[0]
    problems.append(f'tie name {name} ({title}): {len(c)} matches'); return None
def season(title, ep):
    if title in SEAS and ep and f'{title} S1' in H['titles']:   # only shows the Network splits by season
        k = 0
        for si, cnt in enumerate(SEAS[title]):
            if ep <= k + cnt: return f'{title} S{si + 1}', ep - k
            k += cnt
    return title, ep
# answers_fix: drop earlier batch adds, keep the sample's, add these
p = MD + 'answers_fix.json'; af = json.load(open(p)); mine = set(ids)
SAMPLE = {'nic-west', 'evanora-harkness'}   # the owner's two-file sample, added by hand before the batches
stale = {o['add']['id'] for tg in ('A', 'T') for o in af[tg] if o.get('q') == 'unfiled' and o['add']['id'] not in SAMPLE} - mine   # ids an earlier run added, since renamed
for tg in ('A', 'T'): af[tg] = [o for o in af[tg] if not (o.get('q') == 'unfiled' and o.get('add', {}).get('id') not in SAMPLE)]
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
for k in [k for k in et['st'] if k.split(':', 1)[1] in stale]: del et['st'][k]
for x in files:
    if x.get('ep'): et['st'][f"{x['tg']}:{x['add']['id']}"] = x['ep']
open(p, 'w').write(json.dumps(et, indent=0, ensure_ascii=False))
# Network ties: the sample's first, then these; season titles for the shows the Network splits by season
p = MD + 'network/rel/unfiled_out.json'; uo = json.load(open(p)); sample = [t for t in uo['keep'] if t['a'] in ('Nic West', 'Evanora Harkness')]
rel = json.load(open(MD + 'network/rel/ep_tags.json')); keep = []; uni = []; skipped = []
for t in ties:
    st2 = []
    for i, sg in enumerate(t['stages']):
        title, ep = season(sg['title'], sg.get('ep'))
        st2.append({k: v for k, v in {**sg, 'title': title}.items() if k != 'ep'})
        if ep:
            at = (sg['title'], sg.get('ep')); A = nid(t['a'], title, None, at); B = nid(t['b'], title, uof(A) if A else None, at)
            if A and B and A not in CUT and B not in CUT: rel['|'.join(sorted([A, B])) + f'|{title}|{i}'] = ep
    at0 = (t['stages'][0]['title'], t['stages'][0].get('ep'))
    A0 = nid(t['a'], st2[0]['title'], None, at0); B0 = nid(t['b'], st2[0]['title'], uof(A0) if A0 else None, at0)   # the other side from the new person's universe first
    # every new tie goes by id (a name two people share, John, Ruben, Aisha, would take the wrong one by name), with the other universes' ties
    if A0 in CUT or B0 in CUT: continue
    if A0 and B0: uni.append({'a': A0, 'b': B0, 'stages': st2})
    elif NOFILE and NOFILE[-1].split(' in ')[0] in (t['a'], t['b']): skipped.append(f"{t['a']} | {t['b']} ({NOFILE[-1]}: the app has no file for that version)")
    else: problems.append(f"tie not placed: {t['a']} | {t['b']}")
for k in [k for k in rel if set(k.split('|')[:2]) & stale]: del rel[k]
uo['keep'] = sample + keep; json.dump(uo, open(p, 'w'), indent=1, ensure_ascii=False)
json.dump(uni, open(MD + 'network/rel/uni/newfiles/extra_unfiled.json', 'w'), indent=1, ensure_ascii=False)
open(MD + 'network/rel/ep_tags.json', 'w').write(json.dumps(rel, indent=0, ensure_ascii=False))
for k in skipped: print('  tie left out:', k)
print(len(batches), 'batches |', len(files), 'files (A', sum(1 for x in files if x['tg'] == 'A'), 'T', sum(1 for x in files if x['tg'] == 'T'), ') |', len(keep), 'ties, Beyond', len(uni))
print('stale ids removed:', len(stale)); print('problems:', len(problems)); [print(' ', q) for q in problems[:40]]
