import json,glob,collections,re
A='/tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/aud/'
L=json.load(open(A+'live_files.json')); files=L['files']; AC=L['ac']; DCN=L['dc']
PN=json.load(open(A+'place_names.json')); PN["Ivanov's oil platform"]=['siberia|earth|']; PN['The Citadel at the End of Time']=['citadel|beyond|']
items=[];V={}
for f in sorted(glob.glob(A+'files/fvchunk_*.json')):
    n=f[-7:-5]; items+=json.load(open(f))
    for v in json.load(open(A+f'files/fvout_{n}.json'))['verdicts']: V[v['i']]=v
acc=[];rej=[];unres=[]
for it in items:
    v=V.get(it['i'])
    if not v or v['verdict']=='reject': rej.append([it['key'],it.get('k'),it['q'],(v or {}).get('why','no verdict')]); continue
    p=v['value'] if v['verdict']=='amend' and v.get('value') else it['proposed']
    acc.append((it,dict(p)))
def univ_hint(key):
    u=collections.Counter()
    for k in range(len(files.get(key,[]))):
        for a in (AC.get(f'{key}:{k}',{}).get('at') or []):
            s=a.split('|'); u[s[2] if s[1]=='uni' else s[1]]+=1
    return u
def place_key(name,key):
    if name in PN and len(PN[name])==1: return PN[name][0]
    if name in PN:
        h=univ_hint(key); best=max(PN[name],key=lambda k:h[k.split('|')[2] if k.split('|')[1]=='uni' else k.split('|')[1]]); return best
    cands=[(n,ks) for n,ks in PN.items() if n.startswith(name+' (')]
    if cands:
        h=univ_hint(key); allk=[k for _,ks in cands for k in ks]
        return max(allk,key=lambda k:h[k.split('|')[2] if k.split('|')[1]=='uni' else k.split('|')[1]])
    unres.append([key,name]); return None
def case_id(c):
    if c in DCN: return DCN[c]
    m=re.match(r'^([A-Z]+-\d+)',c)
    if m:
        for disp,i in DCN.items():
            if disp.startswith(m.group(1)+' '): return i
    unres.append(['case',c]); return None
by=collections.defaultdict(list)
for it,p in acc: by[it['key']].append((it,p))
out={}
for key,L2 in by.items():
    if key not in files: unres.append([key,'NO FILE']); continue
    st=[list(x) for x in files[key]]
    rows=[{'st':st[k],'ac':dict(AC.get(f'{key}:{k}',{})),'orig':k} for k in range(len(st))]
    edits=[(it,p) for it,p in L2 if it.get('k') is not None]
    ins=[(it,p) for it,p in L2 if it.get('k') is None]
    for it,p in edits:
        r=next((x for x in rows if x['orig']==it['k']),None)
        if not r: unres.append([key,'no step',it['k']]); continue
        if 'text' in p: r['st'][0]=p['text']
        if 'title' in p and p['title']: r['st'][1]=p['title']
        if 'status' in p: 
            while len(r['st'])<3: r['st'].append('')
            r['st'][2]=p['status']
        if 'at' in p: r['ac']['at']=[k for k in (place_key(n,key) for n in p['at']) if k]
        if 'cases' in p: r['ac']['cases']=[k for k in (case_id(c) for c in p['cases']) if k]
    moves=[(it,p) for it,p in edits if 'after' in p]
    for it,p in moves:
        r=next(x for x in rows if x['orig']==it['k']); rows.remove(r)
        a=p['after']; j=0 if a==-1 else next(i for i,x in enumerate(rows) if x['orig']==a)+1; rows.insert(j,r)
    for it,p in sorted(ins,key=lambda x:(x[1].get('after',-1) if x[1].get('after') is not None else -1)):
        new={'st':[p.get('text'),p.get('title'),p.get('status','')],'ac':{},'orig':None}
        if p.get('at'): new['ac']['at']=[k for k in (place_key(n,key) for n in p['at']) if k]
        if p.get('cases'): new['ac']['cases']=[k for k in (case_id(c) for c in p['cases']) if k]
        a=p.get('after',-1)
        if a is None or a==-1: j=0
        else:
            idx=[i for i,x in enumerate(rows) if x['orig']==a]
            j=(idx[0]+1) if idx else len(rows)
            while j<len(rows) and rows[j]['orig'] is None: j+=1   # after earlier inserts at the same anchor
        rows.insert(j,new)
    ac={str(i):{k:v for k,v in r['ac'].items() if v} for i,r in enumerate(rows) if any(r['ac'].values())}
    out[key]={'st':[r['st'] for r in rows],'ac':ac,'from':[r['orig'] for r in rows]}
print('accepted',len(acc),'rejected',len(rej),'files',len(out),'unresolved',len(unres))
for u in unres: print('UNRES',u)
json.dump(out,open(A+'files/step_audit.json','w'),ensure_ascii=False,indent=1)
json.dump(rej,open(A+'files/rejected.json','w'),ensure_ascii=False,indent=1)
