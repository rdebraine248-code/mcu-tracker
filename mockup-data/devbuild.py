# fills the mockup placeholders in the working index.html with whatever data is ready, writes dev.html for screenshots
import json,os,sys
D=os.path.dirname(os.path.abspath(__file__))+'/'
s=open(os.environ.get('SRC','/home/user/mcu-tracker/index.html'),encoding='utf8').read()
def load(n,default):
    p=D+n; return json.load(open(p,encoding='utf8')) if os.path.exists(p) else default
threats=[]
for f in ['threats_mcu.json','threats_street.json','threats_spider.json','threats_extras.json']: threats+=load(f,[])
_fc=[load(f.replace('_out.json','_out2.json'),None) or load(f,None) for f in ['fc_mcu_a_out.json','fc_mcu_b_out.json','fc_street_out.json','fc_spider_out.json','fc_extras_out.json']]   # the second pass wins where it exists
if all(x is not None for x in _fc): threats=[o for L in _fc for o in L]   # the fact-checked files, once all are in
# the third pass: steps and files for the newest titles (Brand New Day and the rest of 2025 and 2026)
import glob as _g
_P=[load('pass3_patch.json',None)]+[json.load(open(f,encoding='utf8')) for f in sorted(_g.glob(D+'cameo_*.json'))]   # then the cameo sweep, saga by saga
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
for f in sorted(_g.glob(D+'stages_*.json')):
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
for o in threats:
    if o['id'].startswith('st-'):
        c=_ch.get(o['st'][0][1])
        if c=='ch-beyond-the-mcu': o['id']='by-'+o['id']
        elif c=='ch-pruned-timelines': o['id']='pr-'+o['id']
for o in threats:   # a villain who comes over to the heroes' side is an Ally (Wanda is an Avenger by the end of Age of Ultron, not a reformed convict)
    for x in o['st']:
        if len(x)>2 and x[2]=='Reformed': x[2]='Ally'
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
put('THREATS',threats); eps={k:([x for x in v if x] if isinstance(v,list) else v) for k,v in eps.items()}
epn={}; epn.update(load('episodes_a.json',{})); epn.update(load('episodes_b.json',{}))
_c=load('episodes_c.json',{}); eps.update(_c.get('counts',{})); epn.update(_c.get('names',{}))
_v=load('episodes_verified.json',{}); eps.update(_v.get('counts',{})); epn.update(_v.get('names',{}))   # checked against Wikipedia's episode tables
# the lists carry most shows a season at a time ("Agent Carter S2", "Agents of S.H.I.E.L.D. S6–S7"): each gets its own slice of the show's episodes,
# and EPO says which season it starts at, so its season chips and numbers read 6 and 7, not 1 and 2
import re
epo={}
_all=set(json.load(open(D+'alltitles.json',encoding='utf8')))
for k,v in list(eps.items()):
    if not isinstance(v,list) or not v: continue
    nm=epn.get(k); nested=bool(nm) and isinstance(nm[0],list)
    for t in _all:
        m=re.fullmatch(re.escape(k)+r' S(\d+)(?:[–-]S(\d+))?',t)
        if not m or t in eps: continue
        a=int(m.group(1)); b=int(m.group(2) or a)
        if b>len(v): continue
        eps[t]=v[a-1:b]
        if a>1: epo[t]=a-1
        if nested: epn[t]=nm[a-1:b]
put('EPS',{k:v for k,v in eps.items() if v}); put('EPO',epo)
put('EPN',epn)
out=sys.argv[1] if len(sys.argv)>1 else D+'dev.html'
open(out,'w',encoding='utf8').write(s); print('threats',len(threats),'eps',len(eps),'phases',len(phases),'brief',len(brief))
