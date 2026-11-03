import json,collections
S='/tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/aud'
A2=json.load(open(S+'/people/apply2.json')); T2=dict(A2['TEAM_AUDIT2'])
L=json.load(open(S+'/live_tm.json')); tm=L['tm']; left=set(L['left'])
RENAME={"Morgan le Fay's Coven":"Morgan's coven","Loki Bandits":"President Loki's army","Council of Godheads":"Council of the Gods"}
DROP={"Muspelheim","Russian Armed Forces","Latveria","The Tivan Group"}
HOLD={"Lighthorsemen","Cassandra Nova's Henchmen","Monster Hunting Cabal","The Monster Hunting Cabal","Kravinoff Criminal Empire","The Colon Crime Family","Spider-Catchers","The Workshop"}
held=collections.defaultdict(list)
def clean(k,v):
    if isinstance(v,str): v=[[v,'(from the start)']]
    out=[]
    for g,t in v:
        g=RENAME.get(g,g)
        if g in DROP: continue
        if g in HOLD: held[g].append(k); continue
        out.append([g,t])
    # drop Independent stages that no longer follow a group
    res=[]
    for x in out:
        if x[0]=='Independent' and (not res or res[-1][0]=='Independent'): continue
        res.append(x)
    while res and res[-1][0]=='Independent' and len(res)==1: res=[]
    if not res: return 'Independent'
    if len(res)==1 and res[0][1]=='(from the start)': return res[0][0]
    return res
final={}
for k,v in T2.items(): final[k]=clean(k,v)
# no-group pass (second-checked)
for n in (1,2):
    items={x['i']:x for x in json.load(open(S+f'/people/zvchunk_{n}.json'))}
    for v in json.load(open(S+f'/people/zvout_{n}.json'))['verdicts']:
        it=items[v['i']]
        if v['verdict']=='reject': continue
        val=v['value'] if v['verdict']=='amend' and v.get('value') else it['proposed']
        c=clean(it['key'],val)
        if c!='Independent': final[it['key']]=c
# workplace / band / brainwashed fixes (second-checked)
items={x['i']:x for x in json.load(open(S+'/people/rvchunk_1.json'))}
for v in json.load(open(S+'/people/rvout_1.json'))['verdicts']:
    it=items[v['i']]
    if v['verdict']=='reject': continue
    val=v['value'] if v['verdict']=='amend' and v.get('value') else it['proposed']
    final[it['key']]=clean(it['key'],val)
chg={k:v for k,v in final.items() if tm.get(k,'Independent')!=v}
# departures: per id, from final lists + untouched twin's live
ids=collections.defaultdict(list)
for k in chg: ids[k.split(':',1)[1]].append(k)
add=set();dele=set()
L2={k for k in left}
for x in A2['left_del']: L2.discard(x)
L2|=set(A2['left_add'])
for idd,ks in ids.items():
    want=set()
    for pre in ('A:','T:'):
        k=pre+idd; v=chg.get(k, tm.get(k))
        if isinstance(v,list): want|={f"{idd}|{t}" for g,t in v if g=='Independent'}
    have={x for x in L2 if x.split('|')[0]==idd}
    add|=want-have; dele|=have-want
L3=(L2-dele)|add
print('changes',len(chg),'left total',len(L3),'held names',{g:len(v) for g,v in held.items()})
json.dump({'TEAM_AUDIT2':chg,'left':sorted(L3),'held':held},open(S+'/people/apply3.json','w'),indent=1,ensure_ascii=False)
for k in ['T:president-loki','T:pr-st-morgan-le-fay','T:zeus','A:st-tuklo','T:fox-pyro','A:sv-gwen-stacy-earth65','A:fox-anim-morph','T:surtur','A:sv-peter-parker-raimi']: print(k, json.dumps(chg.get(k,'(no change)'))[:200])

# --- round 2: the random recheck's confirmed fixes (employers held for the owner), and my own reverted-backstory slips
EMP={'A:sv-ben-parker-madame-web','A:alexei-shostakov','A:shang-chi','T:st-vanessa-fisk','A:sv-michael-morbius','T:sv-morbius','T:st-schultzes','T:st-leland-owlsley','A:sv-cassie-webb','A:jon-jon','A:madeline-stanton','T:sv-lizard-ssm'}
d3=json.load(open(S+'/people/apply3.json')); T3=d3['TEAM_AUDIT2']
def cur(k): return T3.get(k, tm.get(k,'Independent'))
for n in (1,2):
    it={x['i']:x for x in json.load(open(S+f'/people/svchunk_{n}.json'))}
    for v in json.load(open(S+f'/people/svout_{n}.json'))['verdicts']:
        x=it[v['i']]
        if v['verdict']=='reject' or x['key'] in EMP: continue
        val=v['value'] if v['verdict']=='amend' and v.get('value') else x['proposed']
        if isinstance(val,dict): val=val.get('groups',val)
        if isinstance(val,list) and val and isinstance(val[0],list): T3[x['key']]=clean(x['key'],val)
        elif x['q']=='G3' and isinstance(val,(list,dict)): pass
# Joy and Zemo/Comanche G3 items change only the departures list: drop those left entries
G3DROP={'st-joy-meachum|Iron Fist S2'}
T3['A:st-matt-murdock']=[["Landman and Zack","Daredevil S1"]]+[x for x in T3['A:st-matt-murdock'] if x[0]!="Landman and Zack"]
T3['T:st-alisa-jones']=[["IGH","Jessica Jones S2"],["Independent","Jessica Jones S2"]]
T3['T:st-karl-malus']=[["IGH","Jessica Jones S2"],["Independent","Jessica Jones S2"]]
if 'T:fox-anim-rama-tut' in T3 and isinstance(T3['T:fox-anim-rama-tut'],list): T3['T:fox-anim-rama-tut']=[[g,"X-Men '97 S2" if t=="X-Men '97" else t] for g,t in T3['T:fox-anim-rama-tut']]
chg={k:v for k,v in T3.items() if tm.get(k,'Independent')!=v}
ids2=collections.defaultdict(list)
for k in chg: ids2[k.split(':',1)[1]].append(k)
L4=set(d3['left'])-G3DROP
for idd in ids2:
    want=set()
    for pre in ('A:','T:'):
        k=pre+idd; v=chg.get(k, tm.get(k))
        if isinstance(v,list): want|={f"{idd}|{t}" for g,t in v if g=='Independent'}
    have={x for x in L4 if x.split('|')[0]==idd}
    L4=(L4-(have-want))|want
print('round2 changes',len(chg),'left',len(L4))
json.dump({'TEAM_AUDIT2':chg,'left':sorted(L4),'held':d3['held']},open(S+'/people/apply4.json','w'),indent=1,ensure_ascii=False)
for k in ['A:st-matt-murdock','T:st-dottie-underwood','T:st-grant-ward','A:sam-wilson','T:st-deathlok','A:by-zombie-ikaris','T:st-comanche','T:by-zombie-zemo','T:st-johann-fennhoff','A:b-kai','T:st-the-doctor']: print(k, json.dumps(chg.get(k,'(no change)'))[:230])
