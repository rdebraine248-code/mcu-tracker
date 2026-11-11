# VisionQuest in full: the checked files into answers_fix.json (q "vq": each file's steps = its steps before VisionQuest, then the
# checked VisionQuest steps) and ep_tags.json; rerunnable (drops its own earlier ops first)
import json, re, sys
MD = '/home/user/mcu-tracker/mockup-data/'
V = '/tmp/claude-0/-home-user-mcu-tracker/13e06574-b05a-50ee-830d-59d89dc2d0d9/scratchpad/vq/'
s = open(MD + 'out/root/index.html', encoding='utf8').read()
def arr(name):
    i = s.find('const ' + name + ' = ');
    if i < 0: i = s.find('const ' + name + '=')
    j = s.index('[', i); o, _ = json.JSONDecoder().raw_decode(s, j); return o
DATA = {'T': arr('THREATS'), 'A': arr('ALLIES'), 'C': arr('COLLX')}
af = json.load(open(MD + 'answers_fix.json')); et = json.load(open(MD + 'ep_tags.json'))
for g in ('A', 'T', 'C'): af.setdefault(g, []); af[g] = [o for o in af[g] if o.get('q') != 'vq']
isvq = lambda x: len(x) > 1 and str(x[1]).startswith('VisionQuest')
E = []
for f in ('chk_files_a.json', 'chk_files_b.json'): E += json.load(open(V + f))['existing']
# the Compound copy of Wanda gets the same new step as her Raft file (the checker's note)
w = [e for e in E if e['id'] == 'wanda-maximoff' and e['tg'] == 'T']
if w and not any(e['id'] == 'wanda-maximoff' and e['tg'] == 'A' for e in E): E.append({**w[0], 'tg': 'A'})
for e in E:
    g = e['tg']; o = [x for x in DATA[g] if x['id'] == e['id']]
    if len(o) != 1: print('no single file', g, e['id'], len(o)); continue
    o = o[0]; st = o['st']; first = next((i for i, x in enumerate(st) if isvq(x)), len(st))
    if any(isvq(x) for x in st[:first]) or not all(isvq(x) for x in st[first:]): print('VisionQuest steps not last', g, e['id']); continue
    new = st[:first] + [list(x) for x in e['vq_steps']]
    op = {'q': 'vq', 'id': e['id'], 'set': {'st': new, **(e.get('set') or {})}}
    if e.get('tm_vq'):
        tm = o.get('tm'); tm = [list(x) for x in tm if not str(x[1]).startswith('VisionQuest')] if isinstance(tm, list) else ([[tm, '']] if tm else [])
        op['set']['tm'] = tm + [list(x) for x in e['tm_vq']]
    af[g].append(op)
    key = g + ':' + e['id']; tags = {k: v for k, v in (et['st'].get(key) or {}).items() if not k.startswith('VisionQuest|')}
    for i, n in enumerate(e['vq_eps']): tags['VisionQuest|' + str(i)] = n
    if tags: et['st'][key] = tags
    else: et['st'].pop(key, None)
    print(g, e['id'], len(st) - first, '->', len(e['vq_steps']), 'VisionQuest steps')
N = []
for f in ('chk_files_a.json', 'chk_files_b.json'): N += json.load(open(V + f))['new']
for n in N:
    g = n['tg']; af[g].append({'q': 'vq', 'add': n['add']})
    if n.get('ep'): et['st'][g + ':' + n['add']['id']] = n['ep']
    print('new', g, n['add']['id'])
open(MD + 'answers_fix.json', 'w').write(json.dumps(af, indent=1, ensure_ascii=False) + '\n')
open(MD + 'ep_tags.json', 'w').write(json.dumps(et, indent=0, ensure_ascii=False))
