# one rule for silent appearances, as the app's own files do it (Psylocke and Warren "among the mutants on Genosha"):
# a step when the person is part of what happens on screen, none for a bare glimpse
import json, sys
def load(f): return json.load(open(f))
def steps(x):  # [(text, title, status, ep)] from a file entry
    ep = x.get('ep') or {}
    out = []
    for i, s in enumerate(x['add']['st']):
        out.append((s, ep.get(f'{s[1]}|{sum(1 for t in x["add"]["st"][:i] if t[1] == s[1])}')))
    return out
def put(x, lst):
    x['add']['st'] = [s for s, e in lst]; ep = {}; seen = {}
    for s, e in lst:
        k = seen.get(s[1], 0); seen[s[1]] = k + 1
        if e is not None: ep[f'{s[1]}|{k}'] = e
    x['ep'] = ep
def restore(chk, out, fid, text_start):
    c, o = load(chk), load(out)
    ox = [x for x in o['files'] if x['add']['id'] == fid][0]; cx = [x for x in c['files'] if x['add']['id'] == fid][0]
    want = [p for p in steps(ox) if p[0][0].startswith(text_start)][0]
    have = steps(cx)
    if any(p[0][0] == want[0][0] for p in have): return
    # back in the draft's order
    order = [p[0][0] for p in steps(ox)]
    new = sorted(have + [want], key=lambda p: order.index(p[0][0]) if p[0][0] in order else 99)
    put(cx, new); json.dump(c, open(chk, 'w'), indent=1, ensure_ascii=False); print('restored', fid, want[0][0][:60])
def remove(chk, fid, text_start):
    c = load(chk); cx = [x for x in c['files'] if x['add']['id'] == fid][0]
    have = steps(cx); new = [p for p in have if not p[0][0].startswith(text_start)]
    if len(new) < len(have): put(cx, new); json.dump(c, open(chk, 'w'), indent=1, ensure_ascii=False); print('removed', fid, text_start)
restore('chk62.json', 'out62.json', 'fox-anim-tusk', 'In season 5, Tusk is among')
restore('chk55.json', 'out55.json', 'fox-anim-araki', 'In season 4, Araki')
restore('chk56.json', 'out56.json', 'fox-anim-caliban', 'In season 1, he labors')
remove('chk59.json', 'fox-anim-leech', 'In season 5, Leech is glimpsed')
remove('chk59.json', 'fox-anim-sunder', 'In season 5, Sunder is glimpsed')
