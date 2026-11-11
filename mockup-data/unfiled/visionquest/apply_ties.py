# VisionQuest in full: the checked connections into the Network. Edits and added stages to existing connections go in a stage-fix file
# (read after every other one); new connections, by id, in rel/uni/newfiles/extra_visionquest.json
import json, sys
V = '/tmp/claude-0/-home-user-mcu-tracker/13e06574-b05a-50ee-830d-59d89dc2d0d9/scratchpad/vq/'
R = '/home/user/mcu-tracker/mockup-data/network/rel/'
C = json.load(open(V + 'chk_ties.json'))
pairs = []
for e in C.get('edits', []):
    p = {'a': e['a'], 'b': e['b']}
    if e.get('edit'): p['edit'] = e['edit']
    if e.get('add'): p['add'] = [{k: v for k, v in x.items() if k in ('kind', 'title', 'episode', 'text', 'whoA', 'whoB')} for x in e['add']]
    if len(p) > 2: pairs.append(p)
json.dump({'note': "VisionQuest in full (owner, 11 November 2026): every connection checked through the finale; read after every other stage-fix file",
           'pairs': pairs}, open(R + 'stage_fix_zzzzzzzzzzzzzzzzz_visionquest.json', 'w'), indent=1, ensure_ascii=False)
new = [{'a': t['a'], 'b': t['b'], 'stages': [{'kind': s['kind'], 'title': 'VisionQuest' + ('#' + str(s['ep']) if s.get('ep') else ''),
        'text': s['text'], 'whoA': s['whoA'], 'whoB': s['whoB']} for s in t['stages']]} for t in C.get('new', [])]
json.dump(new, open(R + 'uni/newfiles/extra_visionquest.json', 'w'), indent=1, ensure_ascii=False)
print(len(pairs), 'connections edited,', sum(len(p.get('edit', [])) for p in pairs), 'stage edits,', sum(len(p.get('add', [])) for p in pairs), 'added;', len(new), 'new')
