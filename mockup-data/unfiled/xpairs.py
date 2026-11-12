# pairs of new people from different batches who share an episode of one show, with no tie yet: candidates for the cross-batch tie pass
import json, glob, re, collections, sys
files = {}; batch = {}; ties = set()
srcs = sorted(glob.glob('chk*.json')) + [f'out{n}.json' for n in (77, 78, 79) if not glob.glob(f'chk{n}.json')]
for f in srcs:
    n = int(re.search(r'\d+', f).group())
    if n < 51: continue
    d = json.load(open(f))
    for x in d['files']: files[x['add']['id']] = x; batch[x['add']['id']] = n
    for t in d['ties']: ties.add(frozenset((t['a'], t['b'])))
def nm(x): n = x['add']['n']; return n if isinstance(n, str) else n[-1][0]
def names(x): n = x['add']['n']; return {n} if isinstance(n, str) else {s[0] for s in n}
E = collections.defaultdict(set)   # (title, ep) -> ids
for i, x in files.items():
    for k, e in (x.get('ep') or {}).items(): E[(k.rsplit('|', 1)[0], e)].add(i)
pairs = collections.defaultdict(set)
for (t, e), ids in E.items():
    for a in ids:
        for b in ids:
            if a < b and batch[a] != batch[b] and not any(frozenset((p, q)) in ties for p in names(files[a]) for q in names(files[b])):
                pairs[(a, b)].add(f'{t} #{e}')
groups = collections.defaultdict(list)
for (a, b), eps in pairs.items():
    t = sorted(eps)[0].split(' #')[0]; groups[t].append({'a': a, 'b': b, 'a_name': nm(files[a]), 'b_name': nm(files[b]), 'shared': sorted(eps)})
for t, g in groups.items(): print(t, len(g))
json.dump({'groups': groups, 'files': {i: {'batch': batch[i], 'add': files[i]['add'], 'ep': files[i].get('ep')} for p in pairs for i in p}}, open('xpairs.json', 'w'), indent=1, ensure_ascii=False)
