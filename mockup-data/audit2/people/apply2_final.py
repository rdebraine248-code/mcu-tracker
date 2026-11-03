import json,collections
S='/tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/aud'
R=json.load(open(S+'/people/apply2_raw.json')); L=json.load(open(S+'/live_tm.json')); tm=L['tm']; left=set(L['left'])
steps=json.load(open('/home/user/mcu-tracker/mockup-data/network/src/prof/split.json'))['steps']
HOLD={'A:michelle-jones':'workplace (donut shop): owner workplace question','A:st-flint':'record split: needs its own build'}
PREF={'A:st-enoch':'gout_02.json','A:st-matt-murdock':'gout_23.json','A:st-elena-rodriguez':'gout_01.json','A:fox-anim-storm':'gout_07.json'}
held=[];skipped=[];final={}
by=collections.defaultdict(list)
for a in R['acc']: by[a['key']].append(a)
def groups_of(v):
    if isinstance(v,dict): return v.get('groups')
    if isinstance(v,list) and all(isinstance(x,list) for x in v): return v
    return None
for k,A in by.items():
    if k in HOLD: held.append([k,HOLD[k]]); continue
    if A[0]['q']=='E1': skipped.append([k,'Earth-6799 rename rejected: the app uses the Earth number shown on screen (owner rule)']); continue
    idd=k.split(':',1)[1]
    if idd in steps: skipped.append([k,'zombie world: episode steps in split.json already carry this']); continue
    cand=[a for a in A if groups_of(a['val']) is not None]
    if not cand: skipped.append([k,'left-only item: left follows the Independent stages']); continue
    if k in PREF: c=[a for a in cand if a['from']==PREF[k]][0]
    else:
        g=[a for a in cand if a['from']!='sample'] or cand
        c=max(g,key=lambda a:len(groups_of(a['val'])))   # B+M pairs: the M list carries the B fix too
    final[k]=[list(x) for x in groups_of(c['val'])]
BR=json.load(open(S+'/people/brevert.json'))
for k in BR['onlyB']:
    if k in final: del final[k]; skipped.append([k,'backstory removal reverted: HANDOFF keeps past groups (a hero file notes a villain past even outside its titles; hero and villain files list the same groups)'])
lv=lambda k: tm[k] if isinstance(tm.get(k),list) else None
if 'A:nick-fury' in final: final['A:nick-fury']=[["U.S. Army","Captain Marvel"],["CIA","Captain Marvel"]]+final['A:nick-fury']
if 'A:loki' in final and final['A:loki'][0][0]!='The Chitauri': final['A:loki']=[["The Chitauri","The Avengers"]]+final['A:loki']
if 'A:st-luke-cage' in final: final['A:st-luke-cage']=lv('A:st-luke-cage')+[["Independent","Daredevil: Born Again S2"]]
# normalise: drop "(from the start)" Independent; single (from the start) -> string; empty -> "Independent"
out={}
for k,g in final.items():
    g=[x for x in g if not (x[0]=='Independent' and x[1]=='(from the start)')]
    while g and g[0][0]=='Independent': g=g[1:]   # no departure from nothing
    if not g: out[k]='Independent'
    elif len(g)==1 and g[0][1]=='(from the start)': out[k]=g[0][0]
    else: out[k]=g
# left: per id, from final lists of touched keys + live of the other twin
ids=collections.defaultdict(list)
for k in out: ids[k.split(':',1)[1]].append(k)
add=set();dele=set()
for idd,ks in ids.items():
    want=set()
    for k in ks:
        v=out[k]
        if isinstance(v,list): want|={f"{idd}|{t}" for gg,t in v if gg=='Independent'}
    for pre in ('A:','T:'):
        k=pre+idd
        if k in out or k not in tm: continue
        v=tm[k]
        if isinstance(v,list): want|={f"{idd}|{t}" for gg,t in v if gg=='Independent'}
    have={x for x in left if x.split('|')[0]==idd}
    add|=want-have; dele|=have-want
chg={k:v for k,v in out.items() if tm.get(k,'Independent')!=v or k not in tm}
print('final',len(out),'changed vs live',len(chg),'left add',len(add),'left del',len(dele),'held',len(held),'skipped',len(skipped))
json.dump({'TEAM_AUDIT2':chg,'left_add':sorted(add),'left_del':sorted(dele),'held':held,'skipped':skipped},open(S+'/people/apply2.json','w'),indent=1,ensure_ascii=False)
for k in sorted(chg): print(k,'|',json.dumps(tm.get(k))[:120],'->',json.dumps(chg[k])[:200])
print('DEL',sorted(dele))
