# the second pass applied: each re-checked moment takes the later of the two episodes (never shown before it happens); the moments
# whose text was corrected take the episode their corrected text happens in (checked against the wikis)
import json,glob,os
D=os.path.dirname(os.path.abspath(__file__)); S0=D+'/..'
F=json.load(open(D+'/first.json')); S={}
for f in sorted(glob.glob(D+'/out_*.json')): S.update(json.load(open(f)))
OVR={'st-carson-wolf|st-frank-castle|The Punisher S1|0':2,'T:agatha-harkness|Agatha All Along|1':8,'st-antoine-triplett|st-melinda-may|Agents of S.H.I.E.L.D. S1|0':18,
     'st-bobbi-morse|st-melinda-may|Agents of S.H.I.E.L.D. S2|0':15,'nick-fury|st-isabelle-hartley|Agents of S.H.I.E.L.D. S2|0':15,'A:st-eric-koenig|Agents of S.H.I.E.L.D.|0':18}
last={}; cat={}
for f in glob.glob(D+'/batch_*.json'):
    for t,v in json.load(open(f)).items():
        for k in ['steps','net','atlas','news','msgs']:
            for m in v[k]: last[m['key']]=len(v['episodes']); cat[m['key']]=(k,t)
A=json.load(open('/home/user/mcu-tracker/mockup-data/ep_tags.json')); N=json.load(open(S0+'/rel/ep_tags.json'))
moved=0; untag=0
for k,e1 in F.items():
    if k not in S: continue
    e=OVR.get(k,max(e1,S[k]))
    if e==e1: continue
    moved+=1; c,t=cat[k]; L=last[k]
    def put(d,kk):
        global untag
        if e>=L: d.pop(kk,None); untag+=1
        else: d[kk]=e
    if c=='steps': g,rest=k.split(':',1); fid,title,j=rest.rsplit('|',2); put(A['st'].setdefault(g+':'+fid,{}),title+'|'+j)
    elif c=='atlas': pid,i=k.rsplit('|',1); put(A['at'].setdefault(pid,{}),i)
    elif c=='news': ti,h=k.split('|',1); put(A['nw'].setdefault(ti,{}),h)
    elif c=='msgs': put(A['ms'],k)
    else: put(N,k)
print(f'{len(S)} re-checked of {len(F)}; {moved} tags moved later ({untag} of them to the finale, so untagged)')
json.dump(A,open('/home/user/mcu-tracker/mockup-data/ep_tags.json','w'),ensure_ascii=False,indent=0); json.dump(N,open(S0+'/rel/ep_tags.json','w'),ensure_ascii=False,indent=0)
