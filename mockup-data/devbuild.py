# fills the mockup placeholders in the working index.html with whatever data is ready, writes dev.html for screenshots
import json,os,sys
D=os.path.dirname(os.path.abspath(__file__))+'/'
OPPD=D+'opp/' if os.path.isdir(D+'opp') else D+'../opp/'   # the opponents and organizations folder: beside the data in the repo, one level up in the old layout
s=open(os.environ.get('SRC','/home/user/mcu-tracker/index.html'),encoding='utf8').read()
def load(n,default):
    p=D+n; return json.load(open(p,encoding='utf8')) if os.path.exists(p) else default
threats=[]
for f in ['threats_mcu.json','threats_street.json','threats_spider.json','threats_extras.json']: threats+=load(f,[])
_fc=[load(f.replace('_out.json','_out2.json'),None) or load(f,None) for f in ['fc_mcu_a_out.json','fc_mcu_b_out.json','fc_street_out.json','fc_spider_out.json','fc_extras_out.json']]   # the second pass wins where it exists
if all(x is not None for x in _fc): threats=[o for L in _fc for o in L]   # the fact-checked files, once all are in
# the third pass: steps and files for the newest titles (Brand New Day and the rest of 2025 and 2026)
import glob as _g
_P=[load('pass3_patch.json',None)]+[json.load(open(f,encoding='utf8')) for f in sorted(f for f in _g.glob(D+'cameo_*.json') if not f.endswith('.bak.json'))]   # then the cameo sweep, saga by saga
for _p3 in [x for x in _P if x and all(y is not None for y in _fc)]:
    _by={o['id']:o for o in threats}
    for f in _p3.get('fix_steps',[]):
        o=_by.get(f['id'])
        if not o: print('fix: no',f['id']); continue
        for k,x in enumerate(o['st']):
            if x==f['old'] or (x[1]==f['title'] and x[:1]==f['old'][:1]): o['st'][k]=f['new']; break
        else: print('fix: no step',f['id'],f['title'])
    for a_ in _p3.get('add_steps',[]):
        o=_by.get(a_['id'])
        if not o: print('add: no',a_['id']); continue
        at=a_.get('after_title')
        idx=max([k for k,x in enumerate(o['st']) if x[1]==at],default=-1)+1 if at else 0
        o['st'].insert(idx,a_['step'])
    for z in _p3.get('set',[]):   # replace whole fields (a name, description, class or opponent that needs staging)
        o=_by.get(z['id'])
        if o: o.update({k:v for k,v in z.items() if k!='id'})
    for k in _p3.get('drop',[]):   # an entry a later check couldn't stand behind
        if k in _by: threats.remove(_by.pop(k))
    for d_ in _p3.get('drop_steps',[]):
        o=_by.get(d_['id'])
        if o: o['st']=[x for x in o['st'] if x!=d_['step']]
    for e in _p3.get('new_entries',[]):
        if e['entry']['id'] in _by: print('new: dup',e['entry']['id']); continue
        threats.append(e['entry']); _by[e['entry']['id']]=e['entry']
if not threats: threats=load('sample_threats.json',[])
# Hawkeye's three were written twice; the street-level files carry them on into Echo
_drop=('st-maya-lopez','st-kazi','st-eleanor-bishop','st-tracksuit-mafia') if any(o['id']=='tracksuit-mafia' for o in threats) and _fc[1] is not None else ('maya-lopez','kazi','eleanor-bishop')
threats=[o for o in threats if o['id'] not in _drop]   # the Hawkeye four were written twice; the fact-checked MCU copies stay
# class and opposed-by move with the story: stage lists from the staging pass replace the single peak values
_byid={o['id']:o for o in threats}
for f in sorted(f for f in _g.glob(D+'stages_*.json') if not f.endswith('.bak.json')):
    for k,v in json.load(open(f,encoding='utf8')).items():
        o=_byid.get(k)
        if not o: print('stages: no',k); continue
        for fld in ('cl','op'):
            if fld in v and v[fld]: o[fld]=v[fld] if len(v[fld])>1 else v[fld][0][0]
# shows filed under Beyond the MCU or the Pruned Timelines sit on those tabs of the registry
_l=[x for x in s.split('\n') if x.startswith('const DATA')][0]; _D=json.loads(_l[_l.index('=')+1:].strip().rstrip(';'))
_ch={}
for c in _D['chapters']:
    for i in c['items']: _ch.setdefault(i['t'],c['id'])
# the ABC shows' files keep their Beyond ids through the build (the move to the MCU tab comes last, with a map for saved progress)
for t in ('Agents of S.H.I.E.L.D.','Agents of S.H.I.E.L.D.: Slingshot','Agent Carter'): _ch[t]='ch-beyond-the-mcu'
for o in threats:
    if o['id'].startswith('st-'):
        c=_ch.get(o['st'][0][1])
        if c=='ch-beyond-the-mcu': o['id']='by-'+o['id']
        elif c=='ch-pruned-timelines': o['id']='pr-'+o['id']
for o in threats:   # a villain who comes over to the heroes' side is an Ally (Wanda is an Avenger by the end of Age of Ultron, not a reformed convict)
    for x in o['st']:
        if len(x)>2 and x[2] in ('Reformed','Ally'): x[2]='Allied'
ref=load('data_ref.json',{})
eps=ref.get('episodes') or {"Daredevil S1":13,"Jessica Jones S1":13,"Loki S1":6,"WandaVision":9,"Agents of S.H.I.E.L.D.":[22,22,22,22,22,13,13]}
ph=ref.get('phases') or {}
phases=(ph.get('titles') if isinstance(ph,dict) and 'titles' in ph else ph) or {"Iron Man":1,"The Incredible Hulk":1,"Iron Man 2":1,"Thor":1,"Captain America: The First Avenger":1,"The Avengers":1,"Iron Man 3":2,"Thor: The Dark World":2,"Captain America: The Winter Soldier":2,"Guardians of the Galaxy":2,"Avengers: Age of Ultron":2,"Ant-Man":2,"Captain America: Civil War":3}
brief=ref.get('briefing') or {"Avengers: Infinity War":{"min":149,"mid":0,"post":1},"Thor: Ragnarok":{"min":130,"mid":1,"post":1}}
def put(tag,val):
    global s
    k='/*'+tag+'*/'; assert s.count(k)==1,tag; i=s.index(k)+len(k)
    j=i+2  # replaces the empty literal [] or {}
    s=s[:s.index(k)]+json.dumps(val,ensure_ascii=False)+s[j:]
cx=load('comms_draft.json',{})
if '/*NEWSX*/' in s: put('NEWSX',cx.get('news',{})); put('COMMSX',cx.get('comms',[])); put('SRCX',cx.get('outlets',{}))
# the Compound's personnel files: heroes, allies and support, same rules as the villains (street-level ids land on the tab of their first title)
import glob as _g2
allies=[]
for f in sorted(f for f in _g2.glob(D+'allies_*.json') if not f.endswith('.bak.json')):
    if f.endswith('allies_groups.json') or '_zz_' in f: continue
    try: allies+=json.load(open(f,encoding='utf8'))
    except Exception as e: print('allies: skip',f,e)
_seen_a=set(); allies=[o for o in allies if not (o['id'] in _seen_a or _seen_a.add(o['id']))]
for f in sorted(f for f in _g2.glob(D+'allies_zz_*.json') if not f.endswith('.bak.json')):   # completions: full records replaced, new files added, duplicates dropped
    z=json.load(open(f,encoding='utf8')); R={o['id']:o for o in z.get('replace',[])}; X=set(z.get('drop',[]))
    allies=[R.get(o['id'],o) for o in allies if o['id'] not in X]+[o for o in z.get('add',[]) if o['id'] not in {a['id'] for a in allies}]
    for d_ in z.get('drop_steps',[]):
        o=next((x for x in allies if x['id']==d_['id']),None)
        if o: o['st']=[x for x in o['st'] if not (x[1]==d_['title'] and d_.get('has','') in x[0])]
    for f_ in z.get('fix_steps',[]):
        o=next((x for x in allies if x['id']==f_['id']),None)
        if o: o['st']=[f_['new'] if x[1]==f_['title'] else x for x in o['st']]
    allies=[o for o in allies if o['st']]
    for o in allies:   # staged names and teams only ever start at a step that's still there
        T=[x[1] for x in o['st']]
        for fld in ('n','k','tm'):
            if isinstance(o.get(fld),list):
                L=[x for x in o[fld] if x[1] in T]
                if not L: L=[[o[fld][0][0],T[0]]]
                L[0]=[L[0][0],T[0]] if L[0][1]!=T[0] and o[fld][0][1] not in T else L[0]
                o[fld]=L if len(L)>1 else L[0][0]
for o in allies:
    if o['id'].startswith('st-') and o.get('st'):
        c=_ch.get(o['st'][0][1])
        if c=='ch-beyond-the-mcu': o['id']='by-'+o['id']
        elif c=='ch-pruned-timelines': o['id']='pr-'+o['id']
_TM={'The CIA':'CIA','Strategic Scientific Reserve':'SSR','Nelson and Murdock':'Nelson & Murdock'}   # one spelling per team
for o in allies:
    if isinstance(o.get('tm'),list): o['tm']=[[_TM.get(t,t),x] for t,x in o['tm']]
    elif o.get('tm'): o['tm']=_TM.get(o['tm'],o['tm'])
eps={k:([x for x in v if x] if isinstance(v,list) else v) for k,v in eps.items()}
epn={}; epn.update(load('episodes_a.json',{})); epn.update(load('episodes_b.json',{}))
_c=load('episodes_c.json',{}); eps.update(_c.get('counts',{})); epn.update(_c.get('names',{}))
_v=load('episodes_verified.json',{}); eps.update(_v.get('counts',{})); epn.update(_v.get('names',{}))
_m=load('episodes_more.json',{}); eps.update(_m.get('counts',{})); epn.update(_m.get('names',{}))   # the series that had no episode data at all   # checked against Wikipedia's episode tables
# the lists carry most shows a season at a time ("Agent Carter S2", "Agents of S.H.I.E.L.D. S6–S7"): each gets its own slice of the show's episodes,
# and EPO says which season it starts at, so its season chips and numbers read 6 and 7, not 1 and 2
import re
epo={}
_all=set(json.load(open(D+'alltitles.json',encoding='utf8')))
for k,v in list(eps.items()):
    if not isinstance(v,list) or not v: continue
    nm=epn.get(k); nested=bool(nm) and isinstance(nm[0],list)
    for t in sorted(_all):
        m=re.fullmatch(re.escape(k)+r' S(\d+)(?:[–-]S(\d+))?',t)
        if not m or t in eps: continue
        a=int(m.group(1)); b=int(m.group(2) or a)
        if b>len(v): continue
        eps[t]=v[a-1:b]
        if a>1: epo[t]=a-1
        if nested: epn[t]=nm[a-1:b]
# a title that is one later season of a show shows its real season number, like S6-S7 does: Daredevil S2 reads Season 2, and the
# Avengers Assemble seasons released under their own names read Season 3, 4 and 5
for k,v in eps.items():
    m=re.search(r' S(\d+)$',k)
    if m and k not in epo and v and not (isinstance(v,list) and len(v)>1): epo[k]=int(m.group(1))-1
epo.update({"Avengers: Ultron Revolution":2,"Avengers: Secret Wars (2017)":3,"Avengers: Black Panther's Quest":4})
put('EPS',{k:v for k,v in eps.items() if v}); put('EPO',epo)
# one step per title: a title gets more than one step only when where they stand changes inside it, or when it runs several seasons
# (one step a season); otherwise what happens in it is told in one step
_multi={k for k,v in eps.items() if isinstance(v,list) and len([x for x in v if x])>1}
def _one(o):
    out=[]
    for x in o['st']:
        p_=out[-1] if out else None
        if p_ and p_[1]==x[1] and p_[2:]==list(x[2:]) and x[1] not in _multi: out[-1]=[p_[0]+' '+x[0]]+p_[1:]
        else: out.append(list(x))
    o['st']=out
# organizations: every group that acts as one gets a file, villainous ones in the Raft and heroic ones in the Compound (../opp/org_*.json, keyed by
# the final ids). A fix adds steps to a file that already exists, in story order: before the first step of a title that comes later
_tl=[x['t'] for x in _D.get('timeline',[])]
def _ord(t):
    if t in _tl: return _tl.index(t)
    m=[i for i,x in enumerate(_tl) if x.startswith(t+' S')]   # an umbrella title sits where its first season does
    return m[0] if m else None
def _restage(o):
    T=[x[1] for x in o['st']]
    for fld in ('n','k','cl','tm'):
        v=o.get(fld)
        if isinstance(v,list) and v and isinstance(v[0],list) and v[0][1]!=T[0] and v[0][1] in T and T.index(v[0][1])>0: v[0]=[v[0][0],T[0]]
_byT={o['id']:o for o in threats}; _byA={o['id']:o for o in allies}
for f in sorted(f for f in _g2.glob(OPPD+'org_*.json') if not f.endswith('.bak.json')):
    if '/org_threats_' in f or '/org_allies_' in f: continue   # the inputs the organizations were written from
    z=json.load(open(f,encoding='utf8'))
    for o in z.get('raft',[]):
        if o['id'] in _byT: print('org: dup raft',o['id']); continue
        threats.append(o); _byT[o['id']]=o
    for o in z.get('compound',[]):
        if o['id'] in _byA: print('org: dup cp',o['id']); continue
        allies.append(o); _byA[o['id']]=o
    for fx in z.get('fixes',[]):
        o=_byT.get(fx['id']) or _byA.get(fx['id'])
        if not o: print('org: no file for fix',fx['id']); continue
        for st in fx['add_steps']:
            k=_ord(st[1]); at=len(o['st'])
            if k is not None:
                for i,x in enumerate(o['st']):
                    kx=_ord(x[1])
                    if kx is not None and kx>k: at=i; break
            o['st'].insert(at,st)
        _restage(o)
# the Collector's archive (mockup): every object, from the coll_*.json files (coll_existing.json is the old 27, kept for reference)
collx=[]
for f in sorted(f for f in _g2.glob(D+'coll_*.json') if not f.endswith('.bak.json')):
    if f.endswith('coll_existing.json'): continue
    if os.environ.get('NOSPEC') and 'coll_spec_' in f: continue   # the specimens stay a mockup until approved
    try: collx+=json.load(open(f,encoding='utf8'))
    except Exception as e: print('coll: skip',f,e)
if os.environ.get('COLLX_FILE'): collx=json.load(open(os.environ['COLLX_FILE'],encoding='utf8'))   # a stand-in while the files are being written
_seen_c=set(); collx=[o for o in collx if o.get('st') and not (o['id'] in _seen_c or _seen_c.add(o['id']))]
for o in threats+allies+collx: _one(o)
# who has stood against each villain: lists of the Compound's own files and teams (../opp/opp_*.json, keyed by the final ids). Until a villain
# has one, its old single "op" stands, cleaned of names that split one person in two
_ally_ids={o['id'] for o in allies}
for f in sorted(f for f in _g2.glob(OPPD+'opp_*.json') if not f.endswith('.bak.json')):
    for k,v in json.load(open(f,encoding='utf8')).items():
        o=next((x for x in threats if x['id']==k),None)
        if o is None: print('opp: no threat',k); continue
        L=[r for r in v if r[0].startswith('team:') or r[0] in _ally_ids]
        if len(L)<len(v): print('opp: dropped',k,[r[0] for r in v if r not in L])
        o['opp']=L
_OPN={'Young Wilson Fisk':'Wilson Fisk'}
for o in threats:
    if isinstance(o.get('op'),str): o['op']=_OPN.get(o['op'],o['op'])
# the lore audit (October 2026): fixes keyed to the files as they stand here, just before the ABC move, so a season prefix it adds also decides
# which tab a file lands on. Each op names its finding: "old" is a run of steps that must match exactly and "new" takes its place (an anchor
# step kept in "new" makes an insert, an empty "new" a delete); "set" replaces fields, "add" is a new file, "drop" removes one
_au=load('audit_fix.json',{})
for L,tag in ((threats,'T'),(allies,'A'),(collx,'C')):
    _bya={o['id']:o for o in L}
    for z in _au.get(tag,[]):
        if 'add' in z:
            if z['add']['id'] in _bya: print('audit: dup',z['f'],z['add']['id']); continue
            L.append(z['add']); _bya[z['add']['id']]=z['add']; continue
        ids=z['id'] if isinstance(z['id'],list) else [z['id']]
        o=next((_bya[i] for i in ids if i in _bya),None)
        if o is None: print('audit: no file',z['f'],z['id']); continue
        if z.get('drop'): L.remove(o); _bya.pop(o['id']); continue
        for k,v in z.get('set',{}).items():   # null drops the field
            if v is None: o.pop(k,None)
            else: o[k]=v
        if 'old' in z:
            n=len(z['old']); hit=None
            for o2 in [_bya[i] for i in ids if i in _bya]:   # a merged group file looks in each of its sources
                i=next((i for i in range(len(o2['st'])-n+1) if [list(x) for x in o2['st'][i:i+n]]==z['old']),None)
                if i is not None: hit=(o2,i); break
            if hit is None: print('audit: no step',z['f'],z['id'],z['old'][0][0][:60]); continue
            hit[0]['st'][hit[1]:hit[1]+n]=z['new']
# Agents of S.H.I.E.L.D. (seasons 1 to 5 and Slingshot) and Agent Carter are main-line titles now, in every watch order, so their files leave
# the Beyond tab for the MCU's: "by-" comes off the id. A file only in seasons 6 and 7 stays in Beyond, as those seasons do on the timeline. Where
# the MCU tab already has the same file (HYDRA, S.H.I.E.L.D., the SSR, the Darkhold, the Kree), the show's steps join it, in story order.
import re as _re
_tlo={e['t']:i for i,e in enumerate(_D['timeline'])}
def _yr(e):
    m=_re.findall(r'\d{4}',e.get('era','')); return int(m[-1]) if m else None
def _sk(x):
    t=x[1]
    y=_re.match(r'In (\d{4}),',x[0]) or _re.search(r'\ba (\d{4}) flashback',x[0])   # a scene dated in the past sits by its year
    if y: return max([i for i,e in enumerate(_D['timeline']) if _yr(e) is not None and _yr(e)<=int(y.group(1))] or [-1])+.5
    if t in _tlo: return _tlo[t]
    m=_re.match(r'In season (\d+),',x[0]); L=[k for k in _tlo if k.startswith(t+' S')]
    at=min([_tlo[k] for k in L] or [10**6])
    if m:
        for k in L:
            r=_re.search(r' S(\d+)(?:–S(\d+))?$',k)
            if r and int(r.group(1))<=int(m.group(1))<=int(r.group(2) or r.group(1)): at=_tlo[k]; break
    # "In season 2, in 1945, ..." (a scene from the past, as a flashback is now worded) sits by its year; a future year stays with its season
    y=_re.match(r'In season \d+, in (\d{4}),',x[0])
    if y and at<10**6 and _yr(_D['timeline'][at]) is not None and int(y.group(1))<_yr(_D['timeline'][at]):
        return max([i for i,e in enumerate(_D['timeline']) if _yr(e) is not None and _yr(e)<=int(y.group(1))] or [-1])+.5
    return at
def _main_show(x):
    if x[1] in ('Agent Carter','Agents of S.H.I.E.L.D.: Slingshot'): return True
    if x[1]!='Agents of S.H.I.E.L.D.': return False
    m=_re.match(r'In season (\d+),',x[0]); return not (m and int(m.group(1))>=6)
def _nm(o): v=o.get('n'); return v[-1][0] if isinstance(v,list) else v
_moved={}
for L in (threats,allies,collx):
    ids={o['id'] for o in L}
    stay={_nm(o):o for o in L if not o['id'].startswith(('by-','sv-','fox-','pr-'))}
    out=[]
    for o in L:
        if not (o['id'].startswith('by-') and any(_main_show(x) for x in o.get('st',[]))): out.append(o); continue
        tw=stay.get(_nm(o))
        if tw is not None and tw.get('c')==o.get('c') and bool(tw.get('grp'))==bool(o.get('grp')):
            st=list(tw['st'])
            pi=None
            for x in o['st']:   # each of the show's steps goes in just after the last step that comes earlier in the story;
                # a step that carries on the season before it (no "In season N,") stays right behind it
                if pi is not None and not _re.match(r'In (season )?\d+,',x[0]) and x[1]==st[pi][1]: i=pi+1
                else: k=_sk(x); i=max([j+1 for j,y in enumerate(st) if _sk(y)<=k] or [0])
                st.insert(i,x); pi=i
            # S.H.I.E.L.D.'s first season starts before The Winter Soldier brings the agency down
            if tw['id']=='shield-org':
                a_=next((j for j,y in enumerate(st) if y[0].startswith('In season 1, Coulson')),None); b_=next((j for j,y in enumerate(st) if y[1]=='Captain America: The Winter Soldier'),None)
                if a_ is not None and b_ is not None and a_>b_: st.insert(b_,st.pop(a_))
            tw['st']=st
            if isinstance(tw.get('opp'),list) and isinstance(o.get('opp'),list):
                seen={r[0] for r in tw['opp']}; tw['opp']=sorted(tw['opp']+[r for r in o['opp'] if r[0] not in seen],key=lambda r:_sk(['',r[1]]))
            _moved[o['id']]=tw['id']; continue
        nid=o['id'][3:]
        if nid in ids: print('move: id taken',o['id'],nid); out.append(o); continue
        _moved[o['id']]=nid; o['id']=nid; out.append(o)
    L[:]=out
def _remap(v):
    if isinstance(v,str): return _moved.get(v,v)
    if isinstance(v,list): return [_remap(x) for x in v]
    if isinstance(v,dict): return {k:(x if k in ('n','k','st') else _remap(x)) for k,x in v.items()}
    return v
for L in (threats,allies,collx): L[:]=[_remap(o) for o in L]
print('moved to the MCU tab',len(_moved),'merged',sorted((a,b) for a,b in _moved.items() if b!=a[3:]))
# the audit's own moves carry saved marks back where a file returns (never to an id that moves on again, or marks would flip every load)
_im={**_moved,**{k:v for k,v in _au.get('idmove',{}).items() if v not in _moved}}
for k in list(_im):   # a file that moved and was later merged into another sends its marks straight to the last one
    v=_im[k]; n=0
    while v in _im and n<5: v=_im[v]; n+=1
    if v==k: _im.pop(k)
    else: _im[k]=v
# the appearance sweep (October 2026): every title a file's subject is on screen in, keyed to the final ids. Per file: "ins" puts steps right
# after an anchor step (null puts them first), "fix" swaps one step for others, "set" replaces fields (null drops one); anchors and old steps
# are matched exactly against the file as it stands here
_ap=load('appear_fix.json',{})
for L,tag in ((threats,'T'),(allies,'A'),(collx,'C')):
    _bya={o['id']:o for o in L}
    for i,z in _ap.get(tag,{}).items():
        o=_bya.get(i)
        if o is None: print('appear: no file',tag,i); continue
        st=[list(x) for x in o['st']]
        fx={}
        for old,new in z.get('fix',[]):
            j=next((j for j,x in enumerate(st) if x==old),None)
            if j is None: print('appear: no step',i,old[0][:60]); continue
            fx[j]=new
        ins={}
        for anc,new in z.get('ins',[]):
            j=-1 if anc is None else next((j for j,x in enumerate(st) if x[:2]==anc),None)
            if j is None: print('appear: no anchor',i,anc[0][:60]); continue
            ins.setdefault(j,[]).extend(new)
        out=list(ins.get(-1,[]))
        for j,x in enumerate(st): out+=fx.get(j,[x])+ins.get(j,[])
        for anc,before in z.get('move',[]):   # a step that the splits left out of story order goes right before another
            j=next((j for j,x in enumerate(out) if x[:2]==anc),None); k=next((k for k,x in enumerate(out) if x[:2]==before),None)
            if j is None or k is None: print('appear: no move anchor',i,(anc if j is None else before)[0][:60]); continue
            x=out.pop(j); out.insert(k-(j<k),x)
        for p in z.get('post',[]):   # the flagged-step pass, keyed to the steps as the sweep leaves them: swap one step, or put steps after one
            if 'old' in p:
                j=next((j for j,x in enumerate(out) if x==p['old']),None)
                if j is None: print('appear: no post step',i,p['old'][0][:60]); continue
                if 'before' in p:   # a step moved, unchanged, right before another
                    x=out.pop(j); k=next((k for k,y in enumerate(out) if y==p['before']),None)
                    if k is None: out.insert(j,x); print('appear: no post anchor',i,p['before'][0][:60]); continue
                    out.insert(k,x)
                else: out[j:j+1]=p['new']
            else:
                j=-1 if p['after'] is None else next((j for j,x in enumerate(out) if x[:2]==p['after']),None)
                if j is None: print('appear: no post anchor',i,p['after'][0][:60]); continue
                out[j+1:j+1]=p['new']
        o['st']=out
        for k,v in z.get('set',{}).items():
            if v is None: o.pop(k,None)
            else: o[k]=v
# one person filed on two tabs becomes one file, on the tab where they're a main character (owner, October 2026): the steps of both in the
# given story order, the other file's opposers joined in, its id sent on to the kept one for saved marks and every reference
for z in _ap.get('merge',[]):
    L={'T':threats,'A':allies,'C':collx}[z['tag']]
    a=next((o for o in L if o['id']==z['from']),None); b=next((o for o in L if o['id']==z['into']),None)
    if a is None or b is None: print('appear: no merge file',z['from'],z['into']); continue
    pool=[list(x) for x in b['st']+a['st']]; st=[]
    for anc in z['order']:
        j=next((j for j,x in enumerate(pool) if x[:2]==anc),None)
        if j is None: print('appear: merge step missing',z['into'],anc[0][:60]); continue
        st.append(pool.pop(j))
    if pool: print('appear: merge left steps out',z['into'],[x[0][:40] for x in pool])
    b['st']=st+pool
    for k,v in z.get('set',{}).items(): b[k]=v
    L.remove(a); _im[z['from']]=z['into']
    for L2 in (threats,allies,collx):
        for o in L2:
            if isinstance(o.get('opp'),list):
                seen=set(); o['opp']=[r for r in ([z['into'] if r[0]==z['from'] else r[0]]+list(r[1:]) for r in o['opp']) if not (r[0] in seen or seen.add(r[0]))]
            if o.get('rf')==z['from']: o['rf']=z['into']
# villains carry the factions they serve, staged by title like a hero's team (raft_teams.json, keyed to the final ids; the memberships and
# their sources are in raft_teams_src.json)
_rt=load('raft_teams.json',None)
if _rt:
    _byt={o['id']:o for o in threats}
    for k,v in _rt.items():
        if k in _byt: _byt[k]['tm']=v
        else: print('raft factions: no file',k)
# names and aliases (owner's rule, October 2026): a person's file is titled by their real name, the same on their hero and villain file, and
# carries every other name said on screen, each staged to the title that first says it (names_fix.json, keyed to the final ids; the sweep
# and its re-check are in names_sweep.json)
_nf=load('names_fix.json',{})
for L,tag in ((threats,'T'),(allies,'A')):
    _byn={o['id']:o for o in L}
    for i,z in _nf.get(tag,{}).items():
        o=_byn.get(i)
        if o is None: print('names: no file',tag,i); continue
        for k,v in z.items():
            if v is None: o.pop(k,None)
            else: o[k]=v
# and a Collection object's holder goes by the same name as the person's file (names_fix.json "hold": object id, then old name to new)
_byc={o['id']:o for o in collx}
for i,mp in _nf.get('hold',{}).items():
    o=_byc.get(i)
    if o is None: print('names: no object',i); continue
    hit=0
    for x in o['st']:
        if len(x)>3 and x[3] in mp: x[3]=mp[x[3]]; hit=1
    if not hit: print('names: no holder to rename',i)
# the writing pass (owner, October 2026): steps first written to a strict one-sentence rule, rewritten to read naturally with the same facts,
# for the Collection, the Raft and the Compound (prose_*.json: file id, then [old text, new text], matched on the text as built; a new text of
# null drops a step that only repeated another)
for _pf,_L in (('prose_coll.json',collx),('prose_raft.json',threats),('prose_cp.json',allies)):
    _by={o['id']:o for o in _L}
    for i,pairs in load(_pf,{}).items():
        o=_by.get(i)
        if o is None: print('prose: no file',_pf,i); continue
        for old,new in pairs:
            hit=[x for x in o['st'] if x[0]==old]
            if not hit: print('prose: no step',_pf,i,old[:60]); continue
            if new is None: o['st']=[x for x in o['st'] if x[0]!=old]
            else:
                for x in hit: x[0]=new
if '/*IDMOVE*/' in s: put('IDMOVE',_im)
if '/*COLLX*/' in s: put('COLLX',collx)
if '/*ALLIES*/' in s: put('ALLIES',allies)
put('THREATS',threats)
put('EPN',epn)
out=sys.argv[1] if len(sys.argv)>1 else D+'dev.html'
open(out,'w',encoding='utf8').write(s); print('threats',len(threats),'eps',len(eps),'phases',len(phases),'brief',len(brief))
