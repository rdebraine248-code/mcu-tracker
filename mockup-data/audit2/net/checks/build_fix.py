import json,glob,collections,sys
D='/tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/aud/net/'
items={}
for f in sorted(glob.glob(D+'vchunk_[0-9]*.json')):
    for it in json.load(open(f)): items[it['n']]=it
fix1={it['n'] for it in json.load(open(D+'vchunk_fix1.json'))}
V={}
for f in sorted(glob.glob(D+'vout_[0-9]*.json')):
    for v in json.load(open(f))['verdicts']: V[v['n']]=v
for v in json.load(open(D+'vout_fix1.json'))['verdicts']: V[v['n']]=v   # the split pass overrides
missing=[n for n in items if n not in V]
pairs=collections.OrderedDict(); rej=[]; conflicts=[]
def who(p):
    o={}
    if 'on_a_card_about_b' in p: o['whoA']=p['on_a_card_about_b']
    if 'on_b_card_about_a' in p: o['whoB']=p['on_b_card_about_a']
    return o
for n in sorted(items):
    it=items[n]; v=V.get(n)
    if not v: continue
    if v['verdict']=='reject': rej.append([n,it['pair'],it['q'],v.get('why','')]); continue
    p=dict(it['proposed'] or {})
    if v['verdict']=='amend' and v.get('value'): p=dict(v['value']) if it['q']!='N5' else dict(v['value'])
    split=p.pop('split',None)
    a,b=it['pair'].split('|')
    P=pairs.setdefault(it['pair'],{'a':a,'b':b,'edit':{},'add':[]})
    if it['q']=='N5' or it.get('i') is None:
        e={'kind':p.get('kind'),'title':p.get('title'),'text':p.get('text'),**who(p)}; P['add'].append(e)
    else:
        e=P['edit'].setdefault(it['i'],{'i':it['i']})
        for k,val in list({'kind':p.get('kind'),'title':p.get('title'),'text':p.get('text'),**who(p)}.items()):
            if val is None: continue
            if k in e and e[k]!=val: conflicts.append([it['pair'],it['i'],k,e[k],val])
            e[k]=val
    if split: P['add'].append({'kind':split.get('kind') or p.get('kind'),'title':split.get('title'),'text':split.get('text'),**who(split)})
out=[]
for k,P in pairs.items():
    o={'a':P['a'],'b':P['b']}
    if P['edit']: o['edit']=list(P['edit'].values())
    if P['add']: o['add']=P['add']
    out.append(o)
print('items',len(items),'verdicts',len(V),'missing',len(missing),'pairs',len(out),'rejected',len(rej),'conflicts',len(conflicts))
for c in conflicts[:40]: print('CONFLICT',json.dumps(c)[:300])
bad=[(o['a'],o['b'],e) for o in out for e in o.get('add',[]) if not e.get('kind') or not e.get('title') or not e.get('text')]
print('bad adds',len(bad)); [print(' ',json.dumps(x)[:250]) for x in bad[:10]]
json.dump({'_note':'Audit part 2 (November 2026): second-checked Network changes (edit by stage place, add later stages, split moved stages so later facts keep their own stage).','pairs':out},open(D+'stage_fix_zaudit.json','w'),indent=1,ensure_ascii=False)
json.dump(rej,open(D+'net_rejected.json','w'),indent=1,ensure_ascii=False)
