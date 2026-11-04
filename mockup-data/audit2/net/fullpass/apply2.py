import json,sys
SP='/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/'
OUT=sys.argv[1]; NOTE=sys.argv[2]; sets=json.loads(sys.argv[3]); HOLD=json.loads(sys.argv[4]) if len(sys.argv)>4 else {}
P={}; seen=set(); stats={}; owner=[]; held=[]
def ok(v): return isinstance(v,dict) and v.get('title') and v.get('kind') and v.get('text')
for vf,of in sets:
    v=json.load(open(SP+vf)); vo={x['n']:x for x in json.load(open(SP+of))['verdicts']}
    hold=set(HOLD.get(vf,[]))
    for it in v:
        r=vo.get(it['n'])
        if not r: continue
        stats[r['verdict']]=stats.get(r['verdict'],0)+1
        if r['verdict']=='owner' or it['n'] in hold:
            (held if it['n'] in hold else owner).append({'file':vf,'n':it['n'],'pair':it.get('pair'),'q':it.get('question') or it.get('proposed'),'verdict':r['verdict'],'value':r.get('value'),'why':r.get('why')}); continue
        if r['verdict'] not in ('confirm','amend','change'): continue
        val=it.get('proposed') if r['verdict']=='confirm' else r.get('value')
        items=[]
        if isinstance(val,list): items=[(x.get('pair') or it.get('pair'),x) for x in val]
        elif ok(val): items=[(val.get('pair') or it.get('pair'),val)]
        elif isinstance(val,dict):
            m=val.get('pairs',val)
            for k,x in m.items():
                if isinstance(x,list): items+= [(k,y) for y in x]
                else: items.append((k,x))
        for pr,val in items:
            if not ok(val) or not pr or '|' not in pr: continue
            a,b=pr.split('|'); t=val['title']; base,_,ep=t.partition('#')
            if (pr,t) in seen: continue
            seen.add((pr,t))
            e={'kind':val['kind'],'title':base,'text':val['text'],'whoA':val.get('on_a_card_about_b',''),'whoB':val.get('on_b_card_about_a','')}
            if ep: e['episode']=int(ep)
            P.setdefault(pr,{'a':a,'b':b,'add':[],'src':[]})['add'].append(e); P[pr]['src'].append(r.get('source',''))
json.dump({'note':NOTE,'pairs':list(P.values())},open(OUT,'w'),ensure_ascii=False,indent=1)
name=OUT.split('/')[-1]
json.dump(owner,open(SP+'owner_'+name,'w'),ensure_ascii=False,indent=1)
json.dump(held,open(SP+'held_'+name,'w'),ensure_ascii=False,indent=1)
print(stats,'pairs',len(P),'stages',sum(len(p['add']) for p in P.values()),'owner',len(owner),'held',len(held))
