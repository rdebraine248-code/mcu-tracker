# checks the episode pass and writes the app's and the Network's tags
import json,re,glob,os,sys
D=os.path.dirname(os.path.abspath(__file__))
M=json.load(open(D+'/moments.json'))
cat={}; info={}
for t,v in M.items():
    tot=len(v['episodes']); seas=v['seasons'] if isinstance(v['seasons'],list) else None
    for k in ['steps','net','atlas','news','msgs']:
        for m in v[k]: cat[m['key']]=(k,t); info[m['key']]=(tot,seas,m.get('text',''))
O={}
for f in sorted(glob.glob(D+'/out_*.json')): O.update(json.load(open(f)))
err=[]; miss=[k for k in cat if k not in O]; extra=[k for k in O if k not in cat]
st={}; at={}; nw={}; ms={}; net={}; n=0; same=0
for k,(c,t) in cat.items():
    if k not in O: continue
    e=O[k]; tot,seas,txt=info[k]
    if not isinstance(e,int) or e<1 or e>tot: err.append(f'{k}: {e} not in 1..{tot}'); continue
    m=re.match(r'In season (\d+),',txt)
    if m and seas:
        s=int(m.group(1)); off=sum(seas[:s-1]) if s-1<=len(seas) else None
        # a whole show's season numbers can start later (EPO); only check when the season is inside the list
        if off is not None and s<=len(seas) and not (off<e<=off+seas[s-1]): err.append(f'{k}: episode {e} outside season {s} ({off+1}..{off+seas[s-1]})')
    if e==tot: same+=1; continue   # the last episode: no earlier than today, so left as it is
    n+=1
    if c=='steps':
        g,rest=k.split(':',1); fid,title,j=rest.rsplit('|',2); st.setdefault(g+':'+fid,{})[title+'|'+j]=e
    elif c=='atlas': pid,i=k.rsplit('|',1); at.setdefault(pid,{})[i]=e
    elif c=='news': ti,h=k.split('|',1); nw.setdefault(ti,{})[h]=e
    elif c=='msgs': ms[k]=e
    else: net[k]=e
print(f'{len(O)} answers for {len(cat)} moments; missing {len(miss)}, extra {len(extra)}; tagged {n}, left at the last episode {same}')
print('\n'.join('ERR '+x for x in err[:40]) or 'no errors'); print('missing sample', miss[:8])
# the WandaVision mockup was in the data when the moments were gathered: Wanda's one real entry is her finale (no tag), and the five
# moments the mockup had renamed are tagged here from the episodes (the Hex found at 4, Salem's 1693 flashback at 8)
for k in [k for k in st.get('A:wanda-maximoff',{}) if k.startswith('WandaVision|')]: del st['A:wanda-maximoff'][k]
at.setdefault('westview',{})['0']=4; at.setdefault('salem',{})['0']=8; nw.setdefault('WandaVision',{})['Energy barrier cuts off Westview, New Jersey']=4
if '--write' in sys.argv and not err:
    json.dump({'st':st,'at':at,'nw':nw,'ms':ms},open('/home/user/mcu-tracker/mockup-data/ep_tags.json','w'),ensure_ascii=False,indent=0)
    json.dump(net,open(D+'/../rel/ep_tags.json','w'),ensure_ascii=False,indent=0); print('wrote ep_tags.json (app) and rel/ep_tags.json (Network)')
