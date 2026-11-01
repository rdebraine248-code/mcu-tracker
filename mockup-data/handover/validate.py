import json,re,sys,glob,os
D=os.path.dirname(os.path.abspath(__file__))
P={p['ally']:p for p in json.load(open(D+'/pairs.json'))}
_O=json.load(open(D+'/atl_order.json')); ATL=_O['atl']; REL=_O['rel']
ST={'C':{'Active','Off-world','Retired','Fugitive','Imprisoned','Missing','Deceased'},'R':{'Active','In custody','Captive','At large','Missing','Allied','Deceased'}}
BAD=re.compile(r'[—–]| - |\b(film|movie|episode|scene)\b',re.I)
files=sys.argv[1:] or sorted(glob.glob(D+'/out_*.json'))
out={}; err=[]; warn=[]
for f in files:
    for h in json.load(open(f)):
        a=h.get('ally')
        if a not in P: err.append(f'{a}: not an input pair'); continue
        if a in out: err.append(f'{a}: twice'); 
        out[a]=h
for a,p in P.items():
    if a not in out: err.append(f'{a}: missing'); continue
    h=out[a]; F={'C':p['compound'],'R':p['raft']}
    ORD=ATL if p['universe']=='mcu' else {t:REL.get(t,ATL.get(t,1e9)) for t in set(ATL)|set(REL)}
    allT=[x[1] for x in p['compound']+p['raft']]
    ho=h.get('ho') or []
    if not ho: err.append(f'{a}: no ho'); continue
    for s in ho:
        if s[0] not in 'CR' or s[1] not in allT: err.append(f'{a}: bad stretch {s}')
    o=[ORD.get(s[1],1e9) for s in ho]
    if o!=sorted(o): err.append(f'{a}: stretches out of order')
    for i in range(1,len(ho)):
        if ho[i][0]==ho[i-1][0]: err.append(f'{a}: two {ho[i][0]} stretches in a row')
    def text_ok(r,sd,kind):
        if r.get('status') not in ST[sd]: err.append(f"{a}: {kind} {sd} {r.get('title')}: status {r.get('status')!r}")
        t=re.sub(r'^In season \d+, ','',r.get('text',''))
        if BAD.search(t): err.append(f"{a}: {kind} {sd} {r['title']}: wording: {BAD.search(t).group(0)!r}")
        if len(re.findall(r'[.!?](\s|$)',t))>3: warn.append(f"{a}: {kind} {sd} {r['title']}: more than 3 sentences")
    for sd in 'CR':
        for r in (h.get('rewrite') or {}).get(sd,[]):
            L=[x for x in F[sd] if x[1]==r.get('title')]
            if len(L)<=(r.get('i') or 0): err.append(f"{a}: rewrite {sd} {r.get('title')} #{r.get('i')}: no such step")
            text_ok(r,sd,'rewrite')
        for r in (h.get('drop') or {}).get(sd,[]):
            L=[x for x in F[sd] if x[1]==r.get('title')]
            if len(L)<=(r.get('i') or 0): err.append(f"{a}: drop {sd} {r.get('title')} #{r.get('i')}: no such step")
        for r in (h.get('add') or {}).get(sd,[]):
            if r.get('title') not in allT: err.append(f"{a}: add {sd} {r.get('title')}: title not in either file")
            text_ok(r,sd,'add')
    # nothing lost: every title either file told is still told by the file that owns it
    H=[(s[0],ORD.get(s[1],1e9),len(s)>2 and s[2]) for s in ho]
    def own(t,sd):
        ox=ORD.get(t,1e9); k=0
        for i,x in enumerate(H):
            if ox>=x[1]: k=i
        if k>0 and H[k][2] and ox==H[k][1] and H[k-1][0]==sd: k-=1
        return H[k][0]==sd
    kept={sd:[x[1] for x in F[sd] if own(x[1],sd)]+[r['title'] for r in (h.get('add') or {}).get(sd,[]) if own(r['title'],sd)] for sd in 'CR'}
    for t in dict.fromkeys(allT):
        if t not in kept['C'] and t not in kept['R']: err.append(f'{a}: {t!r} would be lost')
    for s in ho[1:]:
        if len(s)>2 and s[2]:
            for sd in 'CR':
                if s[1] not in kept[sd]: err.append(f'{a}: switch title {s[1]!r} has no {sd} half')
print(len(out),'pairs,',sum(1 for h in out.values() for s in h['ho'][1:] if len(s)>2 and s[2]),'switch titles,',sum(len(h['ho'])-1 for h in out.values()),'handovers')
print('\n'.join('ERR '+e for e in err) or 'no errors'); print('\n'.join('WARN '+w for w in warn[:20]))
if len(sys.argv)<=1 and not err:
    json.dump({a:{k:h[k] for k in ('threat','ho','rewrite','add','drop') if k in h} for a,h in out.items()},open('/home/user/mcu-tracker/mockup-data/handover.json','w'),ensure_ascii=False,indent=1); print('wrote handover.json')
