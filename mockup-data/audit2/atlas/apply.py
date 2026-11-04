import json,re,sys
S='/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/atlas/'; R='/home/user/mcu-tracker/'
src=open(R+'index.html',encoding='utf8').read().split('\n')
EP=json.load(open(R+'mockup-data/ep_tags.json')); AC=json.load(open(R+'mockup-data/at_case.json'))
# where each place's line is: main maps by section, other universes by their block
start=next(i for i,l in enumerate(src) if l=='const ATLAS = {'); ustart=next(i for i,l in enumerate(src) if l=='const ATLAS_UNI = {')
loc={}; sec=None
for i in range(start,len(src)):
    l=src[i]
    if i>ustart+2000: break
    m=re.match(r'^(\w+): \[$',l)
    if m and i<ustart: sec=m.group(1); continue
    m=re.match(r'^"([\w-]+)": \{"n": ',l)
    if m and i>ustart: sec='uni|'+m.group(1); continue
    if l.startswith('{"id":'):
        o=json.loads(l.rstrip(',').rstrip()); t=l[len(l.rstrip(',')):]
        k=o['id']+'|'+(sec if not sec.startswith('uni|') else sec)+('|' if not sec.startswith('uni|') else '')
        loc[k]=(i,o)
print('places found',len(loc))
A=json.load(open(S+'accepted.json'))
P={p['key']:p for f in __import__('glob').glob(S+'chunk_*.json') for p in json.load(open(f))}
# leads in the order the export gave them, to find each lead's file step
flags=json.load(open(S+'content_fast.json'))['flags']['a place with no entry for a title its files put there']
host={p['city']:k for k,p in P.items() if p.get('city')}
leadmap={}
for l in flags:
    m=re.match(r'^(.*?) \((.*)\) -> (.*)$',l); k=orig=m.group(3); idd,v,sub=k.split('|')
    if v=='city' and sub in host: k=host[sub]
    leadmap.setdefault(k,[]).append((m.group(1),orig,m.group(2)))
log=[]; adds={}; removes={}
def norm(v): return v['proposed'] if isinstance(v,dict) and 'proposed' in v else v
for a in A:
    key,i,v=a['key'],a['i'],a['value']
    if isinstance(v,dict) and 'key' in v: key,i,v=v['key'],v.get('i'),v.get('proposed')   # a settled question carries its own change
    if key not in loc: log.append(('NO PLACE',a['n'],key)); continue
    li,o=loc[key]
    if isinstance(i,str) and i.startswith('lead'):
        n=int(i.split(':')[1]); fs,orig,title=leadmap[key][n]
        if isinstance(v,dict) and v.get('wrong_place'):
            g,fid,si=fs.split(':'); ak=g+':'+fid+':'+si; e=AC.get(ak)
            if e and orig in e.get('at',[]): e['at']=[x for x in e['at'] if x!=orig]; log.append(('untag',a['n'],ak,orig))
            else: log.append(('UNTAG MISS',a['n'],ak,orig))
        elif isinstance(v,list): adds.setdefault(key,[]).append((a['n'],v))
        else: log.append(('LEAD?',a['n'],v))
        continue
    if i is None or i=='new':
        if isinstance(v,list): adds.setdefault(key,[]).append((a['n'],v)); continue
        for f in ('n','r','at'):
            if f in v: o[f]=v[f]
        log.append(('place',a['n'],key,{f:v[f] for f in v if f in ('n','r','at')})); continue
    i=int(i)
    if isinstance(v,dict) and (v.get('remove') or v.get('wrong_place')): removes.setdefault(key,set()).add(i); log.append(('remove',a['n'],key,i)); continue
    if isinstance(v,list): o['e'][i]=v; log.append(('edit',a['n'],key,i)); continue
    log.append(('??',a['n'],key,i,v))
for key,L in adds.items():
    li,o=loc[key]; seen={tuple(x[:2]) for x in o['e']}
    for n,v in L:
        if (v[0],v[1]) in seen: log.append(('dup skipped',n,key,v[0])); continue
        o['e'].append(v); seen.add((v[0],v[1])); log.append(('add',n,key,v[0]))
for key,ix in removes.items():
    li,o=loc[key]; pid=o['id']; main=not key.split('|')[1]=='uni'
    for i in sorted(ix,reverse=True):
        del o['e'][i]
        if main and pid in EP['at']:
            m=EP['at'][pid]; EP['at'][pid]={str(int(k)-1 if int(k)>i else int(k)):e for k,e in m.items() if int(k)!=i}
for key,(li,o) in loc.items():
    l=src[li]; tail=l[len(l.rstrip(',')):]; src[li]=json.dumps(o,ensure_ascii=False,separators=(',',':'))+tail
if '--write' in sys.argv:
    open(R+'index.html','w',encoding='utf8').write('\n'.join(src)); open(R+'mockup-data/ep_tags.json','w',encoding='utf8').write(json.dumps(EP,ensure_ascii=False,indent=0)+'\n'); json.dump(AC,open(R+'mockup-data/at_case.json','w'),ensure_ascii=False,separators=(',',':'))
from collections import Counter; print(Counter(x[0] for x in log)); [print(x) for x in log if x[0] not in ('add','edit','untag','remove','place')]
json.dump(log,open(S+'apply/log.json','w'),ensure_ascii=False,indent=0)
